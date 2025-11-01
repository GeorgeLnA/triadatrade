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
import NotFound from "./pages/NotFound";
// import CursorDemo from "./components/CursorDemo"; // Removed in production
import ScrollRuler from "./components/ScrollRuler";
import TargetCursor from "./components/TargetCursor";

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

// Component to handle initial scroll position and block scrolling during loading
function ScrollToTop({ isMainPage = false }: { isMainPage?: boolean }) {
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
    
    // Only block scrolling on main page (loading animation duration)
    if (isMainPage) {
      const preventScroll = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      // Add scroll blocking to multiple elements
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Add event listeners to prevent scrolling
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('keydown', (e) => {
        if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault();
        }
      });
      
      // Force scroll to top after a brief delay to override any restoration
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
      
      // Re-enable scrolling after 3 seconds
      const enableScrollTimer = setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
      }, 3000);
      
      // Cleanup function
      return () => {
        clearTimeout(enableScrollTimer);
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
      };
    }
  }, [isMainPage]);

  return null;
}

const App = () => {
  const [heroAnimationsComplete, setHeroAnimationsComplete] = useState(false);

  useEffect(() => {
    // Hide cursor via JavaScript
    document.documentElement.style.cursor = 'none';
  }, []);

  return (
    <LoadingContext.Provider value={{ heroAnimationsComplete, setHeroAnimationsComplete }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* Only show custom cursor after hero animations complete */}
          {heroAnimationsComplete && (
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
              <ScrollToTop isMainPage={true} />
              <Index />
            </>
          } />
          <Route path="/activities" element={
            <>
              <ScrollToTop isMainPage={false} />
              <Activities />
            </>
          } />
          {/* Demo route removed for production cleanup */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={
            <>
              <ScrollToTop isMainPage={false} />
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
