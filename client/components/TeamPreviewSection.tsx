import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const SENIOR_LEADERS = [
  {
    id: "ceo",
    name: "Yaroslav Yakymov",
    role: "Chief Executive Officer",
    initials: "YY",
    image: "/yaroslav_yakymov_marsel_nikitin_mobile.jpg",
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
    image: "/yaroslav_yakymov_marsel_nikitin_mobile.jpg",
    description: "Driving revenue growth and business development initiatives across international markets.",
    skills: ["Revenue Growth", "Business Development", "Market Strategy"],
    experience: "12+ years",
    category: "senior"
  }
];

const TEAM_MEMBERS = [
  {
    id: "finance",
    name: "Natali Boychenko",
    role: "Financial Director", 
    initials: "NB",
    image: "/natali_boychenko.jpg",
    description: "Overseeing financial operations and ensuring fiscal responsibility across all company activities.",
    skills: ["Financial Management", "Budget Planning", "Risk Assessment"],
    experience: "10+ years",
    category: "leadership"
  },
  {
    id: "taxation",
    name: "Oleksandra Nikitina",
    role: "Taxation Expert", 
    initials: "ON",
    image: "/oleksandra_nikitina.jpg",
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
    image: "/olena_danyliv.jpg",
    description: "Advising on production processes and ensuring operational efficiency across manufacturing operations.",
    skills: ["Production Management", "Process Optimization", "Quality Control"],
    experience: "9+ years",
    category: "leadership"
  },
  {
    id: "rd",
    name: "Yurii Zozulya",
    role: "R&D Provisioning", 
    initials: "YZ",
    image: "/yurii_zozulya.jpg",
    description: "Leading research and development initiatives to drive innovation and technological advancement.",
    skills: ["Research & Development", "Innovation", "Technology Strategy"],
    experience: "11+ years",
    category: "leadership"
  },
  {
    id: "international",
    name: "Oliver Morley",
    role: "International Relations", 
    initials: "OM",
    image: "/oliver_morley.jpg",
    description: "Managing international partnerships and fostering relationships with global stakeholders.",
    skills: ["International Relations", "Partnership Development", "Cross-Cultural Communication"],
    experience: "13+ years",
    category: "leadership"
  },
  {
    id: "commercial",
    name: "Denis Sviatokum",
    role: "Commercial Agent", 
    initials: "DS",
    image: "/denis_sviatokum.jpg",
    description: "Facilitating commercial transactions and managing client relationships across various markets.",
    skills: ["Commercial Operations", "Client Relations", "Sales Strategy"],
    experience: "7+ years",
    category: "leadership"
  },
  {
    id: "uav",
    name: "Oleg Pryimenko",
    role: "UAV Expert & Chief of Operations",
    initials: "OP", 
    image: "/oleg_pryimenko.jpg",
    description: "Leading UAV testing and operations with extensive experience in unmanned systems and technical validation.",
    skills: ["UAV Systems", "Technical Testing", "Operations Management"],
    experience: "14+ years",
    category: "specialist"
  },
  {
    id: "analytics",
    name: "Bohdan Popov",
    role: "Head of Analytical Department", 
    initials: "BP",
    image: "/bohdan_popov.jpg",
    description: "Leading our analytical team in providing market insights, OSINT analysis, and strategic intelligence.",
    skills: ["OSINT Analysis", "Market Intelligence", "Strategic Analysis"],
    experience: "6+ years",
    category: "specialist"
  }
];


const STATS = [
  { number: "50+", label: "Years Combined Experience" },
  { number: "100+", label: "Successful Partnerships" },
    { number: "15+", label: "Team Members" },
    { number: "100%", label: "Client Satisfaction" }
  ];

export default function TeamPreviewSection() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <section className="w-full py-20 bg-scout-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal variant="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6 font-teko">
                MEET OUR EXPERT TEAM
              </h2>
            </div>
          </Reveal>

          {/* Senior Leaders - 2 cards at the top */}
          <Reveal>
            <div className="flex justify-center mb-16">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                {SENIOR_LEADERS.map((member, index) => (
                  <div 
                    key={member.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40 hover:scale-105">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/80 via-transparent to-transparent" />
                      
                      {/* Experience Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-scout-green/90 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-scout-dark font-teko text-sm font-bold">{member.experience}</span>
                        </div>
                      </div>

                      {/* Senior Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-scout-green/90 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-scout-dark font-teko text-sm font-bold">SENIOR</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-scout-text-white mb-3 font-teko">
                          {member.name}
                        </h3>
                        <p className="text-scout-text-muted font-metropolis text-lg leading-relaxed">
                          {member.role}
                        </p>
                </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {member.skills.map((skill, skillIndex) => (
                          <div
                            key={skill}
                            className="px-4 py-2 bg-scout-dark/40 border border-scout-border/30 rounded-full"
                          >
                            <span className="text-scout-text-white font-metropolis text-sm">
                              {skill}
                            </span>
              </div>
            ))}
          </div>

                      {/* Description - Shows on hover */}
                      <div className={`transition-all duration-300 overflow-hidden ${
                        hoveredMember === member.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-scout-text-muted font-metropolis text-sm leading-relaxed">
                          {member.description}
                        </p>
                      </div>

                      {/* View Profile Button - Shows on hover */}
                      <div className={`transition-all duration-300 ${
                        hoveredMember === member.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}>
                        <div className="pt-6 border-t border-scout-border/20">
                          <button className="w-full px-6 py-3 border border-scout-border/40 rounded-lg text-scout-text-white font-teko font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </Reveal>

          {/* Team Members - 8 cards below */}
          <Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {TEAM_MEMBERS.map((member, index) => (
                <div 
                  key={member.id}
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-scout-green/40 hover:scale-105 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/80 via-transparent to-transparent" />
                    
                    {/* Experience Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-scout-green/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-scout-dark font-teko text-xs font-bold">{member.experience}</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-scout-card-bg/80 backdrop-blur-sm px-3 py-1 rounded-full border border-scout-border/40">
                        <span className="text-scout-text-white font-metropolis text-xs font-medium uppercase tracking-wider">
                          {member.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-center mb-4 flex-shrink-0">
                      <h3 className="text-xl font-bold text-scout-text-white mb-2 font-teko">
                        {member.name}
                      </h3>
                      <p className="text-scout-text-muted font-metropolis text-sm leading-relaxed">
                        {member.role}
                      </p>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                      {member.skills.slice(0, 2).map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className="px-3 py-1 bg-scout-dark/40 border border-scout-border/30 rounded-full"
                        >
                          <span className="text-scout-text-white font-metropolis text-xs">
                            {skill}
                          </span>
                        </div>
                      ))}
                      {member.skills.length > 2 && (
                        <div className="px-3 py-1 bg-scout-green/20 border border-scout-green/40 rounded-full">
                          <span className="text-scout-green font-metropolis text-xs">
                            +{member.skills.length - 2}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description - Shows on hover */}
                    <div className={`transition-all duration-300 overflow-hidden flex-grow ${
                      hoveredMember === member.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-scout-text-muted font-metropolis text-xs leading-relaxed">
                        {member.description}
                      </p>
                    </div>

                    {/* View Profile Button - Shows on hover */}
                    <div className={`transition-all duration-300 flex-shrink-0 ${
                      hoveredMember === member.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      <div className="pt-4 border-t border-scout-border/20">
                        <button className="w-full px-4 py-2 border border-scout-border/40 rounded-lg text-scout-text-white font-teko text-sm font-medium transition-all duration-200 hover:border-scout-green/60 hover:bg-scout-green/10">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </Reveal>

          {/* Enhanced Stats */}
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-xl p-6 backdrop-blur-sm hover:border-scout-green/40 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl md:text-4xl font-bold text-scout-green mb-2 font-teko group-hover:scale-110 transition-transform duration-200">
                      {stat.number}
                  </div>
                    <div className="text-scout-text-muted text-sm font-metropolis">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
