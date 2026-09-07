import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageWithFade from './ImageWithFade';

const ILLUSTRATION_COUNT = 18;

// Natural placeholder ratios for subtle rhythm while images are resolving
const PLACEHOLDER_ASPECTS = [
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-[1/1]',
  'aspect-[4/3]',
  'aspect-[2/3]',
  'aspect-[5/4]',
];

// 18 image assets named illustration-01 through illustration-18 in numerical order
const ILLUSTRATIONS = Array.from({ length: ILLUSTRATION_COUNT }, (_, index) => {
  const num = (index + 1).toString().padStart(2, '0');
  return {
    id: `illustration-${num}`,
    src: `/images/illustration-${num}.jpg`,
    alt: `Selected illustration ${num}`,
  };
});

const EASE = [0.22, 1, 0.36, 1];

const SelectedIllustration: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + ILLUSTRATION_COUNT) % ILLUSTRATION_COUNT;
    });
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % ILLUSTRATION_COUNT;
    });
  }, []);

  // Keyboard navigation and body scroll lock for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  return (
    <article className="w-full text-black bg-[#EFF5F7] flex-grow flex flex-col">
      {/* 1. Restrained Editorial Introduction */}
      <div className="w-full max-w-[1220px] mx-auto px-[18px] sm:px-[20px] pt-[clamp(64px,9vw,136px)]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-full max-w-[960px] mx-auto text-center flex flex-col items-center"
        >
          <h1 className="m-0 font-serif font-normal text-[clamp(32px,4.2vw,64px)] leading-[0.95] tracking-[-0.025em] text-black text-center">
            Selected Illustration
          </h1>
          <p className="mt-4 md:mt-5 font-sans font-normal text-[14px] md:text-[15px] lg:text-[16px] leading-[1.4] text-black/75 text-center w-full max-w-[840px] sm:min-w-[min(100%,560px)] md:min-w-[620px]">
            Personal work spanning drawing, vector illustration, and visual experiments.
          </p>
        </motion.div>
      </div>

      {/* 2. Quiet, Curated 3-Column Editorial Image Grid in centered narrower container */}
      <div className="w-full max-w-[1220px] mx-auto px-[18px] sm:px-[20px] mt-[clamp(56px,8vw,120px)] pb-20 sm:pb-28 md:pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-20 sm:gap-y-28 md:gap-y-36 lg:gap-y-44 items-start w-full">
          {ILLUSTRATIONS.map((item, index) => {
            const placeholderAspect = PLACEHOLDER_ASPECTS[index % PLACEHOLDER_ASPECTS.length];
            return (
              <motion.figure
                key={item.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, ease: EASE, delay: shouldReduceMotion ? 0 : Math.min(index * 0.03, 0.2) }}
                className="w-full m-0 p-0 flex flex-col justify-start"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group w-full m-0 p-0 text-left bg-transparent border-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded-none block"
                  aria-label={`View ${item.alt} in fullscreen lightbox`}
                >
                  <ImageWithFade
                    src={item.src}
                    alt={item.alt}
                    className="block w-full h-auto object-contain transition-opacity duration-300 group-hover:opacity-95"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    minimalFallback
                    placeholderAspect={placeholderAspect}
                  />
                </button>
              </motion.figure>
            );
          })}
        </div>
      </div>

      {/* 3. Minimal Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            onClick={handleClose}
            className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-8 md:p-12 cursor-zoom-out select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Illustration Lightbox"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 text-white/70 hover:text-white transition-colors duration-200 p-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
              aria-label="Close lightbox"
            >
              <X size={22} strokeWidth={1.25} />
            </button>

            {/* Previous button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="fixed left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-all duration-200 p-3 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
              aria-label="Previous illustration"
            >
              <ChevronLeft size={28} strokeWidth={1.25} />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="fixed right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-all duration-200 p-3 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
              aria-label="Next illustration"
            >
              <ChevronRight size={28} strokeWidth={1.25} />
            </button>

            {/* Centered Large Image with native aspect ratio */}
            <div
              className="relative max-w-[min(90vw,1200px)] max-h-[85vh] flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={ILLUSTRATIONS[lightboxIndex].id}
                src={ILLUSTRATIONS[lightboxIndex].src}
                alt={ILLUSTRATIONS[lightboxIndex].alt}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="max-w-[min(90vw,1200px)] max-h-[85vh] w-auto h-auto object-contain select-none"
              />
            </div>

            {/* Subtle editorial counter */}
            <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/40 font-serif text-[13px] tracking-wider pointer-events-none select-none">
              ({(lightboxIndex + 1).toString().padStart(2, '0')} / {ILLUSTRATION_COUNT.toString().padStart(2, '0')})
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default SelectedIllustration;
