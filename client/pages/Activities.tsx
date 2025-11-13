import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_SERVICES } from "@/components/DefenceProgramsSection";
import { useEffect, useRef } from "react";
import { useLoading } from "@/App";
import { IpadGlobeWrapper } from "@/components/ui/ipad-globe-wrapper";
import Reveal from "@/components/ui/Reveal";

export default function Activities() {
  // Combine all services into one array
  const allActivities = ALL_SERVICES;
  const { setHeroAnimationsComplete } = useLoading();
  const inlineVideoRef = useRef<HTMLVideoElement>(null);
  const inlineVideoSectionRef = useRef<HTMLDivElement>(null);

  // Disable load/entrance animations on this page only and enable cursor
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('activities-no-anim');
      document.body.classList.add('activities-no-anim');
      // Hide big center logo only on Activities page
      const centerLogo = document.getElementById('border-logo');
      if (centerLogo) centerLogo.style.display = 'none';
      // Enable custom cursor immediately on Activities page
      setHeroAnimationsComplete(true);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('activities-no-anim');
        document.body.classList.remove('activities-no-anim');
        const centerLogo = document.getElementById('border-logo');
        if (centerLogo) centerLogo.style.display = '';
        // Reset cursor state when leaving Activities page
        setHeroAnimationsComplete(false);
      }
    };
  }, [setHeroAnimationsComplete]);

  // Play/pause inline video based on visibility
  useEffect(() => {
    const section = inlineVideoSectionRef.current;
    const vid = inlineVideoRef.current;
    if (!section || !vid) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some(e => e.isIntersecting);
      if (visible) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    }, { threshold: 0, rootMargin: '0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header staticFinal />

      {/* Hero Section with Video Background - Fixed */}
      <section ref={inlineVideoSectionRef} className="fixed inset-0 w-full h-screen z-10 overflow-hidden">
        {/* Background Video Container */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: '1' }}>
          <video
            ref={inlineVideoRef}
            className="w-full h-full"
            style={{ 
              objectFit: 'cover',
              transform: 'scale(1.35)'
            }}
            muted
            loop
            playsInline
            autoPlay
          >
            <source src="/Make_a_wellequped_202509131926_cv1hc.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content - centered */}
        <div 
          className="absolute top-1/2 left-0 right-0 z-10" 
          style={{ 
            mixBlendMode: 'difference',
            transform: 'translateY(-50%)'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight font-audiowide">
                OUR<br />ACTIVITIES
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Scrolls over hero */}
      <main className="relative w-full z-20">
        {/* Spacer to account for hero height */}
        <div className="h-screen" />

        {/* All Activities - Each as Separate Section */}
        {allActivities.map((service, index) => (
          <section key={service.id} className="w-full py-16 md:py-20" style={{ backgroundColor: '#050612' }}>
            <div className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8" style={{ marginLeft: 'clamp(1rem, 4vw, 70px)', marginRight: 'clamp(1rem, 4vw, 70px)', maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))' }}>
              <Reveal variant="slide-up" delayMs={index * 100}>
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="font-teko font-bold text-scout-text-white" style={{ fontSize: 'clamp(1.75rem, 6vw, calc(1.375rem + 1.25vw))' }}>{service.title}</h3>
                </div>
                <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-lg md:rounded-xl backdrop-blur-sm p-6 md:p-6">
                  <p className="text-scout-text-muted font-metropolis mb-5 md:mb-4" style={{ fontSize: 'clamp(1.125rem, 3vw, calc(0.8125rem + 0.375vw))' }}>{service.description}</p>

                  {/* Bullet Points */}
                  {service.bulletPoints && service.bulletPoints.length > 0 && (
                    <div className="space-y-3 md:space-y-2 mb-6 md:mb-6">
                      {service.bulletPoints.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 md:gap-3 py-2 md:py-2">
                          <span className="text-scout-green text-lg md:text-xl font-light mt-0.5 flex-shrink-0">⊹</span>
                          <span className="text-scout-text-white font-metropolis flex-1" style={{ fontSize: 'clamp(1.125rem, 3vw, calc(0.8125rem + 0.375vw))' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Use Cases */}
                  {service.useCases && service.useCases.length > 0 && (
                    <div className="mt-6 md:mt-6 pt-6 border-t border-scout-border/20">
                      <h4 
                        className="text-scout-text-white font-teko font-bold mb-3 md:mb-4 uppercase tracking-wide"
                        style={{
                          fontSize: 'clamp(1.125rem, 3.5vw, calc(0.875rem + 0.5vw))'
                        }}
                      >
                        USE CASES
                      </h4>
                      <div className="space-y-2">
                        {service.useCases.map((useCase, useCaseIndex) => (
                          <div
                            key={useCaseIndex}
                            className="flex items-center py-2 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30"
                          >
                            <span 
                              className="text-scout-text-white font-metropolis"
                              style={{
                                fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8125rem + 0.375vw))'
                              }}
                            >
                              {useCase}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Capabilities */}
                  {service.capabilities && service.capabilities.length > 0 && (
                    <div className="mt-6 md:mt-6 pt-6 border-t border-scout-border/20">
                      <h4 
                        className="text-scout-text-white font-teko font-bold mb-3 md:mb-4 uppercase tracking-wide"
                        style={{
                          fontSize: 'clamp(1.125rem, 3.5vw, calc(0.875rem + 0.5vw))'
                        }}
                      >
                        CAPABILITIES
                      </h4>
                      <div className="space-y-2">
                        {service.capabilities.map((capability, capabilityIndex) => (
                          <div
                            key={capabilityIndex}
                            className="flex items-center py-2 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30"
                          >
                            <span 
                              className="text-scout-text-white font-metropolis"
                              style={{
                                fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8125rem + 0.375vw))'
                              }}
                            >
                              {capability}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Engagement Areas */}
                  {service.engagementAreas && service.engagementAreas.length > 0 && (
                    <div className="mt-6 md:mt-6 pt-6 border-t border-scout-border/20">
                      <h4 
                        className="text-scout-text-white font-teko font-bold mb-3 md:mb-4 uppercase tracking-wide"
                        style={{
                          fontSize: 'clamp(1.125rem, 3.5vw, calc(0.875rem + 0.5vw))'
                        }}
                      >
                        ENGAGEMENT AREAS
                      </h4>
                      <div className="space-y-2">
                        {service.engagementAreas.map((area, areaIndex) => (
                          <div
                            key={areaIndex}
                            className="flex items-center py-2 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30"
                          >
                            <span 
                              className="text-scout-text-white font-metropolis"
                              style={{
                                fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8125rem + 0.375vw))'
                              }}
                            >
                              {area}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deliverables */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="mt-6 md:mt-6 pt-6 border-t border-scout-border/20">
                      <h4 
                        className="text-scout-text-white font-teko font-bold mb-3 md:mb-4 uppercase tracking-wide"
                        style={{
                          fontSize: 'clamp(1.125rem, 3.5vw, calc(0.875rem + 0.5vw))'
                        }}
                      >
                        DELIVERABLES
                      </h4>
                      <div className="space-y-2">
                        {service.deliverables.map((deliverable, deliverableIndex) => (
                          <div
                            key={deliverableIndex}
                            className="flex items-center py-2 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30"
                          >
                            <span 
                              className="text-scout-text-white font-metropolis"
                              style={{
                                fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8125rem + 0.375vw))'
                              }}
                            >
                              {deliverable}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        {/* Contact Section */}
        <section className="w-full py-16 md:py-20" style={{ backgroundColor: '#050612' }}>
          <div className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8" style={{ marginLeft: 'clamp(1rem, 4vw, 70px)', marginRight: 'clamp(1rem, 4vw, 70px)', maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))' }}>
            <Reveal variant="slide-up" delayMs={400}>
              <div className="bg-scout-card-bg/60 border border-scout-border/40 rounded-lg md:rounded-xl backdrop-blur-sm p-6 md:p-8 lg:p-12">
                <div className="text-center mb-6 md:mb-8">
                  <h2 
                    className="font-teko font-bold text-scout-text-white mb-4 md:mb-6"
                    style={{ fontSize: 'clamp(1.75rem, 6vw, calc(1.375rem + 1.25vw))' }}
                  >
                    CONTACT US
                  </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-8 md:mt-10">
                  {/* Email */}
                  <a
                    href="mailto:info@triada-trade.com"
                    className="flex items-center gap-4 py-4 px-6 rounded-lg bg-scout-card-bg/40 border border-scout-border/30 hover:border-scout-green/60 transition-all duration-300"
                  >
                    <svg 
                      className="w-6 h-6 text-scout-green flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span 
                      className="text-scout-text-white font-metropolis"
                      style={{ fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8125rem + 0.375vw))' }}
                    >
                      info@triada-trade.com
                    </span>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+380971265663"
                    className="flex items-center gap-4 py-4 px-6 rounded-lg bg-scout-card-bg/40 border border-scout-border/30 hover:border-scout-green/60 transition-all duration-300"
                  >
                    <svg 
                      className="w-6 h-6 text-scout-green flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span 
                      className="text-scout-text-white font-metropolis"
                      style={{ fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8125rem + 0.375vw))' }}
                    >
                      +380-97-126-5663
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Globe after services - temporarily hidden */}
        {false && (
          <section className="w-full" style={{ backgroundColor: '#050612' }}>
            <IpadGlobeWrapper className="pointer-events-auto" />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
