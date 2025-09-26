import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate when to hide hero based on 3rd section position
      // Assuming each section is roughly viewport height, 3rd section starts around 3 * viewport height
      const thirdSectionStart = windowHeight * 3;
      const thirdSectionEnd = windowHeight * 4; // End of 3rd section
      
      if (scrollY < thirdSectionStart) {
        // Before 3rd section - hero visible
        setScrollOpacity(1);
      } else if (scrollY > thirdSectionEnd) {
        // Past 3rd section - hero hidden
        setScrollOpacity(0);
      } else {
        // In 3rd section - gradual fade based on position within section
        const fadeProgress = (scrollY - thirdSectionStart) / (thirdSectionEnd - thirdSectionStart);
        setScrollOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="fixed inset-0 w-full h-screen z-10 transition-opacity duration-500" 
      style={{ 
        opacity: scrollOpacity,
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
          opacity: showContent ? scrollOpacity : 0
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
          opacity: showInteractive ? scrollOpacity : 0,
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
          opacity: showInteractive ? scrollOpacity : 0,
          mixBlendMode: 'difference'
        }}
      >
          <Link to="/activities/defence-security">
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 text-black font-teko px-10 py-5 text-xl rounded-none transition-all duration-200 transform hover:scale-105"
            >
              Explore our activities
            </Button>
          </Link>
      </div>

    </section>
  );
}
