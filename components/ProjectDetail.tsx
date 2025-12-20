import React, { useEffect } from 'react';
import { Project } from '../types';
import { FontTheme } from '../App';

interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
}

// Gallery content stored in a centralized data mapping
const PROJECT_GALLERIES: Record<string, ProjectMedia[]> = {
  'keystone': [
    { type: 'video', url: '/images/keystone-hero.mp4' },
    { type: 'image', url: '/images/keystone-01.jpg' },
    { type: 'image', url: '/images/keystone-02.jpg' },
    { type: 'image', url: '/images/keystone-03.jpg' },
    { type: 'image', url: '/images/keystone-04.jpg' },
    { type: 'image', url: '/images/keystone-05.jpg' },
    { type: 'image', url: '/images/keystone-06.jpg' },
  ],
  'the-alden': [
    { type: 'image', url: '/images/the-alden-hero.jpg' },
    { type: 'image', url: '/images/the-alden-01.jpg' },
    { type: 'image', url: '/images/the-alden-02.jpg' },
    { type: 'image', url: '/images/the-alden-03.jpg' },
    { type: 'image', url: '/images/the-alden-04.jpg' },
    { type: 'image', url: '/images/the-alden-05.jpg' },
    { type: 'image', url: '/images/the-alden-01.jpg' },
    { type: 'image', url: '/images/the-alden-02.jpg' },
  ],
  'the-klog': [
    { type: 'image', url: '/images/the-klog-hero.jpg' },
    { type: 'image', url: '/images/the-klog-01.jpg' },
    { type: 'image', url: '/images/the-klog-02.jpg' },
    { type: 'image', url: '/images/the-klog-03.jpg' },
    { type: 'image', url: '/images/the-klog-04.jpg' },
    { type: 'image', url: '/images/the-klog-05.jpg' },
    { type: 'image', url: '/images/the-klog-01.jpg' },
    { type: 'image', url: '/images/the-klog-02.jpg' },
  ],
  'soko-glam': [
    // Section 1: 7 images
    { type: 'image', url: '/images/soko-glam-hero.jpg' },
    { type: 'image', url: '/images/soko-glam-01.jpg' },
    { type: 'image', url: '/images/soko-glam-02.jpg' },
    { type: 'image', url: '/images/soko-glam-03.jpg' },
    { type: 'image', url: '/images/soko-glam-04.jpg' },
    { type: 'image', url: '/images/soko-glam-05.jpg' },
    { type: 'image', url: '/images/soko-glam-01.jpg' }, 
    // Section 2: 7 images
    { type: 'image', url: '/images/soko-glam-01.jpg' }, 
    { type: 'image', url: '/images/soko-glam-02.jpg' },
    { type: 'image', url: '/images/soko-glam-03.jpg' },
    { type: 'image', url: '/images/soko-glam-04.jpg' },
    { type: 'image', url: '/images/soko-glam-05.jpg' },
    { type: 'image', url: '/images/soko-glam-02.jpg' },
    { type: 'image', url: '/images/soko-glam-03.jpg' },
    // Section 3: 2 images
    { type: 'image', url: '/images/soko-glam-01.jpg' }, 
    { type: 'image', url: '/images/soko-glam-02.jpg' }, 
  ],
  'then-i-met-you': [
    { type: 'image', url: '/images/then-i-met-you-hero.jpg' },
    { type: 'image', url: '/images/then-i-met-you-01.jpg' },
    { type: 'image', url: '/images/then-i-met-you-02.jpg' },
    { type: 'image', url: '/images/then-i-met-you-03.jpg' },
    { type: 'image', url: '/images/then-i-met-you-04.jpg' },
    { type: 'image', url: '/images/then-i-met-you-05.jpg' },
  ],
  'pg': []
};

const SOKO_SECTIONS_DATA = [
  {
    title: "CAMPAIGN: BEST OF K-BEAUTY 2020",
    copy: "For Soko Glam’s most anticipated annual campaign, Best of K-Beauty™ 2020, the challenge was to visually distinguish these products as best-in-class leaders.\n\nI defined a clean, architectural visual direction to elevate the product curation. We utilized stark white podiums and geometric staging to create a gallery feel, introducing bold electric blue accents to create a sharp, high-contrast visual language that cut through the noise.",
    credits: "photography: Stephanie chang",
    imgCount: 7
  },
  {
    title: "CAMPAIGN: STRONGER TOGETHER",
    copy: "The 'Stronger Together' campaign was designed to demystify skincare layering, educating customers on how ingredients like Vitamin C and SPF work better in pairs.\n\nTo visualize this 'Power Pairing' concept, I directed a campaign centered on bold color-blocking. We juxtaposed contrasting warm and cool tones to represent the chemical synergy of ingredients.",
    credits: "Photography: Allison Pecca",
    imgCount: 7
  },
  {
    title: "PACKAGING: HOLIDAY ADVENT CALENDAR",
    copy: "For the 2020 holiday season, the goal was to create a luxurious, giftable object that stood apart from traditional seasonal tropes. I designed a limited-edition Advent Calendar inspired by the geometry of Art Deco architecture.\n\nFeaturing intricate gold foil stamping, the packaging transformed the 16-piece curation into a premium unboxing experience.",
    credits: "",
    imgCount: 2
  }
];

interface ProjectDetailProps {
  fontTheme: FontTheme;
  project: Project;
  onNext: () => void;
  nextProjectName: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ fontTheme, project, onNext, nextProjectName }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const isPgProject = project.id === 'pg';
  const isKlog = project.id === 'the-klog';
  const isSoko = project.id === 'soko-glam';
  const isTIMY = project.id === 'then-i-met-you';
  const gallery = PROJECT_GALLERIES[project.id] || [];
  const creditsLabel = project.id === 'the-alden' ? 'STUDIO' : 'Credits';

  const renderMedia = (media: ProjectMedia, index: number, isSquare: boolean = false) => (
    <div key={index} className={`w-full overflow-hidden bg-neutral-100 ${isSquare ? 'aspect-square' : 'aspect-video'}`}>
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
        />
      )}
    </div>
  );

  const renderGallery = () => {
    if (isPgProject) {
      return (
        <div className="mb-40 py-24 border-t border-black/10">
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-medium leading-snug text-neutral-400 italic">
              Due to the confidential nature of unreleased campaigns and intellectual property, selected works are available via private PDF upon request.
            </p>
          </div>
        </div>
      );
    }

    if (gallery.length === 0) return null;

    if (isKlog || isTIMY) {
      const topImages = gallery.slice(0, 4);
      const gridImages = gallery.slice(4);
      return (
        <div className="mb-40 space-y-12">
          <div className="space-y-12">
            {topImages.map((media, index) => renderMedia(media, index))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {gridImages.map((media, index) => renderMedia(media, index + 4, true))}
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
            currentIdx += section.imgCount;

            return (
              <div key={sIdx} className="space-y-16">
                {/* Section Header & Metadata */}
                <div className="border-t border-black/10 pt-16">
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="col-span-1 md:col-span-7">
                      <p className="text-lg md:text-xl font-medium leading-snug text-neutral-600 whitespace-pre-line">
                        {section.copy}
                      </p>
                    </div>
                    {section.credits && (
                      <div className="col-span-1 md:col-span-5 flex flex-col">
                         <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">Credits</span>
                         <span className="font-bold uppercase text-xs leading-relaxed whitespace-pre-line opacity-80">
                           {section.credits}
                         </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Section Images */}
                <div className="space-y-12">
                  {sectionImages.map((media, mIdx) => renderMedia(media, mIdx + currentIdx - section.imgCount))}
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
        <div className={`mb-24 flex flex-col gap-12 ${isPgProject ? '' : 'border-b border-black/5 pb-16'}`}>
          <h1 className="text-[12vw] font-black leading-[0.82] md:leading-[0.78] tracking-tighter uppercase break-words -ml-[0.05em]">
            {project.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
            <div className="col-span-1 md:col-span-6 lg:col-span-7">
               <p className="text-xl md:text-2xl font-medium leading-snug text-neutral-800 max-w-2xl whitespace-pre-line">
                {project.description || "A systematic approach to brand identity that prioritizes modularity and technical precision within digital environments."}
              </p>
            </div>

            {isPgProject ? (
              <>
                <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-8">
                  <div className="flex flex-col border-t border-black/10 pt-4">
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">ROLE</span>
                    <span className="font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.role}</span>
                  </div>
                  <div className="flex flex-col border-t border-black/10 pt-4">
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">FOCUS</span>
                    <span className="font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.focus}</span>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col border-t border-black/10 pt-4">
                  <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">CLIENT LIST</span>
                  <span className="font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.credits}</span>
                </div>
              </>
            ) : (
              <>
                <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-8">
                  <div className="flex flex-col border-t border-black/10 pt-4">
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">DISCIPLINE</span>
                    <span className="font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.role || "Lead Design"}</span>
                  </div>
                </div>

                {/* Conditionally remove Credits */}
                {!isKlog && !isSoko && !isTIMY && (
                  <div className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col border-t border-black/10 pt-4">
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">{creditsLabel}</span>
                    <span className="font-bold uppercase text-xs leading-relaxed whitespace-pre-line">{project.credits || "Internal Project"}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Project Gallery Content */}
        {renderGallery()}
      </div>

      {/* Next Project Footer - Reverted to clean Swiss-style hover animation */}
      <div 
        className={`py-40 border-t border-current/10 group cursor-pointer bg-white text-black transition-all duration-700 ${isPgProject ? 'mt-40' : ''}`} 
        onClick={onNext}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
           <span className="font-sans font-bold text-xs uppercase tracking-[0.5em] mb-12 block opacity-40 transition-opacity group-hover:opacity-100">Next Project</span>
           
           <div className="flex items-center justify-between">
              <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.85] -ml-[0.05em] group-hover:opacity-40 transition-opacity duration-500">
                {nextProjectName}
              </h2>
              <div className="text-[10vw] transition-transform duration-700 group-hover:translate-x-8 leading-none">
                →
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;