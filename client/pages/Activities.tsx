import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OurCoverageSection from "@/components/OurCoverageSection";
import Reveal from "@/components/ui/Reveal";
import { ALL_SERVICES } from "@/components/DefenceProgramsSection";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "@/App";

export default function Activities() {
  const defence = ALL_SERVICES.filter(s => s.category === 'defence');
  const legal = ALL_SERVICES.filter(s => s.category === 'legal');
  const { setHeroAnimationsComplete } = useLoading();
  const inlineVideoRef = useRef<HTMLVideoElement>(null);
  const inlineVideoSectionRef = useRef<HTMLDivElement>(null);
  const [activeDefenceIdx, setActiveDefenceIdx] = useState(0);
  const [activeCivilIdx, setActiveCivilIdx] = useState(0);

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
              transform: 'scale(1.3)'
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
        <section className="w-full py-20" style={{ backgroundColor: '#050612' }}>
          <div className="relative z-10 w-full mx-auto" style={{ marginLeft: '70px', marginRight: '70px', maxWidth: 'calc(100vw - 140px)' }}>
            <div className="mb-8">
              <h2 className="font-teko font-bold text-scout-text-white" style={{ fontSize: 'calc(1.375rem + 1.25vw)' }}>Defence Programs</h2>
            </div>

            {/* Tabs */}
            <div role="tablist" aria-label="Defence Programs" className="grid sm:grid-cols-3 gap-3 mb-6">
              {defence.map((svc, i) => {
                const isActive = i === activeDefenceIdx;
                return (
                  <button
                    key={svc.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`defence-panel-${i}`}
                    id={`defence-tab-${i}`}
                    onClick={() => setActiveDefenceIdx(i)}
                    className={
                      `w-full px-4 py-3 rounded-lg border ${isActive ? 'bg-white text-black border-white/80' : 'bg-transparent text-white border-white/40'} ` +
                      `font-teko text-xl tracking-wide`
                    }
                  >
                    <span className="block leading-none">{svc.title}</span>
                    {svc.subtitle && (
                      <span className={`block mt-1 text-sm ${isActive ? 'text-black/70' : 'text-white/60'} font-metropolis`}>{svc.subtitle}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Active Panel */}
            {(() => {
              const service = defence[activeDefenceIdx] ?? defence[0];
              return (
                <div
                  role="tabpanel"
                  id={`defence-panel-${activeDefenceIdx}`}
                  aria-labelledby={`defence-tab-${activeDefenceIdx}`}
                  className="bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm p-6"
                >
                  <h3 className="font-teko font-bold text-scout-text-white mb-2" style={{ fontSize: 'calc(1rem + 0.75vw)' }}>{service.title}</h3>
                  <p className="text-scout-text-muted font-metropolis mb-4" style={{ fontSize: 'calc(0.8125rem + 0.375vw)' }}>{service.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.services.map(item => (
                      <div key={item} className="flex items-center justify-center py-3 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30">
                        <span className="text-scout-text-white font-metropolis font-medium" style={{ fontSize: 'calc(0.8125rem + 0.375vw)' }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deep-Dive Rows */}
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <div className="bg-scout-card-bg/40 border border-scout-border/30 rounded-lg p-4">
                      <h4 className="font-teko text-scout-text-white mb-2" style={{ fontSize: 'calc(0.95rem + 0.45vw)' }}>Use Cases</h4>
                      <ul className="list-disc pl-5 text-scout-text-muted space-y-1 font-metropolis" style={{ fontSize: 'calc(0.8rem + 0.3vw)' }}>
                        <li>Rapid validation of foreign technologies under operational constraints</li>
                        <li>Localization roadmaps for tooling, training, and sustainment</li>
                        <li>Multi-stakeholder coordination across MOD, industry, and labs</li>
                      </ul>
                    </div>
                    <div className="bg-scout-card-bg/40 border border-scout-border/30 rounded-lg p-4">
                      <h4 className="font-teko text-scout-text-white mb-2" style={{ fontSize: 'calc(0.95rem + 0.45vw)' }}>Capabilities</h4>
                      <ul className="list-disc pl-5 text-scout-text-muted space-y-1 font-metropolis" style={{ fontSize: 'calc(0.8rem + 0.3vw)' }}>
                        <li>System integration and field deployment support</li>
                        <li>Requirements shaping and trials orchestration</li>
                        <li>Programme advocacy and project governance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </section>

        {/* Civil Programs Section */}
        <section className="w-full py-20" style={{ backgroundColor: '#050612' }}>
          <div className="relative z-10 w-full mx-auto" style={{ marginLeft: '70px', marginRight: '70px', maxWidth: 'calc(100vw - 140px)' }}>
            <div className="mb-8">
              <h2 className="font-teko font-bold text-scout-text-white" style={{ fontSize: 'calc(1.375rem + 1.25vw)' }}>Civil Programs</h2>
            </div>

            {/* Tabs */}
            <div role="tablist" aria-label="Civil Programs" className="grid grid-cols-2 gap-0 mb-6">
              {legal.map((svc, i) => {
                const isActive = i === activeCivilIdx;
                return (
                  <button
                    key={svc.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`civil-panel-${i}`}
                    id={`civil-tab-${i}`}
                    onClick={() => setActiveCivilIdx(i)}
                    className={
                      `w-full px-4 py-3 rounded-none border-r border-b border-t-0 ${i === 0 ? 'border-l' : 'border-l-0'} ${isActive ? 'bg-white text-black border-white/80' : 'bg-transparent text-white border-white/40'} ` +
                      `font-teko text-xl tracking-wide`
                    }
                  >
                    <span className="block leading-none">{svc.title}</span>
                    {svc.subtitle && (
                      <span className={`block mt-1 text-sm ${isActive ? 'text-black/70' : 'text-white/60'} font-metropolis`}>{svc.subtitle}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Active Panel */}
            {(() => {
              const service = legal[activeCivilIdx] ?? legal[0];
              return (
                <div
                  role="tabpanel"
                  id={`civil-panel-${activeCivilIdx}`}
                  aria-labelledby={`civil-tab-${activeCivilIdx}`}
                  className="bg-scout-card-bg/60 border border-scout-border/40 rounded-xl backdrop-blur-sm p-6"
                >
                  <h3 className="font-teko font-bold text-scout-text-white mb-2" style={{ fontSize: 'calc(1rem + 0.75vw)' }}>{service.title}</h3>
                  <p className="text-scout-text-muted font-metropolis mb-4" style={{ fontSize: 'calc(0.8125rem + 0.375vw)' }}>{service.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.services.map(item => (
                      <div key={item} className="flex items-center justify-center py-3 px-4 rounded-lg bg-scout-card-bg/40 border border-scout-border/30">
                        <span className="text-scout-text-white font-metropolis font-medium" style={{ fontSize: 'calc(0.8125rem + 0.375vw)' }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deep-Dive Rows */}
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <div className="bg-scout-card-bg/40 border border-scout-border/30 rounded-lg p-4">
                      <h4 className="font-teko text-scout-text-white mb-2" style={{ fontSize: 'calc(0.95rem + 0.45vw)' }}>Engagement Areas</h4>
                      <ul className="list-disc pl-5 text-scout-text-muted space-y-1 font-metropolis" style={{ fontSize: 'calc(0.8rem + 0.3vw)' }}>
                        <li>Risk, compliance, and documentation workflows</li>
                        <li>Corporate structuring and IP protections</li>
                        <li>Investor outreach and market communications</li>
                      </ul>
                    </div>
                    <div className="bg-scout-card-bg/40 border border-scout-border/30 rounded-lg p-4">
                      <h4 className="font-teko text-scout-text-white mb-2" style={{ fontSize: 'calc(0.95rem + 0.45vw)' }}>Deliverables</h4>
                      <ul className="list-disc pl-5 text-scout-text-muted space-y-1 font-metropolis" style={{ fontSize: 'calc(0.8rem + 0.3vw)' }}>
                        <li>Due diligence packs and counterparty scoring</li>
                        <li>Contracting, legalization, and filings toolkits</li>
                        <li>Press kits, briefs, and stakeholder reports</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </section>

        {/* Globe after services */}
        <div style={{ backgroundColor: '#050612' }}>
          <OurCoverageSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}


