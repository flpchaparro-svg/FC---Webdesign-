import React, { useState } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { PreviewCanvas } from './components/PreviewCanvas';
import { FontLoader } from './components/FontLoader';
import { INITIAL_DESIGN_SYSTEM } from './constants';
import { DesignSystem } from './types';

function App() {
  const [system, setSystem] = useState<DesignSystem>(INITIAL_DESIGN_SYSTEM);
  const [rationale, setRationale] = useState<string>('');

  const handleSystemUpdate = (newSystem: DesignSystem) => {
    setSystem(newSystem);
  };

  const handleAiUpdate = (newSystem: DesignSystem, newRationale: string) => {
    setSystem(newSystem);
    setRationale(newRationale);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#FFF2EC] text-[#1a1a1a] font-sans overflow-hidden">
      <FontLoader 
        headingFont={system.typography.headingFont} 
        bodyFont={system.typography.bodyFont} 
      />
      
      {/* Top Header */}
      <Header onSystemUpdate={handleAiUpdate} system={system} currentRationale={rationale} />

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Controls (25%) */}
        <div className="w-1/4 h-full min-w-[320px] max-w-[400px]">
          <ControlPanel system={system} onChange={handleSystemUpdate} />
        </div>

        {/* Right: Preview (Flexible) */}
        <div className="flex-1 h-full shadow-2xl z-10 overflow-hidden relative border-l-2 border-[#1a1a1a]">
          <PreviewCanvas system={system} />
        </div>

      </div>
    </div>
  );
}

export default App;