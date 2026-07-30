import { Project, NavItem } from './types';

// Projects reordered: Keystone, Soko Glam, The Klog, Bare Skin, Then I Met You, The Alden, Procter & Gamble
export const PROJECTS: Project[] = [
  {
    id: 'keystone',
    name: 'Keystone',
    category: 'Brand Design',
    year: '2024',
    imageUrl: '/images/keystone-hero.jpg',
    heroImage: '/images/keystone-hero.jpg',
    objectPosition: 'center center',
    description: [
      "Keystone is a strategy, economics, and technology consultancy partnering with global brands and law firms. As Keystone grew its AI and technology advisory practice, the brand needed to evolve with it.",
      "I joined as sole in-house designer to support a corporate rebrand, owning all visual output — spanning digital, marketing collateral, event materials, and internal communications, while building a sub-brand architecture across the company's practice groups and teams."
    ],
    role: 'Brand Marketing Designer',
    scope: ['Brand systems', 'Digital design', 'Editorial'],
    collaborators: ['Otherward — Identity', 'Refokus — Web', 'Michael Simon — Photography'],
    sections: [
      {
        title: '01 — WEB & DIGITAL',
        description: [
          "I applied Keystone’s refreshed identity across responsive web pages, mobile touchpoints, services content, recruiting communications, and team profiles. The system brought greater clarity and consistency to a complex professional-services offering while maintaining the firm’s institutional credibility."
        ],
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/keystone-02.jpg', alt: 'Deep Enterprise AI Platform desktop homepage' }] },
          { type: 'single', items: [{ src: '/images/keystone-03.jpg', alt: 'Mobile website shown on phone held in hand' }] },
          { type: 'single', items: [{ src: '/images/keystone-04.jpg', alt: 'Services or capabilities webpage' }] },
          { type: 'single', items: [{ src: '/images/keystone-05.jpg', alt: 'Careers or recruiting webpage shown on laptop' }] },
          { type: 'single', items: [{ src: '/images/keystone-06.jpg', alt: 'Team portrait grid' }] }
        ]
      },
      {
        title: '02 — THOUGHT LEADERSHIP & COMMUNICATIONS',
        description: [
          "I developed a cohesive visual system for Keystone’s research and communications across reports, guides, digital content, and LinkedIn. Reusable templates helped teams publish consistently while adapting to different topics, formats, and audiences."
        ],
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/keystone-07.jpg', alt: 'Purple-and-white digital content cards' }] },
          { type: 'single', items: [{ src: '/images/keystone-10.jpg', alt: 'Multi-format article, report or publishing-system composition' }] },
          {
            type: 'grid',
            items: [
              { src: '/images/keystone-08.jpg', alt: 'Green editorial guide cover 1' },
              { src: '/images/keystone-09.jpg', alt: 'Green editorial guide cover 2' }
            ]
          },
          { type: 'single', items: [{ src: '/images/keystone-11.jpg', alt: 'White-paper or report-page mockup' }] },
          { type: 'single', items: [{ src: '/images/keystone-12.jpg', alt: 'Two black LinkedIn posts two-up composition' }] }
        ]
      }
    ]
  },
  {
    id: 'soko-glam',
    name: 'Soko Glam',
    category: 'Art Direction',
    year: '2023',
    imageUrl: '/images/soko-glam-hero.jpg',
    heroImage: '/images/soko-glam-hero.jpg',
    objectPosition: 'center center',
    description: [
      "Soko Glam is the leading direct-to-consumer destination for Korean beauty in the US. As the sole in-house designer, I owned art direction across every campaign — concepting, directing photography, and executing across digital and packaging."
    ],
    role: 'Sole In-House Designer',
    scope: ['Art direction', 'Digital design', 'Packaging'],
    collaborators: [],
    sections: [
      {
        title: 'BEST OF K-BEAUTY® 2020',
        description: [
          "For Soko Glam's most anticipated annual campaign, I defined a clean, architectural visual direction to position the featured products as best-in-class. Stark white podiums, geometric staging, and bold electric blue accents created a gallery feel and a sharp, high-contrast visual language."
        ],
        collaborators: ['Photography: Stephanie Chang'],
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/soko-glam-01.jpg', alt: 'Soko Glam 01' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-02.jpg', alt: 'Soko Glam 02' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-03.jpg', alt: 'Soko Glam 03' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-04.jpg', alt: 'Soko Glam 04' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-05.jpg', alt: 'Soko Glam 05' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-06.jpg', alt: 'Soko Glam 06' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-07.jpg', alt: 'Soko Glam 07' }] }
        ]
      },
      {
        title: 'STRONGER TOGETHER',
        description: [
          "The 'Stronger Together' campaign was designed to demystify skincare layering, educating customers on how ingredients like Vitamin C and SPF work better in pairs.",
          "To visualize this 'Power Pairing' concept, I directed a campaign centered on bold color-blocking. We juxtaposed contrasting warm and cool tones to represent the chemical synergy of ingredients."
        ],
        collaborators: ['Photography: Allison Pecca'],
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/soko-glam-08.jpg', alt: 'Soko Glam 08' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-09.jpg', alt: 'Soko Glam 09' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-10.jpg', alt: 'Soko Glam 10' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-11.jpg', alt: 'Soko Glam 11' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-12.jpg', alt: 'Soko Glam 12' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-13.jpg', alt: 'Soko Glam 13' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-14.jpg', alt: 'Soko Glam 14' }] }
        ]
      },
      {
        title: 'HOLIDAY ADVENT CALENDAR',
        description: [
          "For the 2020 holiday season, the goal was to create a luxurious, giftable object that stood apart from traditional seasonal tropes. I designed a limited-edition Advent Calendar inspired by the geometry of Art Deco architecture.",
          "Featuring intricate gold foil stamping, the packaging transformed the 16-piece curation into a premium unboxing experience."
        ],
        link: {
          text: 'Watch the unboxing',
          url: 'https://www.tiktok.com/@hydrationceo/video/7032740463060929838'
        },
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/soko-glam-15.jpg', alt: 'Soko Glam 15' }] },
          { type: 'single', items: [{ src: '/images/soko-glam-16.jpg', alt: 'Soko Glam 16' }] }
        ]
      }
    ]
  },
  {
    id: 'the-klog',
    name: 'The Klog',
    category: 'Brand Refresh',
    year: '2023',
    imageUrl: '/images/the-klog-hero.jpg',
    heroImage: '/images/the-klog-hero.jpg',
    objectPosition: 'center center',
    description: [
      "The Klog needed to evolve from a playful blog into a trusted authority on K-beauty. The goal of the brand refresh was to balance approachability with expertise, shifting the platform into a legitimate educational resource.",
      "I refined the visual language through a more restrained color palette and elevated use of typography and layout, extending the refreshed system into packaging for launches like the Soft Shield Pimple Patch and Snail Mucin Energy Essence."
    ],
    role: 'Visual Identity, Digital Design, Packaging',
    scope: ['Visual identity', 'Digital design', 'Packaging'],
    collaborators: [],
    sections: [
      {
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/the-klog-01.jpg', alt: 'The Klog 01' }] },
          { type: 'single', items: [{ src: '/images/the-klog-02.jpg', alt: 'The Klog 02' }] },
          { type: 'single', items: [{ src: '/images/the-klog-03.jpg', alt: 'The Klog 03' }] },
          { type: 'single', items: [{ src: '/images/the-klog-04.jpg', alt: 'The Klog 04' }] },
          { type: 'single', items: [{ src: '/images/the-klog-05.jpg', alt: 'The Klog 05' }] },
          { type: 'single', items: [{ src: '/images/the-klog-06.jpg', alt: 'The Klog 06' }] },
          {
            type: 'grid',
            items: [
              { src: '/images/the-klog-07.jpg', alt: 'The Klog 07' },
              { src: '/images/the-klog-08.jpg', alt: 'The Klog 08' }
            ]
          },
          {
            type: 'grid',
            items: [
              { src: '/images/the-klog-09.jpg', alt: 'The Klog 09' },
              { src: '/images/the-klog-10.jpg', alt: 'The Klog 10' }
            ]
          },
          { type: 'single', items: [{ src: '/images/the-klog-11.jpg', alt: 'The Klog 11' }] }
        ]
      }
    ]
  },
  {
    id: 'bare-skin',
    name: 'Bare Skin',
    category: 'Visual Identity',
    year: '2025',
    imageUrl: '/images/bare-skin-01.jpg',
    heroImage: '/images/bare-skin-01.jpg',
    objectPosition: 'center center',
    description: [
      "A visual identity concept for a skincare brand with one radical constraint — five products, nothing more. A brand built to stand apart from a category that never stops adding. Blackletter meets Swiss grid, clinical skincare with a point of view. Dark packaging, warm documentary photography, copy that doesn't explain itself."
    ],
    role: 'Visual Identity, Art Direction, Digital Design, Packaging',
    scope: ['Visual identity', 'Art direction', 'Digital design', 'Packaging'],
    collaborators: ['Claude, ChatGPT, Nano Banana, Adobe Firefly'],
    sections: [
      {
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/bare-skin-02.jpg', alt: 'Bare Skin 02' }] },
          { type: 'single', items: [{ src: '/images/bare-skin-03.jpg', alt: 'Bare Skin 03' }] },
          { type: 'single', items: [{ src: '/images/bare-skin-04.jpg', alt: 'Bare Skin 04' }] },
          { type: 'single', items: [{ src: '/images/bare-skin-05.jpg', alt: 'Bare Skin 05' }] },
          { type: 'single', items: [{ src: '/images/bare-skin-06.jpg', alt: 'Bare Skin 06' }] },
          { type: 'single', items: [{ src: '/images/bare-skin-07.jpg', alt: 'Bare Skin 07' }] },
          { type: 'single', items: [{ src: '/images/bare-skin-08.jpg', alt: 'Bare Skin 08' }] }
        ]
      }
    ]
  },
  {
    id: 'then-i-met-you',
    name: 'Then I Met You',
    category: 'Digital Design',
    year: '2022',
    imageUrl: '/images/then-i-met-you-hero.jpg',
    heroImage: '/images/then-i-met-you-hero.jpg',
    objectPosition: 'center top',
    description: [
      "Then I Met You is an award-winning skincare brand rooted in Jeong, the Korean concept of a deep emotional connection to people, places, and things.",
      "The challenge was translating something inherently tactile and sensory into digital formats. I led design across email, social, and web — making sure the brand felt as considered on screen as it did in hand."
    ],
    role: 'Digital Design, Email Marketing, Social Content',
    scope: ['Digital design', 'Email marketing', 'Social content'],
    collaborators: [],
    sections: [
      {
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/then-i-met-you-01.jpg', alt: 'Then I Met You 01' }] },
          { type: 'single', items: [{ src: '/images/then-i-met-you-02.jpg', alt: 'Then I Met You 02' }] },
          { type: 'single', items: [{ src: '/images/then-i-met-you-03.jpg', alt: 'Then I Met You 03' }] },
          { type: 'single', items: [{ src: '/images/then-i-met-you-04.jpg', alt: 'Then I Met You 04' }] },
          { type: 'single', items: [{ src: '/images/then-i-met-you-05.jpg', alt: 'Then I Met You 05' }] },
          { type: 'single', items: [{ src: '/images/then-i-met-you-06.jpg', alt: 'Then I Met You 06' }] },
          {
            type: 'grid',
            items: [
              { src: '/images/then-i-met-you-07.gif', alt: 'Then I Met You 07' },
              { src: '/images/then-i-met-you-08.gif', alt: 'Then I Met You 08' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'the-alden',
    name: 'The Alden',
    category: 'Visual Identity',
    year: '2024',
    imageUrl: '/images/the-alden-hero.jpg',
    heroImage: '/images/the-alden-hero.jpg',
    objectPosition: 'center center',
    description: [
      "A visual identity concept for a community of modern farmhouse townhomes in Houston, Texas. I designed a mark that merges organic leaf forms with architectural elements, grounded in a palette of deep forest teal, warm gold, and natural wood tones, created to feel rooted yet elevated."
    ],
    role: 'Visual Identity',
    scope: ['Visual identity'],
    collaborators: ['MMI Agency'],
    sections: [
      {
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/the-alden-01.jpg', alt: 'The Alden 01' }] },
          { type: 'single', items: [{ src: '/images/the-alden-02.jpg', alt: 'The Alden 02' }] },
          { type: 'single', items: [{ src: '/images/the-alden-03.jpg', alt: 'The Alden 03' }] },
          { type: 'single', items: [{ src: '/images/the-alden-04.jpg', alt: 'The Alden 04' }] },
          { type: 'single', items: [{ src: '/images/the-alden-05.jpg', alt: 'The Alden 05' }] },
          { type: 'single', items: [{ src: '/images/the-alden-06.jpg', alt: 'The Alden 06' }] },
          { type: 'single', items: [{ src: '/images/the-alden-07.jpg', alt: 'The Alden 07' }] },
          { type: 'single', items: [{ src: '/images/the-alden-08.jpg', alt: 'The Alden 08' }] }
        ]
      }
    ]
  },
  {
    id: 'pg',
    name: 'Procter & Gamble',
    category: 'Performance Creative & CRM',
    year: '2023',
    imageUrl: '/images/pg-hero.jpg',
    heroImage: '/images/pg-hero.jpg',
    objectPosition: 'center center',
    description: [
      "While at MMI Agency, I designed digital creative across the P&G portfolio including lifecycle email campaigns, paid and organic social, and web assets for Gillette, Braun, The Art of Shaving, and joy+glee.",
      "The work was focused on performance creative and CRM, spanning omnichannel product launches, multivariate ad testing, retail calendar campaigns, and social content strategy. For Braun's Series 9 Pro launch, performance creative contributed to the product selling out in 24 hours."
    ],
    role: 'Performance Creative, CRM Design, Paid & Organic Social',
    scope: ['Performance creative', 'CRM design', 'Paid & organic social'],
    collaborators: ['Gillette, Braun, The Art of Shaving, joy+glee'],
    confidentialNotice: "Due to the confidential nature of unreleased campaigns and intellectual property, selected works are available via private PDF upon request."
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