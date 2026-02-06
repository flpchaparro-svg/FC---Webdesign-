export type BusinessType = 'saas' | 'ecommerce' | 'service' | 'portfolio' | 'content';
export type BrandVibe = 'trustworthy' | 'innovative' | 'luxury' | 'friendly' | 'bold';
export type ConversionGoal = 'lead' | 'purchase' | 'awareness';
export type LayoutFormula = 'storybrand' | 'pas' | 'luxury' | 'showcase' | 'authority' | 'funnel' | 'boutique' | 'plg' | 'enterprise' | 'hype' | 'catalog' | 'minimalist';

export interface PageDefinition {
  id: string;
  name: string;
  slug: string;
  required: boolean;
  reason: string;
  selected: boolean;
}

export interface StructureOption {
  id: LayoutFormula;
  title: string;
  description: string;
  sections: string[];
  features: string[];
}

export interface DesignSystem {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    error: string;
    light: {
      canvas: string;
      text: string;
    };
    dark: {
      canvas: string;
      text: string;
    };
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: number; // px
    scaleRatio: number;
    lineHeightHeading: number;
    lineHeightBody: number;
    letterSpacing: number; // em
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    textDecoration: 'none' | 'underline' | 'line-through';
  };
  layout: {
    // Strategy
    businessType: BusinessType;
    brandVibe: BrandVibe;
    conversionGoal: ConversionGoal;
    activeFormula: LayoutFormula;
    sections: string[]; // e.g. ['hero', 'problem', 'solution']
    
    // Site Architecture
    pages: PageDefinition[];

    // Tactics (Tokens)
    heroStyle: 'split' | 'center' | 'minimal';
    sectionSpacing: 'compact' | 'comfortable' | 'spacious';
    containerWidth: number; // px
  };
  spacing: {
    baseUnit: number; // px
  };
  shape: {
    borderRadius: number; // px
    linkCorners: boolean;
    shadow: {
      x: number;
      y: number;
      blur: number;
    };
  };
  buttons: {
    radius: number;
    borderWidth: number;
    textTransform: 'uppercase' | 'none' | 'capitalize';
    fontWeight: string;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    hoverScale: number;
    applyShadow: boolean;
    variants: {
      primary: { bg: string; text: string; border: string };
      secondary: { bg: string; text: string; border: string };
      ghost: { text: string; border: string; hoverBg: string };
    };
  };
  inputs: {
    radius: number;
    borderWidth: number;
    baseBg: string;
    borderColor: string;
    focusRingWidth: number;
  };
  animation: {
    duration: number; // ms
    easing: 'linear' | 'ease' | 'ease-in-out' | 'cubic-bezier(0.4, 0, 0.2, 1)';
  };
  interactive: {
    primaryHover: string;
    primaryFocus: string;
  };
}

export type ThemeMode = 'light' | 'dark';

export interface WCAGScore {
  ratio: number;
  aa: boolean;
  aaa: boolean;
}

export interface FontOption {
  label: string;
  value: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
}

export type Category = 'palette' | 'typography' | 'layout' | 'shape' | 'buttons' | 'inputs' | 'motion';