import React from 'react';
import { FontTheme } from '../App';

interface FooterProps {
  fontTheme: FontTheme;
}

const Footer: React.FC<FooterProps> = ({ fontTheme }) => {
  return (
    <footer 
      id="contact" 
      className="w-full px-4 md:px-8 pt-40 pb-12 transition-colors duration-700 bg-white text-black border-t border-gray-100"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col">
        {/* Unified Call to Action Block */}
        <div className="mb-40">
          <span className="block font-sans font-bold text-[10px] uppercase tracking-[0.4em] mb-12 opacity-40">
            Get in touch
          </span>
          
          <div className="flex flex-col gap-6 md:gap-8">
            <h2 className="font-black text-7xl md:text-[11vw] leading-[0.75] tracking-tighter uppercase">
              Connect
            </h2>
            <a 
              href="mailto:tam@tamnguyen.studio" 
              className="inline-block text-2xl md:text-[5vw] transition-all hover:opacity-40 break-words font-black tracking-tighter uppercase leading-none border-b-2 md:border-b-4 border-current pb-2 md:pb-3 self-start"
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
            2025
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;