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
    title: "Ukraine's message to Europe: You are under threat from Russia. We can help",
    date: "September 24, 2025 4:16 PM",
    image: "/GettyImages-2235058210-2.webp",
    link: "https://kyivindependent.com/ukraines-message-to-europe-you-are-under-threat-from-russia-we-can-help/"
  },
  {
    title: "Exclusive: Europe scrambles for Ukrainian interceptor drones after Russia's attack on Poland",
    date: "September 11, 2025 7:22 PM",
    image: "/IMG_9390_2025-07-09-1.webp",
    link: "https://kyivindependent.com/europe-scrambles-for-ukrainian-interceptor-drones-following-russias-polish-attack/"
  },
  {
    title: "Co-founder and Commercial Director of Triada Trade Partners LLC, an agency that represents international businesses in Ukraine",
    date: "December 2024",
    image: "/jo7ptj---c1x1x50px50p--b7e9f1bfb8d91ad320150f8bf8e06747.webp",
    link: "https://rates.fm/ua-uk/authors/nikitin-marsel/"
  },
];

export default function Index() {
  const [showWaves, setShowWaves] = useState(true); // Start visible during loading
  const [scrollStarted, setScrollStarted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const partnersSectionRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const whoWeAreSectionRef = useRef<HTMLDivElement>(null);
  const { setHeroAnimationsComplete } = useLoading();

  useEffect(() => {
    // Lock scrolling during loading
    const lockScroll = () => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };

    // Lock scroll immediately on mount
    lockScroll();

    // Hide waves when hero video appears (after loading animation)
    const hideWavesTimer = setTimeout(() => {
      setShowWaves(false);
      setHeroAnimationsComplete(true); // Enable custom cursor after hero animations complete
      unlockScroll(); // Unlock scrolling when hero video appears
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
      unlockScroll(); // Cleanup: unlock scroll on unmount
    };
  }, []);

  // Use IntersectionObserver to show and control background video only while the mission statement section is in view
  useEffect(() => {
    const target = videoSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          setShowVideo(isIntersecting);

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
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
        rootMargin: '0px'
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const shouldShowWaves = showWaves || scrollStarted;

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


        {/* Mission Statement Section (Video Parallax) - Transparent for video visibility */}
        <section ref={videoSectionRef} className="w-full py-12 sm:py-16 md:py-24 lg:py-32 xl:py-48 bg-transparent relative px-4 sm:px-6" style={{ pointerEvents: 'auto' }}>
          <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-12 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="bg-[#050612]/80 backdrop-blur-md border border-gray-400/30 rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 shadow-2xl">
                  <p className="text-scout-text-white font-teko text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-relaxed">
                    Our mission is to ensure that Ukraine and its partners gain not merely weapons, but a decisive technological edge — and that every creator or investor in military technology has a powerful ally at their side — technically, strategically, and corporately.
                  </p>
                </div>
              </motion.div>
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
