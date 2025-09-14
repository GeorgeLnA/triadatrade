export default function CareersSection() {
  const jobs = [
    { title: "AI Engineer - Fury Team", location: "Sunnyvale, CA" },
    { title: "AI Engineer Intern - Fury Team (Fall 2025)", location: "Sunnyvale, CA" },
    { title: "AI Researcher - Fury Team", location: "Sunnyvale, CA" },
    { title: "AI Technician - Fury Team", location: "Sunnyvale, CA" },
    { title: "ATR Engineer", location: "Sunnyvale, CA" },
    { title: "Director of Business Development, Air Dominance", location: "Sunnyvale, CA" },
    { title: "Embedded Engineer", location: "Sunnyvale, CA" },
    { title: "Hardware Engineer", location: "Sunnyvale, CA" },
    { title: "Mission Operator", location: "Paso Robles, CA" },
    { title: "Robot Technician", location: "Sunnyvale, CA" },
    { title: "Senior Mission Operator", location: "Paso Robles, CA" },
    { title: "State Estimation Engineer", location: "Sunnyvale, CA" }
  ];

  return (
    <section className="relative w-full min-h-[900px] bg-scout-dark overflow-x-hidden">
      <div className="container mx-auto h-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 section-padding">
          {/* Left content */}
          <div className="max-w-[533px]">
            {/* Header */}
            <h3 className="text-caption text-scout-text-secondary mb-12">
              Careers
            </h3>

            {/* Main heading */}
            <h2 className="text-heading-2 md:text-heading-1 text-scout-text-primary font-normal">
              <span className="block">We're bringing together the</span>
              <span className="block">world's best engineers to</span>
              <span className="block">work on the world's most</span>
              <span className="block">important frontier</span>
            </h2>
          </div>

          {/* Right content - Job listings */}
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <a
                key={index}
                href="#"
                className="block w-full group hover:bg-scout-card-bg/20 transition-all duration-200 rounded-lg p-4 -m-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-heading-3 text-scout-text-primary font-normal group-hover:text-scout-green transition-colors mb-2">
                      {job.title}
                    </h4>
                    <p className="text-body text-scout-text-secondary">
                      {job.location}
                    </p>
                  </div>
                  <div className="w-10 h-10 border-2 border-scout-button-bg rounded-lg flex items-center justify-center group-hover:border-scout-green transition-all duration-200 group-hover:scale-105">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-scout-text-white group-hover:text-scout-green transition-colors">
                      <path d="M14.8586 14.8571V1.14286H2.39186" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M1.14062 14.8571L14.8556 1.14286" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
