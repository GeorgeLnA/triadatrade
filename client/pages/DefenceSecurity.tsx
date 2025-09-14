import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DefenceSecurity() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8">
                Defence & Security
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted leading-relaxed">
                Facilitating defence-industry cooperation between Ukraine and Western allies through comprehensive support services and strategic partnerships.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* OTR Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                    Office of Trade Representatives (OTR)
                  </h2>
                  <p className="text-lg text-scout-text-muted mb-8">
                    Our comprehensive OTR services provide expert guidance through complex bureaucratic processes while leveraging our established network for maximum impact.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Key Functions</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Identify local partners</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Technology testing & validation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Liaison with authorities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Establish production facilities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Manage projects under aid programmes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Benefits Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                OTR Benefits
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Expert Guidance</h3>
                  <p className="text-scout-text-muted">Navigate complex bureaucratic processes with our experienced team's guidance.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Established Network</h3>
                  <p className="text-scout-text-muted">Leverage our deep connections across public and private stakeholders.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Strategic Communications</h3>
                  <p className="text-scout-text-muted">Effective communication strategies for maximum impact and visibility.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Scalable Engagement</h3>
                  <p className="text-scout-text-muted">Flexible engagement models that grow with your needs.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Focus on Core Work</h3>
                  <p className="text-scout-text-muted">Concentrate on your core competencies while we handle the complexities.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4">Cost Efficiency</h3>
                  <p className="text-scout-text-muted">Lower initial and operational costs through our streamlined processes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Export Agency Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                    Triada Export Agency
                  </h2>
                  <p className="text-lg text-scout-text-muted mb-8">
                    Present Ukrainian defence companies and technology in global markets while building strategic partnerships and recognition through joint ventures.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Present Ukrainian defence companies and technology in global markets</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Build partnerships and recognition</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Emphasis on joint products/joint ventures under allied material/technical assistance frameworks</span>
                    </li>
                  </ul>
                </div>
                
                <div className="order-1 md:order-2">
                  <div className="bg-scout-dark border border-scout-border rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-scout-text-white mb-6">Global Reach</h3>
                    <p className="text-scout-text-muted mb-6">
                      Our export agency connects Ukrainian defence capabilities with international markets, creating opportunities for growth and collaboration.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-scout-green rounded-full mr-3" />
                        <span className="text-scout-text-white">International market access</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-scout-green rounded-full mr-3" />
                        <span className="text-scout-text-white">Strategic partnership development</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-scout-green rounded-full mr-3" />
                        <span className="text-scout-text-white">Joint venture facilitation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Training & Support Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8">
                  Training, System Integration & Technical Support
                </h2>
                <p className="text-lg text-scout-text-muted max-w-3xl mx-auto">
                  Collaboration with veterans and active combatants to provide comprehensive training, system integration, and technical support services.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Training Services</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Onboarding programs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Specialized workshops</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">E-learning platforms</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">System Integration</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Coordinated testing</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Detailed reports</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Proof-of-concept development</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6">Technical Support</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Help desk services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">System monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted">Maintenance & backups</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6 max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold text-scout-text-white mb-2">Operations Contact</h3>
                  <p className="text-scout-text-muted">
                    <strong>Oleg Pryimenko</strong> — Chief of Operations / UAV testing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Value Path Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center">
                Navigating Defense Opportunities
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2">Identify Partners</h3>
                  <p className="text-sm text-scout-text-muted">UAVs, AFVs, EW, etc.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2">Technology Testing</h3>
                  <p className="text-sm text-scout-text-muted">Engineering teams, reports, PoC</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2">Establish Production</h3>
                  <p className="text-sm text-scout-text-muted">Localisation, due diligence, legal support</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">4</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2">Liaise with Authorities</h3>
                  <p className="text-sm text-scout-text-muted">Official interactions</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">5</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2">Secure Orders</h3>
                  <p className="text-sm text-scout-text-muted">Ramstein coalitions, TFK, FMF/FMS</p>
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
                Ready to Partner with Us?
              </h2>
              <p className="text-lg text-scout-text-muted mb-8">
                Contact us to learn more about our defence and security services and how we can support your initiatives in Ukraine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-8 py-4">
                    Get in Touch
                  </Button>
                </Link>
                <Link to="/activities/legal-financing">
                  <Button size="lg" variant="outline" className="border-scout-border text-scout-text-white hover:bg-scout-card-bg px-8 py-4">
                    Legal & Financing Services
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
