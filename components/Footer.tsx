import React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer 
      id="contact" 
      className="w-full px-4 md:px-8 pt-40 pb-12 transition-colors duration-700 bg-white text-black border-t border-gray-100"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col">
        {/* Simplified Footer - Reduced email size for refinement */}
        <div className="mb-40">
          <span className="block font-sans font-bold text-[10px] uppercase tracking-[0.4em] mb-12 opacity-40">
            Get in touch
          </span>
          
          <div className="flex flex-col">
            <a 
              href="mailto:tam@tamnguyen.studio" 
              className="inline-block text-2xl md:text-[5vw] transition-all hover:opacity-40 break-words font-black tracking-tighter uppercase leading-none border-b-2 md:border-b-4 border-current pb-2 md:pb-4 self-start"
            >
              tam@tamnguyen.studio
            </a>
          </div>
        </div>

        {/* Minimal Copyright Line */}
        <div className="flex justify-between items-center pt-8 border-t border-black/5">
          <span className="font-sans font-bold text-[9px] uppercase tracking-[0.3em] opacity-40">
            © Tam Nguyen
          </span>
          <span className="font-sans font-bold text-[9px] uppercase tracking-[0.3em] opacity-40">
            2026
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;