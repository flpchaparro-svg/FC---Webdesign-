import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { generateDesignSystem } from '../services/geminiService';
import { DesignSystem } from '../types';

interface HeaderProps {
  onSystemUpdate: (system: DesignSystem, rationale: string) => void;
  currentRationale: string;
}

export const Header: React.FC<HeaderProps> = ({ onSystemUpdate, currentRationale }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { system, rationale } = await generateDesignSystem(prompt);
      onSystemUpdate(system, rationale);
    } catch (err) {
      setError("Failed to generate design system. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FFF2EC] border-b-2 border-[#1a1a1a] p-4 flex gap-6 items-start h-[120px] shrink-0">
      
      {/* Input Section */}
      <div className="flex-1 max-w-2xl flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Wand2 size={14} /> AI Bootstrap
        </label>
        <div className="flex gap-2 h-10">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A brutalist brutalist news site for Gen Z..."
            className="flex-1 border-2 border-[#1a1a1a] bg-white px-3 text-sm focus:outline-none focus:bg-[#fffaf8] placeholder:text-gray-400"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="px-6 bg-[#1a1a1a] text-[#FFF2EC] font-bold text-sm hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'GENERATE'}
          </button>
        </div>
        {error && <span className="text-red-600 text-[10px] font-bold">{error}</span>}
      </div>

      {/* Rationale Display */}
      <div className="flex-1 h-full flex flex-col">
        <label className="text-xs font-bold uppercase tracking-wider mb-1 opacity-60">
            Design Rationale
        </label>
        <div className="flex-1 border border-[#1a1a1a] bg-[#fffaf8] p-2 text-xs overflow-y-auto leading-relaxed italic text-opacity-80">
            {currentRationale || "Enter a prompt to generate a rationale based on your needs."}
        </div>
      </div>
    </div>
  );
};
