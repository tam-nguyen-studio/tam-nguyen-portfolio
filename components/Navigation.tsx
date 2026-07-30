import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface NavProps {
  isProjectView: boolean;
  isAboutPage?: boolean;
  onBackHome: () => void;
  onSectionClick: (id: string) => void;
}

const Navigation: React.FC<NavProps> = ({ isProjectView, isAboutPage, onBackHome, onSectionClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const EASE = [0.22, 1, 0.36, 1];

  return (
    <motion.header 
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE, delay: 0 }}
      className="w-full z-[100] h-auto min-h-0 px-[18px] sm:px-[20px] py-[clamp(18px,1.5vw,28px)] flex items-center transition-colors duration-300"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Header Layout */}
        <nav aria-label="Main Navigation" className="grid grid-cols-[1fr_auto_1fr] items-center w-full font-serif text-[clamp(18px,1.5vw,26px)] tracking-normal uppercase text-black leading-none">
          {/* Left: ABOUT */}
          <div className="flex justify-start">
            <button
              onClick={() => onSectionClick('about')}
              className={`p-0 text-black leading-none translate-y-[-0.04em] hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isAboutPage ? "underline underline-offset-4 font-normal italic" : ""
              }`}
              aria-label="Navigate to About page"
            >
              ABOUT
            </button>
          </div>

          {/* Center: TAM NGUYEN */}
          <div className="flex justify-center">
            <button
              onClick={onBackHome}
              className="p-0 m-0 text-center font-serif font-normal text-[clamp(18px,1.5vw,26px)] leading-none translate-y-[-0.04em] tracking-normal uppercase text-black hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all duration-200 cursor-pointer whitespace-nowrap"
              aria-label="Navigate to Homepage"
            >
              TAM NGUYEN
            </button>
          </div>

          {/* Right: CONTACT */}
          <div className="flex justify-end">
            <button
              onClick={() => onSectionClick('contact')}
              className="p-0 text-black leading-none translate-y-[-0.04em] hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all duration-200 cursor-pointer whitespace-nowrap"
              aria-label="Scroll to Contact section"
            >
              CONTACT
            </button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navigation;
