import React, { useState } from 'react';
import { NavigationPanel } from './components/NavigationPanel';
import { WorkbenchPanel } from './components/WorkbenchPanel';
import { PreviewCanvas } from './components/PreviewCanvas';
import { StrategyStudio } from './components/StrategyStudio';
import { FontLoader } from './components/FontLoader';
import { INITIAL_DESIGN_SYSTEM } from './constants';
import { DesignSystem, Category } from './types';

function App() {
  const [system, setSystem] = useState<DesignSystem>(INITIAL_DESIGN_SYSTEM);
  const [activeCategory, setActiveCategory] = useState<Category>('palette');
  const [view, setView] = useState<'designer' | 'strategy'>('designer');

  const handleSystemUpdate = (newSystem: DesignSystem) => {
    setSystem(newSystem);
  };

  const handleStrategyComplete = (newSystem: DesignSystem) => {
      setSystem(newSystem);
      setView('designer');
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#FFF2EC] text-[#1a1a1a] font-sans overflow-hidden">
      <FontLoader 
        headingFont={system.typography.headingFont} 
        bodyFont={system.typography.bodyFont} 
      />
      
      {view === 'strategy' && (
          <StrategyStudio 
            system={system}
            onComplete={handleStrategyComplete}
            onCancel={() => setView('designer')}
          />
      )}

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Column 1: Navigation (80px, Dark Theme) */}
        <div className="w-[80px] flex-shrink-0 z-30 bg-[#1a1a1a]">
          <NavigationPanel 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
            onStrategyClick={() => setView('strategy')}
          />
        </div>

        {/* Column 2: Main Preview (Flexible) */}
        <div className="flex-1 h-full shadow-inner z-10 overflow-hidden relative bg-gray-50">
          <PreviewCanvas system={system} activeCategory={activeCategory} />
        </div>

        {/* Column 3: The Workbench (360px) */}
        <div className="w-[360px] flex-shrink-0 z-20 border-l-2 border-[#1a1a1a] bg-[#FFF2EC] shadow-2xl">
          <WorkbenchPanel system={system} onChange={handleSystemUpdate} category={activeCategory} />
        </div>

      </div>
    </div>
  );
}

export default App;