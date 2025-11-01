// Footer navigation data structure
const footerNavigation = {
  services: [
    { name: "Activities", href: "/activities" },
    { name: "Blog", href: "/#contact" }
  ],
  pages: [
    { name: "Who We Are", href: "/#who-we-are" },
    { name: "Partners", href: "/#partners" },
    { name: "Contact", href: "/#contact" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Site Credit", href: "#" }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-white text-black w-full py-12 relative z-50">
      <div className="w-full mx-auto px-8 max-w-7xl">
        <div className="flex flex-col items-center">
          {/* Main Title */}
          <h1 className="font-bold font-audiowide text-4xl md:text-6xl lg:text-8xl">
            TRIADATRADE
          </h1>
          
          {/* Navigation Grid */}
          <div className="flex justify-between items-start w-full mt-8 max-w-5xl">
            {/* Services Column */}
            <nav className="flex flex-col gap-2">
              <h3 className="font-semibold text-black font-teko uppercase text-base md:text-lg mb-2">
                Services
              </h3>
              {footerNavigation.services.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-600 hover:text-black transition-colors text-sm md:text-base"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            {/* Logo - Center */}
            <img 
              src="/TT logo black.png" 
              alt="Triada Trade Logo" 
              className="h-32 md:h-40 lg:h-48 w-auto mx-8"
            />
            
            {/* Pages Column */}
            <nav className="flex flex-col gap-2">
              <h3 
                className="font-semibold text-black font-teko uppercase text-base md:text-lg mb-2"
              >
                Pages
              </h3>
              {footerNavigation.pages.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-600 hover:text-black transition-colors text-sm md:text-base"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Legal Links */}
          <nav className="flex justify-center items-center gap-4 md:gap-6 mt-16 uppercase">
            {footerNavigation.legal.map((link, index) => (
              <span key={link.name} className="flex items-center gap-4 md:gap-6">
                {link.href === '#' ? (
                  <span className="text-gray-500 uppercase text-xs md:text-sm">
                    {link.name}
                  </span>
                ) : (
                  <a 
                    href={link.href} 
                    className="text-gray-500 hover:text-black transition-colors uppercase text-xs md:text-sm"
                  >
                    {link.name}
                  </a>
                )}
                {index < footerNavigation.legal.length - 1 && (
                  <span className="text-gray-500 text-xs md:text-sm">|</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
