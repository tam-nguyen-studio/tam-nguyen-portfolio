import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  
  const sizeSpring = useSpring(10, { stiffness: 400, damping: 30 });
  const opacitySpring = useSpring(1, { stiffness: 400, damping: 30 });

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
      const isInteractive = target.closest('button, a, [role="button"], [data-cursor="view"], .cursor-pointer, .project-card');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    sizeSpring.set(isHovered ? 40 : 10);
    opacitySpring.set(isHovered ? 0.5 : 1);
  }, [isHovered, sizeSpring, opacitySpring]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
        width: sizeSpring,
        height: sizeSpring,
        opacity: opacitySpring,
      }}
    />
  );
};

export default CustomCursor;
