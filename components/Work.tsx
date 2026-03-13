import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';

interface WorkProps {
  onProjectSelect: (id: string) => void;
}

const Work: React.FC<WorkProps> = ({ onProjectSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
      },
    },
  };

  return (
    <section id="work" className="w-full pt-32 md:pt-44 pb-20 bg-white">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-screen-2xl mx-auto px-4 md:px-8"
      >
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-12 md:mb-16 border-b border-black/5 pb-4"
        >
          <span className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-neutral-400">Selected Projects</span>
          <span className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-neutral-400">Based in NYC</span>
        </motion.div>
        
        {/* Adjusted to 2 columns to allow the 16:9 landscape aspect ratio to breathe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              onClick={() => onProjectSelect(project.id)}
              className="group flex flex-col cursor-pointer"
              data-cursor="view"
            >
              {/* 
                Changed aspect ratio from 4:5 to video (16:9 / 1920x1080 ratio).
                The shadow and transition effects are maintained for high-end feel.
              */}
              <div className="relative aspect-video overflow-hidden bg-gray-50 mb-8 transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
                <img 
                  src={project.imageUrl} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-baseline border-t border-black/5 pt-4">
                <h3 className="font-sans font-black text-2xl tracking-tighter uppercase leading-none">
                  {project.name}
                </h3>
                <p className="font-sans font-bold text-[10px] uppercase tracking-widest text-gray-400 whitespace-nowrap">
                  {project.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Work;