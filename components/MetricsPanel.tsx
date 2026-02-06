import React from 'react';
import { DesignSystem } from '../types';
import { calculateContrastRatio, getContrastScore } from '../services/utils';
import { Activity, Check, X } from 'lucide-react';

interface MetricsPanelProps {
  system: DesignSystem;
}

const ScoreCard: React.FC<{ label: string; fg: string; bg: string }> = ({ label, fg, bg }) => {
  const ratio = calculateContrastRatio(fg, bg);
  const { aa, aaa, score } = getContrastScore(ratio);

  return (
    <div className="p-4 bg-[#fffaf8] border border-[#1a1a1a] space-y-3">
      <div className="flex justify-between items-center border-b border-[#1a1a1a] pb-2">
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
        <span className="text-xl font-mono font-bold">{score}:1</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className={`p-2 border border-[#1a1a1a] flex flex-col items-center ${aa ? 'bg-green-100' : 'bg-red-100'}`}>
            <span className="text-[10px] font-bold mb-1">AA (Normal)</span>
            {aa ? <Check size={16} /> : <X size={16} />}
        </div>
        <div className={`p-2 border border-[#1a1a1a] flex flex-col items-center ${aaa ? 'bg-green-100' : 'bg-red-100'}`}>
             <span className="text-[10px] font-bold mb-1">AAA (Strict)</span>
             {aaa ? <Check size={16} /> : <X size={16} />}
        </div>
      </div>
      
      <div className="text-[10px] opacity-60 text-center font-mono">
        FG: {fg} | BG: {bg}
      </div>
    </div>
  );
};

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ system }) => {
  return (
    <div className="h-full bg-[#FFF2EC] p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-[#1a1a1a]">
        <Activity className="text-[#1a1a1a]" />
        <h2 className="font-bold text-lg">System Health</h2>
      </div>

      <div className="space-y-6">
        <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black"></span> 
                Light Mode Contrast
            </h3>
            <ScoreCard 
                label="Content"
                fg={system.colors.light.text} 
                bg={system.colors.light.canvas} 
            />
            <div className="h-2"></div>
            <ScoreCard 
                label="Primary Brand"
                fg="#FFFFFF" 
                bg={system.colors.primary} 
            />
        </div>

        <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black"></span> 
                Dark Mode Contrast
            </h3>
            <ScoreCard 
                label="Content"
                fg={system.colors.dark.text} 
                bg={system.colors.dark.canvas} 
            />
             <div className="h-2"></div>
            <ScoreCard 
                label="Primary Brand"
                fg="#FFFFFF" 
                bg={system.colors.primary} 
            />
        </div>

        <div className="p-4 bg-[#fffaf8] border border-[#1a1a1a]">
             <h3 className="text-xs font-bold uppercase tracking-wider border-b border-[#1a1a1a] pb-2 mb-2">Performance Est.</h3>
             <div className="flex justify-between items-center">
                 <span className="text-xs">Font Weights</span>
                 <span className="text-xs font-bold bg-yellow-100 border border-black px-1">Medium Impact</span>
             </div>
             <p className="text-[10px] mt-2 opacity-60">
                Loading {system.typography.headingFont} and {system.typography.bodyFont}.
             </p>
        </div>
      </div>
    </div>
  );
};
