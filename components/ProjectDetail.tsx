import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
}

// Gallery content stored in a centralized data mapping
const PROJECT_GALLERIES: Record<string, ProjectMedia[]> = {
  'keystone': [
    { type: 'image', url: '/images/keystone-01.jpg' },
    { type: 'image', url: '/images/keystone-02.jpg' },
    { type: 'image', url: '/images/keystone-03.jpg' },
    { type: 'image', url: '/images/keystone-04.jpg' },
    { type: 'image', url: '/images/keystone-05.jpg' },
    { type: 'image', url: '/images/keystone-06.jpg' },
    { type: 'image', url: '/images/keystone-07.jpg' },
    { type: 'image', url: '/images/keystone-08.jpg' },
    { type: 'image', url: '/images/keystone-09.jpg' },
    { type: 'image', url: '/images/keystone-10.jpg' },
    { type: 'image', url: '/images/keystone-11.jpg' },
    { type: 'image', url: '/images/keystone-12.jpg' },
  ],
  'the-alden': [
    { type: 'image', url: '/images/the-alden-hero.jpg' },
    { type: 'image', url: '/images/the-alden-01.jpg' },
    { type: 'image', url: '/images/the-alden-02.jpg' },
    { type: 'image', url: '/images/the-alden-03.jpg' },
    { type: 'image', url: '/images/the-alden-04.jpg' },
    { type: 'image', url: '/images/the-alden-05.jpg' },
    { type: 'image', url: '/images/the-alden-06.jpg' },
    { type: 'image', url: '/images/the-alden-07.jpg' },
  ],
  'the-klog': [
    { type: 'image', url: '/images/the-klog-hero.jpg' },
    { type: 'image', url: '/images/the-klog-01.jpg' },
    { type: 'image', url: '/images/the-klog-02.jpg' },
    { type: 'image', url: '/images/the-klog-03.jpg' },
    { type: 'image', url: '/images/the-klog-04.jpg' },
    { type: 'image', url: '/images/the-klog-05.jpg' },
    { type: 'image', url: '/images/the-klog-06.jpg' },
    { type: 'image', url: '/images/the-klog-07.jpg' },
  ],
  'soko-glam': [
    // Section 1: 7 items (hero + 01 to 06) - Best of K-Beauty
    { type: 'image', url: '/images/soko-glam-hero.jpg' },
    { type: 'image', url: '/images/soko-glam-01.jpg' },
    { type: 'image', url: '/images/soko-glam-02.jpg' },
    { type: 'image', url: '/images/soko-glam-03.jpg' },
    { type: 'image', url: '/images/soko-glam-04.jpg' },
    { type: 'image', url: '/images/soko-glam-05.jpg' },
    { type: 'image', url: '/images/soko-glam-06.jpg' }, 
    // Section 2: 4 items (09 to 12) - In Good Company
    { type: 'image', url: '/images/soko-glam-07.jpg' }, 
    { type: 'image', url: '/images/soko-glam-08.jpg' }, 
    { type: 'image', url: '/images/soko-glam-09.jpg' }, 
    { type: 'image', url: '/images/soko-glam-10.jpg' }, 
    // Section 3: 2 items (07 to 08) - Digital Design
    { type: 'image', url: '/images/soko-glam-11.jpg' }, 
    { type: 'image', url: '/images/soko-glam-12.jpg' },
  ],
  'then-i-met-you': [
    { type: 'image', url: '/images/then-i-met-you-hero.jpg' },
    { type: 'image', url: '/images/then-i-met-you-01.jpg' },
    { type: 'image', url: '/images/then-i-met-you-02.jpg' },
    { type: 'image', url: '/images/then-i-met-you-03.jpg' },
    { type: 'image', url: '/images/then-i-met-you-04.jpg' },
    { type: 'image', url: '/images/then-i-met-you-05.jpg' },
    { type: 'image', url: '/images/then-i-met-you-06.gif' },
    { type: 'image', url: '/images/then-i-met-you-07.gif' },
  ],
  'pg': []
};

const SOKO_SECTIONS_DATA = [
  {
    title: "Campaign: Best of K-Beauty® 2020",
    copy: "For Soko Glam's most anticipated annual campaign, I defined a clean, architectural visual direction to position the featured products as best-in-class. Stark white podiums, geometric staging, and bold electric blue accents created a gallery feel and a sharp, high-contrast visual language.",
    credits: "photography: Stephanie chang",
    imgCount: 7
  },
  {
    title: "Campaign: In Good Company",
    copy: "For the 2020 holiday season, I developed a campaign spanning packaging, website, and email. The design system included Art Deco geometry to stand apart from traditional holiday visuals.\n\nThe advent calendar featured intricate gold foil stamping across a 16-piece edit.",
    credits: "",
    imgCount: 4
  },
  {
    title: "Digital Design",
    copy: "I designed landing pages across product launches, brand partnerships, campaigns, and editorial content, including Soko Glam's Skin Concierge program and skincare education pages, built responsively across desktop and mobile.",
    credits: "",
    imgCount: 2
  }
];

interface ProjectDetailProps {
  project: Project;
  onNext: () => void;
  nextProjectName: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onNext, nextProjectName }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const isPgProject = project.id === 'pg';
  const isKlog = project.id === 'the-klog';
  const isSoko = project.id === 'soko-glam';
  const isTIMY = project.id === 'then-i-met-you';
  const isKeystone = project.id === 'keystone';
  const gallery = PROJECT_GALLERIES[project.id] || [];
  const creditsLabel = project.id === 'the-alden' ? 'STUDIO' : 'Credits';

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

  const renderMedia = (media: ProjectMedia, index: number, isSquare: boolean = false) => (
    <motion.div 
      key={index} 
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`w-full overflow-hidden bg-neutral-100 ${isSquare ? 'aspect-square' : 'aspect-video'}`}
    >
      {media.type === 'video' ? (
        <video 
          src={media.url} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        />
      ) : (
        <img 
          src={media.url} 
          className="w-full h-full object-cover" 
          alt={`${project.name} asset ${index + 1}`} 
          referrerPolicy="no-referrer"
        />
      )}
    </motion.div>
  );

  const renderGallery = () => {
    if (isPgProject) {
      return (
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-40 py-24 border-t border-black/10"
        >
          <motion.div variants={itemVariants} className="max-w-2xl">
            <p className="text-xl md:text-2xl font-medium leading-snug text-neutral-400 italic">
              Due to the confidential nature of unreleased campaigns and intellectual property, selected works are available via private PDF upon request.
            </p>
          </motion.div>
        </motion.div>
      );
    }

    if (gallery.length === 0) return null;

    if (isKeystone) {
      // 4 full-width images, 1 row of 2 square images, 6 rows of full-width images
      const topImages = gallery.slice(0, 4);
      const gridImages = gallery.slice(4, 6);
      const bottomImages = gallery.slice(6, 12);
      
      return (
        <div className="mb-40 space-y-12">
          <div className="space-y-12">
            {topImages.map((media, index) => renderMedia(media, index))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {gridImages.map((media, index) => renderMedia(media, index + 4, true))}
          </div>
          <div className="space-y-12">
            {bottomImages.map((media, index) => renderMedia(media, index + 6))}
          </div>
        </div>
      );
    }

    if (isKlog || isTIMY) {
      // Logic: For Klog, keep 4 vertical. For Then I Met You, keep all but the last 2 vertical.
      const splitIndex = isKlog ? 4 : (gallery.length - 2);
      const topImages = gallery.slice(0, splitIndex);
      const gridImages = gallery.slice(splitIndex);
      
      return (
        <div className="mb-40 space-y-12">
          <div className="space-y-12">
            {topImages.map((media, index) => renderMedia(media, index))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {gridImages.map((media, index) => renderMedia(media, index + splitIndex, true))}
          </div>
        </div>
      );
    }

    if (isSoko) {
      let currentIdx = 0;
      return (
        <div className="space-y-40 mb-40">
          {SOKO_SECTIONS_DATA.map((section, sIdx) => {
            const sectionImages = gallery.slice(currentIdx, currentIdx + section.imgCount);
            const startIdxInGallery = currentIdx;
            currentIdx += section.imgCount;

            return (
              <div key={sIdx} className="space-y-16">
                {/* Section Header & Metadata */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="border-t border-black/10 pt-16"
                >
                  <motion.h3 variants={itemVariants} className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter mb-10">
                    {section.title}
                  </motion.h3>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-7">
                      <p className="text-lg md:text-xl font-medium leading-snug text-neutral-600 whitespace-pre-line">
                        {section.copy}
                      </p>
                    </motion.div>
                    {section.credits && (
                      <motion.div variants={itemVariants} className="col-span-1 md:col-span-5 flex flex-col">
                         <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">Credits</span>
                         <span className="font-sans font-bold uppercase text-xs leading-relaxed whitespace-pre-line opacity-80">
                           {section.credits}
                         </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                
                {/* Section Images */}
                <div className="space-y-12">
                  {sectionImages.map((media, mIdx) => renderMedia(media, startIdxInGallery + mIdx))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Default sequential layout
    return (
      <div className="space-y-12 mb-40">
        {gallery.map((media, index) => renderMedia(media, index))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen pt-48 md:pt-60 transition-all duration-500 bg-white text-black">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        
        {/* Project Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={`mb-24 flex flex-col gap-12 ${(isPgProject || isSoko) ? '' : 'border-b border-black/5 pb-16'}`}
        >
          <motion.h1 variants={itemVariants} className="text-[12vw] font-sans font-black leading-[0.82] md:leading-[0.78] tracking-tighter uppercase break-words -ml-[0.05em]">
            {project.name}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-6 lg:col-span-7">
               <p className="text-xl md:text-2xl font-sans font-medium leading-snug text-neutral-800 max-w-2xl whitespace-pre-line">
                {project.description || "A systematic approach to brand identity that prioritizes modularity and technical precision within digital environments."}
              </p>
            </motion.div>

            {isPgProject ? (
              <>
                <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-8">
                  <motion.div variants={itemVariants} className="flex flex-col border-t border-black/10 pt-4">
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">ROLE</span>
                    <span className="font-sans font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.role}</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex flex-col border-t border-black/10 pt-4">
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">FOCUS</span>
                    <span className="font-sans font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.focus}</span>
                  </motion.div>
                </div>
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col border-t border-black/10 pt-4">
                  <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">CLIENT LIST</span>
                  <span className="font-sans font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.credits}</span>
                </motion.div>
              </>
            ) : (
              <>
                <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-8">
                  <motion.div variants={itemVariants} className="flex flex-col border-t border-black/10 pt-4">
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">DISCIPLINE</span>
                    <span className="font-sans font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.role || "Lead Design"}</span>
                  </motion.div>
                </div>

                {/* Conditionally remove Credits for specific campaigns, but include for Keystone */}
                {!isKlog && !isSoko && !isTIMY && (
                  <motion.div variants={itemVariants} className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col border-t border-black/10 pt-4">
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">{creditsLabel}</span>
                    <span className="font-sans font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.credits || "Internal Project"}</span>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Project Gallery Content */}
        {renderGallery()}
      </div>

      {/* Next Project Footer - Reverted to clean Swiss-style hover animation */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className={`py-40 border-t border-current/10 group cursor-pointer bg-white text-black transition-all duration-700 ${isPgProject ? 'mt-40' : ''}`} 
        onClick={onNext}
        data-cursor="view"
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
           <motion.span variants={itemVariants} className="font-sans font-bold text-xs uppercase tracking-[0.5em] mb-12 block opacity-40 transition-opacity group-hover:opacity-100">Next Project</motion.span>
           
           <motion.div variants={itemVariants} className="flex items-center justify-between">
              <h2 className="text-[10vw] font-sans font-black uppercase tracking-tighter leading-[0.85] -ml-[0.05em] group-hover:opacity-40 transition-opacity duration-500">
                {nextProjectName}
              </h2>
              <div className="text-[10vw] transition-transform duration-700 group-hover:translate-x-8 leading-none">
                →
              </div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;