import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VisionMission() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8">
                Vision & Mission
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted leading-relaxed">
                Our commitment to building a secure, resilient Ukraine through strategic partnerships and collaborative defence initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Vision Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                    Our Vision
                  </h2>
                  <p className="text-lg text-scout-text-muted mb-8">
                    We envision a future where Ukraine stands as a resilient, secure nation supported by robust international alliances and strengthened through strategic partnerships.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-scout-green rounded-full mt-3 mr-6 flex-shrink-0" />
                    <p className="text-lg text-scout-text-muted">
                      A resilient, secure Ukraine supported by robust international alliances
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-scout-green rounded-full mt-3 mr-6 flex-shrink-0" />
                    <p className="text-lg text-scout-text-muted">
                      Private–public partnerships and defence cooperation that strengthen the wider ecosystem
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Mission Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                    Our Mission
                  </h2>
                  <p className="text-lg text-scout-text-muted leading-relaxed">
                    Attract and enable foreign partners to collaborate with Ukraine's MoD, Security & Defence Forces, and private defence companies—improving outcomes through strategy, implementation, and analysis.
                  </p>
                </div>
                
                <div className="order-1 md:order-2">
                  <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-scout-text-white mb-6">How We Achieve This</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                        <span className="text-scout-text-muted">Strategic partnership facilitation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                        <span className="text-scout-text-muted">Implementation support and guidance</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                        <span className="text-scout-text-muted">Comprehensive analysis and reporting</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                        <span className="text-scout-text-muted">Network access and stakeholder coordination</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}







