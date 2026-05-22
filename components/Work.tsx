import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { PROJECT_GALLERIES } from './ProjectDetail';

interface WorkProps {
  onProjectSelect: (id: string) => void;
}

const ProjectCard: React.FC<{
  project: typeof PROJECTS[0];
  index: number;
  onProjectSelect: (id: string) => void;
  shouldReduceMotion: boolean;
  cardVariants: any;
  imageVariants: any;
  textVariants: any;
}> = ({ project, index, onProjectSelect, shouldReduceMotion, cardVariants, imageVariants, textVariants }) => {
  const gallery = PROJECT_GALLERIES[project.id] || [];
  let images = [project.imageUrl, ...gallery.filter(m => m.type === 'image').map(m => m.url)];

  // Filter out skipped images as per user requirements for the homepage hover effect
  if (project.id === 'keystone') {
    images = images.filter(url => !url.includes('keystone-02.jpg') && !url.includes('keystone-10.jpg') && !url.includes('keystone-11.jpg') && !url.includes('keystone-12.jpg'));
  } else if (project.id === 'soko-glam') {
    images = images.filter(url => !url.includes('soko-glam-01.jpg'));
  } else if (project.id === 'the-klog') {
    images = images.filter(url => !url.includes('the-klog-01.jpg'));
  } else if (project.id === 'then-i-met-you') {
    images = images.filter(url => !url.includes('then-i-met-you-02.jpg'));
  } else if (project.id === 'the-alden') {
    images = images.filter(url => !url.includes('the-alden-01.jpg') && !url.includes('the-alden-04.jpg') && !url.includes('the-alden-05.jpg'));
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(hover: hover)').matches;
    
    if (isHovered && isDesktop && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1000); // Dynamic responsive rhythm (1s interval)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentIndex(0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, images.length]);

  const isDarkProject = project.id === 'keystone' || project.id === 'the-alden';

  return (
    <motion.div 
      onClick={() => onProjectSelect(project.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-60px' }}
      variants={cardVariants}
      custom={index}
      className="flex flex-col cursor-pointer project-card"
    >
      <div className={`relative aspect-[1.5/1] overflow-hidden ${isDarkProject ? 'bg-zinc-950' : 'bg-gray-100'} transition-colors duration-500`}>
        <AnimatePresence initial={false}>
          <motion.img 
            key={images[currentIndex]}
            src={images[currentIndex]} 
            alt={project.name} 
            className="w-full h-full object-cover absolute inset-0" 
            referrerPolicy="no-referrer"
            variants={imageVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.4, ease: "easeInOut" },
              scale: { duration: shouldReduceMotion ? 0.4 : 1.2, ease: [0.16, 1, 0.3, 1] }
            }}
          />
        </AnimatePresence>
      </div>
      <div className="flex justify-between items-baseline pt-[4px] pb-[12px]">
        <motion.h3 
          variants={textVariants}
          className="font-sans font-normal text-[12px] uppercase tracking-normal text-swiss-black"
        >
          {project.name}
        </motion.h3>
        <motion.p 
          variants={textVariants}
          className="font-sans font-light text-[12px] uppercase tracking-normal text-swiss-black"
        >
          {project.category}
        </motion.p>
      </div>
    </motion.div>
  );
};

const Work: React.FC<WorkProps> = ({ onProjectSelect }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Preload all project images
    const preloadImages = () => {
      const allImages = PROJECTS.flatMap(project => {
        const gallery = PROJECT_GALLERIES[project.id] || [];
        const galleryImages = gallery
          .filter(item => item.type === 'image')
          .map(item => item.url);
        let projectImages = [project.imageUrl, ...galleryImages];

        // Apply same filters for preloading to avoid loading skipped files
        if (project.id === 'keystone') {
          projectImages = projectImages.filter(url => !url.includes('keystone-02.jpg') && !url.includes('keystone-10.jpg') && !url.includes('keystone-11.jpg') && !url.includes('keystone-12.jpg'));
        } else if (project.id === 'soko-glam') {
          projectImages = projectImages.filter(url => !url.includes('soko-glam-01.jpg'));
        } else if (project.id === 'the-klog') {
          projectImages = projectImages.filter(url => !url.includes('the-klog-01.jpg'));
        } else if (project.id === 'then-i-met-you') {
          projectImages = projectImages.filter(url => !url.includes('then-i-met-you-02.jpg'));
        } else if (project.id === 'the-alden') {
          projectImages = projectImages.filter(url => !url.includes('the-alden-01.jpg') && !url.includes('the-alden-04.jpg') && !url.includes('the-alden-05.jpg'));
        }

        return projectImages;
      });

      allImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();
  }, []);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 24 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.4 : 1.2,
        delay: i % 2 === 0 ? 0 : 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {}
  };

  const imageVariants = {
    hidden: { 
      scale: shouldReduceMotion ? 1 : 1.03 
    },
    visible: {
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.4 : 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: { 
      scale: shouldReduceMotion ? 1 : 1.04,
      transition: { duration: shouldReduceMotion ? 0.3 : 0.6, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0.6 },
    hover: { 
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0.15 : 0.3 }
    }
  };

  return (
    <section id="work" className="w-full px-[20px]">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              onProjectSelect={onProjectSelect}
              shouldReduceMotion={shouldReduceMotion}
              cardVariants={cardVariants}
              imageVariants={imageVariants}
              textVariants={textVariants}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;