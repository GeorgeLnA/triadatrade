export default function VisionMissionSection() {
  return (
    <section className="w-full py-20 bg-scout-card-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-scout-text-white mb-6">
                Vision
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                  <p className="text-lg text-scout-text-muted">
                    A resilient, secure Ukraine supported by robust international alliances
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-scout-green rounded-full mt-3 mr-4 flex-shrink-0" />
                  <p className="text-lg text-scout-text-muted">
                    Private–public partnerships and defence cooperation that strengthen the wider ecosystem
                  </p>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-scout-text-white mb-6">
                Mission
              </h2>
              <p className="text-lg text-scout-text-muted leading-relaxed">
                Attract and enable foreign partners to collaborate with Ukraine's MoD, Security & Defence Forces, and private defence companies—improving outcomes through strategy, implementation, and analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
