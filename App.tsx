import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Navigation from './components/Navigation';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import ProjectIndex from './components/ProjectIndex';
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
  const [isContactTransitioning, setIsContactTransitioning] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const isWorkPage = currentPath.replace(/\/$/, '') === '/work';
  const shouldReduceMotion = useReducedMotion();

  // Helper to preload image before revealing new page
  const preloadImage = (src: string) => {
    return new Promise((resolve) => {
      if (!src) return resolve(true);
      const img = new Image();
      img.src = src;
      if (img.complete) return resolve(true);
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
    });
  };

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
    const isWork = path === 'work';
    
    if (isProject) {
      setSelectedProjectId(path);
      setIsAboutPage(false);
    } else if (isAbout) {
      setSelectedProjectId(null);
      setIsAboutPage(true);
    } else if (isWork) {
      setSelectedProjectId(null);
      setIsAboutPage(false);
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
      if (pathname !== '/contact') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncStateWithLocation]);

  useEffect(() => {
    const path = currentPath.replace(/^\//, '');
    if ((path === 'contact' || window.location.hash === '#contact') && !selectedProjectId && !isAboutPage && !isWorkPage) {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        const targetY = contactSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: targetY,
          behavior: 'auto',
        });
        requestAnimationFrame(() => {
          root.style.scrollBehavior = previousScrollBehavior;
        });
      }
    }
  }, [selectedProjectId, isAboutPage, isWorkPage, currentPath]);

  const navigateTo = async (path: string) => {
    const newPath = path.startsWith('/') ? path : `/${path}`;
    if (newPath === currentPath && !selectedProjectId && newPath === '/') return;

    if (shouldReduceMotion) {
      window.history.pushState({}, '', newPath);
      setCurrentPath(newPath);
      syncStateWithLocation(newPath);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    // Smooth page transition sequence using pale-blue overlay
    setIsPageTransitioning(true);

    // Wait for overlay to fade in
    await new Promise(r => setTimeout(r, 220));

    // Instant scroll reset behind opaque overlay
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Update state to mount new page
    window.history.pushState({}, '', newPath);
    setCurrentPath(newPath);
    syncStateWithLocation(newPath);

    // Check if target page has a hero image to preload
    const rawTarget = newPath.replace(/^\//, '');
    const targetProject = PROJECTS.find(p => p.id === rawTarget);
    if (targetProject) {
      const heroSrc = targetProject.heroImage || targetProject.imageUrl;
      await Promise.race([
        preloadImage(heroSrc),
        new Promise(r => setTimeout(r, 180)) // Fallback so transition stays snappy
      ]);
    }

    // Wait 1 frame for react mount
    await new Promise(r => requestAnimationFrame(r));

    // Fade out overlay revealing new page ready at top
    setIsPageTransitioning(false);
  };

  const scrollToSection = (id: string, event?: React.SyntheticEvent) => {
    if (id === 'contact') {
      const isHomepage =
        !selectedProjectId &&
        !isAboutPage &&
        !isWorkPage &&
        (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '/contact');

      const contactSection = document.getElementById('contact');

      if (isHomepage) {
        if (event) event.preventDefault();

        if (contactSection) {
          if (shouldReduceMotion) {
            const root = document.documentElement;
            const previousScrollBehavior = root.style.scrollBehavior;
            root.style.scrollBehavior = 'auto';
            const targetY = contactSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: targetY,
              behavior: 'auto',
            });
            window.history.replaceState(null, '', '#contact');
            contactSection.setAttribute('tabindex', '-1');
            contactSection.focus({ preventScroll: true });
            requestAnimationFrame(() => {
              root.style.scrollBehavior = previousScrollBehavior;
            });
            return;
          }

          setIsContactTransitioning(true);
          setTimeout(() => {
            const root = document.documentElement;
            const previousScrollBehavior = root.style.scrollBehavior;
            root.style.scrollBehavior = 'auto';

            const targetY = contactSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: targetY,
              behavior: 'auto',
            });

            window.history.replaceState(null, '', '#contact');

            contactSection.setAttribute('tabindex', '-1');
            contactSection.focus({ preventScroll: true });

            requestAnimationFrame(() => {
              root.style.scrollBehavior = previousScrollBehavior;
              requestAnimationFrame(() => {
                setIsContactTransitioning(false);
              });
            });
          }, 170);
        }
        return;
      }

      if (event) event.preventDefault();
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        contactSection.setAttribute('tabindex', '-1');
        contactSection.focus({ preventScroll: true });
        return;
      }

      navigateTo('contact');
      return;
    }

    if (id === 'about') {
      navigateTo('about');
      return;
    }

    navigateTo(id);
  };

  const handleBackToHome = () => {
    navigateTo('/');
  };

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);
  
  let nextProjectName = "";
  if (selectedProjectId) {
    const idx = PROJECTS.findIndex(p => p.id === selectedProjectId);
    const nextIdx = (idx + 1) % PROJECTS.length;
    nextProjectName = PROJECTS[nextIdx].name;
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div 
      className="w-full relative font-serif transition-colors duration-300 min-h-screen flex flex-col bg-[#EFF5F7] text-black"
    >
      <div 
        className={`page-transition-overlay fixed inset-0 z-[9999] bg-[#EFF5F7] pointer-events-none transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isPageTransitioning || isContactTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <div className="w-full flex flex-col flex-grow">
        <Navigation 
          isProjectView={!!selectedProjectId || isAboutPage || isWorkPage}
          isAboutPage={isAboutPage}
          onBackHome={handleBackToHome} 
          onSectionClick={scrollToSection}
        />
        
        <main className="relative z-10 flex-grow flex flex-col">
          <AnimatePresence 
            mode="wait"
            onExitComplete={() => {
              if (window.location.hash !== '#contact' && !window.location.pathname.endsWith('/contact')) {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }
            }}
          >
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
            ) : isWorkPage ? (
              <motion.div
                key="work-index"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col"
              >
                <ProjectIndex
                  onProjectSelect={(id) => navigateTo(id)}
                />
              </motion.div>
            ) : !selectedProjectId ? (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Work 
                  onProjectSelect={(id) => {
                    navigateTo(id);
                  }}
                  onViewAllProjects={() => {
                    navigateTo('work');
                  }} 
                />
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
                  onViewAllProjects={() => navigateTo('work')}
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
        
        {!selectedProjectId && <Footer />}
      </div>
    </div>
  );
};

export default App;