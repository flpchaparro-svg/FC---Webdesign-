import { DesignSystem } from '../types';

export const downloadJSON = (data: object, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export const generateCSS = (system: DesignSystem): string => {
  const { colors, typography, spacing, shape, interactive, buttons, inputs, animation } = system;
  
  return `:root {
  /* Brand Palette */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-success: ${colors.success};
  --color-error: ${colors.error};

  /* Light Theme */
  --light-canvas: ${colors.light.canvas};
  --light-text: ${colors.light.text};

  /* Dark Theme */
  --dark-canvas: ${colors.dark.canvas};
  --dark-text: ${colors.dark.text};

  /* Interactive */
  --primary-hover: ${interactive.primaryHover};
  --primary-focus: ${interactive.primaryFocus};

  /* Typography */
  --font-heading: "${typography.headingFont}", sans-serif;
  --font-body: "${typography.bodyFont}", sans-serif;
  --type-base: ${typography.baseSize}px;
  --type-scale: ${typography.scaleRatio};
  --lh-heading: ${typography.lineHeightHeading};
  --lh-body: ${typography.lineHeightBody};

  /* Spacing & Layout */
  --unit: ${spacing.baseUnit}px;
  --max-width: ${spacing.maxContainerWidth}px;

  /* Shape */
  --radius: ${shape.borderRadius}px;
  --shadow-x: ${shape.shadow.x}px;
  --shadow-y: ${shape.shadow.y}px;
  --shadow-blur: ${shape.shadow.blur}px;
  
  /* Button Architecture */
  --btn-radius: ${buttons.radius}px;
  --btn-border: ${buttons.borderWidth}px;
  --btn-transform: ${buttons.textTransform};
  --btn-weight: ${buttons.fontWeight};

  /* Input Architecture */
  --input-radius: ${inputs.radius}px;
  --input-border: ${inputs.borderWidth}px;
  --input-bg: ${inputs.baseBg};
  --input-border-color: ${inputs.borderColor};
  --ring-width: ${inputs.focusRingWidth}px;

  /* Motion & Animation */
  --motion-duration: ${animation.duration}ms;
  --motion-ease: ${animation.easing};
}`;
};

export const generateTailwindConfig = (system: DesignSystem): string => {
  return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${system.colors.primary}',
          hover: '${system.interactive.primaryHover}',
          focus: '${system.interactive.primaryFocus}',
        },
        secondary: '${system.colors.secondary}',
        accent: '${system.colors.accent}',
        success: '${system.colors.success}',
        error: '${system.colors.error}',
        canvas: {
          light: '${system.colors.light.canvas}',
          dark: '${system.colors.dark.canvas}',
        },
        text: {
          light: '${system.colors.light.text}',
          dark: '${system.colors.dark.text}',
        },
        input: {
          bg: '${system.inputs.baseBg}',
          border: '${system.inputs.borderColor}',
        }
      },
      fontFamily: {
        heading: ['"${system.typography.headingFont}"', 'sans-serif'],
        body: ['"${system.typography.bodyFont}"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '${system.shape.borderRadius}px',
        btn: '${system.buttons.radius}px',
        input: '${system.inputs.radius}px',
      },
      borderWidth: {
        btn: '${system.buttons.borderWidth}px',
        input: '${system.inputs.borderWidth}px',
      },
      ringWidth: {
        DEFAULT: '${system.inputs.focusRingWidth}px',
      },
      transitionDuration: {
        DEFAULT: '${system.animation.duration}ms',
      },
      transitionTimingFunction: {
        DEFAULT: '${system.animation.easing}',
      },
      spacing: {
        unit: '${system.spacing.baseUnit}px',
      }
    }
  }
}`;
};