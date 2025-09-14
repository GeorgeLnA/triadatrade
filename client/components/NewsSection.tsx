export default function NewsSection() {
  const newsItems = [
    {
      date: "04/16/2025",
      source: "Axios",
      title: "Exclusive: Silicon Valley startup breaks cover with plans for\nrobo-armies"
    },
    {
      date: "04/16/2025",
      source: "Newswire",
      title: "Scout AI Emerges from Stealth with $15M Seed Round,\nLands 2 DoD Contracts, and Unveils Fury – Robotic\nFoundation Model for Defense"
    }
  ];

  return (
    <section className="relative w-full min-h-[800px] bg-scout-dark overflow-x-hidden">
      <div className="container mx-auto h-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 section-padding">
          {/* Left content */}
          <div>
            {/* Header */}
            <h3 className="text-caption text-scout-text-secondary mb-12">
              Latest News
            </h3>

            {/* Main heading */}
            <h2 className="text-heading-2 md:text-heading-1 text-scout-text-primary font-normal mb-16">
              Advancing the Mission
            </h2>

            {/* See More link */}
            <a 
              href="#" 
              className="flex items-center gap-6 group hover:gap-8 transition-all duration-200"
            >
              <span className="text-caption text-scout-text-white group-hover:text-scout-green transition-colors">
                See More
              </span>
              <div className="w-10 h-10 border-2 border-scout-button-bg rounded-lg flex items-center justify-center group-hover:border-scout-green transition-all duration-200 group-hover:scale-105">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-scout-text-white group-hover:text-scout-green transition-colors">
                  <path d="M14.8586 14.8571V1.14286H2.39186" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M1.14062 14.8571L14.8556 1.14286" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </a>
          </div>

          {/* Right content - News listings */}
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block group hover:bg-scout-card-bg/20 transition-all duration-200 rounded-lg p-6 -m-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-body text-scout-text-secondary mb-4">
                      {item.date} _ {item.source}
                    </p>
                    <h4 className="text-heading-3 text-scout-text-primary font-normal group-hover:text-scout-green transition-colors whitespace-pre-line">
                      {item.title}
                    </h4>
                  </div>
                  <div className="w-10 h-10 border-2 border-scout-button-bg rounded-lg flex items-center justify-center group-hover:border-scout-green transition-all duration-200 group-hover:scale-105 ml-8 flex-shrink-0">
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
