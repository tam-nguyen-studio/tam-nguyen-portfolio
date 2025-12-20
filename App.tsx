import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import { PROJECTS } from './constants';

export type FontTheme = 'inter' | 'space' | 'mono';

const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [fontTheme, setFontTheme] = useState<FontTheme>('inter');
  const [useSmoothScroll, setUseSmoothScroll] = useState(false);

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

  useEffect(() => {
    document.body.className = `bg-white text-black font-theme-${fontTheme}`;
  }, [fontTheme]);

  const scrollToSection = (id: string) => {
    if (selectedProjectId) {
      setSelectedProjectId(null);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackToHome = () => {
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);
  
  // Calculate next project info
  let nextProjectName = "";
  if (selectedProjectId) {
    const idx = PROJECTS.findIndex(p => p.id === selectedProjectId);
    const nextIdx = (idx + 1) % PROJECTS.length;
    nextProjectName = PROJECTS[nextIdx].name;
  }

  return (
    <div className={`w-full relative transition-all duration-700 font-theme-${fontTheme}`}>
      <Navigation 
        fontTheme={fontTheme}
        isProjectView={!!selectedProjectId}
        onBackHome={handleBackToHome} 
        onSectionClick={scrollToSection}
      />
      
      <main className="relative z-10">
        {!selectedProjectId ? (
          <>
            <Hero 
              fontTheme={fontTheme} 
              onScrollToWork={() => scrollToSection('work')} 
            />
            <Work 
              fontTheme={fontTheme} 
              onProjectSelect={(id) => {
                setSelectedProjectId(id);
                window.scrollTo(0, 0);
              }} 
            />
            <About fontTheme={fontTheme} />
          </>
        ) : (
          <ProjectDetail 
            fontTheme={fontTheme}
            project={activeProject!} 
            nextProjectName={nextProjectName}
            onNext={() => {
              const idx = PROJECTS.findIndex(p => p.id === selectedProjectId);
              const nextIdx = (idx + 1) % PROJECTS.length;
              setSelectedProjectId(PROJECTS[nextIdx].id);
              window.scrollTo(0, 0);
            }}
          />
        )}
      </main>

      <Footer fontTheme={fontTheme} />

      {/* Font Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 scale-90 md:scale-100 origin-bottom-right">
        <div className="bg-black/90 backdrop-blur-xl p-1 rounded-xl flex gap-1 border border-white/10 shadow-2xl">
          {(['inter', 'space', 'mono'] as FontTheme[]).map((t) => (
            <button
              key={t}
              onClick={() => setFontTheme(t)}
              className={`px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all duration-300 ${
                fontTheme === t 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;