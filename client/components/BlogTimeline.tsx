"use client"

import { useState } from "react"

export interface TimelineEntry {
  title: string
  date: string
  image?: string
  link?: string
}

interface BlogTimelineProps {
  data: TimelineEntry[]
}

export function BlogTimeline({ data }: BlogTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8"
      style={{
        marginLeft: 'clamp(1rem, 4vw, 70px)',
        marginRight: 'clamp(1rem, 4vw, 70px)',
        maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))',
        paddingTop: 'clamp(2rem, 8vw, 4rem)',
        paddingBottom: 'clamp(3rem, 12vw, 7.5rem)'
      }}
    >
      {/* Section Title */}
      <h2 
        className="font-bold text-scout-text-white mb-8 md:mb-16 text-center font-teko"
        style={{
          fontSize: 'clamp(1.75rem, 7vw, calc(1.5rem + 2vw))' // Even larger heading on mobile
        }}
      >
        PRESS MENTIONS
      </h2>

      {/* Grid of Blog Cards - Single column on mobile, 2 on tablet, 3 on desktop */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
      >
        {data.map((entry, index) => {
          const CardContent = (
            <>
              {/* Image (if provided) */}
              {entry.image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={entry.image} 
                    alt={entry.title}
                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{
                      height: 'clamp(8rem, 20vw, calc(10rem + 5vw))'
                    }}
                  />
                </div>
              )}

              {/* Date */}
              {entry.date && (
                <div 
                  className="text-scout-green font-teko mb-2"
                  style={{
                    fontSize: 'clamp(1.0625rem, 3vw, calc(0.875rem + 0.5vw))' // Even larger date text on mobile
                  }}
                >
                  {entry.date}
                </div>
              )}

              {/* Title */}
              <h3 
                className="font-bold text-scout-text-white mb-2 md:mb-3 font-teko"
                style={{
                  fontSize: 'clamp(1.375rem, 4.5vw, calc(1rem + 0.75vw))' // Even larger title text on mobile
                }}
              >
                {entry.title}
              </h3>

              {/* Description */}
              <div className="h-0" />
            </>
          );

          const cardClassName = `bg-scout-card-bg border rounded-lg transition-all duration-300 ${
            hoveredIndex === index 
              ? 'border-scout-green/50 shadow-lg' 
              : 'border-scout-border'
          }`;
          const cardStyle = {
            padding: 'clamp(1rem, 3vw, calc(1.5rem + 1vw))'
          };

          if (entry.link) {
            return (
              <a
                key={index}
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
                style={cardStyle}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {CardContent}
              </a>
            );
          }

          return (
            <div 
              key={index}
              className={cardClassName}
              style={cardStyle}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default BlogTimeline

