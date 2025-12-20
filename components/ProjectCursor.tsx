import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ProjectCursorProps {
  activeImage: string | null;
  isVisible: boolean;
}

const ProjectCursor: React.FC<ProjectCursorProps> = ({ activeImage, isVisible }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Setup mouse tracking
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickTo for performant mouse tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Handle visibility and scaling
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isVisible && activeImage) {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isVisible, activeImage]);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-[400px] h-[500px] pointer-events-none z-50 mix-blend-normal overflow-hidden hidden md:block"
      style={{ 
        transform: 'translate(-50%, -50%) scale(0)', 
        opacity: 0 
      }}
    >
      <div className="w-full h-full bg-gray-200">
         {/* We use an img tag but handle the src update in the parent or simple re-render here. 
             Since React re-renders when activeImage changes, this updates correctly. */}
         {activeImage && (
            <img 
              src={activeImage} 
              alt="Project Preview" 
              className="w-full h-full object-cover"
            />
         )}
      </div>
    </div>
  );
};

export default ProjectCursor;