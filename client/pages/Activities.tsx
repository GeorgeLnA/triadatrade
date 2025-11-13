import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_SERVICES } from "@/components/DefenceProgramsSection";
import { useEffect, useRef } from "react";
import { useLoading } from "@/App";
import { IpadGlobeWrapper } from "@/components/ui/ipad-globe-wrapper";

export default function Activities() {
  const defence = ALL_SERVICES.filter(s => s.category === 'defence');
  const legal = ALL_SERVICES.filter(s => s.category === 'legal');
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

        {/* Defence Programs Section */}
        <section className="w-full py-16 md:py-20" style={{ backgroundColor: '#050612' }}>
          <div className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8" style={{ marginLeft: 'clamp(1rem, 4vw, 70px)', marginRight: 'clamp(1rem, 4vw, 70px)', maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))' }}>
            <div className="mb-10 md:mb-12">
              <h2 className="font-teko font-bold text-scout-text-white" style={{ fontSize: 'clamp(1.75rem, 6vw, calc(1.375rem + 1.25vw))' }}>Defence Programs</h2>
            </div>

            {/* All Defence Services - No Tabs */}
            <div className="space-y-8 md:space-y-6 lg:space-y-8">
              {defence.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-scout-card-bg/60 border border-scout-border/40 rounded-lg md:rounded-xl backdrop-blur-sm p-6 md:p-6"
                >
                  <h3 className="font-teko font-bold text-scout-text-white mb-4 md:mb-2"                   style={{ fontSize: 'clamp(1.375rem, 4.5vw, calc(1rem + 0.75vw))' }}>{service.title}</h3>
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

                  {/* Deep-Dive Rows */}
                  {(service.useCases || service.capabilities) && (
                    <div className="mt-6 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                      {service.useCases && service.useCases.length > 0 && (
                        <div className="bg-scout-card-bg/40 border border-scout-border/30 rounded-lg p-4 md:p-4">
                          <h4 className="font-teko text-scout-text-white mb-3 md:mb-2 uppercase tracking-wide"                           style={{ fontSize: 'clamp(1.125rem, 3.5vw, calc(0.95rem + 0.45vw))' }}>Use Cases</h4>
                          <ul className="list-none pl-0 text-scout-text-muted space-y-2 md:space-y-2 font-metropolis" style={{ fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8rem + 0.3vw))' }}>
                            {service.useCases.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {service.capabilities && service.capabilities.length > 0 && (
                        <div className="bg-scout-card-bg/40 border border-scout-border/30 rounded-lg p-4 md:p-4">
                          <h4 className="font-teko text-scout-text-white mb-3 md:mb-2 uppercase tracking-wide"                           style={{ fontSize: 'clamp(1.125rem, 3.5vw, calc(0.95rem + 0.45vw))' }}>Capabilities</h4>
                          <ul className="list-none pl-0 text-scout-text-muted space-y-2 md:space-y-2 font-metropolis" style={{ fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8rem + 0.3vw))' }}>
                            {service.capabilities.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Civil Programs Section */}
        <section className="w-full py-16 md:py-20" style={{ backgroundColor: '#050612' }}>
          <div className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8" style={{ marginLeft: 'clamp(1rem, 4vw, 70px)', marginRight: 'clamp(1rem, 4vw, 70px)', maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))' }}>
            <div className="mb-10 md:mb-12">
              <h2 className="font-teko font-bold text-scout-text-white" style={{ fontSize: 'clamp(1.75rem, 6vw, calc(1.375rem + 1.25vw))' }}>Legal, Financing & Consulting</h2>
            </div>

            {/* All Legal Services - No Tabs */}
            <div className="space-y-8 md:space-y-6 lg:space-y-8">
              {legal.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-scout-card-bg/60 border border-scout-border/40 rounded-lg md:rounded-xl backdrop-blur-sm p-6 md:p-6"
                >
                  <h3 className="font-teko font-bold text-scout-text-white mb-4 md:mb-2"                   style={{ fontSize: 'clamp(1.375rem, 4.5vw, calc(1rem + 0.75vw))' }}>{service.title}</h3>
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

                  {/* Deep-Dive Rows */}
                  {(service.engagementAreas || service.deliverables) && (
                    <div className="mt-6 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                      {service.engagementAreas && service.engagementAreas.length > 0 && (
                        <div className="bg-scout-card-bg/40 border border-scout-border/30 rounded-lg p-4 md:p-4">
                          <h4 className="font-teko text-scout-text-white mb-3 md:mb-2 uppercase tracking-wide"                           style={{ fontSize: 'clamp(1.125rem, 3.5vw, calc(0.95rem + 0.45vw))' }}>Engagement Areas</h4>
                          <ul className="list-none pl-0 text-scout-text-muted space-y-2 md:space-y-2 font-metropolis" style={{ fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8rem + 0.3vw))' }}>
                            {service.engagementAreas.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {service.deliverables && service.deliverables.length > 0 && (
                        <div className="bg-scout-card-bg/40 border border-scout-border/30 rounded-lg p-4 md:p-4">
                          <h4 className="font-teko text-scout-text-white mb-3 md:mb-2 uppercase tracking-wide"                           style={{ fontSize: 'clamp(1.125rem, 3.5vw, calc(0.95rem + 0.45vw))' }}>Deliverables</h4>
                          <ul className="list-none pl-0 text-scout-text-muted space-y-2 md:space-y-2 font-metropolis" style={{ fontSize: 'clamp(1.0625rem, 2.5vw, calc(0.8rem + 0.3vw))' }}>
                            {service.deliverables.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
