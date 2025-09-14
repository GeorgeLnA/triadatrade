import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LegalFinancing() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8">
                Legal, Financing & Consulting
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted leading-relaxed">
                Expert legal, financial, and analytical services to support international defence partnerships and business operations in Ukraine.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Press & Consulting Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                    Press & Consulting
                  </h2>
                  <p className="text-lg text-scout-text-muted mb-8">
                    Our analytical team provides comprehensive market insights, weekly digests, analytical reports, and OSINT analysis covering security, economy, internal politics, and geopolitics.
                  </p>
                  
                  <div className="bg-scout-dark border border-scout-border rounded-lg p-6">
                    <h3 className="text-xl font-bold text-scout-text-white mb-4">Team Lead</h3>
                    <p className="text-scout-text-muted">
                      <strong>Bohdan Popov</strong> — Head of Analytical Department
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Our Services</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Market insights and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Weekly digests and reports</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">OSINT analysis and monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Security and geopolitical analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Economic and political intelligence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Legal & Financing Services Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Legal & Financing Services
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Counterparty Verification & Risk Management</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Reputation and financial checks</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Legal and tax risk assessment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Affiliation and sanctions screening</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Legal Support & Document Legalization</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Notarisation services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Professional translations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Apostille and consular services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Documents for international use</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Controlled Foreign Companies (CFCs)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Structuring review and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Tax planning strategies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Authority interactions and compliance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Intellectual Property</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Uniqueness checks and validation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Trademark and patent registration</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">IP protection and portfolio management</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">International Banking Operations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Document and accounting support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Crypto wallet and payments setup</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Financial instruments guidance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">OSINT & Open-Source Analysis</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Data collection and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Comprehensive reporting</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Continuous monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Why Choose Us Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Why Choose Our Services?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Expert Team</h3>
                  <p className="text-lg text-scout-text-muted mb-6">
                    Our team of practitioners brings deep expertise across security, economy, internal politics, and geopolitics, ensuring comprehensive analysis and support.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Local Knowledge</h3>
                  <p className="text-lg text-scout-text-muted">
                    Deep understanding of Ukrainian business environment, regulatory framework, and cultural nuances that impact international partnerships.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Comprehensive Support</h3>
                  <p className="text-lg text-scout-text-muted mb-6">
                    From initial due diligence to ongoing compliance and support, we provide end-to-end services that cover all aspects of your business operations.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Proven Track Record</h3>
                  <p className="text-lg text-scout-text-muted">
                    Successfully supported numerous international companies in establishing and operating their defence partnerships in Ukraine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-scout-text-muted mb-8">
                Contact us to discuss your legal, financing, or consulting needs and learn how we can support your business operations in Ukraine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-8 py-4">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/activities/defence-security">
                  <Button size="lg" variant="outline" className="border-scout-border text-scout-text-white hover:bg-scout-card-bg px-8 py-4">
                    Defence & Security Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
