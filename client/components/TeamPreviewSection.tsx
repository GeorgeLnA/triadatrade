import { useState, useEffect } from "react";
import Reveal from "@/components/ui/Reveal";

const SENIOR_LEADERS = [
  {
    id: "ceo",
    name: "Yaroslav Yakymov",
    role: "Chief Executive Officer",
    initials: "YY",
    image: "/WhatsApp Image 2025-11-13 at 09.06.08.jpeg",
    description: "Leading strategic vision and overall company direction with extensive experience in defence sector partnerships.",
    skills: ["Strategic Planning", "Defence Partnerships", "Leadership"],
    experience: "15+ years",
    category: "senior"
  },
  {
    id: "cro",
    name: "Marsel Nikitin", 
    role: "Chief Revenue Officer",
    initials: "MN",
    image: "/m.jpeg",
    description: "Driving revenue growth and business development initiatives across international markets.",
    skills: ["Revenue Growth", "Business Development", "Market Strategy"],
    experience: "12+ years",
    category: "senior"
  }
];

const TEAM_MEMBERS = [
  {
    id: "taxation",
    name: "Oleksandra Nikitina",
    role: "Taxation Expert", 
    initials: "ON",
    image: "/oleksandra_nikitina_bw.jpg",
    description: "Providing expert guidance on complex taxation matters and ensuring regulatory compliance.",
    skills: ["Tax Planning", "Regulatory Compliance", "International Tax"],
    experience: "8+ years",
    category: "leadership"
  },
  {
    id: "production",
    name: "Olena Danyliv",
    role: "Production Advisor", 
    initials: "ED",
    image: "/WhatsApp Image 2025-11-13 at 14.35.35.jpeg",
    description: "Advising on production processes and ensuring operational efficiency across manufacturing operations.",
    skills: ["Production Management", "Process Optimization", "Quality Control"],
    experience: "9+ years",
    category: "leadership"
  },
  {
    id: "international",
    name: "Maksym Obod",
    role: "Battle management consulting", 
    initials: "MO",
    image: "/maks.jpeg",
    description: "Battalion Commander with extensive experience in combat operations and tactics of usage of various UAV systems.",
    skills: ["International Relations", "Partnership Development", "Cross-Cultural Communication"],
    experience: "13+ years",
    category: "leadership"
  },
  {
    id: "uav",
    name: "Oleg Pryimenko",
    role: "Chief of R&D operations",
    initials: "OP", 
    image: "/WhatsApp Image 2025-11-13 at 14.35.36.jpeg",
    description: "Leading UAV testing and operations with extensive experience in unmanned systems and technical validation.",
    skills: ["UAV Systems", "Technical Testing", "Operations Management"],
    experience: "14+ years",
    category: "specialist"
  },
  {
    id: "commercial",
    name: "Denis Sviatokum",
    role: "Commercial Agent", 
    initials: "DS",
    image: "/d.jpeg",
    description: "Facilitating commercial transactions and managing client relationships across various markets.",
    skills: ["Commercial Operations", "Client Relations", "Sales Strategy"],
    experience: "7+ years",
    category: "leadership"
  },
  {
    id: "analytics",
    name: "Bohdan Popov",
    role: "Head of Analytical Department", 
    initials: "BP",
    image: "/WhatsApp Image 2025-11-12 at 11.53.51.jpeg",
    description: "Leading our analytical team in providing market insights, OSINT analysis, and strategic intelligence.",
    skills: ["OSINT Analysis", "Market Intelligence", "Strategic Analysis"],
    experience: "6+ years",
    category: "specialist"
  }
];

const STATS = [
  { number: "15+", label: "Active Projects" },
  { number: "50+", label: "Successfully Completed" },
  { number: "$300M+", label: "Attracted Investments" },
  { number: "100%", label: "Client Satisfaction" }
];

export default function TeamPreviewSection() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      className="w-full bg-scout-dark"
      style={{ paddingTop: 'clamp(3rem, 12vw, 7.5rem)', paddingBottom: 'clamp(3rem, 12vw, 7.5rem)' }}
    >
      <div 
        className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8"
        style={{
          marginLeft: 'clamp(1rem, 4vw, 70px)',
          marginRight: 'clamp(1rem, 4vw, 70px)',
          maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))'
        }}
      >
        <Reveal variant="slide-up">
          <div className="text-center mb-16">
            <h2 
              className="font-bold text-scout-text-white mb-8 md:mb-16 font-teko"
              style={{
                fontSize: 'clamp(1.75rem, 7vw, calc(1.5rem + 2vw))' // Even larger heading on mobile
              }}
            >
              MEET OUR EXPERT TEAM
            </h2>
          </div>
        </Reveal>

        {/* Senior Leaders - 2 cards at the top */}
        <Reveal>
          <div className="flex justify-center mb-16">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl">
              {SENIOR_LEADERS.map((member, index) => (
                <div 
                  key={member.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40 hover:scale-105">
                  {/* Image Container */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        member.id === 'cro' ? 'object-top' : 'object-center'
                      }`}
                      style={{
                        ...(member.id === 'cro' 
                          ? { objectPosition: isMobile ? 'center 0%' : 'center 10%' } 
                          : member.id === 'ceo' 
                          ? { objectPosition: 'center 0%' } 
                          : member.id === 'international' 
                          ? { objectPosition: 'center 30%' } 
                          : member.id === 'commercial' 
                          ? { objectPosition: 'center 0%' } 
                          : member.id === 'finance' 
                          ? { objectPosition: 'center 0%' } 
                          : member.id === 'taxation' 
                          ? { objectPosition: 'center 0%' } 
                          : member.id === 'production' 
                          ? { objectPosition: 'center 0%' } 
                          : member.id === 'rd' 
                          ? { objectPosition: 'center 0%' } 
                          : { objectPosition: 'center 10%' }),
                        transform: member.id === 'cro' 
                          ? (isMobile ? 'scale(1.8)' : 'scale(1.5)') 
                          : 'scale(1)',
                        ...(member.id === 'ceo' || member.id === 'cro' ? {} : {})
                      }}
                      onMouseEnter={(e) => {
                        if (member.id === 'cro') {
                          e.currentTarget.style.transform = isMobile ? 'scale(2)' : 'scale(1.65)';
                        } else {
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (member.id === 'cro') {
                          e.currentTarget.style.transform = isMobile ? 'scale(1.8)' : 'scale(1.5)';
                        } else {
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/80 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 lg:p-8">
                    <div className="flex flex-col items-center mb-4 md:mb-6">
                      <h3 
                        className="font-bold text-scout-text-white mb-2 md:mb-3 font-teko text-center"
                        style={{
                          fontSize: 'clamp(1.5rem, 5vw, calc(1.25rem + 1vw))' // Even larger name text on mobile
                        }}
                      >
                        {member.name}
                      </h3>
                      <p 
                        className="text-scout-text-muted font-metropolis leading-relaxed block w-full"
                        style={{
                          fontSize: 'clamp(1.125rem, 3.5vw, calc(1rem + 0.5vw))', // Even larger role text on mobile
                          textAlign: 'center',
                          display: 'block',
                          width: '100%',
                          margin: '0 auto'
                        }}
                      >
                        {member.role}
                      </p>
                    </div>


                    {/* Description - Shows on hover */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                      hoveredMember === member.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p 
                        className="text-scout-text-muted font-metropolis leading-relaxed mb-4 md:mb-6 text-center block w-full"
                        style={{
                          fontSize: 'clamp(1.0625rem, 3vw, calc(0.875rem + 0.25vw))', // Even larger description text on mobile
                          textAlign: 'center',
                          display: 'block',
                          width: '100%',
                          margin: '0 auto'
                        }}
                      >
                        {member.description}
                      </p>
                    </div>
                    <div className="pt-6" />
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Team Members - Grouped in Pairs with Headers */}
        {[
          {
            header: "Legal & Financial Consulting",
            members: [TEAM_MEMBERS[0], TEAM_MEMBERS[1]] // Oleksandra, Olena
          },
          {
            header: "R&D Operations and Technical consulting",
            members: [TEAM_MEMBERS[2], TEAM_MEMBERS[3]] // Maksym, Oleg
          },
          {
            header: "comercial activitties and representation",
            members: [TEAM_MEMBERS[4], TEAM_MEMBERS[5]] // Denis, Bohdan
          }
        ].map((pair, pairIndex) => (
          <Reveal key={pairIndex} delayMs={pairIndex * 100}>
            <div className="mb-8 md:mb-12">
              {/* Header */}
              {pair.header && (
                <div className="mb-6 md:mb-8">
                  <h3 
                    className="font-bold text-scout-text-white font-teko text-center"
                    style={{
                      fontSize: 'clamp(1.375rem, 4.5vw, calc(1rem + 0.75vw))'
                    }}
                  >
                    {pair.header}
                  </h3>
                </div>
              )}

              {/* Pair of Cards */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
                {pair.members.map((member) => (
                  <div 
                    key={member.id}
                    className="group relative h-full"
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40 hover:scale-105 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative h-48 md:h-64 overflow-hidden flex-shrink-0">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                            member.id === 'cro' ? 'object-top' : 'object-center'
                          }`}
                          style={{
                            ...(member.id === 'cro' ? { objectPosition: 'center 10%' } : member.id === 'ceo' ? { objectPosition: 'center 55%' } : member.id === 'international' ? { objectPosition: 'center 30%' } : member.id === 'commercial' ? { objectPosition: 'center 0%' } : member.id === 'finance' ? { objectPosition: 'center 0%' } : member.id === 'taxation' ? { objectPosition: 'center 0%' } : member.id === 'production' ? { objectPosition: 'center 0%' } : member.id === 'rd' ? { objectPosition: 'center 0%' } : member.id === 'analytics' ? { objectPosition: 'center 20%' } : { objectPosition: 'center 10%' }),
                            ...(member.id === 'analytics' ? { filter: 'grayscale(100%)' } : {})
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/80 via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-6 flex flex-col flex-grow">
                        <div className="flex flex-col items-center mb-3 md:mb-4 flex-shrink-0">
                          <h3 
                            className="font-bold text-scout-text-white mb-1.5 md:mb-2 font-teko text-center"
                            style={{
                              fontSize: 'clamp(1.375rem, 4.5vw, calc(1rem + 0.75vw))' // Even larger name text on mobile
                            }}
                          >
                            {member.name}
                          </h3>
                          <p 
                            className="text-scout-text-muted font-metropolis leading-relaxed block w-full"
                            style={{
                              fontSize: 'clamp(1.0625rem, 3vw, calc(0.875rem + 0.25vw))', // Even larger role text on mobile
                              textAlign: 'center',
                              display: 'block',
                              width: '100%',
                              margin: '0 auto'
                            }}
                          >
                            {member.role}
                          </p>
                        </div>

                        {/* Description - Shows on hover */}
                        <div className={`transition-all duration-300 overflow-hidden flex-grow ${
                          hoveredMember === member.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <p 
                            className="text-scout-text-muted font-metropolis leading-relaxed mb-3 md:mb-4 text-center block w-full"
                            style={{
                              fontSize: 'clamp(1rem, 2.5vw, calc(0.75rem + 0.125vw))', // Even larger description text on mobile
                              textAlign: 'center',
                              display: 'block',
                              width: '100%',
                              margin: '0 auto'
                            }}
                          >
                            {member.description}
                          </p>
                        </div>
                        <div className="pt-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {/* Enhanced Stats */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-16">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center group">
                <div 
                  className="bg-scout-card-bg/60 border border-scout-border/40 rounded-lg md:rounded-xl p-4 md:p-6 backdrop-blur-sm hover:border-scout-green/40 transition-all duration-300 hover:scale-105 flex flex-col justify-center items-center"
                  style={{
                    minHeight: isMobile ? '140px' : 'auto',
                    height: isMobile ? '140px' : 'auto'
                  }}
                >
                  <div 
                    className="font-bold text-scout-green mb-1.5 md:mb-2 font-teko group-hover:scale-110 transition-transform duration-200"
                    style={{
                      fontSize: 'clamp(2rem, 7vw, calc(2rem + 1.5vw))' // Even larger stat numbers on mobile
                    }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-scout-text-muted font-metropolis text-center"
                    style={{
                      fontSize: 'clamp(1rem, 2.5vw, calc(0.75rem + 0.25vw))' // Even larger stat labels on mobile
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}