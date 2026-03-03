import { Project, NavItem } from './types';

// Projects reordered: Keystone, Then I Met You, Soko Glam, The Klog, P&G, The Alden
export const PROJECTS: Project[] = [
  {
    id: 'keystone',
    name: 'Keystone',
    category: 'Visual Identity Rollout',
    year: '2024',
    imageUrl: '/images/keystone-01.jpg',
    description: "Keystone is a strategy, economics, and technology consultancy partnering with global brands and law firms to tackle complex business and legal challenges.\n\nAs the company's focus on AI and technology grew, I joined as the sole in-house designer to lead the rollout of a new visual identity. Working alongside Otherward on the identity and Refokus on the initial website, I led design across the full system, designing web pages, sales presentations, event materials, and internal communications, while building out a sub-brand architecture across the company's practice groups and teams.",
    role: 'Art Direction\nDigital Design\nMarketing Collateral',
    credits: 'Branding Agency: Otherward\nWeb Agency: Refokus\nPhotography: Michael Simon'
  },
  {
    id: 'then-i-met-you',
    name: 'Then I Met You',
    category: 'DIGITAL BRAND EXPERIENCE',
    year: '2022',
    imageUrl: '/images/then-i-met-you-hero.jpg',
    description: "Then I Met You is an award-winning skincare brand rooted in the Korean concept of Jeong, a deep emotional connection to people, places, and things.\n\nI led digital design across the brand, translating its tactile, sensory identity into email campaigns, social content, and web touchpoints, while also contributing to packaging design for new product launches.",
    role: 'DIGITAL DESIGN\nEMAIL MARKETING\nSOCIAL CONTENT',
    credits: ''
  },
  {
    id: 'soko-glam',
    name: 'Soko Glam',
    category: 'CAMPAIGN ART DIRECTION',
    year: '2023',
    imageUrl: '/images/soko-glam-04.jpg',
    description: "Soko Glam is the leading direct-to-consumer destination for Korean beauty in the US. As the sole in-house designer, I worked closely with the brand and marketing team to drive visual direction across campaigns, digital design, and packaging.",
    role: 'Art Direction\nDigital Design\nPackaging',
    credits: 'Photographer: Liam Wong. Stylist: Hana Kim.'
  },
  {
    id: 'the-klog',
    name: 'The Klog',
    category: 'EDITORIAL BRAND SYSTEM',
    year: '2023',
    imageUrl: '/images/the-klog-hero.jpg',
    description: "The Klog needed to evolve from a playful blog into a trusted authority on K-beauty. The goal of the brand refresh was to balance approachability with expertise, shifting the platform into a legitimate educational resource.\n\nWorking within the existing brand guidelines, I refined the visual language by paring down the color palette for a more elevated feel and introducing more editorial typography and layouts. Our team redesigned the website, bringing the refreshed identity to life across the platform. The result was a more sophisticated digital publication, a system I extended into packaging for launches like the Soft Shield Pimple Patch and Snail Mucin Energy Essence.",
    role: 'VISUAL IDENTITY\nDigital DESIGN\nPACKAGING',
    credits: 'In collaboration with Klog Editorial Team.'
  },
  {
    id: 'pg',
    name: 'Procter & Gamble',
    category: 'PERFORMANCE CREATIVE',
    year: '2023',
    imageUrl: '/images/pg-hero.jpg',
    description: "Procter & Gamble manages some of the world's most recognizable consumer brands. While at MMI Agency, I designed digital creative across the P&G portfolio, including lifecycle email campaigns, paid and organic social, and web assets for Gillette, Braun, The Art of Shaving, and Joy+Glee.\n\nWorking within established brand guidelines, I designed both original assets and campaign extensions, balancing brand consistency with the demands of high-volume digital production.",
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
    description: "A brand identity concept for a community of modern farmhouse townhomes in Houston, Texas. The brief was to create a brand that felt rooted yet elevated, appealing to buyers seeking modern design with natural warmth.\n\nThe identity draws inspiration from the surrounding landscape. I designed a mark that merges organic leaf forms with architectural elements, paired with a color palette of deep forest teal, warm gold, and natural wood tones.",
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