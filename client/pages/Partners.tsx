import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Partners() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8">
                Our Partners
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted leading-relaxed">
                Strategic partnerships with leading organizations across the defence sector, government, and private industry.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Private Partners Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Private Sector Partners
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Octava Capital</h3>
                  <p className="text-scout-text-muted">Investment and financial services</p>
                </div>
                
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Kord Defence</h3>
                  <p className="text-scout-text-muted">Defence technology and solutions</p>
                </div>
                
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Ecovis Bondar & Bondar</h3>
                  <p className="text-scout-text-muted">Legal and consulting services</p>
                </div>
                
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Avalor.AI</h3>
                  <p className="text-scout-text-muted">Artificial intelligence solutions</p>
                </div>
                
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">InterProInvest (IPI)</h3>
                  <p className="text-scout-text-muted">Investment and project management</p>
                </div>
                
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">NAUDI</h3>
                  <p className="text-scout-text-muted">National defence industry association</p>
                </div>
                
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center col-span-full md:col-span-1">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Alliance of Defense Sphere</h3>
                  <p className="text-scout-text-muted">Defence sector collaboration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Strategic Defence Stakeholders Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Strategic Defence Stakeholders
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Ministry of Defense of Ukraine</h3>
                  <p className="text-scout-text-muted">Primary defence ministry coordination</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Ministry of Internal Affairs</h3>
                  <p className="text-scout-text-muted">Internal security and law enforcement</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Ministry of Strategic Industries</h3>
                  <p className="text-scout-text-muted">Strategic industry development</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">General Staff of the Armed Forces</h3>
                  <p className="text-scout-text-muted">Military command and coordination</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Land Forces Command</h3>
                  <p className="text-scout-text-muted">Ground forces operations</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Air Forces Command</h3>
                  <p className="text-scout-text-muted">Air defence and aviation</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Naval Forces Command</h3>
                  <p className="text-scout-text-muted">Maritime operations</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">UAV Forces Command</h3>
                  <p className="text-scout-text-muted">Unmanned aerial vehicle operations</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Special Operations Forces</h3>
                  <p className="text-scout-text-muted">Specialized military operations</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">National Guard</h3>
                  <p className="text-scout-text-muted">National security and civil protection</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Partnership Benefits Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Partnership Benefits
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">For International Partners</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Direct access to Ukrainian defence ecosystem</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Streamlined regulatory and bureaucratic processes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Local market expertise and cultural understanding</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Risk mitigation and compliance support</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">For Ukrainian Partners</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">International market access and visibility</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Technology transfer and knowledge sharing</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Investment and funding opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Joint venture and collaboration facilitation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* CTA Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                Interested in Partnership?
              </h2>
              <p className="text-lg text-scout-text-muted mb-8">
                Join our network of strategic partners and benefit from our comprehensive support services and extensive stakeholder connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
                  <button className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                    Become a Partner
                  </button>
                </a>
                <a href="/team">
                  <button className="border border-scout-border text-scout-text-white hover:bg-scout-card-bg px-8 py-4 rounded-lg transition-all duration-200">
                    Meet Our Team
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}







