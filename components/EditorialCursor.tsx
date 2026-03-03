import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EditorialCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickTo for smooth mouse tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.8, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      // Ensure it's visible on first move if it's not already
      if (gsap.getProperty(cursor, "opacity") === 0) {
        gsap.to(cursor, { opacity: 1, duration: 0.5 });
      }
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.5 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.5 });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none z-[40] hidden md:block opacity-0"
      style={{ 
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(255, 230, 0, 0.12) 0%, rgba(255, 230, 0, 0.04) 40%, transparent 75%)',
        filter: 'blur(60px)',
        mixBlendMode: 'multiply'
      }}
    />
  );
};

export default EditorialCursor;
