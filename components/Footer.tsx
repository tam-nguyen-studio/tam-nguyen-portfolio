import React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer id="contact" className="w-full bg-[#EFF5F7] text-black pt-0 pb-8 h-auto min-h-0 flex flex-col">
      <div className="w-full max-w-[1440px] mx-auto px-[18px] sm:px-[20px] flex flex-col items-center">
        
        {/* Contact Email Callout - Controlled breakpoint-specific spacing */}
        <div className="w-full text-center flex flex-col items-center justify-center gap-0 pt-0 mt-[clamp(80px,10vw,110px)] md:mt-[clamp(112px,12vw,144px)] lg:mt-[clamp(128px,8vw,160px)] mb-[clamp(80px,10vw,110px)] md:mb-[clamp(120px,14vw,160px)] lg:mb-[clamp(140px,10vw,190px)]">
          <p className="font-serif font-normal text-[clamp(22px,6vw,64px)] leading-[0.95] md:leading-[0.86] text-[#224875] mb-0">
            Get in touch at
          </p>
          <a 
            href="mailto:tam@tamnguyen.studio" 
            className="relative inline-block font-serif font-normal text-[clamp(22px,6vw,64px)] leading-[0.95] md:leading-[0.86] mt-0 text-[#224875] group hover:italic focus-visible:italic focus-visible:ring-2 focus-visible:ring-[#224875] focus-visible:outline-none rounded cursor-pointer pb-1 sm:pb-2 transition-[font-style] duration-200 whitespace-nowrap"
            aria-label="Send email to tam@tamnguyen.studio"
          >
            tam@tamnguyen.studio
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] sm:h-[2px] bg-[#224875] transition-transform duration-300 ease-in-out origin-left scale-x-100 group-hover:scale-x-0 group-focus-visible:scale-x-0" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] sm:h-[2px] bg-[#224875] transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 delay-150" />
          </a>
        </div>

        {/* Bottom Metadata Grouping */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Footer Meta Row 1 */}
          <div className="w-full flex justify-between items-end sm:items-center font-serif text-[14px] sm:text-[18px] md:text-[22px] lg:text-[24px] uppercase tracking-normal text-black gap-4">
            <span className="italic leading-[1.15] md:whitespace-nowrap">
              BASED IN<span className="hidden md:inline"> </span>
              <br className="md:hidden" />
              BROOKLYN, NY
            </span>
            <div className="flex items-center gap-4 sm:gap-6 md:gap-10 shrink-0">
              <a 
                href="/images/tam-nguyen-resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all duration-200 cursor-pointer"
              >
                RESUME
              </a>
              <a 
                href="https://www.linkedin.com/in/tamnguyenstudio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:italic focus-visible:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all duration-200 cursor-pointer"
              >
                LINKEDIN
              </a>
            </div>
          </div>

          {/* Footer Meta Row 2 */}
          <div className="w-full border-t-[1.5px] border-b-[1.5px] border-black py-2.5 flex justify-between items-center font-serif text-[12px] sm:text-[13px] md:text-[15px] uppercase tracking-normal text-black">
            <span>© TAM NGUYEN</span>
            <span>2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;