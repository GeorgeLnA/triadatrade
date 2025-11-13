"use client"

import { useEffect, useRef } from "react"

interface NetworkAnimationProps {
  maxDistance?: number
  minDistance?: number
  heartSpeed?: number
  backgroundColor?: string
  particleColor?: string
  lineColor?: string
}

export function FooterNetworkAnimation({
  maxDistance = 170,
  minDistance = 60,
  heartSpeed = 30,
  backgroundColor = "rgba(5, 6, 18, 1)",
  particleColor = "rgba(255, 255, 255, ",
  lineColor = "rgba(73, 255, 188, ",
}: NetworkAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const networkRef = useRef<Network | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      networkRef.current?.getGrd()
    }

    resizeCanvas()

    const network = new Network(
      canvas,
      ctx,
      maxDistance,
      minDistance,
      heartSpeed,
      backgroundColor,
      particleColor,
      lineColor
    )

    networkRef.current = network
    network.start()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      network.stop()
    }
  }, [maxDistance, minDistance, heartSpeed, backgroundColor, particleColor, lineColor])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        id="footer-network"
      />
    </div>
  )
}

interface DotMouse {
  x: number
  y: number
  vx: number
  vy: number
}

class Network {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  aDots: Dot[] = []
  aLines: Line[] = []
  iMaxDist: number
  iMinDist: number
  beat = 30
  drawLine = false
  bRuning = false
  grd: CanvasGradient | null = null
  breakpoint = 20
  heartSpeed: number
  backgroundColor: string
  particleColor: string
  lineColor: string
  mouse = {
    vx: 0,
    vy: 0,
    px: 0,
    py: 0,
    x: 0,
    y: 0,
    tm: undefined as ReturnType<typeof setTimeout> | undefined,
    moving: false,
  }

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    maxDist: number,
    minDist: number,
    heartSpeed: number,
    backgroundColor: string,
    particleColor: string,
    lineColor: string
  ) {
    this.canvas = canvas
    this.ctx = ctx
    this.iMaxDist = maxDist
    this.iMinDist = minDist
    this.heartSpeed = heartSpeed
    this.backgroundColor = backgroundColor
    this.particleColor = particleColor
    this.lineColor = lineColor
    this.mouse.x = this.canvas.width / 2
    this.mouse.y = this.canvas.height / 2
    this.init()
  }

  init() {
    this.getGrd()
    window.addEventListener("mousemove", this.updateMouse)
    window.addEventListener("click", this.toggleLine)
  }

  getGrd() {
    this.grd = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0)

    for (let i = 0; i < this.breakpoint; i++) {
      const opacity = Math.max(0, 0.22 - (i / this.breakpoint) * 0.18)
      const color = `rgba(0, 0, 0, ${opacity})`
      this.grd.addColorStop((1 / this.breakpoint) * i, color)
    }
  }

  toggleLine = () => {
    this.drawLine = !this.drawLine
  }

  buildDot() {
    this.aDots.push(new Dot(this.mouse))
  }

  updateMouse = (e: MouseEvent) => {
    this.mouse.moving = true

    if (this.mouse.tm) clearTimeout(this.mouse.tm)
    this.mouse.tm = setTimeout(this.mouseStop, 500)

    this.mouse.px = this.mouse.x
    this.mouse.py = this.mouse.y

    const rect = this.canvas.getBoundingClientRect()
    this.mouse.x = e.clientX - rect.left
    this.mouse.y = e.clientY - rect.top + 80

    this.mouse.vx = this.mouse.x - this.mouse.px
    this.mouse.vy = this.mouse.y - this.mouse.py

    // Create more particles - lower threshold means more frequent particle creation
    if (Math.random() > 0.5) {
      this.buildDot()
    }
    
    // Sometimes create 2 particles at once for denser effect
    if (Math.random() > 0.7) {
      this.buildDot()
    }
  }

  mouseStop = () => {
    this.mouse.moving = false
  }

  getDist(dot1: Dot, dot2: Dot) {
    const dx = dot1.x - dot2.x
    const dy = dot1.y - dot2.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  checkLines() {
    this.aLines = []

    for (let i = this.aDots.length - 1; i >= 0; i--) {
      for (let j = this.aDots.length - 1; j > i; j--) {
        const iDist = this.getDist(this.aDots[i], this.aDots[j])

        if (iDist < this.iMaxDist && iDist > this.iMinDist && this.aDots[i].r + this.aDots[j].r > 2.4) {
          this.aLines.push(new Line(this.aDots[i], this.aDots[j], iDist, this.iMaxDist, this.lineColor))
        }
      }
    }
  }

  drawOverlay() {
    this.ctx.globalCompositeOperation = "overlay"
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = this.grd ?? "transparent"
    this.ctx.fill()
  }

  update() {
    for (let i = this.aDots.length - 1; i >= 0; i--) {
      if (this.aDots[i].alive) {
        this.aDots[i].update()
      } else {
        this.aDots.splice(i, 1)
      }
    }

    if (this.drawLine) this.checkLines()

    if (this.mouse.moving) {
      this.beat = 0
    } else {
      this.beat = Math.min(this.beat + 1, this.heartSpeed)
    }
  }

  draw() {
    this.ctx.globalCompositeOperation = "source-over"
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = this.aDots.length - 1; i >= 0; i--) {
      this.aDots[i].draw(this.ctx, this.particleColor)
    }

    if (this.drawLine) {
      for (let i = this.aLines.length - 1; i >= 0; i--) {
        this.aLines[i].draw(this.ctx)
      }
    }

    this.drawOverlay()
  }

  run = () => {
    this.update()
    this.draw()

    if (this.bRuning) requestAnimationFrame(this.run)
  }

  start() {
    this.bRuning = true
    this.run()
  }

  stop() {
    this.bRuning = false
    window.removeEventListener("mousemove", this.updateMouse)
    window.removeEventListener("click", this.toggleLine)
  }
}

class Dot {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  life: number
  alive = true
  friction: number
  a = 1
  lx = 0
  ly = 0

  constructor(mouse: DotMouse) {
    this.x = mouse.x
    this.y = mouse.y
    this.vx = (Math.random() * 3 - 1.5 + mouse.vx) * 1.1
    this.vy = (Math.random() * 3 - 1.5 + mouse.vy) * 1.1
    this.r = Math.random() * 1.5 + 0.3
    this.life = (Math.random() * 4 + 1) * (this.r * 0.3)
    this.friction = Math.random() * 0.12 + 0.02
  }

  update() {
    if (this.x < 0 || this.x > window.innerWidth) this.vx *= -0.8
    if (this.y < 0 || this.y > window.innerHeight) this.vy *= -0.8

    this.lx = this.x
    this.ly = this.y

    this.x += this.vx
    this.y += this.vy

    if (this.vx > 2) this.vx -= this.friction
    else if (this.vx < -2) this.vx += this.friction

    if (this.vy > 2) this.vy -= this.friction
    else if (this.vy < -2) this.vy += this.friction

    if (this.life <= 0) {
      if (this.a <= 0) {
        this.alive = false
      } else {
        this.a -= 0.09
      }
    } else {
      this.life -= 0.1
    }
  }

  draw(ctx: CanvasRenderingContext2D, particleColor: string) {
    ctx.beginPath()
    ctx.moveTo(this.lx, this.ly)
    ctx.lineTo(this.x, this.y)
    ctx.strokeStyle = `${particleColor}${this.a})`
    ctx.lineWidth = this.r
    ctx.lineCap = "round"
    ctx.stroke()
    ctx.closePath()
  }
}

class Line {
  x1: number
  y1: number
  x2: number
  y2: number
  w = 0.05
  size: number
  mSize: number
  a: number
  lineColor: string

  constructor(dot1: Dot, dot2: Dot, dist: number, mDist: number, lineColor: string) {
    this.x1 = dot1.x
    this.y1 = dot1.y
    this.x2 = dot2.x
    this.y2 = dot2.y
    this.size = dist
    this.mSize = mDist
    this.lineColor = lineColor
    this.a = this.getDistAlpha()
    this.a = Math.min(dot1.a, dot2.a, this.a)
  }

  getDistAlpha() {
    const pcDist = (this.size * 100) / this.mSize
    const aDist = 100 - (100 * pcDist) / 100
    return aDist / 100
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.strokeStyle = `${this.lineColor}${this.a * 2})`
    ctx.lineWidth = this.w
    ctx.stroke()
    ctx.closePath()
  }
}
