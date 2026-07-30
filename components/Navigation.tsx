import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface NavProps {
  isProjectView: boolean;
  isAboutPage?: boolean;
  onBackHome: () => void;
  onSectionClick: (id: string, event?: React.SyntheticEvent) => void;
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
      className="w-full z-[100] h-auto min-h-0 px-[18px] sm:px-[20px] pt-[18px] pb-[18px] md:pt-[22px] md:pb-[22px] transition-colors duration-300 leading-none"
      style={{ height: 'auto', minHeight: 0, lineHeight: 1 }}
    >
      <div className="w-full max-w-[1440px] mx-auto h-auto min-h-0">
        {/* Header Layout */}
        <nav 
          aria-label="Main Navigation" 
          className="grid grid-cols-[1fr_auto_1fr] items-center w-full font-serif text-[clamp(15px,4.2vw,17px)] md:text-[clamp(21px,2.8vw,26px)] lg:text-[clamp(26px,1.8vw,38px)] tracking-normal uppercase text-black leading-none h-auto min-h-0"
          style={{ lineHeight: 1 }}
        >
          {/* Left: ABOUT */}
          <div className="flex justify-start items-center">
            <button
              type="button"
              onClick={() => onSectionClick('about')}
              className={`h-auto min-h-0 p-0 m-0 border-0 text-black leading-none hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isAboutPage ? "underline underline-offset-4 font-normal italic" : ""
              }`}
              style={{ lineHeight: 1 }}
              aria-label="Navigate to About page"
            >
              ABOUT
            </button>
          </div>

          {/* Center: TAM NGUYEN */}
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={onBackHome}
              className="h-auto min-h-0 p-0 m-0 border-0 text-center font-serif font-normal leading-none tracking-normal uppercase text-black hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ lineHeight: 1 }}
              aria-label="Navigate to Homepage"
            >
              TAM NGUYEN
            </button>
          </div>

          {/* Right: CONTACT */}
          <div className="flex justify-end items-center">
            <a
              href="#contact"
              onClick={(e) => onSectionClick('contact', e)}
              className="h-auto min-h-0 p-0 m-0 border-0 text-black leading-none hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ lineHeight: 1 }}
              aria-label="Scroll to Contact section"
            >
              CONTACT
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navigation;
