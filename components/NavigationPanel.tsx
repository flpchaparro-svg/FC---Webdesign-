import React from 'react';
import { Palette, Type, Layout, Square, MousePointerClick, FormInput, Zap, Target } from 'lucide-react';
import { Category } from '../types';

interface NavigationPanelProps {
  activeCategory: Category;
  onSelect: (category: Category) => void;
  onStrategyClick: () => void;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({ activeCategory, onSelect, onStrategyClick }) => {
  const menuItems: { id: Category; label: string; icon: React.FC<any> }[] = [
    { id: 'palette', label: 'Palette', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'shape', label: 'Shape', icon: Square },
    { id: 'buttons', label: 'Buttons', icon: MousePointerClick },
    { id: 'inputs', label: 'Inputs', icon: FormInput },
    { id: 'motion', label: 'Motion', icon: Zap },
  ];

  return (
    <div className="h-full bg-[#1a1a1a] text-[#FFF2EC] flex flex-col items-center py-6 gap-3 border-r border-black relative">
      {/* Brand Indicator */}
      <div className="mb-4 p-2 rounded-lg bg-[#FFF2EC] text-[#1a1a1a]">
         <div className="w-5 h-5 border-2 border-[#1a1a1a] rounded-full"></div>
      </div>
      
      {/* Strategy Toggle */}
      <button
        onClick={onStrategyClick}
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg hover:scale-110 hover:bg-blue-500 transition-all mb-4 relative group"
        title="Strategy Studio"
      >
          <Target size={20} />
          <span className="absolute left-14 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Strategy Studio
          </span>
      </button>

      <div className="w-8 h-[1px] bg-white/20 mb-2"></div>

      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 group relative
            ${activeCategory === item.id 
              ? 'bg-[#FFF2EC] text-[#1a1a1a] shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
              : 'bg-transparent text-[#FFF2EC] hover:bg-white/10'
            }`}
          title={item.label}
        >
          <item.icon size={20} strokeWidth={activeCategory === item.id ? 2.5 : 2} />
          
          {/* Tooltip */}
          <span className="absolute left-14 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#FFF2EC]/20 pointer-events-none z-50">
            {item.label}
          </span>
        </button>
      ))}
      
      <div className="mt-auto pb-4 opacity-30 text-[9px] font-mono rotate-180 writing-mode-vertical">
        V3.4
      </div>
    </div>
  );
};