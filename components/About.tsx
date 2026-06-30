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
    <section 
      id="about" 
      className="w-full flex-grow bg-transparent text-swiss-black px-[20px] pt-[8px] md:pt-[40px] pb-0 flex flex-col justify-between items-center"
    >
      {/* Upper Block - Vertically centered in the remaining viewport space with guaranteed spacious bottom spacing */}
      <div className="flex-grow flex flex-col justify-center items-center w-full max-w-[90%] md:max-w-[780px] lg:max-w-[1000px] text-center pt-1 md:pt-6 pb-12 md:pb-24 lg:pb-32">
        {/* Bio Section */}
        <div className="flex flex-col items-center w-full">
          <motion.h1 
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-serif font-normal text-[clamp(28px,4.2vw,54px)] leading-[1.15] tracking-[-0.01em] mb-10 md:mb-12 lg:mb-16"
          >
            I'm a brand and marketing designer based in Brooklyn with 8 years of experience across beauty, tech, and CPG. I make sure brands show up with their best face forward.
          </motion.h1>

          <motion.div 
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-8 md:gap-12 font-serif font-normal text-[clamp(28px,4.2vw,54px)] leading-[1.0] tracking-[-0.01em]"
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
      </div>
 
      {/* Contact Section - Hugs the bottom footer/border */}
      <div 
        id="contact" 
        className="w-full max-w-[90%] md:max-w-[780px] lg:max-w-[1000px] flex flex-col items-center mt-auto pb-[24px] md:pb-[36px]"
      >
        <h2 className="font-serif font-normal text-[clamp(28px,4.2vw,54px)] text-swiss-black leading-[0.92] tracking-[-0.01em] text-center flex flex-col items-center">
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
            className="block w-fit text-center hover:opacity-50 transition-opacity cursor-pointer"
          >
            tam@tamnguyen.studio
          </motion.a>
        </h2>
      </div>
    </section>
  );
};

export default About;