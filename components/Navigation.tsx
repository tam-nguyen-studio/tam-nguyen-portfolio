import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface NavProps {
  isProjectView: boolean;
  onBackHome: () => void;
  onSectionClick: (id: string) => void;
}

const Navigation: React.FC<NavProps> = ({ isProjectView, onBackHome, onSectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(() => 
    typeof window !== 'undefined' ? window.scrollY > 50 : false
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHeaderClasses = () => {
    if (isScrolled) {
      return "bg-white/95 backdrop-blur-md border-b border-black/5 py-4";
    }
    return "bg-transparent py-8 md:py-[28px]";
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${getHeaderClasses()}`}>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="grid grid-cols-4 md:grid-cols-12 items-baseline gap-4"
        >
          
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4">
            <button 
              onClick={onBackHome}
              className="uppercase font-sans font-black tracking-tighter text-2xl md:text-3xl leading-none origin-left"
            >
              Tam Nguyen
            </button>
          </motion.div>

          <div className="hidden md:block md:col-span-4 text-center">
            {/* Middle section cleared as requested */}
          </div>
          
          <nav className="col-span-2 md:col-span-4">
            <ul className="flex justify-end gap-x-4 md:gap-x-10">
              <motion.li variants={itemVariants}>
                <button 
                  onClick={() => onSectionClick('about')}
                  className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold hover:opacity-40 transition-all relative group"
                >
                  About
                </button>
              </motion.li>
              <motion.li variants={itemVariants}>
                <button 
                  onClick={() => onSectionClick('contact')}
                  className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold hover:opacity-40 transition-all relative group"
                >
                  Contact
                </button>
              </motion.li>
            </ul>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Navigation;