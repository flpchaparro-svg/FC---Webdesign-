import { BusinessType, PageDefinition, StructureOption } from '../types';

export const getStructureOptions = (businessType: BusinessType): StructureOption[] => {
  switch (businessType) {
    case 'service':
      return [
        {
          id: 'authority',
          title: 'The Authority',
          description: 'Builds massive trust before asking for the sale. Best for consultants and agencies.',
          sections: ['hero', 'social-proof', 'problem', 'solution', 'reviews', 'cta'],
          features: ['Social Proof High', 'Problem Agitation', 'Trust Signals']
        },
        {
          id: 'funnel',
          title: 'Direct Response',
          description: 'High urgency, focused purely on getting the lead. Best for emergency services (Plumbers, Locksmiths).',
          sections: ['hero', 'services', 'reviews', 'cta'],
          features: ['Above Fold CTA', 'Minimal Navigation', 'Speed Focus']
        },
        {
          id: 'boutique',
          title: 'The Boutique',
          description: 'Focuses on relationship and vibe. Best for interior designers, event planners, and wellness.',
          sections: ['hero', 'gallery', 'about', 'services', 'cta'],
          features: ['Visual Heavy', 'Founder Story', 'Aesthetic First']
        }
      ];
    case 'saas':
      return [
        {
          id: 'plg',
          title: 'Product-Led Growth',
          description: 'Show the product immediately. Reduce friction. Get them to sign up.',
          sections: ['hero', 'social-proof', 'features', 'pricing', 'cta'],
          features: ['Screenshot Hero', 'Transparent Pricing', 'Feature Grid']
        },
        {
          id: 'enterprise',
          title: 'Enterprise Sales',
          description: 'Hide pricing, focus on security, compliance, and ROI. "Request Demo".',
          sections: ['hero', 'social-proof', 'problem', 'solution', 'cta'],
          features: ['Trust Logos', 'Case Studies', 'No Pricing Table']
        },
        {
          id: 'hype',
          title: 'Early Access',
          description: 'For pre-launch products. Build a waitlist.',
          sections: ['hero', 'problem', 'cta'],
          features: ['Email Capture', 'Viral Loop', 'Minimalist']
        }
      ];
    case 'ecommerce':
      return [
        {
          id: 'catalog',
          title: 'The Department Store',
          description: 'For large inventories. Search and categories are priority.',
          sections: ['hero', 'collections', 'product', 'cta'],
          features: ['Category Grid', 'Search Bar', 'Featured Items']
        },
        {
          id: 'hype',
          title: 'The Drop',
          description: 'For limited edition or single-product launches.',
          sections: ['hero', 'product', 'social-proof', 'cta'],
          features: ['Countdown Timer', 'Big Visuals', 'Scarcity']
        },
        {
          id: 'storybrand',
          title: 'The Brand Story',
          description: 'For mission-driven sustainable brands.',
          sections: ['hero', 'problem', 'solution', 'about', 'product', 'cta'],
          features: ['Founder Story', 'Values Section', 'Process']
        }
      ];
    case 'portfolio':
        return [
            {
                id: 'showcase',
                title: 'The Gallery',
                description: 'Work first. Minimal text.',
                sections: ['hero', 'gallery', 'cta'],
                features: ['Masonry Grid', 'Minimal UI']
            },
            {
                id: 'authority',
                title: 'The Expert',
                description: 'Case study focused. Problem/Solution format for each project.',
                sections: ['hero', 'problem', 'solution', 'gallery', 'cta'],
                features: ['Case Studies', 'Testimonials']
            },
            {
                id: 'boutique',
                title: 'The Personality',
                description: 'Focus on the person behind the work.',
                sections: ['hero', 'about', 'gallery', 'cta'],
                features: ['Bio Section', 'Philosophy']
            }
        ];
    default:
        // Default fallback
        return [
             {
                id: 'storybrand',
                title: 'Classic Layout',
                description: 'A balanced approach for general content.',
                sections: ['hero', 'problem', 'solution', 'cta'],
                features: ['Balanced', 'Clear']
             },
             {
                id: 'minimalist',
                title: 'Minimalist',
                description: 'Less is more.',
                sections: ['hero', 'cta'],
                features: ['Fast', 'Clean']
             },
             {
                 id: 'authority',
                 title: 'Content Heavy',
                 description: 'For blogs and magazines.',
                 sections: ['hero', 'features', 'cta'],
                 features: ['Readability', 'Structure']
             }
        ];
  }
};

export const getRecommendedSitemap = (businessType: BusinessType): PageDefinition[] => {
  const commonHome = { id: 'home', name: 'Home', slug: '/', required: true, reason: 'Primary landing & conversion point', selected: true };
  const contact = { id: 'contact', name: 'Contact', slug: '/contact', required: false, reason: 'Direct communication channel', selected: true };

  switch (businessType) {
    case 'saas':
      return [
        commonHome,
        { id: 'features', name: 'Features', slug: '/features', required: true, reason: 'Explain product capabilities', selected: true },
        { id: 'pricing', name: 'Pricing', slug: '/pricing', required: true, reason: 'Primary conversion driver', selected: true },
        { id: 'docs', name: 'Documentation', slug: '/docs', required: false, reason: 'Support & Technical SEO', selected: true },
        { id: 'blog', name: 'Blog', slug: '/blog', required: false, reason: 'Content marketing & SEO', selected: false },
        { id: 'login', name: 'Login', slug: '/login', required: true, reason: 'Application entry', selected: true },
      ];
    
    case 'ecommerce':
      return [
        commonHome,
        { id: 'shop', name: 'Shop All', slug: '/shop', required: true, reason: 'Full product catalog', selected: true },
        { id: 'collections', name: 'Collections', slug: '/collections', required: false, reason: 'Curated product groupings', selected: true },
        { id: 'about', name: 'Our Story', slug: '/about', required: false, reason: 'Brand affinity & trust', selected: true },
        { id: 'faq', name: 'FAQ / Shipping', slug: '/faq', required: true, reason: 'Reduce purchase anxiety', selected: true },
        { id: 'cart', name: 'Cart', slug: '/cart', required: true, reason: 'Checkout flow', selected: true },
      ];

    case 'service':
      return [
        commonHome,
        { id: 'services', name: 'Services', slug: '/services', required: true, reason: 'What you offer', selected: true },
        { id: 'about', name: 'About Us', slug: '/about', required: true, reason: 'Builds face-to-face trust', selected: true },
        { id: 'reviews', name: 'Testimonials', slug: '/reviews', required: false, reason: 'Social proof', selected: true },
        { id: 'booking', name: 'Book Now', slug: '/book', required: true, reason: 'Primary call-to-action', selected: true },
        contact,
      ];

    case 'portfolio':
      return [
        commonHome,
        { id: 'work', name: 'Selected Work', slug: '/work', required: true, reason: 'The core product', selected: true },
        { id: 'about', name: 'About Me', slug: '/about', required: true, reason: 'Personality & Experience', selected: true },
        contact,
      ];
      
    default:
      return [commonHome, contact];
  }
};