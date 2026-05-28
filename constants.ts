import { Project, NavItem } from './types';

// Projects reordered: Keystone, Soko Glam, Procter & Gamble, Then I Met You, The Klog, The Alden
export const PROJECTS: Project[] = [
  {
    id: 'keystone',
    name: 'Keystone',
    category: 'Brand Design',
    year: '2024',
    imageUrl: '/images/keystone-hero.jpg',
    heroStyle: 'fullbleed',
    objectPosition: 'center center',
    description: "Keystone is a strategy, economics, and technology consultancy partnering with global brands and law firms. As Keystone grew its AI and technology advisory practice, the brand needed to evolve with it.\n\nI joined as sole in-house designer to support a corporate rebrand alongside agency partners, then took ownership of all visual output across the organization spanning website, marketing collateral, sales materials, event materials, and internal communications.",
    role: 'Art Direction\nDigital Design\nMarketing Collateral',
    credits: 'Branding Agency: Otherward\nWeb Agency: Refokus\nPhotography: Michael Simon'
  },
  {
    id: 'soko-glam',
    name: 'Soko Glam',
    category: 'Art Direction',
    year: '2023',
    imageUrl: '/images/soko-glam-hero.jpg',
    heroStyle: 'fullbleed',
    objectPosition: 'center center',
    description: "Soko Glam is the leading direct-to-consumer destination for Korean beauty in the US. As the sole in-house designer, I owned art direction across every campaign — concepting, directing photography, and executing across digital and packaging.",
    role: 'ART DIRECTION\nDIGITAL DESIGN\nPACKAGING',
    credits: ''
  },
  {
    id: 'the-klog',
    name: 'The Klog',
    category: 'Brand Refresh',
    year: '2023',
    imageUrl: '/images/the-klog-hero.jpg',
    heroStyle: 'fullbleed',
    objectPosition: 'center center',
    description: "The Klog needed to evolve from a playful blog into a trusted authority on K-beauty. The goal of the brand refresh was to balance approachability with expertise, shifting the platform into a legitimate educational resource.\n\nI refined the visual language through a more restrained color palette and elevated use of typography and layout, extending the refreshed system into packaging for launches like the Soft Shield Pimple Patch and Snail Mucin Energy Essence.",
    role: 'VISUAL IDENTITY\nDigital DESIGN\nPACKAGING',
    credits: ''
  },
  {
    id: 'bare-skin',
    name: 'Bare Skin',
    category: 'Visual Identity',
    year: '2025',
    imageUrl: '/images/bare-skin-01.jpg',
    heroStyle: 'fullbleed',
    objectPosition: 'center center',
    description: "A visual identity concept for a skincare brand with one radical constraint — five products, nothing more. A brand built to stand apart from a category that never stops adding. Blackletter meets Swiss grid, clinical skincare with a point of view. Dark packaging, warm documentary photography, copy that doesn't explain itself.",
    role: 'visual identity\nArt direction\nDigital design\npackaging',
    credits: 'Claude, ChatGPT, Nano Banana, Adobe Firefly'
  },
  {
    id: 'then-i-met-you',
    name: 'Then I Met You',
    category: 'Digital Design',
    year: '2022',
    imageUrl: '/images/then-i-met-you-hero.jpg',
    heroStyle: 'fullbleed',
    objectPosition: 'center top',
    description: "Then I Met You is an award-winning skincare brand rooted in Jeong, the Korean concept of a deep emotional connection to people, places, and things.\n\nThe challenge was translating something inherently tactile and sensory into digital formats. I led design across email, social, and web — making sure the brand felt as considered on screen as it did in hand.",
    role: 'DIGITAL DESIGN\nEMAIL MARKETING\nSOCIAL CONTENT',
    credits: ''
  },
  {
    id: 'the-alden',
    name: 'The Alden',
    category: 'Visual Identity',
    year: '2024',
    imageUrl: '/images/the-alden-hero.jpg',
    heroStyle: 'fullbleed',
    objectPosition: 'center center',
    description: "A visual identity concept for a community of modern farmhouse townhomes in Houston, Texas. I designed a mark that merges organic leaf forms with architectural elements, grounded in a palette of deep forest teal, warm gold, and natural wood tones, created to feel rooted yet elevated.",
    role: 'Visual Identity',
    credits: 'MMI Agency'
  },
  {
    id: 'pg',
    name: 'Procter & Gamble',
    category: 'Performance Creative & CRM',
    year: '2023',
    imageUrl: '/images/pg-hero.jpg',
    heroStyle: 'fullbleed',
    objectPosition: 'center center',
    description: "While at MMI Agency, I designed digital creative across the P&G portfolio including lifecycle email campaigns, paid and organic social, and web assets for Gillette, Braun, The Art of Shaving, and joy+glee.\n\nThe work was focused on performance creative and CRM, spanning omnichannel product launches, multivariate ad testing, retail calendar campaigns, and social content strategy. For Braun's Series 9 Pro launch, performance creative contributed to the product selling out in 24 hours.",
    role: 'Performance Creative\nCRM Design\nPaid & Organic Social',
    credits: 'Gillette, Braun, The Art of Shaving, joy+glee'
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