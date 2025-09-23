import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const scrollY = window.scrollY;
        const rotation = scrollY * 0.3; // Slower spin speed
        logoRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Independent floating navigation elements */}
      
      {/* Left Navigation - 2 buttons */}
      <div 
        className="fixed top-6 left-[28%] pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference', transform: 'translateX(-50%)', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
      >
        <a href="/who-we-are" className="text-lg text-white transition-colors duration-200 px-4 py-3 pointer-events-auto">
          Who we are
        </a>
      </div>
      
      <div 
        className="fixed top-6 left-[38%] pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference', transform: 'translateX(-50%)', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
      >
        <a href="/partners" className="text-lg text-white transition-colors duration-200 px-4 py-3 pointer-events-auto">
          Partners
        </a>
      </div>

      {/* Triada Trade Logo - Centered */}
      <a href="/" className="fixed top-2 left-1/2 pointer-events-auto z-[9999] transition-opacity hover:opacity-80" style={{ transform: 'translateX(-50%) translateY(2px)', opacity: 0, animation: 'showHeaderLogo 0.01s ease-out forwards', animationDelay: '3.2s', mixBlendMode: 'difference' }}>
        <img 
          ref={logoRef}
          src="/TT logo.png" 
          alt="Triada Trade" 
          className="scroll-spin-logo" 
          style={{ height: '60px', width: 'auto' }}
        />
      </a>

      {/* Right Navigation - 2 buttons */}
      <div 
        className="fixed top-6 right-[38%] pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference', transform: 'translateX(50%)', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
      >
        <a href="/team" className="text-lg text-white transition-colors duration-200 px-4 py-3 pointer-events-auto">
          Our Team
        </a>
      </div>
      
      <div 
        className="fixed top-6 right-[28%] pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference', transform: 'translateX(50%)', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
      >
        <a href="/contact" className="text-lg text-white transition-colors duration-200 px-4 py-3 pointer-events-auto">
          Contact us
        </a>
      </div>
    </>
  );
}
