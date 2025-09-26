export default function VisionMissionSection() {
  return (
    <section className="w-full py-20 bg-scout-card-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-scout-text-white mb-6 font-teko text-center">
                VISION
              </h2>
              <p className="text-lg text-scout-text-muted leading-relaxed font-metropolis mb-8 text-center">
                We envision a future where Ukraine stands resilient and secure, with robust defense capabilities supported by a network of international alliances. By fostering private-public partnerships and facilitating defense cooperation agreements, we aim to create a fortified defense ecosystem that benefits both Ukraine and its global partners.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-scout-card-bg/50 border border-scout-border/30 p-4 text-center">
                  <span className="text-base text-scout-text-white font-teko">Stability & Balance</span>
                </div>
                <div className="bg-scout-card-bg/50 border border-scout-border/30 p-4 text-center">
                  <span className="text-base text-scout-text-white font-teko">Innovation</span>
                </div>
                <div className="bg-scout-card-bg/50 border border-scout-border/30 p-4 text-center">
                  <span className="text-base text-scout-text-white font-teko">Team & Partnership</span>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-scout-text-white mb-6 font-teko text-center">
                MISSION
              </h2>
              <p className="text-lg text-scout-text-muted leading-relaxed font-metropolis mb-8 text-center">
                Our mission is to attract new companies to collaborate with Ukraine, improve the effectiveness and outcomes of these partnerships, and enhance international defence cooperation between the Ministry of Defence of Ukraine, other components of the Security & Defence Forces of Ukraine, Ukrainian private defence companies and foreign partners.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-scout-card-bg/50 border border-scout-border/30 p-4 text-center">
                  <span className="text-base text-scout-text-white font-teko">Develop Strategies</span>
                </div>
                <div className="bg-scout-card-bg/50 border border-scout-border/30 p-4 text-center">
                  <span className="text-base text-scout-text-white font-teko">Implement Solutions</span>
                </div>
                <div className="bg-scout-card-bg/50 border border-scout-border/30 p-4 text-center">
                  <span className="text-base text-scout-text-white font-teko">Analyze</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}







