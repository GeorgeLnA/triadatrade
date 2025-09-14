import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Team() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8">
                Our Team
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted leading-relaxed">
                Meet the experienced professionals driving Triada Trade's mission to strengthen Ukraine's defence partnerships.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Senior Partners Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Senior Partners
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-scout-dark">YY</span>
                  </div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-2">Yaroslav Yakymov</h3>
                  <p className="text-scout-text-muted mb-4">Chief Executive Officer (CEO)</p>
                  <p className="text-sm text-scout-text-muted">
                    Leading strategic vision and overall company direction with extensive experience in defence sector partnerships.
                  </p>
                </div>
                
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-scout-dark">MN</span>
                  </div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-2">Marsel Nikitin</h3>
                  <p className="text-scout-text-muted mb-4">Chief Revenue Officer (CRO)</p>
                  <p className="text-sm text-scout-text-muted">
                    Driving revenue growth and business development initiatives across international markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Leadership Team Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Leadership Team
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-scout-dark">NB</span>
                  </div>
                  <h3 className="text-xl font-bold text-scout-text-white mb-2">Natali Boychenko</h3>
                  <p className="text-scout-text-muted">Financial Director</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-scout-dark">ON</span>
                  </div>
                  <h3 className="text-xl font-bold text-scout-text-white mb-2">Oleksandra Nikitina</h3>
                  <p className="text-scout-text-muted">Taxation Expert</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-scout-dark">ED</span>
                  </div>
                  <h3 className="text-xl font-bold text-scout-text-white mb-2">Olena Danyliv</h3>
                  <p className="text-scout-text-muted">Production Advisor</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-scout-dark">YZ</span>
                  </div>
                  <h3 className="text-xl font-bold text-scout-text-white mb-2">Yurii Zozulya</h3>
                  <p className="text-scout-text-muted">R&D Provisioning</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-scout-dark">OM</span>
                  </div>
                  <h3 className="text-xl font-bold text-scout-text-white mb-2">Oliver Morley</h3>
                  <p className="text-scout-text-muted">International Relations</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-scout-dark">DS</span>
                  </div>
                  <h3 className="text-xl font-bold text-scout-text-white mb-2">Denis Sviatokum</h3>
                  <p className="text-scout-text-muted">Commercial Agent</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Specialists Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Specialists
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                      <span className="text-lg font-bold text-scout-dark">OP</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-scout-text-white mb-2">Oleg Pryimenko</h3>
                      <p className="text-scout-text-muted mb-4">UAV Expert; Chief of Testing Operations</p>
                      <p className="text-scout-text-muted">
                        Leading UAV testing and operations with extensive experience in unmanned systems and technical validation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-scout-dark border border-scout-border rounded-lg p-8">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                      <span className="text-lg font-bold text-scout-dark">BP</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-scout-text-white mb-2">Bohdan Popov</h3>
                      <p className="text-scout-text-muted mb-4">Head of Analytical Department</p>
                      <p className="text-scout-text-muted">
                        Leading our analytical team in providing market insights, OSINT analysis, and strategic intelligence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Team Values Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Our Team Values
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4">Collaboration</h3>
                  <p className="text-scout-text-muted">
                    Working together across disciplines to deliver comprehensive solutions for our partners.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4">Innovation</h3>
                  <p className="text-scout-text-muted">
                    Embracing new technologies and methodologies to stay at the forefront of defence industry developments.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-scout-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4">Excellence</h3>
                  <p className="text-scout-text-muted">
                    Maintaining the highest standards of quality and professionalism in all our work and partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* CTA Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                Join Our Mission
              </h2>
              <p className="text-lg text-scout-text-muted mb-8">
                Interested in joining our team or learning more about career opportunities at Triada Trade?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
                  <button className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                    Contact Us
                  </button>
                </a>
                <a href="/partners">
                  <button className="border border-scout-border text-scout-text-white hover:bg-scout-dark px-8 py-4 rounded-lg transition-all duration-200">
                    View Partners
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
