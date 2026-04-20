import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Navigation from './components/Navigation';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import CustomCursor from './components/CustomCursor';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  // Use hash as the source of truth for initial state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    const hash = window.location.hash.replace('#', '');
    return PROJECTS.some(p => p.id === hash) ? hash : null;
  });
  
  const [isAboutPage, setIsAboutPage] = useState(() => {
    return window.location.hash === '#about';
  });

  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  // Sync state with hash when it changes
  const syncStateWithHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    setCurrentHash(window.location.hash);
    const isProject = PROJECTS.some(p => p.id === hash);
    const isAbout = hash === 'about';
    
    if (isProject) {
      setSelectedProjectId(hash);
      setIsAboutPage(false);
      window.scrollTo(0, 0);
    } else if (isAbout) {
      setSelectedProjectId(null);
      setIsAboutPage(true);
      window.scrollTo(0, 0);
    } else {
      setSelectedProjectId(null);
      setIsAboutPage(false);
      if (hash === 'contact') {
        // Scroll logic is handled by the useEffect below for better reliability
      } else if (!hash) {
        window.scrollTo(0, 0);
      }
    }
  }, [selectedProjectId, isAboutPage]);

  useEffect(() => {
    const hash = currentHash.replace('#', '');
    if (hash === 'contact' && !selectedProjectId && !isAboutPage) {
      // If the element is already in the DOM, we can scroll immediately.
      // Otherwise, we wait for AnimatePresence exit animation (0.6s).
      const element = document.getElementById('contact');
      const delay = element ? 0 : 800; 
      
      const timer = setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [selectedProjectId, isAboutPage, currentHash]);

  useEffect(() => {
    window.addEventListener('hashchange', syncStateWithHash);
    return () => window.removeEventListener('hashchange', syncStateWithHash);
  }, [syncStateWithHash]);

  const scrollToSection = (id: string) => {
    if (id === 'contact') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (window.location.hash === `#${id}`) {
      // If already on the section, manually trigger scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.hash = id;
    }
  };

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);
  const shouldReduceMotion = useReducedMotion();
  
  // Calculate next and previous project info for the footer
  let nextProjectName = "";
  let prevProjectName = "";
  if (selectedProjectId) {
    const idx = PROJECTS.findIndex(p => p.id === selectedProjectId);
    const nextIdx = (idx + 1) % PROJECTS.length;
    const prevIdx = (idx - 1 + PROJECTS.length) % PROJECTS.length;
    nextProjectName = PROJECTS[nextIdx].name;
    prevProjectName = PROJECTS[prevIdx].name;
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0.4 : 1.0, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: shouldReduceMotion ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div 
      className={`w-full relative font-sans cursor-none transition-colors duration-500 min-h-screen flex flex-col`}
      style={{ 
        backgroundColor: isAboutPage ? '#E5E1DB' : '#FAF8F6'
      }}
    >
      <CustomCursor />
      <div className="w-full max-w-[1440px] mx-auto flex flex-col flex-grow">
        <Navigation 
          isProjectView={!!selectedProjectId || isAboutPage}
          isAboutPage={isAboutPage}
          onBackHome={handleBackToHome} 
          onSectionClick={scrollToSection}
        />
        
        <main className="relative z-10 flex-grow">
          <AnimatePresence mode="wait">
            {isAboutPage ? (
              <motion.div
                key="about"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <About />
              </motion.div>
            ) : !selectedProjectId ? (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Descriptor Bar */}
                <div className="w-full px-[20px] mb-[40px]">
                  <div className="w-full border-y border-swiss-border py-[8px] flex justify-between items-center">
                    <span className="font-sans font-normal text-[12px] uppercase tracking-normal text-swiss-black">
                      Brand & Digital Design
                    </span>
                    <span className="font-sans font-normal text-[12px] uppercase tracking-normal text-swiss-black">
                      Based in NYC
                    </span>
                  </div>
                </div>

                <Work 
                  onProjectSelect={(id) => {
                    window.location.hash = id;
                  }} 
                />

                {/* Contact Section */}
                <div className="w-full px-[20px] mt-[20px] md:mt-[40px]">
                  <section id="contact" className="w-full pt-[20px] md:pt-[40px] pb-[32px] md:pb-[60px]">
                    <div className="flex flex-col">
                      <h2 className="font-serif font-normal text-[clamp(32px,4.5vw,60px)] text-swiss-black leading-[0.8] tracking-[-0.01em]">
                        <motion.span
                          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false, margin: '-60px' }}
                          transition={{ duration: shouldReduceMotion ? 0.4 : 1.1, ease: [0.16, 1, 0.3, 1] }}
                          className="block"
                        >
                          Get in touch at
                        </motion.span>
                        <motion.a
                          href="mailto:tam@tamnguyen.studio"
                          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ opacity: 0.5 }}
                          viewport={{ once: false, margin: '-60px' }}
                          transition={{ duration: shouldReduceMotion ? 0.4 : 1.1, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="block w-fit"
                        >
                          tam@tamnguyen.studio
                        </motion.a>
                      </h2>
                    </div>
                  </section>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedProjectId}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ProjectDetail 
                  project={activeProject!} 
                  nextProjectName={nextProjectName}
                  onBackHome={handleBackToHome}
                  onNext={() => {
                    const idx = PROJECTS.findIndex(p => p.id === selectedProjectId);
                    const nextIdx = (idx + 1) % PROJECTS.length;
                    window.location.hash = PROJECTS[nextIdx].id;
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;