import { Project, NavItem } from './types';

// Projects order: Keystone, Cyprès 21, Bare Skin, Soko Glam, The Klog, Procter & Gamble, Then I Met You, The Alden
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
      "Keystone is a strategy, economics, and technology consultancy working with global companies and law firms.",
      "I joined Keystone while a company rebrand was underway. I participated in agency reviews and internal discussions, then helped carry the new identity into the firm’s website, marketing, editorial, event, and internal materials as its sole in-house graphic designer."
    ],
    role: 'Graphic Designer',
    scope: [
      'Brand Expression',
      'Digital Design',
      'Editorial & Marketing Design',
      'Art Direction'
    ],
    collaborators: ['Otherward — Identity', 'Refokus — Web', 'Michael Simon — Photography'],
    sections: [
      {
        title: '01 — WEB & DIGITAL',
        description: [
          "I maintained and updated Keystone’s website, adding new content and sections as the firm’s needs evolved. I worked closely with developers to refine layouts, resolve visual issues, and keep the site consistent with the refreshed identity.",
          "During the initial redesign, I also shared references, ideas, and detailed visual feedback with Refokus as they developed the website."
        ],
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/keystone-01.jpg', alt: 'Keystone website layout mockup' }] },
          { type: 'single', items: [{ src: '/images/keystone-02.jpg', alt: 'Deep Enterprise AI Platform desktop homepage' }] },
          { type: 'single', items: [{ src: '/images/keystone-03.jpg', alt: 'Mobile website shown on phone held in hand' }] },
          { type: 'single', items: [{ src: '/images/keystone-04.jpg', alt: 'Services or capabilities webpage' }] }
        ]
      },
      {
        title: '02 — THOUGHT LEADERSHIP & COMMUNICATIONS',
        description: [
          "I designed reports, guides, presentations, print ads, brochures, social content, and event materials. I also created a small set of reusable layouts for recurring print and marketing needs."
        ],
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/keystone-05.jpg', alt: 'Careers or recruiting collateral shown on laptop' }] },
          {
            type: 'grid',
            items: [
              { src: '/images/keystone-07.jpg', alt: 'Purple-and-white digital content cards' },
              { src: '/images/keystone-08.jpg', alt: 'Green editorial guide cover 1' }
            ]
          },
          { type: 'single', items: [{ src: '/images/keystone-06.jpg', alt: 'Keystone employee headshots and office portraits' }] },
          { type: 'single', items: [{ src: '/images/keystone-09.jpg', alt: 'Green editorial guide cover 2' }] },
          { type: 'single', items: [{ src: '/images/keystone-10.jpg', alt: 'Multi-format article, report or publishing-system composition' }] }
        ]
      },
      {
        title: '03 — PHOTOGRAPHY',
        description: [
          "I art directed a new series of employee headshots with photographer Michael Simon. I scouted locations throughout Keystone’s offices and helped direct the lighting, backgrounds, composition, and post-production."
        ],
        mediaGroups: [
          { type: 'single', items: [{ src: '/images/keystone-11.jpg', alt: 'White-paper or report-page mockup' }] }
        ]
      }
    ]
  },
  {
    id: 'cypres-21-indigo',
    name: 'CYPRÈS 21 INDIGO',
    category: 'Campaign Art Direction',
    year: '2025',
    imageUrl: '/images/cypres-21-indigo-campaign-01.jpg',
    heroImage: '/images/cypres-21-indigo-campaign-01.jpg',
    objectPosition: 'center center',
    description: [
      "An independent campaign concept for Le Labo’s CYPRÈS 21 INDIGO candle. Inspired by Japanese aizome dyeing, the visual direction pairs sculptural indigo textiles with quiet still life photography to explore craft, time, and ritual.",
      "The campaign extends the visual direction across outdoor, web, and social, using the line “A slower kind of blue.”"
    ],
    role: 'Art Direction',
    scope: ['Visual Direction', 'AI Image Direction'],
    tools: ['ChatGPT', 'Adobe Photoshop'],
    sections: [
      {
        title: '01 / VISUAL DIRECTION',
        description: [
          "I built the image direction around sculptural indigo textiles, cool directional light, and quiet compositions. The candle remains the focal point while the folds, texture, and scale of the fabric reference the craft behind aizome dyeing."
        ],
        mediaGroups: [
          {
            type: 'single',
            items: [{ src: '/images/cypres-21-indigo-campaign-02.jpg', alt: 'CYPRÈS 21 INDIGO Campaign 02' }]
          },
          {
            type: 'grid',
            items: [
              { src: '/images/cypres-21-indigo-campaign-03.jpg', alt: 'CYPRÈS 21 INDIGO Campaign 03' },
              { src: '/images/cypres-21-indigo-campaign-04.jpg', alt: 'CYPRÈS 21 INDIGO Campaign 04' }
            ]
          }
        ]
      },
      {
        title: '02 / CAMPAIGN APPLICATIONS',
        description: [
          "The visual direction was adapted across outdoor, web, and social formats while maintaining the same restrained composition, color, and typography."
        ],
        mediaGroups: [
          {
            type: 'single',
            items: [{ src: '/images/cypres-21-indigo-campaign-05.jpg', alt: 'Outdoor advertising campaign mockup' }]
          },
          {
            type: 'single',
            items: [{ src: '/images/cypres-21-indigo-campaign-06.jpg', alt: 'Website application mockup' }]
          },
          {
            type: 'single',
            items: [{ src: '/images/cypres-21-indigo-campaign-07.jpg', alt: 'Instagram carousel mockup' }]
          }
        ]
      }
    ],
    processNote: "Independent campaign exploration created with ChatGPT and refined in Adobe Photoshop. Not affiliated with Le Labo."
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
    role: 'Creative Direction & Design',
    scope: ['Visual Identity', 'Art Direction', 'Digital Design', 'Packaging'],
    collaborators: [],
    tools: ['ChatGPT', 'Claude', 'Adobe Photoshop'],
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
    id: 'soko-glam',
    name: 'Soko Glam',
    category: 'Art Direction',
    year: '2023',
    imageUrl: '/images/soko-glam-09.jpg',
    heroImage: '/images/soko-glam-hero.jpg',
    objectPosition: 'center center',
    description: [
      "Soko Glam is an online destination for Korean beauty and skincare.",
      "As Soko Glam’s sole in-house digital graphic designer, I developed campaign concepts, art directed photography, and designed work across the website, email, social, and packaging."
    ],
    role: 'Digital Graphic Designer',
    scope: ['Art Direction', 'Campaign Design', 'Digital & E-commerce Design', 'Packaging'],
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
    role: 'Digital Graphic Designer',
    scope: ['Brand Refresh', 'Editorial & Digital Design', 'Packaging'],
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
          { type: 'single', items: [{ src: '/images/the-klog-07.jpg', alt: 'The Klog 07' }] },
          {
            type: 'grid',
            items: [
              { src: '/images/the-klog-08.jpg', alt: 'The Klog 08' },
              { src: '/images/the-klog-09.jpg', alt: 'The Klog 09' }
            ]
          },
          {
            type: 'grid',
            items: [
              { src: '/images/the-klog-10.jpg', alt: 'The Klog 10' },
              { src: '/images/the-klog-11.jpg', alt: 'The Klog 11' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'pg',
    name: 'Procter & Gamble',
    category: 'Digital Marketing Design',
    year: '2023',
    imageUrl: '/images/pg-hero.jpg',
    heroImage: '/images/pg-hero.jpg',
    objectPosition: 'center center',
    description: [
      "While working at MMI Agency, I designed digital creative for Gillette, Braun, The Art of Shaving, and joy+glee. My work included lifecycle email, paid and organic social, web content, retail campaigns, and product launches.",
      "I worked within each brand’s established identity, adapting creative across formats and channels while supporting ongoing CRM programs, seasonal promotions, and multivariate testing. For Braun’s Series 9 Pro launch, I designed performance creative for a campaign that sold out within 24 hours."
    ],
    role: 'Digital Designer, MMI Agency',
    scope: ['CRM & Email Design', 'Social & Performance Creative', 'Web & Digital Design'],
    brands: ['Gillette, Braun, The Art of Shaving, joy+glee'],
    collaborators: [],
    confidentialNotice: "Additional P&G work is available in a private PDF upon request."
  },
  {
    id: 'then-i-met-you',
    name: 'Then I Met You',
    category: 'Digital Marketing Design',
    year: '2022',
    imageUrl: '/images/then-i-met-you-hero.jpg',
    heroImage: '/images/then-i-met-you-hero.jpg',
    objectPosition: 'center top',
    description: [
      "Then I Met You is a skincare brand founded by Charlotte Cho, co-founder of Soko Glam. The brand is rooted in jeong, the Korean idea of a deep emotional connection to people, places, and things.",
      "While working as Soko Glam’s in-house digital graphic designer, I designed email, social, and web content for Then I Met You, adapting its warm, tactile identity across its digital channels."
    ],
    role: 'Digital Graphic Designer',
    scope: ['Digital & E-commerce Design', 'Email Design', 'Social Content'],
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
      "The Alden is a community of modern farmhouse townhomes in Houston, Texas. While working at MMI Agency, I was brought into an early-stage branding exploration and developed a proposed visual direction inspired by the development’s architecture and natural surroundings. The concept included a logo mark, color palette, and a small set of brand applications."
    ],
    role: 'Designer',
    scope: ['Visual Identity', 'Logo Design', 'Brand Applications'],
    agency: 'MMI Agency',
    collaborators: [],
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