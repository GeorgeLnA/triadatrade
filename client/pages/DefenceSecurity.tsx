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
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8 font-teko">
                DEFENCE & SECURITY
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted font-metropolis leading-relaxed font-metropolis">
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
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
                    OFFICE OF TRADE REPRESENTATIVES (OTR)
                  </h2>
                  <p className="text-lg text-scout-text-muted font-metropolis mb-8">
                    Our comprehensive OTR services provide expert guidance through complex bureaucratic processes while leveraging our established network for maximum impact.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">KEY FUNCTIONS</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Identify local partners</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Technology testing & validation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Liaison with authorities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Establish production facilities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Manage projects under aid programmes</span>
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
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                OTR BENEFITS
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">EXPERT GUIDANCE</h3>
                  <p className="text-scout-text-muted font-metropolis">Navigate complex bureaucratic processes with our experienced team's guidance.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">ESTABLISHED NETWORK</h3>
                  <p className="text-scout-text-muted font-metropolis">Leverage our deep connections across public and private stakeholders.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">STRATEGIC COMMUNICATIONS</h3>
                  <p className="text-scout-text-muted font-metropolis">Effective communication strategies for maximum impact and visibility.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">SCALABLE ENGAGEMENT</h3>
                  <p className="text-scout-text-muted font-metropolis">Flexible engagement models that grow with your needs.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">FOCUS ON CORE WORK</h3>
                  <p className="text-scout-text-muted font-metropolis">Concentrate on your core competencies while we handle the complexities.</p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">COST EFFICIENCY</h3>
                  <p className="text-scout-text-muted font-metropolis">Lower initial and operational costs through our streamlined processes.</p>
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
                  <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
                    TRIADA EXPORT AGENCY
                  </h2>
                  <p className="text-lg text-scout-text-muted font-metropolis mb-8">
                    Present Ukrainian defence companies and technology in global markets while building strategic partnerships and recognition through joint ventures.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Present Ukrainian defence companies and technology in global markets</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Build partnerships and recognition</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Emphasis on joint products/joint ventures under allied material/technical assistance frameworks</span>
                    </li>
                  </ul>
                </div>
                
                <div className="order-1 md:order-2">
                  <div className="bg-scout-dark border border-scout-border rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">GLOBAL REACH</h3>
                    <p className="text-scout-text-muted font-metropolis mb-6">
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
                <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
                  TRAINING, SYSTEM INTEGRATION & TECHNICAL SUPPORT
                </h2>
                <p className="text-lg text-scout-text-muted font-metropolis max-w-3xl mx-auto">
                  Collaboration with veterans and active combatants to provide comprehensive training, system integration, and technical support services.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">TRAINING SERVICES</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Onboarding programs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Specialized workshops</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">E-learning platforms</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">SYSTEM INTEGRATION</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Coordinated testing</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Detailed reports</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Proof-of-concept development</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-6 font-teko">TECHNICAL SUPPORT</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Help desk services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">System monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                      <span className="text-scout-text-muted font-metropolis">Maintenance & backups</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-6 max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold text-scout-text-white mb-2 font-teko">OPERATIONS CONTACT</h3>
                  <p className="text-scout-text-muted font-metropolis">
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
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                NAVIGATING DEFENSE OPPORTUNITIES
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2 font-teko">IDENTIFY PARTNERS</h3>
                  <p className="text-sm text-scout-text-muted font-metropolis">UAVs, AFVs, EW, etc.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2 font-teko">TECHNOLOGY TESTING</h3>
                  <p className="text-sm text-scout-text-muted font-metropolis">Engineering teams, reports, PoC</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2 font-teko">ESTABLISH PRODUCTION</h3>
                  <p className="text-sm text-scout-text-muted font-metropolis">Localisation, due diligence, legal support</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">4</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2 font-teko">LIAISE WITH AUTHORITIES</h3>
                  <p className="text-sm text-scout-text-muted font-metropolis">Official interactions</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scout-dark">5</span>
                  </div>
                  <h3 className="text-lg font-bold text-scout-text-white mb-2 font-teko">SECURE ORDERS</h3>
                  <p className="text-sm text-scout-text-muted font-metropolis">Ramstein coalitions, TFK, FMF/FMS</p>
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
                READY TO PARTNER WITH US?
              </h2>
              <p className="text-lg text-scout-text-muted font-metropolis mb-8">
                Contact us to learn more about our defence and security services and how we can support your initiatives in Ukraine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-8 py-4 font-teko">
                    GET IN TOUCH
                  </Button>
                </Link>
                <Link to="/activities/legal-financing">
                  <Button size="lg" variant="outline" className="border-scout-border text-scout-text-white hover:bg-scout-card-bg px-8 py-4 font-teko">
                    LEGAL & FINANCING SERVICES
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







