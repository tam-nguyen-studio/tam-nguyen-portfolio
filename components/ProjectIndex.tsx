import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectIndexProps {
  onProjectSelect: (id: string) => void;
}

const ProjectIndex: React.FC<ProjectIndexProps> = ({
  onProjectSelect,
}) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoverSupported, setIsHoverSupported] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverSupported(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsHoverSupported(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHoverSupported) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeaveList = () => {
    setHoveredProject(null);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onProjectSelect(id);
    }
  };

  const getPreviewPos = () => {
    if (typeof window === 'undefined') return { x: 20, y: 20 };

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const previewWidth = Math.min(Math.max(280, vw * 0.28), 460);
    const previewHeight = previewWidth * (10 / 16);
    const offset = 24;

    let x = mousePos.x + offset;
    let y = mousePos.y + offset;

    if (x + previewWidth > vw) {
      x = mousePos.x - previewWidth - offset;
    }

    if (y + previewHeight > vh) {
      y = mousePos.y - previewHeight - offset;
    }

    x = Math.max(20, Math.min(x, vw - previewWidth - 20));
    y = Math.max(20, Math.min(y, vh - previewHeight - 20));

    return { x, y };
  };

  const previewPos = getPreviewPos();

  return (
    <section
      aria-labelledby="project-index-heading"
      className="w-full px-[18px] sm:px-[20px] pt-[clamp(100px,12vw,148px)] pb-16"
    >
      <h1
        id="project-index-heading"
        className="m-0 text-center font-serif font-normal text-[18px] md:text-[22px] lg:text-[24px] leading-none text-black"
      >
        (WORK)
      </h1>

      <div
        className="w-full mt-[clamp(72px,10vw,112px)]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveList}
      >
        {PROJECTS.map((project, index) => {
          const projectNumber = String(index + 1).padStart(2, '0');

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onProjectSelect(project.id)}
              onMouseEnter={(e) => {
                if (isHoverSupported) {
                  setMousePos({ x: e.clientX, y: e.clientY });
                  setHoveredProject(project);
                }
              }}
              onKeyDown={(event) => handleKeyDown(event, project.id)}
              aria-label={`View ${project.name} project`}
              className="w-full m-0 pt-[16px] md:pt-[22px] pb-[36px] md:pb-[56px] border-t-[1.5px] border-black bg-transparent text-left grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 md:gap-x-10 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
            >
              <span className="min-w-0 flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-baseline md:gap-x-[clamp(20px,2.5vw,40px)] md:gap-y-2">
                <span className="font-serif font-normal text-[clamp(32px,4.3vw,68px)] leading-[0.95] tracking-[-0.025em] text-black not-italic group-hover:italic group-focus-visible:italic transition-[font-style] duration-200">
                  {project.name}
                </span>

                <span className="font-serif italic text-[clamp(18px,2.2vw,34px)] leading-[1.05] text-black group-hover:not-italic group-focus-visible:not-italic transition-[font-style] duration-200">
                  {project.category}
                </span>
              </span>

              <span className="font-serif font-normal text-[clamp(28px,4vw,64px)] leading-[0.95] tabular-nums text-black whitespace-nowrap">
                {projectNumber}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Image Preview on Hover (Pointer Devices Only) */}
      {isHoverSupported && (
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                transform: `translate3d(${previewPos.x}px, ${previewPos.y}px, 0)`,
                pointerEvents: 'none',
                zIndex: 50,
              }}
              className="w-[clamp(280px,28vw,460px)] aspect-[16/10] overflow-hidden bg-neutral-200 border border-black/10 shadow-xl"
            >
              <img
                src={hoveredProject.heroImage || hoveredProject.imageUrl}
                alt={`${hoveredProject.name} preview`}
                className="w-full h-full object-cover"
                style={{ objectPosition: hoveredProject.objectPosition || 'center center' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};

export default ProjectIndex;
