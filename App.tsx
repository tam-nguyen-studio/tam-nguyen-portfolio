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

  // Redirect for /pgportfolio
  useEffect(() => {
    if (window.location.pathname === '/pgportfolio') {
      window.location.replace('https://drive.google.com/file/d/1IOs4vsTtr1rOuA-gD7If12rUoOIw20B9/view?usp=sharing');
    }
  }, []);

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
        
        <main className="relative z-10 flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            {isAboutPage ? (
              <motion.div
                key="about"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col"
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
                {/* Elevated Senior Typographic Hero Section with grounding hairline border */}
                <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-swiss-border/50 mb-[60px] md:mb-[80px]">
                  <div className="w-full max-w-[1440px] mx-auto px-[20px] pt-[40px] md:pt-[100px] pb-[60px] md:pb-[100px]">
                    {/* Majestic Hero Copy Statement */}
                    <div className="max-w-[1240px]">
                      <h1 className="font-serif font-normal text-[clamp(34px,5.5vw,84px)] leading-[0.95] tracking-[-0.02em] text-swiss-black">
                        <span className="font-sans font-medium uppercase tracking-tight text-[85%] inline-block">Brand Designer</span> crafting thoughtful visual languages, <span className="italic font-serif text-[#706E6B] hover:text-swiss-black transition-colors duration-500">digital experiences</span>, and marketing campaigns. <span className="italic font-serif text-[#706E6B] hover:text-swiss-black transition-colors duration-500">Eight years across beauty, tech, and CPG.</span>
                      </h1>
                    </div>
                  </div>
                </div>

                <Work 
                  onProjectSelect={(id) => {
                    navigateTo(id);
                  }} 
                />

                {/* Contact Section */}
                <div id="contact" className="w-full px-[20px] mt-[60px] md:mt-[60px] mb-[30px] md:mb-[40px]">
                  <section className="w-full border-t border-swiss-border/60 pt-[40px] md:pt-[60px]">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
                      {/* Left Side: Big Call to Action */}
                      <div className="col-span-1 md:col-span-8">
                        <h2 className="font-serif font-normal text-[clamp(36px,5vw,72px)] text-swiss-black leading-[0.92] tracking-[-0.015em]">
                          <motion.span
                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10px' }}
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
                            viewport={{ once: true, margin: '-10px' }}
                            transition={{ duration: shouldReduceMotion ? 0.4 : 1.1, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="block w-fit text-left hover:opacity-50 transition-opacity cursor-pointer"
                          >
                            tam@tamnguyen.studio
                          </motion.a>
                        </h2>
                      </div>
                      
                      {/* Right Side: Meta / Socials column */}
                      <div className="col-span-1 md:col-span-4 flex flex-col gap-6 md:gap-8 pt-2 md:pl-8 md:border-l border-swiss-border/30">
                        <div className="flex flex-col gap-2.5">
                          <span className="font-sans text-[11px] font-medium tracking-[0.12em] text-[#777] uppercase">
                            [ Connect ]
                          </span>
                          <div className="flex flex-col gap-1.5 text-[14px]">
                            <a 
                              href="https://www.linkedin.com/in/tamnguyenstudio/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="font-serif text-swiss-black hover:opacity-50 transition-opacity underline underline-offset-4 decoration-1 decoration-[#999] hover:decoration-swiss-black w-fit cursor-pointer"
                            >
                              LinkedIn
                            </a>
                            <a 
                              href="/images/tam-nguyen-resume.pdf" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="font-serif text-swiss-black hover:opacity-50 transition-opacity underline underline-offset-4 decoration-1 decoration-[#999] hover:decoration-swiss-black w-fit cursor-pointer"
                            >
                              Resume
                            </a>
                          </div>
                        </div>
                      </div>
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