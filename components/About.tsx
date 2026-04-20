import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const RESUME_URL = '/images/tam-nguyen-resume.pdf';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const shouldReduceMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="about" className="w-full md:min-h-screen bg-transparent text-swiss-black pb-[12px] md:pb-[60px] flex flex-col items-center">
      <div className="w-full px-[20px] pt-[60px] md:pt-[100px] flex flex-col items-center">
        <div className="max-w-[90%] md:max-w-[780px] lg:max-w-[1000px] text-center flex flex-col items-center">
          {/* Bio Section */}
          <div className="mb-20 md:mb-32 flex flex-col items-center">
            <motion.h1 
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-serif font-normal text-[clamp(32px,4.5vw,60px)] leading-[1.0] tracking-[-0.01em] mb-12 md:mb-20"
            >
              <span className="block">Multidisciplinary designer helping brands show up with intention across every touchpoint.</span>
            </motion.h1>

            <motion.h2 
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-serif font-normal text-[clamp(32px,4.5vw,60px)] leading-[1.0] tracking-[-0.01em] mb-12 md:mb-20"
            >
              <span className="block">8+ years of brand and marketing experience across beauty, CPG, and tech.</span>
              <span className="block mt-12 md:mt-20">Based in Brooklyn.</span>
            </motion.h2>

            <motion.div 
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center gap-8 md:gap-12 font-serif font-normal text-[clamp(32px,4.5vw,60px)] leading-[1.0] tracking-[-0.01em]"
            >
              <a 
                href={RESUME_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="italic underline underline-offset-[8px] hover:opacity-50 transition-opacity"
              >
                Resume
              </a>
              <a 
                href="https://www.linkedin.com/in/tamnguyenstudio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="italic underline underline-offset-[8px] hover:opacity-50 transition-opacity"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Contact Section - Integrated as per image */}
          <div id="contact" className="mt-[40px] md:mt-[100px] flex flex-col items-center">
            <h2 className="font-serif font-normal text-[clamp(32px,4.5vw,60px)] text-swiss-black leading-[0.8] tracking-[-0.01em] text-center flex flex-col items-center">
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
                className="block w-fit text-center"
              >
                tam@tamnguyen.studio
              </motion.a>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;