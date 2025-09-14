import { useState } from "react";

export default function FurySection() {
  const [activeTab, setActiveTab] = useState("G01");

  const tabs = [
    { id: "G01", label: "G01", active: true },
    { id: "A01", label: "A01", active: false },
    { id: "N01", label: "N01", active: false },
  ];

  return (
    <section className="relative w-full min-h-[1200px] bg-scout-dark overflow-x-hidden">
      <div className="container mx-auto h-full">

        <div className="flex flex-col items-center pt-32">
          {/* Introducing label */}
          <h3 className="text-caption text-scout-text-secondary text-center mb-12">
            Introducing
          </h3>

          {/* FURY heading */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-baseline">
              <span className="text-scout-text-primary text-display-1 font-normal">
                FU
              </span>
              <span className="text-scout-text-primary text-display-1 font-normal ml-2">
                R
              </span>
              <span className="text-scout-text-primary text-display-1 font-normal ml-2">
                Y
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-body-large text-scout-text-primary text-center mb-20 max-w-[400px]">
            A first-of-its-kind foundation model<br />
            for multi-domain defense.
          </p>

          {/* Tab selector */}
          <div className="flex items-center mb-20">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`h-16 px-8 border-2 flex items-center justify-center transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-transparent border-scout-text-white text-scout-text-white"
                      : "bg-transparent border-scout-text-secondary text-scout-text-secondary hover:border-scout-text-muted hover:text-scout-text-muted"
                  } ${
                    index === 0 
                      ? "rounded-l-lg border-r-0" 
                      : index === tabs.length - 1 
                      ? "rounded-r-lg border-l-0" 
                      : "border-l-0 border-r-0"
                  }`}
                >
                  <span className="text-heading-3 font-normal">
                    {tab.label}
                  </span>
                </button>
                {index < tabs.length - 1 && (
                  <div className="w-0.5 h-16 bg-scout-text-secondary" />
                )}
              </div>
            ))}
          </div>

          {/* Tab description */}
          <p className="text-body text-scout-text-muted text-center mb-16">
            Unmanned Ground Vehicle with Physical AI
          </p>

          {/* Video container */}
          <div className="relative w-full max-w-[1400px] h-[720px] rounded-xl overflow-hidden shadow-2xl">
            {/* Video background placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-scout-border to-scout-card-bg flex items-center justify-center">
              <div className="text-body-large text-scout-text-secondary">
                FURY G01 Demonstration Video
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
          </div>
        </div>
      </div>

    </section>
  );
}
