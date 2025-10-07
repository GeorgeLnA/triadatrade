import Reveal from "@/components/ui/Reveal";

export default function QuoteSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Ultra-Premium Background - Transparent to show waves */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-scout-green/20 to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-px h-1/3 bg-gradient-to-b from-transparent via-scout-border/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-1/2 bg-gradient-to-b from-transparent via-scout-green/10 to-transparent"></div>
      </div>

      <div 
        className="relative z-2 w-full mx-auto py-24"
        style={{
          marginLeft: '70px',
          marginRight: '70px',
          maxWidth: 'calc(100vw - 140px)' // 70px left + 70px right
        }}
      >
        {/* Ultra-Minimalist Layout */}
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          
          {/* Portrait - Museum Quality */}
          <div className="order-1 lg:order-1 lg:col-span-4">
            <Reveal variant="slide-right">
              <div className="relative mx-auto lg:mx-0 w-full">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src="/9OaFLS5Kn4WF6NDjyf109hthVn1LIks0oCgs9pCv.png" 
                    alt="Marie-Pierre Raymond"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Minimalist Frame */}
                <div className="absolute inset-0 border border-scout-text-white/30 pointer-events-none"></div>
                <div className="absolute inset-2 border border-scout-text-white/10 pointer-events-none"></div>
              </div>
              
              {/* Attribution under image */}
              <div className="mt-8 text-center lg:text-left">
                <div 
                  className="text-scout-text-white font-teko"
                  style={{
                    fontSize: 'calc(1.5rem + 1.5vw)' // Scales with container width
                  }}
                >
                  Marie-Pierre Raymond
                </div>
                <div 
                  className="text-scout-text-muted font-metropolis mt-1"
                  style={{
                    fontSize: 'calc(1rem + 0.5vw)' // Scales with container width
                  }}
                >
                  Defence Scientist, Innovation Portfolio Manager
                </div>
                <div 
                  className="text-scout-text-muted/80 font-metropolis"
                  style={{
                    fontSize: 'calc(1rem + 0.5vw)' // Scales with container width
                  }}
                >
                  Defence Research Development Canada
                </div>
              </div>
            </Reveal>
          </div>

          {/* Content - Typography Focused */}
          <div className="order-2 lg:order-2 lg:col-span-8">
            <Reveal variant="slide-left" delayMs={120}>
              <div className="w-full">
              
              {/* Quote */}
              <blockquote 
                className="text-scout-text-white leading-[1.1] font-metropolis font-light mb-12"
                style={{
                  fontSize: 'calc(1.25rem + 1.25vw)' // Scales with container width
                }}
              >
                "As the security landscape continues to evolve, Ukraine's strategic importance has never been greater, and the opportunities for international defense companies to expand their footprint in the country are significant."
                
                <br /><br />
                
                "Triada Trade Partners offers business solutions tailored to meet the unique needs of defense firms looking to enter or grow within the Ukrainian market."
              </blockquote>

              {/* Read Full Letter Button */}
              <div className="pt-4">
                <button 
                  className="bg-scout-card-bg/60 border border-scout-border/40 hover:border-scout-green/60 text-scout-text-white hover:text-scout-green px-8 py-3 rounded-lg transition-all duration-300 font-teko backdrop-blur-sm hover:bg-scout-green/10"
                  style={{
                    fontSize: 'calc(1rem + 0.5vw)' // Scales with container width
                  }}
                >
                  READ FULL LETTER
                </button>
              </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}