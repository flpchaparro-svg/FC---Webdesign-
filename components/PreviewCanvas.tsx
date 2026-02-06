import React from 'react';
import { DesignSystem } from '../types';

interface PreviewCanvasProps {
  system: DesignSystem;
}

const SampleContent: React.FC<{ system: DesignSystem; mode: 'light' | 'dark' }> = ({ system, mode }) => {
  const colors = mode === 'light' ? system.colors.light : system.colors.dark;
  
  // Dynamic styles based on system tokens
  const style = {
    '--bg': colors.canvas,
    '--text': colors.text,
    '--primary': system.colors.primary,
    '--primary-hover': system.interactive.primaryHover,
    '--primary-focus': system.interactive.primaryFocus,
    '--font-head': system.typography.headingFont,
    '--font-body': system.typography.bodyFont,
    '--radius': `${system.shape.borderRadius}px`,
    '--shadow': `${system.shape.shadow.x}px ${system.shape.shadow.y}px ${system.shape.shadow.blur}px rgba(0,0,0,0.2)`,
    '--base-size': `${system.typography.baseSize}px`,
    '--scale': system.typography.scaleRatio,
    // Pre-calculate headings for inline style simplicity
    '--h1': `${system.typography.baseSize * Math.pow(system.typography.scaleRatio, 5)}px`,
    '--h2': `${system.typography.baseSize * Math.pow(system.typography.scaleRatio, 4)}px`,
    '--h3': `${system.typography.baseSize * Math.pow(system.typography.scaleRatio, 3)}px`,
    '--body': `${system.typography.baseSize}px`,
    '--lh-h': system.typography.lineHeightHeading,
    '--lh-b': system.typography.lineHeightBody,
    '--gap': `${system.spacing.baseUnit * 2}px`,
    '--pad': `${system.spacing.baseUnit * 3}px`,
  } as React.CSSProperties;

  return (
    <div 
      className="w-full h-full p-8 overflow-y-auto transition-colors duration-300"
      style={{
        ...style,
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="max-w-[800px] mx-auto space-y-[var(--pad)]">
        
        {/* Hero */}
        <div className="text-center space-y-[var(--gap)]">
          <h1 style={{ 
              fontFamily: 'var(--font-head)', 
              fontSize: 'var(--h1)', 
              lineHeight: 'var(--lh-h)',
              fontWeight: 700 
            }}>
            Designing the Future.
          </h1>
          <p style={{ 
              fontSize: 'var(--h3)', 
              lineHeight: 'var(--lh-b)', 
              opacity: 0.8 
            }}>
            A reactive playground for systematic UI exploration.
          </p>
          <button 
            className="px-6 py-3 font-bold text-white transition-all transform active:scale-95 focus:ring-4 focus:ring-opacity-50"
            style={{ 
              backgroundColor: 'var(--primary)', 
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)',
              boxShadow: 'var(--shadow)',
            }}
          >
            Get Started
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-[var(--gap)]">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="p-4 border border-current border-opacity-10 flex flex-col gap-2"
              style={{
                borderRadius: 'var(--radius)',
                backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)'
              }}
            >
              <div className="w-full h-24 bg-current opacity-10" style={{ borderRadius: 'calc(var(--radius) - 2px)' }} />
              <h3 style={{ 
                  fontFamily: 'var(--font-head)', 
                  fontSize: 'var(--h3)',
                  fontWeight: 600
                }}>
                Feature {i}
              </h3>
              <p className="text-sm opacity-70 leading-relaxed">
                This is a sample card component demonstrating the body copy and spacing rhythm.
              </p>
              <a href="#" className="text-sm font-bold mt-auto underline decoration-2 underline-offset-4 opacity-80 hover:opacity-100" style={{ color: 'var(--primary)' }}>
                Learn more &rarr;
              </a>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="p-6 border border-current border-opacity-20" style={{ borderRadius: 'var(--radius)' }}>
            <h4 className="mb-4 font-bold uppercase text-xs tracking-widest">Input States</h4>
            <div className="space-y-4 max-w-md">
                <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">Email Address</label>
                    <input 
                        type="text" 
                        placeholder="john@example.com"
                        className="w-full p-2 bg-transparent border border-current border-opacity-30 focus:border-opacity-100 focus:outline-none focus:ring-1 focus:ring-current"
                        style={{ borderRadius: 'var(--radius)' }}
                    />
                </div>
                 <div>
                    <label className="block text-xs font-bold mb-1 opacity-80" style={{color: 'var(--primary)'}}>Active Focus</label>
                    <input 
                        type="text" 
                        defaultValue="Typing..."
                        className="w-full p-2 bg-transparent border focus:outline-none"
                        style={{ 
                            borderRadius: 'var(--radius)', 
                            borderColor: 'var(--primary)',
                            boxShadow: `0 0 0 1px var(--primary)`
                        }}
                    />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ system }) => {
  return (
    <div className="h-full flex flex-col border-r-2 border-[#1a1a1a]">
      {/* Light Mode Preview */}
      <div className="flex-1 relative border-b-2 border-[#1a1a1a] overflow-hidden">
        <div className="absolute top-2 left-2 bg-white text-black px-2 py-1 text-[10px] font-bold border border-black z-10">LIGHT MODE PREVIEW</div>
        <SampleContent system={system} mode="light" />
      </div>

      {/* Dark Mode Preview */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-[10px] font-bold border border-white z-10">DARK MODE PREVIEW</div>
        <SampleContent system={system} mode="dark" />
      </div>
    </div>
  );
};
