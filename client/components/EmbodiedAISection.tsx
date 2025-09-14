export default function EmbodiedAISection() {
  return (
    <section className="relative w-full min-h-[900px] bg-scout-dark overflow-hidden overflow-x-hidden">
      {/* Background infographic */}
      <div className="absolute inset-0">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/509fb9d12b4a377082fe344ad7f75f228202a74d?width=2880" 
          alt="Embodied AI infographic" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* Grid system overlay - improved alignment */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }, (_, i) => (
            <div 
              key={i} 
              className="absolute top-0 bottom-0 w-[120px] border-r border-scout-border/10" 
              style={{ left: `${i * 120 + 32}px` }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto h-full flex flex-col justify-between py-20">

          {/* Header */}
          <div className="pt-8">
            <h3 className="text-caption text-scout-text-primary">
              What is embodied AI?
            </h3>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex items-center">
            <div className="max-w-[600px]">
              <div className="space-y-2">
                <p className="text-heading-3 text-scout-text-primary font-normal">
                  One to many human to robot coordination
                </p>
                <p className="text-heading-3 text-scout-text-primary font-normal">
                  requires human‑like intelligence ‑‑ VLA's
                </p>
                <p className="text-heading-3 text-scout-text-primary font-normal">
                  are trained on human imitation and
                </p>
                <p className="text-heading-3 text-scout-text-primary font-normal">
                  simulation data to connect vision and
                </p>
                <p className="text-heading-3 text-scout-text-primary font-normal">
                  language to real‑world robotic actions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
