import { DesignSystem, FontOption } from './types';

export const INITIAL_DESIGN_SYSTEM: DesignSystem = {
  colors: {
    primary: '#3B82F6',
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
  },
  spacing: {
    baseUnit: 8,
    maxContainerWidth: 1200,
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
  interactive: {
    primaryHover: '#2563EB',
    primaryFocus: '#1D4ED8',
  },
};

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Inter (Sans)', value: 'Inter', category: 'sans-serif' },
  { label: 'Roboto (Sans)', value: 'Roboto', category: 'sans-serif' },
  { label: 'Playfair Display (Serif)', value: 'Playfair Display', category: 'serif' },
  { label: 'Merriweather (Serif)', value: 'Merriweather', category: 'serif' },
  { label: 'Oswald (Display)', value: 'Oswald', category: 'display' },
  { label: 'Space Mono (Mono)', value: 'Space Mono', category: 'monospace' },
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
