import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TEAM_MEMBERS = [
  {
    id: "senior-1",
    name: "YAROSLAV YAKYMOV",
    initials: "YY",
    role: "Chief Executive Officer (CEO)",
    category: "senior",
    description: "Leading strategic vision and overall company direction with extensive experience in defence sector partnerships.",
    skills: ["Strategic Planning", "Defence Partnerships", "Leadership", "International Relations"],
    experience: "15+ years in defence sector"
  },
  {
    id: "senior-2",
    name: "MARSEL NIKITIN",
    initials: "MN",
    role: "Chief Revenue Officer (CRO)",
    category: "senior",
    description: "Driving revenue growth and business development initiatives across international markets.",
    skills: ["Revenue Growth", "Business Development", "Market Strategy", "Partnership Building"],
    experience: "12+ years in business development"
  },
  {
    id: "leadership-1",
    name: "NATALI BOYCHENKO",
    initials: "NB",
    role: "Financial Director",
    category: "leadership",
    description: "Overseeing financial operations and ensuring fiscal responsibility across all company activities.",
    skills: ["Financial Management", "Budget Planning", "Risk Assessment", "Compliance"],
    experience: "10+ years in finance"
  },
  {
    id: "leadership-2",
    name: "OLEKSANDRA NIKITINA",
    initials: "ON",
    role: "Taxation Expert",
    category: "leadership",
    description: "Providing expert guidance on complex taxation matters and ensuring regulatory compliance.",
    skills: ["Tax Planning", "Regulatory Compliance", "International Tax", "Financial Analysis"],
    experience: "8+ years in taxation"
  },
  {
    id: "leadership-3",
    name: "OLENA DANYLIV",
    initials: "ED",
    role: "Production Advisor",
    category: "leadership",
    description: "Advising on production processes and ensuring operational efficiency across manufacturing operations.",
    skills: ["Production Management", "Process Optimization", "Quality Control", "Supply Chain"],
    experience: "9+ years in production"
  },
  {
    id: "leadership-4",
    name: "YURII ZOZULYA",
    initials: "YZ",
    role: "R&D Provisioning",
    category: "leadership",
    description: "Leading research and development initiatives to drive innovation and technological advancement.",
    skills: ["Research & Development", "Innovation", "Technology Strategy", "Project Management"],
    experience: "11+ years in R&D"
  },
  {
    id: "leadership-5",
    name: "OLIVER MORLEY",
    initials: "OM",
    role: "International Relations",
    category: "leadership",
    description: "Managing international partnerships and fostering relationships with global stakeholders.",
    skills: ["International Relations", "Partnership Development", "Cross-Cultural Communication", "Diplomacy"],
    experience: "13+ years in international relations"
  },
  {
    id: "leadership-6",
    name: "DENIS SVIATOKUM",
    initials: "DS",
    role: "Commercial Agent",
    category: "leadership",
    description: "Facilitating commercial transactions and managing client relationships across various markets.",
    skills: ["Commercial Operations", "Client Relations", "Sales Strategy", "Market Analysis"],
    experience: "7+ years in commercial operations"
  },
  {
    id: "specialist-1",
    name: "OLEG PRYIMENKO",
    initials: "OP",
    role: "UAV Expert; Chief of Testing Operations",
    category: "specialist",
    description: "Leading UAV testing and operations with extensive experience in unmanned systems and technical validation.",
    skills: ["UAV Systems", "Technical Testing", "Operations Management", "System Integration"],
    experience: "14+ years in UAV operations"
  },
  {
    id: "specialist-2",
    name: "BOHDAN POPOV",
    initials: "BP",
    role: "Head of Analytical Department",
    category: "specialist",
    description: "Leading our analytical team in providing market insights, OSINT analysis, and strategic intelligence.",
    skills: ["OSINT Analysis", "Market Intelligence", "Strategic Analysis", "Data Analytics"],
    experience: "6+ years in intelligence analysis"
  }
];

const TEAM_VALUES = [
  {
    title: "COLLABORATION",
    description: "Working together across disciplines to deliver comprehensive solutions for our partners.",
    icon: "🤝"
  },
  {
    title: "INNOVATION",
    description: "Embracing new technologies and methodologies to stay at the forefront of defence industry developments.",
    icon: "💡"
  },
  {
    title: "EXCELLENCE",
    description: "Maintaining the highest standards of quality and professionalism in all our work and partnerships.",
    icon: "⭐"
  }
];

export default function Team() {
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [heights, setHeights] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const newHeights = contentRefs.current.map(ref => 
      ref ? ref.scrollHeight : 0
    )
    setHeights(newHeights)
  }, [activeMember]);

  const toggleMember = (memberId: string) => {
    setActiveMember(activeMember === memberId ? null : memberId);
  };

  const getMembersByCategory = (category: string) => {
    return TEAM_MEMBERS.filter(member => member.category === category);
  };

  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8 font-teko">
                OUR TEAM
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted font-metropolis leading-relaxed">
                Meet the experienced professionals driving Triada Trade's mission to strengthen Ukraine's defence partnerships.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Senior Partners Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                SENIOR PARTNERS
              </h2>
              
              <div className="space-y-4">
                {getMembersByCategory("senior").map((member, index) => {
                  const isActive = activeMember === member.id;
                  
                  return (
                    <div
                      key={member.id}
                      className="group bg-scout-dark/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40"
                    >
                      {/* Header */}
                      <button
                        onClick={() => toggleMember(member.id)}
                        className="w-full p-8 text-left transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-8">
                            {/* Avatar */}
                            <div className="w-20 h-20 bg-scout-green rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                              <span className="text-2xl font-bold text-scout-dark">{member.initials}</span>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                              <h3 className="text-2xl md:text-3xl font-bold text-scout-text-white font-teko mb-2">
                                {member.name}
                              </h3>
                              <p className="text-scout-text-muted font-metropolis text-lg mb-2">{member.role}</p>
                              <p className="text-scout-text-muted font-metropolis text-sm">{member.experience}</p>
                            </div>
                          </div>

                          {/* Arrow Icon */}
                          <div className="w-10 h-10 border border-scout-border/60 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:border-scout-green/60">
                            <svg 
                              className={`w-5 h-5 transition-all duration-200 ${isActive ? 'rotate-180' : ''} text-scout-text-white`}
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
                          height: isActive ? `${heights[index]}px` : '0px'
                        }}
                      >
                        <div 
                          ref={el => contentRefs.current[index] = el}
                          className="px-8 pb-8"
                        >
                          {/* Description */}
                          <p className="text-scout-text-muted font-metropolis leading-relaxed mb-6">
                            {member.description}
                          </p>

                          {/* Skills */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            {member.skills.map((skill, skillIndex) => (
                              <div
                                key={skill}
                                className="flex items-center justify-center py-3 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30 hover:border-scout-green/40 transition-all duration-200"
                              >
                                <span className="text-scout-text-white font-metropolis text-sm font-medium">
                                  {skill}
                                </span>
                              </div>
                            ))}
                </div>
                
                          {/* Action Button */}
                          <div className="pt-4 border-t border-scout-border/20">
                            <button className="inline-flex items-center gap-2 px-6 py-3 border border-scout-border/40 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10">
                              <span>View Profile</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                  </div>
                </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Leadership Team Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                LEADERSHIP TEAM
              </h2>
              
              <div className="space-y-4">
                {getMembersByCategory("leadership").map((member, index) => {
                  const globalIndex = TEAM_MEMBERS.findIndex(m => m.id === member.id);
                  const isActive = activeMember === member.id;
                  
                  return (
                    <div
                      key={member.id}
                      className="group bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40"
                    >
                      {/* Header */}
                      <button
                        onClick={() => toggleMember(member.id)}
                        className="w-full p-6 text-left transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                              <span className="text-lg font-bold text-scout-dark">{member.initials}</span>
                </div>
                
                            {/* Content */}
                            <div className="flex-1">
                              <h3 className="text-xl md:text-2xl font-bold text-scout-text-white font-teko mb-1">
                                {member.name}
                              </h3>
                              <p className="text-scout-text-muted font-metropolis">{member.role}</p>
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
                          <p className="text-scout-text-muted font-metropolis leading-relaxed mb-4">
                            {member.description}
                          </p>

                          {/* Skills */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                            {member.skills.map((skill, skillIndex) => (
                              <div
                                key={skill}
                                className="flex items-center justify-center py-2 px-3 rounded-lg bg-scout-dark/40 border border-scout-border/30 hover:border-scout-green/40 transition-all duration-200"
                              >
                                <span className="text-scout-text-white font-metropolis text-xs font-medium">
                                  {skill}
                                </span>
                  </div>
                            ))}
                </div>
                
                          {/* Experience */}
                          <div className="pt-3 border-t border-scout-border/20">
                            <span className="text-scout-text-muted font-metropolis text-sm">
                              {member.experience}
                            </span>
                  </div>
                </div>
                  </div>
                </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Specialists Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                SPECIALISTS
              </h2>
              
              <div className="space-y-4">
                {getMembersByCategory("specialist").map((member, index) => {
                  const globalIndex = TEAM_MEMBERS.findIndex(m => m.id === member.id);
                  const isActive = activeMember === member.id;
                  
                  return (
                    <div
                      key={member.id}
                      className="group bg-scout-dark/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40"
                    >
                      {/* Header */}
                      <button
                        onClick={() => toggleMember(member.id)}
                        className="w-full p-8 text-left transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-8">
                            {/* Avatar */}
                            <div className="w-20 h-20 bg-scout-green rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                              <span className="text-2xl font-bold text-scout-dark">{member.initials}</span>
                    </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                              <h3 className="text-2xl md:text-3xl font-bold text-scout-text-white font-teko mb-2">
                                {member.name}
                              </h3>
                              <p className="text-scout-text-muted font-metropolis text-lg mb-2">{member.role}</p>
                              <p className="text-scout-text-muted font-metropolis text-sm">{member.experience}</p>
                  </div>
                </div>
                
                          {/* Arrow Icon */}
                          <div className="w-10 h-10 border border-scout-border/60 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:border-scout-green/60">
                            <svg 
                              className={`w-5 h-5 transition-all duration-200 ${isActive ? 'rotate-180' : ''} text-scout-text-white`}
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
                          className="px-8 pb-8"
                        >
                          {/* Description */}
                          <p className="text-scout-text-muted font-metropolis leading-relaxed mb-6">
                            {member.description}
                          </p>

                          {/* Skills */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            {member.skills.map((skill, skillIndex) => (
                              <div
                                key={skill}
                                className="flex items-center justify-center py-3 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30 hover:border-scout-green/40 transition-all duration-200"
                              >
                                <span className="text-scout-text-white font-metropolis text-sm font-medium">
                                  {skill}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Action Button */}
                          <div className="pt-4 border-t border-scout-border/20">
                            <button className="inline-flex items-center gap-2 px-6 py-3 border border-scout-border/40 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10">
                              <span>View Profile</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </button>
                          </div>
                    </div>
                  </div>
                </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Team Values Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                OUR TEAM VALUES
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {TEAM_VALUES.map((value, index) => (
                  <div 
                    key={value.title}
                    className="group text-center p-8 rounded-xl bg-scout-card-bg/60 border border-scout-border/40 backdrop-blur-sm hover:border-scout-green/40 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                      {value.icon}
                </div>
                    <h3 className="text-xl font-bold text-scout-text-white mb-3 font-teko uppercase tracking-wider">
                      {value.title}
                    </h3>
                  <p className="text-scout-text-muted font-metropolis text-sm leading-relaxed">
                      {value.description}
                  </p>
                </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* CTA Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 border border-scout-border/40 rounded-xl bg-scout-dark/60 backdrop-blur-sm">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-scout-text-white mb-4 font-teko">
                JOIN OUR MISSION
              </h2>
                  <p className="text-lg text-scout-text-muted font-metropolis">
                Interested in joining our team or learning more about career opportunities at Triada Trade?
              </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact">
                    <button className="px-8 py-4 border border-scout-green/60 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:bg-scout-green/10 hover:border-scout-green">
                    Contact Us
                  </button>
                </a>
                <a href="/partners">
                    <button className="px-8 py-4 border border-scout-border/40 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10">
                    View Partners
                  </button>
                </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}







