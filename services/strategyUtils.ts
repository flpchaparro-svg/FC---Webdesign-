import { BusinessType, PageDefinition } from '../types';

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