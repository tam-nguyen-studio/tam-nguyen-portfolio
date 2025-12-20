import React from 'react';
import { PROJECTS } from '../constants';
import { FontTheme } from '../App';

interface WorkProps {
  fontTheme: FontTheme;
  onProjectSelect: (id: string) => void;
}

const Work: React.FC<WorkProps> = ({ fontTheme, onProjectSelect }) => {
  return (
    <section id="work" className="w-full px-4 md:px-8 py-20 bg-white">
      {/* Adjusted to 2 columns to allow the 16:9 landscape aspect ratio to breathe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        {PROJECTS.map((project) => (
          <div 
            key={project.id} 
            onClick={() => onProjectSelect(project.id)}
            className="group flex flex-col cursor-pointer"
          >
            {/* 
              Changed aspect ratio from 4:5 to video (16:9 / 1920x1080 ratio).
              The shadow and transition effects are maintained for high-end feel.
            */}
            <div className="relative aspect-video overflow-hidden bg-gray-50 mb-8 transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
              />
            </div>
            <div className="flex justify-between items-baseline border-t border-black/5 pt-4">
              <h3 className="font-black text-2xl tracking-tighter uppercase leading-none">
                {project.name}
              </h3>
              <p className="font-sans font-bold text-[10px] uppercase tracking-widest text-gray-400">
                {project.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;