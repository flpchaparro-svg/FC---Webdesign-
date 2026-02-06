import React, { useState } from 'react';
import { DesignSystem } from '../types';
import { Accordion } from './Accordion';
import { FONT_OPTIONS, TYPE_SCALES } from '../constants';
import { calculateContrastRatio } from '../services/utils';

interface ControlPanelProps {
  system: DesignSystem;
  onChange: (newSystem: DesignSystem) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ system, onChange }) => {
  const [activeTab, setActiveTab] = useState<'default' | 'hover' | 'focus'>('default');

  const updateColor = (path: string[], value: string) => {
    const newSystem = { ...system };
    let current: any = newSystem.colors;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onChange(newSystem);
  };
  
  const updateInteractive = (key: keyof DesignSystem['interactive'], value: string) => {
    onChange({
        ...system,
        interactive: { ...system.interactive, [key]: value }
    });
  }

  const ContrastBadge = ({ fg, bg }: { fg: string; bg: string }) => {
    const ratio = calculateContrastRatio(fg, bg);
    return (
      <span className={`ml-2 text-[10px] font-mono px-1 border border-[#1a1a1a] ${ratio < 4.5 ? 'bg-red-200' : 'bg-green-200'}`}>
        {ratio.toFixed(1)}:1
      </span>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-[#FFF2EC] border-r-2 border-[#1a1a1a]">
      <div className="p-4 border-b-2 border-[#1a1a1a]">
        <h2 className="font-bold text-lg">Token Controls</h2>
        <p className="text-xs mt-1 opacity-70">Define atomic values</p>
      </div>

      <Accordion title="A. Semantic Colors" defaultOpen>
        <div className="space-y-4">
          {/* Primary */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase block">Primary Brand</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={system.colors.primary}
                onChange={(e) => updateColor(['primary'], e.target.value)}
                className="h-8 w-8 border border-[#1a1a1a] cursor-pointer"
              />
              <input
                type="text"
                value={system.colors.primary}
                onChange={(e) => updateColor(['primary'], e.target.value)}
                className="flex-1 bg-transparent border border-[#1a1a1a] px-2 py-1 text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Light Mode */}
            <div className="space-y-2">
               <h4 className="text-xs font-bold underline">Light Mode</h4>
               <div className="space-y-1">
                <label className="text-[10px] block">Canvas</label>
                <div className="flex items-center">
                    <input type="color" className="w-4 h-4 mr-1 border border-black" value={system.colors.light.canvas} onChange={(e) => updateColor(['light', 'canvas'], e.target.value)} />
                    <input type="text" className="w-full text-[10px] border border-black p-1 bg-transparent" value={system.colors.light.canvas} onChange={(e) => updateColor(['light', 'canvas'], e.target.value)} />
                </div>
               </div>
               <div className="space-y-1">
                <label className="text-[10px] block flex items-center">
                    Text <ContrastBadge fg={system.colors.light.text} bg={system.colors.light.canvas} />
                </label>
                <div className="flex items-center">
                    <input type="color" className="w-4 h-4 mr-1 border border-black" value={system.colors.light.text} onChange={(e) => updateColor(['light', 'text'], e.target.value)} />
                    <input type="text" className="w-full text-[10px] border border-black p-1 bg-transparent" value={system.colors.light.text} onChange={(e) => updateColor(['light', 'text'], e.target.value)} />
                </div>
               </div>
            </div>

            {/* Dark Mode */}
            <div className="space-y-2">
               <h4 className="text-xs font-bold underline">Dark Mode</h4>
               <div className="space-y-1">
                <label className="text-[10px] block">Canvas</label>
                <div className="flex items-center">
                    <input type="color" className="w-4 h-4 mr-1 border border-black" value={system.colors.dark.canvas} onChange={(e) => updateColor(['dark', 'canvas'], e.target.value)} />
                    <input type="text" className="w-full text-[10px] border border-black p-1 bg-transparent" value={system.colors.dark.canvas} onChange={(e) => updateColor(['dark', 'canvas'], e.target.value)} />
                </div>
               </div>
               <div className="space-y-1">
                <label className="text-[10px] block flex items-center">
                    Text <ContrastBadge fg={system.colors.dark.text} bg={system.colors.dark.canvas} />
                </label>
                <div className="flex items-center">
                    <input type="color" className="w-4 h-4 mr-1 border border-black" value={system.colors.dark.text} onChange={(e) => updateColor(['dark', 'text'], e.target.value)} />
                    <input type="text" className="w-full text-[10px] border border-black p-1 bg-transparent" value={system.colors.dark.text} onChange={(e) => updateColor(['dark', 'text'], e.target.value)} />
                </div>
               </div>
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion title="B. Typography">
        <div className="space-y-3">
            <div>
                <label className="text-xs font-bold uppercase block mb-1">Heading Font</label>
                <select 
                    className="w-full bg-transparent border border-[#1a1a1a] p-2 text-xs"
                    value={system.typography.headingFont}
                    onChange={(e) => onChange({...system, typography: {...system.typography, headingFont: e.target.value}})}
                >
                    {FONT_OPTIONS.map(f => <option key={f.value} value={f.value} style={{fontFamily: f.value}}>{f.label}</option>)}
                </select>
            </div>
            <div>
                <label className="text-xs font-bold uppercase block mb-1">Body Font</label>
                <select 
                    className="w-full bg-transparent border border-[#1a1a1a] p-2 text-xs"
                    value={system.typography.bodyFont}
                    onChange={(e) => onChange({...system, typography: {...system.typography, bodyFont: e.target.value}})}
                >
                    {FONT_OPTIONS.map(f => <option key={f.value} value={f.value} style={{fontFamily: f.value}}>{f.label}</option>)}
                </select>
            </div>
            <div className="flex gap-2">
                <div className="flex-1">
                    <label className="text-xs font-bold uppercase block mb-1">Base (px)</label>
                    <input 
                        type="number" 
                        value={system.typography.baseSize}
                        onChange={(e) => onChange({...system, typography: {...system.typography, baseSize: Number(e.target.value)}})}
                        className="w-full bg-transparent border border-[#1a1a1a] p-2 text-xs"
                    />
                </div>
                <div className="flex-1">
                    <label className="text-xs font-bold uppercase block mb-1">Scale</label>
                    <select 
                        className="w-full bg-transparent border border-[#1a1a1a] p-2 text-xs"
                        value={system.typography.scaleRatio}
                        onChange={(e) => onChange({...system, typography: {...system.typography, scaleRatio: Number(e.target.value)}})}
                    >
                        {TYPE_SCALES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </div>
             <div className="flex gap-2">
                <div className="flex-1">
                    <label className="text-xs font-bold uppercase block mb-1">LH Head</label>
                    <input 
                        type="number" 
                        step="0.1"
                        value={system.typography.lineHeightHeading}
                        onChange={(e) => onChange({...system, typography: {...system.typography, lineHeightHeading: Number(e.target.value)}})}
                        className="w-full bg-transparent border border-[#1a1a1a] p-2 text-xs"
                    />
                </div>
                <div className="flex-1">
                    <label className="text-xs font-bold uppercase block mb-1">LH Body</label>
                    <input 
                        type="number"
                        step="0.1"
                        value={system.typography.lineHeightBody}
                        onChange={(e) => onChange({...system, typography: {...system.typography, lineHeightBody: Number(e.target.value)}})}
                        className="w-full bg-transparent border border-[#1a1a1a] p-2 text-xs"
                    />
                </div>
            </div>
        </div>
      </Accordion>

      <Accordion title="C. Spacing & Layout">
        <div className="space-y-4">
            <div>
                <label className="text-xs font-bold uppercase block mb-1">Base Unit (px)</label>
                <input 
                    type="number" 
                    value={system.spacing.baseUnit}
                    onChange={(e) => onChange({...system, spacing: {...system.spacing, baseUnit: Number(e.target.value)}})}
                    className="w-full bg-transparent border border-[#1a1a1a] p-2 text-xs"
                />
            </div>
            <div>
                <label className="text-xs font-bold uppercase block mb-1">Max Width: {system.spacing.maxContainerWidth}px</label>
                <input 
                    type="range" 
                    min="960" max="1600"
                    value={system.spacing.maxContainerWidth}
                    onChange={(e) => onChange({...system, spacing: {...system.spacing, maxContainerWidth: Number(e.target.value)}})}
                    className="w-full accent-[#1a1a1a] h-1 bg-[#1a1a1a] appearance-none"
                />
            </div>
        </div>
      </Accordion>

      <Accordion title="D. Shape & Surface">
        <div className="space-y-4">
             <div>
                <label className="text-xs font-bold uppercase block mb-1">Radius: {system.shape.borderRadius}px</label>
                <input 
                    type="range" 
                    min="0" max="32"
                    value={system.shape.borderRadius}
                    onChange={(e) => onChange({...system, shape: {...system.shape, borderRadius: Number(e.target.value)}})}
                    className="w-full accent-[#1a1a1a] h-1 bg-[#1a1a1a] appearance-none"
                />
                <div className="mt-2 flex items-center">
                    <input 
                        type="checkbox" 
                        checked={system.shape.linkCorners}
                        onChange={(e) => onChange({...system, shape: {...system.shape, linkCorners: e.target.checked}})}
                        className="mr-2 accent-[#1a1a1a]"
                    />
                    <label className="text-xs">Link all corners</label>
                </div>
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
                            className="w-full accent-[#1a1a1a] h-1 bg-[#1a1a1a] appearance-none"
                        />
                    </div>
                     <div>
                        <span className="text-[10px] block">Y</span>
                        <input 
                            type="range" min="-20" max="20"
                            value={system.shape.shadow.y}
                            onChange={(e) => onChange({...system, shape: {...system.shape, shadow: {...system.shape.shadow, y: Number(e.target.value)}}})}
                            className="w-full accent-[#1a1a1a] h-1 bg-[#1a1a1a] appearance-none"
                        />
                    </div>
                     <div>
                        <span className="text-[10px] block">Blur</span>
                        <input 
                            type="range" min="0" max="40"
                            value={system.shape.shadow.blur}
                            onChange={(e) => onChange({...system, shape: {...system.shape, shadow: {...system.shape.shadow, blur: Number(e.target.value)}}})}
                            className="w-full accent-[#1a1a1a] h-1 bg-[#1a1a1a] appearance-none"
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
    </div>
  );
};
