import React, { useEffect } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onNext: () => void;
  onViewAllProjects?: () => void;
  onBackHome?: () => void;
  nextProjectName?: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onNext,
  onViewAllProjects,
  onBackHome,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const handleViewAllProjects = () => {
    if (onViewAllProjects) {
      onViewAllProjects();
    } else if (onBackHome) {
      onBackHome();
    }
  };

  const descriptionParagraphs = Array.isArray(project.description)
    ? project.description
    : project.description
    ? project.description.split('\n\n').filter(Boolean)
    : [];

  const heroImageSrc = project.heroImage || project.imageUrl;

  return (
    <article className="w-full text-black bg-[#EFF5F7]">
      {/* 1. Full-width project hero */}
      <div className="w-full overflow-hidden bg-neutral-300">
        <img
          src={heroImageSrc}
          alt={`${project.name} hero`}
          className="block w-full h-[clamp(280px,42vw,640px)] object-cover"
          style={{ objectPosition: project.objectPosition || 'center center' }}
        />
      </div>

      {/* 2. Introduction section */}
      <section className="w-full px-[18px] sm:px-[20px] pt-[clamp(24px,3vw,42px)] pb-[clamp(48px,5vw,64px)]">
        {/* Title and category */}
        <div className="flex flex-wrap items-baseline gap-x-[clamp(14px,2vw,28px)] gap-y-2">
          <h1 className="m-0 font-serif font-normal text-[clamp(32px,4.2vw,64px)] leading-[0.95] tracking-[-0.025em] text-black">
            {project.name}
          </h1>

          <p className="m-0 font-serif italic text-[clamp(18px,2vw,30px)] leading-none text-black">
            {project.category}
          </p>
        </div>

        {/* Description and metadata */}
        <div className="mt-[clamp(24px,3vw,40px)] grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(220px,0.75fr)] gap-y-10 gap-x-[clamp(48px,8vw,140px)] items-start">
          {/* Left column */}
          <div className="max-w-[760px] font-sans text-[14px] md:text-[15px] lg:text-[16px] leading-[1.35] text-black space-y-4">
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Right column */}
          <aside className="font-sans text-[11px] md:text-[12px] leading-[1.35]">
            {project.role && (
              <div className="mb-6">
                <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                  ROLE
                </h2>
                <p>{project.role}</p>
              </div>
            )}

            {project.scope && project.scope.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                  SCOPE
                </h2>
                {project.scope.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}

            {project.collaborators && project.collaborators.length > 0 && (
              <div>
                <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                  COLLABORATORS
                </h2>
                {project.collaborators.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* 3. Existing project media */}
      <div className="w-full px-[18px] sm:px-[20px] flex flex-col gap-[clamp(48px,6vw,64px)]">
        {project.confidentialNotice ? (
          <div className="my-10 py-10 border-y border-black/10">
            <p className="font-serif font-normal text-[clamp(24px,3.5vw,48px)] leading-[1.0] text-black/30 tracking-[-0.01em] max-w-5xl">
              {project.confidentialNotice}
            </p>
          </div>
        ) : (
          project.sections?.map((section, sIdx) => (
            <div key={sIdx} className="flex flex-col">
              {section.title && (
                <h2 className="mb-4 font-serif text-[14px] md:text-[16px] uppercase tracking-normal text-black">
                  {section.title}
                </h2>
              )}

              {(section.description || (section.collaborators && section.collaborators.length > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(220px,0.75fr)] gap-y-6 gap-x-[clamp(48px,8vw,140px)] items-start mb-[clamp(40px,4vw,56px)]">
                  <div className="max-w-[65ch] font-sans text-[14px] md:text-[15px] lg:text-[16px] leading-[1.35] text-black space-y-4">
                    {section.description?.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                    {section.link && (
                      <a
                        href={section.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-black underline underline-offset-4 hover:opacity-60 transition-opacity font-sans font-normal text-[11px] uppercase tracking-[0.12em]"
                      >
                        {section.link.text}
                      </a>
                    )}
                  </div>

                  {section.collaborators && section.collaborators.length > 0 && (
                    <aside className="font-sans text-[11px] md:text-[12px] leading-[1.35]">
                      <h3 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                        CREDITS
                      </h3>
                      {section.collaborators.map((c, cIdx) => (
                        <p key={cIdx}>{c}</p>
                      ))}
                    </aside>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-[12px] md:gap-[16px]">
                {section.mediaGroups.map((group, gIdx) => {
                  if (group.type === 'grid') {
                    return (
                      <div
                        key={gIdx}
                        className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[16px]"
                      >
                        {group.items.map((item, iIdx) => (
                          <figure key={iIdx} className="w-full m-0 overflow-hidden">
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="block w-full h-auto"
                              loading="lazy"
                            />
                          </figure>
                        ))}
                      </div>
                    );
                  }

                  return group.items.map((item, iIdx) => (
                    <figure key={iIdx} className="w-full m-0 overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="block w-full h-auto"
                        loading="lazy"
                      />
                    </figure>
                  ));
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. Bottom navigation */}
      <nav
        aria-label="Project navigation"
        className="w-full px-[18px] sm:px-[20px] mt-3 md:mt-4 py-0 flex items-center justify-between font-serif text-[14px] md:text-[16px] uppercase"
      >
        <button
          type="button"
          onClick={handleViewAllProjects}
          className="hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black cursor-pointer"
        >
          ALL PROJECTS
        </button>

        <button
          type="button"
          onClick={onNext}
          className="hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black cursor-pointer"
        >
          NEXT PROJECT
        </button>
      </nav>
    </article>
  );
};

export default ProjectDetail;
