import { Project, NavItem } from './types';

// Projects reordered: Keystone, Then I Met You, Soko Glam, The Klog, P&G, The Alden
export const PROJECTS: Project[] = [
  {
    id: 'keystone',
    name: 'Keystone',
    category: 'Brand Design',
    year: '2024',
    imageUrl: '/images/keystone-hero.jpg',
    description: "Keystone is a strateg, economics, and technology consultancy partnering with global brands and law firms. As Keystone grew its AI and technology advisory practice, the brand needed to evolve with it.\n\nI joined as sole in-house designer to support a corporate rebrand, owning all visual output — spanning digital, marketing collateral, event materials, and internal communications, while building a sub-brand architecture across the company's practice groups and teams.",
    role: 'Art Direction\nDigital Design\nMarketing Collateral',
    credits: 'Branding Agency: Otherward\nWeb Agency: Refokus\nPhotography: Michael Simon'
  },
  {
    id: 'then-i-met-you',
    name: 'Then I Met You',
    category: 'Digital Design',
    year: '2022',
    imageUrl: '/images/then-i-met-you-hero.jpg',
    description: "Then I Met You is an award-winning skincare brand rooted in the Korean concept of Jeong, a deep emotional connection to people, places, and things.\n\nI led digital design across the brand, translating its tactile, sensory identity into email campaigns, social content, and web touchpoints.",
    role: 'DIGITAL DESIGN\nEMAIL MARKETING\nSOCIAL CONTENT',
    credits: ''
  },
  {
    id: 'soko-glam',
    name: 'Soko Glam',
    category: 'Campaign Art Direction',
    year: '2023',
    imageUrl: '/images/soko-glam-hero.jpg',
    description: "Soko Glam is the leading direct-to-consumer destination for Korean beauty in the US. As the sole in-house designer, I worked closely with the brand and marketing team to drive visual direction across campaigns, digital design, and packaging.",
    role: 'Art Direction\nDigital Design\nPackaging',
    credits: 'Photographer: Liam Wong. Stylist: Hana Kim.'
  },
  {
    id: 'the-klog',
    name: 'The Klog',
    category: 'Brand Refresh',
    year: '2023',
    imageUrl: '/images/the-klog-hero.jpg',
    description: "The Klog needed to evolve from a playful blog into a trusted authority on K-beauty. The goal of the brand refresh was to balance approachability with expertise, shifting the platform into a legitimate educational resource.\n\nI refined the visual language through a more restrained color palette and elevated use of typography and layout, extending the refreshed system into packaging for launches like the Soft Shield Pimple Patch and Snail Mucin Energy Essence.",
    role: 'VISUAL IDENTITY\nDigital DESIGN\nPACKAGING',
    credits: 'In collaboration with Klog Editorial Team.'
  },
  {
    id: 'pg',
    name: 'Procter & Gamble',
    category: 'Performance Creative & CRM',
    year: '2023',
    imageUrl: '/images/pg-hero.jpg',
    description: "While at MMI Agency, I designed digital creative across the P&G portfolio including lifecycle email campaigns, paid and organic social, and web assets for Gillette, Braun, The Art of Shaving, and joy+glee.\n\nThe work was focused on performance creative and CRM, spanning omnichannel product launches, multivariate ad testing, retail calendar campaigns, and social content strategy. For Braun's Series 9 Pro launch, performance creative contributed to the product selling out in 24 hours.",
    role: 'Digital Designer',
    credits: 'Gillette, Braun, The Art of Shaving, joy+glee',
    focus: 'Performance Creative, CRM Design, Paid & Organic Social'
  },
  {
    id: 'the-alden',
    name: 'The Alden',
    category: 'Brand Identity',
    year: '2024',
    imageUrl: '/images/the-alden-hero.jpg',
    description: "A brand identity concept for a community of modern farmhouse townhomes in Houston, Texas. I designed a mark that merges organic leaf forms with architectural elements, grounded in a palette of deep forest teal, warm gold, and natural wood tones, created to feel rooted yet elevated.",
    role: 'Visual Identity',
    credits: 'MMI Agency'
  }
];

export const NAV_LINKS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const SERVICES = [
  'Art Direction',
  'Brand Identity',
  'Digital Design',
  'Packaging'
];