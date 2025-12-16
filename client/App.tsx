import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState, createContext, useContext } from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Activities from "./pages/Activities";
import TermsOfService from "./pages/TermsOfService";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ScrollRuler from "./components/ScrollRuler";
import TargetCursor from "./components/TargetCursor";
import { useIsMobile } from "@/hooks/use-mobile";

// Context for managing loading states across the app
interface LoadingContextType {
  heroAnimationsComplete: boolean;
  setHeroAnimationsComplete: (complete: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  heroAnimationsComplete: false,
  setHeroAnimationsComplete: () => {},
});

export const useLoading = () => useContext(LoadingContext);

const queryClient = new QueryClient();

// Component to handle initial scroll position
function ScrollToTop() {
  useEffect(() => {
    // Set initial scroll position to top without animation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Also set it immediately to prevent any flash
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}

const App = () => {
  const [heroAnimationsComplete, setHeroAnimationsComplete] = useState(false);
  const isMobile = useIsMobile();

  // Ensure scroll is at top on page load/reload
  useEffect(() => {
    // Set scroll to top immediately on mount/reload
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Also handle beforeunload to ensure clean state
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Hide cursor via JavaScript
    const root = document.documentElement;
    const isTouchDevice =
      (typeof window !== 'undefined' && 'ontouchstart' in window) ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
      (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches);

    if (isTouchDevice) {
      root.style.cursor = 'auto';
      return () => {
        root.style.cursor = '';
      };
    }

    root.style.cursor = 'none';

    return () => {
      root.style.cursor = '';
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ heroAnimationsComplete, setHeroAnimationsComplete }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* Only show custom cursor after hero animations complete */}
          {heroAnimationsComplete && !isMobile && (
            <TargetCursor 
              targetSelector="button, a, [role='button'], img[alt*='logo' i], .logo, [data-logo='true'], .cursor-target, .scroll-ruler"
              spinDuration={4}
              hideDefaultCursor={true}
            />
          )}
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
          <Route path="/" element={
            <>
              <ScrollToTop />
              <Index />
            </>
          } />
          <Route path="/activities" element={
            <>
              <ScrollToTop />
              <Activities />
            </>
          } />
          <Route path="/terms-of-service" element={
            <>
              <ScrollToTop />
              <TermsOfService />
            </>
          } />
          <Route path="/admin" element={
            <>
              <ScrollToTop />
              <Admin />
            </>
          } />
          <Route path="*" element={
            <>
              <ScrollToTop />
              <NotFound />
            </>
          } />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </LoadingContext.Provider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
