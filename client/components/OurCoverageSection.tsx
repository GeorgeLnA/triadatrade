import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

export default function OurCoverageSection() {
  return (
    <section className="relative w-full min-h-[800px] bg-scout-dark overflow-x-hidden">
      <div className="container mx-auto px-6 py-16" style={{ marginLeft: '43px', marginRight: '43px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left section - Globe */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1 relative z-0 lg:col-span-2">
            <div className="w-full max-w-[800px]">
              <RotatingEarth 
                width={800} 
                height={800} 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          {/* Right section - Content */}
          <div className="space-y-8 order-1 lg:order-2 relative z-10 lg:col-span-1 lg:-ml-48">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-6">
                Our Global Coverage
              </h2>
              <p className="text-lg text-scout-text-muted mb-8 leading-relaxed">
                Triada Trade operates across multiple continents, providing strategic defence industry consulting and partnership facilitation worldwide. Our global presence ensures we can support your international expansion and cross-border operations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-scout-text-white">Americas</h3>
                <ul className="space-y-2 text-scout-text-muted">
                  <li>• United States</li>
                  <li>• Canada</li>
                  <li>• Brazil</li>
                  <li>• Mexico</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-scout-text-white">Europe & Asia</h3>
                <ul className="space-y-2 text-scout-text-muted">
                  <li>• United Kingdom</li>
                  <li>• Germany</li>
                  <li>• Japan</li>
                  <li>• Australia</li>
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <div className="bg-scout-border/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-scout-text-white mb-3">Strategic Partnerships</h4>
                <p className="text-scout-text-muted text-sm">
                  We maintain strategic partnerships with key defence contractors, government agencies, and industry leaders across all major markets to ensure seamless service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
