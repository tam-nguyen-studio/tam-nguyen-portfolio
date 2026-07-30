import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../constants';

interface WorkProps {
  onProjectSelect: (id: string) => void;
  onViewAllProjects?: () => void;
}

const Work: React.FC<WorkProps> = ({ onProjectSelect, onViewAllProjects }) => {
  const shouldReduceMotion = useReducedMotion();
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [cardStops, setCardStops] = useState<number[]>([]);
  const [trailingSpace, setTrailingSpace] = useState(0);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);

  // Keep isDesktop in sync with viewport width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic max scroll pixels, card stops, and trailing space
  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth >= 768 && trackRef.current && stickyRef.current) {
        const pageGutter = 20;
        const cards = trackRef.current.querySelectorAll<HTMLElement>('article');

        if (cards.length > 0) {
          const lastCard = cards[cards.length - 1];
          const carouselViewportWidth = window.innerWidth;
          const lastCardWidth = lastCard.offsetWidth;
          const calculatedTrailing = Math.max(pageGutter, carouselViewportWidth - lastCardWidth - pageGutter);
          setTrailingSpace(calculatedTrailing);

          const trackScrollWidth = lastCard.offsetLeft + lastCardWidth + calculatedTrailing;
          const horizDistance = Math.max(0, trackScrollWidth - carouselViewportWidth);
          setMaxScroll(horizDistance);
          setStickyHeight(stickyRef.current.offsetHeight || window.innerHeight);

          const stops = Array.from(cards).map((card: HTMLElement) =>
            Math.min(Math.max(0, card.offsetLeft - pageGutter), horizDistance)
          );
          setCardStops(stops);
        }
      } else {
        setMaxScroll(0);
        setStickyHeight(0);
        setCardStops([]);
      }
    };

    updateDimensions();

    const trackElem = trackRef.current;
    if (trackElem) {
      const images = trackElem.querySelectorAll('img');
      images.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', updateDimensions);
        }
      });
    }

    const timer1 = setTimeout(updateDimensions, 100);
    const timer2 = setTimeout(updateDimensions, 300);
    const timer3 = setTimeout(updateDimensions, 800);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isDesktop]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -maxScroll]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (!isDesktop || cardStops.length === 0 || maxScroll <= 0) return;
      const clampedProgress = Math.min(1, Math.max(0, progress));
      const currentX = clampedProgress * maxScroll;

      let closestIndex = 0;
      let minDiff = Infinity;
      for (let i = 0; i < cardStops.length; i++) {
        const diff = Math.abs(currentX - cardStops[i]);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }
      setActiveIndex(closestIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isDesktop, cardStops, maxScroll]);

  const lastIndex = PROJECTS.length - 1;
  const currentNum = (activeIndex + 1).toString().padStart(2, '0');
  const totalNum = PROJECTS.length.toString().padStart(2, '0');
  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === lastIndex;

  const scrollPrev = () => {
    if (!targetRef.current || cardStops.length === 0) return;
    const targetIdx = Math.max(0, activeIndex - 1);
    const targetStop = cardStops[targetIdx];
    const targetY = targetRef.current.offsetTop + targetStop;
    window.scrollTo({ top: targetY, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  const scrollNext = () => {
    if (!targetRef.current || cardStops.length === 0) return;
    const targetIdx = Math.min(lastIndex, activeIndex + 1);
    const targetStop = cardStops[targetIdx];
    const targetY = targetRef.current.offsetTop + targetStop;
    window.scrollTo({ top: targetY, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  // State for vertical rule pulse interaction
  const [hasScrolled, setHasScrolled] = useState(false);
  const [shouldPulseRule, setShouldPulseRule] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Scroll transition for hero headline section
  const heroScrollY = useTransform(scrollY, [0, 300], [0, shouldReduceMotion || isMobile ? 0 : -25]);
  const heroScrollOpacity = useTransform(scrollY, [0, 300], [1, shouldReduceMotion || isMobile ? 1 : 0.75]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
        setShouldPulseRule(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setTimeout(() => {
      if (!hasScrolled && window.scrollY <= 20) {
        setShouldPulseRule(true);
      }
    }, 3500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [hasScrolled, shouldReduceMotion]);

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onProjectSelect(id);
    }
  };

  const EASE = [0.22, 1, 0.36, 1];

  return (
    <section id="work" className="w-full flex flex-col">
      {/* Hero Headline Section with Masked Upward Reveal & Scroll Transition */}
      <motion.div 
        style={{ y: heroScrollY, opacity: heroScrollOpacity }}
        className="w-full px-[18px] sm:px-[20px] pt-8 md:pt-28 pb-10 md:pb-32 mx-auto text-center overflow-hidden flex flex-col items-center justify-center"
      >
        <motion.h1 
          initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="font-serif font-normal text-[clamp(1.75rem,6.8vw,3.25rem)] md:text-[clamp(2.25rem,5vw,8rem)] leading-[1.0] tracking-[-0.025em] text-[#224875] mx-auto text-center [text-wrap:pretty] w-[calc(100vw-36px)] md:w-[min(90vw,100%)] max-w-[36ch]"
        >
          <span className="font-bold">Brand designer</span> crafting thoughtful visual languages,{" "}
          <span className="italic inline">digital experiences</span>
          , and marketing campaigns. <span className="font-bold">Eight years</span> across{" "}
          <span className="italic inline">beauty, tech, and CPG.</span>
        </motion.h1>
      </motion.div>

      {/* (WORK) Marker with 1.5pt Vertical Divider Line */}
      <div className="flex flex-col items-center justify-center mt-0 lg:-mt-[40px] mb-8 md:mb-12">
        <motion.button 
          type="button"
          onClick={onViewAllProjects}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
          className="group min-h-[44px] inline-flex items-center justify-center p-0 text-black leading-none font-serif text-[clamp(17px,4.8vw,22px)] md:text-[clamp(21px,2.8vw,26px)] lg:text-[clamp(26px,1.8vw,38px)] tracking-normal uppercase cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded whitespace-nowrap"
          aria-label="View Work index"
        >
          <span className="translate-y-[-0.04em] inline-block">
            (
            <span className="not-italic group-hover:italic group-focus-visible:italic transition-[font-style] duration-200">
              WORK
            </span>
            )
          </span>
        </motion.button>
        <motion.div 
          initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
          animate={
            shouldPulseRule
              ? { scaleY: [1, 1.25, 1], y: [0, 8, 0] }
              : { scaleY: 1, y: 0 }
          }
          transition={
            shouldPulseRule
              ? { duration: 0.8, ease: EASE, times: [0, 0.5, 1] }
              : { duration: 0.6, ease: EASE, delay: 1.3 }
          }
          onAnimationComplete={() => {
            if (shouldPulseRule) setShouldPulseRule(false);
          }}
          style={{ transformOrigin: 'top' }}
          className="w-[1.5px] h-[64px] md:h-[110px] bg-black mt-6"
        />
      </div>

      {/* DESKTOP STICKY HORIZONTAL SCROLL WORK SECTION */}
      {!shouldReduceMotion ? (
        <div 
          ref={targetRef} 
          className="hidden md:block relative w-full mt-0 mb-0 pb-0"
          style={{ height: isDesktop ? (maxScroll > 0 ? `${maxScroll + (stickyHeight || 600)}px` : '2500px') : 'auto' }}
        >
          <div 
            ref={stickyRef}
            className="sticky top-0 w-full overflow-hidden flex flex-col justify-start pt-0 md:pt-1 bg-[#EFF5F7] pb-4 md:pb-0"
          >
            {/* Sliding Track */}
            <motion.div 
              ref={trackRef}
              style={{ x }} 
              className="relative flex gap-8 md:gap-12 items-center pl-[20px] pr-[20px] w-max mt-0 md:mt-1"
            >
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  onClick={() => onProjectSelect(project.id)}
                  onKeyDown={(e) => handleKeyDown(e, project.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${project.name} project details`}
                  className="flex-shrink-0 group cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none rounded"
                >
                  {/* Top Title & Category Label Row */}
                  <div className="flex items-baseline justify-start gap-4 md:gap-5 mb-2.5">
                    <h2 className="font-serif font-normal text-[32px] lg:text-[42px] text-black leading-none not-italic group-hover:italic group-focus-visible:italic transition-[font-style] duration-200 ease-linear">
                      {project.id === 'pg' ? 'P&G' : project.name}
                    </h2>
                    <span className="font-serif italic text-[18px] md:text-[22px] lg:text-[24px] text-black">
                      {project.category}
                    </span>
                  </div>

                  {/* Image Frame */}
                  <div className="relative w-[82vw] lg:w-[52vw] max-w-[720px] lg:max-w-[820px] aspect-[16/10] bg-neutral-300 overflow-hidden shadow-sm">
                    <img 
                      src={project.imageUrl} 
                      alt={`${project.name} preview`} 
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] group-focus-visible:scale-[1.015]"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </article>
              ))}
              {/* Trailing spacer so the final card can be fully visible and aligned */}
              <div 
                style={{ width: trailingSpace, flexShrink: 0 }} 
                aria-hidden="true" 
              />
            </motion.div>

            {/* Bottom Controls Bar across 20px margins */}
            <div className="relative w-full px-[20px] mt-2.5 font-serif text-[16px] lg:text-[18px] text-black flex items-center justify-between">
              {/* Left controls */}
              <div className="flex items-center gap-[clamp(40px,7vw,120px)]">
                <div className="font-normal tracking-normal whitespace-nowrap">
                  {currentNum} / {totalNum}
                </div>

                <button
                  type="button"
                  onClick={onViewAllProjects}
                  className="font-normal tracking-normal whitespace-nowrap text-black hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded cursor-pointer transition-[font-style] duration-200"
                  aria-label="View all projects"
                >
                  (VIEW ALL PROJECTS)
                </button>
              </div>

              {/* Optically centered instruction */}
              <div
                className="absolute left-1/2 -translate-x-1/2 font-normal tracking-normal text-black/35 whitespace-nowrap pointer-events-none"
                aria-hidden="true"
              >
                (SCROLL)
              </div>

              {/* Right controls */}
              <div className="flex justify-end items-center gap-4">
                <button 
                  type="button"
                  onClick={isAtStart ? undefined : scrollPrev}
                  disabled={isAtStart}
                  aria-disabled={isAtStart}
                  className={`transition-opacity duration-200 motion-reduce:transition-none min-w-[44px] min-h-[44px] flex items-center justify-center p-1 text-[20px] focus-visible:ring-1 focus-visible:ring-black focus-visible:outline-none rounded ${
                    isAtStart 
                      ? "opacity-30 cursor-default" 
                      : "hover:italic focus-visible:italic cursor-pointer opacity-100"
                  }`}
                  aria-label="Previous project"
                >
                  ←
                </button>
                <button 
                  type="button"
                  onClick={isAtEnd ? undefined : scrollNext}
                  disabled={isAtEnd}
                  aria-disabled={isAtEnd}
                  className={`transition-opacity duration-200 motion-reduce:transition-none min-w-[44px] min-h-[44px] flex items-center justify-center p-1 text-[20px] focus-visible:ring-1 focus-visible:ring-black focus-visible:outline-none rounded ${
                    isAtEnd 
                      ? "opacity-30 cursor-default" 
                      : "hover:italic focus-visible:italic cursor-pointer opacity-100"
                  }`}
                  aria-label="Next project"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Reduced Motion Fallback Grid for Desktop */
        <div className="hidden md:grid grid-cols-2 gap-10 px-[20px] py-8 max-w-[1440px] mx-auto w-full">
          {PROJECTS.map((project, index) => {
            const projectNum = (index + 1).toString().padStart(2, '0');
            const totalNum = PROJECTS.length.toString().padStart(2, '0');

            return (
              <article
                key={project.id}
                onClick={() => onProjectSelect(project.id)}
                onKeyDown={(e) => handleKeyDown(e, project.id)}
                tabIndex={0}
                role="button"
                aria-label={`View ${project.name} project details`}
                className="flex flex-col group cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none p-2 rounded"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <h2 className="font-serif font-normal text-[32px] text-black leading-none not-italic group-hover:italic group-focus-visible:italic transition-[font-style] duration-200 ease-linear">{project.id === 'pg' ? 'P&G' : project.name}</h2>
                  <span className="font-serif italic text-[18px] md:text-[22px] lg:text-[24px] text-black">{project.category}</span>
                </div>
                <div className="w-full aspect-[16/10] bg-neutral-300 overflow-hidden">
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] group-focus-visible:scale-[1.015]" />
                </div>
                <div className="flex justify-between items-center mt-2 font-serif text-[15px] text-black">
                  <span>{projectNum} / {totalNum}</span>
                  <span>(SCROLL)</span>
                  <span>← →</span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* TABLET AND MOBILE VERTICAL PROJECT LIST */}
      <div className="block md:hidden px-[18px] sm:px-[20px] pb-0 flex flex-col gap-[80px] md:gap-[120px]">
        {PROJECTS.map((project, index) => {
          const projectNum = (index + 1).toString().padStart(2, '0');
          const totalNum = PROJECTS.length.toString().padStart(2, '0');

          return (
            <article
              key={project.id}
              onClick={() => onProjectSelect(project.id)}
              onKeyDown={(e) => handleKeyDown(e, project.id)}
              tabIndex={0}
              role="button"
              aria-label={`View ${project.name} project details`}
              className="flex flex-col group cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none rounded"
            >
              {/* Header Grid: Left Column Grouped Name & Category, Right Column Number */}
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-[clamp(1.25rem,3vw,2rem)] mb-[clamp(1.125rem,2.5vw,1.5rem)]">
                {/* Left Column: Grouped Name & Category */}
                <div className="flex flex-col gap-[0.375rem] min-w-0">
                  <h2 className="m-0 font-serif font-normal text-[22px] sm:text-[26px] md:text-[32px] text-black leading-[1.05] not-italic break-words">
                    {project.name}
                  </h2>
                  <p className="m-0 font-serif italic text-[16px] sm:text-[18px] md:text-[22px] text-black leading-[1.05] break-words block">
                    {project.category.includes('& CRM') ? (
                      <>
                        {project.category.split('& CRM')[0]}
                        <span className="whitespace-nowrap">&amp; CRM</span>
                      </>
                    ) : (
                      project.category
                    )}
                  </p>
                </div>

                {/* Right Column: Project Number Aligned to Top Edge */}
                <div className="font-serif text-[15px] sm:text-[16px] md:text-[18px] text-black leading-[1.05] self-start whitespace-nowrap shrink-0 text-right">
                  <span>{projectNum} / {totalNum}</span>
                </div>
              </div>

              {/* Project Image */}
              <div className="w-full aspect-[16/10] bg-neutral-300 overflow-hidden shadow-sm">
                <img 
                  src={project.imageUrl} 
                  alt={`${project.name} preview`} 
                  className="w-full h-full object-cover block"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Work;