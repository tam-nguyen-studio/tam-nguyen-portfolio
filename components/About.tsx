import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const RESUME_URL = '/images/tam-nguyen-resume.pdf';
const LINKEDIN_URL = 'https://www.linkedin.com/in/tamnguyenstudio/';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      id="about" 
      className="w-full flex-grow text-black flex flex-col items-center pb-0"
    >
      {/* 1. Hero Section */}
      <div className="w-full max-w-[1440px] mx-auto px-[18px] sm:px-[20px] pt-12 sm:pt-16 md:pt-24 lg:pt-28 pb-[clamp(100px,13vw,220px)] flex flex-col items-center">
        <div className="w-full text-center flex flex-col items-center">
          <motion.p 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-normal text-[clamp(26px,3.8vw,48px)] text-[#224875] [text-wrap:balance] mx-auto w-[calc(100%-40px)] md:w-[88vw] lg:w-[min(82vw,1500px)] leading-[1.04] md:leading-[1.07] lg:leading-[1.06] tracking-[-0.015em] md:tracking-[-0.018em] lg:tracking-[-0.02em]"
          >
            I'm a Brooklyn-based brand designer with eight years of experience across beauty, consumer, and technology. I create identities, campaigns, and digital experiences that help brands communicate clearly and show up consistently.
          </motion.p>

          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-10 sm:gap-14 md:gap-16 font-serif text-[clamp(26px,3.5vw,44px)] font-normal text-[#224875] mt-10 sm:mt-12 md:mt-14"
          >
            <a 
              href={RESUME_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="not-italic underline underline-offset-[6px] sm:underline-offset-[8px] hover:italic focus-visible:italic text-[#224875] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#224875] rounded cursor-pointer"
            >
              Resume
            </a>
            <a 
              href={LINKEDIN_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="not-italic underline underline-offset-[6px] sm:underline-offset-[8px] hover:italic focus-visible:italic text-[#224875] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#224875] rounded cursor-pointer"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>

      {/* 2 & 3. Thin Horizontal Rule & Info Table Section */}
      <div className="w-full max-w-[1440px] mx-auto px-[18px] sm:px-[20px] font-sans text-[15px] sm:text-[16px] text-black">
        {/* Row 1 — Selected brands */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full border-t-[1.5px] border-black grid grid-cols-1 md:grid-cols-[clamp(220px,25vw,340px)_1fr] items-start pt-[18px] md:pt-[clamp(18px,2vw,28px)] pb-[48px] md:pb-[clamp(52px,5vw,80px)] gap-y-3 md:gap-y-0"
        >
          <div className="font-sans font-normal leading-[1.45] sm:leading-[1.5]">
            Selected Brands
          </div>
          <div className="font-sans font-normal leading-[1.45] sm:leading-[1.5]">
            <p>Gillette, Braun, The Art of Shaving, Soko Glam, Then I Met You, P&G Good Everyday</p>
          </div>
        </motion.div>

        {/* Row 2 — Capabilities */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full border-t-[1.5px] border-black grid grid-cols-1 md:grid-cols-[clamp(220px,25vw,340px)_1fr] items-start pt-[18px] md:pt-[clamp(18px,2vw,28px)] pb-[48px] md:pb-[clamp(52px,5vw,80px)] gap-y-3 md:gap-y-0"
        >
          <div className="font-sans font-normal leading-[1.45] sm:leading-[1.5]">
            Capabilities
          </div>
          <div className="font-sans font-normal leading-[1.45] sm:leading-[1.5] flex flex-col gap-0.5">
            <p>Brand Identity</p>
            <p>Campaign Art Direction</p>
            <p>Digital Design</p>
            <p>Editorial Design</p>
            <p>Presentations</p>
            <p>Motion</p>
            <p>AI-Assisted Image Making</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;