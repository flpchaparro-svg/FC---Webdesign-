import { BusinessType, PageDefinition, StructureOption } from '../types';

export const getStructureOptions = (business: BusinessType): StructureOption[] => {
  return [
    {
      id: 'storybrand',
      label: 'The Clarifier',
      description: 'Positions the customer as the hero and you as the guide. Clear, linear, and trust-building.',
      sections: ['hero', 'problem', 'solution', 'process', 'social-proof', 'cta'],
      visualPreview: ['HERO', 'PROBLEM', 'SOLUTION', 'PROCESS', 'PROOF', 'CTA']
    },
    {
      id: 'pas',
      label: 'The Agitator',
      description: 'Problem-Agitation-Solution. High urgency. Best for solving immediate pain points.',
      sections: ['hero', 'problem', 'agitation', 'solution', 'reviews', 'cta'],
      visualPreview: ['HERO', 'PAIN', 'COST', 'FIX', 'REVIEWS', 'BUY']
    },
    {
      id: 'luxury',
      label: 'The Aesthete',
      description: 'Minimalist. Removes marketing noise to create desire through negative space.',
      sections: ['hero', 'gallery', 'philosophy', 'product', 'cta'],
      visualPreview: ['HERO', 'VISUALS', 'MANIFESTO', 'PRODUCT', 'CONTACT']
    }
  ];
};

export const getRecommendedSitemap = (businessType: BusinessType): PageDefinition[] => {
  const commonHome = { id: 'home', name: 'Home', slug: '/', required: true, reason: 'Landing Point', selected: true };
  const contact = { id: 'contact', name: 'Contact', slug: '/contact', required: false, reason: 'Inquiries', selected: true };
  
  // Safe fallback
  const type = businessType || 'service';

  switch (type) {
    case 'saas':
      return [
        commonHome,
        { id: 'features', name: 'Features', slug: '/features', required: true, reason: 'Capabilities', selected: true },
        { id: 'pricing', name: 'Pricing', slug: '/pricing', required: true, reason: 'Conversion', selected: true },
        { id: 'docs', name: 'Docs', slug: '/docs', required: false, reason: 'Support', selected: true },
        { id: 'login', name: 'Login', slug: '/login', required: true, reason: 'App Entry', selected: true },
      ];
    case 'ecommerce':
      return [
        commonHome,
        { id: 'shop', name: 'Shop All', slug: '/shop', required: true, reason: 'Catalog', selected: true },
        { id: 'about', name: 'Story', slug: '/about', required: false, reason: 'Brand Trust', selected: true },
        { id: 'faq', name: 'FAQ', slug: '/faq', required: true, reason: 'Reduce Anxiety', selected: true },
        { id: 'cart', name: 'Cart', slug: '/cart', required: true, reason: 'Checkout', selected: true },
      ];
    case 'service':
      return [
        commonHome,
        { id: 'services', name: 'Services', slug: '/services', required: true, reason: 'Offerings', selected: true },
        { id: 'about', name: 'About', slug: '/about', required: true, reason: 'Trust', selected: true },
        { id: 'reviews', name: 'Reviews', slug: '/reviews', required: false, reason: 'Proof', selected: true },
        contact,
      ];
    case 'portfolio':
      return [
        commonHome,
        { id: 'work', name: 'Work', slug: '/work', required: true, reason: 'Projects', selected: true },
        { id: 'about', name: 'About Me', slug: '/about', required: true, reason: 'Personality', selected: true },
        contact,
      ];
    default:
      return [commonHome, contact];
  }
};