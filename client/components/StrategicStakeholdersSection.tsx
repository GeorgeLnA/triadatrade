import { useEffect, useRef, useState } from "react";
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
    },
    {
      logo: "/omega Background Removed.png",
      alt: "Omega Defense Systems",
      name: "Omega Defense\nSystems"
    }
  ];

  // Duplicate stakeholders for seamless loop
  const duplicatedStakeholders = [...stakeholders, ...stakeholders];

  // Animate stakeholders along a horizontal oval path on desktop
  const [rotationDeg, setRotationDeg] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const speedDegPerSec = 8; // adjust to control orbit speed

    const animate = (timestamp: number) => {
      if (startTimeRef.current == null) startTimeRef.current = timestamp;
      const elapsedMs = timestamp - startTimeRef.current;
      const angle = (elapsedMs / 1000) * speedDegPerSec;
      setRotationDeg(angle % 360);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      startTimeRef.current = null;
    };
  }, []);

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
                  <div 
                    className="flex items-center justify-center p-2"
                    style={{
                      width: 'calc(4rem + 2vw)',
                      height: 'calc(4rem + 2vw)'
                    }}
                  >
                    <img 
                      src={stakeholder.logo} 
                      alt={stakeholder.alt}
                      className="max-w-full max-h-full object-contain"
                      style={{
                        filter: stakeholder.logo === '/omega Background Removed.png' ? 'brightness(0) invert(1)' : 'hue-rotate(0deg) saturate(0) brightness(1)',
                        transform: stakeholder.logo === '/omega Background Removed.png' ? 'rotate(0deg) rotate(-360deg)' : 'none'
                      }}
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

            {/* Horizontal Oval Stakeholder Logos */}
            <div className="absolute inset-0">
              {stakeholders.map((stakeholder, index) => {
                const baseAngle = (index * 360) / stakeholders.length;
                const angle = baseAngle + rotationDeg;
                const radiusX = 350; // horizontal radius (wider)
                const radiusY = 220; // vertical radius (narrower)
                const x = Math.cos((angle * Math.PI) / 180) * radiusX;
                const y = Math.sin((angle * Math.PI) / 180) * radiusY;
                
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
                      className="flex items-center justify-center p-3"
                      style={{
                        width: 'calc(5rem + 2.5vw)',
                        height: 'calc(5rem + 2.5vw)'
                      }}
                    >
                      <img 
                        src={stakeholder.logo} 
                        alt={stakeholder.alt}
                        className="max-w-full max-h-full object-contain"
                        style={{
                          filter: stakeholder.logo === '/omega Background Removed.png' ? 'brightness(0) invert(1)' : 'hue-rotate(0deg) saturate(0) brightness(1)'
                        }}
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
