import React, { useState } from 'react';
import { DesignSystem, Category } from '../types';
import { Monitor, Smartphone, Tablet, Moon, Sun, Layout, Type } from 'lucide-react';

interface PreviewCanvasProps {
  system: DesignSystem;
  activeCategory: Category;
}

// --- HELPER: Contrast Math ---
const getContrastColor = (hexColor: string) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  // Calculate YIQ (Luminance)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  // Return Black for bright backgrounds, White for dark backgrounds
  return (yiq >= 128) ? '#111827' : '#FFFFFF';
};

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ system, activeCategory }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Dynamic Styles
  const style = {
    '--primary': system.colors.primary,
    '--secondary': system.colors.secondary,
    '--accent': system.colors.accent,
    '--success': system.colors.success,
    '--error': system.colors.error,
    
    // Canvas & Text
    '--canvas': mode === 'light' ? system.colors.light.canvas : system.colors.dark.canvas,
    '--text': mode === 'light' ? system.colors.light.text : system.colors.dark.text,
    
    // Neutrals
    '--neutral-50': system.colors.neutral[50],
    '--neutral-100': system.colors.neutral[100],
    '--neutral-200': system.colors.neutral[200],
    
    // Typography
    '--heading-font': system.typography.headingFont,
    '--body-font': system.typography.bodyFont,
    '--base-size': `${system.typography.baseSize}px`,
    '--scale': system.typography.scaleRatio,
    
    // Eyebrow Tokens
    '--eyebrow-font': system.typography.eyebrow.font,
    '--eyebrow-weight': system.typography.eyebrow.weight,
    '--eyebrow-spacing': `${system.typography.eyebrow.tracking}em`,
    '--eyebrow-case': system.typography.eyebrow.textTransform,
    
    // Shape
    '--radius': `${system.buttons.radius}px`,
    '--btn-border': `${system.buttons.borderWidth}px`,
    '--unit': '8px',
    
    // Animation
    '--motion-duration': `${system.animation.duration}ms`,
    '--motion-ease': system.animation.easing,
  } as React.CSSProperties;

  // Viewport Sizing
  const getWidth = () => {
    switch(viewport) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#e5e5e5] relative" style={style}>
      
      {/* --- TOOLBAR --- */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex gap-2">
          <button onClick={() => setMode('light')} className={`p-1.5 rounded ${mode === 'light' ? 'bg-gray-200' : ''}`}><Sun size={16}/></button>
          <button onClick={() => setMode('dark')} className={`p-1.5 rounded ${mode === 'dark' ? 'bg-gray-200' : ''}`}><Moon size={16}/></button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewport('desktop')} className={`p-1.5 rounded ${viewport === 'desktop' ? 'bg-gray-200' : ''}`}><Monitor size={16}/></button>
          <button onClick={() => setViewport('tablet')} className={`p-1.5 rounded ${viewport === 'tablet' ? 'bg-gray-200' : ''}`}><Tablet size={16}/></button>
          <button onClick={() => setViewport('mobile')} className={`p-1.5 rounded ${viewport === 'mobile' ? 'bg-gray-200' : ''}`}><Smartphone size={16}/></button>
        </div>
      </div>

      {/* --- PREVIEW AREA --- */}
      <div className="flex-1 overflow-hidden relative flex justify-center bg-gray-100 p-8">
        <div 
          className="bg-[var(--canvas)] text-[var(--text)] transition-all duration-300 shadow-xl overflow-y-auto"
          style={{ 
            width: getWidth(),
            height: '100%',
            fontFamily: 'var(--body-font)',
            fontSize: 'var(--base-size)',
          }}
        >
          {/* RENDER THE STRATEGY SECTIONS */}
          <div className="flex flex-col">
            {system.layout.sections.map((section, idx) => (
              <SectionRenderer key={idx} type={section} system={system} mode={mode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS FOR SECTIONS ---

const SectionRenderer = ({ type, system, mode }: { type: string, system: DesignSystem, mode: string }) => {
  // Use distinct backgrounds for sections to show visual hierarchy
  const bg = type === 'hero' ? 'var(--canvas)' 
           : type === 'cta' ? 'var(--primary)' 
           : (['problem', 'philosophy'].includes(type)) ? 'var(--neutral-50)' 
           : 'var(--canvas)';

  // Calculate text color specifically for this section
  const textColor = type === 'cta' ? getContrastColor(system.colors.primary) : 'var(--text)';

  return (
    <div className="p-12 md:p-20 border-b border-[var(--neutral-100)]" style={{ backgroundColor: bg, color: textColor }}>
      {type === 'hero' && <HeroSection system={system} />}
      {type === 'cta' && <CtaSection />}
      {type === 'problem' && <div className="text-center"><h2>The Problem</h2><p className="opacity-70 mt-4">This section validates user pain points.</p></div>}
      {type === 'solution' && <div className="text-center"><h2>The Solution</h2><p className="opacity-70 mt-4">This section presents your offer.</p></div>}
      {type === 'social-proof' && <div className="text-center opacity-50 font-bold tracking-widest">TRUSTED BY INDUSTRY LEADERS</div>}
      {/* Add more renderers as needed */}
    </div>
  );
};

const HeroSection = ({ system }: { system: DesignSystem }) => {
  const isCenter = system.layout.heroStyle === 'center';
  return (
    <div className={`flex flex-col gap-8 ${isCenter ? 'items-center text-center' : 'md:flex-row md:items-center'}`}>
      <div className="flex-1 space-y-6">
        <span className="text-xs font-bold uppercase tracking-[var(--eyebrow-spacing)] text-[var(--primary)]" 
              style={{ fontFamily: 'var(--eyebrow-font)' }}>
          Launch Your Big Idea
        </span>
        <h1 className="text-5xl md:text-6xl font-black leading-[1.1]" style={{ fontFamily: 'var(--heading-font)' }}>
          Design that converts.
        </h1>
        <p className="text-xl opacity-80 max-w-lg leading-relaxed">
          Stop guessing. Start building. Use a mathematically sound design system to scale your business.
        </p>
        <div className="flex gap-4 pt-4 justify-center md:justify-start">
          <button className="px-8 py-4 bg-[var(--primary)] text-white font-bold rounded-[var(--radius)] hover:scale-105 transition-transform duration-[var(--motion-duration)]">
            Get Started
          </button>
          <button className="px-8 py-4 border border-[var(--text)] font-bold rounded-[var(--radius)] hover:bg-[var(--neutral-100)] transition-colors">
            Learn More
          </button>
        </div>
      </div>
      {/* Visual Placeholder */}
      <div className="flex-1 aspect-video bg-[var(--neutral-200)] rounded-[var(--radius)] flex items-center justify-center">
        <span className="opacity-30 font-bold">Hero Image</span>
      </div>
    </div>
  );
};

const CtaSection = () => (
  <div className="text-center space-y-6">
    <h2 className="text-4xl font-bold" style={{ fontFamily: 'var(--heading-font)' }}>Ready to build?</h2>
    <p className="text-lg opacity-90 max-w-2xl mx-auto">Join thousands of founders using this system to launch faster.</p>
    <button className="mt-8 px-10 py-5 bg-[var(--canvas)] text-[var(--text)] font-bold rounded-[var(--radius)] shadow-lg hover:shadow-xl transition-all">
      Start Free Trial
    </button>
  </div>
);