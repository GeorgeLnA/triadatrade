import { useState, useRef, useEffect } from "react"
import Reveal from "@/components/ui/Reveal"
import { PixelButton } from "@/components/ui/PixelButton"

export interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  bulletPoints: string[]
  useCases?: string[]
  capabilities?: string[]
  engagementAreas?: string[]
  deliverables?: string[]
  category: "defence" | "legal"
}

export const ALL_SERVICES: Service[] = [
  {
    id: "defence-1",
    title: "R&D / CONSULTING / TALENT AQUISITION",
    subtitle: "R&D / TC / TA",
    description: "In close collaboration with veterans and active combatants, our company has developed a specialized program that integrates essential structure and expertise while enabling defense cluster businesses to elevate their technologies to a new level.",
    bulletPoints: [
      "Assessment of the technical complexity of implementation",
      "Product development & adaptation roadmap",
      "Comprehensive technical audit of innovations",
      "Search and selection of specialized personnel"
    ],
    useCases: [
      "Specialized talent acquisition – outsourcing-ready expert database",
      "Rapid validation of foreign technologies under operational constraints",
      "Localization roadmaps for tooling, training, and sustainment"
    ],
    capabilities: [
      "Technology integration and field deployment support",
      "Systematic workshops to gather feedback from end-users",
      "Integration of the product into the existing defense-tech ecosystem of Ukraine"
    ],
    category: "defence"
  },
  {
    id: "defence-2",
    title: "OFFICE OF TRADE REPRESENTATIVES",
    subtitle: "OTR",
    description: "The Trade Representatives Office program was established to offer a wide array of consulting services for small and medium-sized companies within the defense sector that are either planning to enter or are already operating in Ukraine. This program aims to foster international collaboration, build bilateral partnerships, engage with Ukrainian government agencies and the Defense Forces, secure contracts of various complexities, and cultivate additional commercial and partnership opportunities within the defense industry.",
    bulletPoints: [
      "Go-to market strategy development",
      "Promotion across the defence sector for the MOD and the private market",
      "Project management in the framework of technical and material support programs",
      "Comprehensive legal support among various structures of the Armed Forces of Ukraine"
    ],
    useCases: [
      "Establishing joint ventures & production facilities",
      "Direct engagement with end-users, product presentation, and feedback analysis",
      "Facilitating official interactions with Ukrainian government agencies and defense stakeholders"
    ],
    capabilities: [
      "Established network and strategic communication",
      "Compliance with the local structures and private partners",
      "Full-cycle project governance, from market entrance to secured contracts"
    ],
    category: "defence"
  },
  {
    id: "legal-1",
    title: "GR & CODIFICATION",
    subtitle: "GRC",
    description: "Regulatory navigation and market-entry enablement that keep manufacturing programmes compliant across NATO-aligned jurisdictions.",
    bulletPoints: [
      "Registration of production sites and products",
      "EU and US market entry support",
      "NATO (NSN) certification and codification",
      "Project implementation from prototype to serial production"
    ],
    engagementAreas: [
      "Risk, compliance, and documentation workflows",
      "Corporate structuring and IP protections",
      "Interaction with reliable Ukrainian defense manufacturers and suppliers, leading producers of military goods."
    ],
    deliverables: [
      "Due diligence packs and counterparty scoring",
      "Contracting, legalization, and filings toolkits",
      "Press kits, briefs, and stakeholder reports"
    ],
    category: "legal"
  },
  {
    id: "legal-2",
    title: "STRATEGIC ALLIED SUPPORT",
    subtitle: "SAS",
    description: "We are committed to showcasing Ukraine's defense capabilities on the international stage. Our efforts involve presenting Ukrainian defense companies and their products to global markets, highlighting their innovations and expertise. We facilitate connections that lead to partnerships and opportunities, ensuring that Ukrainian teams receive the recognition they deserve in the global defense ecosystem.",
    bulletPoints: [
      "Technological advantage for Ukraine and allies",
      "Support for early developers and investors",
      "Integrated technical, strategic, and corporate guidance",
      "Identification of the best combat-tested solutions in a specific field"
    ],
    engagementAreas: [
      "Market analysis and positioning",
      "Participation in global defense exhibitions",
      "Investor outreach and market communications"
    ],
    deliverables: [
      "Promotion strategy in international markets, connecting needs and decisions within the alliance",
      "Integration, training, and development of AI solutions based on existing battle experience",
      "Vendor identification and evaluation"
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

  const renderServiceContent = (service: Service) => {
    return (
      <div className="space-y-6">
        {/* Bullet Points */}
        {service.bulletPoints && service.bulletPoints.length > 0 && (
          <div className="space-y-2">
            {service.bulletPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 py-2"
              >
                <span className="text-scout-green text-xl font-light mt-0.5">⊹</span>
                <span 
                  className="text-scout-text-white font-metropolis flex-1"
                  style={{
                    fontSize: 'clamp(1.125rem, 3vw, calc(0.8125rem + 0.375vw))' // Even larger body text on mobile
                  }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="w-full py-12 md:py-20" style={{backgroundColor: '#050612'}}>
      {/* Dynamic container - responsive margins for mobile */}
      <div 
        className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8"
        style={{
          marginLeft: 'clamp(1rem, 4vw, 70px)',
          marginRight: 'clamp(1rem, 4vw, 70px)',
          maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))',
          paddingTop: '2rem',
          paddingBottom: '2rem'
        }}
      >
        {/* Section Header */}
        <Reveal variant="slide-up">
          <div className="mb-10 md:mb-12 text-center">
            <h2 
              className="font-bold text-scout-text-white font-teko mb-4 md:mb-8"
              style={{
                fontSize: 'clamp(1.75rem, 6vw, calc(1.375rem + 1.25vw))' // Even larger heading on mobile
              }}
            >
              OUR ACTIVITIES
            </h2>
          </div>
        </Reveal>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Defence Programs */}
          <div>
            <div className="space-y-3 md:space-y-4">
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
                        className="w-full p-4 md:p-6 text-left transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            {/* Title Content */}
                            <div className="flex-1">
                              <h3 
                                className="font-bold text-scout-text-white font-teko"
                                style={{
                                  fontSize: 'clamp(1.25rem, 4vw, calc(1rem + 0.75vw))' // Even larger text on mobile
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
                          className="px-4 md:px-6 pb-4 md:pb-6"
                        >
                          {renderServiceContent(service)}
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
            <div className="space-y-3 md:space-y-4">
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
                        className="w-full p-4 md:p-6 text-left transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            {/* Title Content */}
                            <div className="flex-1">
                              <h3 
                                className="font-bold text-scout-text-white font-teko"
                                style={{
                                  fontSize: 'clamp(1.25rem, 4vw, calc(1rem + 0.75vw))' // Even larger text on mobile
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
                          className="px-4 md:px-6 pb-4 md:pb-6"
                        >
                          {renderServiceContent(service)}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-16" />

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Reveal variant="slide-up">
            <PixelButton
              as="a"
              href="/activities"
              className="px-8 py-4 border border-scout-border/60 rounded-lg bg-scout-card-bg/60 backdrop-blur-sm text-scout-text-white font-teko font-bold transition-all duration-300 hover:border-scout-green/60 hover:bg-scout-card-bg/80"
              style={{
                fontSize: 'clamp(1.125rem, 3vw, calc(1rem + 0.5vw))'
              }}
            >
              Learn More
            </PixelButton>
          </Reveal>
        </div>

      </div>
    </section>
  )
}