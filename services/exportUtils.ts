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
  const { colors, typography, layout, spacing, shape, interactive, buttons, inputs, animation } = system;
  
  const getSpacingMultiplier = (s: string) => {
    switch(s) {
        case 'compact': return 4;
        case 'comfortable': return 8;
        case 'spacious': return 16;
        default: return 8;
    }
  }

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
  --type-spacing: ${typography.letterSpacing}em;
  --type-transform: ${typography.textTransform};
  --type-decoration: ${typography.textDecoration};

  /* Layout */
  --unit: ${spacing.baseUnit}px;
  --max-width: ${layout.containerWidth}px;
  --section-gap: ${spacing.baseUnit * getSpacingMultiplier(layout.sectionSpacing)}px;

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
  --btn-border-style: ${buttons.borderStyle};
  --btn-hover-scale: ${buttons.hoverScale};

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
      letterSpacing: {
        base: '${system.typography.letterSpacing}em',
      },
      scale: {
        hover: '${system.buttons.hoverScale}',
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

export const generateCursorPrompt = (system: DesignSystem): string => {
    const { layout, colors, typography, buttons, shape } = system;
    
    // Calculate heading sizes for the prompt
    const h1 = Math.round(typography.baseSize * Math.pow(typography.scaleRatio, 5));
    const h2 = Math.round(typography.baseSize * Math.pow(typography.scaleRatio, 4));

    const selectedPages = layout.pages.filter(p => p.selected).map(p => `- ${p.slug} (${p.name}): ${p.reason}`).join('\n');

    return `# Project Blueprint: ${layout.businessType.toUpperCase()} - ${layout.brandVibe.toUpperCase()}

## 1. Design Tokens (The DNA)
Implement these tokens using Tailwind CSS custom configuration.

### Colors
- **Primary:** ${colors.primary}
- **Secondary:** ${colors.secondary}
- **Accent:** ${colors.accent}
- **Light Theme:** Bg: ${colors.light.canvas}, Text: ${colors.light.text}
- **Dark Theme:** Bg: ${colors.dark.canvas}, Text: ${colors.dark.text}

### Typography
- **Heading Font:** ${typography.headingFont}
- **Body Font:** ${typography.bodyFont}
- **Base Size:** ${typography.baseSize}px (Scale Ratio: ${typography.scaleRatio})
- **H1 Size:** ~${h1}px | **H2 Size:** ~${h2}px

### UI Primitives
- **Radius:** ${shape.borderRadius}px
- **Buttons:** ${buttons.borderWidth}px border, ${buttons.radius}px radius, ${buttons.textTransform} text.
- **Shadows:** ${shape.shadow.x}px ${shape.shadow.y}px ${shape.shadow.blur}px.

## 2. Layout Strategy (The Wireframe)
**Formula:** ${layout.activeFormula.toUpperCase()}
**Hero Style:** ${layout.heroStyle.toUpperCase()}
**Container Max:** ${layout.containerWidth}px

### Homepage Section Order
${layout.sections.map((s, i) => `${i + 1}. [${s.toUpperCase()}]`).join('\n')}

## 3. Site Architecture (The Sitemap)
Scaffold the following pages using React Router. Ensure a shared Layout component with Navbar and Footer.

${selectedPages}

## 4. Technical Stack
- React 18+
- Tailwind CSS (Use the tokens above)
- Lucide React (Icons)
- Framer Motion (Animation Duration: ${system.animation.duration}ms)

**Action:** Please initialize this project structure and generate the Tailwind config.`;
};