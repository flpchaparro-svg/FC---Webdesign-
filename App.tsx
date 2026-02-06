import React, { useState } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { PreviewCanvas } from './components/PreviewCanvas';
import { MetricsPanel } from './components/MetricsPanel';
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
      {/* Top Header */}
      <Header onSystemUpdate={handleAiUpdate} currentRationale={rationale} />

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Controls (25%) */}
        <div className="w-1/4 h-full min-w-[300px]">
          <ControlPanel system={system} onChange={handleSystemUpdate} />
        </div>

        {/* Middle: Preview (50%) */}
        <div className="w-1/2 h-full min-w-[400px] shadow-2xl z-10">
          <PreviewCanvas system={system} />
        </div>

        {/* Right: Metrics (25%) */}
        <div className="w-1/4 h-full min-w-[280px]">
          <MetricsPanel system={system} />
        </div>

      </div>
    </div>
  );
}

export default App;
