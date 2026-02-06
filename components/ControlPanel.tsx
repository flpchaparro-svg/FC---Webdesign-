import React, { useState, useEffect } from 'react';
import { DesignSystem } from '../types';
import { Accordion } from './Accordion';
import { POPULAR_FONTS } from '../constants';
import { calculateContrastRatio, generateDarkCounterpart } from '../services/utils';
import { Loader2, Wand2, RefreshCw } from 'lucide-react';

interface ControlPanelProps {
  system: DesignSystem;
  onChange: (newSystem: DesignSystem) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ system, onChange }) => {
  const [activeTab, setActiveTab] = useState<'default' | 'hover' | 'focus'>('default');
  const [loadingFont, setLoadingFont] = useState<string | null>(null);
  const [syncDarkMode, setSyncDarkMode] = useState(false);

  const updateColor = (path: string[], value: string) => {
    const newSystem = { ...system };
    let current: any = newSystem.colors;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    // Smart Dark Mode Sync Logic
    if (syncDarkMode && path[0] === 'light') {
        if (path[1] === 'canvas') {
            newSystem.colors.dark.canvas = generateDarkCounterpart(value, 'background');
        } else if (path[1] === 'text') {
            newSystem.colors.dark.text = generateDarkCounterpart(value, 'text');
        }
    }

    onChange(newSystem);
  };
  
  const generateSmartDarkMode = () => {
    const newSystem = { ...system };
    newSystem.colors.dark.canvas = generateDarkCounterpart(system.colors.light.canvas, 'background');
    newSystem.colors.dark.text = generateDarkCounterpart(system.colors.light.text, 'text');
    onChange(newSystem);
  };

  const updateInteractive = (key: keyof DesignSystem['interactive'], value: string) => {
    onChange({
        ...system,
        interactive: { ...system.interactive, [key]: value }
    });
  }

  const updateButtons = (key: keyof DesignSystem['buttons'], value: any) => {
    onChange({
      ...system,
      buttons: { ...system.buttons, [key]: value }
    });
  };

  const updateButtonVariant = (variant: 'primary' | 'secondary' | 'ghost', prop: string, value: string) => {
     const newSystem = { ...system };
     (newSystem.buttons.variants as any)[variant][prop] = value;
     onChange(newSystem);
  };
  
  const updateInputs = (key: keyof DesignSystem['inputs'], value: any) => {
    onChange({
      ...system,
      inputs: { ...system.inputs, [key]: value }
    });
  };

  const updateAnimation = (key: keyof DesignSystem['animation'], value: any) => {
    onChange({
      ...system,
      animation: { ...system.animation, [key]: value }
    });
  };

  const handleFontChange = (type: 'headingFont' | 'bodyFont', value: string) => {
      setLoadingFont(type);
      onChange({
          ...system,
          typography: { ...system.typography, [type]: value }
      });
      // Clear loader visual after delay (synced roughly with debouncer)
      setTimeout(() => setLoadingFont(null), 800);
  };

  const ContrastBadge = ({ fg, bg }: { fg: string; bg: string }) => {
    const ratio = calculateContrastRatio(fg, bg);
    return (
      <span className={`ml-2 text-[10px] font-mono px-1 border border-[#1a1a1a] ${ratio < 4.5 ? 'bg-red-200' : 'bg-green-200'}`}>
        {ratio.toFixed(1)}:1
      </span>
    );
  };

  const SliderControl = ({ 
    label, 
    value, 
    min, 
    max, 
    step, 
    unit = '', 
    onChange 
  }: { 
    label: string, 
    value: number, 
    min: number, 
    max: number, 
    step: number, 
    unit?: string, 
    onChange: (val: number) => void 
  }) => (
    <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase">{label}</label>
            <span className="text-xs font-mono">{value}{unit}</span>
        </div>
        <input 
            type="range" 
            min={min} 
            max={max} 
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full cursor-pointer accent-[#1a1a1a]"
        />
    </div>
  );

  const ColorInput = ({ label, value, path }: { label: string, value: string, path: string[] }) => (
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase block">{label}</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={value}
            onInput={(e) => updateColor(path, (e.target as HTMLInputElement).value)}
            onChange={(e) => updateColor(path, e.target.value)}
            className="h-8 w-8 border border-[#1a1a1a] cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => updateColor(path, e.target.value)}
            className="flex-1 bg-transparent border border-[#1a1a1a] px-2 py-1 text-xs font-mono"
          />
        </div>
      </div>
  );

  const VariantColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase block opacity-70">{label}</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={value === 'transparent' ? '#ffffff' : value}
            onInput={(e) => onChange((e.target as HTMLInputElement).value)}
            onChange={(e) => onChange(e.target.value)}
            className="h-6 w-6 border border-[#1a1a1a] cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent border border-[#1a1a1a] px-2 py-0.5 text-[10px] font-mono"
          />
        </div>
      </div>
  );

  const InputColorControl = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
    <div className="mb-3">
        <label className="text-xs font-bold uppercase block mb-1">{label}</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={value}
            onInput={(e) => onChange((e.target as HTMLInputElement).value)}
            onChange={(e) => onChange(e.target.value)}
            className="h-6 w-6 border border-[#1a1a1a] cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent border border-[#1a1a1a] px-2 py-0.5 text-xs font-mono"
          />
        </div>
    </div>
  );


  return (
    <div className="h-full overflow-y-auto bg-[#FFF2EC] border-r-2 border-[#1a1a1a]">
      <div className="p-4 border-b-2 border-[#1a1a1a]">
        <h2 className="font-bold text-lg">Token Controls</h2>
        <p className="text-xs mt-1 opacity-70">Define atomic values</p>
      </div>

      <Accordion title="A. Palette System" defaultOpen>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
              <ColorInput label="Primary Brand" value={system.colors.primary} path={['primary']} />
              <ColorInput label="Secondary" value={system.colors.secondary} path={['secondary']} />
              <ColorInput label="Accent / Warning" value={system.colors.accent} path={['accent']} />
              <div className="grid grid-cols-2 gap-2">
                 <ColorInput label="Success" value={system.colors.success} path={['success']} />
                 <ColorInput label="Error" value={system.colors.error} path={['error']} />
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-dashed border-[#1a1a1a] pt-4">
            {/* Light Mode */}
            <div className="space-y-2">
               <h4 className="text-xs font-bold underline">Light Mode</h4>
               <div className="space-y-1">
                <label className="text-[10px] block">Canvas</label>
                <div className="flex items-center">
                    <input 
                      type="color" 
                      className="w-4 h-4 mr-1 border border-black cursor-pointer" 
                      value={system.colors.light.canvas} 
                      onInput={(e) => updateColor(['light', 'canvas'], (e.target as HTMLInputElement).value)}
                      onChange={(e) => updateColor(['light', 'canvas'], e.target.value)} 
                    />
                    <input type="text" className="w-full text-[10px] border border-black p-1 bg-transparent" value={system.colors.light.canvas} onChange={(e) => updateColor(['light', 'canvas'], e.target.value)} />
                </div>
               </div>
               <div className="space-y-1">
                <label className="text-[10px] block flex items-center">
                    Text <ContrastBadge fg={system.colors.light.text} bg={system.colors.light.canvas} />
                </label>
                <div className="flex items-center">
                    <input 
                      type="color" 
                      className="w-4 h-4 mr-1 border border-black cursor-pointer" 
                      value={system.colors.light.text} 
                      onInput={(e) => updateColor(['light', 'text'], (e.target as HTMLInputElement).value)}
                      onChange={(e) => updateColor(['light', 'text'], e.target.value)} 
                    />
                    <input type="text" className="w-full text-[10px] border border-black p-1 bg-transparent" value={system.colors.light.text} onChange={(e) => updateColor(['light', 'text'], e.target.value)} />
                </div>
               </div>
            </div>

            {/* Dark Mode */}
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                   <h4 className="text-xs font-bold underline">Dark Mode</h4>
                   <button 
                    onClick={generateSmartDarkMode} 
                    className="p-1 hover:bg-[#1a1a1a] hover:text-white rounded-full transition-colors"
                    title="Auto-generate from Light Mode"
                   >
                       <Wand2 size={12} />
                   </button>
               </div>
               
               <div className="space-y-1">
                <label className="text-[10px] block">Canvas</label>
                <div className="flex items-center">
                    <input 
                      type="color" 
                      className="w-4 h-4 mr-1 border border-black cursor-pointer" 
                      value={system.colors.dark.canvas} 
                      onInput={(e) => updateColor(['dark', 'canvas'], (e.target as HTMLInputElement).value)}
                      onChange={(e) => updateColor(['dark', 'canvas'], e.target.value)} 
                    />
                    <input type="text" className="w-full text-[10px] border border-black p-1 bg-transparent" value={system.colors.dark.canvas} onChange={(e) => updateColor(['dark', 'canvas'], e.target.value)} />
                </div>
               </div>
               <div className="space-y-1">
                <label className="text-[10px] block flex items-center">
                    Text <ContrastBadge fg={system.colors.dark.text} bg={system.colors.dark.canvas} />
                </label>
                <div className="flex items-center">
                    <input 
                      type="color" 
                      className="w-4 h-4 mr-1 border border-black cursor-pointer" 
                      value={system.colors.dark.text} 
                      onInput={(e) => updateColor(['dark', 'text'], (e.target as HTMLInputElement).value)}
                      onChange={(e) => updateColor(['dark', 'text'], e.target.value)} 
                    />
                    <input type="text" className="w-full text-[10px] border border-black p-1 bg-transparent" value={system.colors.dark.text} onChange={(e) => updateColor(['dark', 'text'], e.target.value)} />
                </div>
               </div>

               {/* Sync Checkbox */}
               <div className="pt-2 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="syncDarkMode"
                    checked={syncDarkMode}
                    onChange={(e) => setSyncDarkMode(e.target.checked)}
                    className="accent-[#1a1a1a]"
                  />
                  <label htmlFor="syncDarkMode" className="text-[10px] cursor-pointer flex items-center gap-1 opacity-80 hover:opacity-100">
                    <RefreshCw size={10} />
                    Sync with Light
                  </label>
               </div>
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion title="B. Typography">
        <div className="space-y-4">
            <div>
                <label className="text-xs font-bold uppercase block mb-1 flex justify-between">
                    Heading Font
                    {loadingFont === 'headingFont' && <Loader2 size={12} className="animate-spin text-[#1a1a1a]"/>}
                </label>
                <select 
                    className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                    value={system.typography.headingFont}
                    onChange={(e) => handleFontChange('headingFont', e.target.value)}
                >
                    {POPULAR_FONTS.map(font => (
                        <option key={font} value={font}>{font}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="text-xs font-bold uppercase block mb-1 flex justify-between">
                    Body Font
                    {loadingFont === 'bodyFont' && <Loader2 size={12} className="animate-spin text-[#1a1a1a]"/>}
                </label>
                <select 
                    className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                    value={system.typography.bodyFont}
                    onChange={(e) => handleFontChange('bodyFont', e.target.value)}
                >
                    {POPULAR_FONTS.map(font => (
                        <option key={font} value={font}>{font}</option>
                    ))}
                </select>
            </div>
            
            <div className="pt-2 border-t border-dashed border-[#1a1a1a]">
                <SliderControl 
                    label="Base Size" 
                    value={system.typography.baseSize} 
                    min={12} max={24} step={1} unit="px"
                    onChange={(val) => onChange({...system, typography: {...system.typography, baseSize: val}})}
                />
                
                <SliderControl 
                    label="Scale Ratio" 
                    value={system.typography.scaleRatio} 
                    min={1.0} max={2.0} step={0.001}
                    onChange={(val) => onChange({...system, typography: {...system.typography, scaleRatio: val}})}
                />

                <div className="grid grid-cols-2 gap-2">
                    <SliderControl 
                        label="LH Head" 
                        value={system.typography.lineHeightHeading} 
                        min={0.8} max={2.5} step={0.1}
                        onChange={(val) => onChange({...system, typography: {...system.typography, lineHeightHeading: val}})}
                    />
                     <SliderControl 
                        label="LH Body" 
                        value={system.typography.lineHeightBody} 
                        min={0.8} max={2.5} step={0.1}
                        onChange={(val) => onChange({...system, typography: {...system.typography, lineHeightBody: val}})}
                    />
                </div>
            </div>
        </div>
      </Accordion>

      <Accordion title="C. Spacing & Layout">
        <div className="space-y-4">
            <SliderControl 
                label="Base Unit" 
                value={system.spacing.baseUnit} 
                min={4} max={16} step={1} unit="px"
                onChange={(val) => onChange({...system, spacing: {...system.spacing, baseUnit: val}})}
            />
            <SliderControl 
                label="Max Width" 
                value={system.layout.containerWidth} 
                min={960} max={1600} step={10} unit="px"
                onChange={(val) => onChange({...system, layout: {...system.layout, containerWidth: val}})}
            />
        </div>
      </Accordion>

      <Accordion title="D. Shape & Surface">
        <div className="space-y-4">
            <SliderControl 
                label="Border Radius" 
                value={system.shape.borderRadius} 
                min={0} max={50} step={1} unit="px"
                onChange={(val) => onChange({...system, shape: {...system.shape, borderRadius: val}})}
            />
            
            <div className="flex items-center mb-4">
                <input 
                    type="checkbox" 
                    checked={system.shape.linkCorners}
                    onChange={(e) => onChange({...system, shape: {...system.shape, linkCorners: e.target.checked}})}
                    className="mr-2 accent-[#1a1a1a]"
                />
                <label className="text-xs">Link all corners</label>
            </div>

            <div className="border-t border-dashed border-[#1a1a1a] pt-3">
                <label className="text-xs font-bold uppercase block mb-2">Shadow</label>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <span className="text-[10px] block">X</span>
                        <input 
                            type="range" min="-20" max="20"
                            value={system.shape.shadow.x}
                            onChange={(e) => onChange({...system, shape: {...system.shape, shadow: {...system.shape.shadow, x: Number(e.target.value)}}})}
                            className="w-full cursor-pointer accent-[#1a1a1a]"
                        />
                    </div>
                     <div>
                        <span className="text-[10px] block">Y</span>
                        <input 
                            type="range" min="-20" max="20"
                            value={system.shape.shadow.y}
                            onChange={(e) => onChange({...system, shape: {...system.shape, shadow: {...system.shape.shadow, y: Number(e.target.value)}}})}
                            className="w-full cursor-pointer accent-[#1a1a1a]"
                        />
                    </div>
                     <div>
                        <span className="text-[10px] block">Blur</span>
                        <input 
                            type="range" min="0" max="40"
                            value={system.shape.shadow.blur}
                            onChange={(e) => onChange({...system, shape: {...system.shape, shadow: {...system.shape.shadow, blur: Number(e.target.value)}}})}
                            className="w-full cursor-pointer accent-[#1a1a1a]"
                        />
                    </div>
                </div>
            </div>
        </div>
      </Accordion>

      <Accordion title="E. Interactive">
        <div>
             <div className="flex border-b border-[#1a1a1a] mb-4">
                {['default', 'hover', 'focus'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2 text-xs font-bold uppercase ${activeTab === tab ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-transparent text-[#1a1a1a]'}`}
                    >
                        {tab}
                    </button>
                ))}
             </div>
             
             {activeTab === 'default' && (
                <div className="p-2 text-xs italic opacity-70 text-center">
                    Default states are derived from Base Colors.
                </div>
             )}

             {activeTab === 'hover' && (
                 <div className="space-y-2">
                     <label className="text-xs font-bold uppercase block">Primary Hover</label>
                     <div className="flex gap-2">
                        <input 
                            type="color" 
                            value={system.interactive.primaryHover} 
                            onInput={(e) => updateInteractive('primaryHover', (e.target as HTMLInputElement).value)}
                            onChange={(e) => updateInteractive('primaryHover', e.target.value)}
                            className="h-8 w-8 border border-[#1a1a1a]"
                        />
                        <input 
                            type="text" 
                            value={system.interactive.primaryHover} 
                             onChange={(e) => updateInteractive('primaryHover', e.target.value)}
                            className="flex-1 bg-transparent border border-[#1a1a1a] px-2 text-xs font-mono"
                        />
                     </div>
                 </div>
             )}

             {activeTab === 'focus' && (
                 <div className="space-y-2">
                     <label className="text-xs font-bold uppercase block">Primary Focus</label>
                     <div className="flex gap-2">
                        <input 
                            type="color" 
                            value={system.interactive.primaryFocus} 
                             onInput={(e) => updateInteractive('primaryFocus', (e.target as HTMLInputElement).value)}
                             onChange={(e) => updateInteractive('primaryFocus', e.target.value)}
                            className="h-8 w-8 border border-[#1a1a1a]"
                        />
                        <input 
                            type="text" 
                            value={system.interactive.primaryFocus} 
                             onChange={(e) => updateInteractive('primaryFocus', e.target.value)}
                            className="flex-1 bg-transparent border border-[#1a1a1a] px-2 text-xs font-mono"
                        />
                     </div>
                 </div>
             )}
        </div>
      </Accordion>

      <Accordion title="F. Button Architecture">
        <div className="space-y-4">
            <SliderControl 
                label="Roundness" 
                value={system.buttons.radius} 
                min={0} max={50} step={1} unit="px"
                onChange={(val) => updateButtons('radius', val)}
            />
            <SliderControl 
                label="Stroke Width" 
                value={system.buttons.borderWidth} 
                min={0} max={8} step={1} unit="px"
                onChange={(val) => updateButtons('borderWidth', val)}
            />

            <div className="grid grid-cols-2 gap-2">
                <div>
                     <label className="text-xs font-bold uppercase block mb-1">Text Case</label>
                     <select 
                        className="w-full bg-transparent border border-[#1a1a1a] p-1 text-xs"
                        value={system.buttons.textTransform}
                        onChange={(e) => updateButtons('textTransform', e.target.value)}
                    >
                        <option value="none">Normal</option>
                        <option value="uppercase">Uppercase</option>
                        <option value="capitalize">Capitalize</option>
                    </select>
                </div>
                 <div>
                     <label className="text-xs font-bold uppercase block mb-1">Weight</label>
                     <select 
                        className="w-full bg-transparent border border-[#1a1a1a] p-1 text-xs"
                        value={system.buttons.fontWeight}
                        onChange={(e) => updateButtons('fontWeight', e.target.value)}
                    >
                        <option value="400">Regular (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="600">SemiBold (600)</option>
                        <option value="700">Bold (700)</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center mb-2">
                <input 
                    type="checkbox" 
                    checked={system.buttons.applyShadow}
                    onChange={(e) => updateButtons('applyShadow', e.target.checked)}
                    className="mr-2 accent-[#1a1a1a]"
                />
                <label className="text-xs">Apply Drop Shadow</label>
            </div>

            <div className="border-t border-dashed border-[#1a1a1a] pt-3">
                 <h4 className="text-xs font-bold underline mb-2">Ghost Variant Overrides</h4>
                 <div className="grid grid-cols-1 gap-2">
                    <VariantColorInput 
                        label="Ghost Text" 
                        value={system.buttons.variants.ghost.text} 
                        onChange={(val) => updateButtonVariant('ghost', 'text', val)} 
                    />
                     <VariantColorInput 
                        label="Ghost Border" 
                        value={system.buttons.variants.ghost.border} 
                        onChange={(val) => updateButtonVariant('ghost', 'border', val)} 
                    />
                 </div>
            </div>
        </div>
      </Accordion>

      <Accordion title="G. Form & Inputs">
          <div className="space-y-4">
              <SliderControl 
                  label="Input Radius" 
                  value={system.inputs.radius} 
                  min={0} max={20} step={1} unit="px"
                  onChange={(val) => updateInputs('radius', val)}
              />
              <SliderControl 
                  label="Border Width" 
                  value={system.inputs.borderWidth} 
                  min={0} max={4} step={1} unit="px"
                  onChange={(val) => updateInputs('borderWidth', val)}
              />
              <SliderControl 
                  label="Focus Ring Width" 
                  value={system.inputs.focusRingWidth} 
                  min={0} max={8} step={1} unit="px"
                  onChange={(val) => updateInputs('focusRingWidth', val)}
              />
              <div className="grid grid-cols-2 gap-2 border-t border-dashed border-[#1a1a1a] pt-3">
                 <InputColorControl label="Base Bg" value={system.inputs.baseBg} onChange={(val) => updateInputs('baseBg', val)} />
                 <InputColorControl label="Border Color" value={system.inputs.borderColor} onChange={(val) => updateInputs('borderColor', val)} />
              </div>
          </div>
      </Accordion>

      <Accordion title="H. Motion & Feel">
          <div className="space-y-4">
              <SliderControl 
                  label="Speed (Duration)" 
                  value={system.animation.duration} 
                  min={0} max={1000} step={50} unit="ms"
                  onChange={(val) => updateAnimation('duration', val)}
              />
              <div>
                 <label className="text-xs font-bold uppercase block mb-1">Easing</label>
                 <select 
                    className="w-full bg-white border border-[#1a1a1a] p-2 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                    value={system.animation.easing}
                    onChange={(e) => updateAnimation('easing', e.target.value)}
                >
                    <option value="linear">Linear (Constant)</option>
                    <option value="ease">Ease (Default)</option>
                    <option value="ease-in-out">Ease In-Out (Smooth)</option>
                    <option value="cubic-bezier(0.4, 0, 0.2, 1)">Material Standard</option>
                </select>
              </div>
          </div>
      </Accordion>
    </div>
  );
};