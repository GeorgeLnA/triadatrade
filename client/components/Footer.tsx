import { useState, useEffect } from "react";

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const damping = 0.15; // More responsive damping
    const animate = () => {
      setLogoPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * damping,
        y: prev.y + (mousePosition.y - prev.y) * damping
      }));
      requestAnimationFrame(animate);
    };
    animate();
  }, [mousePosition]);

  return (
    <footer className="bg-white text-black pt-0 pb-16 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center">
          <h1 className="text-[9rem] font-bold font-audiowide">TRIADATRADE</h1>
          
          {/* Services and Pages sections */}
          <div className="flex justify-between items-start w-full max-w-4xl mt-4">
            {/* Services - Left */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-2xl font-semibold text-black mb-2 font-teko uppercase">Services</h3>
              <a href="#" className="text-lg text-gray-600 hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>
                Defence & Security
              </a>
              <a href="#" className="text-lg text-gray-600 hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>
                Legal & Financing
              </a>
              <a href="#" className="text-lg text-gray-600 hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>
                Blog
              </a>
            </div>
            
            {/* Logo - Center */}
            <img 
              src="/TT logo black.png" 
              alt="TT Logo" 
              className="h-48 w-auto -mt-8 transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${(logoPosition.x - window.innerWidth / 2) * 0.05}px, ${(logoPosition.y - window.innerHeight / 2) * 0.05}px)`
              }}
            />
            
            {/* Pages - Right */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-2xl font-semibold text-black mb-2 font-teko uppercase">Pages</h3>
              <a href="#" className="text-lg text-gray-600 hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>
                Who We Are
              </a>
              <a href="#" className="text-lg text-gray-600 hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>
                Partners
              </a>
              <a href="#" className="text-lg text-gray-600 hover:text-black transition-colors" onClick={(e) => e.preventDefault()}>
                Contact
              </a>
            </div>
          </div>
          
          {/* Privacy Policy, Terms of Service and Site Credit */}
          <div className="flex justify-center space-x-8 mt-20">
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors uppercase" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <span className="text-xs text-gray-500">|</span>
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors uppercase" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <span className="text-xs text-gray-500">|</span>
            <span className="text-xs text-gray-500 uppercase">
              Site Credit
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
