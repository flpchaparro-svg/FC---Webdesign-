import { DesignSystem, FontOption } from './types';

export const INITIAL_DESIGN_SYSTEM: DesignSystem = {
  colors: {
    primary: '#3B82F6',
    secondary: '#64748B',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    light: {
      canvas: '#FFFFFF',
      text: '#111827',
    },
    dark: {
      canvas: '#0F172A',
      text: '#F8FAFC',
    },
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    baseSize: 16,
    scaleRatio: 1.25, // Major Third
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    letterSpacing: 0,
    textTransform: 'none',
    textDecoration: 'none',
  },
  layout: {
    businessType: 'saas',
    brandVibe: 'innovative',
    conversionGoal: 'lead',
    activeFormula: 'storybrand',
    sections: ['hero', 'problem', 'solution', 'social-proof', 'cta'],
    
    // Default Pages for SaaS
    pages: [
        { id: 'p1', name: 'Home', slug: '/', required: true, reason: 'Landing page conversion', selected: true },
        { id: 'p2', name: 'Features', slug: '/features', required: true, reason: 'Product capabilities', selected: true },
        { id: 'p3', name: 'Pricing', slug: '/pricing', required: true, reason: 'Purchase decision', selected: true },
        { id: 'p4', name: 'Docs', slug: '/docs', required: false, reason: 'User support & SEO', selected: true },
        { id: 'p5', name: 'Login', slug: '/login', required: true, reason: 'App access', selected: true },
    ],

    heroStyle: 'split',
    sectionSpacing: 'comfortable',
    containerWidth: 1200,
  },
  spacing: {
    baseUnit: 8,
  },
  shape: {
    borderRadius: 8,
    linkCorners: true,
    shadow: {
      x: 0,
      y: 4,
      blur: 6,
    },
  },
  buttons: {
    radius: 8,
    borderWidth: 2,
    textTransform: 'none',
    fontWeight: '600',
    borderStyle: 'solid',
    hoverScale: 1.0,
    applyShadow: false,
    variants: {
      primary: { bg: '#3B82F6', text: '#FFFFFF', border: 'transparent' },
      secondary: { bg: '#64748B', text: '#FFFFFF', border: 'transparent' },
      ghost: { text: '#3B82F6', border: '#3B82F6', hoverBg: 'rgba(59, 130, 246, 0.1)' },
    },
  },
  inputs: {
    radius: 6,
    borderWidth: 1,
    baseBg: '#FFFFFF',
    borderColor: '#E2E8F0',
    focusRingWidth: 3,
  },
  animation: {
    duration: 200,
    easing: 'ease-in-out',
  },
  interactive: {
    primaryHover: '#2563EB',
    primaryFocus: '#1D4ED8',
  },
};

export const POPULAR_FONTS = [
  "Inter", "Roboto", "Open Sans", "Lato", "Poppins", "Montserrat", "Roboto Condensed", 
  "Oswald", "Source Sans 3", "Slabo 27px", "Raleway", "PT Sans", "Merriweather", 
  "Nunito", "Noto Sans", "Playfair Display", "Rubik", "Lora", "Work Sans", "Mukta", 
  "Nunito Sans", "Fira Sans", "Quicksand", "Hind", "Barlow", "Mulish", "Inconsolata", 
  "Titillium Web", "PT Serif", "Heebo", "Libre Franklin", "DM Sans", "Space Mono", 
  "Syne", "Outfit", "Manrope", "Urbanist"
];

export const TYPE_SCALES = [
  { label: 'Minor Second (1.067)', value: 1.067 },
  { label: 'Major Second (1.125)', value: 1.125 },
  { label: 'Minor Third (1.200)', value: 1.200 },
  { label: 'Major Third (1.250)', value: 1.250 },
  { label: 'Perfect Fourth (1.333)', value: 1.333 },
  { label: 'Augmented Fourth (1.414)', value: 1.414 },
  { label: 'Perfect Fifth (1.500)', value: 1.500 },
  { label: 'Golden Ratio (1.618)', value: 1.618 },
];