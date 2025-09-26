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
      <div className="max-w-7xl mx-auto pt-20 pb-2 px-4 md:px-8 lg:px-10">
        <h2 className="text-3xl md:text-6xl mb-2 text-scout-text-white font-bold font-teko text-center">
          OUR BLOG
        </h2>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-6 md:pt-12 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-20 items-center top-40 self-center max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 top-0 w-10 rounded-full bg-transparent flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-scout-green border-2 border-scout-border shadow-lg shadow-scout-green/30" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-scout-text-white/70 font-teko">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-scout-text-white/70 font-teko">
                {item.title}
              </h3>
              <div className="[&_img]:border [&_img]:border-scout-border [&_img]:rounded-lg [&_.card]:bg-scout-card-bg [&_.card]:border [&_.card]:border-scout-border [&_.card]:rounded-lg">
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
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-scout-border/20 via-scout-border/40 to-scout-border/20 rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-scout-green via-scout-green/80 to-scout-green/40 rounded-full shadow-lg shadow-scout-green/20"
          />
        </div>
      </div>
    </div>
  )
}

export default BlogTimeline


