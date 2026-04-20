import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Threshold for switching to fixed/sticky mode
      if (currentScrollY > 250) {
        setIsScrolled(true);
      } else if (currentScrollY < 10) {
        setIsScrolled(false);
      }

      // Determine visibility based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  // On Home/About, it only becomes the small version once it's fixed/scrolled
  const showSmallLogo = (isProjectView && !isAboutPage) || isScrolled;
  const bgColor = isAboutPage ? '#E5E1DB' : '#FAF8F6';
  
  // Initial height depends only on page type to prevent layout jumps
  const initialSmall = isProjectView && !isAboutPage;

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    onSectionClick(id);
  };
  
  return (
    <>
      {/* Static placeholder to prevent layout jump */}
      <div 
        className={`w-full ${
          initialSmall ? 'h-[73px] md:h-[73px]' : 'h-[112px] md:h-[115px] lg:h-[140px]'
        }`} 
      />
      
      <header 
        className={`top-0 left-0 right-0 z-[100] w-full ${
          isScrolled ? 'fixed' : 'absolute'
        }`}
        style={{ 
          backgroundColor: isScrolled ? bgColor : 'transparent',
          transform: isScrolled 
            ? (isVisible ? 'translateY(0)' : 'translateY(-100%)') 
            : 'translateY(0)',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease'
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`w-full px-[20px] pt-[20px] transition-all duration-700 ease-in-out ${
            showSmallLogo ? 'pb-[25px]' : 'pb-[60px] md:pb-[35px] lg:pb-[60px]'
          }`}>
            {/* Desktop Navigation */}
            <div className="hidden md:grid grid-cols-3 items-center">
              <div className="flex justify-start">
                <button 
                  onClick={() => onSectionClick('about')}
                  className="p-0 m-0 block font-serif font-semibold text-[16px] text-swiss-black hover:opacity-50 transition-opacity leading-none uppercase"
                >
                  About
                </button>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={onBackHome}
                  className={`p-0 m-0 block font-serif font-normal text-swiss-black leading-none tracking-[-0.01em] transition-all duration-700 ease-in-out ${
                    showSmallLogo 
                      ? 'text-[28px]' 
                      : 'text-[clamp(32px,4.5vw,60px)]'
                  }`}
                >
                  Tam Nguyen
                </button>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => onSectionClick('contact')}
                  className="p-0 m-0 block font-serif font-semibold text-[16px] text-swiss-black hover:opacity-50 transition-opacity leading-none uppercase"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-between items-center">
              <div className="flex justify-start">
                <button 
                  onClick={onBackHome}
                  className={`p-0 m-0 block font-serif font-normal text-swiss-black leading-none tracking-[-0.01em] transition-all duration-700 ease-in-out ${
                    showSmallLogo 
                      ? 'text-[24px]' 
                      : 'text-[32px]'
                  }`}
                >
                  Tam Nguyen
                </button>
              </div>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 -mr-2 text-swiss-black z-[110]"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
            className="fixed inset-0 z-[90] bg-[#E5E1DB] flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8">
              <button 
                onClick={() => handleNavClick('about')}
                className="font-serif font-normal text-[clamp(32px,4.5vw,60px)] text-swiss-black hover:opacity-50 transition-opacity uppercase leading-none"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="font-serif font-normal text-[clamp(32px,4.5vw,60px)] text-swiss-black hover:opacity-50 transition-opacity uppercase leading-none"
              >
                Contact
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;