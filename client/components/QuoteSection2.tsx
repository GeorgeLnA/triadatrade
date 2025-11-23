import Reveal from "@/components/ui/Reveal";
import { PixelButton } from "@/components/ui/PixelButton";

export default function QuoteSection2() {
  return (
    <section className="relative w-full flex items-center overflow-hidden">
      {/* Ultra-Premium Background - Transparent to show waves */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-scout-green/20 to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-px h-1/3 bg-gradient-to-b from-transparent via-scout-border/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-1/2 bg-gradient-to-b from-transparent via-scout-green/10 to-transparent"></div>
      </div>

      <div 
        className="relative z-2 w-full mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8"
        style={{
          marginLeft: 'clamp(1rem, 4vw, 70px)',
          marginRight: 'clamp(1rem, 4vw, 70px)',
          maxWidth: 'calc(100vw - clamp(2rem, 8vw, 140px))',
          paddingTop: 'clamp(3rem, 10vw, 6rem)',
          paddingBottom: 'clamp(3rem, 10vw, 6rem)'
        }}
      >
        {/* Ultra-Minimalist Layout */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24 items-start">
          
          {/* Portrait - Museum Quality */}
          <div className="order-1 lg:order-1 lg:col-span-4">
            <Reveal variant="slide-right">
              <div className="relative mx-auto lg:ml-auto lg:mr-0 w-full md:w-[87.5%] max-w-sm md:max-w-none">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src="/bill.jpeg" 
                    alt="Bill Maadarani"
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
                    fontSize: 'clamp(1.375rem, 4.5vw, calc(1rem + 0.8vw))' // Even larger name text on mobile
                  }}
                >
                  Bill Maadarani
                </div>
                <div 
                  className="text-scout-text-muted font-teko mt-0.5 leading-tight"
                  style={{
                    fontSize: 'clamp(1.0625rem, 3vw, calc(0.8rem + 0.5vw))' // Even larger role text on mobile
                  }}
                >
                  CEO Cyclops Corporation
                </div>
                <div 
                  className="text-scout-text-muted/80 font-teko leading-tight"
                  style={{
                    fontSize: 'clamp(1.0625rem, 3vw, calc(0.8rem + 0.5vw))' // Even larger role text on mobile
                  }}
                >
                  Chairman OSAC
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
                  fontSize: 'clamp(1.375rem, 5vw, calc(1rem + 1.3vw))' // Even larger quote text on mobile
                }}
              >
                It is a privilege to highlight our cooperation with Triada Trade Partners, whose team has consistently demonstrated the ability to connect complex U.S. Foreign Military Sales initiatives with real, measurable outcomes in Ukraine. Their understanding of both American and Ukrainian defense processes allows them to bridge systems that often appear worlds apart.
              </blockquote>

              {/* Read Full Letter Button */}
              <div className="mt-2">
                <PixelButton
                  as="a"
                  href="/Complete_with_Docusign__Recomendation_Letter_Cyclops.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-scout-card-bg/60 border border-scout-border/40 px-4 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-300 font-teko text-scout-text-white hover:border-scout-green/60 hover:bg-scout-green/10 backdrop-blur-sm tracking-wide"
                  style={{ fontSize: 'clamp(1.125rem, 3.5vw, calc(1rem + 0.5vw))' }} // Even larger button text on mobile
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

