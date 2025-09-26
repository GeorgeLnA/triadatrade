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

      <div className="relative z-2 container mx-auto px-6 py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Ultra-Minimalist Layout */}
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            
            {/* Portrait - Museum Quality */}
            <div className="order-1 lg:order-1 lg:col-span-4">
              <Reveal variant="slide-right">
                <div className="relative mx-auto lg:mx-0" style={{ width: '370px' }}>
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
                  <div className="text-2xl text-scout-text-white font-teko">
                    Marie-Pierre Raymond
                  </div>
                  <div className="text-base text-scout-text-muted font-metropolis mt-1">
                    Defence Scientist, Innovation Portfolio Manager
                  </div>
                  <div className="text-base text-scout-text-muted/80 font-metropolis">
                    Defence Research Development Canada
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Content - Typography Focused */}
            <div className="order-2 lg:order-2 lg:col-span-8">
              <Reveal variant="slide-left" delayMs={120}>
                <div className="max-w-4xl">
                
                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl lg:text-4xl text-scout-text-white leading-[1.1] font-metropolis font-light mb-12">
                  "As the security landscape continues to evolve, Ukraine's strategic importance has never been greater, and the opportunities for international defense companies to expand their footprint in the country are significant."
                </blockquote>

                {/* Supporting Text */}
                <div className="space-y-6 mb-8">
                  <p className="text-lg text-scout-text-muted leading-relaxed font-metropolis">
                    "Triada Trade Partners offers business solutions tailored to meet the unique needs of defense firms looking to enter or grow within the Ukrainian market."
                  </p>
                  
                  <p className="text-lg text-scout-text-muted leading-relaxed font-metropolis">
                    "Triada Trade has a young and dynamic team composed of professionals with knowledge of the local defense industry and vast networks within both the public and private sectors. This allows them to provide their clients with the critical support they need to navigate the complexities of the Ukrainian business environment."
                  </p>
                </div>

                {/* Read Full Letter Button */}
                <div className="pt-4">
                  <button className="bg-scout-card-bg/60 border border-scout-border/40 hover:border-scout-green/60 text-scout-text-white hover:text-scout-green px-8 py-3 rounded-lg transition-all duration-300 font-teko text-lg backdrop-blur-sm hover:bg-scout-green/10">
                    READ FULL LETTER
                  </button>
                </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
