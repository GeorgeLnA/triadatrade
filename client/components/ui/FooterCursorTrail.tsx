"use client"

import { createRef, useEffect, useMemo, useRef, type RefObject } from "react"

interface FooterCursorTrailProps {
  containerRef: RefObject<HTMLElement>
  pagesNavRef?: RefObject<HTMLElement>
  legalNavRef?: RefObject<HTMLElement>
  contactNavRef?: RefObject<HTMLElement>
  active: boolean
  trailText?: string
  trailLength?: number
  distanceRatio?: number
  verticalOffset?: number
  fadeDuration?: number
}

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ")
}

export function FooterCursorTrail({
  containerRef,
  pagesNavRef,
  legalNavRef,
  contactNavRef,
  active,
  trailText = "TRIADATRADE",
  trailLength = 7,
  distanceRatio = 18,
  verticalOffset = 42,
  fadeDuration = 1100
}: FooterCursorTrailProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const refs = useMemo(
    () => Array.from({ length: 5 }, () => createRef<HTMLSpanElement>()),
    []
  )
  const lastRef = useRef({ x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY })
  const lastClientRef = useRef({ x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY })
  const cursorVelocityRef = useRef({ dx: 0, dy: 0 })
  const idleTimeoutRef = useRef<number>()
  const animationFrameRefs = useRef<Map<number, number>>(new Map())
  const zIndexCounter = useRef(50)

  useEffect(() => {
    const clearIdle = () => {
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current)
        idleTimeoutRef.current = undefined
      }
    }

    const container = containerRef.current
    if (!container || !active) {
      refs.forEach((ref) => {
        if (ref.current) {
          if (ref.current.dataset.timeoutId) {
            window.clearTimeout(Number(ref.current.dataset.timeoutId))
            delete ref.current.dataset.timeoutId
          }
          ref.current.dataset.status = "inactive"
        }
      })
      clearIdle()
      lastRef.current = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY }
      lastClientRef.current = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY }
      return
    }

    const activateTrail = (clientX: number, clientY: number, force = false) => {
      const rect = container.getBoundingClientRect()
      const distanceThreshold = Math.max(rect.width, rect.height) / distanceRatio

      if (!force && Number.isFinite(lastRef.current.x) && Number.isFinite(lastRef.current.y)) {
        const delta = Math.hypot(clientX - lastRef.current.x, clientY - lastRef.current.y)
        if (delta < distanceThreshold) {
          return false
        }
      }

      // Check if there's already a label being created (active) - allow new cycle once it starts flowing
      // This allows cycles to overlap - new label can appear while previous is still flowing/fading
      const activeLabel = refs.find(ref => 
        ref.current && ref.current.dataset.status === "active"
      )
      
      if (activeLabel?.current) return false // Don't create new label only if one is currently being created
      
      // Find an available label (inactive one)
      const availableLabel = refs.find(ref => 
        ref.current && (ref.current.dataset.status === "inactive" || !ref.current.dataset.status)
      )
      
      if (!availableLabel?.current) return false // No available labels
      
      const lead = availableLabel.current
      const labelIndex = refs.indexOf(availableLabel)

      const relativeX = clientX - rect.left
      const relativeY = clientY - rect.top + verticalOffset

      // Capture cursor direction at the moment label appears
      const velocity = { ...cursorVelocityRef.current }
      const velocityMagnitude = Math.hypot(velocity.dx, velocity.dy)
      
      // Don't create label on first movement if we don't have valid velocity yet
      if (velocityMagnitude < 0.5) {
        return false
      }
      
      // Use cursor movement direction (already normalized)
      const directionX = velocity.dx
      const directionY = velocity.dy

      // Set status to active immediately to prevent duplicates (after validation)
      lead.dataset.status = "active"

      // Set initial position
      lead.style.left = `${relativeX}px`
      lead.style.top = `${relativeY}px`
      lead.style.transform = 'translate(-50%, -50%)'
      lead.style.opacity = '1'
      lead.style.scale = '1'
      lead.style.clipPath = 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
      if (zIndexCounter.current > 100) zIndexCounter.current = 50
      lead.style.zIndex = String(zIndexCounter.current++)
      lead.style.filter = 'blur(0px)' // Ensure no blur

      // After a brief moment, start flowing away
      setTimeout(() => {
        if (!lead.dataset.status || lead.dataset.status === "active") {
          lead.dataset.status = "flowing"
          
              const distance = 80 + Math.random() * 50 // 80-130px
          const endX = relativeX + directionX * distance
          const endY = relativeY + directionY * distance

          const flowStartTime = Date.now()
          const flowDuration = 2400 // 2.4 seconds to flow away (3x longer)

          // Helper function to check collision with navigation containers
          const checkCollision = (x: number, y: number, scale: number = 1): boolean => {
            const containerRect = container.getBoundingClientRect()
            
            // Convert label position (relative to container) to absolute position
            const labelAbsoluteX = containerRect.left + x
            const labelAbsoluteY = containerRect.top + y
            
            // Get label dimensions and account for scale
            const labelWidth = (lead.offsetWidth || 120) * scale
            const labelHeight = (lead.offsetHeight || 30) * scale
            
            // Check collision with pages nav container
            if (pagesNavRef?.current) {
              const pagesRect = pagesNavRef.current.getBoundingClientRect()
              const intersectsPages = (
                labelAbsoluteX + labelWidth / 2 > pagesRect.left &&
                labelAbsoluteX - labelWidth / 2 < pagesRect.right &&
                labelAbsoluteY + labelHeight / 2 > pagesRect.top &&
                labelAbsoluteY - labelHeight / 2 < pagesRect.bottom
              )
              if (intersectsPages) return true
            }
            
            // Check collision with legal nav container
            if (legalNavRef?.current) {
              const legalRect = legalNavRef.current.getBoundingClientRect()
              const intersectsLegal = (
                labelAbsoluteX + labelWidth / 2 > legalRect.left &&
                labelAbsoluteX - labelWidth / 2 < legalRect.right &&
                labelAbsoluteY + labelHeight / 2 > legalRect.top &&
                labelAbsoluteY - labelHeight / 2 < legalRect.bottom
              )
              if (intersectsLegal) return true
            }
            
            // Check collision with contact nav container
            if (contactNavRef?.current) {
              const contactRect = contactNavRef.current.getBoundingClientRect()
              const intersectsContact = (
                labelAbsoluteX + labelWidth / 2 > contactRect.left &&
                labelAbsoluteX - labelWidth / 2 < contactRect.right &&
                labelAbsoluteY + labelHeight / 2 > contactRect.top &&
                labelAbsoluteY - labelHeight / 2 < contactRect.bottom
              )
              if (intersectsContact) return true
            }
            
            return false
          }

          // Phase 1: Flow away (move position, keep opacity at 1)
          const flowAway = () => {
            const elapsed = Date.now() - flowStartTime
            const progress = Math.min(elapsed / flowDuration, 1)
            
            // Ease out function
            const easeOut = 1 - Math.pow(1 - progress, 3)
            
            const currentX = relativeX + (endX - relativeX) * easeOut
            const currentY = relativeY + (endY - relativeY) * easeOut
            const currentScale = 1 + progress * 0.3 // Slightly grow as it flows

            lead.style.left = `${currentX}px`
            lead.style.top = `${currentY}px`
            lead.style.transform = `translate(-50%, -50%) scale(${currentScale})`
            lead.style.clipPath = 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
            lead.style.opacity = '1' // Keep opacity at 1 during flow
            lead.style.filter = 'blur(0px)' // Keep no blur during flow

            // Check for collision with pages container (accounting for scale)
            const hasCollision = checkCollision(currentX, currentY, currentScale)
            
            if (hasCollision || progress >= 1) {
              // Cancel animation frame if it exists
              const existingFrameId = animationFrameRefs.current.get(labelIndex)
              if (existingFrameId) {
                cancelAnimationFrame(existingFrameId)
              }
              
              // Immediately start fading out on collision or when flow completes
              lead.dataset.status = "fading"
              const fadeStartTime = Date.now()
              const fadeDuration = 400 // 0.4 seconds to fade out
              
              const fadeOut = () => {
                const fadeElapsed = Date.now() - fadeStartTime
                const fadeProgress = Math.min(fadeElapsed / fadeDuration, 1)
                
                const currentOpacity = 1 - fadeProgress
                const blurAmount = fadeProgress * 8 // Increase blur from 0px to 8px as it fades
                lead.style.opacity = String(currentOpacity)
                lead.style.filter = `blur(${blurAmount}px)` // Add blur as it disappears

                if (fadeProgress < 1) {
                  const frameId = requestAnimationFrame(fadeOut)
                  animationFrameRefs.current.set(labelIndex, frameId)
                } else {
                  lead.dataset.status = "inactive"
                  lead.style.opacity = '0'
                  animationFrameRefs.current.delete(labelIndex)
                }
              }

              const frameId = requestAnimationFrame(fadeOut)
              animationFrameRefs.current.set(labelIndex, frameId)
            } else {
              const frameId = requestAnimationFrame(flowAway)
              animationFrameRefs.current.set(labelIndex, frameId)
            }
          }

          const frameId = requestAnimationFrame(flowAway)
          animationFrameRefs.current.set(labelIndex, frameId)
        }
      }, 100) // Brief delay before flowing

      lastRef.current = { x: clientX, y: clientY }
      lastClientRef.current = { x: clientX, y: clientY }
      return true
    }

    const scheduleIdle = () => {
      clearIdle()
      if (
        !Number.isFinite(lastClientRef.current.x) ||
        !Number.isFinite(lastClientRef.current.y)
      ) {
        return
      }
      idleTimeoutRef.current = window.setTimeout(() => {
        const { x, y } = lastClientRef.current
        if (Number.isFinite(x) && Number.isFinite(y)) {
          activateTrail(x, y, true)
          scheduleIdle()
        }
      }, 5000)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const previousX = lastClientRef.current.x
      const previousY = lastClientRef.current.y
      
      // Calculate velocity before updating lastClientRef
      if (Number.isFinite(previousX) && Number.isFinite(previousY)) {
        const dx = event.clientX - previousX
        const dy = event.clientY - previousY
        const distance = Math.hypot(dx, dy)
        
        if (distance > 0) {
          // Normalize and store velocity direction
          cursorVelocityRef.current = {
            dx: dx / distance,
            dy: dy / distance
          }
        }
      } else {
        // First movement - initialize with a default downward direction
        cursorVelocityRef.current = {
          dx: 0,
          dy: 1
        }
      }
      
      lastClientRef.current = { x: event.clientX, y: event.clientY }
      activateTrail(event.clientX, event.clientY)
      scheduleIdle()
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches[0]) {
        const { clientX, clientY } = event.touches[0]
        const previousX = lastClientRef.current.x
        const previousY = lastClientRef.current.y
        
        // Calculate velocity before updating lastClientRef
        if (Number.isFinite(previousX) && Number.isFinite(previousY)) {
          const dx = clientX - previousX
          const dy = clientY - previousY
          const distance = Math.hypot(dx, dy)
          
          if (distance > 0) {
            // Normalize and store velocity direction
            cursorVelocityRef.current = {
              dx: dx / distance,
              dy: dy / distance
            }
          }
        } else {
          // First movement - initialize with a default downward direction
          cursorVelocityRef.current = {
            dx: 0,
            dy: 1
          }
        }
        
        lastClientRef.current = { x: clientX, y: clientY }
        activateTrail(clientX, clientY)
        scheduleIdle()
      }
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("touchmove", handleTouchMove)

    scheduleIdle()

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("touchmove", handleTouchMove)
      clearIdle()
      // Cancel all animation frames
      animationFrameRefs.current.forEach((frameId) => {
        cancelAnimationFrame(frameId)
      })
      animationFrameRefs.current.clear()
      refs.forEach((ref) => {
        if (ref.current) {
          if (ref.current.dataset.timeoutId) {
            window.clearTimeout(Number(ref.current.dataset.timeoutId))
            delete ref.current.dataset.timeoutId
          }
          ref.current.dataset.status = "inactive"
        }
      })
      lastRef.current = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY }
      lastClientRef.current = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY }
    }
  }, [active, containerRef, pagesNavRef, legalNavRef, distanceRatio, fadeDuration, refs, verticalOffset])

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-30"
    >
      {refs.map((ref, index) => (
        <span
          key={index}
          ref={ref}
          data-index={index}
          data-status="inactive"
          className={cn(
            "absolute font-audiowide text-[0.48rem] tracking-[0.32em] uppercase text-white bg-black px-3 py-1 rounded-none shadow-[0_4px_12px_rgba(0,0,0,0.25)]",
            "opacity-0 scale-75 data-[status='active']:opacity-100 data-[status='active']:scale-100 data-[status='flowing']:opacity-100"
          )}
          style={{
            filter: 'blur(0px)',
            clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
          }}
        >
          {trailText}
        </span>
      ))}
    </div>
  )
}
