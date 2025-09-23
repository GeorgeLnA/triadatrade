import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface ScrollRulerProps {
  rulerWidth?: number;
  markerSize?: number;
  showNumbers?: boolean;
  rulerColor?: string;
  markerColor?: string;
  backgroundColor?: string;
}

const ScrollRuler: React.FC<ScrollRulerProps> = ({
  rulerWidth = 40,
  markerSize = 8,
  showNumbers = true,
  rulerColor = '#B0B0B0',
  markerColor = '#B0B0B0',
  backgroundColor = 'rgba(0, 0, 0, 0.8)'
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const rulerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollProgress = () => {
      const headerHeight = 80; // Header height
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const adjustedScrollTop = Math.max(0, scrollTop - headerHeight);
      const adjustedScrollHeight = Math.max(0, scrollHeight - headerHeight);
      const progress = adjustedScrollHeight > 0 ? adjustedScrollTop / adjustedScrollHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    const handleScroll = () => {
      requestAnimationFrame(updateScrollProgress);
    };

    const handleResize = () => {
      updateScrollProgress();
    };

    // Initial calculation
    updateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!markerRef.current) return;

    const marker = markerRef.current;
    const rulerHeight = rulerRef.current?.offsetHeight || 0;
    // Ensure marker reaches exactly 100% at the bottom
    const markerPosition = scrollProgress * rulerHeight;

    gsap.to(marker, {
      y: markerPosition,
      duration: 0.1,
      ease: 'power2.out'
    });
  }, [scrollProgress, markerSize]);

  // Generate ruler marks - horizontal lines
  const generateRulerMarks = () => {
    const marks = [];
    const rulerHeight = 100; // 100% of ruler height (below header)
    const markInterval = 2; // Every 2% for closer spacing
    
    for (let i = 0; i <= rulerHeight; i += markInterval) {
      const isMajorMark = i % 20 === 0; // Major marks every 20%
      const isMinorMark = i % 10 === 0; // Minor marks every 10%
      const markLength = isMajorMark ? 12 : isMinorMark ? 8 : 4;
      const markOpacity = isMajorMark ? 1 : isMinorMark ? 0.7 : 0.3;
      const markHeight = isMajorMark ? 1.5 : 1;
      
      marks.push(
        <div
          key={i}
          className="absolute"
          style={{
            right: '8px',
            top: `${i}%`,
            width: `${markLength}px`,
            height: `${markHeight}px`,
            backgroundColor: rulerColor,
            opacity: markOpacity,
            transform: 'translateY(-50%)',
            borderRadius: '0.5px'
          }}
        />
      );
    }
    
    return marks;
  };

  // Generate numbers - only major marks
  const generateNumbers = () => {
    if (!showNumbers) return null;
    
    const numbers = [];
    const rulerHeight = 100; // 100% of ruler height (below header)
    const numberInterval = 20; // Every 20%
    
    for (let i = 0; i <= rulerHeight; i += numberInterval) {
      numbers.push(
        <div
          key={i}
          className="absolute font-mono"
          style={{
            right: '23px',
            top: `${i}%`,
            color: rulerColor,
            transform: 'translateY(-50%)',
            fontSize: '7px',
            fontWeight: '500',
            letterSpacing: '0.2px'
          }}
        >
          {i}
        </div>
      );
    }
    
    return numbers;
  };

  return (
    <div
      ref={rulerRef}
      className="fixed right-0 z-50 pointer-events-none hidden md:block"
      style={{
        width: `${rulerWidth}px`,
        top: '87px', // Moved up 1 more pixel from 88px
        height: 'calc(100vh - 137px)', // Adjusted height accordingly
        right: '0',
        pointerEvents: 'none',
        mixBlendMode: 'difference'
      }}
    >
      {/* Ruler marks */}
      <div className="relative w-full h-full" style={{ background: 'transparent' }}>
        {generateRulerMarks()}
        
        {/* Numbers */}
        {generateNumbers()}
        
        {/* Scroll progress marker - tick shape */}
        <div
          ref={markerRef}
          className="absolute"
          style={{
            right: '2px',
            width: `${markerSize * 1.5}px`,
            height: `${markerSize}px`,
            transform: 'translateY(-50%)',
            zIndex: 10
          }}
        >
          {/* Tick shape using CSS */}
          <div
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              width: '2px',
              height: `${markerSize}px`,
              backgroundColor: markerColor,
              transform: 'translateY(-50%)',
              boxShadow: `0 0 8px ${markerColor}60`,
              borderRadius: '1px'
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              width: `${markerSize * 0.6}px`,
              height: '2px',
              backgroundColor: markerColor,
              transform: 'translateY(-50%) translateX(-2px)',
              boxShadow: `0 0 8px ${markerColor}60`,
              borderRadius: '1px'
            }}
          />
        </div>
        
      </div>
      
      {/* Current position indicator - positioned under the ruler */}
      <div
        className="absolute font-mono"
        style={{
          top: 'calc(100% + 20px)', // Position further under the ruler
          right: 'calc(50% - 5px)',
          transform: 'translateX(50%)',
          color: markerColor,
          fontSize: '9px',
          fontWeight: '500',
          textShadow: `0 0 4px ${markerColor}40`
        }}
      >
        {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
};

export default ScrollRuler;









