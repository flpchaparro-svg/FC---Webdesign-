import React, { useState } from 'react';
import { DesignSystem, BusinessType, ConversionGoal, BrandVibe, StructureOption } from '../types';
import { getStructureOptions, getRecommendedSitemap } from '../services/strategyUtils';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';

interface StrategyStudioProps {
  system: DesignSystem;
  onComplete: (newSystem: DesignSystem) => void;
}

export const StrategyStudio: React.FC<StrategyStudioProps> = ({ system, onComplete }) => {
  const [step, setStep] = useState(0);
  
  // Local State
  const [businessName, setBusinessName] = useState('Untitled Project');
  const [businessType, setBusinessType] = useState<BusinessType>('service');
  const [goal, setGoal] = useState<ConversionGoal>('lead');
  const [vibe, setVibe] = useState<BrandVibe>('trustworthy');
  const [selectedStructure, setSelectedStructure] = useState<StructureOption | null>(null);
  
  // Handlers
  const handleContextSubmit = () => setStep(2);

  const handleStructureSelect = (option: StructureOption) => {
    setSelectedStructure(option);
    setStep(3); // This moves to the Sitemap step
  };

  const handleFinalBuild = () => {
    if (!selectedStructure) return;
    const sitemap = getRecommendedSitemap(businessType);
    
    // Create the new system state
    const newSystem: DesignSystem = {
      ...system,
      layout: {
        ...system.layout,
        businessType,
        conversionGoal: goal,
        brandVibe: vibe,
        activeFormula: selectedStructure.id,
        sections: selectedStructure.sections,
        heroStyle: selectedStructure.id === 'luxury' ? 'center' : 'split',
        pages: sitemap,
      }
    };
    onComplete(newSystem);
  };

  // --- RENDER STEP 0: LANDING ---
  if (step === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#FFF2EC] text-[#1a1a1a] p-8 border-b-2 border-[#1a1a1a]">
        <div className="max-w-2xl text-center space-y-8">
          <div className="inline-block border-2 border-[#1a1a1a] px-4 py-2 font-mono text-xs uppercase tracking-widest bg-[#FFF2EC]">
            System v4.0 // Architect Mode
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            STRATEGY<br/>STUDIO
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-lg mx-auto opacity-80">
            Define the business logic, marketing psychology, and site architecture before you touch a single pixel.
          </p>
          <button 
            onClick={() => setStep(1)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-[#FFF2EC] text-lg font-bold tracking-wider border-2 border-[#1a1a1a] hover:bg-[#FFF2EC] hover:text-[#1a1a1a] transition-all"
          >
            INITIALIZE PROJECT <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER STEP 1: CONTEXT ---
  if (step === 1) {
    return (
      <div className="h-full w-full flex flex-col bg-[#FFF2EC] text-[#1a1a1a]">
        <div className="p-8 border-b-2 border-[#1a1a1a] flex justify-between items-center bg-[#FFF2EC]">
           <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
             <span className="w-8 h-8 bg-[#1a1a1a] text-[#FFF2EC] rounded-full flex items-center justify-center text-sm">1</span> 
             PROJECT CONTEXT
           </h2>
        </div>
        
        <div className="flex-1 p-8 md:p-16 flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-2xl space-y-12">
            
            {/* Input Group */}
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest block">Project / Business Name</label>
              <input 
                type="text" 
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-transparent border-b-4 border-[#1a1a1a] text-4xl font-black py-4 focus:outline-none placeholder:opacity-20 placeholder:text-[#1a1a1a]"
                placeholder="TYPE HERE..."
                autoFocus
              />
            </div>

            {/* Select Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest block">Sector / Industry</label>
                <div className="space-y-2">
                  {(['saas', 'service', 'ecommerce', 'portfolio'] as BusinessType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setBusinessType(type)}
                      className={`w-full text-left px-6 py-4 border-2 border-[#1a1a1a] font-bold uppercase transition-all flex justify-between items-center
                        ${businessType === type ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-transparent hover:bg-[#1a1a1a] hover:text-[#FFF2EC]'}`}
                    >
                      {type}
                      {businessType === type && <Check size={16}/>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest block">Primary Objective</label>
                <div className="space-y-2">
                  {(['lead', 'purchase', 'awareness'] as ConversionGoal[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`w-full text-left px-6 py-4 border-2 border-[#1a1a1a] font-bold uppercase transition-all flex justify-between items-center
                        ${goal === g ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-transparent hover:bg-[#1a1a1a] hover:text-[#FFF2EC]'}`}
                    >
                      {g === 'lead' ? 'Get Leads / Calls' : g === 'purchase' ? 'Sales / Orders' : 'Brand Awareness'}
                      {goal === g && <Check size={16}/>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-end">
               <button 
                onClick={handleContextSubmit}
                className="px-10 py-4 bg-[#1a1a1a] text-[#FFF2EC] font-bold text-xl tracking-wider border-2 border-[#1a1a1a] hover:bg-[#FFF2EC] hover:text-[#1a1a1a] transition-all flex items-center gap-3"
              >
                NEXT: STRUCTURE <ArrowRight size={20} />
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- RENDER STEP 2: STRUCTURE SELECTION ---
  if (step === 2) {
    const options = getStructureOptions(businessType);

    return (
      <div className="h-full w-full flex flex-col bg-[#FFF2EC] text-[#1a1a1a] overflow-hidden">
        <div className="p-6 border-b-2 border-[#1a1a1a] flex justify-between items-center shrink-0 bg-[#FFF2EC]">
           <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
             <span className="w-8 h-8 bg-[#1a1a1a] text-[#FFF2EC] rounded-full flex items-center justify-center text-sm">2</span> 
             SELECT WIREFRAME STRATEGY
           </h2>
           <button onClick={() => setStep(1)} className="text-xs font-bold underline hover:opacity-50">BACK TO CONTEXT</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="h-full flex flex-col md:flex-row gap-8 items-stretch justify-center max-w-7xl mx-auto">
            {options.map((option) => (
              <div 
                key={option.id}
                onClick={() => handleStructureSelect(option)}
                className="flex-1 flex flex-col border-4 border-[#1a1a1a] bg-[#FFF2EC] cursor-pointer group hover:-translate-y-2 transition-transform duration-300 relative"
              >
                {/* Header */}
                <div className="p-6 border-b-2 border-[#1a1a1a] bg-[#FFF2EC] group-hover:bg-[#1a1a1a] group-hover:text-[#FFF2EC] transition-colors">
                  <h3 className="text-2xl font-black uppercase mb-2">{option.label}</h3>
                  <p className="text-xs font-mono opacity-80 leading-relaxed">{option.description}</p>
                </div>

                {/* Wireframe Visual */}
                <div className="flex-1 p-6 bg-[#FFF2EC] flex flex-col gap-2 items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                   
                   {/* The Mini Blocks */}
                   <div className="w-full max-w-[200px] flex flex-col gap-1 z-10">
                      {option.visualPreview?.map((block, i) => (
                        <div key={i} className={`w-full border-2 border-[#1a1a1a] bg-[#FFF2EC] flex items-center justify-center text-[10px] font-bold uppercase tracking-wider
                          ${i === 0 ? 'h-16' : 'h-10'}
                        `}>
                          {block}
                        </div>
                      ))}
                   </div>
                </div>

                {/* Action */}
                <div className="p-4 border-t-2 border-[#1a1a1a] text-center font-bold text-sm uppercase tracking-widest bg-[#FFF2EC] group-hover:bg-[#1a1a1a] group-hover:text-[#FFF2EC] transition-colors">
                  Select This Blueprint
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER STEP 3: SITEMAP BUILDER ---
  if (step === 3) {
    const recommendedPages = getRecommendedSitemap(businessType);
    
    return (
      <div className="h-full w-full flex flex-col bg-[#FFF2EC] text-[#1a1a1a] overflow-hidden">
        <div className="p-6 border-b-2 border-[#1a1a1a] flex justify-between items-center shrink-0 bg-[#FFF2EC]">
           <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
             <span className="w-8 h-8 bg-[#1a1a1a] text-[#FFF2EC] rounded-full flex items-center justify-center text-sm">3</span> 
             SITE ARCHITECTURE
           </h2>
           <button onClick={() => setStep(2)} className="text-xs font-bold underline hover:opacity-50">CHANGE STRATEGY</button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Left: Info */}
          <div className="w-full md:w-1/3 border-r-2 border-[#1a1a1a] p-8 bg-[#FFF2EC]">
            <h3 className="text-xl font-bold mb-4 uppercase">Your Blueprint</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase opacity-60">Selected Strategy</label>
                <p className="text-lg font-bold">{selectedStructure?.label}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase opacity-60">Business Type</label>
                <p className="text-lg font-bold capitalize">{businessType}</p>
              </div>
              
              <div className="p-4 border-2 border-[#1a1a1a] bg-[#FFF2EC]">
                <p className="text-sm font-medium leading-relaxed">
                  "We have pre-selected pages based on the <strong>{businessType}</strong> model. 
                  Add optional pages if necessary, but keep the nav lean for better conversion."
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interaction */}
          <div className="flex-1 p-8 overflow-y-auto bg-[#FFF2EC]">
             <h3 className="text-sm font-bold uppercase tracking-widest border-b-2 border-[#1a1a1a] pb-4 mb-6">Page Structure</h3>
             
             <div className="grid grid-cols-1 gap-3">
               {recommendedPages.map((page) => (
                 <label 
                    key={page.id}
                    className={`flex items-start gap-4 p-4 border-2 border-[#1a1a1a] cursor-pointer transition-all
                      ${page.selected ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-transparent hover:bg-[#1a1a1a] hover:text-[#FFF2EC]'}
                    `}
                 >
                    <div className={`mt-1 w-5 h-5 border-2 flex items-center justify-center shrink-0 
                      ${page.selected ? 'border-[#FFF2EC] bg-[#FFF2EC] text-[#1a1a1a]' : 'border-[#1a1a1a]'}
                    `}>
                      {page.selected && <Check size={12} strokeWidth={4} />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{page.name}</span>
                        <span className="font-mono text-xs opacity-60">{page.slug}</span>
                        {page.required && <span className="px-2 py-0.5 border border-current text-[10px] font-bold uppercase rounded-sm">Essential</span>}
                      </div>
                      <p className={`text-xs mt-1 ${page.selected ? 'opacity-80' : 'opacity-60'}`}>{page.reason}</p>
                    </div>
                 </label>
               ))}
             </div>

             <div className="mt-12 flex justify-end">
               <button 
                onClick={handleFinalBuild}
                className="px-12 py-5 bg-[#1a1a1a] text-[#FFF2EC] font-black text-2xl tracking-widest border-2 border-transparent hover:bg-[#FFF2EC] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                BUILD PROJECT
              </button>
             </div>
          </div>

        </div>
      </div>
    );
  }

  return null;
};