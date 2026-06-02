import React from 'react';
import { motion } from 'motion/react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer 
      className="w-full bg-transparent text-swiss-black"
    >
      <div className="w-full px-[20px]">
        <div className="w-full border-t border-swiss-border pt-[8px] pb-[20px] flex justify-between items-center">
          <span className="font-sans font-normal text-[11px] uppercase tracking-[0.12em] text-[#666] leading-none">
            © TAM NGUYEN
          </span>
          <span className="font-sans font-normal text-[11px] uppercase tracking-[0.12em] text-[#666] leading-none">
            2026
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;