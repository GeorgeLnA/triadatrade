"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { cn } from "@/lib/utils";

type IpadGlobeWrapperProps = {
  className?: string;
};

export function IpadGlobeWrapper({ className }: IpadGlobeWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const globeProgress = useMotionValue(0);

  const [isMobile, setIsMobile] = React.useState(false);
  const [ipadComplete, setIpadComplete] = React.useState(false);
  const [globeProgressValue, setGlobeProgressValue] = React.useState(0);
  const [globeComplete, setGlobeComplete] = React.useState(false);
  const [lockedCardPosition, setLockedCardPosition] = React.useState<{ top: number; left: number } | null>(null);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const lockedScrollPositionRef = useRef<number>(0);
  const finalScrollPositionRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const lastTouchYRef = useRef<number>(0);
  const lastGlobeProgressRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);

  // Use motion values for locked transforms (defined early so they can be used in useEffect)
  const lockedRotate = useMotionValue(0);
  const lockedScale = useMotionValue(isMobile ? 0.88 : 0.97);
  const lockedTranslateY = useMotionValue(-100);
  const lockedGlobeTranslateX = useMotionValue(-190);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  React.useEffect(() => {
    const updateProgress = () => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Track the vertical center of the component
      const elementCenter = rect.top + rect.height / 2;

      // Define the window in which the iPad animation should occur
      const startY = viewportHeight * 0.95; // starts near bottom of viewport
      const endY = viewportHeight * 0.68; // ends earlier before reaching center

      const range = startY - endY || 1;
      const raw = (startY - elementCenter) / range;
      const clamped = Math.min(1, Math.max(0, raw));

      // Lock progress at 1 when iPad completes
      if (ipadComplete) {
        progress.set(1);
      } else {
        progress.set(clamped);
        // Check if iPad animation is complete
        if (clamped >= 1 && !ipadComplete) {
          // STEP 1: Capture Card's actual visual center position FIRST
          // This must be done while Card is still in normal flow
          let cardCenterY = window.innerHeight / 2; // Default to viewport center
          let cardCenterX = window.innerWidth / 2; // Default to viewport center
          
          // Get the Card's current visual position in the viewport (viewport coordinates)
          if (cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            // Calculate the visual center point - this is what we want to preserve
            cardCenterY = cardRect.top + (cardRect.height / 2);
            cardCenterX = cardRect.left + (cardRect.width / 2);
          } else if (containerRef.current) {
            // Fallback: use container to estimate Card position
            const containerRect = containerRef.current.getBoundingClientRect();
            cardCenterY = containerRect.top + (containerRect.height / 2);
            cardCenterX = containerRect.left + (containerRect.width / 2);
          }
          
          // Adjust horizontal position slightly to the left to correct X offset
          // User feedback: Y is perfect, X needs to move left a bit
          // Adjust this value to fine-tune the horizontal position
          const horizontalOffset = -80; // Negative moves left, positive moves right
          const adjustedCenterX = cardCenterX + horizontalOffset;
          
          // Store the Card's center position (viewport coordinates) in state
          // Using state ensures Card component re-renders with correct position
          setLockedCardPosition({ top: cardCenterY, left: adjustedCenterX });
          
          // STEP 2: Capture scroll position
          const lockScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
          lockedScrollPositionRef.current = lockScrollY;
          
          // STEP 3: Set locked transform values
          lockedRotate.set(0);
          lockedScale.set(isMobile ? 0.88 : 0.97);
          lockedTranslateY.set(-100);
          lockedGlobeTranslateX.set(-190);
          
          // STEP 4: Set transitioning state FIRST - this hides Card via style prop
          setIsTransitioning(true);
          
          // STEP 5: Apply body lock IMMEDIATELY
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
          document.body.style.top = `-${lockScrollY}px`;
          document.body.style.left = '0';
          document.body.style.right = '0';
          document.body.style.transition = 'none';
          
          // STEP 6: Wait ONE frame for Card to be hidden, THEN set to fixed
          // This ensures Card is hidden before it becomes fixed
          requestAnimationFrame(() => {
            setIpadComplete(true);
            // Wait for Card to be positioned at fixed location
            requestAnimationFrame(() => {
              // Then fade in smoothly
              setIsTransitioning(false);
            });
          });
        }
      }

      // Globe scroll animation starts after iPad finishes
      // Progress is now controlled by wheel/touch events when locked
      if (ipadComplete && !globeComplete) {
        // Globe progress is handled by wheel/touch event handlers
        // Just ensure it doesn't reset
      } else if (ipadComplete && globeComplete) {
        // Globe animation complete, allow normal scrolling
        globeProgress.set(1);
      } else if (!ipadComplete) {
        // Before iPad completes, reset globe progress
        globeProgress.set(0);
      }
    };

    updateProgress();
    
    // Only listen to scroll if not locked (when locked, wheel events handle it)
    if (!(ipadComplete && !globeComplete)) {
      window.addEventListener("scroll", updateProgress, { passive: true });
    }
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [progress, globeProgress, ipadComplete, globeComplete, isMobile, lockedRotate, lockedScale, lockedTranslateY, lockedGlobeTranslateX]);

  // Update locked scale when mobile state changes
  React.useEffect(() => {
    if (!ipadComplete) {
      lockedScale.set(isMobile ? 0.88 : 0.97);
    }
  }, [isMobile, ipadComplete, lockedScale]);

  // Prevent scrolling when iPad is locked and globe is animating
  React.useEffect(() => {
    if (ipadComplete && !globeComplete) {
      // Body lock should already be applied when ipadComplete becomes true
      // Verify it's correctly applied and maintain scroll position
      const lockScrollY = lockedScrollPositionRef.current;
      
      if (lockScrollY !== undefined && lockScrollY >= 0) {
        // Ensure body lock is maintained
        if (document.body.style.position !== 'fixed') {
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
          document.body.style.top = `-${lockScrollY}px`;
          document.body.style.left = '0';
          document.body.style.right = '0';
          document.body.style.transition = 'none';
        } else {
          // Verify the lock position is correct
          const currentTop = document.body.style.top;
          const expectedTop = `-${lockScrollY}px`;
          if (currentTop !== expectedTop) {
            document.body.style.top = expectedTop;
          }
        }
      }
      
      // Verify Card position after lock - ensure it hasn't shifted
      // This check runs after Card becomes fixed
      if (cardRef.current && lockedCardPosition) {
        requestAnimationFrame(() => {
          if (cardRef.current && lockedCardPosition) {
            const cardRect = cardRef.current.getBoundingClientRect();
            const currentCenterY = cardRect.top + (cardRect.height / 2);
            const expectedCenterY = lockedCardPosition.top;
            const positionDiff = Math.abs(currentCenterY - expectedCenterY);
            
            // If Card shifted by more than 2px, adjust position
            if (positionDiff > 2) {
              // Update state to correct the position
              setLockedCardPosition({
                top: lockedCardPosition.top + (expectedCenterY - currentCenterY),
                left: lockedCardPosition.left
              });
            }
          }
        });
      }
      
      // Initialize progress ref
      lastGlobeProgressRef.current = globeProgress.get();
      isUpdatingRef.current = false;
      
      const handleTouchStart = (e: TouchEvent) => {
        if (ipadComplete && !globeComplete && e.touches.length > 0) {
          touchStartYRef.current = e.touches[0].clientY;
          lastTouchYRef.current = e.touches[0].clientY;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (ipadComplete && !globeComplete && e.touches.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          
          const currentY = e.touches[0].clientY;
          const delta = lastTouchYRef.current - currentY;
          lastTouchYRef.current = currentY;
          
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const totalScrollNeeded = viewportHeight * 2;
          // Apply smoothing to touch input - more responsive but still smooth
          const smoothedDelta = delta * 0.5;
          const deltaProgress = smoothedDelta / totalScrollNeeded;
          
          if (!isUpdatingRef.current) {
            isUpdatingRef.current = true;
            requestAnimationFrame(() => {
              lastGlobeProgressRef.current = globeProgress.get();
              // Direct update with minimal smoothing for responsiveness
              const targetProgress = Math.min(1, Math.max(0, lastGlobeProgressRef.current + deltaProgress));
              globeProgress.set(targetProgress);
              lastGlobeProgressRef.current = targetProgress;
              isUpdatingRef.current = false;
              
              if (targetProgress >= 1 && !globeComplete) {
                setGlobeComplete(true);
              }
            });
          }
        }
      };

      const preventScroll = (e: WheelEvent) => {
        if (ipadComplete && !globeComplete) {
          e.preventDefault();
          e.stopPropagation();
          
          // Convert wheel delta to globe progress
          const delta = e.deltaY;
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const totalScrollNeeded = viewportHeight * 2;
          // Apply smoothing to wheel input - responsive but smooth
          const smoothedDelta = delta * 0.3;
          const deltaProgress = smoothedDelta / totalScrollNeeded;
          
          if (!isUpdatingRef.current) {
            isUpdatingRef.current = true;
            requestAnimationFrame(() => {
              lastGlobeProgressRef.current = globeProgress.get();
              // Direct update for immediate responsiveness
              const targetProgress = Math.min(1, Math.max(0, lastGlobeProgressRef.current + deltaProgress));
              globeProgress.set(targetProgress);
              lastGlobeProgressRef.current = targetProgress;
              isUpdatingRef.current = false;
              
              if (targetProgress >= 1 && !globeComplete) {
                setGlobeComplete(true);
              }
            });
          }
        }
      };

      const preventKeyboardScroll = (e: KeyboardEvent) => {
        if (ipadComplete && !globeComplete) {
          if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'].includes(e.key)) {
            e.preventDefault();
            
            let delta = 0;
            if (e.key === 'ArrowDown' || e.key === 'PageDown') delta = 80;
            else if (e.key === 'ArrowUp' || e.key === 'PageUp') delta = -80;
            else if (e.key === 'Space' && !e.shiftKey) delta = 400;
            else if (e.key === 'Space' && e.shiftKey) delta = -400;
            
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const totalScrollNeeded = viewportHeight * 2;
            const deltaProgress = delta / totalScrollNeeded;
            
            const currentGlobeProgress = globeProgress.get();
            const newGlobeProgress = Math.min(1, Math.max(0, currentGlobeProgress + deltaProgress));
            globeProgress.set(newGlobeProgress);
            
            if (newGlobeProgress >= 1 && !globeComplete) {
              setGlobeComplete(true);
            }
          }
        }
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('keydown', preventKeyboardScroll);

      return () => {
        // Cleanup event listeners only
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('keydown', preventKeyboardScroll);
      };
    }
  }, [ipadComplete, globeComplete, globeProgress]);

  // Handle scroll unlock when globe animation completes
  React.useEffect(() => {
    if (globeComplete && ipadComplete) {
      // Calculate final scroll position based on how much user scrolled during globe interaction
      // During globe interaction, user effectively scrolled: viewportHeight * 2
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollDistanceDuringGlobe = viewportHeight * 2;
      const finalScrollY = lockedScrollPositionRef.current + scrollDistanceDuringGlobe;
      finalScrollPositionRef.current = finalScrollY;
      
      // Unlock scroll smoothly
      requestAnimationFrame(() => {
        // Remove fixed positioning
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.transition = '';
        document.body.style.willChange = '';
        
        // Scroll to final position (where user would be after globe interaction)
        requestAnimationFrame(() => {
          window.scrollTo({
            top: finalScrollY,
            behavior: 'auto'
          });
        });
      });
    } else if (!ipadComplete && document.body.style.position === 'fixed') {
      // Cleanup: If lock is removed while not complete, restore to locked position
      const scrollY = lockedScrollPositionRef.current;
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.transition = '';
      document.body.style.willChange = '';
      window.scrollTo({
        top: scrollY,
        behavior: 'auto'
      });
    }
  }, [globeComplete, ipadComplete]);

  // Sync globe progress motion value with state
  React.useEffect(() => {
    const unsubscribe = globeProgress.on("change", (latest) => {
      setGlobeProgressValue(latest);
    });
    return () => unsubscribe();
  }, [globeProgress]);

  const scaleDimensions = React.useMemo(
    () => (isMobile ? [0.68, 0.88] : [1.03, 0.97]),
    [isMobile]
  );

  // Animate transforms, then lock when complete
  const rotate = useTransform(progress, [0, 1], [20, 0]);
  const scale = useTransform(progress, [0, 1], scaleDimensions);
  const translateY = useTransform(progress, [0, 1], [0, -100]);
  const globeTranslateX = useTransform(progress, [0, 1], [0, -190]);

  // Use locked values when complete, otherwise use animated values
  const finalRotate = ipadComplete ? lockedRotate : rotate;
  const finalScale = ipadComplete ? lockedScale : scale;
  const finalTranslateY = ipadComplete ? lockedTranslateY : translateY;
  const finalGlobeTranslateX = ipadComplete ? lockedGlobeTranslateX : globeTranslateX;

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20",
        className
      )}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        {/* Globe temporarily hidden */}
        {false && (
          <Card 
            ref={cardRef}
            rotate={finalRotate} 
            translateY={finalTranslateY} 
            scale={finalScale}
            isLocked={ipadComplete && !globeComplete}
            lockedPosition={lockedCardPosition}
            isTransitioning={isTransitioning}
          >
            <motion.div style={{ translateX: finalGlobeTranslateX }} className="h-full w-full">
              <RotatingEarth
                width={650}
                height={650}
                className="h-full w-full max-w-none"
                scrollActive={ipadComplete}
                scrollProgress={globeProgressValue}
                postSequenceSpinSpeed={0}
              />
            </motion.div>
          </Card>
        )}
      </div>
    </div>
  );
}

const Card = React.forwardRef<HTMLDivElement, {
  rotate: any;
  scale: any;
  translateY: any;
  isLocked?: boolean;
  lockedPosition?: { top: number; left: number } | null;
  isTransitioning?: boolean;
  children: React.ReactNode;
}>(({
  rotate,
  scale,
  translateY,
  isLocked,
  lockedPosition,
  isTransitioning,
  children,
}, ref) => {
  // Use locked position if available, otherwise default to center
  const topValue = isLocked && lockedPosition 
    ? `${lockedPosition.top}px` 
    : isLocked 
    ? '50%' 
    : undefined;
  const leftValue = isLocked && lockedPosition 
    ? `${lockedPosition.left}px` 
    : isLocked 
    ? '50%' 
    : undefined;
  const xValue = isLocked && lockedPosition 
    ? '-50%' 
    : isLocked 
    ? '-50%' 
    : undefined;
  const yValue = isLocked && lockedPosition 
    ? '-50%' 
    : isLocked 
    ? '-50%' 
    : undefined;

  // Simple visibility control: hide during transition, show when locked
  const opacity = isTransitioning ? 0 : 1;
  const visibility = isTransitioning ? ('hidden' as const) : ('visible' as const);
  // Instant hide, smooth show
  const transition = isTransitioning 
    ? 'opacity 0s, visibility 0s' 
    : isLocked
    ? 'opacity 0.3s ease-out' 
    : undefined;

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rotate,
        scale,
        translateY: isLocked ? undefined : translateY,
        position: isLocked ? ('fixed' as const) : ('relative' as const),
        top: topValue,
        left: leftValue,
        x: xValue,
        y: yValue,
        opacity,
        visibility,
        transition,
        zIndex: isLocked ? 9999 : undefined,
        pointerEvents: isTransitioning ? 'none' : undefined,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-[0.5px] border-white p-[3px] md:p-2 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-[28px] border border-scout-border/40 bg-[#050612] p-2 md:rounded-[29px] md:p-3">
        {children}
      </div>
    </motion.div>
  );
});

Card.displayName = "Card";


