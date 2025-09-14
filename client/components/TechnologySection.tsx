export default function TechnologySection() {
  const features = [
    "Collaborative Autonomy with Natural Language",
    "Intelligent Autonomy at the Edge",
    "Platform-Agnostic AI for Any Robotic System",
    "Lightweight & Scalable Hardware Integration",
    "Vision-Based Passive Sensing",
    "Self-Improving at the Tactical Edge"
  ];

  return (
    <section className="relative w-full min-h-[900px] bg-scout-dark overflow-x-hidden">
      <div className="container mx-auto h-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 section-padding">
          {/* Left content */}
          <div className="max-w-[755px]">
            {/* Header */}
            <h3 className="text-caption text-scout-text-secondary mb-12">
              Our Technology
            </h3>

            {/* Main heading */}
            <h2 className="text-heading-2 md:text-heading-1 text-scout-text-primary font-normal mb-16">
              <span className="block">Fury is a Collaborative Mission Partner for</span>
              <span className="block">Defense Robots</span>
            </h2>

            {/* Video container */}
            <div className="relative w-full h-[480px] rounded-xl overflow-hidden bg-gradient-to-br from-scout-border to-scout-card-bg shadow-xl">
              {/* Video placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-body-large text-scout-text-secondary">
                  Mission Partner Technology Demo
                </div>
              </div>

              {/* Grid overlay - improved alignment */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 12 }, (_, i) => (
                  <div 
                    key={i} 
                    className="absolute top-0 bottom-0 w-[116px] border-r border-scout-border/20" 
                    style={{ left: `${i * 116 + 32}px` }}
                  />
                ))}
              </div>

              {/* Mission dialog overlay */}
              <div className="absolute bottom-8 right-8 w-[420px] h-[180px] rounded-lg border border-scout-border bg-scout-card-bg/80 backdrop-blur-md p-6 shadow-lg">
                <div className="space-y-6">
                  {/* Warfighter section */}
                  <div>
                    <div className="text-caption text-scout-text-secondary mb-2">Warfighter</div>
                    <div className="text-body text-scout-text-primary">
                      G01, fix enemy forces along route
                    </div>
                    <div className="text-body-large text-scout-text-primary">
                      Tango
                    </div>
                  </div>

                  {/* Fury response */}
                  <div>
                    <div className="text-caption text-scout-text-secondary mb-2">Fury G01</div>
                    <div className="text-body text-scout-green">
                      Roger. Moving out. 12 minutes to
                    </div>
                    <div className="text-body-large text-scout-green">
                      Tango
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Features list */}
          <div className="pt-20">
            <div className="space-y-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="flex-1">
                    <h4 className="text-heading-3 text-scout-text-primary font-normal">
                      {feature}
                    </h4>
                  </div>
                  <div className="w-10 h-10 border-2 border-scout-button-bg rounded-lg flex items-center justify-center hover:border-scout-green transition-colors">
                    <div className="w-4 h-0.5 bg-scout-text-primary" />
                    <div className="w-0.5 h-4 bg-scout-text-primary absolute" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
