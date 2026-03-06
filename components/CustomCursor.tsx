import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'pointer'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouch();
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isProject = target.closest('[data-cursor="view"]');
      const isPointer = target.closest('button, a, [role="button"], [data-cursor="pointer"]');
      
      if (isProject) {
        setCursorType('view');
      } else if (isPointer) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#fff',
    },
    pointer: {
      width: 32,
      height: 32,
      backgroundColor: '#fff',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: '#fff',
    }
  };

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-difference isolation-auto"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={cursorType}
      variants={variants}
      transition={{ duration: 0.1, ease: "linear" }}
    >
      {cursorType === 'view' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[10px] font-black uppercase tracking-widest text-black"
        >
          View
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
