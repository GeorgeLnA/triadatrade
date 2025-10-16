import { useState, useEffect } from "react";

// Footer navigation data structure
const footerNavigation = {
  services: [
    { name: "Defence & Security", href: "/activities/defence-security" },
    { name: "Legal & Financing", href: "/activities/legal-financing" },
    { name: "Blog", href: "/blog" }
  ],
  pages: [
    { name: "Who We Are", href: "/who-we-are" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Site Credit", href: "#" }
  ]
};

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
    const damping = 0.15;
    const animate = () => {
      setLogoPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * damping,
        y: prev.y + (mousePosition.y - prev.y) * damping
      }));
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mousePosition]);

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  return (
    <footer 
      className="bg-white text-black w-full relative"
      style={{
        paddingTop: 0,
        paddingBottom: 'calc(3rem + 1vw)'
      }}
    >
      {/* Click shield to ensure footer is always clickable, not covered */}
      <div className="pointer-events-none absolute inset-0 z-0" />
      <div
        className="relative z-10 w-full mx-auto"
        style={{
          marginLeft: '70px',
          marginRight: '70px',
          maxWidth: 'calc(100vw - 140px)'
        }}
      >
        <div className="flex flex-col items-center">
          {/* Main Title */}
          <h1 
            className="font-bold font-audiowide"
            style={{
              fontSize: 'calc(4rem + 5vw)'
            }}
          >
            TRIADATRADE
          </h1>
          
          {/* Navigation Grid */}
          <div 
            className="flex justify-between items-start w-full"
            style={{
              marginTop: 'calc(1rem + 0.5vw)',
              maxWidth: 'calc(100% - 2rem)'
            }}
          >
            {/* Services Column */}
            <nav 
              className="flex flex-col"
              style={{
                gap: 'calc(0.5rem + 0.25vw)'
              }}
            >
              <h3 
                className="font-semibold text-black font-teko uppercase"
                style={{
                  fontSize: 'calc(1rem + 1vw)',
                  marginBottom: 'calc(0.5rem + 0.25vw)'
                }}
              >
                Services
              </h3>
              {footerNavigation.services.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-600 hover:text-black transition-colors"
                  style={{
                    fontSize: 'calc(0.875rem + 0.5vw)'
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            {/* Logo - Center */}
            <img 
              src="/TT logo black.png" 
              alt="Triada Trade Logo" 
              className="w-auto transition-transform duration-75 ease-out"
              style={{
                height: 'calc(10rem + 2vw)',
                marginTop: 'calc(-2rem + -0.5vw)',
                transform: `translate(${(logoPosition.x - centerX) * 0.05}px, ${(logoPosition.y - centerY) * 0.05}px)`
              }}
            />
            
            {/* Pages Column */}
            <nav 
              className="flex flex-col"
              style={{
                gap: 'calc(0.5rem + 0.25vw)'
              }}
            >
              <h3 
                className="font-semibold text-black font-teko uppercase"
                style={{
                  fontSize: 'calc(1rem + 1vw)',
                  marginBottom: 'calc(0.5rem + 0.25vw)'
                }}
              >
                Pages
              </h3>
              {footerNavigation.pages.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-600 hover:text-black transition-colors"
                  style={{
                    fontSize: 'calc(0.875rem + 0.5vw)'
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Legal Links */}
          <nav 
            className="flex justify-center items-center uppercase"
            style={{
              gap: 'calc(1.5rem + 0.5vw)',
              marginTop: 'calc(4rem + 1vw)'
            }}
          >
            {footerNavigation.legal.map((link, index) => (
              <span key={link.name} className="flex items-center" style={{ gap: 'calc(1.5rem + 0.5vw)' }}>
                {link.href === '#' ? (
                  <span 
                    className="text-gray-500 uppercase"
                    style={{
                      fontSize: 'calc(0.625rem + 0.25vw)'
                    }}
                  >
                    {link.name}
                  </span>
                ) : (
                  <a 
                    href={link.href} 
                    className="text-gray-500 hover:text-black transition-colors uppercase"
                    style={{
                      fontSize: 'calc(0.625rem + 0.25vw)'
                    }}
                  >
                    {link.name}
                  </a>
                )}
                {index < footerNavigation.legal.length - 1 && (
                  <span 
                    className="text-gray-500"
                    style={{
                      fontSize: 'calc(0.625rem + 0.25vw)'
                    }}
                  >
                    |
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
