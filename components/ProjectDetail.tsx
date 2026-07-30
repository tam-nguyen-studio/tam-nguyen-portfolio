import React, { useEffect } from 'react';
import { Project } from '../types';
import ImageWithFade from './ImageWithFade';
import ProjectFooter from './ProjectFooter';

interface ProjectDetailProps {
  project: Project;
  onNext: () => void;
  onViewAllProjects?: () => void;
  onBackHome?: () => void;
  nextProjectName?: string;
}

const formatNonBreaking = (str: string) => {
  if (!str) return '';
  return str.replace(/in-house/gi, 'in\u2011house');
};

const RightRailWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full md:flex md:justify-end">
    <div className="w-full md:w-[220px] lg:w-[240px] text-left">
      {children}
    </div>
  </div>
);

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onNext,
  onViewAllProjects,
  onBackHome,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
      <div className="w-full overflow-hidden bg-black/5">
        <ImageWithFade
          src={heroImageSrc}
          alt={`${project.name} hero`}
          className="block w-full h-[clamp(280px,42vw,640px)] object-cover"
          style={{ objectPosition: project.objectPosition || 'center center' }}
          loading="eager"
        />
      </div>

      {/* Content layout wrapper */}
      <div className="w-full px-[18px] sm:px-[20px] pt-[clamp(24px,3vw,42px)] pb-0">
        {/* 2. Title and discipline row */}
        <div className="grid grid-cols-1 md:grid-cols-[68%_1fr] gap-x-[clamp(20px,3vw,40px)] gap-y-2 w-full pb-[clamp(24px,3vw,40px)] items-baseline">
          <h1 className="m-0 font-serif font-normal text-[clamp(32px,4.2vw,64px)] leading-[0.95] tracking-[-0.025em] text-black">
            {project.name}
          </h1>

          <RightRailWrapper>
            <p className="m-0 font-serif italic text-[clamp(20px,2.2vw,33px)] leading-none text-black">
              {project.category}
            </p>
          </RightRailWrapper>
        </div>

        {/* 3. Overview + Metadata two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-[68%_1fr] gap-x-[clamp(20px,3vw,40px)] gap-y-8 items-start pb-0">
          {/* Left column: Overview */}
          <div className="font-sans text-[14px] md:text-[15px] lg:text-[16px] leading-[1.35] text-black space-y-4 max-w-[640px]">
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{formatNonBreaking(paragraph)}</p>
            ))}
          </div>

          {/* Right column: Role, Scope, Collaborators */}
          <RightRailWrapper>
            <aside className="font-sans text-[11px] md:text-[12px] leading-[1.35] space-y-6">
              {project.role && (
                <div>
                  <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                    ROLE
                  </h2>
                  <p>{formatNonBreaking(project.role)}</p>
                </div>
              )}

              {project.scope && project.scope.length > 0 && (
                <div>
                  <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                    SCOPE
                  </h2>
                  {project.scope.map((item) => (
                    <p key={item}>{formatNonBreaking(item)}</p>
                  ))}
                </div>
              )}

              {project.collaborators && project.collaborators.length > 0 && (
                <div>
                  <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                    COLLABORATORS
                  </h2>
                  {project.collaborators.map((item) => (
                    <p key={item}>{formatNonBreaking(item)}</p>
                  ))}
                </div>
              )}

              {project.agency && (
                <div>
                  <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                    AGENCY
                  </h2>
                  {Array.isArray(project.agency) ? (
                    project.agency.map((item) => (
                      <p key={item}>{formatNonBreaking(item)}</p>
                    ))
                  ) : (
                    <p>{formatNonBreaking(project.agency)}</p>
                  )}
                </div>
              )}

              {project.brands && (
                <div>
                  <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                    BRANDS
                  </h2>
                  {Array.isArray(project.brands) ? (
                    project.brands.map((item) => (
                      <p key={item}>{formatNonBreaking(item)}</p>
                    ))
                  ) : (
                    <p>{formatNonBreaking(project.brands)}</p>
                  )}
                </div>
              )}

              {project.tools && project.tools.length > 0 && (
                <div>
                  <h2 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                    TOOLS
                  </h2>
                  {project.tools.map((item) => (
                    <p key={item}>{formatNonBreaking(item)}</p>
                  ))}
                </div>
              )}
            </aside>
          </RightRailWrapper>
        </div>

        {/* 4. Chapters / Sections */}
        {project.confidentialNotice ? (
          <div className="mt-[56px] md:mt-[48px] lg:mt-[56px] py-10 border-y border-black/10">
            <p className="font-serif font-normal text-[clamp(24px,3.5vw,48px)] leading-[1.0] text-black/30 tracking-[-0.01em]">
              {formatNonBreaking(project.confidentialNotice)}
            </p>
          </div>
        ) : (
          <div className="mt-[56px] md:mt-[48px] lg:mt-[56px] flex flex-col gap-[clamp(48px,6vw,80px)]">
            {project.sections?.map((section, sIdx) => (
              <div key={sIdx} className="flex flex-col">
                {/* Chapter header grid (Left: title & description, Right: credits) */}
                <div className="grid grid-cols-1 md:grid-cols-[68%_1fr] gap-x-[clamp(20px,3vw,40px)] gap-y-6 items-start mb-6 md:mb-8">
                  <div className="font-sans text-[14px] md:text-[15px] lg:text-[16px] leading-[1.35] text-black max-w-[640px]">
                    {section.title && (
                      <h2 className="mb-3 font-serif text-[15px] md:text-[18px] uppercase tracking-normal text-black font-normal">
                        {section.title}
                      </h2>
                    )}

                    {section.description && section.description.length > 0 && (
                      <div className="space-y-4">
                        {section.description.map((p, pIdx) => (
                          <p key={pIdx}>{formatNonBreaking(p)}</p>
                        ))}
                      </div>
                    )}

                    {section.link && (
                      <div className="mt-4">
                        <a
                          href={section.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-black underline underline-offset-4 hover:opacity-60 transition-opacity font-sans font-normal text-[11px] uppercase tracking-[0.12em]"
                        >
                          {section.link.text}
                        </a>
                      </div>
                    )}
                  </div>

                  <RightRailWrapper>
                    {section.collaborators && section.collaborators.length > 0 ? (
                      <aside className="font-sans text-[11px] md:text-[12px] leading-[1.35]">
                        <h3 className="mb-1 text-[#224875] uppercase font-sans text-[11px] md:text-[12px] font-normal tracking-normal">
                          CREDITS
                        </h3>
                        {section.collaborators.map((c, cIdx) => (
                          <p key={cIdx}>{formatNonBreaking(c)}</p>
                        ))}
                      </aside>
                    ) : null}
                  </RightRailWrapper>
                </div>

                {/* Chapter media */}
                <div className="flex flex-col gap-[12px] md:gap-[16px] w-full">
                  {section.mediaGroups.map((group, gIdx) => {
                    if (group.type === 'grid') {
                      return (
                        <div
                          key={gIdx}
                          className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[16px] w-full"
                        >
                          {group.items.map((item, iIdx) => (
                            <figure key={iIdx} className="w-full m-0 overflow-hidden">
                              <ImageWithFade
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
                        <ImageWithFade
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
            ))}
          </div>
        )}

        {/* Process Note & Disclaimer */}
        {(project.processNote || project.disclaimer) && (
          <div className="mt-[48px] md:mt-[64px] pb-4 flex flex-col gap-1.5 font-sans text-[12px] md:text-[13px] leading-relaxed max-w-[440px]">
            {project.processNote && (
              <p className="m-0 text-black/70 font-normal">{formatNonBreaking(project.processNote)}</p>
            )}
            {project.disclaimer && (
              <p className="m-0 text-black/40 italic font-normal">{formatNonBreaking(project.disclaimer)}</p>
            )}
          </div>
        )}
      </div>

      {/* 5. Project Footer */}
      <ProjectFooter
        onViewAllProjects={handleViewAllProjects}
        onNext={onNext}
      />
    </article>
  );
};

export default ProjectDetail;
