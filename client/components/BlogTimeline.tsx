"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export interface TimelineEntry {
  title: string
  content: React.ReactNode
}

interface TimelineProps {
  data: TimelineEntry[]
  className?: string
}

// Timeline adapted to project design tokens (scout palette + fonts)
export function BlogTimeline({ data, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div ref={containerRef} className={cn("w-full bg-scout-dark font-sans md:px-10", className)}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-scout-text-white max-w-4xl font-bold font-teko">
          WRITING TIMELINE
        </h2>
        <p className="text-scout-text-muted text-sm md:text-base max-w-sm font-metropolis">
          Highlights from our recent writing and updates from the defence industry.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-20 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 top-0 w-10 rounded-full bg-transparent flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-gray-700 border border-gray-500" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-scout-text-white/70 font-teko">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-scout-text-white/70 font-teko">
                {item.title}
              </h3>
              <div className="[&_img]:border [&_img]:border-scout-border [&_.card]:bg-scout-card-bg [&_.card]:border [&_.card]:border-scout-border">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        
        {/* Vertical progress line with proper transforms */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-gray-500/40 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-scout-green via-scout-green to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

export default BlogTimeline


