import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video after loading animation completes (3.3 seconds)
    const timer = setTimeout(() => {
      video.play().catch(console.error);
    }, 3300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen" style={{ marginTop: '-80px', paddingTop: '80px', marginLeft: '0', marginRight: '0' }}>
      {/* Background Video Container */}
      <div className="absolute inset-0 overflow-hidden hero-video" style={{ 
        right: '-50px', 
        width: 'calc(100% + 50px)',
        zIndex: '1'
      }}>
        {/* Video background */}
        <video 
          ref={videoRef}
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
          <source src="/Create_a_very_202509222235.mp4" type="video/mp4" />
        </video>
        
      </div>

      {/* Hero Content - centered */}
      <div className="absolute top-1/2 left-0 right-0 z-10" style={{ mixBlendMode: 'difference', transform: 'translateY(-50%)' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto hero-content">
            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Inspiring Unity, Powering in Tech
            </h1>
            
            {/* CTA Button */}
            <Link to="/activities/defence-security">
              <Button 
                size="lg" 
                className="bg-white hover:bg-white/90 text-black font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Explore our activities
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
