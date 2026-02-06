import React, { useState } from 'react';
import { DesignSystem } from '../types';
import { Sun, Moon, Monitor, Tablet, Smartphone, ArrowRight, AlertTriangle, CheckCircle, Star, LayoutTemplate, MousePointer2 } from 'lucide-react';

interface PreviewCanvasProps {
  system: DesignSystem;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ system }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = useState<'interactive' | 'styleguide'>('interactive');

  const colors = mode === 'light' ? system.colors.light : system.colors.dark;

  // Dynamic styles based on system tokens
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
    // Spacing
    '--unit': `${system.spacing.baseUnit}px`,
    '--container-max': `${system.spacing.maxContainerWidth}px`,
    // Button Architecture
    '--btn-radius': `${system.buttons.radius}px`,
    '--btn-border': `${system.buttons.borderWidth}px`,
    '--btn-transform': system.buttons.textTransform,
    '--btn-weight': system.buttons.fontWeight,
    '--btn-shadow': system.buttons.applyShadow ? 'var(--shadow)' : 'none',
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

  return (
    <div className="h-full flex flex-col border-r-2 border-[#1a1a1a] bg-[#e5e5e5]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#1a1a1a] bg-[#FFF2EC] shrink-0 z-20">
        
        <div className="flex gap-4">
             {/* View Mode Toggle */}
             <div className="flex bg-white border border-[#1a1a1a] rounded-sm overflow-hidden shadow-sm">
                <button
                    onClick={() => setViewMode('interactive')}
                    className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 transition-colors ${viewMode === 'interactive' ? 'bg-[#1a1a1a] text-white' : 'bg-transparent text-[#1a1a1a] hover:bg-gray-100'}`}
                >
                    <MousePointer2 size={14} /> Preview
                </button>
                <div className="w-[1px] bg-[#1a1a1a]"></div>
                <button
                    onClick={() => setViewMode('styleguide')}
                    className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 transition-colors ${viewMode === 'styleguide' ? 'bg-[#1a1a1a] text-white' : 'bg-transparent text-[#1a1a1a] hover:bg-gray-100'}`}
                >
                    <LayoutTemplate size={14} /> Docs
                </button>
            </div>

            {/* Theme Toggle (Only for Interactive) */}
            {viewMode === 'interactive' && (
                <div className="flex bg-white border border-[#1a1a1a] rounded-sm overflow-hidden shadow-sm">
                    <button
                        onClick={() => setMode('light')}
                        className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 transition-colors ${mode === 'light' ? 'bg-[#1a1a1a] text-white' : 'bg-transparent text-[#1a1a1a] hover:bg-gray-100'}`}
                    >
                        <Sun size={14} /> Light
                    </button>
                    <div className="w-[1px] bg-[#1a1a1a]"></div>
                    <button
                        onClick={() => setMode('dark')}
                        className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 transition-colors ${mode === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-transparent text-[#1a1a1a] hover:bg-gray-100'}`}
                    >
                        <Moon size={14} /> Dark
                    </button>
                </div>
            )}
        </div>

        {/* Viewport Toggle (Only for Interactive) */}
        {viewMode === 'interactive' && (
            <div className="flex gap-2">
                {[
                    { id: 'desktop', icon: Monitor, label: 'Desktop' },
                    { id: 'tablet', icon: Tablet, label: 'Tablet' },
                    { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                ].map((v) => (
                    <button
                        key={v.id}
                        onClick={() => setViewport(v.id as any)}
                        className={`p-2 border border-[#1a1a1a] rounded-sm transition-all ${viewport === v.id ? 'bg-[#1a1a1a] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]' : 'bg-white text-[#1a1a1a] hover:bg-gray-100'}`}
                        title={v.label}
                    >
                        <v.icon size={16} />
                    </button>
                ))}
            </div>
        )}
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden flex flex-col items-center bg-[#e5e5e5] relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {viewMode === 'interactive' ? (
            /* Interactive Mode */
            <div
                className={`flex-col relative transition-all duration-300 ease-in-out h-full overflow-y-auto ${viewport !== 'desktop' ? 'shadow-2xl border-x-2 border-[#1a1a1a]' : ''}`}
                style={{
                    ...style,
                    width: getContainerWidth(),
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                }}
            >
                <div className="w-full min-h-full p-[calc(var(--unit)*4)]">
                    <div className="max-w-[var(--container-max)] mx-auto flex flex-col gap-[calc(var(--unit)*6)]">
                         {/* Header / Intro */}
                        <div className="pb-[calc(var(--unit)*4)] border-b border-current border-opacity-10">
                            <div className="flex items-center justify-between mb-[calc(var(--unit)*2)]">
                                <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border border-current opacity-60">
                                    System v3.0
                                </span>
                                <div className="flex gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[var(--primary)]"></span>
                                    <span className="w-3 h-3 rounded-full bg-[var(--secondary)]"></span>
                                    <span className="w-3 h-3 rounded-full bg-[var(--accent)]"></span>
                                </div>
                            </div>
                            <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h1)', lineHeight: 'var(--lh-h)', fontWeight: 700 }}>
                                Global Design Tokens
                            </h1>
                            <p style={{ fontSize: 'var(--h3)', lineHeight: 'var(--lh-b)' }} className="mt-[calc(var(--unit)*2)] opacity-70 max-w-2xl">
                                A live demonstration of the extended color palette, responsive layout sizing, and typography scale.
                            </p>
                        </div>

                        {/* Alerts & Messages (New Colors) */}
                        <section className="grid gap-[calc(var(--unit)*2)]">
                            <h6 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-[calc(var(--unit))]">System Messages</h6>
                            
                            <div className="p-[calc(var(--unit)*2)] flex items-start gap-3 border-l-4" style={{ 
                                backgroundColor: 'rgba(var(--success-rgb), 0.1)', 
                                borderColor: 'var(--success)',
                                borderRadius: 'var(--radius)'
                            }}>
                                <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                                <div>
                                    <h5 className="text-sm font-bold" style={{ color: 'var(--success)' }}>Success Message</h5>
                                    <p className="text-xs opacity-80 mt-1">Your changes have been saved successfully to the local database.</p>
                                </div>
                            </div>

                            <div className="p-[calc(var(--unit)*2)] flex items-start gap-3 border-l-4" style={{ 
                                backgroundColor: 'rgba(var(--error-rgb), 0.1)', 
                                borderColor: 'var(--error)',
                                borderRadius: 'var(--radius)'
                            }}>
                                <AlertTriangle size={20} style={{ color: 'var(--error)' }} />
                                <div>
                                    <h5 className="text-sm font-bold" style={{ color: 'var(--error)' }}>Critical Error</h5>
                                    <p className="text-xs opacity-80 mt-1">Unable to connect to the server. Please check your connection.</p>
                                </div>
                            </div>

                            <div className="p-[calc(var(--unit)*2)] flex items-center justify-between border border-current border-opacity-10" style={{ 
                                borderRadius: 'var(--radius)',
                                backgroundColor: 'var(--bg)'
                            }}>
                                <div className="flex items-center gap-2">
                                    <Star size={16} style={{ fill: 'var(--accent)', color: 'var(--accent)' }} />
                                    <span className="text-xs font-bold">Premium Feature Unlocked</span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-1 bg-[var(--accent)] text-white rounded-full">NEW</span>
                            </div>
                        </section>

                        {/* Typography Scale Section */}
                        <section>
                            <h6 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-[calc(var(--unit)*2)]">Type Scale</h6>
                            <div className="space-y-[calc(var(--unit)*2)]">
                                <div>
                                    <span className="text-[10px] opacity-40 block mb-1 font-mono">H1 / {Math.round(system.typography.baseSize * Math.pow(system.typography.scaleRatio, 5))}px</span>
                                    <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h1)', lineHeight: 'var(--lh-h)', fontWeight: 700 }}>The quick brown fox</h1>
                                </div>
                                <div>
                                    <span className="text-[10px] opacity-40 block mb-1 font-mono">H2 / {Math.round(system.typography.baseSize * Math.pow(system.typography.scaleRatio, 4))}px</span>
                                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h2)', lineHeight: 'var(--lh-h)', fontWeight: 700 }}>Jumps over the lazy dog</h2>
                                </div>
                                <div>
                                    <span className="text-[10px] opacity-40 block mb-1 font-mono">H3 / {Math.round(system.typography.baseSize * Math.pow(system.typography.scaleRatio, 3))}px</span>
                                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--h3)', lineHeight: 'var(--lh-h)', fontWeight: 700 }}>Visual hierarchy matters</h3>
                                </div>
                            </div>
                        </section>

                         {/* Body Text Section */}
                         <section className="grid grid-cols-1 md:grid-cols-2 gap-[calc(var(--unit)*4)]">
                            <div>
                                 <h6 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-[calc(var(--unit)*2)]">Body Copy</h6>
                                 <p style={{ fontSize: 'var(--body)', lineHeight: 'var(--lh-b)' }} className="opacity-90">
                                    This paragraph demonstrates the primary body style. It's crucial for long-form content readability.
                                    The spacing between lines is governed by the line-height token, ensuring the text breathes properly.
                                    <br/><br/>
                                    We can also test <a href="#" style={{ color: 'var(--primary)', transition: 'all var(--motion-duration) var(--motion-ease)' }} className="underline decoration-2 underline-offset-4 hover:opacity-80">inline links</a> within the text block.
                                    They should be clearly distinguishable from the surrounding text.
                                </p>
                            </div>
                            <div className="p-[calc(var(--unit)*3)] border border-current border-opacity-10 flex flex-col justify-center gap-4" style={{ borderRadius: 'var(--radius)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                 <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white font-bold">JD</div>
                                     <div>
                                         <p className="text-sm font-bold">John Doe</p>
                                         <p className="text-xs opacity-60">Product Designer</p>
                                     </div>
                                 </div>
                                 <p className="text-sm italic opacity-70">"This system provides an incredible level of fidelity for rapid prototyping."</p>
                            </div>
                        </section>
                        
                         {/* Button Architecture Section */}
                        <section>
                            <h6 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-[calc(var(--unit)*2)]">Buttons & Actions</h6>
                            
                            <div className="p-[calc(var(--unit)*4)] border border-current border-opacity-20 bg-current bg-opacity-[0.02]" style={{ borderRadius: 'var(--radius)' }}>
                                <div className="grid gap-[calc(var(--unit)*3)] max-w-md">
                                    
                                    {/* Buttons */}
                                    <div className="flex flex-wrap items-center gap-[calc(var(--unit)*2)] mt-[calc(var(--unit))]">
                                        <button 
                                            className="px-[calc(var(--unit)*3)] py-[calc(var(--unit)*1.5)] transform active:scale-95 hover:brightness-110 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] flex items-center gap-2"
                                            style={{ 
                                                backgroundColor: system.buttons.variants.primary.bg, 
                                                color: system.buttons.variants.primary.text,
                                                borderColor: system.buttons.variants.primary.border,
                                                borderStyle: 'solid',
                                                borderRadius: 'var(--btn-radius)',
                                                borderWidth: 'var(--btn-border)',
                                                textTransform: system.buttons.textTransform,
                                                fontWeight: system.buttons.fontWeight,
                                                boxShadow: 'var(--btn-shadow)',
                                                transition: 'all var(--motion-duration) var(--motion-ease)'
                                            }}
                                        >
                                            Primary Action <ArrowRight size={16} />
                                        </button>

                                        <button 
                                            className="px-[calc(var(--unit)*3)] py-[calc(var(--unit)*1.5)] transform active:scale-95 hover:brightness-110 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--secondary)]"
                                            style={{ 
                                                backgroundColor: system.buttons.variants.secondary.bg,
                                                color: system.buttons.variants.secondary.text,
                                                borderColor: system.buttons.variants.secondary.border,
                                                borderStyle: 'solid',
                                                borderRadius: 'var(--btn-radius)',
                                                borderWidth: 'var(--btn-border)',
                                                textTransform: system.buttons.textTransform,
                                                fontWeight: system.buttons.fontWeight,
                                                boxShadow: 'var(--btn-shadow)',
                                                transition: 'all var(--motion-duration) var(--motion-ease)'
                                            }}
                                        >
                                            Secondary
                                        </button>

                                        <button 
                                            className="px-[calc(var(--unit)*3)] py-[calc(var(--unit)*1.5)] transform hover:bg-opacity-10"
                                            style={{ 
                                                backgroundColor: 'transparent',
                                                color: system.buttons.variants.ghost.text,
                                                borderColor: system.buttons.variants.ghost.border,
                                                borderStyle: 'solid',
                                                borderRadius: 'var(--btn-radius)',
                                                borderWidth: 'var(--btn-border)',
                                                textTransform: system.buttons.textTransform,
                                                fontWeight: system.buttons.fontWeight,
                                                transition: 'all var(--motion-duration) var(--motion-ease)'
                                                // Ghost usually doesn't have shadow unless forced
                                            }}
                                        >
                                            Ghost Action
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Form & Input Section */}
                        <section>
                            <h6 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-[calc(var(--unit)*2)]">Form Architecture</h6>
                            <div className="p-[calc(var(--unit)*4)] border border-current border-opacity-20 bg-current bg-opacity-[0.02]" style={{ borderRadius: 'var(--radius)' }}>
                                <div className="max-w-md space-y-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">Email Address</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. name@company.com"
                                            className="w-full px-4 py-3 outline-none focus:ring-[length:var(--ring-width)] focus:ring-[var(--primary)] focus:border-[var(--primary)] placeholder-current placeholder-opacity-40"
                                            style={{
                                                backgroundColor: 'var(--input-bg)',
                                                borderColor: 'var(--input-border-color)',
                                                borderWidth: 'var(--input-border)',
                                                borderRadius: 'var(--input-radius)',
                                                color: 'var(--text)',
                                                transition: 'all var(--motion-duration) var(--motion-ease)'
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">Role</label>
                                            <select 
                                                className="w-full px-4 py-3 outline-none focus:ring-[length:var(--ring-width)] focus:ring-[var(--primary)] focus:border-[var(--primary)] appearance-none"
                                                style={{
                                                    backgroundColor: 'var(--input-bg)',
                                                    borderColor: 'var(--input-border-color)',
                                                    borderWidth: 'var(--input-border)',
                                                    borderRadius: 'var(--input-radius)',
                                                    color: 'var(--text)',
                                                    transition: 'all var(--motion-duration) var(--motion-ease)'
                                                }}
                                            >
                                                <option>Product Designer</option>
                                                <option>Developer</option>
                                                <option>Manager</option>
                                            </select>
                                        </div>
                                         <div className="flex flex-col justify-end">
                                            <button 
                                                className="w-full py-3 font-bold text-center hover:brightness-110"
                                                 style={{ 
                                                    backgroundColor: 'var(--primary)', 
                                                    color: '#fff',
                                                    borderRadius: 'var(--btn-radius)',
                                                    transition: 'all var(--motion-duration) var(--motion-ease)'
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 pt-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="hidden peer" />
                                            <div 
                                                className="w-5 h-5 border-2 flex items-center justify-center peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)]"
                                                style={{ 
                                                    borderColor: 'var(--input-border-color)',
                                                    borderRadius: '4px',
                                                    transition: 'all var(--motion-duration) var(--motion-ease)'
                                                }}
                                            >
                                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">Subscribe to newsletter</span>
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="hidden peer" defaultChecked />
                                            <div 
                                                className="w-10 h-6 rounded-full relative bg-gray-300 peer-checked:bg-[var(--success)] transition-colors"
                                                 style={{ transition: 'background-color var(--motion-duration) var(--motion-ease)' }}
                                            >
                                                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-5 shadow-sm"></div>
                                            </div>
                                            <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">Notifications</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-current border-opacity-10 rounded-lg opacity-40">
                            <span className="text-sm font-mono">End of content (Scroll test)</span>
                        </div>
                    </div>
                </div>
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
                                 const tag = pow === 0 ? 'Body' : `H${6-i}`;
                                 return (
                                     <div key={i} className="flex items-baseline border-b border-gray-200 pb-4">
                                         <div className="w-48 shrink-0 opacity-50 font-mono text-sm">
                                             {tag} <span className="mx-2">•</span> {size}px
                                         </div>
                                         <div 
                                            style={{ 
                                                fontSize: `${size}px`, 
                                                fontFamily: pow === 0 ? 'var(--font-body)' : 'var(--font-head)',
                                                fontWeight: pow === 0 ? 400 : 700
                                            }}
                                         >
                                             The quick brown fox jumps over the lazy dog.
                                         </div>
                                     </div>
                                 )
                             })}
                         </div>
                    </section>

                    {/* Spacing */}
                    <section>
                         <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-gray-300 pb-4 mb-8">03. Spacing Scale</h2>
                         <div className="flex gap-4 items-end">
                             {[1, 2, 4, 6, 8, 12].map(mult => (
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

                    <div className="pt-16 text-center opacity-40 text-sm font-mono">
                        Generated by MonoScale Configurator
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};