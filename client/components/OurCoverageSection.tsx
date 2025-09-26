import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import GlobalCoverageSummary from "@/components/GlobalCoverageSummary";
import { useEffect, useRef, useState } from "react";

export default function OurCoverageSection() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isBefore, setIsBefore] = useState(true);
  const [isAfter, setIsAfter] = useState(false);
  const [pinLeft, setPinLeft] = useState(0);
  const [pinWidth, setPinWidth] = useState<number>(0);
  const [sidebarLeft, setSidebarLeft] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState<number>(0);
  const [lastRegion, setLastRegion] = useState<null | 'North America' | 'Europe' | 'Asia' | 'Oceania'>(null);
  const [showIntro, setShowIntro] = useState(true);

  // Derived phase for sidebar content
  // 8 segments: UA->NA, NA->UA, UA->EU, EU->UA, UA->ASIA, ASIA->UA, UA->OCE, OCE->UA
  const totalSegments = 8;
  // Keep normalized progress; control speed via section height
  const clamped = Math.max(0, Math.min(1, progress));
  const segmentLength = 1 / totalSegments;
  const segmentIndex = Math.min(totalSegments - 1, Math.floor(clamped / segmentLength));
  const rawTInSegment = (clamped - segmentIndex * segmentLength) / segmentLength;
  
  // Apply easing to sidebar content timing for smoother sync with camera and lines
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  const tInSegment = easeInOutCubic(rawTInSegment);
  // Phases that show content when lines are drawing: 0 (NA), 2 (EU), 4 (ASIA), 6 (OCE)
  // Keep showing region content during return journeys too (segments 1, 3, 5, 7)
  const regionMap: Record<number, 'North America' | 'Europe' | 'Asia' | 'Oceania' | null> = {
    0: 'North America',
    1: 'North America', // Keep showing during return
    2: 'Europe',
    3: 'Europe', // Keep showing during return
    4: 'Asia',
    5: 'Asia', // Keep showing during return
    6: 'Oceania',
    7: 'Oceania', // Keep showing during return
  };
  const regionPhase = regionMap[segmentIndex] || null;
  const showRegionContent = isPinned && !!regionPhase && tInSegment > 0 && tInSegment <= 1;

  // Intro text visibility: visible right when entering globe until first region content starts
  const showIntroNow = isPinned && !regionPhase && segmentIndex === 0 && tInSegment <= 0.001;

  // Track last active region to enable slide-out effect timing
  useEffect(() => {
    if (regionPhase) setLastRegion(regionPhase);
    if (showIntroNow) setShowIntro(true); else if (regionPhase) setShowIntro(false);
  }, [regionPhase, showIntroNow]);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const total = Math.max(1, rect.height - viewportH);

      const before = rect.top > 0;
      const after = rect.bottom <= viewportH;
      const within = rect.top <= 0 && rect.bottom > viewportH;

      setIsBefore(before && !within && !after);
      setIsAfter(after && !within);
      setIsPinned(within);

      // Track left/width so fixed overlay aligns with the grid column
      setPinLeft(rect.left);
      setPinWidth(rect.width);
      // Track sidebar rect too
      if (sidebarRef.current) {
        const srect = sidebarRef.current.getBoundingClientRect();
        setSidebarLeft(srect.left);
        setSidebarWidth(srect.width);
      }

      setScrollActive(within);

      let p = 0;
      if (within) {
        const scrolled = -rect.top;
        p = Math.min(1, Math.max(0, scrolled / total));
      } else if (after) {
        p = 1;
      } else {
        p = 0;
      }
      setProgress(p);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[800px] bg-scout-dark overflow-x-hidden">
      <div className="container mx-auto px-6 py-16" style={{ marginLeft: '43px', marginRight: '43px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Sticky Globe */}
          <div className="order-2 lg:order-1 lg:col-span-2 relative">
            {/* Set section height to sync animation end with section end */}
            <div ref={stickyRef} className="relative h-[900vh]">
              {/* Pinned container using fixed/absolute switching to avoid sticky issues in layered layout */}
              <div
                className="z-10 flex items-center justify-center"
                style={{
                  position: isPinned ? "fixed" as const : "absolute" as const,
                  top: isPinned ? "18px" : isAfter ? undefined : "18px",
                  bottom: isAfter ? 0 : undefined,
                  left: isPinned ? pinLeft : 0,
                  width: isPinned ? (pinWidth || "100%") : "100%",
                  height: "100vh",
                }}
             >
                <div className="w-full max-w-[800px] mx-auto">
                  <RotatingEarth
                    width={800}
                    height={800}
                    className="w-full h-auto"
                    scrollActive={scrollActive}
                    scrollProgress={progress}
                    postSequenceSpinSpeed={0}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content that scrolls next to sticky globe */}
          <div ref={sidebarRef} className="space-y-8 order-1 lg:order-2 relative z-10 lg:col-span-1 lg:-ml-48">
            {/* Fixed sidebar during globe pin */}
            <div
              style={{
                position: isPinned ? "fixed" as const : "relative" as const,
                top: isPinned ? 0 : undefined,
                left: isPinned ? sidebarLeft : undefined,
                width: isPinned ? (sidebarWidth || undefined) : undefined,
                height: isPinned ? "100vh" : undefined,
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <div className="relative w-full">
                {/* Intro card */}
                <div
                  className={`absolute inset-x-0 ${showIntroNow ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} transition-all duration-500`}
                  style={{ top: '50%', transform: 'translateY(-50%)', willChange: 'transform, opacity' }}
                >
                  <div className="bg-scout-card-bg/60 border border-scout-green/40 rounded-xl p-4 lg:p-6 backdrop-blur-sm max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-xl ml-2 lg:ml-8 xl:ml-16 2xl:ml-24">
                    <h3 className="text-scout-text-white text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-teko font-bold mb-2 leading-tight">TRIADA TRADE</h3>
                    <p className="text-scout-text-muted font-metropolis text-xs lg:text-base xl:text-lg">Global coverage overview</p>
                  </div>
                </div>

                {/* Region card */}
                <div
                  className={`absolute inset-x-0 ${showRegionContent ? 'opacity-100 translate-x-0' : lastRegion ? 'opacity-0 translate-x-8' : 'opacity-0 translate-x-8'} transition-all duration-500`}
                  style={{ top: '50%', transform: 'translateY(-50%)', willChange: 'transform, opacity' }}
                >
                  {regionPhase && (
                    <div className="bg-scout-card-bg/60 border border-scout-border rounded-xl p-4 lg:p-6 backdrop-blur-sm max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-xl ml-2 lg:ml-8 xl:ml-16 2xl:ml-24">
                      <h3 className="text-scout-text-white text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-teko font-bold mb-4 leading-tight">
                        OUR COVERAGE IN {regionPhase.toUpperCase()}
                      </h3>
                      {regionPhase === 'North America' && (
                        <ul className="list-disc list-inside text-scout-text-muted font-metropolis space-y-1 text-xs lg:text-base xl:text-lg">
                          <li><span className="text-scout-text-white">Canada</span>: Vancouver, Toronto</li>
                        </ul>
                      )}
                      {regionPhase === 'Europe' && (
                        <ul className="list-disc list-inside text-scout-text-muted font-metropolis space-y-1 text-xs lg:text-base xl:text-lg">
                          <li>UK: London</li>
                          <li>Norway: Oslo</li>
                          <li>France: Paris</li>
                          <li>Italy: Venice</li>
                          <li>Spain: Málaga</li>
                        </ul>
                      )}
                      {regionPhase === 'Asia' && (
                        <ul className="list-disc list-inside text-scout-text-muted font-metropolis space-y-1 text-xs lg:text-base xl:text-lg">
                          <li>China: Beijing</li>
                        </ul>
                      )}
                      {regionPhase === 'Oceania' && (
                        <ul className="list-disc list-inside text-scout-text-muted font-metropolis space-y-1 text-xs lg:text-base xl:text-lg">
                          <li>Australia: Brisbane</li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>


              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Global Coverage Summary - positioned under the globe */}
      <GlobalCoverageSummary />
    </section>
  );
}

// Export the main component
