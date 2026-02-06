export type Category = 'palette' | 'typography' | 'layout' | 'buttons' | 'inputs' | 'animation';
export type ThemeMode = 'light' | 'dark';
export type ViewState = 'strategy' | 'designer';

export type BusinessType = 'saas' | 'service' | 'ecommerce' | 'portfolio';
export type ConversionGoal = 'lead' | 'purchase' | 'awareness';
export type BrandVibe = 'trustworthy' | 'innovative' | 'luxury' | 'friendly';
export type LayoutFormula = 'storybrand' | 'pas' | 'luxury';

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
  label: string;
  description: string;
  sections: string[];
  visualPreview: string[];
}

export interface DesignSystem {
  layout: {
    businessType: BusinessType;
    conversionGoal: ConversionGoal;
    brandVibe: BrandVibe;
    activeFormula: LayoutFormula;
    sections: string[];
    heroStyle: 'split' | 'center';
    pages: PageDefinition[];
    sectionSpacing: 'compact' | 'comfortable' | 'spacious';
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    error: string;
    neutral: { 50: string; 100: string; 200: string; 900: string };
    light: { canvas: string; text: string };
    dark: { canvas: string; text: string };
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: number;
    scaleRatio: number;
    eyebrow: {
        font: string;
        weight: string;
        tracking: number;
        textTransform: 'uppercase' | 'none' | 'capitalize';
    };
  };
  buttons: {
    radius: number;
    borderWidth: number;
    textTransform: 'uppercase' | 'none';
    fontWeight: string;
    applyShadow: boolean;
  };
  inputs: {
    radius: number;
    borderWidth: number;
    focusRingWidth: number;
  };
  animation: {
    duration: number;
    easing: string;
  };
}