import React, { useState, useRef, useEffect } from 'react';
import { DesignSystem, Category, BusinessType, BrandVibe, ConversionGoal } from '../types';
import { POPULAR_FONTS } from '../constants';
import { generateDesignSystem } from '../services/geminiService';
import { downloadJSON, generateCSS, generateTailwindConfig, generateCursorPrompt } from '../services/exportUtils';
import { getRecommendedSitemap } from '../services/strategyUtils';
import { calculateContrastRatio, generateDarkCounterpart } from '../services/utils';
import { Wand2, RefreshCw, Loader2, Download, Upload, Code, Check, Copy, X, Lightbulb, Map, FileText, Bot } from 'lucide-react';

interface WorkbenchPanelProps {
  system: DesignSystem;
  onChange: (newSystem: DesignSystem) => void;
  category: Category;
}

export const WorkbenchPanel: React.FC<WorkbenchPanelProps> = ({ system, onChange, category }) => {
  const [syncDarkMode, setSyncDarkMode] = useState(false);
  const [loadingFont, setLoadingFont] = useState<string | null>(null);
  
  // AI & Project State
  const [prompt, setPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeTab, setCodeTab] = useState<'blueprint' | 'css' | 'tailwind'>('blueprint');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- AI & Project Handlers ---

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsAiLoading(true);
    try {
      const { system: newSystem } = await generateDesignSystem(prompt);
      onChange(newSystem);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onChange(json);
      } catch (err) { alert("Invalid JSON file."); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeContent = () => {
    if (codeTab === 'css') return generateCSS(system);
    if (codeTab === 'tailwind') return generateTailwindConfig(system);
    return generateCursorPrompt(system);
  };

  // --- Layout Strategy Logic ---
  
  const applyStrategy = (business: BusinessType, vibe: BrandVibe, goal: ConversionGoal) => {
      let formula = system.layout.activeFormula;
      let sections = system.layout.sections;
      let hero = system.layout.heroStyle;
      let width = system.layout.containerWidth;
      let spacing = system.layout.sectionSpacing;

      // Logic Engine
      if (business === 'ecommerce' || vibe === 'luxury') {
          formula = 'luxury';
          sections = ['hero', 'gallery', 'product', 'social-proof', 'cta'];
          hero = 'center';
          width = 1600; // Wider for luxury
          spacing = 'spacious';
      } else if (business === 'service' || goal === 'lead') {
          formula = 'pas'; // Problem-Agitation-Solution
          sections = ['hero', 'problem', 'solution', 'social-proof', 'cta'];
          hero = 'split';
          width = 1200;
          spacing = 'comfortable';
      } else if (business === 'portfolio') {
          formula = 'showcase';
          sections = ['hero', 'gallery', 'solution', 'cta'];
          hero = 'minimal';
          width = 1400;
      } else {
          // Default SaaS / Content
          formula = 'storybrand';
          sections = ['hero', 'problem', 'solution', 'social-proof', 'pricing', 'cta'];
          hero = 'split';
          width = 1200;
      }

      // Get Site Architecture Recommendation
      const pages = getRecommendedSitemap(business);

      onChange({
          ...system,
          layout: {
              ...system.layout,
              businessType: business,
              brandVibe: vibe,
              conversionGoal: goal,
              activeFormula: formula,
              sections: sections,
              heroStyle: hero,
              containerWidth: width,
              sectionSpacing: spacing,
              pages: pages
          }
      });
  };

  const togglePage = (pageId: string) => {
      const updatedPages = system.layout.pages.map(p => 
          p.id === pageId ? { ...p, selected: !p.selected } : p
      );
      updateSystem('layout', 'pages', updatedPages);
  };

  // --- Reusable Controls ---

  const SliderControl = ({ 
    label, value, min, max, step, unit = '', onChange 
  }: { 
    label: string, value: number, min: number, max: number, step: number, unit?: string, onChange: (val: number) => void 
  }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase">{label}</label>
            <span className="text-xs font-mono">{value.toFixed(step < 1 ? 2 : 0)}{unit}</span>
        </div>
        <input 
            type="range" 
            min={min} max={max} step={step} value={value}
            onInput={(e) => onChange(Number((e.target as HTMLInputElement).value))}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full cursor-pointer accent-[#1a1a1a]"
        />
    </div>
  );

  const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
      <div className="space-y-1 mb-3">
        <label className="text-xs font-bold uppercase block">{label}</label>
        <div className="flex gap-2">
          <input
            type="color" value={value}
            onInput={(e) => onChange((e.target as HTMLInputElement).value)}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-8 border border-[#1a1a1a] cursor-pointer p-0"
          />
          <input
            type="text" value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent border border-[#1a1a1a] px-2 py-1 text-xs font-mono"
          />
        </div>
      </div>
  );

  // --- Helpers ---
  const updateSystem = (section: keyof DesignSystem, key: string, value: any) => {
    onChange({ ...system, [section]: { ...system[section], [key]: value } });
  };
  const updateColor = (path: string[], value: string) => {
    const newSystem = { ...system };
    let current: any = newSystem.colors;
    for (let i = 0; i < path.length - 1; i++) { current = current[path[i]]; }
    current[path[path.length - 1]] = value;
    if (syncDarkMode && path[0] === 'light') {
        if (path[1] === 'canvas') newSystem.colors.dark.canvas = generateDarkCounterpart(value, 'background');
        else if (path[1] === 'text') newSystem.colors.dark.text = generateDarkCounterpart(value, 'text');
    }
    onChange(newSystem);
  };
  const handleFontChange = (type: 'headingFont' | 'bodyFont', value: string) => {
      setLoadingFont(type);
      updateSystem('typography', type, value);
      setTimeout(() => setLoadingFont(null), 800);
  };

  // --- Category Renderers ---

  const renderPalette = () => (
    <>
       <div className="p-4 border-b-2 border-[#1a1a1a] bg-gray-50 grid grid-cols-2 gap-2 sticky top-0 z-10">
          <div className="h-16 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm" style={{ backgroundColor: system.colors.primary }}>Primary</div>
          <div className="h-16 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm" style={{ backgroundColor: system.colors.secondary }}>Secondary</div>
          <div className="h-16 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm" style={{ backgroundColor: system.colors.accent }}>Accent</div>
          <div className="h-16 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm" style={{ backgroundColor: system.colors.success }}>Success</div>
       </div>
       <div className="p-4 space-y-6">
          <div>
              <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Brand Colors</h3>
              <ColorInput label="Primary" value={system.colors.primary} onChange={(v) => updateColor(['primary'], v)} />
              <ColorInput label="Secondary" value={system.colors.secondary} onChange={(v) => updateColor(['secondary'], v)} />
              <ColorInput label="Accent" value={system.colors.accent} onChange={(v) => updateColor(['accent'], v)} />
              <ColorInput label="Success" value={system.colors.success} onChange={(v) => updateColor(['success'], v)} />
              <ColorInput label="Error" value={system.colors.error} onChange={(v) => updateColor(['error'], v)} />
          </div>
          <div>
              <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Light Theme</h3>
              <ColorInput label="Canvas" value={system.colors.light.canvas} onChange={(v) => updateColor(['light', 'canvas'], v)} />
              <ColorInput label="Text" value={system.colors.light.text} onChange={(v) => updateColor(['light', 'text'], v)} />
          </div>
          <div>
              <div className="flex justify-between items-center border-b border-[#1a1a1a] pb-2 mb-4">
                <h3 className="font-bold text-sm">Dark Theme</h3>
                <button 
                    onClick={() => {
                      const newSystem = { ...system };
                      newSystem.colors.dark.canvas = generateDarkCounterpart(system.colors.light.canvas, 'background');
                      newSystem.colors.dark.text = generateDarkCounterpart(system.colors.light.text, 'text');
                      onChange(newSystem);
                    }} 
                    className="p-1 hover:bg-[#1a1a1a] hover:text-white rounded-full transition-colors"
                    title="Auto-generate"
                >
                    <Wand2 size={12} />
                </button>
              </div>
              <ColorInput label="Canvas" value={system.colors.dark.canvas} onChange={(v) => updateColor(['dark', 'canvas'], v)} />
              <ColorInput label="Text" value={system.colors.dark.text} onChange={(v) => updateColor(['dark', 'text'], v)} />
              <div className="pt-2 flex items-center gap-2">
                <input type="checkbox" id="syncDarkMode" checked={syncDarkMode} onChange={(e) => setSyncDarkMode(e.target.checked)} className="accent-[#1a1a1a]" />
                <label htmlFor="syncDarkMode" className="text-[10px] cursor-pointer flex items-center gap-1 opacity-80 hover:opacity-100"><RefreshCw size={10} /> Sync with Light</label>
            </div>
          </div>
       </div>
    </>
  );

  const renderTypography = () => (
    <>
        <div className="p-6 border-b-2 border-[#1a1a1a] bg-gray-50 flex flex-col justify-center items-center text-center space-y-2 sticky top-0 z-10">
            <span className="text-4xl transition-all" style={{ 
                fontFamily: system.typography.headingFont,
                letterSpacing: `${system.typography.letterSpacing}em`,
                textTransform: system.typography.textTransform as any,
                textDecoration: system.typography.textDecoration as any
            }}>Aa</span>
            <span className="text-sm opacity-60 transition-all" style={{ fontFamily: system.typography.bodyFont }}>The quick brown fox</span>
        </div>
        <div className="p-4 space-y-6">
            <div>
                <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Font Family</h3>
                <div className="mb-4">
                    <label className="text-xs font-bold uppercase block mb-1 flex justify-between">Heading Font {loadingFont === 'headingFont' && <Loader2 size={12} className="animate-spin text-[#1a1a1a]"/>}</label>
                    <select className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none" value={system.typography.headingFont} onChange={(e) => handleFontChange('headingFont', e.target.value)}>
                        {POPULAR_FONTS.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="text-xs font-bold uppercase block mb-1 flex justify-between">Body Font {loadingFont === 'bodyFont' && <Loader2 size={12} className="animate-spin text-[#1a1a1a]"/>}</label>
                    <select className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none" value={system.typography.bodyFont} onChange={(e) => handleFontChange('bodyFont', e.target.value)}>
                        {POPULAR_FONTS.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Scale & Rhythm</h3>
                <SliderControl label="Base Size" value={system.typography.baseSize} min={12} max={24} step={1} unit="px" onChange={(v) => updateSystem('typography', 'baseSize', v)} />
                <SliderControl label="Scale Ratio" value={system.typography.scaleRatio} min={1.0} max={2.0} step={0.001} onChange={(v) => updateSystem('typography', 'scaleRatio', v)} />
                <SliderControl label="Line Height (Head)" value={system.typography.lineHeightHeading} min={0.8} max={2.5} step={0.1} onChange={(v) => updateSystem('typography', 'lineHeightHeading', v)} />
                <SliderControl label="Line Height (Body)" value={system.typography.lineHeightBody} min={0.8} max={2.5} step={0.1} onChange={(v) => updateSystem('typography', 'lineHeightBody', v)} />
            </div>
        </div>
    </>
  );

  const renderLayout = () => {
      // Recommendation logic for UI display
      const getRec = () => {
          if (system.layout.activeFormula === 'luxury') return { title: "The Vogue Protocol", desc: "Luxury demands 'negative space' to increase perceived value. Focus purely on visual desire." };
          if (system.layout.activeFormula === 'pas') return { title: "P.A.S. Formula", desc: "For services: Problem, Agitation, Solution. This structure builds trust by showing you understand the user's pain." };
          if (system.layout.activeFormula === 'showcase') return { title: "Visual Showcase", desc: "For portfolios: Let the work speak. Minimal text, maximum impact." };
          return { title: "The StoryBrand Framework", desc: "A classic hero's journey: A character (user) has a problem, meets a guide (you), who gives them a plan." };
      };
      const rec = getRec();

      return (
      <>
         {/* Zone A: Strategy Dashboard (No more wireframe preview here, wireframe is on main canvas) */}
         <div className="p-4 bg-[#fffaf8] border-b-2 border-[#1a1a1a] sticky top-0 z-10">
             <div className="flex items-start gap-2">
                 <div className="mt-1 p-1 bg-[#1a1a1a] text-white rounded-full"><Lightbulb size={12}/></div>
                 <div>
                     <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Recommendation</span>
                     <h4 className="font-bold text-sm">{rec.title}</h4>
                     <p className="text-xs opacity-70 mt-1 leading-snug">{rec.desc}</p>
                 </div>
             </div>
         </div>

         <div className="p-4 space-y-8">
             {/* The Strategist Form */}
             <div>
                 <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Strategy Engine</h3>
                 <div className="space-y-4">
                     <div>
                        <label className="text-xs font-bold uppercase block mb-1">What are you building?</label>
                        <select 
                            className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none"
                            value={system.layout.businessType}
                            onChange={(e) => applyStrategy(e.target.value as any, system.layout.brandVibe, system.layout.conversionGoal)}
                        >
                            <option value="saas">SaaS / Tech Product</option>
                            <option value="ecommerce">E-Commerce / Retail</option>
                            <option value="service">Service / Agency / Consultant</option>
                            <option value="portfolio">Portfolio / Personal Site</option>
                        </select>
                     </div>
                     <div>
                        <label className="text-xs font-bold uppercase block mb-1">Brand Vibe?</label>
                        <select 
                            className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none"
                            value={system.layout.brandVibe}
                            onChange={(e) => applyStrategy(system.layout.businessType, e.target.value as any, system.layout.conversionGoal)}
                        >
                            <option value="innovative">Innovative & Bold</option>
                            <option value="trustworthy">Trustworthy & Corporate</option>
                            <option value="luxury">Luxury & Minimal</option>
                            <option value="friendly">Friendly & Approachable</option>
                        </select>
                     </div>
                     <div>
                        <label className="text-xs font-bold uppercase block mb-1">Primary Goal?</label>
                        <select 
                            className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none"
                            value={system.layout.conversionGoal}
                            onChange={(e) => applyStrategy(system.layout.businessType, system.layout.brandVibe, e.target.value as any)}
                        >
                            <option value="lead">Get Leads / Calls</option>
                            <option value="purchase">Direct Purchase</option>
                            <option value="awareness">Brand Awareness</option>
                        </select>
                     </div>
                 </div>
             </div>

             {/* Site Architecture List */}
             <div>
                 <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4 flex items-center gap-2"><Map size={14} /> Site Architecture</h3>
                 <div className="space-y-2">
                     {system.layout.pages.map((page) => (
                         <div key={page.id} className="flex items-start gap-2 p-2 bg-white border border-gray-200">
                             <input 
                                type="checkbox" 
                                checked={page.selected}
                                onChange={() => togglePage(page.id)}
                                className="mt-1 accent-[#1a1a1a]"
                             />
                             <div>
                                 <div className="flex items-center gap-2">
                                     <span className={`text-xs font-bold ${page.selected ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>{page.name}</span>
                                     {page.required && <span className="text-[9px] bg-[#1a1a1a] text-white px-1 rounded-sm uppercase">Essential</span>}
                                 </div>
                                 <p className="text-[10px] text-gray-500 italic">{page.reason}</p>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Fine Tuning */}
             <div>
                 <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Tactical Override</h3>
                 <div className="mb-4">
                    <label className="text-xs font-bold uppercase block mb-1">Hero Style</label>
                    <select 
                        className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none"
                        value={system.layout.heroStyle}
                        onChange={(e) => updateSystem('layout', 'heroStyle', e.target.value)}
                    >
                        <option value="split">Split (Left/Right)</option>
                        <option value="center">Centered (Apple)</option>
                        <option value="minimal">Minimal (Type Only)</option>
                    </select>
                </div>
                <SliderControl label="Max Width" value={system.layout.containerWidth} min={960} max={1600} step={10} unit="px" onChange={(v) => updateSystem('layout', 'containerWidth', v)} />
                 <div className="mb-4">
                    <label className="text-xs font-bold uppercase block mb-1">Section Spacing</label>
                    <div className="flex border border-[#1a1a1a]">
                        {['compact', 'comfortable', 'spacious'].map((s) => (
                             <button 
                                key={s}
                                onClick={() => updateSystem('layout', 'sectionSpacing', s)}
                                className={`flex-1 py-2 text-[10px] uppercase font-bold border-r border-[#1a1a1a] last:border-r-0 ${system.layout.sectionSpacing === s ? 'bg-[#1a1a1a] text-white' : 'bg-white hover:bg-gray-100'}`}
                             >
                                 {s.slice(0, 4)}
                             </button>
                        ))}
                    </div>
                </div>
             </div>
         </div>
      </>
  )};

  const renderButtons = () => (
      <>
            <div className="p-8 border-b-2 border-[#1a1a1a] bg-[#e5e5e5] flex flex-col items-center gap-4 sticky top-0 z-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
                <button className="px-4 py-2 text-xs" style={{ 
                    backgroundColor: system.buttons.variants.primary.bg,
                    color: system.buttons.variants.primary.text,
                    border: `${system.buttons.borderWidth}px ${system.buttons.borderStyle} ${system.buttons.variants.primary.border}`,
                    borderRadius: system.buttons.radius,
                    textTransform: system.buttons.textTransform as any,
                    fontWeight: system.buttons.fontWeight,
                    transform: `scale(${system.buttons.hoverScale})`,
                    boxShadow: system.buttons.applyShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}>Primary Button</button>
            </div>
            <div className="p-4 space-y-6">
                <div>
                    <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Structure</h3>
                    <SliderControl label="Roundness" value={system.buttons.radius} min={0} max={50} step={1} unit="px" onChange={(v) => updateSystem('buttons', 'radius', v)} />
                    <SliderControl label="Border Width" value={system.buttons.borderWidth} min={0} max={8} step={1} unit="px" onChange={(v) => updateSystem('buttons', 'borderWidth', v)} />
                    <div className="mb-4">
                        <label className="text-xs font-bold uppercase block mb-1">Border Style</label>
                        <select className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none" value={system.buttons.borderStyle} onChange={(e) => updateSystem('buttons', 'borderStyle', e.target.value)}>
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                        </select>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Style</h3>
                    <div className="mb-4">
                        <label className="text-xs font-bold uppercase block mb-1">Text Case</label>
                        <select className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none" value={system.buttons.textTransform} onChange={(e) => updateSystem('buttons', 'textTransform', e.target.value)}>
                            <option value="none">Normal</option>
                            <option value="uppercase">Uppercase</option>
                            <option value="capitalize">Capitalize</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="text-xs font-bold uppercase block mb-1">Font Weight</label>
                        <select className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none" value={system.buttons.fontWeight} onChange={(e) => updateSystem('buttons', 'fontWeight', e.target.value)}>
                            <option value="400">Regular</option>
                            <option value="500">Medium</option>
                            <option value="600">SemiBold</option>
                            <option value="700">Bold</option>
                        </select>
                    </div>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" checked={system.buttons.applyShadow} onChange={(e) => updateSystem('buttons', 'applyShadow', e.target.checked)} className="mr-2 accent-[#1a1a1a]" />
                        <label className="text-xs">Apply Shadow</label>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Interaction</h3>
                    <SliderControl label="Hover Scale" value={system.buttons.hoverScale} min={1.0} max={1.1} step={0.01} onChange={(v) => updateSystem('buttons', 'hoverScale', v)} />
                </div>
            </div>
      </>
  );

  const renderInputs = () => (
      <>
           <div className="p-8 border-b-2 border-[#1a1a1a] bg-white flex justify-center sticky top-0 z-10">
              <input type="text" placeholder="Type here..." className="w-full p-2 outline-none" style={{
                  borderRadius: system.inputs.radius,
                  borderWidth: system.inputs.borderWidth,
                  borderColor: system.inputs.borderColor,
                  backgroundColor: system.inputs.baseBg,
                  boxShadow: `0 0 0 ${system.inputs.focusRingWidth}px ${system.colors.primary}40`
              }} />
           </div>
           <div className="p-4 space-y-6">
              <div>
                  <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Input Geometry</h3>
                  <SliderControl label="Border Radius" value={system.inputs.radius} min={0} max={20} step={1} unit="px" onChange={(v) => updateSystem('inputs', 'radius', v)} />
                  <SliderControl label="Border Width" value={system.inputs.borderWidth} min={0} max={4} step={1} unit="px" onChange={(v) => updateSystem('inputs', 'borderWidth', v)} />
                  <SliderControl label="Focus Ring" value={system.inputs.focusRingWidth} min={0} max={8} step={1} unit="px" onChange={(v) => updateSystem('inputs', 'focusRingWidth', v)} />
              </div>
              <div>
                  <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Colors</h3>
                  <ColorInput label="Base Background" value={system.inputs.baseBg} onChange={(v) => updateSystem('inputs', 'baseBg', v)} />
                  <ColorInput label="Border Color" value={system.inputs.borderColor} onChange={(v) => updateSystem('inputs', 'borderColor', v)} />
              </div>
           </div>
      </>
  );

  const renderShape = () => (
      <>
          <div className="p-8 border-b-2 border-[#1a1a1a] bg-gray-100 flex justify-center sticky top-0 z-10">
              <div className="w-24 h-24 bg-white" style={{
                  borderRadius: system.shape.borderRadius,
                  boxShadow: `${system.shape.shadow.x}px ${system.shape.shadow.y}px ${system.shape.shadow.blur}px rgba(0,0,0,0.2)`
              }}></div>
          </div>
          <div className="p-4 space-y-6">
               <div>
                   <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Global Shape</h3>
                   <SliderControl label="Border Radius" value={system.shape.borderRadius} min={0} max={50} step={1} unit="px" onChange={(v) => updateSystem('shape', 'borderRadius', v)} />
                   <div className="flex items-center mb-4">
                        <input type="checkbox" checked={system.shape.linkCorners} onChange={(e) => updateSystem('shape', 'linkCorners', e.target.checked)} className="mr-2 accent-[#1a1a1a]" />
                        <label className="text-xs">Link corners</label>
                   </div>
              </div>
               <div>
                   <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Shadow</h3>
                   <SliderControl label="X Offset" value={system.shape.shadow.x} min={-20} max={20} step={1} unit="px" onChange={(v) => onChange({...system, shape: {...system.shape, shadow: {...system.shape.shadow, x: v}}})} />
                   <SliderControl label="Y Offset" value={system.shape.shadow.y} min={-20} max={20} step={1} unit="px" onChange={(v) => onChange({...system, shape: {...system.shape, shadow: {...system.shape.shadow, y: v}}})} />
                   <SliderControl label="Blur" value={system.shape.shadow.blur} min={0} max={40} step={1} unit="px" onChange={(v) => onChange({...system, shape: {...system.shape, shadow: {...system.shape.shadow, blur: v}}})} />
               </div>
          </div>
      </>
  );

  const renderMotion = () => (
      <>
           <div className="p-8 border-b-2 border-[#1a1a1a] bg-gray-100 flex justify-center h-32 items-center sticky top-0 z-10">
              <div className="w-10 h-10 bg-[#1a1a1a] animate-bounce"></div>
           </div>
            <div className="p-4 space-y-6">
               <div>
                   <h3 className="font-bold text-sm border-b border-[#1a1a1a] pb-2 mb-4">Timing</h3>
                   <SliderControl label="Duration" value={system.animation.duration} min={0} max={1000} step={50} unit="ms" onChange={(v) => updateSystem('animation', 'duration', v)} />
                   <div className="mb-4">
                        <label className="text-xs font-bold uppercase block mb-1">Easing Curve</label>
                        <select className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none" value={system.animation.easing} onChange={(e) => updateSystem('animation', 'easing', e.target.value)}>
                            <option value="linear">Linear</option>
                            <option value="ease">Ease</option>
                            <option value="ease-in-out">Ease In-Out</option>
                            <option value="cubic-bezier(0.4, 0, 0.2, 1)">Material</option>
                        </select>
                    </div>
               </div>
           </div>
      </>
  );

  return (
    <div className="h-full bg-[#FFF2EC] flex flex-col">
      {/* Project Tools & AI Header */}
      <div className="p-4 border-b-2 border-[#1a1a1a] bg-[#fffaf8]">
          <div className="mb-3">
              <label className="text-[10px] font-bold uppercase tracking-wider block mb-1">Project Tools</label>
              <div className="flex gap-2">
                 <button onClick={() => downloadJSON(system, 'design-system.json')} className="flex-1 h-8 border border-[#1a1a1a] bg-white hover:bg-gray-50 flex items-center justify-center" title="Export JSON"><Download size={14}/></button>
                 <button onClick={() => fileInputRef.current?.click()} className="flex-1 h-8 border border-[#1a1a1a] bg-white hover:bg-gray-50 flex items-center justify-center" title="Import JSON"><Upload size={14}/></button>
                 <button onClick={() => setShowCodeModal(true)} className="flex-1 h-8 border border-[#1a1a1a] bg-[#1a1a1a] text-white hover:opacity-90 flex items-center justify-center gap-1 text-[10px] font-bold tracking-wide" title="Get Blueprint"><Code size={14}/> EXPORT</button>
                 <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImport} />
              </div>
          </div>
          <div className="relative">
              <input 
                 type="text" 
                 placeholder="Ask AI (e.g. 'Brutalist dark mode')" 
                 className="w-full h-8 pl-8 pr-2 text-xs border border-[#1a1a1a] bg-white focus:outline-none focus:bg-[#fffaf8]"
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <Wand2 size={12} className="absolute left-2 top-2 text-gray-400" />
              {isAiLoading && <Loader2 size={12} className="absolute right-2 top-2 animate-spin text-[#1a1a1a]" />}
          </div>
      </div>

      <div className="p-4 border-b-2 border-[#1a1a1a] bg-[#FFF2EC] shrink-0">
        <h2 className="font-bold text-sm uppercase tracking-wider">{category === 'layout' ? 'Strategy & Layout' : category} Workbench</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
          {category === 'palette' && renderPalette()}
          {category === 'typography' && renderTypography()}
          {category === 'layout' && renderLayout()}
          {category === 'shape' && renderShape()}
          {category === 'buttons' && renderButtons()}
          {category === 'inputs' && renderInputs()}
          {category === 'motion' && renderMotion()}
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-[#1a1a1a] bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-[#FFF2EC] border-2 border-[#1a1a1a] w-full max-w-2xl flex flex-col shadow-2xl h-[600px]">
                <div className="flex justify-between items-center p-4 border-b-2 border-[#1a1a1a] bg-white">
                    <h3 className="font-bold text-sm flex items-center gap-2"><Bot size={16}/> Master Blueprint</h3>
                    <button onClick={() => setShowCodeModal(false)} className="hover:bg-red-100 p-1"><X size={16}/></button>
                </div>
                <div className="flex border-b-2 border-[#1a1a1a]">
                     <button onClick={() => setCodeTab('blueprint')} className={`flex-1 py-2 font-bold text-xs ${codeTab === 'blueprint' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}>Full Prompt</button>
                    <button onClick={() => setCodeTab('css')} className={`flex-1 py-2 font-bold text-xs ${codeTab === 'css' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}>CSS</button>
                    <button onClick={() => setCodeTab('tailwind')} className={`flex-1 py-2 font-bold text-xs ${codeTab === 'tailwind' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}>Tailwind</button>
                </div>
                <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]">
                    <textarea readOnly className="w-full h-full bg-[#1e1e1e] text-gray-300 font-mono text-xs p-4 resize-none focus:outline-none leading-relaxed" value={getCodeContent()} />
                    <button onClick={() => copyToClipboard(getCodeContent())} className="absolute top-4 right-4 bg-white text-[#1a1a1a] px-3 py-1.5 text-[10px] font-bold border border-black flex items-center gap-2 hover:bg-gray-200">
                        {copied ? <Check size={12}/> : <Copy size={12}/>} {copied ? "COPIED" : "COPY"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};