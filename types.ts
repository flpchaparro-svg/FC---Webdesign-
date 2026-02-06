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
  };
  spacing: {
    baseUnit: number; // px
    maxContainerWidth: number; // px
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
    applyShadow: boolean;
    variants: {
      primary: { bg: string; text: string; border: string };
      secondary: { bg: string; text: string; border: string };
      ghost: { text: string; border: string; hoverBg: string };
    };
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