import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';

const RESUME_URL = '/images/tam-nguyen-resume.pdf';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section id="about" className="w-full px-4 md:px-8 py-32 md:py-60 transition-colors duration-700 bg-white text-black border-t border-gray-100">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-screen-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4">
          <div className="col-span-1 md:col-span-7">
            <motion.span variants={itemVariants} className="block font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-12 opacity-50">
              About
            </motion.span>
            <div className="text-xl md:text-3xl text-neutral-800 font-sans font-medium max-w-2xl leading-snug space-y-8">
              <motion.p variants={itemVariants}>
                I'm a multidisciplinary designer helping brands show up with intention across every touchpoint.
              </motion.p>
              <motion.p variants={itemVariants}>
                With 8+ years across beauty, CPG, and B2B, I've designed campaigns, digital experiences, and visual systems for brands like Soko Glam, Then I Met You, Gillette, Braun, and The Art of Shaving.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-wrap gap-x-12 gap-y-6 pt-8">
                <a 
                  href={RESUME_URL} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 font-sans font-bold text-[11px] uppercase tracking-[0.2em] hover:opacity-40 transition-all"
                >
                  <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-500"></span>
                  View Resume
                </a>
                <a 
                  href="https://www.linkedin.com/in/tamnguyenstudio/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-3 font-sans font-bold text-[11px] uppercase tracking-[0.2em] hover:opacity-40 transition-all"
                >
                  <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-500"></span>
                  LinkedIn
                </a>
              </motion.div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 md:col-start-9 mt-12 md:mt-0">
            <motion.span variants={itemVariants} className="block font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-12 opacity-50">
              Capabilities
            </motion.span>
            <ul className="space-y-6">
              {SERVICES.map((service, idx) => (
                <motion.li key={service} variants={itemVariants} className="flex items-center gap-4 group">
                  <span className="font-sans font-bold text-[10px] opacity-30">0{idx + 1}</span>
                  <span className={`text-2xl md:text-4xl font-sans font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2`}>
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;