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
import { useState, useEffect, useRef } from "react";
import { useLoading } from "@/App";

// Sample blog timeline data
const blogTimelineData: TimelineEntry[] = [
  {
    title: "The Evolution of FPV Drones in Ukraine: Progress, Innovations, and New Challenges",
    date: "June 17, 2024",
    description: "In recent years, Ukraine has witnessed an impressive evolution of unmanned aerial vehicle technologies, particularly FPV (First Person View) drones. This comprehensive analysis explores the progress made, innovative applications, and emerging challenges in this critical defense technology sector.",
    image: "/TT logo.png"
  },
  {
    title: "Geopolitical Changes and Military Aid in 2025",
    date: "April 7, 2024",
    description: "As we approach 2025, the geopolitical landscape is undergoing significant transformations that are reshaping the dynamics of military aid. Our analysis examines how these changes impact defense partnerships and strategic cooperation between nations.",
    image: "/TT logo.png"
  },
  {
    title: "Navigating the Future of Foreign Military Sales: Insights and Expectations",
    date: "January 22, 2024",
    description: "As a businessman and an emerging military journalist with a keen interest in defense policy and strategic consulting, I'm eager to delve into the complex landscape of foreign military sales and their implications for international defense cooperation.",
    image: "/TT logo.png"
  },
];

export default function Index() {
  const [showWaves, setShowWaves] = useState(true); // Start visible during loading
  const [scrollStarted, setScrollStarted] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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

    // Track scroll to fade in waves and show footer
    const handleScroll = () => {
      if (window.scrollY > 300) { // Start fading in after scrolling 300px
        setScrollStarted(true);
      } else {
        setScrollStarted(false);
      }
      
      // Show footer after scrolling past partners section using intersection observer
      if (partnersSectionRef.current) {
        const rect = partnersSectionRef.current.getBoundingClientRect();
        const isPastPartners = rect.bottom < 0; // Section is completely above viewport
        setShowFooter(isPastPartners);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(hideWavesTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Use IntersectionObserver to show and control background video only while the transparent diagram section is in view
  useEffect(() => {
    const target = videoSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((e) => e.isIntersecting);
        setShowVideo(isIntersecting);
        
        // Control video play/pause based on visibility
        if (videoRef.current) {
          if (isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      },
      {
        root: null,
        threshold: 0, // fire as soon as any pixel is visible
        rootMargin: '0px'
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);
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
      
      {/* Main Content - Scrolls over hero and video, then reveals footer */}
      <main 
        className="relative w-full z-20 transition-all duration-500"
        style={{
          marginBottom: showFooter ? '0' : '0'
        }}
      >
        {/* Particle Waves Background - Fixed for entire main content */}
        <div 
          className={`fixed inset-0 z-5 pointer-events-none transition-opacity duration-[3000ms] ease-in-out ${
            (showWaves || scrollStarted) ? 'opacity-100' : 'opacity-0'
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
        <div className="h-screen" />

            {/* Who We Are Section - Dark blue background */}
            <div id="who-we-are" ref={whoWeAreSectionRef} style={{backgroundColor: '#050612'}}>
              <WhoWeAreSection />
            </div>

        {/* Defence Programs Section - Black background */}
        <div style={{backgroundColor: '#050612'}}>
          <DefenceProgramsSection />
        </div>

        {/* Our Coverage (Globe) moved to Activities page */}


        {/* Invisible Diagram Section (Video Parallax) - Transparent for video visibility */}
        <section ref={videoSectionRef} className="w-full py-20 sm:py-32 md:py-48 lg:py-80 bg-transparent relative">
          {/* Text Content - Responsive Layout */}
          <div className="absolute inset-0 flex items-center z-10 px-4 sm:px-6 md:px-12 lg:pl-28">
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-scout-text-primary font-normal font-teko leading-tight">
                We combine strategic advisory expertise with deep Ukrainian defense sector networks to facilitate international partnerships, technology transfer, and comprehensive support for defense industry collaboration.
              </p>
            </div>
          </div>

          {/* Graphic Diagram Overlay - Responsive Layout */}
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end z-10 px-4 sm:px-6 md:px-12 lg:pr-28">
            <div className="bg-transparent backdrop-blur-sm border-2 border-scout-green/30 rounded-xl p-4 sm:p-6 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] shadow-2xl relative">
              {/* Minimalist Flow Indicators */}
              <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                {/* Subtle flow dots */}
                <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-scout-text-muted/30 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-scout-text-muted/30 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-scout-text-muted/30 rounded-full transform -translate-x-1/2"></div>
                
                {/* Connecting flow lines - very subtle */}
                <div className="absolute top-1/4 left-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-scout-text-muted/20 to-transparent transform -translate-x-1/2"></div>
              </div>

              {/* SERVICES Section - Responsive */}
              <div className="mb-6 sm:mb-8 relative" style={{ zIndex: 2 }}>
                <h3 className="text-scout-text-white text-sm sm:text-base md:text-lg font-bold font-teko mb-4 sm:mb-6 text-center">SERVICES</h3>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {/* Export Agency */}
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4 group relative">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-scout-green/20 border-2 border-scout-green rounded-xl flex items-center justify-center group-hover:bg-scout-green/30 transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-scout-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <p className="text-scout-text-white font-metropolis text-xs sm:text-sm font-medium leading-tight">EXPORT<br />AGENCY</p>
                    {/* Flow indicator */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-3 sm:h-4 bg-gradient-to-b from-scout-green/40 to-transparent"></div>
                  </div>
                  
                  {/* Legal & Financing */}
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4 group relative">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-scout-green/20 border-2 border-scout-green rounded-xl flex items-center justify-center group-hover:bg-scout-green/30 transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-scout-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-scout-text-white font-metropolis text-xs sm:text-sm font-medium leading-tight">LEGAL &<br />FINANCING</p>
                    {/* Flow indicator */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-3 sm:h-4 bg-gradient-to-b from-scout-green/40 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Strategic Advisory - Central Hub - Responsive */}
              <div className="mb-6 sm:mb-8 text-center relative" style={{ zIndex: 2 }}>
                <div className="bg-gradient-to-r from-scout-green to-scout-green/80 text-scout-dark px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl border-2 border-scout-green shadow-2xl relative group">
                  <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 -right-1 sm:-right-2 -bottom-1 sm:-bottom-2 bg-scout-green/10 rounded-xl sm:rounded-2xl blur-md group-hover:bg-scout-green/20 transition-all duration-500"></div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-teko relative">STRATEGIC ADVISORY</h3>
                  {/* Flow indicators to deliverables */}
                  <div className="absolute -bottom-2 sm:-bottom-3 left-1/4 w-0.5 h-4 sm:h-6 bg-gradient-to-b from-scout-green/40 to-transparent transform -translate-x-1/2"></div>
                  <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 w-0.5 h-4 sm:h-6 bg-gradient-to-b from-scout-green/40 to-transparent transform -translate-x-1/2"></div>
                  <div className="absolute -bottom-2 sm:-bottom-3 left-3/4 w-0.5 h-4 sm:h-6 bg-gradient-to-b from-scout-green/40 to-transparent transform -translate-x-1/2"></div>
                </div>
              </div>

              {/* DELIVERABLES Section - Responsive */}
              <div className="relative" style={{ zIndex: 2 }}>
                <h3 className="text-scout-text-white text-sm sm:text-base md:text-lg font-bold font-teko mb-4 sm:mb-6 text-center">DELIVERABLES</h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {/* Partnerships */}
                    <div className="text-center group relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-scout-green/20 border-2 border-scout-green rounded-xl flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:bg-scout-green/30 group-hover:scale-105 transition-all duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-scout-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="text-scout-text-white font-teko font-bold text-xs sm:text-sm mb-1 sm:mb-2">PARTNERSHIPS</p>
                      <div className="text-scout-text-muted font-metropolis text-[10px] sm:text-xs space-y-0.5 sm:space-y-1">
                        <p>NETWORK</p>
                        <p>CONNECTIONS</p>
                        <p>COLLABORATION</p>
                      </div>
                    </div>

                    {/* Technology */}
                    <div className="text-center group relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-scout-green/20 border-2 border-scout-green rounded-xl flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:bg-scout-green/30 group-hover:scale-105 transition-all duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-scout-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-scout-text-white font-teko font-bold text-xs sm:text-sm mb-1 sm:mb-2">TECHNOLOGY</p>
                      <div className="text-scout-text-muted font-metropolis text-[10px] sm:text-xs space-y-0.5 sm:space-y-1">
                        <p>TRANSFER</p>
                        <p>VALIDATION</p>
                        <p>INTEGRATION</p>
                      </div>
                    </div>

                    {/* Support */}
                    <div className="text-center group relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-scout-green/20 border-2 border-scout-green rounded-xl flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:bg-scout-green/30 group-hover:scale-105 transition-all duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-scout-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                        </svg>
                      </div>
                      <p className="text-scout-text-white font-teko font-bold text-xs sm:text-sm mb-1 sm:mb-2">SUPPORT</p>
                      <div className="text-scout-text-muted font-metropolis text-[10px] sm:text-xs space-y-0.5 sm:space-y-1">
                        <p>TRAINING</p>
                        <p>GUIDANCE</p>
                        <p>ANALYSIS</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Invisible content for spacing */}
            </div>
          </div>
        </section>
        
        {/* Quote Section - Black background */}
        <div style={{backgroundColor: '#050612'}}>
          <QuoteSection />
        </div>

        {/* Quote Section 2 - Black background */}
        <div style={{backgroundColor: '#050612'}}>
          <QuoteSection2 />
        </div>

        {/* Quote Section 3 - Black background */}
        <div style={{backgroundColor: '#050612'}}>
          <QuoteSection3 />
        </div>


        {/* Trusted By Industry Leaders (Partners) - Black background */}
        <div id="partners" ref={partnersSectionRef} style={{backgroundColor: '#050612'}}>
          <PartnersPreviewSection />
        </div>

        {/* Strategic Defence Stakeholders - Black background */}
        <div style={{backgroundColor: '#050612'}}>
          <StrategicStakeholdersSection />
        </div>

        {/* Meet Our Team - Black background */}
        <div id="team" style={{backgroundColor: '#050612'}}>
          <TeamPreviewSection />
        </div>

        {/* Blog Timeline Section - Black background */}
        <div id="contact" style={{backgroundColor: '#050612'}}>
          <BlogTimeline data={blogTimelineData} />
        </div>

        {/* Simple sticky curtain that makes the blog appear to uncover the footer */}
        <div
          aria-hidden="true"
          className="sticky bottom-0 z-10 pointer-events-none"
          style={{
            height: '40vh',
            backgroundColor: '#050612'
          }}
        />
      </main>

      {/* Footer - Normal flow, fully clickable, not covered */}
      <Footer />
    </div>
  );
}
