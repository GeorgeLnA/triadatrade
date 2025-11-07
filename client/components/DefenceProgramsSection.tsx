import { useState, useRef, useEffect } from "react"
import Reveal from "@/components/ui/Reveal"

export const ALL_SERVICES = [
  {
    id: "defence-1",
    title: "R&D / Technical Consulting",
    subtitle: "R&D / TC",
    description: "Deep technical expertise to score readiness levels, chart product development, and guide teams from ideation through rigorous audits to a deployable MVP.",
    services: [
      "Technical expertise & TRL / MRL / IRL / SRL assessments",
      "Product development roadmaps",
      "Team leadership from idea to MVP",
      "Comprehensive technical audit"
    ],
    category: "defence"
  },
  {
    id: "defence-2", 
    title: "Sales & Feedback Analytics",
    subtitle: "SFA",
    description: "Data-driven promotion campaigns and operational analytics that connect defence programmes with the Ministry of Defence and allied partners.",
    services: [
      "Promotion across the defence sector for MOD and international partners",
      "End-user feedback collection",
      "Request discovery and fulfilment"
    ],
    category: "defence"
  },
  {
    id: "defence-3",
    title: "HR & Technical Talent Management",
    subtitle: "HTTM",
    description: "Specialist recruitment and team orchestration that secure the right engineering, operational, and advisory talent for complex defence initiatives.",
    services: [
      "Specialized talent acquisition",
      "Outsourcing-ready expert database",
      "Project team formation"
    ],
    category: "defence"
  },
  {
    id: "legal-1",
    title: "GR & Codification",
    subtitle: "GRC",
    description: "Regulatory navigation and market-entry enablement that keep manufacturing programmes compliant across NATO-aligned jurisdictions.",
    services: [
      "Registration of production sites and products",
      "EU and US market entry support",
      "NATO (NSN) certification and codification"
    ],
    category: "legal"
  },
  {
    id: "legal-2",
    title: "Strategic Allied Support",
    subtitle: "SAS",
    description: "We work so that Ukraine and its partners gain a technological edge, ensuring every miltech creator or investor has a strong technical, strategic, and corporate ally.",
    services: [
      "Technological advantage for Ukraine and allies",
      "Support for miltech creators and investors",
      "Integrated technical, strategic, and corporate guidance"
    ],
    category: "legal"
  }
]

export default function DefenceProgramsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [heights, setHeights] = useState<number[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const newHeights = contentRefs.current.map(ref => 
      ref ? ref.scrollHeight : 0
    )
    setHeights(newHeights)
  }, [activeIndex])

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="w-full py-20" style={{backgroundColor: '#050612'}}>
      {/* Dynamic container that matches vertical lines - 70px margins */}
      <div 
        className="relative z-10 w-full mx-auto"
        style={{
          marginLeft: '70px',
          marginRight: '70px',
          maxWidth: 'calc(100vw - 140px)' // 70px left + 70px right
        }}
      >
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Defence Programs */}
          <div>
            <Reveal variant="slide-up">
              <div className="mb-8">
                <h2 
                  className="font-bold text-scout-text-white font-teko"
                  style={{
                    fontSize: 'calc(1.375rem + 1.25vw)' // Scales with container width
                  }}
                >
                  Defence Programs
                </h2>
              </div>
            </Reveal>

            <div className="space-y-4">
              {ALL_SERVICES.filter(service => service.category === 'defence').map((service, index) => {
                const globalIndex = ALL_SERVICES.findIndex(s => s.id === service.id)
                const isActive = activeIndex === globalIndex
            
                return (
                  <Reveal key={service.id} delayMs={index * 80}>
                    <div
                      className="group bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40"
                    >
                      {/* Header */}
                      <button
                        onClick={() => toggleAccordion(globalIndex)}
                        className="w-full p-6 text-left transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            {/* Title Content */}
                            <div className="flex-1">
                              <h3 
                                className="font-bold text-scout-text-white font-teko"
                                style={{
                                  fontSize: 'calc(1rem + 0.75vw)' // Scales with container width
                                }}
                              >
                                {service.title}
                              </h3>
                            </div>
                          </div>

                          {/* Arrow Icon */}
                          <div className="w-8 h-8 border border-scout-border/60 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:border-scout-green/60">
                            <svg 
                              className={`w-4 h-4 transition-all duration-200 ${isActive ? 'rotate-180' : ''} text-scout-text-white`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* Content */}
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          height: isActive ? `${heights[globalIndex]}px` : '0px'
                        }}
                      >
                        <div 
                          ref={el => contentRefs.current[globalIndex] = el}
                          className="px-6 pb-6"
                        >
                          {/* Description */}
                          <p 
                            className="text-scout-text-muted font-metropolis leading-relaxed mb-6"
              style={{
                fontSize: 'calc(0.8125rem + 0.375vw)' // Scales with container width
              }}
                          >
                            {service.description}
                          </p>

                          {/* Services List */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.services.map((serviceItem, serviceIndex) => (
                              <div
                                key={serviceItem}
                                className="flex items-center justify-center py-3 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30 hover:border-scout-green/40 transition-all duration-200"
                              >
                                <span 
                                  className="text-scout-text-white font-metropolis font-medium"
                                  style={{
                                    fontSize: 'calc(0.8125rem + 0.375vw)' // Scales with container width
                                  }}
                                >
                                  {serviceItem}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Action Button */}
                          <div className="mt-6 pt-4 border-t border-scout-border/20">
                            <button 
                              className="inline-flex items-center gap-2 px-6 py-3 border border-scout-border/40 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10"
              style={{
                fontSize: 'calc(0.8125rem + 0.375vw)' // Scales with container width
              }}
                            >
                              <span>Explore Program</span>
                              <svg 
                                className="fill-none stroke-currentColor" 
                                style={{
                                  width: 'calc(0.75rem + 0.25vw)',
                                  height: 'calc(0.75rem + 0.25vw)'
                                }}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right Column - Legal, Financing & Consulting Services */}
          <div>
            <Reveal variant="slide-up">
              <div className="mb-8">
                <h2 
                  className="font-bold text-scout-text-white font-teko"
                  style={{
                    fontSize: 'calc(1.375rem + 1.25vw)' // Scales with container width
                  }}
                >
                  Legal, Financing & Consulting
                </h2>
              </div>
            </Reveal>

            <div className="space-y-4">
              {ALL_SERVICES.filter(service => service.category === 'legal').map((service, index) => {
                const globalIndex = ALL_SERVICES.findIndex(s => s.id === service.id)
                const isActive = activeIndex === globalIndex
                
                return (
                  <Reveal key={service.id} delayMs={index * 80}>
                    <div
                      className="group bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40"
                    >
                      {/* Header */}
                      <button
                        onClick={() => toggleAccordion(globalIndex)}
                        className="w-full p-6 text-left transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            {/* Title Content */}
                            <div className="flex-1">
                              <h3 
                                className="font-bold text-scout-text-white font-teko"
                                style={{
                                  fontSize: 'calc(1rem + 0.75vw)' // Scales with container width
                                }}
                              >
                                {service.title}
                              </h3>
                            </div>
                          </div>

                          {/* Arrow Icon */}
                          <div className="w-8 h-8 border border-scout-border/60 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:border-scout-green/60">
                            <svg 
                              className={`w-4 h-4 transition-all duration-200 ${isActive ? 'rotate-180' : ''} text-scout-text-white`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* Content */}
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          height: isActive ? `${heights[globalIndex]}px` : '0px'
                        }}
                      >
                        <div 
                          ref={el => contentRefs.current[globalIndex] = el}
                          className="px-6 pb-6"
                        >
                          {/* Description */}
                          <p 
                            className="text-scout-text-muted font-metropolis leading-relaxed mb-6"
              style={{
                fontSize: 'calc(0.8125rem + 0.375vw)' // Scales with container width
              }}
                          >
                            {service.description}
                          </p>

                          {/* Services List */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.services.map((serviceItem, serviceIndex) => (
                              <div
                                key={serviceItem}
                                className="flex items-center justify-center py-3 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30 hover:border-scout-green/40 transition-all duration-200"
                              >
                                <span 
                                  className="text-scout-text-white font-metropolis font-medium"
                                  style={{
                                    fontSize: 'calc(0.8125rem + 0.375vw)' // Scales with container width
                                  }}
                                >
                                  {serviceItem}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Action Button */}
                          <div className="mt-6 pt-4 border-t border-scout-border/20">
                            <button 
                              className="inline-flex items-center gap-2 px-6 py-3 border border-scout-border/40 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10"
              style={{
                fontSize: 'calc(0.8125rem + 0.375vw)' // Scales with container width
              }}
                            >
                              <span>Explore Service</span>
                              <svg 
                                className="fill-none stroke-currentColor" 
                                style={{
                                  width: 'calc(0.75rem + 0.25vw)',
                                  height: 'calc(0.75rem + 0.25vw)'
                                }}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-16" />

      </div>
    </section>
  )
}