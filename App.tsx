import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  // Use hash as the source of truth for initial state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    const hash = window.location.hash.replace('#', '');
    return PROJECTS.some(p => p.id === hash) ? hash : null;
  });
  
  const [useSmoothScroll, setUseSmoothScroll] = useState(false);

  // Sync state with hash when it changes (e.g. back/forward buttons or user manual entry)
  const syncStateWithHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    const isProject = PROJECTS.some(p => p.id === hash);
    
    if (isProject) {
      setSelectedProjectId(hash);
      window.scrollTo(0, 0);
    } else {
      setSelectedProjectId(null);
      // If no valid project hash, ensure we handle homepage/section scroll
      if (!hash || !['work', 'about', 'contact'].includes(hash)) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  useEffect(() => {
    // Listen for hash changes
    window.addEventListener('hashchange', syncStateWithHash);
    
    // On mount, if we are on the homepage (no project selected), ensure we are at top
    if (!selectedProjectId) {
      // Small timeout to override browser's auto-scroll restoration
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('hashchange', syncStateWithHash);
      };
    }

    return () => window.removeEventListener('hashchange', syncStateWithHash);
  }, [selectedProjectId, syncStateWithHash]);

  // Smooth scroll initialization (Lenis)
  useEffect(() => {
    if (!useSmoothScroll) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [useSmoothScroll]);

  const scrollToSection = (id: string) => {
    if (selectedProjectId) {
      setSelectedProjectId(null);
      // Navigation update
      window.location.hash = id;
    } else {
      window.location.hash = id;
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackToHome = () => {
    setSelectedProjectId(null);
    // Use replaceState to clear the hash and clean up history stack.
    // Wrapped in try-catch to prevent SecurityError in restricted/sandboxed origins (like blob: URLs).
    try {
      const url = new URL(window.location.href);
      url.hash = '';
      window.history.replaceState(null, document.title, url.pathname + url.search);
    } catch (e) {
      // Fallback: simply clear the hash if replaceState is blocked
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);
  
  // Calculate next project info for the footer
  let nextProjectName = "";
  if (selectedProjectId) {
    const idx = PROJECTS.findIndex(p => p.id === selectedProjectId);
    const nextIdx = (idx + 1) % PROJECTS.length;
    nextProjectName = PROJECTS[nextIdx].name;
  }

  return (
    <div className="w-full relative transition-all duration-700 font-sans">
      <Navigation 
        isProjectView={!!selectedProjectId}
        onBackHome={handleBackToHome} 
        onSectionClick={scrollToSection}
      />
      
      <main className="relative z-10">
        {!selectedProjectId ? (
          <>
            <Hero 
              onScrollToWork={() => scrollToSection('work')} 
            />
            <Work 
              onProjectSelect={(id) => {
                window.location.hash = id;
              }} 
            />
            <About />
          </>
        ) : (
          <ProjectDetail 
            project={activeProject!} 
            nextProjectName={nextProjectName}
            onNext={() => {
              const idx = PROJECTS.findIndex(p => p.id === selectedProjectId);
              const nextIdx = (idx + 1) % PROJECTS.length;
              window.location.hash = PROJECTS[nextIdx].id;
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;