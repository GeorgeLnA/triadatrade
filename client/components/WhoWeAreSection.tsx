import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import { PixelButton } from "@/components/ui/PixelButton";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAreSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const secondImageContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);

  // Handle expand/collapse animation with GSAP
  useEffect(() => {
    if (!secondImageContainerRef.current) return;

    const container = secondImageContainerRef.current;
    
    if (isExpanded) {
      gsap.to(container, {
        opacity: 1,
        maxHeight: "2000px",
        duration: 0.5,
        ease: "power2.out",
        overflow: "visible",
      });
    } else {
      gsap.to(container, {
        opacity: 0,
        maxHeight: "0px",
        duration: 0.5,
        ease: "power2.in",
        overflow: "hidden",
        onComplete: () => {
          // Kill pin when collapsed
          if (pinTriggerRef.current) {
            pinTriggerRef.current.kill();
            pinTriggerRef.current = null;
          }
        }
      });
    }
  }, [isExpanded]);

  // Setup GSAP pin
  useEffect(() => {
    if (!secondImageContainerRef.current || !contentContainerRef.current) return;

    // Only set up pinning on large screens
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    if (!isLargeScreen) return;

    const secondImageContainer = secondImageContainerRef.current;
    const contentContainer = contentContainerRef.current;

    // Kill existing triggers
    if (pinTriggerRef.current) {
      pinTriggerRef.current.kill();
      pinTriggerRef.current = null;
    }

    // Only pin if expanded
    if (!isExpanded) {
      return;
    }

    // Wait for expand animation to complete
    const timeoutId = setTimeout(() => {
      // Create ScrollTrigger pin for second image only
      const pinTrigger = ScrollTrigger.create({
        trigger: contentContainer,
        start: "top top",
        end: () => `+=${contentContainer.offsetHeight / 2.75}`,
        pin: secondImageContainer,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      pinTriggerRef.current = pinTrigger;
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(timeoutId);
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
        pinTriggerRef.current = null;
      }
    };
  }, [isExpanded]);

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen flex items-center" style={{ paddingBottom: 'clamp(0.5rem, 2vw, 0px)' }}>
      {/* Ultra-Premium Background - Transparent to show waves */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-scout-green/20 to-transparent mix-blend-difference"></div>
        <div className="absolute top-1/3 right-1/4 w-px h-1/3 bg-gradient-to-b from-transparent via-scout-border/30 to-transparent mix-blend-difference"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-1/2 bg-gradient-to-b from-transparent via-scout-green/10 to-transparent mix-blend-difference"></div>
      </div>

      {/* Dynamic container - responsive margins for mobile */}
      <div 
        className="relative z-10 w-full mx-auto pt-8 md:pt-24 pb-1 md:pb-24 px-4 sm:px-6 md:px-8"
        style={{
          marginLeft: 'clamp(1rem, 4vw, 70px)',
          marginRight: 'clamp(1rem, 4vw, 70px)',
          maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))'
        }}
      >
        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
          
          {/* Left Column - Images */}
          <div className="order-1 lg:order-1 lg:col-span-4">
            <div className="space-y-8">
              {/* First Image - Fixed at top */}
              <Reveal variant="slide-right">
                <div className="relative mx-auto lg:ml-auto lg:mr-0 w-full lg:sticky lg:top-8 lg:z-10">
                  <div className="relative w-full overflow-hidden">
                    <img 
                      src="/WhatsApp Image 2025-11-13 at 14.35.36 (1).jpeg" 
                      alt="Triada Trade Team"
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/40 via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute inset-0 border border-scout-border/30 pointer-events-none"></div>
                </div>
              </Reveal>
              
              {/* Second Image - Pinned with GSAP, moves down */}
              <div 
                ref={secondImageContainerRef}
                className="opacity-0 max-h-0 overflow-hidden"
              >
                <div className="relative mx-auto lg:ml-auto lg:mr-0 w-full">
                  <div className="relative w-full overflow-hidden">
                    <img 
                      src="/WhatsApp Image 2025-11-15 at 13.24.17.jpeg" 
                      alt="General Jennie Carignan"
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/40 via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute inset-0 border border-scout-border/30 pointer-events-none"></div>
                </div>
                
                {/* Attribution */}
                <div className="mt-4 text-center lg:text-left">
                  <div 
                    className="text-scout-text-white font-teko leading-tight"
                    style={{
                      fontSize: 'clamp(1.125rem, 3vw, calc(0.875rem + 0.5vw))'
                    }}
                  >
                    General Jennie Carignan
                  </div>
                  <div 
                    className="text-scout-text-muted font-teko mt-0.5 leading-tight"
                    style={{
                      fontSize: 'clamp(1rem, 2.5vw, calc(0.75rem + 0.4vw))'
                    }}
                  >
                    Chief of the Defence Staff of the Canadian Armed Forces
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="order-2 lg:order-2 lg:col-span-8" ref={contentContainerRef}>
            <Reveal variant="slide-left" delayMs={120}>
              <div className="w-full lg:-ml-8">
                <div className="space-y-4">
                  {/* First paragraph */}
                  <div className="prose prose-invert max-w-none">
                    <p 
                      className="text-scout-text-muted leading-relaxed font-teko w-full"
                      style={{
                        fontSize: 'clamp(1.25rem, 4.5vw, calc(1rem + 1.3vw))'
                      }}
                    >
                      At Triada Trade, we pride ourselves on being a leading provider in the defense sector, renowned for our commitment to excellence, innovation, and integrity. Our business model is built on a foundation of collaboration and adaptability, allowing us to respond swiftly to the evolving needs of our clients and the industry.
                    </p>
                  </div>
                  
                  {/* Expandable content */}
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="space-y-4">
                      <div className="prose prose-invert max-w-none">
                        <p 
                          className="text-scout-text-muted leading-relaxed font-teko w-full"
                          style={{
                            fontSize: 'clamp(1.25rem, 4.5vw, calc(1rem + 1.3vw))'
                          }}
                        >
                          With years of experience and a proven track record, Triada Trade has established a stellar reputation among defense contractors and governmental agencies. We are recognized for delivering high-quality products and services that exceed expectations, fostering long-lasting relationships with our clients.
                        </p>
                      </div>
                      
                      <div className="prose prose-invert max-w-none">
                        <p 
                          className="text-scout-text-muted leading-relaxed font-teko w-full"
                          style={{
                            fontSize: 'clamp(1.25rem, 4.5vw, calc(1rem + 1.3vw))'
                          }}
                        >
                          Our extensive network of partnerships with key stakeholders—including government entities, industry leaders, and defense organizations—enables us to stay at the forefront of technological advancements. These connections not only enhance our capabilities but also allow us to provide seamless solutions tailored to the specific requirements of our clients.
                        </p>
                      </div>
                      
                      <div className="prose prose-invert max-w-none">
                        <p 
                          className="text-scout-text-muted leading-relaxed font-teko w-full"
                          style={{
                            fontSize: 'clamp(1.25rem, 4.5vw, calc(1rem + 1.3vw))'
                          }}
                        >
                          Trust is the cornerstone of our operations. We understand the sensitive nature of the defense industry and are committed to conducting our business with the highest ethical standards. Our clients can rely on us for transparency, accountability, and unwavering support, knowing that their missions are in capable hands.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Button */}
                  <div className="mt-2">
                    <PixelButton
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="group inline-flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 bg-scout-green/10 border border-scout-green/30 rounded-lg text-scout-text-white font-metropolis text-sm md:text-lg hover:bg-scout-green/20 hover:border-scout-green/50 transition-all duration-300"
                    >
                      <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </PixelButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
