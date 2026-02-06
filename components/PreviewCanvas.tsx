import React, { useState } from 'react';
import { DesignSystem, Category } from '../types';
import { Sun, Moon, Monitor, Tablet, Smartphone, MousePointer2, LayoutTemplate, Box, Grid, Image as ImageIcon, CheckCircle, ShieldCheck, MapPin, Search } from 'lucide-react';

interface PreviewCanvasProps {
  system: DesignSystem;
  activeCategory: Category;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ system, activeCategory }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = useState<'interactive' | 'styleguide'>('interactive');

  const colors = mode === 'light' ? system.colors.light : system.colors.dark;

  // Spacing Multiplier Map
  const getSpacing = (style: string) => {
      switch(style) {
          case 'compact': return 'calc(var(--unit) * 4)';
          case 'comfortable': return 'calc(var(--unit) * 8)';
          case 'spacious': return 'calc(var(--unit) * 16)';
          default: return 'calc(var(--unit) * 8)';
      }
  };

  const style = {
    '--bg': colors.canvas,
    '--text': colors.text,
    '--primary': system.colors.primary,
    '--secondary': system.colors.secondary,
    '--accent': system.colors.accent,
    '--success': system.colors.success,
    '--error': system.colors.error,
    '--primary-hover': system.interactive.primaryHover,
    '--primary-focus': system.interactive.primaryFocus,
    '--font-head': system.typography.headingFont,
    '--font-body': system.typography.bodyFont,
    '--radius': `${system.shape.borderRadius}px`,
    '--shadow': `${system.shape.shadow.x}px ${system.shape.shadow.y}px ${system.shape.shadow.blur}px rgba(0,0,0,0.2)`,
    '--base-size': `${system.typography.baseSize}px`,
    '--scale': system.typography.scaleRatio,
    // Headings
    '--h1': `${system.typography.baseSize * Math.pow(system.typography.scaleRatio, 5)}px`,
    '--h2': `${system.typography.baseSize * Math.pow(system.typography.scaleRatio, 4)}px`,
    '--h3': `${system.typography.baseSize * Math.pow(system.typography.scaleRatio, 3)}px`,
    '--h4': `${system.typography.baseSize * Math.pow(system.typography.scaleRatio, 2)}px`,
    '--h5': `${system.typography.baseSize * Math.pow(system.typography.scaleRatio, 1)}px`,
    '--h6': `${system.typography.baseSize}px`,
    '--body': `${system.typography.baseSize}px`,
    // Line Heights
    '--lh-h': system.typography.lineHeightHeading,
    '--lh-b': system.typography.lineHeightBody,
    // Advanced Typography
    '--type-spacing': `${system.typography.letterSpacing}em`,
    '--type-transform': system.typography.textTransform,
    '--type-decoration': system.typography.textDecoration,
    // Layout & Spacing
    '--unit': `${system.spacing.baseUnit}px`,
    '--container-max': `${system.layout.containerWidth}px`,
    '--section-gap': getSpacing(system.layout.sectionSpacing),
    // Button Architecture
    '--btn-radius': `${system.buttons.radius}px`,
    '--btn-border': `${system.buttons.borderWidth}px`,
    '--btn-transform': system.buttons.textTransform,
    '--btn-weight': system.buttons.fontWeight,
    '--btn-shadow': system.buttons.applyShadow ? 'var(--shadow)' : 'none',
    '--btn-border-style': system.buttons.borderStyle,
    '--btn-hover-scale': system.buttons.hoverScale,
    // Input Architecture
    '--input-radius': `${system.inputs.radius}px`,
    '--input-border': `${system.inputs.borderWidth}px`,
    '--input-bg': system.inputs.baseBg,
    '--input-border-color': system.inputs.borderColor,
    '--ring-width': `${system.inputs.focusRingWidth}px`,
    // Motion
    '--motion-duration': `${system.animation.duration}ms`,
    '--motion-ease': system.animation.easing,
  } as React.CSSProperties;

  const getContainerWidth = () => {
    switch (viewport) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  const ColorSwatch = ({ label, color }: { label: string, color: string }) => (
    <div className="flex flex-col gap-2">
        <div className="h-20 w-full border border-current opacity-20" style={{ backgroundColor: color, opacity: 1 }}></div>
        <div>
            <span className="block text-xs font-bold uppercase tracking-wider">{label}</span>
            <span className="block text-[10px] font-mono opacity-60 uppercase">{color}</span>
        </div>
    </div>
  );

  // --- Sub Components ---
  
  const SectionContainer = ({ children, className = '' }: any) => (
      <section 
        className={`border-b border-current border-opacity-10 ${className}`} 
        style={{ padding: 'var(--section-gap) var(--unit)' }}
      >
          <div className="max-w-[var(--container-max)] mx-auto relative">
            {children}
          </div>
      </section>
  );

  const HeroSection = () => (
    <SectionContainer>
        <div className={`flex ${system.layout.heroStyle === 'center' || system.layout.heroStyle === 'minimal' ? 'flex-col items-center text-center' : 'flex-col md:flex-row items-center'} gap-[calc(var(--unit)*6)]`}>
            {/* Text Content */}
            <div className={`flex-1 space-y-[calc(var(--unit)*3)] ${system.layout.heroStyle === 'center' ? 'max-w-3xl' : ''}`}>
                <h1 style={{ 
                    fontFamily: 'var(--font-head)', fontSize: 'var(--h1)', lineHeight: 'var(--lh-h)', 
                    fontWeight: 800, letterSpacing: 'var(--type-spacing)', 
                    textTransform: system.typography.textTransform as any 
                }}>
                    Build faster with precision tokens.
                </h1>
                {system.layout.heroStyle !== 'minimal' && (
                    <p style={{ fontSize: 'var(--h4)', lineHeight: 'var(--lh-b)', opacity: 0.8, fontFamily: 'var(--font-body)' }}>
                        Stop guessing spacing values. Define your grid, spacing, and rhythm once, and deploy everywhere.
                    </p>
                )}
                <div className={`flex gap-4 pt-2 ${system.layout.heroStyle === 'center' || system.layout.heroStyle === 'minimal' ? 'justify-center' : ''}`}>
                    <button style={{ 
                        backgroundColor: 'var(--primary)', color: '#fff', 
                        padding: '16px 32px', borderRadius: 'var(--btn-radius)', 
                        borderWidth: 'var(--btn-border)', borderStyle: 'var(--btn-border-style)', borderColor: 'transparent',
                        fontWeight: 'var(--btn-weight)' as any, textTransform: system.buttons.textTransform as any,
                        boxShadow: 'var(--btn-shadow)', transform: 'scale(1)',
                        transition: 'transform 0.2s', fontFamily: 'var(--font-body)'
                    }} className="hover:scale-[var(--btn-hover-scale)]">Primary Action</button>
                    
                    <button style={{ 
                        backgroundColor: 'transparent', color: 'var(--text)', 
                        padding: '16px 32px', borderRadius: 'var(--btn-radius)', 
                        borderWidth: 'var(--btn-border)', borderStyle: 'var(--btn-border-style)', borderColor: 'currentColor',
                        fontWeight: 'var(--btn-weight)' as any, textTransform: system.buttons.textTransform as any,
                        fontFamily: 'var(--font-body)'
                    }}>Secondary</button>
                </div>
            </div>

            {/* Visual/Image */}
            {system.layout.heroStyle !== 'minimal' && (
                <div className="flex-1 w-full">
                    <div className="aspect-video w-full rounded-[var(--radius)] overflow-hidden">
                        <div className="w-full h-full bg-current opacity-5 flex items-center justify-center border-2 border-dashed border-current">
                            <span className="opacity-50 font-mono text-sm">Hero Asset</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </SectionContainer>
  );

  const ProblemSection = () => (
      <SectionContainer className="bg-current bg-opacity-[0.03]">
            <div className="text-center mb-[calc(var(--unit)*6)]">
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h2)', fontWeight: 700 }}>Identify the Pain</h2>
            <p className="mt-4 opacity-70" style={{ fontSize: 'var(--body)', fontFamily: 'var(--font-body)' }}>Three columns to agitate the problem.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[calc(var(--unit)*4)]">
            {[1, 2, 3].map((i) => (
                <div key={i} className="p-[calc(var(--unit)*4)] bg-[var(--bg)] border border-current border-opacity-10 shadow-sm" style={{ borderRadius: 'var(--radius)' }}>
                    <ShieldCheck className="mb-4 text-[var(--accent)]" size={32} />
                    <h3 style={{ fontSize: 'var(--h4)', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-head)' }}>Pain Point {i}</h3>
                    <p style={{ fontSize: 'var(--body)', opacity: 0.7, fontFamily: 'var(--font-body)' }}>Description of the problem the user faces.</p>
                </div>
            ))}
            </div>
      </SectionContainer>
  );

  const ValuePropSection = () => (
    <SectionContainer>
        <div className="flex flex-col md:flex-row-reverse items-center gap-[calc(var(--unit)*8)]">
        <div className="flex-1 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--primary)' }}>The Solution</span>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h2)', fontWeight: 700 }}>How we solve it</h2>
            <p style={{ fontSize: 'var(--h5)', opacity: 0.8, lineHeight: 'var(--lh-b)', fontFamily: 'var(--font-body)' }}>
                Detailed explanation of the product value. Use bullet points for readability.
            </p>
            <ul className="space-y-2 mt-4 opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--success)]"/> Benefit One</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--success)]"/> Benefit Two</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--success)]"/> Benefit Three</li>
            </ul>
        </div>
        <div className="flex-1 w-full h-80 rounded-[var(--radius)] overflow-hidden">
            <div className="w-full h-full bg-[var(--secondary)] bg-opacity-10 flex items-center justify-center border border-current border-opacity-10">
                    <span className="opacity-40 font-mono">Product Shot</span>
            </div>
        </div>
        </div>
    </SectionContainer>
  );

  const GallerySection = () => (
      <SectionContainer>
          <div className="text-center mb-[calc(var(--unit)*6)]">
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h2)', fontWeight: 700 }}>Selected Works</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => (
                  <div key={i} className={`w-full rounded-[var(--radius)] overflow-hidden ${i === 1 || i === 4 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
                       <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-mono opacity-40">Img {i}</span>
                        </div>
                  </div>
              ))}
          </div>
      </SectionContainer>
  );

  const PricingSection = () => (
    <SectionContainer className="bg-current bg-opacity-[0.03]">
        <div className="text-center mb-[calc(var(--unit)*6)]">
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h2)', fontWeight: 700 }}>Simple Pricing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
                <div key={i} className={`p-8 bg-[var(--bg)] border border-current border-opacity-10 rounded-[var(--radius)] flex flex-col ${i === 2 ? 'ring-2 ring-[var(--primary)]' : 'border border-current'}`}>
                    <h3 className="font-bold mb-2" style={{ fontFamily: 'var(--font-head)' }}>Plan {i}</h3>
                    <div className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-body)' }}>$29<span className="text-sm font-normal">/mo</span></div>
                    <ul className="space-y-2 mb-8 opacity-70 text-sm flex-1" style={{ fontFamily: 'var(--font-body)' }}>
                        <li>Feature A</li>
                        <li>Feature B</li>
                    </ul>
                    <button style={{ 
                        backgroundColor: i === 2 ? 'var(--primary)' : 'transparent',
                        color: i === 2 ? '#fff' : 'currentColor',
                        padding: '12px',
                        borderRadius: 'var(--btn-radius)',
                        border: '1px solid currentColor',
                        fontFamily: 'var(--font-body)'
                    }}>Choose</button>
                </div>
            ))}
        </div>
    </SectionContainer>
  );

  const SocialProofSection = () => (
    <section className="border-y border-current border-opacity-10" style={{ padding: 'calc(var(--section-gap) / 2) var(--unit)' }}>
        <div className="max-w-[var(--container-max)] mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-6 font-mono">Trusted by leading companies</p>
            <div className="flex justify-center items-center gap-8 md:gap-16 opacity-40 grayscale flex-wrap">
                <div className="text-xl font-black font-serif">ACME</div>
                <div className="text-xl font-bold font-sans tracking-tighter">inter_global</div>
                <div className="text-xl font-medium font-mono">Struct.io</div>
                <div className="text-xl font-bold italic">VaporWare</div>
            </div>
        </div>
    </section>
  );

  const CtaSection = () => (
    <SectionContainer>
        <div className="text-center p-[calc(var(--unit)*8)] rounded-[var(--radius)] relative overflow-hidden border border-current" style={{ backgroundColor: 'var(--primary)', color: '#fff' }}>
                <div className="relative z-10 space-y-6">
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h2)', fontWeight: 800 }}>Ready to start?</h2>
                <p className="max-w-2xl mx-auto opacity-90" style={{ fontSize: 'var(--h5)', fontFamily: 'var(--font-body)' }}>
                    Stop rebuilding the same components. Start shipping.
                </p>
                <button style={{ 
                    backgroundColor: 'var(--bg)', color: 'var(--text)', 
                    padding: '16px 32px', borderRadius: 'var(--btn-radius)', 
                    fontWeight: 'var(--btn-weight)' as any,
                    marginTop: '16px', fontFamily: 'var(--font-body)'
                }}>Get Access Now</button>
                </div>
        </div>
    </SectionContainer>
  );

  // Map string IDs to components
  const renderSection = (id: string) => {
      switch(id) {
          case 'hero': return <HeroSection key={id} />;
          case 'problem': return <ProblemSection key={id} />;
          case 'features': return <ProblemSection key={id} />; // Reuse Problem for Features
          case 'solution': return <ValuePropSection key={id} />;
          case 'social-proof': return <SocialProofSection key={id} />;
          case 'gallery': return <GallerySection key={id} />;
          case 'pricing': return <PricingSection key={id} />;
          case 'product': return <ValuePropSection key={id} />; // Reuse value prop for now
          case 'cta': return <CtaSection key={id} />;
          case 'reviews': return <SocialProofSection key={id} />; // Reuse for now
          case 'services': return <ProblemSection key={id} />; // Reuse for now
          case 'about': return <ValuePropSection key={id} />; // Reuse ValueProp for About
          case 'collections': return <GallerySection key={id} />; // Reuse for now
          case 'shop': return <GallerySection key={id} />;
          case 'docs': return <ProblemSection key={id} />;
          case 'login': return <CtaSection key={id} />;
          case 'faq': return <ProblemSection key={id} />;
          case 'cart': return <PricingSection key={id} />;
          case 'booking': return <CtaSection key={id} />;
          case 'work': return <GallerySection key={id} />;
          default: return null;
      }
  };

  return (
    <div className="h-full flex flex-col border-r-2 border-[#1a1a1a] bg-gray-50">
      
      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden flex flex-col items-center relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Floating Toolbar inside Canvas */}
        <div className="absolute top-4 z-50 flex gap-4 bg-[#FFF2EC] border-2 border-[#1a1a1a] p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             <div className="flex bg-white border border-[#1a1a1a]">
                <button onClick={() => setViewMode('interactive')} className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 ${viewMode === 'interactive' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}>
                    <MousePointer2 size={14} /> Preview
                </button>
                <div className="w-[1px] bg-[#1a1a1a]"></div>
                <button onClick={() => setViewMode('styleguide')} className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 ${viewMode === 'styleguide' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}>
                    <LayoutTemplate size={14} /> Docs
                </button>
            </div>
            {viewMode === 'interactive' && (
                <>
                <div className="w-[1px] bg-[#1a1a1a] opacity-20"></div>
                <div className="flex bg-white border border-[#1a1a1a]">
                    <button onClick={() => setMode('light')} className={`px-3 py-1.5 text-xs font-bold ${mode === 'light' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}><Sun size={14}/></button>
                    <button onClick={() => setMode('dark')} className={`px-3 py-1.5 text-xs font-bold ${mode === 'dark' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}><Moon size={14}/></button>
                </div>
                <div className="flex gap-1">
                    <button onClick={() => setViewport('desktop')} className={`p-1.5 border border-[#1a1a1a] ${viewport === 'desktop' ? 'bg-[#1a1a1a] text-white' : 'bg-white'}`}><Monitor size={14}/></button>
                    <button onClick={() => setViewport('tablet')} className={`p-1.5 border border-[#1a1a1a] ${viewport === 'tablet' ? 'bg-[#1a1a1a] text-white' : 'bg-white'}`}><Tablet size={14}/></button>
                    <button onClick={() => setViewport('mobile')} className={`p-1.5 border border-[#1a1a1a] ${viewport === 'mobile' ? 'bg-[#1a1a1a] text-white' : 'bg-white'}`}><Smartphone size={14}/></button>
                </div>
                </>
            )}
        </div>

        {viewMode === 'interactive' ? (
            /* Interactive Landing Page Mode */
            <div
                className={`flex-col relative transition-all duration-300 ease-in-out h-full overflow-y-auto ${viewport !== 'desktop' ? 'mt-20 border-x-2 border-y-2 border-[#1a1a1a] shadow-2xl' : ''}`}
                style={{
                    ...style,
                    width: getContainerWidth(),
                    height: viewport !== 'desktop' ? '80%' : '100%',
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                }}
            >
                {/* Navbar */}
                <nav className={`w-full px-[var(--unit)] py-[calc(var(--unit)*2)] border-b border-current border-opacity-10 sticky top-0 bg-[var(--bg)] z-40 bg-opacity-95 backdrop-blur-sm`}>
                    <div className="max-w-[var(--container-max)] mx-auto flex justify-between items-center">
                        <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>MonoScale</span>
                        <div className="hidden md:flex gap-6 text-sm font-medium opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
                            <a href="#" className="hover:opacity-100">Product</a>
                            <a href="#" className="hover:opacity-100">Solutions</a>
                            <a href="#" className="hover:opacity-100">Pricing</a>
                        </div>
                        <button style={{ 
                            backgroundColor: 'var(--primary)', color: '#fff', 
                            padding: '8px 16px', borderRadius: 'var(--btn-radius)', 
                            border: 'none',
                            fontWeight: 'var(--btn-weight)' as any, fontSize: '12px',
                            fontFamily: 'var(--font-body)' 
                        }}>Get Started</button>
                    </div>
                </nav>

                <main className="w-full min-h-screen">
                    {/* DYNAMIC SECTION RENDERING BASED ON STRATEGY */}
                    {system.layout.sections.length > 0 ? (
                        system.layout.sections.map((sectionId, idx) => (
                             <React.Fragment key={`${sectionId}-${idx}`}>
                                 {renderSection(sectionId)}
                             </React.Fragment>
                        ))
                    ) : (
                        <div className="p-20 text-center font-mono opacity-50">
                            NO SECTIONS DEFINED.
                        </div>
                    )}

                    {/* FOOTER */}
                    <footer className={`bg-current bg-opacity-[0.05] border-t border-current border-opacity-10`} style={{ padding: 'var(--section-gap) var(--unit)' }}>
                        <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                             <div>
                                 <h4 className="font-bold mb-4" style={{ fontFamily: 'var(--font-head)' }}>Platform</h4>
                                 <ul className="space-y-2 text-sm opacity-60" style={{ fontFamily: 'var(--font-body)' }}>
                                     <li>Features</li>
                                     <li>Integrations</li>
                                     <li>Pricing</li>
                                 </ul>
                             </div>
                             <div>
                                 <h4 className="font-bold mb-4" style={{ fontFamily: 'var(--font-head)' }}>Resources</h4>
                                 <ul className="space-y-2 text-sm opacity-60" style={{ fontFamily: 'var(--font-body)' }}>
                                     <li>Documentation</li>
                                     <li>API Reference</li>
                                     <li>Community</li>
                                 </ul>
                             </div>
                             <div>
                                 <h4 className="font-bold mb-4" style={{ fontFamily: 'var(--font-head)' }}>Company</h4>
                                 <ul className="space-y-2 text-sm opacity-60" style={{ fontFamily: 'var(--font-body)' }}>
                                     <li>About</li>
                                     <li>Blog</li>
                                     <li>Careers</li>
                                 </ul>
                             </div>
                             <div>
                                 <h4 className="font-bold mb-4" style={{ fontFamily: 'var(--font-head)' }}>Legal</h4>
                                 <ul className="space-y-2 text-sm opacity-60" style={{ fontFamily: 'var(--font-body)' }}>
                                     <li>Privacy</li>
                                     <li>Terms</li>
                                 </ul>
                             </div>
                        </div>
                    </footer>
                </main>
            </div>
        ) : (
            /* Style Guide Mode */
             <div
                className="flex-col relative h-full w-full overflow-y-auto"
                style={{
                    ...style,
                    backgroundColor: system.colors.light.canvas, // Always light for styleguide base
                    color: system.colors.light.text,
                    fontFamily: 'var(--font-body)',
                }}
            >
                <div className="w-full max-w-[1000px] mx-auto p-16 space-y-16">
                    {/* Header */}
                    <div className="border-b-4 border-black pb-8">
                        <h1 className="text-6xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-head)' }}>Brand Guidelines</h1>
                        <p className="text-xl opacity-60">Design System Specification v1.0</p>
                    </div>

                    {/* Color Palette */}
                    <section>
                         <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-gray-300 pb-4 mb-8">01. Color Palette</h2>
                         <div className="grid grid-cols-4 gap-8">
                             <ColorSwatch label="Primary Brand" color={system.colors.primary} />
                             <ColorSwatch label="Secondary" color={system.colors.secondary} />
                             <ColorSwatch label="Accent" color={system.colors.accent} />
                         </div>
                         <div className="grid grid-cols-4 gap-8 mt-8">
                             <ColorSwatch label="Success" color={system.colors.success} />
                             <ColorSwatch label="Error" color={system.colors.error} />
                             <ColorSwatch label="Dark Surface" color={system.colors.dark.canvas} />
                             <ColorSwatch label="Light Surface" color={system.colors.light.canvas} />
                         </div>
                    </section>

                    {/* Typography */}
                    <section>
                         <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-gray-300 pb-4 mb-8">02. Typography</h2>
                         <div className="space-y-8">
                             {[5, 4, 3, 2, 1, 0].map((pow, i) => {
                                 const size = Math.round(system.typography.baseSize * Math.pow(system.typography.scaleRatio, pow));
                                 // H1 Fix: Map pow 5 (largest) to H1 (index 1 visually)
                                 // Loop is 5,4,3,2,1,0.
                                 // i is 0,1,2,3,4,5
                                 // Correct mapping: i=0 -> H1.
                                 const tag = pow === 0 ? 'Body' : 'H' + (i + 1);
                                 return (
                                     <div key={i} className="flex items-baseline border-b border-gray-200 pb-4">
                                         <div className="w-48 shrink-0 opacity-50 font-mono text-sm">
                                             {tag} <span className="mx-2">•</span> {size}px
                                         </div>
                                         <div 
                                            style={{ 
                                                fontSize: `${size}px`, 
                                                fontFamily: pow === 0 ? 'var(--font-body)' : 'var(--font-head)',
                                                fontWeight: pow === 0 ? 400 : 700,
                                                letterSpacing: 'var(--type-spacing)',
                                                textTransform: system.typography.textTransform as any,
                                                textDecoration: system.typography.textDecoration as any
                                            }}
                                         >
                                             The quick brown fox jumps over the lazy dog.
                                         </div>
                                     </div>
                                 )
                             })}
                         </div>
                    </section>

                    {/* Layout & Spacing */}
                    <section>
                         <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-gray-300 pb-4 mb-8">03. Layout & Spacing</h2>
                         <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <h4 className="font-bold mb-2">Structure</h4>
                                <ul className="list-disc pl-5 opacity-80 font-mono text-sm">
                                    <li>Container Max Width: {system.layout.containerWidth}px</li>
                                    <li>Section Spacing: {system.layout.sectionSpacing}</li>
                                    <li>Hero Style: {system.layout.heroStyle}</li>
                                    <li>Active Formula: {system.layout.activeFormula}</li>
                                </ul>
                            </div>
                         </div>
                         <div className="flex gap-4 items-end">
                             {[1, 2, 4, 8].map(mult => (
                                 <div key={mult} className="flex flex-col items-center gap-2">
                                     <div 
                                        className="bg-red-200 border border-red-500" 
                                        style={{ width: system.spacing.baseUnit * mult, height: system.spacing.baseUnit * mult }}
                                     ></div>
                                     <span className="text-[10px] font-mono">{system.spacing.baseUnit * mult}px</span>
                                 </div>
                             ))}
                         </div>
                    </section>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};