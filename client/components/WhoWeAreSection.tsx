import { useState } from "react";

export default function WhoWeAreSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Ultra-Premium Background - Transparent to show waves */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-scout-green/20 to-transparent mix-blend-difference"></div>
        <div className="absolute top-1/3 right-1/4 w-px h-1/3 bg-gradient-to-b from-transparent via-scout-border/30 to-transparent mix-blend-difference"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-1/2 bg-gradient-to-b from-transparent via-scout-green/10 to-transparent mix-blend-difference"></div>
      </div>

      <div className="relative z-2 container mx-auto px-6 py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Ultra-Minimalist Layout */}
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            
            {/* Portrait - Museum Quality */}
            <div className="order-1 lg:order-1 lg:col-span-4">
              <div className="relative mx-auto lg:mx-0" style={{ width: '370px' }}>
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src="/yaroslav_yakymov_marsel_nikitin_mobile.jpg" 
                    alt="Yaroslav Yakymov and Marsel Nikitin - Triada Trade Leadership"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Minimalist Border Frame */}
                <div className="absolute inset-0 border border-scout-border/30 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Content - Ultra-Clean Typography */}
            <div className="order-2 lg:order-2 lg:col-span-8">
              <div className="max-w-4xl">
                
                
                {/* Main Content */}
                <div className="space-y-8">
                  {/* First paragraph - always visible with much bigger text */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-scout-text-muted leading-relaxed font-metropolis text-2xl md:text-3xl lg:text-4xl">
                      At Triada Trade, we pride ourselves on being a leading provider in the defense sector, renowned for our commitment to excellence, innovation, and integrity. Our business model is built on a foundation of collaboration and adaptability, allowing us to respond swiftly to the evolving needs of our clients and the industry.
                    </p>
                  </div>
                  
                  {/* Expandable content */}
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="space-y-8">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-scout-text-muted leading-relaxed font-metropolis text-2xl md:text-3xl lg:text-4xl">
                          With years of experience and a proven track record, Triada Trade has established a stellar reputation among defense contractors and governmental agencies. We are recognized for delivering high-quality products and services that exceed expectations, fostering long-lasting relationships with our clients.
                        </p>
                      </div>
                      
                      <div className="prose prose-invert max-w-none">
                        <p className="text-scout-text-muted leading-relaxed font-metropolis text-2xl md:text-3xl lg:text-4xl">
                          Our extensive network of partnerships with key stakeholders—including government entities, industry leaders, and defense organizations—enables us to stay at the forefront of technological advancements. These connections not only enhance our capabilities but also allow us to provide seamless solutions tailored to the specific requirements of our clients.
                        </p>
                      </div>
                      
                      <div className="prose prose-invert max-w-none">
                        <p className="text-scout-text-muted leading-relaxed font-metropolis text-2xl md:text-3xl lg:text-4xl">
                          Trust is the cornerstone of our operations. We understand the sensitive nature of the defense industry and are committed to conducting our business with the highest ethical standards. Our clients can rely on us for transparency, accountability, and unwavering support, knowing that their missions are in capable hands.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-scout-green/10 border border-scout-green/30 rounded-lg text-scout-text-white font-metropolis text-lg hover:bg-scout-green/20 hover:border-scout-green/50 transition-all duration-300"
                    >
                      <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}







