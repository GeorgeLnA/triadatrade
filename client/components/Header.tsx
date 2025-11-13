import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { PixelButton } from "@/components/ui/PixelButton";
import { useLoading } from "@/App";

type HeaderProps = { staticFinal?: boolean; hideLogo?: boolean };

export default function Header({ staticFinal = false, hideLogo = false }: HeaderProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [buttonShouldSlideIn, setButtonShouldSlideIn] = useState(false);
  const { heroAnimationsComplete } = useLoading();
  const isActivities = typeof document !== 'undefined' && document.documentElement.classList.contains('activities-no-anim');
  const final = staticFinal || isActivities;
  const showButton = final || heroAnimationsComplete;

  // Handle button slide animation when menu closes
  useEffect(() => {
    if (!showButton) return;

    if (isMobileMenuOpen) {
      // Menu is opening - hide button
      setButtonShouldSlideIn(false);
    } else {
      // Menu is closed - trigger slide in animation
      setButtonShouldSlideIn(true);
    }
  }, [isMobileMenuOpen, showButton]);

  // Apply animation styles when buttonShouldSlideIn changes
  useEffect(() => {
    if (!menuButtonRef.current || !showButton) return;

    if (buttonShouldSlideIn) {
      // Start from top
      menuButtonRef.current.style.transform = 'translateY(-100%)';
      menuButtonRef.current.style.opacity = '0';
      menuButtonRef.current.style.visibility = 'visible';
      menuButtonRef.current.style.pointerEvents = 'auto';
      
      // Force reflow
      menuButtonRef.current.offsetHeight;
      
      // Animate to position
      requestAnimationFrame(() => {
        if (menuButtonRef.current) {
          menuButtonRef.current.style.transform = 'translateY(0)';
          menuButtonRef.current.style.opacity = '1';
        }
      });
    } else {
      // Hide button
      menuButtonRef.current.style.transform = 'translateY(-100%)';
      menuButtonRef.current.style.opacity = '0';
      menuButtonRef.current.style.visibility = 'hidden';
      menuButtonRef.current.style.pointerEvents = 'none';
    }
  }, [buttonShouldSlideIn, showButton]);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
            <PixelButton
              as="a"
              href="#who-we-are"
              className="px-4 py-2 border border-white/70 rounded-lg text-white font-teko text-xl transition-colors duration-300 hover:bg-white/10 hover:border-white"
            >
              Who we are
            </PixelButton>
            <PixelButton
              as="a"
              href="#partners"
              className="px-4 py-2 border border-white/70 rounded-lg text-white font-teko text-xl transition-colors duration-300 hover:bg-white/10 hover:border-white"
            >
              Partners
            </PixelButton>
            <PixelButton
              as="a"
              href="#team"
              className="px-4 py-2 border border-white/70 rounded-lg text-white font-teko text-xl transition-colors duration-300 hover:bg-white/10 hover:border-white"
            >
              Our Team
            </PixelButton>
            <PixelButton
              as="a"
              href="#contact"
              className="px-4 py-2 border border-white/70 rounded-lg text-white font-teko text-xl transition-colors duration-300 hover:bg-white/10 hover:border-white"
            >
              Blog
            </PixelButton>
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

      {/* Mobile Menu Button */}
      {showButton && (
        <button
          ref={menuButtonRef}
          className="fixed top-6 right-4 md:hidden pointer-events-auto z-[10000]"
          style={{ 
            mixBlendMode: 'difference',
            transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            WebkitTransition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Backdrop Overlay - Transparent, no blur */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 sm:hidden z-[9998]"
          style={{
            backgroundColor: 'transparent',
            pointerEvents: 'auto'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Menu - Slides from right with blur only */}
      <nav
        className="fixed top-0 right-0 h-full backdrop-blur-md border-l border-scout-border/40 shadow-2xl sm:hidden z-[9999]"
        style={{ 
          width: '40vw',
          mixBlendMode: 'normal',
          transform: isMobileMenuOpen ? 'translateX(0px)' : 'translateX(100%)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          WebkitTransition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
          backgroundColor: 'transparent'
        }}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full p-8 pt-12">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-6 mt-4">
            <a
              href="/activities"
              className="text-2xl text-white transition-all duration-200 hover:text-scout-green hover:translate-x-2 font-teko uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Activities
            </a>
            <a
              href="#who-we-are"
              className="text-2xl text-white transition-all duration-200 hover:text-scout-green hover:translate-x-2 font-teko uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Who we are
            </a>
            <a
              href="#partners"
              className="text-2xl text-white transition-all duration-200 hover:text-scout-green hover:translate-x-2 font-teko uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partners
            </a>
            <a
              href="#team"
              className="text-2xl text-white transition-all duration-200 hover:text-scout-green hover:translate-x-2 font-teko uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Team
            </a>
            <a
              href="#contact"
              className="text-2xl text-white transition-all duration-200 hover:text-scout-green hover:translate-x-2 font-teko uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
