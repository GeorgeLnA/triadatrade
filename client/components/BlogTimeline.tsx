"use client"

import { useState } from "react"

export interface TimelineEntry {
  title: string
  date: string
  description: string
  image?: string
}

interface BlogTimelineProps {
  data: TimelineEntry[]
}

export function BlogTimeline({ data }: BlogTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className="relative z-10 w-full mx-auto py-20"
      style={{
        marginLeft: '70px',
        marginRight: '70px',
        maxWidth: 'calc(100vw - 140px)' // 70px left + 70px right
      }}
    >
      {/* Section Title */}
      <h2 
        className="font-bold text-scout-text-white mb-16 text-center font-teko"
        style={{
          fontSize: 'calc(1.5rem + 2vw)' // Scales with container width
        }}
      >
        LATEST INSIGHTS
      </h2>

      {/* Grid of Blog Cards */}
      <div 
        className="grid gap-8"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'calc(1.5rem + 1vw)'
        }}
      >
        {data.map((entry, index) => (
          <div 
            key={index}
            className={`bg-scout-card-bg border rounded-lg transition-all duration-300 ${
              hoveredIndex === index 
                ? 'border-scout-green/50 shadow-lg' 
                : 'border-scout-border'
            }`}
            style={{
              padding: 'calc(1.5rem + 1vw)'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image (if provided) */}
            {entry.image && (
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src={entry.image} 
                  alt={entry.title}
                  className="w-full object-cover transition-transform duration-300 hover:scale-105"
                  style={{
                    height: 'calc(10rem + 5vw)'
                  }}
                />
              </div>
            )}

            {/* Date */}
            <div 
              className="text-scout-green font-teko mb-2"
              style={{
                fontSize: 'calc(0.875rem + 0.5vw)' // Scales with container width
              }}
            >
              {entry.date}
            </div>

            {/* Title */}
            <h3 
              className="font-bold text-scout-text-white mb-3 font-teko"
              style={{
                fontSize: 'calc(1rem + 0.75vw)' // Scales with container width
              }}
            >
              {entry.title}
            </h3>

            {/* Description */}
            <p 
              className="text-scout-text-muted font-metropolis leading-relaxed"
              style={{
                fontSize: 'calc(0.8125rem + 0.375vw)' // Scales with container width
              }}
            >
              {entry.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogTimeline

