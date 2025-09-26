import { useState, useRef, useEffect } from "react"
import Reveal from "@/components/ui/Reveal"

const ALL_SERVICES = [
  {
    id: "defence-1",
    title: "Office of Trade Representatives",
    subtitle: "OTR",
    description: "Identifying local partners, conducting technology testing & validation, liaising with authorities, establishing production facilities, and managing projects in the framework of the aid programs.",
    services: ["Partner Identification", "Technology Testing", "Authority Liaison", "Production Facilities", "Project Management"],
    category: "defence"
  },
  {
    id: "defence-2", 
    title: "Triada Export Agency",
    subtitle: "TEA",
    description: "We are dedicated to showcasing Ukraine's defense capabilities to the international community. Our mission involves presenting Ukrainian defense companies and their innovations to global markets, emphasizing their expertise and contributions.",
    services: ["Global Market Presentation", "Partnership Building", "International Recognition", "Innovation Showcase"],
    category: "defence"
  },
  {
    id: "defence-3",
    title: "Training & Technical Support",
    subtitle: "TTS",
    description: "In close cooperation with veterans and current combatants, our company has created a special program that combines the necessary structure and expertise with the opportunity for businesses in the defense cluster to take their technologies to a new level.",
    services: ["System Integration", "Technical Training", "Veteran Collaboration", "Technology Advancement"],
    category: "defence"
  },
  {
    id: "legal-1",
    title: "Press & Consulting Services",
    subtitle: "PCS",
    description: "Comprehensive press and consulting services providing market insights, analytical reports, and strategic intelligence to support informed decision-making in the defense sector.",
    services: ["Market Insights", "Weekly Digests", "Analytical Reports", "OSINT"],
    category: "legal"
  },
  {
    id: "legal-2",
    title: "Legal & Financing Services",
    subtitle: "LFS",
    description: "Expert legal and financial services ensuring compliance, risk management, and strategic financial guidance for defense sector operations and international partnerships.",
    services: ["Counterparty Verification & Risk Management", "Legal Support & Document Legalization", "Consulting on Controlled Foreign Companies (CFCs)", "Intellectual Property Rights Legislation"],
    category: "legal"
  }
]

export default function DefenceProgramsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
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
      <div className="container px-6 mx-auto">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
          
          {/* Left Column - Defence Programs */}
          <div>
            <Reveal variant="slide-up">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-scout-text-white font-teko">
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
                              <h3 className="text-xl md:text-2xl font-bold text-scout-text-white font-teko">
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
                          <p className="text-scout-text-muted font-metropolis leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* Services List */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.services.map((serviceItem, serviceIndex) => (
                              <div
                                key={serviceItem}
                                className="flex items-center justify-center py-3 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30 hover:border-scout-green/40 transition-all duration-200"
                              >
                                <span className="text-scout-text-white font-metropolis text-sm font-medium">
                                  {serviceItem}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Action Button */}
                          <div className="mt-6 pt-4 border-t border-scout-border/20">
                            <button className="inline-flex items-center gap-2 px-6 py-3 border border-scout-border/40 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10">
                              <span>Explore Program</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <h2 className="text-3xl md:text-4xl font-bold text-scout-text-white font-teko">
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
                              <h3 className="text-xl md:text-2xl font-bold text-scout-text-white font-teko">
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
                          <p className="text-scout-text-muted font-metropolis leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* Services List */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.services.map((serviceItem, serviceIndex) => (
                              <div
                                key={serviceItem}
                                className="flex items-center justify-center py-3 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30 hover:border-scout-green/40 transition-all duration-200"
                              >
                                <span className="text-scout-text-white font-metropolis text-sm font-medium">
                                  {serviceItem}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Action Button */}
                          <div className="mt-6 pt-4 border-t border-scout-border/20">
                            <button className="inline-flex items-center gap-2 px-6 py-3 border border-scout-border/40 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10">
                              <span>Explore Service</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 border border-scout-border/40 rounded-xl bg-scout-card-bg/60 backdrop-blur-sm">
            <span className="text-scout-text-white font-teko text-lg">
              Ready to strengthen Ukraine's defense capabilities?
            </span>
            <button className="px-6 py-3 border border-scout-green/60 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:bg-scout-green/10 hover:border-scout-green">
              Start Partnership
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

