import { Project, NavItem } from './types';

// Projects reordered as requested: Soko Glam, TIMY, The Klog, Keystone, P&G, The Alden
export const PROJECTS: Project[] = [
  {
    id: 'soko-glam',
    name: 'Soko Glam',
    category: 'CAMPAIGN ART DIRECTION',
    year: '2023',
    imageUrl: '/images/soko-glam-hero.jpg',
    description: "Soko Glam is the leading direct-to-consumer destination for Korean beauty in the US. As a key member of the in-house creative team, I was responsible for evolving the brand's visual language across a high-volume retail calendar. My role spanned campaign art direction, digital design, and packaging, ensuring a cohesive brand experience across every touchpoint.",
    role: 'Art Direction\nDigital Design\nPackaging',
    credits: 'Photographer: Liam Wong. Stylist: Hana Kim.'
  },
  {
    id: 'then-i-met-you',
    name: 'Then I Met You',
    category: 'DIGITAL BRAND EXPERIENCE',
    year: '2022',
    imageUrl: '/images/then-i-met-you-hero.jpg',
    description: "Then I Met You is an award-winning skincare brand rooted in the Korean concept of Jeong, a deep emotional connection to people, places, and things. As a creative partner, I was responsible for translating this tactile, sensory identity into an elevated digital experience.\n\nMy focus was on preserving the brand's premium essence across high-volume touchpoints. From immersive email lifecycle campaigns to social storytelling, I ensured every interaction communicated the brand’s core philosophy of care and connection.",
    role: 'DIGITAL DESIGN\nEMAIL MARKETING\nSOCIAL CONTENT',
    credits: ''
  },
  {
    id: 'the-klog',
    name: 'The Klog',
    category: 'EDITORIAL BRAND SYSTEM',
    year: '2023',
    imageUrl: '/images/the-klog-hero.jpg',
    description: "The Klog needed to evolve from a playful blog into a trusted authority on K-beauty. The goal of the refresh was to balance approachability with expertise, shifting the platform into a legitimate educational resource.\n\nI defined a new visual language using refined typography and a restrained palette to create a sophisticated digital publication. This system was further extended into packaging for launches like the Soft Shield Pimple Patch and Snail Mucin Energy Essence.",
    role: 'VISUAL IDENTITY\nDigital DESIGN\nPACKAGING',
    credits: 'In collaboration with Klog Editorial Team.'
  },
  {
    id: 'keystone',
    name: 'Keystone',
    category: 'Visual Identity Rollout',
    year: '2024',
    imageUrl: '/images/keystone-02.jpg',
    description: 'Keystone is a strategy, economics, and technology consultancy partnering with global brands and law firms to tackle complex challenges at the intersection of business, science, and AI. \n\nFollowing a strategic rebrand, I led the implementation of the new brand identity. I designed web pages, sales presentations, marketing materials, and internal communications, maintaining brand consistency while adapting the system for business needs.',
    role: 'Art Direction\nDigital Design\nMarketing Collateral',
    credits: 'Branding Agency: Otherward\nWeb Agency: Refokus\nPhotography: Michael Simon'
  },
  {
    id: 'pg',
    name: 'Procter & Gamble',
    category: 'PERFORMANCE CREATIVE',
    year: '2023',
    imageUrl: '/images/pg-hero.jpg',
    description: 'Procter & Gamble manages some of the world’s most recognizable consumer portfolios. While at MMI Agency, I executed high-volume digital creative for heritage brands including Gillette, Braun, The Art of Shaving, and P&G Good Everyday.\n\nMy focus was on the intersection of brand consistency and performance marketing. I executed omnichannel creative spanning lifecycle email marketing (CRM), paid and organic social, and web assets. The goal was to translate rigorous brand guidelines into high-converting digital assets that drove engagement without diluting brand equity.',
    role: 'Digital Designer',
    credits: 'Gillette, Braun, The Art of Shaving, joy+glee',
    focus: 'Performance Creative, CRM Design, Paid & Organic Social'
  },
  {
    id: 'the-alden',
    name: 'The Alden',
    category: 'Modern Residential Identity',
    year: '2024',
    imageUrl: '/images/the-alden-hero.jpg',
    description: 'A brand identity concept for a community of modern farmhouse townhomes in Houston, Texas, developed while at MMI Agency. The brief was to create a brand that felt rooted yet elevated, appealing to buyers seeking modern design with natural warmth.\n\nThe identity draws inspiration from the surrounding landscape. I designed a mark that merges organic leaf forms with architectural elements, paired with a color palette of deep forest teal, warm gold, and natural wood tones.',
    role: 'Visual Identity',
    credits: 'MMI Agency'
  }
];

export const NAV_LINKS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const SERVICES = [
  'Art Direction',
  'Brand Identity',
  'Digital Design',
  'Packaging'
];