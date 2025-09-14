import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen" style={{ marginTop: '-60px', paddingTop: '60px' }}>
      {/* Background Video Container */}
      <div className="absolute inset-0 overflow-hidden" style={{ 
        right: '-50px', 
        width: 'calc(100% + 50px)',
        zIndex: '1'
      }}>
        {/* Video background */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            objectPosition: 'right center',
            objectFit: 'cover',
            transform: 'scale(1.4)'
          }}
        >
          <source src="/Make_a_wellequped_202509131926_cv1hc.mp4" type="video/mp4" />
        </video>
        
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-scout-text-white mb-6 leading-tight">
              Inspiring Unity, Powering in Tech
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-scout-text-muted mb-8 font-light">
              Strategy. Framework. Execution.
            </p>
            
            {/* CTA Button */}
            <Link to="/activities/defence-security">
              <Button 
                size="lg" 
                className="bg-triada-silver hover:bg-triada-silver/90 text-triada-black font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Explore our activities
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Pull Quote Section */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-lg md:text-xl text-scout-text-white/90 italic mb-2">
              "As the security landscape continues to evolve… the opportunities for international defense companies to expand their footprint in [Ukraine] are significant."
            </blockquote>
            <cite className="text-sm text-scout-text-muted">
              — Marie-Pierre Raymond, Defence Scientist, Innovation Portfolio Manager, DRDC
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
