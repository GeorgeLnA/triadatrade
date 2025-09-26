export default function GlobalCoverageSummary() {
  const coverageData = {
    'North America': ['Vancouver', 'Toronto'],
    'Europe': ['London', 'Oslo', 'Paris', 'Venice', 'Málaga'],
    'Asia': ['Beijing'],
    'Oceania': ['Brisbane']
  };

  return (
    <section className="relative w-full pt-0 pb-24 bg-transparent z-0">
      <div className="max-w-6xl mx-auto px-8">
        {/* Centered Header */}
        <div className="text-center mb-20">
          <h2 className="text-scout-text-white text-6xl font-teko font-bold mb-6 tracking-tight">
            GLOBAL COVERAGE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-scout-green to-transparent mx-auto mb-8"></div>
          <p className="text-scout-text-muted font-metropolis text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Strategic presence across key international markets
          </p>
        </div>

        {/* Single Row Layout */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center items-start gap-12">
            {Object.entries(coverageData).map(([continent, cities]) => (
              <div key={continent} className="text-center min-w-[200px]">
                {/* Continent Title */}
                <div className="mb-8">
                  <h3 className="text-scout-green text-2xl font-teko font-bold uppercase tracking-wider mb-3">
                    {continent}
                  </h3>
                  <div className="w-16 h-0.5 bg-scout-green mx-auto"></div>
                </div>

                {/* Cities Stack */}
                <div className="space-y-4">
                  {cities.map((city, index) => (
                    <div key={index} className="group relative text-scout-text-white font-metropolis text-lg font-medium bg-scout-card-bg/10 border border-scout-border/20 rounded-lg px-6 py-3 backdrop-blur-sm hover:border-scout-green/60 hover:bg-scout-card-bg/30 hover:scale-105 hover:shadow-lg hover:shadow-scout-green/20 transition-all duration-300 cursor-pointer">
                      <div className="relative z-10">
                        {city}
                      </div>
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-lg bg-scout-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Hover border glow */}
                      <div className="absolute inset-0 rounded-lg border border-scout-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Stats */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-12 bg-gradient-to-r from-scout-card-bg/5 to-scout-card-bg/10 border border-scout-border/20 rounded-2xl px-12 py-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-scout-green text-4xl font-teko font-bold mb-2">4</div>
              <div className="text-scout-text-muted font-metropolis text-sm uppercase tracking-wider font-medium">Continents</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-scout-border/40 to-transparent"></div>
            <div className="text-center">
              <div className="text-scout-green text-4xl font-teko font-bold mb-2">9</div>
              <div className="text-scout-text-muted font-metropolis text-sm uppercase tracking-wider font-medium">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
