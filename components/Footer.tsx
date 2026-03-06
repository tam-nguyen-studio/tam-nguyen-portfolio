import React from 'react';
import { motion } from 'motion/react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
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
    <footer 
      id="contact" 
      className="w-full pt-40 pb-12 transition-colors duration-700 bg-white text-black border-t border-gray-100"
    >
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col"
      >
        {/* Simplified Footer - Reduced email size for refinement */}
        <div className="mb-40">
          <motion.span variants={itemVariants} className="block font-sans font-bold text-[10px] uppercase tracking-[0.4em] mb-12 text-neutral-400">
            Get in touch
          </motion.span>
          
          <motion.div variants={itemVariants} className="flex flex-col">
            <a 
              href="mailto:tam@tamnguyen.studio" 
              className="inline-block text-2xl md:text-[5vw] transition-all hover:opacity-40 break-words font-sans font-black tracking-tighter uppercase leading-none border-b-2 md:border-b-4 border-current pb-2 md:pb-4 self-start"
            >
              tam@tamnguyen.studio
            </a>
          </motion.div>
        </div>

        {/* Minimal Copyright Line */}
        <motion.div variants={itemVariants} className="flex justify-between items-center pt-8 border-t border-black/5">
          <span className="font-sans font-bold text-[9px] uppercase tracking-[0.3em] opacity-40">
            © Tam Nguyen
          </span>
          <span className="font-sans font-bold text-[9px] uppercase tracking-[0.3em] opacity-40">
            2026
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;