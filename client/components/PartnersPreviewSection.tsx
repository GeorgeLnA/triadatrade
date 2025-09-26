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
    <section className="w-full py-20 bg-scout-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal variant="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6 font-teko">
                TRUSTED BY INDUSTRY LEADERS
              </h2>
            </div>
          </Reveal>

          {/* Featured Partner - Large Card */}
          <Reveal>
            <div className="mb-16">
              <div className="group relative">
                <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-scout-green/40 hover:scale-[1.02] h-64">
                  <div className="p-12 h-full">
                    <div className="flex flex-col lg:flex-row items-center gap-8 h-full">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-scout-dark/40 border border-scout-border/30 rounded-2xl flex items-center justify-center group-hover:border-scout-green/40 transition-all duration-300">
                        <img 
                          src={PARTNERS[currentIndex].logo} 
                          alt={PARTNERS[currentIndex].name}
                          className="w-24 h-24 object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow text-center lg:text-left flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-scout-text-white mb-4 font-teko">
                        {PARTNERS[currentIndex].name}
                      </h3>
                      <div className="inline-flex items-center px-4 py-2 bg-scout-green/20 border border-scout-green/40 rounded-full mb-6 w-fit">
                        <span className="text-scout-green font-metropolis text-sm font-medium uppercase tracking-wider whitespace-nowrap">
                          {PARTNERS[currentIndex].category}
                        </span>
                      </div>
                      <p className="text-scout-text-muted font-metropolis text-lg leading-relaxed max-w-2xl">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PARTNERS.map((partner, index) => (
              <div 
                key={partner.name}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  index === currentIndex ? 'scale-110' : 'hover:scale-105'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className={`bg-scout-card-bg/60 border rounded-xl backdrop-blur-sm transition-all duration-300 relative ${
                  index === currentIndex 
                    ? 'border-scout-green/60 bg-scout-green/10' 
                    : 'border-scout-border/40 hover:border-scout-green/40'
                }`}>
                  {/* Progress Indicator - Only on selected card */}
                  {index === currentIndex && (
                    <div className="absolute top-2 left-2 right-2 h-1 bg-scout-dark/80 overflow-hidden">
                      <div 
                        className={`h-full bg-white ${
                          progress >= 100 ? 'rounded-r-full' : ''
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Logo Container */}
                  <div className="aspect-square p-6 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-full object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
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
      </div>
    </section>
  );
}