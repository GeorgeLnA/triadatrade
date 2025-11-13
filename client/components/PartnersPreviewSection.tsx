import { useState, useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";

const PARTNERS = [
  { 
    name: "Octava Capital", 
    category: "Investment",
    logo: "/octava_capital.avif",
    description: "Strategic investment partner specializing in defence sector growth and development."
  },
  { 
    name: "Kord Defence", 
    category: "Defence Technology",
    logo: "/kord_defence.avif",
    description: "Leading provider of advanced defence technology solutions and systems integration."
  },
  { 
    name: "Ecovis Bondar & Bondar", 
    category: "Legal Services",
    logo: "/ecovis.avif",
    description: "Expert legal counsel specializing in international defence sector compliance and regulations."
  },
  { 
    name: "Avalor.AI", 
    category: "AI Solutions",
    logo: "/avalor.avif",
    description: "Cutting-edge artificial intelligence solutions for defence and security applications."
  },
  { 
    name: "InterProInvest", 
    category: "Investment",
    logo: "/ipi.avif",
    description: "International investment firm focused on defence industry partnerships and growth."
  },
  { 
    name: "NAUDI", 
    category: "Defence Association",
    logo: "/naudi.avif",
    description: "National Association of Ukrainian Defence Industry representing key sector stakeholders."
  },
  { 
    name: "TARGET", 
    category: "Defence Solutions",
    logo: "/Target-Logo-01.svg",
    description: "Leading provider of comprehensive defence solutions and strategic military support systems."
  },
  { 
    name: "Comand.AI", 
    category: "AI Technology",
    logo: "/666d7a08d48d27692185122e_Logo white.svg",
    description: "Advanced artificial intelligence command and control systems for modern defence operations."
  },
  { 
    name: "Nebo Peremogy", 
    category: "Defence Innovation",
    logo: "/Logo.svg",
    description: "Innovative defence technology company specializing in cutting-edge military solutions and systems."
  },
  { 
    name: "Cyclops", 
    category: "Defence Technology",
    logo: "/ChatGPT Image Nov 12, 2025, 01_24_16 PM.png",
    description: "Manufacturer/supplier of tactical military radios, UAS, and border security equipment to diverse worldwide customer base."
  }
];

export default function PartnersPreviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Auto-rotate partners every 4 seconds with smooth progress indicator
  useEffect(() => {
    // Reset progress when partner changes
    setProgress(0);
    startTimeRef.current = null;

    // Smooth animation using requestAnimationFrame
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const duration = 4000; // 4 seconds total
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Move to next partner when progress completes
        setCurrentIndex((prevIndex) => (prevIndex + 1) % PARTNERS.length);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [currentIndex]);

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
              TRUSTED BY INDUSTRY LEADERS
            </h2>
          </div>
        </Reveal>

        {/* Featured Partner - Large Card */}
        <Reveal>
          <div className="mb-16">
            <div className="group relative">
              <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-xl md:rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-scout-green/40 hover:scale-[1.02] min-h-64 md:h-64">
                <div className="p-6 md:p-12 h-full">
                  <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 h-full">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div 
                      className="bg-scout-dark/40 border border-scout-border/30 rounded-2xl flex items-center justify-center group-hover:border-scout-green/40 transition-all duration-300"
                      style={{
                        width: 'clamp(5rem, 12vw, calc(8rem + 2vw))',
                        height: 'clamp(5rem, 12vw, calc(8rem + 2vw))'
                      }}
                    >
                      <img 
                        src={PARTNERS[currentIndex].logo} 
                        alt={PARTNERS[currentIndex].name}
                        className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
                          ["Kord Defence", "Octava Capital", "TARGET"].includes(
                            PARTNERS[currentIndex].name
                          )
                            ? "brightness-0 invert"
                            : ""
                        }`}
                        style={{
                          filter: ["Kord Defence", "Octava Capital", "TARGET"].includes(
                            PARTNERS[currentIndex].name
                          )
                            ? undefined
                            : "contrast(130%) brightness(1.25)",
                          width: 'clamp(3.5rem, 10vw, calc(6rem + 1.5vw))',
                          height: 'clamp(3.5rem, 10vw, calc(6rem + 1.5vw))'
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow text-center lg:text-left flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6 justify-center lg:justify-start">
                      <h3 
                        className="font-bold text-scout-text-white font-teko"
                        style={{
                          fontSize: 'clamp(1.5rem, 6vw, calc(1.5rem + 1.5vw))' // Even larger text on mobile
                        }}
                      >
                        {PARTNERS[currentIndex].name}
                      </h3>
                      <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-scout-green/20 border border-scout-green/40 rounded-full w-fit">
                        <span 
                          className="text-scout-green font-metropolis font-medium uppercase tracking-wider whitespace-nowrap"
                          style={{
                            fontSize: 'clamp(0.75rem, 2vw, calc(0.625rem + 0.25vw))' // Larger category text on mobile
                          }}
                        >
                          {PARTNERS[currentIndex].category}
                        </span>
                      </div>
                    </div>
                    <p 
                      className="text-scout-text-muted font-metropolis leading-relaxed max-w-2xl"
                      style={{
                        fontSize: 'clamp(1.125rem, 3.5vw, calc(0.875rem + 0.5vw))' // Even larger description text on mobile
                      }}
                    >
                      {PARTNERS[currentIndex].description}
                    </p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Partners Grid - Logo Focus */}
        <Reveal>
          <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-5">
            {PARTNERS.map((partner, index) => (
              <div
                key={partner.name}
                className={`group relative cursor-pointer transition-transform duration-300 ${
                  index === currentIndex ? "scale-[1.04]" : "hover:scale-[1.03]"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <div
                  className={`relative rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                    index === currentIndex
                      ? "border-scout-green/60 bg-scout-green/10"
                      : "border-scout-border/40 bg-scout-card-bg/60 hover:border-scout-green/40"
                  }`}
                >
                  {index === currentIndex && (
                    <div className="absolute left-2 right-2 top-2 h-1 overflow-hidden rounded-full bg-scout-dark/80">
                      <div
                        className={`h-full rounded-full bg-white ${
                          progress >= 100 ? "rounded-r-full" : ""
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex aspect-[5/4] items-center justify-center p-4 md:p-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={`h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 ${
                        ["Kord Defence", "Octava Capital", "TARGET"].includes(partner.name)
                          ? "brightness-0 invert"
                          : ""
                      }`}
                      style={{
                        maxWidth: "calc(100% - 1.5rem)",
                        maxHeight: "calc(100% - 1.5rem)",
                        filter: ["Kord Defence", "Octava Capital", "TARGET"].includes(
                          partner.name
                        )
                          ? undefined
                          : "contrast(130%) brightness(1.25)"
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Dots Indicator */}
        <Reveal variant="fade" delayMs={100}>
          <div className="flex justify-center mt-8 space-x-2">
            {PARTNERS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-scout-green scale-125' 
                    : 'bg-scout-border/40 hover:bg-scout-green/60'
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}