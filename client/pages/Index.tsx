import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import QuoteSection2 from "@/components/QuoteSection2";
import QuoteSection3 from "@/components/QuoteSection3";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import DefenceProgramsSection from "@/components/DefenceProgramsSection";
import StrategicStakeholdersSection from "@/components/StrategicStakeholdersSection";
import OurCoverageSection from "@/components/OurCoverageSection";
import PartnersPreviewSection from "@/components/PartnersPreviewSection";
import TeamPreviewSection from "@/components/TeamPreviewSection";
import BlogTimeline, { TimelineEntry } from "@/components/BlogTimeline";
import Footer from "@/components/Footer";
import { ParticleWaves } from "@/components/ui/threejs-particles-waves";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLoading } from "@/App";

// Sample blog timeline data
const blogTimelineData: TimelineEntry[] = [
  {
    title: "The Evolution of FPV Drones in Ukraine: Progress, Innovations, and New Challenges",
    date: "June 17, 2024",
    image: "/TT logo.png"
  },
  {
    title: "Geopolitical Changes and Military Aid in 2025",
    date: "April 7, 2024",
    image: "/TT logo.png"
  },
  {
    title: "Navigating the Future of Foreign Military Sales: Insights and Expectations",
    date: "January 22, 2024",
    image: "/TT logo.png"
  },
];

export default function Index() {
  const [showWaves, setShowWaves] = useState(true); // Start visible during loading
  const [scrollStarted, setScrollStarted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [diagramInView, setDiagramInView] = useState(false);
  const [diagramStage, setDiagramStage] = useState(0);
  const partnersSectionRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const whoWeAreSectionRef = useRef<HTMLDivElement>(null);
  const { setHeroAnimationsComplete } = useLoading();

  useEffect(() => {
    // Hide waves when hero video appears (after loading animation)
    const hideWavesTimer = setTimeout(() => {
      setShowWaves(false);
      setHeroAnimationsComplete(true); // Enable custom cursor after hero animations complete
    }, 3000);

    // Track scroll to fade in waves
    const handleScroll = () => {
      if (window.scrollY > 300) { // Start fading in after scrolling 300px
        setScrollStarted(true);
      } else {
        setScrollStarted(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(hideWavesTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    if (diagramInView) {
      setDiagramStage(1);
      timers.push(
        setTimeout(() => setDiagramStage(2), 200),
        setTimeout(() => setDiagramStage(3), 450)
      );
    } else {
      setDiagramStage(0);
    }
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [diagramInView]);

  // Use IntersectionObserver to show and control background video only while the transparent diagram section is in view
  useEffect(() => {
    const target = videoSectionRef.current;
    if (!target) return;

    const thresholds = [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const ratio = entry.intersectionRatio;

          setShowVideo(isIntersecting);

          setDiagramInView((prev) => {
            if (ratio > 0.35) return true; // start hiding when roughly a third is visible
            if (ratio < 0.20) return false; // restore waves earlier as section leaves
            return prev;
          });

          if (videoRef.current) {
            if (isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        root: null,
        threshold: thresholds,
        rootMargin: '0px'
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const shouldShowWaves = !diagramInView && (showWaves || scrollStarted);

  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary">
      {/* Video Background - Controlled by Who We Are visibility */}
      <div className={`fixed inset-0 z-10 pointer-events-none transition-opacity duration-500 overflow-hidden ${showVideo ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-center"
          style={{ 
            objectPosition: 'center 20%',
            transform: 'scale(1)',
            transformOrigin: 'center center'
          }}
          muted
          loop
          playsInline
        >
          <source src="/enhancor-video.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Fixed Header */}
      <Header />
      
      {/* Hero Section - Fixed positioned for parallax effect */}
      <HeroSection isHidden={showVideo} />
      
      {/* Main Content - Scrolls over hero and video */}
      <main 
        className="relative w-full z-20"
        style={{ pointerEvents: 'none' }}
      >
        {/* Particle Waves Background - Fixed for entire main content */}
        <div 
          className={`fixed inset-0 z-5 pointer-events-none transition-opacity duration-[3000ms] ease-in-out ${
            shouldShowWaves ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ParticleWaves 
            className="w-full h-full"
            density={30}
            speed={0.08}
            amplitude={60}
            separation={180}
            particleColor="#ffffffff"
            bgColor="transparent"
            showControls={false}
          />
        </div>
        
        {/* Spacer to account for hero height */}
        <div className="h-screen pointer-events-none" />

            {/* Who We Are Section - Dark blue background */}
            <div id="who-we-are" ref={whoWeAreSectionRef} style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
              <WhoWeAreSection />
            </div>

        {/* Defence Programs Section - Black background */}
        <div style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
          <DefenceProgramsSection />
        </div>

        {/* Our Coverage (Globe) moved to Activities page */}


        {/* Invisible Diagram Section (Video Parallax) - Transparent for video visibility */}
        <section ref={videoSectionRef} className="w-full py-20 sm:py-32 md:py-48 lg:py-80 bg-transparent relative" style={{ pointerEvents: 'auto' }}>
          {/* Graphic Diagram Overlay - Responsive Layout */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={diagramStage >= 1 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="bg-transparent backdrop-blur-sm border-2 border-scout-green/30 rounded-xl p-4 sm:p-6 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] shadow-2xl relative"
              initial={{ opacity: 0, y: 30 }}
              animate={diagramStage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Minimalist Flow Indicators */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
                initial={{ opacity: 0 }}
                animate={diagramStage >= 2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Problem lines converging to Triada */}
                {[
                  { left: "30%", top: "26%", rotate: "28deg", delay: 0.18 },
                  { left: "70%", top: "26%", rotate: "-28deg", delay: 0.22 }
                ].map((line, idx) => (
                  <motion.div
                    key={`problem-line-${idx}`}
                    className="absolute bg-gradient-to-b from-scout-green via-scout-green/70 to-transparent"
                    style={{ width: "4px", height: "28%", left: line.left, top: line.top, transform: `translate(-50%, 0) rotate(${line.rotate})`, borderRadius: "999px" }}
                    initial={{ scaleY: 0 }}
                    animate={diagramStage >= 2 ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: line.delay }}
                  />
                ))}

                {/* Vertical connector from Triada to solutions */}
                <motion.div
                  className="absolute left-1/2 bg-gradient-to-b from-scout-green via-scout-green/80 to-transparent"
                  style={{ width: "4px", height: "26%", top: "54%", transform: "translateX(-50%)", borderRadius: "999px" }}
                  initial={{ scaleY: 0 }}
                  animate={diagramStage >= 3 ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                />

                {/* Split lines from vertical connector to solutions */}
                {[
                  { angle: -18, delay: 0.24 },
                  { angle: 0, delay: 0.28 },
                  { angle: 18, delay: 0.32 }
                ].map((line, idx) => (
                  <motion.div
                    key={`solution-line-${idx}`}
                    className="absolute bg-gradient-to-b from-transparent via-scout-green/70 to-scout-green/20"
                    style={{ width: "4px", height: "20%", left: "50%", top: "66%", transform: `translate(-50%, 0) rotate(${line.angle}deg)`, borderRadius: "999px" }}
                    initial={{ scaleY: 0 }}
                    animate={diagramStage >= 3 ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: line.delay }}
                  />
                ))}
              </motion.div>

              {/* Problem Stage */}
              <motion.div
                className="mb-6 sm:mb-8 relative"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, y: 16 }}
                animate={diagramStage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 className="text-scout-text-white text-sm sm:text-base md:text-lg font-bold font-teko mb-4 sm:mb-6 text-center">PROBLEMS</h3>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {[
                    {
                      title: ["PROBLEM", "ONE"],
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M8 14h8M6 6h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z" />
                      )
                    },
                    {
                      title: ["PROBLEM", "TWO"],
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.5 3a4.5 4.5 0 014.5 4.5v0a4.5 4.5 0 01-9 0v0a4.5 4.5 0 014.5-4.5zM3 17.25a11.94 11.94 0 0118 0M3 13a7.5 7.5 0 0112 0" />
                      )
                    }
                  ].map((problem, idx) => (
                    <motion.div
                      key={problem.title.join("-")}
                      className="flex flex-col items-center text-center space-y-2 sm:space-y-4 group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={diagramStage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 + idx * 0.1 }}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-scout-green/20 border-2 border-scout-green rounded-xl flex items-center justify-center group-hover:bg-scout-green/30 transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-scout-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {problem.icon}
                        </svg>
                      </div>
                      <p className="text-scout-text-white font-metropolis text-xs sm:text-sm font-medium leading-tight">
                        {problem.title.map((line) => (
                          <span key={line} className="block">{line}</span>
                        ))}
                      </p>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-3 sm:h-4 bg-gradient-to-b from-scout-green/40 to-transparent"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* TRIADA TRADE Hub */}
              <motion.div
                className="mb-6 sm:mb-8 text-center relative"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={diagramStage >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 16 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.18 }}
              >
                <div className="bg-gradient-to-r from-scout-green to-scout-green/80 text-scout-dark px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl border-2 border-scout-green shadow-2xl relative group">
                  <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 -right-1 sm:-right-2 -bottom-1 sm:-bottom-2 bg-scout-green/10 rounded-xl sm:rounded-2xl blur-md group-hover:bg-scout-green/20 transition-all duration-500"></div>
                  <motion.h3
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-teko relative"
                    initial={{ opacity: 0, y: 12 }}
                    animate={diagramStage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.28 }}
                  >
                    TRIADA TRADE
                  </motion.h3>
                  <div className="absolute -bottom-2 sm:-bottom-3 left-1/4 w-0.5 h-4 sm:h-6 bg-gradient-to-b from-scout-green/40 to-transparent transform -translate-x-1/2"></div>
                  <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 w-0.5 h-4 sm:h-6 bg-gradient-to-b from-scout-green/40 to-transparent transform -translate-x-1/2"></div>
                  <div className="absolute -bottom-2 sm:-bottom-3 left-3/4 w-0.5 h-4 sm:h-6 bg-gradient-to-b from-scout-green/40 to-transparent transform -translate-x-1/2"></div>
                </div>
              </motion.div>

              {/* Solutions Section - Responsive */}
              <motion.div
                className="relative"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, y: 30 }}
                animate={diagramStage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-scout-text-white text-sm sm:text-base md:text-lg font-bold font-teko mb-4 sm:mb-6 text-center">SOLUTIONS</h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {[
                    {
                      title: "SOLUTION 1",
                      items: ["NETWORK", "CONNECTIONS", "COLLABORATION"],
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 16l2 2 4-4m-7 7a9 9 0 110-18 9 9 0 010 18z" />
                      )
                    },
                    {
                      title: "SOLUTION 2",
                      items: ["TRANSFER", "VALIDATION", "INTEGRATION"],
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v8m4-4H8m12 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                      )
                    },
                    {
                      title: "SOLUTION 3",
                      items: ["TRAINING", "GUIDANCE", "ANALYSIS"],
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2h2m2-3a3 3 0 116 0v3H9V5z" />
                      )
                    }
                  ].map((solution, idx) => (
                    <motion.div
                      key={solution.title}
                      className="text-center group relative"
                      initial={{ opacity: 0, y: 24 }}
                      animate={diagramStage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 + idx * 0.12 }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-scout-green/20 border-2 border-scout-green rounded-xl flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:bg-scout-green/30 group-hover:scale-105 transition-all duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-scout-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {solution.icon}
                        </svg>
                      </div>
                      <p className="text-scout-text-white font-teko font-bold text-xs sm:text-sm mb-1 sm:mb-2">{solution.title}</p>
                      <div className="text-scout-text-muted font-metropolis text-[10px] sm:text-xs space-y-0.5 sm:space-y-1">
                        {solution.items.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Invisible content for spacing */}
            </div>
          </div>
        </section>
        
        {/* Quote Section - Black background */}
        <div style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
          <QuoteSection />
        </div>

        {/* Quote Section 2 - Black background */}
        <div style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
          <QuoteSection2 />
        </div>

        {/* Quote Section 3 - Black background */}
        <div style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
          <QuoteSection3 />
        </div>


        {/* Trusted By Industry Leaders (Partners) - Black background */}
        <div id="partners" ref={partnersSectionRef} style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
          <PartnersPreviewSection />
        </div>

        {/* Strategic Defence Stakeholders - Black background */}
        <div style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
          <StrategicStakeholdersSection />
        </div>

        {/* Meet Our Team - Black background */}
        <div id="team" style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
          <TeamPreviewSection />
        </div>

        {/* Blog Timeline Section - Black background */}
        <div id="contact" style={{backgroundColor: '#050612', pointerEvents: 'auto'}}>
          <BlogTimeline data={blogTimelineData} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
