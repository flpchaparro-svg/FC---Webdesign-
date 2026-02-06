import React, { useState, useRef } from 'react';
import { Wand2, Loader2, Download, Upload, Code, X, Copy, Check } from 'lucide-react';
import { generateDesignSystem } from '../services/geminiService';
import { downloadJSON, generateCSS, generateTailwindConfig } from '../services/exportUtils';
import { DesignSystem } from '../types';

interface HeaderProps {
  onSystemUpdate: (system: DesignSystem, rationale: string) => void;
  system: DesignSystem;
  currentRationale: string;
}

export const Header: React.FC<HeaderProps> = ({ onSystemUpdate, system, currentRationale }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeTab, setCodeTab] = useState<'css' | 'tailwind'>('css');
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const { system, rationale } = await generateDesignSystem(prompt);
      onSystemUpdate(system, rationale);
    } catch (err) {
      setError("Failed to generate. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    downloadJSON(system, 'design-system.json');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        // Basic validation could go here
        onSystemUpdate(json, "Imported from configuration file.");
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeContent = () => {
    return codeTab === 'css' ? generateCSS(system) : generateTailwindConfig(system);
  };

  return (
    <>
      <div className="bg-[#FFF2EC] border-b-2 border-[#1a1a1a] p-4 flex gap-6 items-start h-[120px] shrink-0 relative z-30">
        
        {/* Input Section */}
        <div className="flex-1 max-w-xl flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Wand2 size={14} /> AI Bootstrap
          </label>
          <div className="flex gap-2 h-10">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A brutalist news site for Gen Z..."
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

        {/* Project Management */}
        <div className="flex flex-col gap-2 border-l-2 border-[#1a1a1a] pl-6">
            <label className="text-xs font-bold uppercase tracking-wider opacity-60">
              Project Actions
            </label>
            <div className="flex gap-2">
                <button onClick={handleExport} className="h-10 px-3 border border-[#1a1a1a] bg-white hover:bg-[#fffaf8] text-xs font-bold flex items-center gap-2">
                    <Download size={14} /> Export
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="h-10 px-3 border border-[#1a1a1a] bg-white hover:bg-[#fffaf8] text-xs font-bold flex items-center gap-2">
                    <Upload size={14} /> Load
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json" 
                    onChange={handleImport} 
                />
                <button onClick={() => setShowCodeModal(true)} className="h-10 px-3 border border-[#1a1a1a] bg-[#1a1a1a] text-white hover:opacity-90 text-xs font-bold flex items-center gap-2">
                    <Code size={14} /> Get Code
                </button>
            </div>
        </div>

        {/* Rationale Display */}
        <div className="flex-1 h-full flex flex-col border-l-2 border-[#1a1a1a] pl-6">
          <label className="text-xs font-bold uppercase tracking-wider mb-1 opacity-60">
              Rationale
          </label>
          <div className="flex-1 bg-[#fffaf8] p-2 text-xs overflow-y-auto leading-relaxed italic text-opacity-80 border border-transparent">
              {currentRationale || "Enter a prompt to generate a rationale based on your needs."}
          </div>
        </div>
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-[#1a1a1a] bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-[#FFF2EC] border-2 border-[#1a1a1a] w-[800px] h-[600px] flex flex-col shadow-2xl">
                <div className="flex justify-between items-center p-4 border-b-2 border-[#1a1a1a] bg-white">
                    <h3 className="font-bold text-lg flex items-center gap-2"><Code size={20}/> Export Code</h3>
                    <button onClick={() => setShowCodeModal(false)} className="hover:bg-red-100 p-1"><X size={20}/></button>
                </div>
                
                <div className="flex border-b-2 border-[#1a1a1a]">
                    <button 
                        onClick={() => setCodeTab('css')}
                        className={`flex-1 py-3 font-bold text-sm ${codeTab === 'css' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}
                    >
                        CSS Variables
                    </button>
                    <button 
                        onClick={() => setCodeTab('tailwind')}
                        className={`flex-1 py-3 font-bold text-sm ${codeTab === 'tailwind' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-100'}`}
                    >
                        Tailwind Config
                    </button>
                </div>

                <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]">
                    <textarea 
                        readOnly
                        className="w-full h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm p-6 resize-none focus:outline-none"
                        value={getCodeContent()}
                    />
                    <button 
                        onClick={() => copyToClipboard(getCodeContent())}
                        className="absolute top-4 right-4 bg-white text-[#1a1a1a] px-3 py-1.5 text-xs font-bold border border-black flex items-center gap-2 hover:bg-gray-200"
                    >
                        {copied ? <Check size={14}/> : <Copy size={14}/>}
                        {copied ? "COPIED" : "COPY"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};