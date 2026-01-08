import React from 'react';
import { SERVICES } from '../constants';

const RESUME_URL = '/images/tam-nguyen-resum.pdf';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <section id="about" className="w-full px-4 md:px-8 py-32 md:py-60 transition-colors duration-700 bg-white text-black border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4">
          <div className="col-span-1 md:col-span-7">
            <span className="block font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-12 opacity-50">
              Introduction
            </span>
            <p className="font-black text-6xl md:text-[10vw] leading-[0.85] tracking-tighter mb-12 uppercase">
              <span>BUILDING BRAND</span> <br/> 
              <span>WORLDS</span>
            </p>
            <div className="text-lg md:text-2xl text-neutral-500 font-medium max-w-2xl leading-snug space-y-8">
              <p>
                I’m a multidisciplinary creative partnering with modern brands to define their visual presence. With over 8 years of experience spanning D2C beauty, global CPG, and enterprise technology, I focus on the intersection of Brand Systems and Art Direction.
              </p>
              <p>
                I translate strategic goals into clean, distinct visual identities that work across digital, packaging, and campaigns.
              </p>
              
              <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8">
                <a 
                  href={RESUME_URL} 
                  className="group flex items-center gap-3 font-sans font-bold text-[11px] uppercase tracking-[0.2em] hover:opacity-40 transition-all"
                  download
                >
                  <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-500"></span>
                  Download Resume
                </a>
                <a 
                  href="https://www.linkedin.com/in/tamnguyenstudio/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-3 font-sans font-bold text-[11px] uppercase tracking-[0.2em] hover:opacity-40 transition-all"
                >
                  <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-500"></span>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 md:col-start-9 mt-12 md:mt-0">
            <span className="block font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-12 opacity-50">
              Capabilities
            </span>
            <ul className="space-y-6">
              {SERVICES.map((service, idx) => (
                <li key={service} className="flex items-center gap-4 group">
                  <span className="font-sans font-bold text-[10px] opacity-30">0{idx + 1}</span>
                  <span className={`text-2xl md:text-4xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2`}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;