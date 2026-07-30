import React from 'react';
import { PROJECTS } from '../constants';

interface ProjectIndexProps {
  onProjectSelect: (id: string) => void;
}

const ProjectIndex: React.FC<ProjectIndexProps> = ({
  onProjectSelect,
}) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onProjectSelect(id);
    }
  };

  return (
    <section
      aria-labelledby="project-index-heading"
      className="w-full px-[18px] sm:px-[20px] pt-[clamp(100px,12vw,148px)]"
    >
      <h1
        id="project-index-heading"
        className="m-0 text-center font-serif font-normal text-[18px] md:text-[22px] lg:text-[24px] leading-none text-black"
      >
        (WORK)
      </h1>

      <div className="w-full mt-[clamp(72px,10vw,112px)] border-t-[1.5px] border-black">
        {PROJECTS.map((project, index) => {
          const projectNumber = String(index + 1).padStart(2, '0');

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onProjectSelect(project.id)}
              onKeyDown={(event) => handleKeyDown(event, project.id)}
              aria-label={`View ${project.name} project`}
              className="w-full m-0 pt-[clamp(18px,2vw,28px)] pb-[clamp(38px,3.5vw,56px)] border-0 border-b-[1.5px] border-black bg-transparent text-left grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 md:gap-x-10 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
            >
              <span className="min-w-0 flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-baseline md:gap-x-[clamp(20px,2.5vw,40px)] md:gap-y-2">
                <span className="font-serif font-normal text-[clamp(32px,4.3vw,68px)] leading-[0.95] tracking-[-0.025em] text-black not-italic group-hover:italic group-focus-visible:italic transition-[font-style] duration-200">
                  {project.name}
                </span>

                <span className="font-serif italic text-[clamp(18px,2.2vw,34px)] leading-[1.05] text-black group-hover:not-italic group-focus-visible:not-italic transition-[font-style] duration-200">
                  {project.category}
                </span>
              </span>

              <span className="font-serif font-normal text-[clamp(28px,4vw,64px)] leading-[0.95] tabular-nums text-black whitespace-nowrap">
                {projectNumber}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectIndex;
