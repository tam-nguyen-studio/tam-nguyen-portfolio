import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Navigation from './components/Navigation';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import CustomCursor from './components/CustomCursor';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  // Use pathname as the source of truth for initial state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    const path = window.location.pathname.replace(/^\//, '');
    return PROJECTS.some(p => p.id === path) ? path : null;
  });
  
  const [isAboutPage, setIsAboutPage] = useState(() => {
    return window.location.pathname === '/about';
  });

  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  // Sync state with location when it changes
  const syncStateWithLocation = useCallback((pathname: string) => {
    const path = pathname.replace(/^\//, '');
    const isProject = PROJECTS.some(p => p.id === path);
    const isAbout = path === 'about';
    
    if (isProject) {
      setSelectedProjectId(path);
      setIsAboutPage(false);
    } else if (isAbout) {
      setSelectedProjectId(null);
      setIsAboutPage(true);
    } else {
      setSelectedProjectId(null);
      setIsAboutPage(false);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      setCurrentPath(pathname);
      syncStateWithLocation(pathname);
      // For clean navigation, we should scroll to top unless it's contact
      if (pathname !== '/contact') {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncStateWithLocation]);

  useEffect(() => {
    const path = currentPath.replace(/^\//, '');
    if (path === 'contact' && !selectedProjectId && !isAboutPage) {
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
  }, [selectedProjectId, isAboutPage, currentPath]);

  const navigateTo = (path: string) => {
    const newPath = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState({}, '', newPath);
    setCurrentPath(newPath);
    syncStateWithLocation(newPath);
    if (newPath !== '/contact') {
      window.scrollTo(0, 0);
    }
  };

  const scrollToSection = (id: string) => {
    if (id === 'contact') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Only update URL to /contact if we are already on the home or contact path
        // to avoid unmounting the current project/about view if the user just wants to scroll down.
        if (window.location.pathname === '/' || window.location.pathname === '/contact') {
          window.history.pushState({}, '', '/contact');
          setCurrentPath('/contact');
        }
        return;
      }
      
      // Fallback if for some reason the element is not found
      navigateTo('contact');
      return;
    }

    if (id === 'about') {
      navigateTo('about');
      return;
    }

    // Default behavior for other sections if any
    navigateTo(id);
  };

  const handleBackToHome = () => {
    navigateTo('/');
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
                    navigateTo(id);
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
                    navigateTo(PROJECTS[nextIdx].id);
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