import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

type HeroSectionProps = { isHidden?: boolean };

export default function HeroSection({ isHidden = false }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const finalOpacity = isHidden ? 0 : scrollOpacity;
  
  const words = ['Strategy', 'Framework', 'Execution'];

  useEffect(() => {
    // Show TRIADA TRADE at 3.2s (sync with header)
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3200);

    // Show interactive elements at 3.2s (same time as header buttons)
    const interactiveTimer = setTimeout(() => {
      setShowInteractive(true);
    }, 3200);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(interactiveTimer);
    };
  }, []);

  // Remove timing-based fade - will be controlled by scroll position in Index.tsx

  useEffect(() => {
    // Only start the text cycle after interactive elements are shown
    if (!showInteractive) return;
    
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing effect
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting effect
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150); // Faster deleting, slower typing

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words, showInteractive]);

  // Fade hero out smoothly within first ~120% of viewport scroll; parent can also hide via isHidden
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const fadeEnd = Math.max(1, h * 1.2); // Changed from 0.9 to 1.2 for much later fade
      const t = Math.min(Math.max(y / fadeEnd, 0), 1);
      setScrollOpacity(1 - t);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section 
      className="fixed inset-0 w-full h-screen z-10 transition-opacity duration-500" 
      style={{ 
        opacity: finalOpacity,
        backgroundColor: '#050612'
      }}
    >
      {/* Background - dark blue */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#050612' }}></div>
      
      {/* Background Video Container */}
      <div className="absolute inset-0 overflow-hidden hero-video" style={{ 
        zIndex: '1'
      }}>
        {/* Screen Recording Video background */}
        <video 
          ref={videoRef}
          muted 
          loop 
          playsInline
          autoPlay
          className="w-full h-full"
          style={{ 
            objectPosition: window.innerWidth < 640 ? '60% center' : 'center center',
            objectFit: 'cover'
          }}
        >
          <source src="/Screen Recording 2025-09-23 at 17.00.56.mov" type="video/mp4" />
        </video>
        
      </div>

      {/* Hero Content - centered */}
      <div 
        className="absolute top-1/2 left-0 right-0 z-10 transition-all duration-500" 
        style={{ 
          mixBlendMode: 'difference', 
          transform: showContent ? 'translateY(-50%)' : 'translateY(-50%) translateY(30px)',
          opacity: showContent ? finalOpacity : 0
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            {/* Main Headline */}
             <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 leading-tight font-audiowide md:whitespace-nowrap">
               <span className="md:hidden">TRIADA<br />TRADE</span>
               <span className="hidden md:inline">TRIADA TRADE</span>
             </h1>
          </div>
        </div>
      </div>

      {/* Rotating Words - Center */}
      <div 
        className="absolute bottom-24 left-1/2 z-10 transition-all duration-500" 
        style={{ 
          transform: showInteractive ? 'translateX(calc(-50% + 1px)) translateY(-12px)' : 'translateX(calc(-50% + 1px)) translateY(calc(18px))',
          opacity: showInteractive ? finalOpacity : 0,
          mixBlendMode: 'difference'
        }}
      >
          <div className="text-5xl sm:text-4xl md:text-5xl text-white font-teko min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center overflow-hidden relative" style={{ color: '#ffffff' }}>
            <span className="absolute left-0">[</span>
            <span className="inline-block whitespace-nowrap min-w-[251px] sm:min-w-[200px] md:min-w-[232px] lg:min-w-[242px] xl:min-w-[252px] text-center">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
            <span className="absolute right-0">]</span>
          </div>
      </div>

      {/* CTA Button - Center */}
      <div 
        className="absolute bottom-16 left-1/2 z-10 transition-all duration-500" 
        style={{ 
          transform: showInteractive ? 'translateX(-50%)' : 'translateX(-50%) translateY(30px)',
          opacity: showInteractive ? finalOpacity : 0,
          mixBlendMode: 'difference'
        }}
      >
          <Button 
            size="lg" 
            className="bg-white hover:bg-white/90 text-black font-teko px-10 py-5 text-xl rounded-none transition-all duration-200 transform hover:scale-105 cursor-pointer"
            onClick={(e) => e.preventDefault()}
          >
            Explore our activities
          </Button>
      </div>

    </section>
  );
}
