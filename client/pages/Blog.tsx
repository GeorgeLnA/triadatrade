import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import BlogTimeline, { TimelineEntry } from "@/components/BlogTimeline";

export default function Blog() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary overflow-x-hidden">
      <Header />
      
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-scout-text-white mb-8 font-teko">
                BLOG
              </h1>
              <p className="text-xl md:text-2xl text-scout-text-muted leading-relaxed font-metropolis">
                Insights, analysis, and updates from the defence industry and our work in Ukraine.
              </p>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Blog Content Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
                  LATEST ARTICLES
                </h2>
                <p className="text-lg text-scout-text-muted max-w-3xl mx-auto font-metropolis">
                  Our articles are hosted on Medium, where we share insights on defence industry developments, 
                  market analysis, and our work facilitating partnerships in Ukraine.
                </p>
              </div>

              {/* Medium Integration */}
              <div className="bg-scout-dark border border-scout-border rounded-lg p-12 text-center">
                <div className="mb-8">
                  <svg className="w-16 h-16 text-scout-green mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">READ ON MEDIUM</h3>
                  <p className="text-scout-text-muted mb-8 font-metropolis">
                    Visit our Medium publication for the latest articles, analysis, and insights from our team.
                  </p>
                </div>
                
                <a 
                  href="https://medium.com/@triada-trade" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="lg" className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-8 py-4 font-teko">
                    VISIT OUR MEDIUM
                  </Button>
                </a>
              </div>

              {/* Timeline */}
              <div className="mt-16">
                <BlogTimeline data={sampleTimeline} />
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Topics Section */}
        <section className="w-full py-20 bg-scout-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-16 text-center font-teko">
                TOPICS WE COVER
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">DEFENCE INDUSTRY ANALYSIS</h3>
                  <p className="text-scout-text-muted font-metropolis">
                    In-depth analysis of defence industry trends, market developments, and strategic partnerships.
                  </p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">UKRAINE MARKET INSIGHTS</h3>
                  <p className="text-scout-text-muted font-metropolis">
                    Regular updates on the Ukrainian defence market, regulatory changes, and business opportunities.
                  </p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">PARTNERSHIP SUCCESS STORIES</h3>
                  <p className="text-scout-text-muted font-metropolis">
                    Case studies and success stories from our work facilitating international partnerships.
                  </p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">TECHNOLOGY UPDATES</h3>
                  <p className="text-scout-text-muted font-metropolis">
                    Latest developments in defence technology, UAV systems, and technical innovations.
                  </p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">LEGAL & REGULATORY</h3>
                  <p className="text-scout-text-muted font-metropolis">
                    Updates on legal frameworks, regulatory changes, and compliance requirements for international businesses.
                  </p>
                </div>
                
                <div className="bg-scout-card-bg border border-scout-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-scout-text-white mb-4 font-teko">OSINT ANALYSIS</h3>
                  <p className="text-scout-text-muted font-metropolis">
                    Open-source intelligence analysis and geopolitical insights relevant to the defence sector.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />

        {/* Newsletter Section */}
        <section className="w-full py-20 bg-scout-card-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
                STAY UPDATED
              </h2>
              <p className="text-lg text-scout-text-muted mb-8 font-metropolis">
                Subscribe to our newsletter for weekly digests, market insights, and the latest updates from our team.
              </p>
              
              <div className="bg-scout-dark border border-scout-border rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-scout-text-white mb-4 font-teko">WEEKLY DIGEST</h3>
                <p className="text-scout-text-muted mb-6 font-metropolis">
                  Get our weekly analysis of defence industry developments, market trends, and opportunities in Ukraine.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-scout-card-bg border border-scout-border rounded-lg text-scout-text-white placeholder-scout-text-muted focus:outline-none focus:ring-2 focus:ring-scout-green"
                  />
                  <Button className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-6 py-3 font-teko">
                    SUBSCRIBE
                  </Button>
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
              <h2 className="text-4xl md:text-5xl font-bold text-scout-text-white mb-8 font-teko">
                HAVE QUESTIONS?
              </h2>
              <p className="text-lg text-scout-text-muted mb-8 font-metropolis">
                Interested in learning more about our services or want to discuss a potential partnership?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
                  <Button size="lg" className="bg-scout-green hover:bg-scout-green/90 text-scout-dark font-semibold px-8 py-4 font-teko">
                    CONTACT US
                  </Button>
                </a>
                <a href="/activities/defence-security">
                  <Button size="lg" variant="outline" className="border-scout-border text-scout-text-white hover:bg-scout-card-bg px-8 py-4 font-teko">
                    OUR SERVICES
                  </Button>
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

// minimal timeline sample using existing assets
const sampleTimeline: TimelineEntry[] = [
  {
    title: "September 2025",
    content: (
      <div className="space-y-4">
        <div className="card overflow-hidden">
          <img src="/triada.jpg" alt="Update" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h4 className="font-teko text-xl text-scout-text-white mb-1">Operational Update</h4>
            <p className="text-scout-text-muted font-metropolis text-sm">
              Recent highlights and activities across our practice areas.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "August 2025",
    content: (
      <div className="space-y-4">
        <div className="card overflow-hidden">
          <img src="/TT logo.png" alt="Brand" className="w-full h-40 object-contain bg-scout-card-bg" />
          <div className="p-4">
            <h4 className="font-teko text-xl text-scout-text-white mb-1">Brief</h4>
            <p className="text-scout-text-muted font-metropolis text-sm">
              Notes on partnerships, technology and markets.
            </p>
          </div>
        </div>
      </div>
    ),
  },
]