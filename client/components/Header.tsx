import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const logoRef = useRef<HTMLImageElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      
      {/* Left Navigation - 2 buttons - Hidden on mobile */}
      <div 
        className="fixed top-6 left-[28%] pointer-events-none z-[9999] hidden sm:block"
        style={{ mixBlendMode: 'difference', transform: 'translateX(-50%)', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
      >
        <a href="/who-we-are" className="text-2xl text-white transition-colors duration-200 px-6 py-4 pointer-events-auto font-teko">
          Who we are
        </a>
      </div>
      
      <div 
        className="fixed top-6 left-[38%] pointer-events-none z-[9999] hidden sm:block"
        style={{ mixBlendMode: 'difference', transform: 'translateX(-50%)', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
      >
        <a href="/partners" className="text-2xl text-white transition-colors duration-200 px-6 py-4 pointer-events-auto font-teko">
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

      {/* Right Navigation - 2 buttons - Hidden on mobile */}
      <div 
        className="fixed top-6 right-[38%] pointer-events-none z-[9999] hidden sm:block"
        style={{ mixBlendMode: 'difference', transform: 'translateX(50%)', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
      >
        <a href="/team" className="text-2xl text-white transition-colors duration-200 px-6 py-4 pointer-events-auto font-teko">
          Our Team
        </a>
      </div>
      
      <div 
        className="fixed top-6 right-[28%] pointer-events-none z-[9999] hidden sm:block"
        style={{ mixBlendMode: 'difference', transform: 'translateX(50%)', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
      >
        <a href="/contact" className="text-2xl text-white transition-colors duration-200 px-6 py-4 pointer-events-auto font-teko">
          Contact us
        </a>
      </div>

      {/* Mobile Menu Button - Right side */}
      <button
        className="fixed top-6 right-16 sm:hidden pointer-events-auto z-[9999]"
        style={{ mixBlendMode: 'difference', opacity: 0, animation: 'dropDownNavigationFixed 0.5s ease-out forwards', animationDelay: '3.3s' }}
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
              href="/who-we-are" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Who we are
            </a>
            <a 
              href="/partners" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partners
            </a>
            <a 
              href="/team" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Team
            </a>
            <a 
              href="/contact" 
              className="text-2xl text-white transition-all duration-200 hover:text-gray-300 hover:-translate-x-1 font-teko text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
