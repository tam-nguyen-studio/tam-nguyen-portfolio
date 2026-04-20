import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../constants';

interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
}

// Gallery content stored in a centralized data mapping
export const PROJECT_GALLERIES: Record<string, ProjectMedia[]> = {
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
    { type: 'image', url: '/images/keystone-13.jpg' },
  ],
  'the-alden': [
    { type: 'image', url: '/images/the-alden-01.jpg' },
    { type: 'image', url: '/images/the-alden-02.jpg' },
    { type: 'image', url: '/images/the-alden-03.jpg' },
    { type: 'image', url: '/images/the-alden-04.jpg' },
    { type: 'image', url: '/images/the-alden-05.jpg' },
    { type: 'image', url: '/images/the-alden-06.jpg' },
    { type: 'image', url: '/images/the-alden-07.jpg' },
    { type: 'image', url: '/images/the-alden-08.jpg' },
  ],
  'the-klog': [
    { type: 'image', url: '/images/the-klog-01.jpg' },
    { type: 'image', url: '/images/the-klog-02.jpg' },
    { type: 'image', url: '/images/the-klog-03.jpg' },
    { type: 'image', url: '/images/the-klog-04.jpg' },
    { type: 'image', url: '/images/the-klog-05.jpg' },
    { type: 'image', url: '/images/the-klog-06.jpg' },
    { type: 'image', url: '/images/the-klog-07.jpg' },
    { type: 'image', url: '/images/the-klog-08.jpg' },
  ],
  'soko-glam': [
    { type: 'image', url: '/images/soko-glam-01.jpg' },
    { type: 'image', url: '/images/soko-glam-02.jpg' },
    { type: 'image', url: '/images/soko-glam-03.jpg' },
    { type: 'image', url: '/images/soko-glam-04.jpg' },
    { type: 'image', url: '/images/soko-glam-05.jpg' },
    { type: 'image', url: '/images/soko-glam-06.jpg' }, 
    { type: 'image', url: '/images/soko-glam-07.jpg' }, 
    { type: 'image', url: '/images/soko-glam-08.jpg' }, 
    { type: 'image', url: '/images/soko-glam-09.jpg' }, 
    { type: 'image', url: '/images/soko-glam-10.jpg' }, 
    { type: 'image', url: '/images/soko-glam-11.jpg' }, 
    { type: 'image', url: '/images/soko-glam-12.jpg' },
    { type: 'image', url: '/images/soko-glam-13.jpg' },
    { type: 'image', url: '/images/soko-glam-14.jpg' },
    { type: 'image', url: '/images/soko-glam-15.jpg' },
    { type: 'image', url: '/images/soko-glam-16.jpg' },
  ],
  'then-i-met-you': [
    { type: 'image', url: '/images/then-i-met-you-01.jpg' },
    { type: 'image', url: '/images/then-i-met-you-02.jpg' },
    { type: 'image', url: '/images/then-i-met-you-03.jpg' },
    { type: 'image', url: '/images/then-i-met-you-04.jpg' },
    { type: 'image', url: '/images/then-i-met-you-05.jpg' },
    { type: 'image', url: '/images/then-i-met-you-06.jpg' },
    { type: 'image', url: '/images/then-i-met-you-07.gif' },
    { type: 'image', url: '/images/then-i-met-you-08.gif' },
  ],
  'pg': []
};

const SOKO_SECTIONS_DATA = [
  {
    title: "Best of K-Beauty® 2020",
    copy: "For Soko Glam's most anticipated annual campaign, I defined a clean, architectural visual direction to position the featured products as best-in-class. Stark white podiums, geometric staging, and bold electric blue accents created a gallery feel and a sharp, high-contrast visual language.",
    credits: "Photography: Stephanie Chang",
    imgCount: 6
  },
  {
    title: "Campaign: Stronger Together",
    copy: "The 'Stronger Together' campaign was designed to demystify skincare layering, educating customers on how ingredients like Vitamin C and SPF work better in pairs.\n\nTo visualize this 'Power Pairing' concept, I directed a campaign centered on bold color-blocking. We juxtaposed contrasting warm and cool tones to represent the chemical synergy of ingredients.",
    credits: "PHOTOGRAPHY: ALLISON PECCA",
    imgCount: 7
  },
  {
    title: "Packaging: Holiday Advent Calendar",
    copy: "For the 2020 holiday season, the goal was to create a luxurious, giftable object that stood apart from traditional seasonal tropes. I designed a limited-edition Advent Calendar inspired by the geometry of Art Deco architecture.\n\nFeaturing intricate gold foil stamping, the packaging transformed the 16-piece curation into a premium unboxing experience.",
    linkText: "Watch the unboxing",
    linkUrl: "https://www.tiktok.com/@hydrationceo/video/7032740463060929838",
    credits: "",
    imgCount: 2
  }
];

interface ProjectDetailProps {
  project: Project;
  onNext: () => void;
  onBackHome: () => void;
  nextProjectName: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onNext, onBackHome, nextProjectName }) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredNav, setHoveredNav] = useState<{ url: string, side: 'prev' | 'next' } | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const getNextImagePosition = (cursorX: number, cursorY: number) => {
    const imgWidth = 280;
    const imgHeight = 180;
    const padding = 20;
    const viewportWidth = window.innerWidth;
    
    let x = cursorX - imgWidth - padding;
    let y = cursorY + padding;
    
    if (x < padding) x = cursorX + padding;
    if (y + imgHeight > window.innerHeight - padding) y = cursorY - imgHeight - padding;
    
    return { x, y };
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const hoverTransform = useTransform([mouseX, mouseY], ([cx, cy]) => {
    const { x, y } = getNextImagePosition(cx as number, cy as number);
    return `translate(${x}px, ${y}px)`;
  });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(hover: hover)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, mouseX, mouseY]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const [isBackHovered, setIsBackHovered] = useState(false);

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const isPgProject = project.id === 'pg';
  const isKlog = project.id === 'the-klog';
  const isSoko = project.id === 'soko-glam';
  const isTIMY = project.id === 'then-i-met-you';
  const isKeystone = project.id === 'keystone';
  
  const fullGallery = PROJECT_GALLERIES[project.id] || [];
  
  // Hero logic
  const heroUrl = fullGallery.length > 0 ? fullGallery[0].url : project.imageUrl;
  const gallery = fullGallery.length > 0 ? fullGallery.slice(1) : [];

  const creditsLabel = project.id === 'the-alden' ? 'STUDIO' : (isPgProject ? 'CLIENT LIST' : 'Credits');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 16 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.4 : 1.0,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageAnimationVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30,
      scale: shouldReduceMotion ? 1 : 1.03
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.4 : 1.2,
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const renderMedia = (media: ProjectMedia, index: number, isSquare: boolean = false, staggerIndex: number = 0) => (
    <motion.div 
      key={index} 
      custom={staggerIndex}
      variants={imageAnimationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
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
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-12 py-10 border-y border-black/10"
        >
          <motion.div 
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl"
          >
            <p className="font-serif font-normal text-[clamp(24px,3.5vw,48px)] leading-[1.0] text-black/30 tracking-[-0.01em]">
              Due to the confidential nature of unreleased campaigns and intellectual property, selected works are available via private PDF upon request.
            </p>
          </motion.div>
        </motion.div>
      );
    }

    if (gallery.length === 0) return null;

    if (isKeystone) {
      // 4 full-width images (0-3), 1 row of 2 square images (4,5), rest full-width (6-end)
      // gallery[0] is keystone-02, so gallery[4] is keystone-06
      const topImages = gallery.slice(0, 4);
      const gridImages = gallery.slice(4, 6);
      const bottomImages = gallery.slice(6);
      
      return (
        <div className="mb-4 space-y-[20px]">
          <div className="space-y-[20px]">
            {topImages.map((media, index) => renderMedia(media, index, false, 0))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {gridImages.map((media, index) => renderMedia(media, index + 4, true, index))}
          </div>
          <div className="space-y-[20px]">
            {bottomImages.map((media, index) => renderMedia(media, index + 6, false, 0))}
          </div>
        </div>
      );
    }

    if (isKlog || isTIMY) {
      // Logic: For Klog, keep 3 vertical (since hero is 1st). For Then I Met You, keep all but the last 2 vertical.
      const splitIndex = isKlog ? 3 : (gallery.length - 2);
      const topImages = gallery.slice(0, splitIndex);
      const gridImages = gallery.slice(splitIndex);
      
      return (
        <div className="mb-4 space-y-[20px]">
          <div className="space-y-[20px]">
            {topImages.map((media, index) => renderMedia(media, index, false, 0))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {gridImages.map((media, index) => renderMedia(media, index + splitIndex, true, index))}
          </div>
        </div>
      );
    }

    if (isSoko) {
      let currentIdx = 0;
      return (
        <div className="space-y-40 mb-4">
          {SOKO_SECTIONS_DATA.map((section, sIdx) => {
            const sectionImages = gallery.slice(currentIdx, currentIdx + section.imgCount);
            const startIdxInGallery = currentIdx;
            currentIdx += section.imgCount;

            return (
              <div key={sIdx} className="space-y-16">
                {/* Section Header & Metadata */}
                <div className={sIdx === 0 ? "mt-12" : "mt-24"}>
                  <div className="border-y border-black/10 py-10 mb-16">
                    <motion.h3 
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="font-serif font-normal text-[clamp(32px,4.5vw,60px)] text-swiss-black leading-[0.8] tracking-[-0.01em]"
                      dangerouslySetInnerHTML={{ __html: section.title.replace('®', '<sup class="text-[0.4em] ml-1">®</sup>') }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <motion.div 
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="col-span-1 md:col-span-8"
                    >
                      <div className="font-sans font-light text-[18px] leading-[1.4] text-black whitespace-pre-line">
                        {section.copy}
                        {(section as any).linkUrl && (
                          <div className="mt-6">
                            <a 
                              href={(section as any).linkUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-black underline underline-offset-4 hover:opacity-60 transition-opacity font-sans font-normal text-[14px] uppercase tracking-normal"
                            >
                              {(section as any).linkText || "View Link"}
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                    
                    {section.credits && (
                      <motion.div 
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="col-span-1 md:col-span-4 flex flex-col"
                      >
                         <span className="font-sans font-normal text-[10px] uppercase tracking-normal opacity-40 mb-3">CREDITS</span>
                         <span className="font-sans font-normal text-[10px] uppercase tracking-normal leading-relaxed whitespace-pre-line opacity-80">
                           {section.credits}
                         </span>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Section Images */}
                <div className="space-y-[20px]">
                  {sectionImages.map((media, mIdx) => renderMedia(media, startIdxInGallery + mIdx, false, 0))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Default sequential layout
    return (
      <div className="space-y-[20px] mb-4">
        {gallery.map((media, index) => renderMedia(media, index, false, 0))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen transition-all duration-500 text-black" style={{ backgroundColor: '#FAF8F6' }}>
      {/* Hero Image */}
      <div className="w-full max-w-[1440px] mx-auto px-0 min-[1440px]:px-[20px]">
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.4 : 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden bg-neutral-100 aspect-[3/2] md:aspect-video"
          style={{ maxHeight: '65vh', minHeight: '300px' }}
        >
          <img 
            src={heroUrl} 
            className="w-full h-full object-cover" 
            style={{ objectPosition: project.objectPosition || 'center center' }}
            alt={`${project.name} Hero`} 
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <div className="w-full">
        {/* Project Header */}
        <div className="px-[20px] pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col md:pr-12">
            <motion.h1 
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-serif font-normal text-[clamp(40px,5vw,72px)] leading-[0.8] tracking-[-0.01em] mb-4 md:mb-16"
            >
              {project.name}
            </motion.h1>
            
            {project.credits && (
              <motion.div 
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="hidden md:flex flex-col"
              >
                <span className="font-sans font-normal text-[10px] uppercase tracking-normal opacity-40 mb-2">{creditsLabel}</span>
                <span className="font-sans font-normal text-[10px] uppercase tracking-normal leading-relaxed whitespace-pre-line opacity-60">
                  {project.credits}
                </span>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-8 flex flex-col">
            <motion.div 
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8 md:mb-12"
            >
              <p className="font-sans font-light text-[18px] leading-[1.4] text-black max-w-4xl whitespace-pre-line">
                {project.description}
              </p>
            </motion.div>

            {/* Mobile Credits */}
            {project.credits && (
              <motion.div 
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex md:hidden flex-col mb-12"
              >
                <span className="font-sans font-normal text-[10px] uppercase tracking-normal opacity-40 mb-2">{creditsLabel}</span>
                <span className="font-sans font-normal text-[10px] uppercase tracking-normal leading-relaxed whitespace-pre-line opacity-60">
                  {project.credits}
                </span>
              </motion.div>
            )}

            <motion.div 
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-t border-black/10 pt-4"
            >
              <div className="font-sans font-normal text-[10px] uppercase tracking-normal text-black/40 flex flex-col md:flex-row md:gap-x-8 gap-y-1">
                {project.role.split('\n').map((role, i) => (
                  <span key={i}>{role}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Project Gallery Content */}
        <div className="px-[20px]">
          {renderGallery()}
          
          {/* Project Navigation */}
          <div className="w-full pt-4 pb-24 relative">
            <div className="w-full flex justify-between items-center">
              <motion.button 
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={onBackHome}
                onMouseEnter={() => setIsBackHovered(true)}
                onMouseLeave={() => setIsBackHovered(false)}
                className="font-serif font-normal text-[20px] text-swiss-black leading-[0.8] tracking-[-0.01em] relative"
              >
                Back to Work
                <motion.span 
                  className="absolute bottom-[-2px] left-0 w-full h-[1px] bg-[#0f0f0f] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isBackHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.button>
              <motion.button 
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={onNext}
                onMouseEnter={() => isDesktop && setHoveredNav({ url: nextProject.imageUrl, side: 'next' })}
                onMouseLeave={() => setHoveredNav(null)}
                className="font-serif font-normal text-[20px] text-swiss-black hover:opacity-50 transition-opacity leading-[0.8] tracking-[-0.01em]"
              >
                Next Project
              </motion.button>
            </div>

            {/* Hover Preview Image */}
            {hoveredNav && isDesktop && (
              <motion.div
                style={{
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transform: hoverTransform,
                  width: '280px',
                  height: '180px',
                  pointerEvents: 'none',
                  zIndex: 999,
                }}
              >
                <img 
                  src={hoveredNav.url} 
                  className="w-full h-full object-cover" 
                  alt="Project Preview" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full px-[20px] mt-[10px] md:mt-[20px]">
          <section id="contact" className="w-full pt-[10px] md:pt-[20px] pb-[32px] md:pb-[60px]">
            <div className="flex flex-col">
              <h2 className="font-serif font-normal text-[clamp(32px,4.5vw,60px)] text-swiss-black leading-[0.8] tracking-[-0.01em]">
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
                  className="block w-fit"
                >
                  tam@tamnguyen.studio
                </motion.a>
              </h2>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;