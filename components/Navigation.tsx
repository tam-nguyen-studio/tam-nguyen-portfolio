import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavProps {
  isProjectView: boolean;
  isAboutPage?: boolean;
  onBackHome: () => void;
  onSectionClick: (id: string) => void;
}

const Navigation: React.FC<NavProps> = ({ isProjectView, isAboutPage, onBackHome, onSectionClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nycTime, setNycTime] = useState('');

  // Local clock sync for NYC America/New_York
  useEffect(() => {
    const updateClock = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setNycTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback
        const now = new Date();
        setNycTime(now.toTimeString().split(' ')[0]);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 120) {
        setIsScrolled(true);
      } else if (currentScrollY < 10) {
        setIsScrolled(false);
      }

      // Determine visibility based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const bgColor = isAboutPage ? '#E5E1DB' : '#FAF8F6';

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      if (id === '/') {
        onBackHome();
      } else {
        onSectionClick(id);
      }
    }, 100);
  };
  
  return (
    <>
      {/* Editorial Navigation Spacer */}
      <div className="w-full h-[64px] md:h-[94px]" />
      
      <header 
        className={`top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-in-out ${
          isScrolled ? 'fixed border-b border-swiss-border/30 backdrop-blur-md bg-opacity-[0.96] shadow-sm' : 'absolute'
        }`}
        style={{ 
          backgroundColor: isScrolled ? `${bgColor}f5` : 'transparent',
          transform: isScrolled 
            ? (isVisible ? 'translateY(0)' : 'translateY(-100%)') 
            : 'translateY(0)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease'
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="w-full px-[20px] py-[16px] md:py-[20px] flex flex-col justify-center">
            
            {/* Desktop Structured Grid */}
            <div className="hidden md:grid grid-cols-12 items-center w-full">
              
              {/* Refined Navigation Index Left (Hugging left edge) */}
              <div className="col-span-4 flex justify-start">
                <nav className="flex items-center font-serif text-[14px] md:text-[16px] lg:text-[17px] tracking-[0.08em] uppercase text-[#222] leading-none">
                  <button 
                    onClick={() => onSectionClick('about')}
                    className={`p-0 hover:text-swiss-black transition-all cursor-pointer ${
                      isAboutPage ? "font-semibold underline underline-offset-8 decoration-1 decoration-swiss-black text-swiss-black" : ""
                    }`}
                  >
                    ABOUT
                  </button>
                </nav>
              </div>

              {/* Brand Lettermark Centered */}
              <div className="col-span-4 flex justify-center items-center">
                <button 
                  onClick={onBackHome}
                  className="p-0 m-0 text-center block font-serif font-normal text-[28px] md:text-[34px] lg:text-[38px] leading-none tracking-[-0.02em] text-swiss-black hover:opacity-80 transition-opacity whitespace-nowrap cursor-pointer"
                >
                  Tam Nguyen
                </button>
              </div>
              
              {/* Refined Navigation Index Right (Hugging right edge) */}
              <div className="col-span-4 flex justify-end">
                <nav className="flex items-center font-serif text-[14px] md:text-[16px] lg:text-[17px] tracking-[0.08em] uppercase text-[#222] leading-none">
                  <button 
                    onClick={() => onSectionClick('contact')}
                    className="p-0 hover:text-swiss-black transition-all cursor-pointer"
                  >
                    CONTACT
                  </button>
                </nav>
              </div>
            </div>

            {/* Mobile Navigation Interface */}
            <div className="flex md:hidden justify-between items-center w-full">
              <button 
                onClick={onBackHome}
                className="p-0 m-0 block text-left font-serif font-normal text-[24px] leading-none tracking-[-0.02em] text-swiss-black cursor-pointer"
              >
                Tam Nguyen
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-0 m-0 font-serif text-[14px] leading-none tracking-[0.08em] uppercase text-swiss-black z-[110] active:opacity-65 cursor-pointer"
              >
                {isMenuOpen ? 'CLOSE' : 'MENU'}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#FAF8F6] flex flex-col justify-between p-[30px] pt-32"
            style={{ backgroundColor: bgColor }}
          >
            <div className="flex flex-col gap-8 items-start justify-center flex-grow pl-[10px]">
              <div className="flex flex-col gap-1 items-start">
                <button 
                  onClick={() => handleNavClick('/')}
                  className={`font-serif font-normal text-[48px] tracking-tight transition-opacity leading-none uppercase ${
                    !isProjectView && !isAboutPage ? 'text-swiss-black' : 'text-[#888]'
                  }`}
                >
                  WORK
                </button>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <button 
                  onClick={() => handleNavClick('about')}
                  className={`font-serif font-normal text-[48px] tracking-tight transition-opacity leading-none uppercase ${
                    isAboutPage ? 'text-swiss-black' : 'text-[#888]'
                  }`}
                >
                  ABOUT
                </button>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="font-serif font-normal text-[48px] tracking-tight text-[#888] transition-opacity leading-none uppercase active:text-swiss-black"
                >
                  CONTACT
                </button>
              </div>
            </div>

            {/* Mobile Menu footer details */}
            <div className="w-full border-t border-swiss-border/40 pt-[20px] flex justify-between items-center font-mono text-[9px] tracking-widest text-[#666]">
              <span>BROOKLYN, NY</span>
              <span className="tabular-nums">NYC {nycTime || '21:05'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
