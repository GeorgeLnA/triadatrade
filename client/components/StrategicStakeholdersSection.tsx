import Reveal from "@/components/ui/Reveal";

export default function StrategicStakeholdersSection() {
  const stakeholders = [
    {
      logo: "/mod_ukraine.avif",
      alt: "Ministry of Defense of Ukraine",
      name: "Ministry of Defense\nof Ukraine"
    },
    {
      logo: "/mia_ukraine.avif",
      alt: "Ministry of Internal Affairs of Ukraine",
      name: "Ministry of Internal\nAffairs of Ukraine"
    },
    {
      logo: "/msi_ukraine.avif",
      alt: "Ministry of Strategic Industries of Ukraine",
      name: "Ministry of Strategic\nIndustries of Ukraine"
    },
    {
      logo: "/general_staff.avif",
      alt: "General Staff of the Armed Forces of Ukraine",
      name: "General Staff of the\nArmed Forces of Ukraine"
    },
    {
      logo: "/land_forces.avif",
      alt: "Land Forces Command",
      name: "Land Forces\nCommand"
    },
    {
      logo: "/air_forces.avif",
      alt: "Air Forces Command",
      name: "Air Forces\nCommand"
    },
    {
      logo: "/naval_forces.avif",
      alt: "Naval Forces Command",
      name: "Naval Forces\nCommand"
    },
    {
      logo: "/uav_forces.avif",
      alt: "UAV Forces Command",
      name: "UAV Forces\nCommand"
    },
    {
      logo: "/special_forces.avif",
      alt: "Special Operation Forces",
      name: "Special Operation\nForces"
    },
    {
      logo: "/national_guard.avif",
      alt: "National Guard of Ukraine",
      name: "National Guard of\nUkraine"
    }
  ];

  // Duplicate stakeholders for seamless loop
  const duplicatedStakeholders = [...stakeholders, ...stakeholders];

  return (
    <section className="w-full py-20 bg-scout-dark relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <Reveal variant="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6 font-teko">
                STRATEGIC DEFENCE STAKEHOLDERS
              </h2>
            </div>
          </Reveal>

          {/* Mobile: Horizontal Strip */}
          <Reveal>
            <div className="md:hidden relative overflow-hidden">
              <div className="flex gap-4 animate-scroll-seamless">
              {duplicatedStakeholders.map((stakeholder, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 flex items-center justify-center min-w-[100px]"
                >
                  <div className="w-20 h-20 flex items-center justify-center p-2">
                    <img 
                      src={stakeholder.logo} 
                      alt={stakeholder.alt}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
              ))}
              </div>
            </div>
          </Reveal>

          {/* Desktop: Circular Layout Container */}
          <Reveal variant="fade" delayMs={100}>
            <div className="hidden md:block relative w-full h-[600px] flex items-center justify-center">
            {/* Center Logo - Triada Trade */}
            <div className="absolute z-20 flex items-center justify-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="w-40 h-40 flex items-center justify-center p-5">
                <img 
                  src="/TT logo.png" 
                  alt="Triada Trade"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Spinning Circular Stakeholder Logos */}
            <div className="absolute inset-0 animate-spin-slow">
              {stakeholders.map((stakeholder, index) => {
                const angle = (index * 360) / stakeholders.length;
                const radius = 220; // Distance from center
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                
                return (
                  <div
                    key={index}
                    className="absolute flex items-center justify-center"
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      left: '50%',
                      top: '50%'
                    }}
                  >
                    {/* Logo with counter-rotation */}
                    <div 
                      className="w-24 h-24 flex items-center justify-center p-3 animate-spin-reverse"
                    >
                      <img 
                        src={stakeholder.logo} 
                        alt={stakeholder.alt}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          // Fallback to placeholder if image doesn't exist
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
