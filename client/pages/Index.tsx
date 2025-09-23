import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import ActivitiesOverviewSection from "@/components/ActivitiesOverviewSection";
import OurCoverageSection from "@/components/OurCoverageSection";
import ServicesOverviewSection from "@/components/ServicesOverviewSection";
import PartnersPreviewSection from "@/components/PartnersPreviewSection";
import TeamPreviewSection from "@/components/TeamPreviewSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import NewsPreviewSection from "@/components/NewsPreviewSection";
import ContactCTASection from "@/components/ContactCTASection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="w-full min-h-screen bg-scout-dark text-scout-text-primary">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content */}
      <main className="w-full pt-[72px]">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Quote Section */}
        <QuoteSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Who We Are Section */}
        <WhoWeAreSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Vision & Mission Section */}
        <VisionMissionSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Activities Overview Section */}
        <ActivitiesOverviewSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Our Coverage Section */}
        <OurCoverageSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Services Overview Section */}
        <ServicesOverviewSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Partners Preview Section */}
        <PartnersPreviewSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Team Preview Section */}
        <TeamPreviewSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Success Stories Section */}
        <SuccessStoriesSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* News Preview Section */}
        <NewsPreviewSection />
        
        {/* Section Separator */}
        <div className="w-full h-px bg-scout-border" />
        
        {/* Contact CTA Section */}
        <ContactCTASection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
