"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  // When active, disables free spin/drag and rotates based on scrollProgress between waypoints
  scrollActive?: boolean
  // 0..1 progress across all waypoints
  scrollProgress?: number
  // Optional callback fired once when progress reaches 1 (handled by parent typically)
  onSequenceComplete?: () => void
  // Optional gentle spin speed after sequence completes (deg per frame)
  postSequenceSpinSpeed?: number
}

export default function RotatingEarth({ width = 800, height = 600, className = "", scrollActive = false, scrollProgress, onSequenceComplete, postSequenceSpinSpeed = 0.05 }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Internal refs for imperative control outside the main setup effect
  const projectionRef = useRef<d3.GeoProjection | null>(null)
  const renderRef = useRef<(() => void) | null>(null)
  const rotationRef = useRef<[number, number]>([0, 0])
  const autoRotateRef = useRef<boolean>(true)
  const rotationSpeedRef = useRef<number>(0.1)
  const sequenceCompletedRef = useRef<boolean>(false)
  const prevScrollActiveRef = useRef<boolean>(false)
  const isSmoothingToStartRef = useRef<boolean>(false)
  const easingRafRef = useRef<number | null>(null)
  const scrollActiveRef = useRef<boolean>(false)
  const linesOpacityRef = useRef<number>(1)
  const linesFadeRafRef = useRef<number | null>(null)
  const linesFadeTimeoutRef = useRef<number | null>(null)
  // Live scroll progress for render-time drawing calculations
  const scrollProgressRef = useRef<number>(0)
  // Persistently track which destination countries have been reached
  const visitedCountriesRef = useRef<Set<string>>(new Set())

  const animateLinesOpacity = (to: number, durationMs = 200) => {
    if (!renderRef.current) return
    if (linesFadeRafRef.current !== null) cancelAnimationFrame(linesFadeRafRef.current)
    const from = linesOpacityRef.current
    if (durationMs <= 0) {
      linesOpacityRef.current = to
      renderRef.current()
      return
    }
    const start = performance.now()
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
    const step = () => {
      const t = Math.min(1, (performance.now() - start) / durationMs)
      linesOpacityRef.current = from + (to - from) * ease(t)
      renderRef.current && renderRef.current()
      if (t < 1) {
        linesFadeRafRef.current = requestAnimationFrame(step)
      } else {
        linesFadeRafRef.current = null
      }
    }
    linesFadeRafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions - 1.5x bigger, can extend beyond screen
    const baseSize = Math.min(width, height)
    const maxSize = baseSize * 1.5 // 1.5x bigger
    const containerWidth = maxSize
    const containerHeight = maxSize
    const radius = maxSize / 3.6

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)
    projectionRef.current = projection

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false // Point is in a hole
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 24) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      // Optimized: larger step size and limit max dots per feature
      const stepSize = dotSpacing * 0.12 // Increased step size for fewer dots
      const maxDotsPerFeature = 50 // Limit dots per feature for performance
      let pointsGenerated = 0

      for (let lng = minLng; lng <= maxLng && pointsGenerated < maxDotsPerFeature; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat && pointsGenerated < maxDotsPerFeature; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
            pointsGenerated++
          }
        }
      }

      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background) - transparent
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "transparent"
      context.fill()
      context.strokeStyle = "#ffffff"
      context.lineWidth = 2 * scaleFactor
      context.stroke()

      // Create invisible elevated globe layer for 3D flight paths
      const elevatedScale = currentScale * 1.15 // 15% larger than main globe
      const elevatedProjection = d3
        .geoOrthographic()
        .scale(elevatedScale)
        .translate([containerWidth / 2, containerHeight / 2])
        .clipAngle(90)
        .rotate(rotationRef.current)

      // Helper to draw a marker with optional city/country labels
      const drawMarker = (coords: [number, number], city?: string, country?: string) => {
        const projected = projection(coords)
        if (!projected) return
        const markerSize = 6 * scaleFactor
        const shadowSize = 8 * scaleFactor
        context.beginPath()
        context.arc(projected[0], projected[1], markerSize, 0, 2 * Math.PI)
        context.fillStyle = "#c0c0c0"
        context.shadowColor = "#c0c0c0"
        context.shadowBlur = shadowSize
        context.fill()
        context.beginPath()
        context.arc(projected[0], projected[1], markerSize, 0, 2 * Math.PI)
        context.strokeStyle = "#ffffff"
        context.lineWidth = 2 * scaleFactor
        context.shadowColor = "transparent"
        context.shadowBlur = 0
        context.stroke()
        if (city) {
          const fontSize = 12 * scaleFactor
          context.fillStyle = "#ffffff"
          context.font = `bold ${fontSize}px Arial`
          context.textAlign = "center"
          context.textBaseline = "top"
          const textMetricsCity = context.measureText(city)
          const widest = Math.max(textMetricsCity.width, country ? context.measureText(country).width : 0)
          const textHeight = fontSize
          context.fillStyle = "rgba(0, 0, 0, 0.7)"
          context.fillRect(
            projected[0] - widest/2 - 4 * scaleFactor,
            projected[1] + 12 * scaleFactor - 2 * scaleFactor,
            widest + 8 * scaleFactor,
            (country ? textHeight * 2 + 6 * scaleFactor : textHeight + 4 * scaleFactor)
          )
          context.fillStyle = "#0066ff"
          context.fillText(city, projected[0], projected[1] + 12 * scaleFactor)
          if (country) {
            context.font = `${10 * scaleFactor}px Arial`
            context.fillStyle = "#ffffff"
            context.fillText(country, projected[0], projected[1] + 12 * scaleFactor + (textHeight + 2 * scaleFactor))
          }
        }
      }

      if (landFeatures) {
        // Helper: map flag colors and draw a country's outline using its flag palette
        const drawCountryOutlineByName = (countryName: string) => {
          if (!countryName) return
          const upper = countryName.toUpperCase()
          const ALIASES: Record<string, string> = {
            "UK": "UNITED KINGDOM",
            "U.K.": "UNITED KINGDOM",
            "BRITAIN": "UNITED KINGDOM",
            "ENGLAND": "UNITED KINGDOM",
            "CAN": "CANADA",
          }
          const key = (ALIASES[upper] || upper)
          let feature = landFeatures.countryByName?.[key]
          // Fallback: try to discover by scanning features when index missing
          if (!feature && Array.isArray(landFeatures.features)) {
            feature = landFeatures.features.find((f: any) => {
              const p = f.properties || {}
              const names = [p.NAME, p.ADMIN, p.NAME_EN, p.NAME_LONG, p.BRK_NAME, p.SOVEREIGNT, p.ISO_A3]
                .filter(Boolean)
                .map((n: string) => String(n).toUpperCase())
              return names.includes(key)
            })
            if (feature) {
              landFeatures.countryByName = landFeatures.countryByName || {}
              landFeatures.countryByName[key] = feature
            }
          }
          if (!feature) return

          // Build a vertical gradient approximating the country's flag
          const center = d3.geoCentroid(feature as d3.ExtendedFeature)
          const projectedCenter = projection(center)
          if (!projectedCenter) return

          // Flag palettes (dominant/stylized) - kept simple for clean outlines
          const FLAG_GRADIENTS: Record<string, {stops: Array<{pos:number,color:string}>, shadow?: string}> = {
            "CANADA": { stops: [{pos:0, color: "#D30000"}, {pos:1, color: "#FFFFFF"}], shadow: "rgba(211,0,0,0.5)" },
            "UNITED KINGDOM": { stops: [{pos:0, color: "#012169"}, {pos:0.5, color: "#FFFFFF"}, {pos:1, color: "#C8102E"}], shadow: "rgba(1,33,105,0.5)" },
            "NORWAY": { stops: [{pos:0, color: "#BA0C2F"}, {pos:0.5, color: "#FFFFFF"}, {pos:1, color: "#00205B"}], shadow: "rgba(186,12,47,0.5)" },
            "FRANCE": { stops: [{pos:0, color: "#0055A4"}, {pos:0.5, color: "#FFFFFF"}, {pos:1, color: "#EF4135"}], shadow: "rgba(0,85,164,0.5)" },
            // Respect earlier "no green" preference: use white→red for Italy outline
            "ITALY": { stops: [{pos:0, color: "#FFFFFF"}, {pos:1, color: "#CF2B37"}], shadow: "rgba(207,43,55,0.4)" },
            "SPAIN": { stops: [{pos:0, color: "#AA151B"}, {pos:1, color: "#F1BF00"}], shadow: "rgba(170,21,27,0.5)" },
            "CHINA": { stops: [{pos:0, color: "#EE1C25"}, {pos:1, color: "#FFDE00"}], shadow: "rgba(238,28,37,0.5)" },
            "AUSTRALIA": { stops: [{pos:0, color: "#012169"}, {pos:1, color: "#FFFFFF"}], shadow: "rgba(1,33,105,0.5)" },
            "UKRAINE": { stops: [{pos:0, color: "#0080ff"}, {pos:1, color: "#ffdd00"}], shadow: "rgba(0,128,255,0.6)" },
          }

          let palette = FLAG_GRADIENTS[key]
          // For now, only enforce Canada palette to debug drawing; others fallback to Ukraine-style
          if (!palette) {
            palette = FLAG_GRADIENTS['UKRAINE']
          }

          const gradient = context.createLinearGradient(
            projectedCenter[0], projectedCenter[1] - 20 * scaleFactor,
            projectedCenter[0], projectedCenter[1] + 20 * scaleFactor
          )
          palette.stops.forEach(s => gradient.addColorStop(s.pos, s.color))

          const prevShadowColor = context.shadowColor
          const prevShadowBlur = context.shadowBlur
          context.shadowColor = palette.shadow || "transparent"
          context.shadowBlur = 12 * scaleFactor

          // Outer stroke (similar style to Ukraine outline)
          context.beginPath()
          path(feature)
          context.strokeStyle = gradient
          context.lineWidth = 3 * scaleFactor
          context.stroke()

          // subtle inner line for clarity
          context.shadowColor = "transparent"
          context.shadowBlur = 0
          // Inner stroke for clarity, using same gradient but thinner
          const innerGradient = context.createLinearGradient(
            projectedCenter[0], projectedCenter[1] - 15 * scaleFactor,
            projectedCenter[0], projectedCenter[1] + 15 * scaleFactor
          )
          palette.stops.forEach(s => innerGradient.addColorStop(s.pos, s.color))
          context.beginPath()
          path(feature)
          context.strokeStyle = innerGradient
          context.lineWidth = 1.4 * scaleFactor
          context.stroke()

          context.shadowColor = prevShadowColor as string
          context.shadowBlur = prevShadowBlur as number
        }
        // Draw graticule - removed for cleaner look

        // Draw land outlines and fill
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.fillStyle = "#000000"
        context.fill()
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        // Draw any previously visited country outlines so they persist
        if (landFeatures.countryByName && visitedCountriesRef.current.size > 0) {
          visitedCountriesRef.current.forEach((name) => {
            if (name.toUpperCase() === 'UKRAINE') return
            drawCountryOutlineByName(name)
          })
        }


        // Draw Ukraine with special highlighting using actual outline
        if (landFeatures.ukraine) {
          // Create gradient for Ukraine outline (blue top, yellow bottom)
          const ukraineBounds = d3.geoBounds(landFeatures.ukraine as d3.ExtendedFeature)
          const center = d3.geoCentroid(landFeatures.ukraine as d3.ExtendedFeature)
          const projectedCenter = projection(center)
          
          if (projectedCenter) {
            const gradient = context.createLinearGradient(
              projectedCenter[0], projectedCenter[1] - 20 * scaleFactor,
              projectedCenter[0], projectedCenter[1] + 20 * scaleFactor
            )
            gradient.addColorStop(0, "#0080ff") // Bright blue at top
            gradient.addColorStop(1, "#ffdd00") // Bright yellow at bottom
            
            context.shadowColor = "rgba(0, 128, 255, 0.6)"
          context.shadowBlur = 15 * scaleFactor
          context.beginPath()
          path(landFeatures.ukraine)
            context.strokeStyle = gradient
          context.lineWidth = 3 * scaleFactor
          context.stroke()
          
          // Reset shadow
          context.shadowColor = "transparent"
          context.shadowBlur = 0
          
            // Draw inner outline with blue-to-yellow gradient
            const innerGradient = context.createLinearGradient(
              projectedCenter[0], projectedCenter[1] - 15 * scaleFactor,
              projectedCenter[0], projectedCenter[1] + 15 * scaleFactor
            )
            innerGradient.addColorStop(0, "#0080ff") // Bright blue at top
            innerGradient.addColorStop(1, "#ffdd00") // Bright yellow at bottom
            
          context.beginPath()
          path(landFeatures.ukraine)
            context.strokeStyle = innerGradient
          context.lineWidth = 1.5 * scaleFactor
          context.stroke()
          }

          // Always show Kyiv marker
          const KYIV: [number, number] = [31.5, 49.0]
          drawMarker(KYIV, "KYIV", "UKRAINE")
        }

        // Draw UK with special highlighting using actual outline (exact same as Ukraine)
        if (landFeatures.uk) {
          // Create gradient for UK outline (red, white, blue - flag colors)
          const ukBounds = d3.geoBounds(landFeatures.uk as d3.ExtendedFeature)
          const center = d3.geoCentroid(landFeatures.uk as d3.ExtendedFeature)
          const projectedCenter = projection(center)
          
          if (projectedCenter) {
            const gradient = context.createLinearGradient(
              projectedCenter[0], projectedCenter[1] - 20 * scaleFactor,
              projectedCenter[0], projectedCenter[1] + 20 * scaleFactor
            )
            gradient.addColorStop(0, "#ff0000") // Red at top
            gradient.addColorStop(0.5, "#ffffff") // White in middle
            gradient.addColorStop(1, "#0000ff") // Blue at bottom
            
            context.shadowColor = "rgba(255, 0, 0, 0.6)"
            context.shadowBlur = 15 * scaleFactor
            context.beginPath()
            path(landFeatures.uk)
            context.strokeStyle = gradient
            context.lineWidth = 3 * scaleFactor
            context.stroke()
            
            // Reset shadow
            context.shadowColor = "transparent"
            context.shadowBlur = 0
            
            // Draw inner outline with red-white-blue gradient
            const innerGradient = context.createLinearGradient(
              projectedCenter[0], projectedCenter[1] - 15 * scaleFactor,
              projectedCenter[0], projectedCenter[1] + 15 * scaleFactor
            )
            innerGradient.addColorStop(0, "#ff0000") // Red at top
            innerGradient.addColorStop(0.5, "#ffffff") // White in middle
            innerGradient.addColorStop(1, "#0000ff") // Blue at bottom
            
            context.beginPath()
            path(landFeatures.uk)
            context.strokeStyle = innerGradient
            context.lineWidth = 1.5 * scaleFactor
            context.stroke()
          }
        } else {
          // Manual fallback: Draw Ukraine outline using REAL coordinates
          const ukraineCoords: [number, number][] = [
            [31.785998, 52.101678], [32.159412, 52.061267], [32.412058, 52.288695], [32.715761, 52.238465], [33.7527, 52.335075], 
            [34.391731, 51.768882], [34.141978, 51.566413], [34.224816, 51.255993], [35.022183, 51.207572], [35.377924, 50.773955], 
            [35.356116, 50.577197], [36.626168, 50.225591], [37.39346, 50.383953], [38.010631, 49.915662], [38.594988, 49.926462], 
            [40.069058, 49.601055], [40.080789, 49.30743], [39.674664, 48.783818], [39.895632, 48.232405], [39.738278, 47.898937], 
            [38.770585, 47.825608], [38.255112, 47.5464], [38.223538, 47.10219], [37.425137, 47.022221], [36.759855, 46.6987], 
            [35.823685, 46.645964], [34.962342, 46.273197], [35.020788, 45.651219], [35.510009, 45.409993], [36.529998, 45.46999], 
            [36.334713, 45.113216], [35.239999, 44.939996], [33.882511, 44.361479], [33.326421, 44.564877], [33.546924, 45.034771], 
            [32.454174, 45.327466], [32.630804, 45.519186], [33.588162, 45.851569], [33.298567, 46.080598], [31.74414, 46.333348], 
            [31.675307, 46.706245], [30.748749, 46.5831], [30.377609, 46.03241], [29.603289, 45.293308], [29.149725, 45.464925], 
            [28.679779, 45.304031], [28.233554, 45.488283], [28.485269, 45.596907], [28.659987, 45.939987], [28.933717, 46.25883], 
            [28.862972, 46.437889], [29.072107, 46.517678], [29.170654, 46.379262], [29.759972, 46.349988], [30.024659, 46.423937], 
            [29.83821, 46.525326], [29.908852, 46.674361], [29.559674, 46.928583], [29.415135, 47.346645], [29.050868, 47.510227], 
            [29.122698, 47.849095], [28.670891, 48.118149], [28.259547, 48.155562], [27.522537, 48.467119], [26.857824, 48.368211], 
            [26.619337, 48.220726], [26.19745, 48.220881], [25.945941, 47.987149], [25.207743, 47.891056], [24.866317, 47.737526], 
            [24.402056, 47.981878], [23.760958, 47.985598], [23.142236, 48.096341], [22.710531, 47.882194], [22.64082, 48.15024], 
            [22.085608, 48.422264], [22.280842, 48.825392], [22.558138, 49.085738], [22.776419, 49.027395], [22.51845, 49.476774], 
            [23.426508, 50.308506], [23.922757, 50.424881], [24.029986, 50.705407], [23.527071, 51.578454], [24.005078, 51.617444], 
            [24.553106, 51.888461], [25.327788, 51.910656], [26.337959, 51.832289], [27.454066, 51.592303], [28.241615, 51.572227], 
            [28.617613, 51.427714], [28.992835, 51.602044], [29.254938, 51.368234], [30.157364, 51.416138], [30.555117, 51.319503], 
            [30.619454, 51.822806], [30.927549, 52.042353], [31.785998, 52.101678]
          ]
          
          // Draw manual Ukraine outline with gradient
          const center = d3.geoCentroid({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [ukraineCoords]
            },
            properties: {}
          } as d3.ExtendedFeature)
          const projectedCenter = projection(center)
          
          if (projectedCenter) {
            const gradient = context.createLinearGradient(
              projectedCenter[0], projectedCenter[1] - 20 * scaleFactor,
              projectedCenter[0], projectedCenter[1] + 20 * scaleFactor
            )
            gradient.addColorStop(0, "#0080ff") // Bright blue at top
            gradient.addColorStop(1, "#ffdd00") // Bright yellow at bottom
            
            context.shadowColor = "rgba(0, 128, 255, 0.6)"
          context.shadowBlur = 15 * scaleFactor
          context.beginPath()
          
          ukraineCoords.forEach((coord: [number, number], index) => {
            const projected = projection(coord as [number, number])
            if (projected) {
              if (index === 0) {
                context.moveTo(projected[0], projected[1])
              } else {
                context.lineTo(projected[0], projected[1])
              }
            }
          })
          context.closePath()
          
            context.strokeStyle = gradient
          context.lineWidth = 3 * scaleFactor
          context.stroke()
          }
          
          // Reset shadow
          context.shadowColor = "transparent"
          context.shadowBlur = 0
          
          // Draw inner outline with blue-to-yellow gradient
          if (projectedCenter) {
            const innerGradient = context.createLinearGradient(
              projectedCenter[0], projectedCenter[1] - 15 * scaleFactor,
              projectedCenter[0], projectedCenter[1] + 15 * scaleFactor
            )
            innerGradient.addColorStop(0, "#0080ff") // Bright blue at top
            innerGradient.addColorStop(1, "#ffdd00") // Bright yellow at bottom
            
          context.beginPath()
          ukraineCoords.forEach((coord: [number, number], index) => {
            const projected = projection(coord as [number, number])
            if (projected) {
              if (index === 0) {
                context.moveTo(projected[0], projected[1])
              } else {
                context.lineTo(projected[0], projected[1])
              }
            }
          })
          context.closePath()
          
            context.strokeStyle = innerGradient
          context.lineWidth = 1.5 * scaleFactor
          context.stroke()
          }

          // Always show Kyiv marker in fallback path too
          const KYIV: [number, number] = [31.5, 49.0]
          drawMarker(KYIV, "KYIV", "UKRAINE")
          
          // Function to create elevated curved path that goes above globe surface
          const createCurvedPath = (start: [number, number], end: [number, number]) => {
            const curvePoints: [number, number][] = []
            const steps = 50
            const elevationHeight = 0.3 // How high above globe surface (0.0 = on surface, 1.0 = very high)
            
            for (let i = 0; i <= steps; i++) {
              const t = i / steps
              
              // Calculate midpoint for the curve
              const lat1 = start[1] * Math.PI / 180
              const lng1 = start[0] * Math.PI / 180
              const lat2 = end[1] * Math.PI / 180
              const lng2 = end[0] * Math.PI / 180
              
              // Great circle distance
              const d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1))
              
              if (d === 0) continue
              
              // Calculate normal great circle path
              const a = Math.sin((1 - t) * d) / Math.sin(d)
              const b = Math.sin(t * d) / Math.sin(d)
              
              let x = a * Math.cos(lat1) * Math.cos(lng1) + b * Math.cos(lat2) * Math.cos(lng2)
              let y = a * Math.cos(lat1) * Math.sin(lng1) + b * Math.cos(lat2) * Math.sin(lng2)
              let z = a * Math.sin(lat1) + b * Math.sin(lat2)
              
              // Add elevation by pushing points outward from center (above globe surface)
              const elevation = Math.sin(t * Math.PI) * elevationHeight // Peak at midpoint
              x *= (1 + elevation)
              y *= (1 + elevation)
              z *= (1 + elevation)
              
              // Convert back to lat/lng
              const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI
              const lng = Math.atan2(y, x) * 180 / Math.PI
              
              curvePoints.push([lng, lat])
            }
            
            return curvePoints
          }
          
          // Draw active lines only (based on scroll phase), and show destination markers only when line completes
          const projectAny = (p: number[]) => (projection as unknown as (pt: number[]) => number[] | null)(p)
          const elevatedProjectAny = (p: number[]) => (elevatedProjection as unknown as (pt: number[]) => number[] | null)(p)
          
          

          const labelForCoords = (end: [number, number]) => {
            const [lng, lat] = end
            if (Math.abs(lng + 123.1) < 0.6 && Math.abs(lat - 49.3) < 0.6) return { city: "VANCOUVER", country: "CANADA" }
            if (Math.abs(lng + 79.4) < 0.6 && Math.abs(lat - 43.7) < 0.6) return { city: "TORONTO", country: "CANADA" }
            if (Math.abs(lng + 0.1) < 0.6 && Math.abs(lat - 51.5) < 0.6) return { city: "LONDON", country: "UK" }
            if (Math.abs(lng - 10.7) < 0.6 && Math.abs(lat - 59.9) < 0.6) return { city: "OSLO", country: "NORWAY" }
            if (Math.abs(lng - 2.3) < 0.6 && Math.abs(lat - 48.9) < 0.6) return { city: "PARIS", country: "FRANCE" }
            if (Math.abs(lng - 12.3) < 0.6 && Math.abs(lat - 45.4) < 0.6) return { city: "VENICE", country: "ITALY" }
            if (Math.abs(lng + 4.4) < 0.8 && Math.abs(lat - 36.7) < 0.8) return { city: "MÁLAGA", country: "SPAIN" }
            if (Math.abs(lng - 116.4) < 0.8 && Math.abs(lat - 39.9) < 0.8) return { city: "BEIJING", country: "CHINA" }
            if (Math.abs(lng - 153.0) < 0.8 && Math.abs(lat + 27.5) < 0.8) return { city: "BRISBANE", country: "AUSTRALIA" }
            return undefined
          }

          // Persistent line drawing based on global scroll progress
          // Use external section height to control perceived speed; keep normalized progress
          const clamped = Math.max(0, Math.min(1, scrollProgressRef.current))
          const totalSegments = 8 // UA->NA, NA->UA, UA->EU, EU->UA, UA->ASIA, ASIA->UA, UA->OCE, OCE->UA
          const segLen = 1 / totalSegments
          // Apply easing to line drawing for smoother sync with camera movement
          const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
          const progressForSeg = (segIndex: number) => {
            const rawProgress = Math.max(0, Math.min(1, (clamped - segIndex * segLen) / segLen))
            return easeInOutCubic(rawProgress)
          }

          // Define destination groups
          const UKRAINE: [number, number] = [31.5, 49.0]
          const NA_LINES: Array<[number, number]> = [[-123.1, 49.3], [-79.4, 43.7]]
          const EU_LINES: Array<[number, number]> = [[-0.1, 51.5], [10.7, 59.9], [2.3, 48.9], [12.3, 45.4], [-4.4, 36.7]]
          const ASIA_LINES: Array<[number, number]> = [[116.4, 39.9]]
          const OCEANIA_LINES: Array<[number, number]> = [[153.0, -27.5]]

          const drawCurveProgress = (start: [number, number], end: [number, number], prog: number) => {
            if (prog <= 0) return false
            const curve = createCurvedPath(start, end)
            const maxIndex = Math.floor(Math.max(0, Math.min(1, prog)) * (curve.length - 1))
            if (maxIndex <= 0) return false
            
            context.shadowColor = "#0066ff"
            context.shadowBlur = 10 * scaleFactor
            context.beginPath()
            let pathStarted = false
            for (let index = 0; index <= maxIndex; index++) {
              const point = curve[index]
              const t = index / (curve.length - 1)
              const archHeight = Math.sin(t * Math.PI)
              const mainProjected = projectAny([point[0], point[1]])
              const elevatedProjected = elevatedProjectAny([point[0], point[1]])
              if (mainProjected && elevatedProjected) {
                const x = mainProjected[0] + (elevatedProjected[0] - mainProjected[0]) * archHeight
                const y = mainProjected[1] + (elevatedProjected[1] - mainProjected[1]) * archHeight
                if (!pathStarted) {
                  context.moveTo(x, y)
                  pathStarted = true
                } else {
                  context.lineTo(x, y)
                }
              }
            }
            if (pathStarted) {
              context.strokeStyle = "#0066ff"
              context.lineWidth = 1.5 * scaleFactor
              context.globalAlpha = 0.9 * linesOpacityRef.current
              context.stroke()
            }
            context.shadowColor = "transparent"
            context.shadowBlur = 0
            return maxIndex >= (curve.length - 1)
          }

          // North America draws during segment 0
          const naProg = progressForSeg(0)
          NA_LINES.forEach((end) => {
            const complete = drawCurveProgress(UKRAINE, end, naProg)
            if (naProg >= 1 && complete) {
              const lbl = labelForCoords(end)
              if (lbl) {
                drawMarker(end, lbl.city, lbl.country)
                drawCountryOutlineByName(lbl.country)
                visitedCountriesRef.current.add(lbl.country.toUpperCase())
              }
            }
          })

          // Europe draws during segment 2
          const euProg = progressForSeg(2)
          EU_LINES.forEach((end) => {
            const complete = drawCurveProgress(UKRAINE, end, euProg)
            if (euProg >= 1 && complete) {
              const lbl = labelForCoords(end)
              if (lbl) {
                drawMarker(end, lbl.city, lbl.country)
                drawCountryOutlineByName(lbl.country)
                visitedCountriesRef.current.add(lbl.country.toUpperCase())
              }
            }
          })

          // Asia draws during segment 4
          const asiaProg = progressForSeg(4)
          ASIA_LINES.forEach((end) => {
            const complete = drawCurveProgress(UKRAINE, end, asiaProg)
            if (asiaProg >= 1 && complete) {
              const lbl = labelForCoords(end)
              if (lbl) {
                drawMarker(end, lbl.city, lbl.country)
                drawCountryOutlineByName(lbl.country)
                visitedCountriesRef.current.add(lbl.country.toUpperCase())
              }
            }
          })

          // Oceania draws during segment 6
          const oceProg = progressForSeg(6)
          OCEANIA_LINES.forEach((end) => {
            const complete = drawCurveProgress(UKRAINE, end, oceProg)
            if (oceProg >= 1 && complete) {
              const lbl = labelForCoords(end)
              if (lbl) {
                drawMarker(end, lbl.city, lbl.country)
                drawCountryOutlineByName(lbl.country)
                visitedCountriesRef.current.add(lbl.country.toUpperCase())
              }
            }
          })
          
          // Reset alpha
          context.globalAlpha = 1
        }

        // Halftone dots removed for cleaner look
      }
    }
    renderRef.current = render

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        // Use a lightweight land dataset for faster loading
        const dataSource = "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        
        let landFeaturesLoaded = false
        try {
          console.log(`Loading data from: ${dataSource}`)
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000) // Reduced timeout to 5 seconds
          
          const response = await fetch(dataSource, { 
            signal: controller.signal,
            mode: 'cors',
            cache: 'force-cache' // Use cache for faster subsequent loads
          })
          clearTimeout(timeoutId)
          
          if (response.ok) {
            landFeatures = await response.json()
            console.log(`Successfully loaded data from: ${dataSource}`)
            landFeaturesLoaded = true
          }
        } catch (err) {
          console.log(`Failed to load from ${dataSource}:`, err)
        }

        if (!landFeaturesLoaded) {
          throw new Error("Failed to load land data from all sources")
        }

        // Load Ukraine and UK from the main land data (same source that works for land features)
        try {
          // Find Ukraine in the main land data - the same data that's already loaded
          const ukraine = landFeatures.features.find((feature: any) => {
            const props = feature.properties || {}
            return props.NAME === "Ukraine" || 
                   props.ADMIN === "Ukraine" ||
                   props.NAME_EN === "Ukraine" ||
                   props.NAME_DE === "Ukraine" ||
                   props.NAME_ES === "Ukraine" ||
                   props.NAME_FR === "Ukraine" ||
                   (props.NAME && props.NAME.toLowerCase().includes("ukraine")) ||
                   (props.ADMIN && props.ADMIN.toLowerCase().includes("ukraine"))
          })
            
          if (ukraine) {
            landFeatures.ukraine = ukraine
          }
              
          // Find UK in the main land data - exact same approach as Ukraine
          const uk = landFeatures.features.find((feature: any) => {
                const props = feature.properties || {}
            return props.NAME === "United Kingdom" || 
                   props.ADMIN === "United Kingdom" ||
                   props.NAME_EN === "United Kingdom" ||
                   props.NAME_DE === "United Kingdom" ||
                   props.NAME_ES === "United Kingdom" ||
                   props.NAME_FR === "United Kingdom" ||
                   props.ISO_A3 === "GBR" ||
                   props.SOVEREIGNT === "United Kingdom" ||
                   (props.NAME && props.NAME.toLowerCase().includes("united kingdom")) ||
                   (props.ADMIN && props.ADMIN.toLowerCase().includes("united kingdom"))
          })
            
          if (uk) {
            landFeatures.uk = uk
          }
        } catch (error) {
          // Silently continue if Ukraine/UK loading fails
        }

        // Fallback: if country index is empty, try to build it from the land data we already have
        if (!landFeatures.countryByName || Object.keys(landFeatures.countryByName).length === 0) {
          landFeatures.countryByName = {}
          if (landFeatures.features && Array.isArray(landFeatures.features)) {
            landFeatures.features.forEach((feature: any, index: number) => {
                      const props = feature.properties || {}
              const names: string[] = []
              ;[props.NAME, props.ADMIN, props.NAME_EN, props.NAME_LONG, props.BRK_NAME, props.SOVEREIGNT, props.ISO_A3]
                .filter(Boolean)
                .forEach((n: string) => names.push(String(n).toUpperCase()))
              names.forEach((n) => {
                if (n) landFeatures.countryByName[n] = feature
              })
            })
          }
        }

        // Generate dots progressively to avoid blocking the main thread
        let totalDots = 0
        const maxTotalDots = 280 // Balanced cap for performance
        const featuresToProcess = Array.isArray(landFeatures.features)
          ? landFeatures.features.slice(0, 80)
          : []

        const schedule = (fn: () => void) => {
          const anyWindow = window as any
          if (typeof anyWindow.requestIdleCallback === 'function') {
            anyWindow.requestIdleCallback(fn, { timeout: 50 })
          } else {
            setTimeout(fn, 0)
          }
        }

        let featureIndex = 0
        const processBatch = () => {
          // Process a small batch each tick
          let processed = 0
          while (
            featureIndex < featuresToProcess.length &&
            processed < 5 &&
            totalDots < maxTotalDots
          ) {
            const feature = featuresToProcess[featureIndex]
            const dots = generateDotsInPolygon(feature, 24)
            for (let i = 0; i < dots.length && totalDots < maxTotalDots; i++) {
              const [lng, lat] = dots[i]
              allDots.push({ lng, lat, visible: true })
              totalDots++
            }
            featureIndex++
            processed++
          }
          render()
          if (featureIndex < featuresToProcess.length && totalDots < maxTotalDots) {
            schedule(processBatch)
          } else {
            setIsLoading(false)
          }
        }

        // Initial quick paint; then progressively add dots
        render()
        schedule(processBatch)
      } catch (err) {
        console.error("Failed to load world data:", err)
        // Fallback: render globe without land data
        landFeatures = { features: [] }
        render()
        setIsLoading(false)
        // Don't set error state, just render without land features
      }
    }

    // Set up rotation and interaction
    const rotation = rotationRef.current
    autoRotateRef.current = true
    rotationSpeedRef.current = 0.1

    // Initialize camera centered over Kyiv
    const KYIV_INIT: [number, number] = [31.5, 49.0]
    rotationRef.current = [-KYIV_INIT[0], -KYIV_INIT[1]]
    projection.rotate(rotationRef.current)
    render()

    autoRotateRef.current = false
    const rotate = () => {
      // auto-rotate disabled per requirements
      if (autoRotateRef.current) {
        rotation[0] += rotationSpeedRef.current
        projection.rotate(rotation)
        render()
      }
    }
    // Keep timer for occasional refresh; but autoRotateRef stays false
    const rotationTimer = d3.timer(rotate)

    // Disable drag per requirements (no mousedown listener)

    // Load the world data
    loadWorldData()

    // Cleanup
    return () => {
      rotationTimer.stop()
    }
  }, [width, height])

  // Scroll-controlled rotation effect with smooth entry to starting position
  useEffect(() => {
    // keep a live ref of scrollActive for event handlers without reinitializing canvas
    scrollActiveRef.current = !!scrollActive
    if (!projectionRef.current || !renderRef.current) return
    if (typeof scrollProgress !== 'number') return

    const projection = projectionRef.current
    const render = renderRef.current

    // Scroll sequence waypoints (centers):
    // UA -> NA -> UA -> EU -> UA -> ASIA -> UA -> OCE -> UA
    const KYIV: [number, number] = [31.5, 49.0]
    const NA_CENTER: [number, number] = [-100, 40]
    const EU_CENTER: [number, number] = [10, 50]
    const ASIA_CENTER: [number, number] = [100, 35]
    const OCEANIA_CENTER: [number, number] = [135, -25]
    const waypoints: [number, number][] = [
      KYIV,
      NA_CENTER,
      KYIV,
      EU_CENTER,
      KYIV,
      ASIA_CENTER,
      KYIV,
      OCEANIA_CENTER,
      KYIV,
    ]

    // On transition to scrollActive, ease from current rotation to the starting position (Kyiv)
    const justActivated = scrollActive && !prevScrollActiveRef.current
    if (justActivated) {
      // Cancel any previous easing
      if (easingRafRef.current !== null) cancelAnimationFrame(easingRafRef.current)
      isSmoothingToStartRef.current = true
      autoRotateRef.current = false

      const startRotation = [...rotationRef.current] as [number, number]
      const targetRotation: [number, number] = [-waypoints[0][0], -waypoints[0][1]]
      const durationMs = 450
      const startTime = performance.now()

      const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

      // If we're already essentially at Kyiv, skip easing to avoid perceptible jump
      const deltaLng = Math.abs(startRotation[0] - targetRotation[0])
      const deltaLat = Math.abs(startRotation[1] - targetRotation[1])
      if (deltaLng < 0.5 && deltaLat < 0.5) {
        rotationRef.current = targetRotation
        projection.rotate(rotationRef.current)
        render()
        isSmoothingToStartRef.current = false
        prevScrollActiveRef.current = scrollActive
        return
      }

      const step = () => {
        const now = performance.now()
        const elapsed = now - startTime
        const t = Math.min(1, elapsed / durationMs)
        const e = easeInOutCubic(t)

        rotationRef.current = [
          startRotation[0] + (targetRotation[0] - startRotation[0]) * e,
          startRotation[1] + (targetRotation[1] - startRotation[1]) * e,
        ]
        projection.rotate(rotationRef.current)
        render()

        if (t < 1 && scrollActive) {
          easingRafRef.current = requestAnimationFrame(step)
        } else {
          isSmoothingToStartRef.current = false
          easingRafRef.current = null
        }
      }

      easingRafRef.current = requestAnimationFrame(step)
    }

    // While easing into start, skip segment interpolation to avoid conflicts
    if (isSmoothingToStartRef.current) {
      prevScrollActiveRef.current = scrollActive
      return
    }

    if (scrollActive) {
      autoRotateRef.current = false
      // Determine segment and interpolate along great-circle for camera
      const totalSegments = waypoints.length - 1
      // Use external section height to control perceived speed; keep normalized progress
      const clamped = Math.max(0, Math.min(1, scrollProgress))
      const segmentLength = 1 / totalSegments
      const segmentIndex = Math.min(totalSegments - 1, Math.floor(clamped / segmentLength))
      const tInSegment = (clamped - segmentIndex * segmentLength) / segmentLength

      const start = waypoints[segmentIndex]
      const end = waypoints[segmentIndex + 1]
      
      // Apply easing to camera movement for smoother sync with line drawing
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      const easedTInSegment = easeInOutCubic(Number.isFinite(tInSegment) ? tInSegment : 0)
      
      const interpolate = d3.geoInterpolate([start[0], start[1]], [end[0], end[1]])
      const [lng, lat] = interpolate(easedTInSegment)

      // Camera move synchronized with eased segment interpolation for smoother movement
      const targetRotation: [number, number] = [-lng, -lat]
      rotationRef.current = targetRotation
      projection.rotate(rotationRef.current)

      // Expose scroll progress to render for persistent line drawing per region
      scrollProgressRef.current = clamped
      render()

      // Fire completion once at end
      if (clamped >= 1 && !sequenceCompletedRef.current) {
        sequenceCompletedRef.current = true
        if (onSequenceComplete) onSequenceComplete()
      }
    } else {
      // On exit from scroll mode, preserve current rotation and restore original rendering flow
      if (sequenceCompletedRef.current) {
        rotationSpeedRef.current = postSequenceSpinSpeed
      }
      // Keep auto-rotate disabled
      autoRotateRef.current = false
      // Ensure any partially begun line path is handled on next render
      render()
    }
    prevScrollActiveRef.current = scrollActive
  }, [scrollActive, scrollProgress, onSequenceComplete, postSequenceSpinSpeed])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ overflow: 'visible' }}>
      <canvas
        ref={canvasRef}
        className="rounded-2xl bg-transparent"
        style={{ 
          width: "100%",
          height: "auto",
          maxWidth: "none",
          aspectRatio: "1 / 1",
          marginLeft: "0",
          marginTop: "0"
        }}
      />
    </div>
  )
}
