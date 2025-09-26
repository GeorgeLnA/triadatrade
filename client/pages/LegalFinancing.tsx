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
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8 font-teko">
                LEGAL, FINANCING & CONSULTING
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted font-metropolis leading-relaxed">
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
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
                    PRESS & CONSULTING
                  </h2>
                  <p className="text-lg text-scout-text-muted font-metropolis mb-8">
                    Our analytical team provides comprehensive market insights, weekly digests, analytical reports, and OSINT analysis covering security, economy, internal politics, and geopolitics.
                  </p>
                  
                  <div className="bg-scout-dark border border-scout-border rounded-lg p-6">
                    <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">TEAM LEAD</h3>
                    <p className="text-scout-text-muted font-metropolis">
                      <strong>Bohdan Popov</strong> — Head of Analytical Department
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">OUR SERVICES</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Market insights and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Weekly digests and reports</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">OSINT analysis and monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Security and geopolitical analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Economic and political intelligence</span>
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
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                LEGAL & FINANCING SERVICES
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">COUNTERPARTY VERIFICATION & RISK MANAGEMENT</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Reputation and financial checks</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Legal and tax risk assessment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Affiliation and sanctions screening</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">LEGAL SUPPORT & DOCUMENT LEGALIZATION</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Notarisation services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Professional translations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Apostille and consular services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Documents for international use</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">CONTROLLED FOREIGN COMPANIES (CFCS)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Structuring review and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Tax planning strategies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Authority interactions and compliance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">INTELLECTUAL PROPERTY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Uniqueness checks and validation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Trademark and patent registration</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">IP protection and portfolio management</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">INTERNATIONAL BANKING OPERATIONS</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Document and accounting support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Crypto wallet and payments setup</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Financial instruments guidance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">OSINT & OPEN-SOURCE ANALYSIS</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Data collection and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Comprehensive reporting</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Continuous monitoring</span>
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
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                WHY CHOOSE OUR SERVICES?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">EXPERT TEAM</h3>
                  <p className="text-lg text-scout-text-muted font-metropolis mb-6">
                    Our team of practitioners brings deep expertise across security, economy, internal politics, and geopolitics, ensuring comprehensive analysis and support.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">LOCAL KNOWLEDGE</h3>
                  <p className="text-lg text-scout-text-muted font-metropolis">
                    Deep understanding of Ukrainian business environment, regulatory framework, and cultural nuances that impact international partnerships.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">COMPREHENSIVE SUPPORT</h3>
                  <p className="text-lg text-scout-text-muted font-metropolis mb-6">
                    From initial due diligence to ongoing compliance and support, we provide end-to-end services that cover all aspects of your business operations.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">PROVEN TRACK RECORD</h3>
                  <p className="text-lg text-scout-text-muted font-metropolis">
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
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
                READY TO GET STARTED?
              </h2>
              <p className="text-lg text-scout-text-muted font-metropolis mb-8">
                Contact us to discuss your legal, financing, or consulting needs and learn how we can support your business operations in Ukraine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-8 py-4 font-teko">
                    CONTACT US
                  </Button>
                </Link>
                <Link to="/activities/defence-security">
                  <Button size="lg" variant="outline" className="border-scout-border text-scout-text-white hover:bg-scout-card-bg px-8 py-4 font-teko">
                    DEFENCE & SECURITY SERVICES
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







