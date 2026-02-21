import React, { useEffect } from 'react';
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
    // Section 1: 7 items (hero + 01 to 06)
    { type: 'image', url: '/images/soko-glam-hero.jpg' },
    { type: 'image', url: '/images/soko-glam-01.jpg' },
    { type: 'image', url: '/images/soko-glam-02.jpg' },
    { type: 'image', url: '/images/soko-glam-03.jpg' },
    { type: 'image', url: '/images/soko-glam-04.jpg' },
    { type: 'image', url: '/images/soko-glam-05.jpg' },
    { type: 'image', url: '/images/soko-glam-06.jpg' }, 
    // Section 2: 2 items (07 to 08)
    { type: 'image', url: '/images/soko-glam-07.jpg' }, 
    { type: 'image', url: '/images/soko-glam-08.jpg' },
    // Section 3: 2 items (14 to 15)
    { type: 'image', url: '/images/soko-glam-09.jpg' }, 
    { type: 'image', url: '/images/soko-glam-10.jpg' }, 
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
    title: "CAMPAIGN: BEST OF K-BEAUTY",
    copy: "For Soko Glam’s most anticipated annual campaign, Best of K-Beauty™, the challenge was to visually distinguish these products as best-in-class leaders.\n\nI defined a clean, architectural visual direction to elevate the product curation. We utilized stark white podiums and geometric staging to create a gallery feel, introducing bold electric blue accents to create a sharp, high-contrast visual language that cut through the noise.",
    credits: "photography: Stephanie chang",
    imgCount: 7
  },
  {
    title: "Digital Design",
    copy: "Landing pages designed responsively across desktop and mobile.",
    credits: "",
    imgCount: 2
  },
  {
    title: "PACKAGING: HOLIDAY ADVENT CALENDAR",
    copy: "For the 2020 holiday season, the goal was to create a luxurious, giftable object that stood apart from traditional seasonal tropes. I designed a limited-edition Advent Calendar inspired by the geometry of Art Deco architecture.\n\nFeaturing intricate gold foil stamping, the packaging transformed the 16-piece curation into a premium unboxing experience.",
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
        <div className={`mb-24 flex flex-col gap-12 ${(isPgProject || isSoko) ? '' : 'border-b border-black/5 pb-16'}`}>
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

                {/* Conditionally remove Credits for specific campaigns, but include for Keystone */}
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