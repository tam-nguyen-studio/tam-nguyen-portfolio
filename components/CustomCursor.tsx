import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad vs touch)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updatePointerType = () => setIsFinePointer(mediaQuery.matches);
    updatePointerType();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePointerType);
    } else {
      mediaQuery.addListener(updatePointerType);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updatePointerType);
      } else {
        mediaQuery.removeListener(updatePointerType);
      }
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer || shouldReduceMotion) {
      document.documentElement.classList.remove('custom-cursor-enabled');
      return;
    }

    document.documentElement.classList.add('custom-cursor-enabled');

    const isInteractive = (target: HTMLElement | null): boolean => {
      if (!target) return false;

      // Check for interactive tags, attributes, or classes
      const interactiveSelector = [
        'a',
        'button',
        'input',
        'select',
        'textarea',
        'label',
        '[role="button"]',
        '[role="link"]',
        '[tabindex]:not([tabindex="-1"])',
        '.cursor-pointer',
        '[onclick]'
      ].join(',');

      if (target.closest(interactiveSelector)) {
        return true;
      }

      // Check computed cursor style as fallback
      try {
        const computed = window.getComputedStyle(target);
        if (computed.cursor === 'pointer') return true;
      } catch {
        // ignore
      }

      return false;
    };

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, target } = e;

      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: clientX, y: clientY });
        setIsVisible(true);
        setIsHovered(isInteractive(target as HTMLElement));
      });
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, [isFinePointer, shouldReduceMotion]);

  if (!isFinePointer || shouldReduceMotion) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[999999] mix-blend-difference"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.15s ease-out',
      }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 bg-white"
        animate={{
          width: isHovered ? 24 : 10,
          height: isHovered ? 24 : 10,
          borderRadius: isHovered ? '50%' : '0px',
          scale: isMouseDown ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 28,
          mass: 0.5,
        }}
      />
    </div>
  );
};

export default CustomCursor;
