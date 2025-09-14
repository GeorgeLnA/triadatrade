import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WhoWeAre from "./pages/WhoWeAre";
import VisionMission from "./pages/VisionMission";
import DefenceSecurity from "./pages/DefenceSecurity";
import LegalFinancing from "./pages/LegalFinancing";
import Partners from "./pages/Partners";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import TargetCursor from "./components/TargetCursor";
import CursorDemo from "./components/CursorDemo";
import ScrollRuler from "./components/ScrollRuler";
import CursorSpotlight from "./components/CursorSpotlight";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TargetCursor 
        targetSelector="button, a, [role='button'], img[alt*='logo' i], .logo, [data-logo='true'], .cursor-target"
        spinDuration={4}
        hideDefaultCursor={true}
      />
      <CursorSpotlight />
      <ScrollRuler 
        rulerWidth={50}
        markerSize={10}
        showNumbers={true}
        rulerColor="#B0B0B0"
        markerColor="#B0B0B0"
        backgroundColor="rgba(0, 0, 0, 0.8)"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/activities/defence-security" element={<DefenceSecurity />} />
          <Route path="/activities/legal-financing" element={<LegalFinancing />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cursor-demo" element={<CursorDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
