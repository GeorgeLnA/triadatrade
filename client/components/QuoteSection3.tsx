import Reveal from "@/components/ui/Reveal";
import { PixelButton } from "@/components/ui/PixelButton";

export default function QuoteSection3() {
  return (
    <section className="relative w-full flex items-center overflow-hidden">
      {/* Ultra-Premium Background - Transparent to show waves */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-scout-green/20 to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-px h-1/3 bg-gradient-to-b from-transparent via-scout-border/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-1/2 bg-gradient-to-b from-transparent via-scout-green/10 to-transparent"></div>
      </div>

      <div 
        className="relative z-2 w-full mx-auto py-16"
        style={{
          marginLeft: '70px',
          marginRight: '70px',
          maxWidth: 'calc(100vw - 140px)', // 70px left + 70px right
          paddingTop: '6rem',
          paddingBottom: '6rem'
        }}
      >
        {/* Ultra-Minimalist Layout */}
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          
          {/* Portrait - Museum Quality */}
          <div className="order-1 lg:order-1 lg:col-span-4">
            <Reveal variant="slide-right">
              <div className="relative mx-auto lg:ml-auto lg:mr-0 w-[87.5%]">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src="/kelly.jpeg" 
                    alt="Dominic W. Kelly"
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
              <div className="mt-4 text-center lg:text-left lg:ml-auto lg:w-[87.5%]">
                <div 
                  className="text-scout-text-white font-teko leading-tight"
                  style={{
                    fontSize: 'calc(1rem + 0.8vw)' // Scales with container width
                  }}
                >
                  Dominic W. Kelly
                </div>
                <div 
                  className="text-scout-text-muted font-teko mt-0.5 leading-tight"
                  style={{
                    fontSize: 'calc(0.8rem + 0.5vw)' // Scales with container width
                  }}
                >
                  CEO
                </div>
                <div 
                  className="text-scout-text-muted/80 font-teko leading-tight"
                  style={{
                    fontSize: 'calc(0.8rem + 0.5vw)' // Scales with container width
                  }}
                >
                  KORD Defence
                </div>
              </div>
            </Reveal>
          </div>

          {/* Content - Typography Focused */}
          <div className="order-2 lg:order-2 lg:col-span-8">
            <Reveal variant="slide-left" delayMs={120}>
              <div className="w-full lg:-ml-8">
              
              {/* Quote */}
              <blockquote 
                className="text-scout-text-muted leading-relaxed font-teko"
                style={{
                  fontSize: 'calc(1rem + 1.3vw)' // Scales with container width
                }}
              >
                Working with Triada Trade Partners has been instrumental in successfully introducing our solutions into Ukraine. Under the guidance of Yaroslav Yakymov and Marsel Nikitin, we were able to navigate the complexities of the Ukrainian market with confidence and clarity. Their expertise under the Office of Trade Representatives in coordinating with defense stakeholders provided the framework that allowed KORD Defence to establish a meaningful presence.
              </blockquote>

              {/* Read Full Letter Button */}
              <div className="mt-2">
                <PixelButton
                  type="button"
                  className="bg-scout-card-bg/60 border border-scout-border/40 px-8 py-3 rounded-lg transition-all duration-300 font-teko text-scout-text-white hover:border-scout-green/60 hover:bg-scout-green/10 backdrop-blur-sm tracking-wide"
                  style={{ fontSize: 'calc(1rem + 0.5vw)' }}
                >
                  READ FULL LETTER
                </PixelButton>
              </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

