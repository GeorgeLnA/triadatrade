import {
  Fragment,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent
} from "react";
import { FooterNetworkAnimation } from "@/components/ui/FooterNetworkAnimation";
import { FooterCursorTrail } from "@/components/ui/FooterCursorTrail";

// Footer navigation data structure
const footerNavigation = {
  pages: [
    { name: "Who We Are", href: "/#who-we-are" },
    { name: "Partners", href: "/#partners" },
    { name: "Contact", href: "/#contact" },
    { name: "Activities", href: "/activities" },
    { name: "Blog", href: "/#contact" }
  ],
  legal: [
    { name: "Terms of Service", href: "/TermsOfServices.pdf", target: "_blank" },
    { name: "Privacy Policy", href: "/PrivacyPolicy.pdf", target: "_blank" },
    { name: "Site Credit", href: "https://leadandallure.com", target: "_blank" }
  ]
};

const containerStyle: CSSProperties = {
  marginLeft: "clamp(1rem, 4vw, 70px)",
  marginRight: "clamp(1rem, 4vw, 70px)",
  maxWidth: "calc(100vw - clamp(2rem, 8vw, 140px))",
  width: "100%",
  paddingTop: "clamp(2rem, 5vw, 4rem)",
  paddingBottom: "clamp(1.5rem, 4vw, 3rem)"
};

const navigationGridStyle: CSSProperties = {
  marginTop: "clamp(1rem, 3vw, 4rem)",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  justifyContent: "center",
  gap: "clamp(1rem, 3vw, 4rem)"
};

const navSectionStyle: CSSProperties = {
  minWidth: "clamp(150px, 20vw, 280px)"
};

const navLinkStyle: CSSProperties = {
  fontSize: "clamp(0.875rem, 2vw, 1.5rem)",
  textTransform: "uppercase"
};

const logoStyle: CSSProperties = {
  height: "clamp(8rem, 20vw, 24rem)"
};

const logoWrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const legalNavStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
  gap: "0.5rem"
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pagesNavRef = useRef<HTMLElement>(null);
  const legalNavRef = useRef<HTMLElement>(null);
  const contactNavRef = useRef<HTMLElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const [logoTilt, setLogoTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isCursorActive, setIsCursorActive] = useState(false);

  const handleFooterMouseMove = (event: MouseEvent<HTMLElement>) => {
    setIsCursorActive(true);
    
    if (logoWrapperRef.current) {
      const logoBounds = logoWrapperRef.current.getBoundingClientRect();
      const logoCenterX = logoBounds.left + logoBounds.width / 2;
      const logoCenterY = logoBounds.top + logoBounds.height / 2;
      
      // Calculate relative position from logo center (normalized to -1 to 1)
      const relativeX = (event.clientX - logoCenterX) / (logoBounds.width / 2);
      const relativeY = (event.clientY - logoCenterY) / (logoBounds.height / 2);

      // Apply tilt based on cursor position relative to logo center
      const rotateY = relativeX * 18; // Lean left/right (clamp to reasonable range)
      const rotateX = -relativeY * 18; // Lean up/down (clamp to reasonable range)

      setLogoTilt({ 
        rotateX: Math.max(-18, Math.min(18, rotateX)), 
        rotateY: Math.max(-18, Math.min(18, rotateY)) 
      });
    }
  };

  const handleFooterMouseLeave = () => {
    setIsCursorActive(false);
    setLogoTilt({ rotateX: 0, rotateY: 0 });
  };

  const dynamicLogoWrapperStyle: CSSProperties = {
    ...logoWrapperStyle,
    transform: `perspective(900px) rotateX(${logoTilt.rotateX}deg) rotateY(${logoTilt.rotateY}deg)`,
    transition: "transform 0.35s ease-out",
    marginTop: "-8rem"
  };

  return (
    <footer
      ref={footerRef}
      className={`bg-white text-black w-full py-12 relative overflow-hidden z-50 ${isCursorActive ? "cursor-none" : ""}`}
      onMouseMove={handleFooterMouseMove}
      onMouseLeave={handleFooterMouseLeave}
    >
      <FooterNetworkAnimation
        backgroundColor="rgba(255, 255, 255, 1)"
        particleColor="rgba(0, 0, 0, "
        lineColor="rgba(0, 0, 0, "
      />
      <FooterCursorTrail
        containerRef={footerRef}
        pagesNavRef={pagesNavRef}
        legalNavRef={legalNavRef}
        contactNavRef={contactNavRef}
        active={isCursorActive}
        trailLength={7}
        distanceRatio={12}
        fadeDuration={2600}
      />
      <div className="w-full mx-auto relative z-10 px-4 sm:px-6 md:px-8" style={containerStyle}>
        {/* Mobile Layout: Logo at top, all links in one line at bottom */}
        <div className="flex flex-col lg:hidden items-center gap-4">
          {/* Logo - Top on Mobile - Bigger */}
          <div
            ref={logoWrapperRef}
            style={{...dynamicLogoWrapperStyle, marginTop: "-3rem", transform: `perspective(900px) rotateX(${logoTilt.rotateX}deg) rotateY(${logoTilt.rotateY}deg)`}}
          >
            <img 
              src="/TT logo black.png" 
              alt="Triada Trade Logo" 
              className="w-auto"
              style={{...logoStyle, height: "clamp(8rem, 20vw, 12rem)"}}
            />
          </div>

          {/* All Navigation Links + Legal Links - Combined in one line at bottom on Mobile */}
          <div className="w-full mt-4">
            {/* Combined Pages + Legal Links - One line at bottom */}
            <div className="flex flex-col items-center gap-2">
              {/* Pages Links - One line */}
              <nav ref={pagesNavRef} className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                {footerNavigation.pages.map((link, index) => (
                  <Fragment key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-600 hover:text-black transition-colors font-teko uppercase tracking-wide whitespace-nowrap"
                      style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
                    >
                      {link.name}
                    </a>
                    {index < footerNavigation.pages.length - 1 && (
                      <span className="text-gray-400" style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}>|</span>
                    )}
                  </Fragment>
                ))}
              </nav>

              {/* Legal Links - One line at bottom */}
              <nav ref={legalNavRef} className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                {footerNavigation.legal.map((link, index) => (
                  <Fragment key={link.name}>
                    {link.href === '#' ? (
                      <span className="text-gray-500 uppercase font-teko tracking-wide whitespace-nowrap" style={{ fontSize: "clamp(0.9rem, 2.8vw, 1.1rem)" }}>
                        {link.name}
                      </span>
                    ) : (
                      <>
                        <a 
                          href={link.href} 
                          target={link.target || "_self"}
                          rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                          className="text-gray-500 hover:text-black transition-colors uppercase font-teko tracking-wide whitespace-nowrap"
                          style={{ fontSize: "clamp(0.9rem, 2.8vw, 1.1rem)" }}
                        >
                          {link.name}
                        </a>
                        {index < footerNavigation.legal.length - 1 && (
                          <span className="text-gray-400" style={{ fontSize: "clamp(0.9rem, 2.8vw, 1.1rem)" }}>|</span>
                        )}
                      </>
                    )}
                  </Fragment>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Desktop Layout: 3-column grid (pages left, logo center, legal right) */}
        <div className="hidden lg:flex flex-col items-center">
          <div className="w-full" style={navigationGridStyle}>
            {/* Pages Column - Left */}
            <div className="flex flex-col items-start gap-10 justify-self-start" style={{...navSectionStyle, marginTop: "clamp(-6rem, -12vw, -3rem)"}}>
              <nav ref={pagesNavRef} className="flex flex-col gap-2 items-start">
                {footerNavigation.pages.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className="text-gray-600 hover:text-black transition-colors font-teko uppercase tracking-wide"
                    style={navLinkStyle}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              
              {/* Contact Information - Under Pages */}
              <nav ref={contactNavRef} className="flex flex-col gap-2 items-start">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/triada-trade-partners/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors flex items-center"
                  aria-label="LinkedIn"
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "clamp(20px, 2.2vw, 28px)", height: "clamp(20px, 2.2vw, 28px)" }}
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Phone */}
                <a 
                  href="tel:+380971265663"
                  className="text-gray-600 hover:text-black transition-colors font-teko uppercase tracking-wide"
                  style={navLinkStyle}
                >
                  +380-97-126-5663
                </a>

                {/* Email */}
                <a 
                  href="mailto:info@triada-trade.com"
                  className="text-gray-600 hover:text-black transition-colors font-teko uppercase tracking-wide"
                  style={navLinkStyle}
                >
                  info@triada-trade.com
                </a>
              </nav>
            </div>
            
            {/* Logo - Center */}
            <div
              ref={logoWrapperRef}
              style={{...dynamicLogoWrapperStyle, justifySelf: "center"}}
            >
              <img 
                src="/TT logo black.png" 
                alt="Triada Trade Logo" 
                className="w-auto"
                style={logoStyle}
              />
            </div>
            
            {/* Legal Links - Right Column */}
            <div className="flex flex-col items-end gap-10 justify-self-end" style={{...navSectionStyle, marginTop: "clamp(-10rem, -18vw, -6rem)"}}>
              <nav ref={legalNavRef} className="flex flex-col gap-2 items-end">
                {footerNavigation.legal.map((link) => (
                  link.href === '#' ? (
                    <span key={link.name} className="text-gray-500 uppercase font-teko tracking-wide" style={{ fontSize: "clamp(0.875rem, 1.8vw, 1.25rem)" }}>
                      {link.name}
                    </span>
                  ) : (
                    <a 
                      key={link.name}
                      href={link.href} 
                      target={link.target || "_self"}
                      rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="text-gray-500 hover:text-black transition-colors uppercase font-teko tracking-wide"
                      style={{ fontSize: "clamp(0.875rem, 1.8vw, 1.25rem)" }}
                    >
                      {link.name}
                    </a>
                  )
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
