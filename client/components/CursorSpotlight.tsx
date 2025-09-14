import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      // Damping effect - smooth movement towards target
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      spotlight.style.left = `${currentX}px`;
      spotlight.style.top = `${currentY}px`;
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseEnter = () => {
      spotlight.style.opacity = '1';
      animate(); // Start animation loop
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed pointer-events-none z-0 transition-opacity duration-300"
      style={{
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        opacity: '0',
        mixBlendMode: 'screen'
      }}
    />
  );
}
