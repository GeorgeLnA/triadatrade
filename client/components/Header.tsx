import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

type HeaderProps = { staticFinal?: boolean; hideLogo?: boolean };

export default function Header({ staticFinal = false, hideLogo = false }: HeaderProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActivities = typeof document !== 'undefined' && document.documentElement.classList.contains('activities-no-anim');
  const final = staticFinal || isActivities;

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
      
      {/* Left Navigation - All links and buttons - Hidden on mobile */}
      <div 
        className="fixed top-4 left-20 pointer-events-auto z-[9999] hidden sm:block"
        style={{ 
          mixBlendMode: 'difference', 
          opacity: final ? 1 : 0, 
          animation: final ? 'none' : 'dropDownNavigationFixed 0.5s ease-out forwards', 
          ...(final ? {} : { animationDelay: '3.3s' }) 
        }}
      >
        <div className="flex items-center gap-6">
          {/* Navigation Links - All styled like Blog button */}
          <div className="flex items-center gap-3">
            <a href="#who-we-are" className="px-4 py-2 border border-white/70 rounded-lg text-white font-teko text-xl hover:bg-white/10 transition-colors">
              Who we are
            </a>
            <a href="#partners" className="px-4 py-2 border border-white/70 rounded-lg text-white font-teko text-xl hover:bg-white/10 transition-colors">
              Partners
            </a>
            <a href="#team" className="px-4 py-2 border border-white/70 rounded-lg text-white font-teko text-xl hover:bg-white/10 transition-colors">
              Our Team
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 border border-white/70 rounded-lg text-white font-teko text-xl hover:bg-white/10 transition-colors"
            >
              Blog
            </a>
          </div>
        </div>
      </div>

      {/* Triada Trade Logo - Centered */}
      {!hideLogo && (
        <a href="/" className="fixed top-2 left-1/2 pointer-events-auto z-[9999] transition-opacity hover:opacity-80" style={{ transform: 'translateX(-50%) translateY(2px)', opacity: final ? 1 : 0, animation: final ? 'none' : 'showHeaderLogo 0.01s ease-out forwards', ...(final ? {} : { animationDelay: '3.2s' }), mixBlendMode: 'difference' }}>
          <img 
            ref={logoRef}
            src="/TT logo.png" 
            alt="Triada Trade" 
            className="scroll-spin-logo" 
            style={{ height: '60px', width: 'auto' }}
          />
        </a>
      )}

      {/* Activities CTA - Right side only - Hidden on mobile */}
      <div 
        className="fixed top-6 right-20 pointer-events-auto z-[9999] hidden sm:block"
        style={{ mixBlendMode: 'difference', opacity: final ? 1 : 0, animation: final ? 'none' : 'dropDownNavigationFixed 0.5s ease-out forwards', ...(final ? {} : { animationDelay: '3.3s' }) }}
      >
        <a 
          href="/activities" 
          className="px-6 py-3 bg-white text-black font-teko text-xl hover:bg-white/90 transition-colors rounded-lg font-bold"
        >
          OUR ACTIVITIES
        </a>
      </div>

      {/* Mobile Menu Button - Right side */}
      <button
        className="fixed top-6 right-16 sm:hidden pointer-events-auto z-[9999]"
        style={{ mixBlendMode: 'difference', opacity: final ? 1 : 0, animation: final ? 'none' : 'dropDownNavigationFixed 0.5s ease-out forwards', ...(final ? {} : { animationDelay: '3.3s' }) }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <Menu className="w-8 h-8 text-white" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`fixed top-20 sm:hidden z-[9999] transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-[-10px] scale-95 pointer-events-none'
        }`}
        style={{ right: '41.5px' }}
      >
        <div 
          className="bg-black/95 backdrop-blur-md border border-white/30 p-4 shadow-2xl min-w-[160px] text-right"
          style={{ mixBlendMode: 'normal' }}
        >
          <div className="flex flex-col space-y-4">
            <a 
              href="/activities" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Activities
            </a>
            <a 
              href="#who-we-are" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Who we are
            </a>
            <a 
              href="#partners" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partners
            </a>
            <a 
              href="#team" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Team
            </a>
            <a 
              href="#contact" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
