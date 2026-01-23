import React from 'react';

interface HeroProps {
  onScrollToWork: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToWork }) => {
  return (
    <section className="relative w-full min-h-screen pt-40 md:pt-60 pb-20 px-4 md:px-8 flex flex-col bg-white text-black overflow-hidden">
      <div className="max-w-screen-2xl mx-auto w-full flex-1 flex flex-col relative z-10">
        {/* Top Header Grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-4 mb-20 border-t border-black/5 pt-4 items-start">
          <div className="col-span-2 md:col-span-4 flex">
            <button 
              onClick={onScrollToWork}
              className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity text-left leading-none p-0 bg-transparent border-none appearance-none"
            >
              Selected Projects
            </button>
          </div>
          <div className="hidden md:block md:col-span-4">
            {/* Middle section cleared as requested */}
          </div>
          <div className="col-span-2 md:col-span-4 font-sans font-bold text-[10px] uppercase tracking-widest opacity-40 text-right leading-none">
            Based in NYC
          </div>
        </div>

        {/* Main Title Row */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-4 flex-1">
          <div className="col-span-4 md:col-span-10">
            <h1 className="font-black text-[16vw] md:text-[13vw] leading-[0.78] tracking-[-0.06em] uppercase">
              <span>Design</span> <br />
              <span className="md:ml-[10vw]">& Art</span> <br />
              <span>Direction</span>
            </h1>
          </div>
          
          <div className="col-span-4 md:col-span-2 flex md:flex-col justify-end md:justify-start items-end md:items-start gap-4 md:pt-12">
            <div className="w-12 h-12 md:w-16 md:h-16 border border-black rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xl">↓</span>
            </div>
            {/* Specializing text removed as requested */}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-4 md:grid-cols-12 gap-4 border-b border-black/5 pb-4">
           <div className="col-span-4 md:col-span-8">
              {/* Left footer area */}
           </div>
           <div className="hidden md:block md:col-span-4 text-right">
              {/* Spacer */}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;