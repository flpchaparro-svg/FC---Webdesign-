import React, { useState, useEffect } from 'react';
import { DesignSystem, BusinessType, StructureOption, PageDefinition, ConversionGoal, BrandVibe } from '../types';
import { getStructureOptions, getRecommendedSitemap } from '../services/strategyUtils';
import { ArrowRight, Check, Target, Briefcase, ArrowLeft, Zap, Users, ShoppingBag, Layout, AlertCircle } from 'lucide-react';

interface StrategyStudioProps {
  system: DesignSystem;
  onComplete: (newSystem: DesignSystem) => void;
  onCancel: () => void;
}

export const StrategyStudio: React.FC<StrategyStudioProps> = ({ system, onComplete, onCancel }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [tempSystem, setTempSystem] = useState<DesignSystem>(system);
  const [selectedOption, setSelectedOption] = useState<StructureOption | null>(null);

  // Sync internal state with system prop on mount
  useEffect(() => {
    setTempSystem(system);
  }, [system]);

  // Derived state for Step 2
  const structureOptions = getStructureOptions(tempSystem.layout.businessType);

  // When business type changes, auto-update pages to recommendation
  const handleBusinessTypeChange = (type: BusinessType) => {
     const pages = getRecommendedSitemap(type);
     setTempSystem(prev => ({
         ...prev,
         layout: { ...prev.layout, businessType: type, pages: pages }
     }));
  };

  const handleOptionSelect = (option: StructureOption) => {
      setSelectedOption(option);
      setTempSystem(prev => ({
          ...prev,
          layout: {
              ...prev.layout,
              activeFormula: option.id,
              sections: option.sections
          }
      }));
  };

  const togglePage = (pageId: string) => {
      setTempSystem(prev => ({
          ...prev,
          layout: {
              ...prev.layout,
              pages: prev.layout.pages.map(p => p.id === pageId ? { ...p, selected: !p.selected } : p)
          }
      }));
  };

  return (
    <div className="fixed inset-0 bg-[#1a1a1a] text-white z-50 flex flex-col font-sans">
      {/* Header */}
      <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#1a1a1a] shrink-0">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                <Target size={18} className="text-white"/>
            </div>
            <div>
                <h1 className="font-bold text-lg tracking-tight">Strategy Studio</h1>
                <p className="text-xs text-gray-400">Architect your site before you design.</p>
            </div>
        </div>
        <div className="flex gap-4">
             <button onClick={onCancel} className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">EXIT</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex justify-center bg-[#111]">
          <div className="w-full max-w-5xl p-8 md:p-12">
              
              {/* Progress Indicator */}
              <div className="flex items-center gap-4 mb-12 text-xs font-bold uppercase tracking-wider text-gray-600">
                  <div className={`flex items-center gap-2 ${step >= 1 ? "text-blue-500" : ""}`}>
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">1</span>
                      <span>Context</span>
                  </div>
                  <div className={`w-12 h-[1px] ${step >= 2 ? "bg-blue-500" : "bg-gray-800"}`}></div>
                  <div className={`flex items-center gap-2 ${step >= 2 ? "text-blue-500" : ""}`}>
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">2</span>
                      <span>Structure</span>
                  </div>
                  <div className={`w-12 h-[1px] ${step >= 3 ? "bg-blue-500" : "bg-gray-800"}`}></div>
                  <div className={`flex items-center gap-2 ${step >= 3 ? "text-blue-500" : ""}`}>
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">3</span>
                      <span>Pages</span>
                  </div>
              </div>

              {/* STEP 1: CONTEXT */}
              {step === 1 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <h2 className="text-5xl font-black mb-4 tracking-tighter">Let's define your mission.</h2>
                        <p className="text-xl text-gray-400 max-w-2xl">Strategy drives design. Tell us about your business goals to generate a tailored architectural blueprint.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          {/* Business Type Selection */}
                          <div className="space-y-6">
                              <label className="flex items-center gap-2 text-sm font-bold uppercase text-blue-400 tracking-wider">
                                  <Briefcase size={16}/> Business Model
                              </label>
                              <div className="grid grid-cols-2 gap-4">
                                  {['saas', 'service', 'ecommerce', 'portfolio'].map((type) => (
                                      <button 
                                        key={type}
                                        onClick={() => handleBusinessTypeChange(type as BusinessType)}
                                        className={`p-6 border text-left rounded-xl transition-all duration-300 group relative overflow-hidden ${tempSystem.layout.businessType === type ? 'border-blue-500 bg-blue-600/10 text-white shadow-[0_0_30px_rgba(37,99,235,0.1)]' : 'border-white/5 bg-[#1a1a1a] text-gray-400 hover:border-white/20 hover:bg-[#222]'}`}
                                      >
                                          <div className={`mb-4 transition-colors ${tempSystem.layout.businessType === type ? 'text-blue-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                              {type === 'saas' && <Zap size={24}/>}
                                              {type === 'service' && <Users size={24}/>}
                                              {type === 'ecommerce' && <ShoppingBag size={24}/>}
                                              {type === 'portfolio' && <Layout size={24}/>}
                                          </div>
                                          <span className="font-bold uppercase text-sm tracking-wider block mb-1">{type}</span>
                                          <span className="text-[10px] opacity-60 block leading-tight">
                                              {type === 'saas' && 'Software & Digital Products'}
                                              {type === 'service' && 'Agencies & Consulting'}
                                              {type === 'ecommerce' && 'Physical Goods & Retail'}
                                              {type === 'portfolio' && 'Personal Brand & Work'}
                                          </span>
                                      </button>
                                  ))}
                              </div>
                          </div>

                          {/* Goal Selection */}
                          <div className="space-y-6">
                               <label className="flex items-center gap-2 text-sm font-bold uppercase text-blue-400 tracking-wider">
                                   <Target size={16}/> Primary Goal
                               </label>
                               <div className="space-y-3">
                                   {['lead', 'purchase', 'awareness'].map((goal) => (
                                       <div 
                                        key={goal}
                                        onClick={() => setTempSystem(prev => ({...prev, layout: {...prev.layout, conversionGoal: goal as ConversionGoal}}))}
                                        className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 transition-all ${tempSystem.layout.conversionGoal === goal ? 'border-blue-500 bg-blue-600/10' : 'border-white/5 bg-[#1a1a1a] hover:bg-[#222] hover:border-white/20'}`}
                                       >
                                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tempSystem.layout.conversionGoal === goal ? 'border-blue-500' : 'border-gray-700'}`}>
                                               {tempSystem.layout.conversionGoal === goal && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                                           </div>
                                           <div>
                                               <span className="text-sm font-bold capitalize block text-white">
                                                   {goal === 'lead' ? 'Generate Leads' : goal === 'purchase' ? 'Direct Sales' : 'Brand Awareness'}
                                               </span>
                                           </div>
                                       </div>
                                   ))}
                               </div>
                          </div>
                      </div>
                      
                      <div className="pt-4">
                          <button onClick={() => setStep(2)} className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                              Next: Choose Structure <ArrowRight size={20}/>
                          </button>
                      </div>
                  </div>
              )}

              {/* STEP 2: STRUCTURE */}
              {step === 2 && (
                   <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                       <div className="flex items-center gap-4 mb-8">
                           <button onClick={() => setStep(1)} className="p-3 border border-white/10 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><ArrowLeft size={18}/></button>
                           <div>
                               <h2 className="text-4xl font-black tracking-tighter">Choose your framework.</h2>
                               <p className="text-gray-400 mt-1">Select a proven layout strategy for {tempSystem.layout.businessType}.</p>
                           </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {structureOptions.map((option) => (
                               <div 
                                key={option.id}
                                onClick={() => handleOptionSelect(option)}
                                className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group ${selectedOption?.id === option.id ? 'border-blue-500 bg-[#161b22]' : 'border-white/5 bg-[#1a1a1a] hover:border-white/20'}`}
                               >
                                   <div className="flex justify-between items-start mb-4">
                                       <h3 className={`text-xl font-bold ${selectedOption?.id === option.id ? 'text-blue-400' : 'text-white'}`}>{option.title}</h3>
                                       {selectedOption?.id === option.id && <div className="bg-blue-500 text-white p-1 rounded-full"><Check size={14} strokeWidth={3}/></div>}
                                   </div>
                                   
                                   <p className="text-sm text-gray-400 mb-8 leading-relaxed min-h-[60px]">{option.description}</p>
                                   
                                   {/* Wireframe Visualization */}
                                   <div className="space-y-2 mb-8 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500">
                                       {option.sections.slice(0, 5).map((s, i) => (
                                           <div key={s} className={`w-full rounded bg-gray-700 ${i===0 ? 'h-16' : 'h-8'}`}></div>
                                       ))}
                                   </div>

                                   <div className="space-y-3 pt-6 border-t border-white/5">
                                       {option.features.map(f => (
                                           <div key={f} className="flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-blue-300 transition-colors">
                                               <Check size={12}/> {f}
                                           </div>
                                       ))}
                                   </div>
                               </div>
                           ))}
                       </div>

                       <div className="pt-8 flex justify-end">
                          <button 
                            disabled={!selectedOption}
                            onClick={() => setStep(3)} 
                            className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
                          >
                              Next: Sitemap <ArrowRight size={20}/>
                          </button>
                      </div>
                   </div>
              )}

              {/* STEP 3: SITEMAP */}
              {step === 3 && (
                   <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                       <div className="flex items-center gap-4 mb-8">
                           <button onClick={() => setStep(2)} className="p-3 border border-white/10 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><ArrowLeft size={18}/></button>
                           <div>
                               <h2 className="text-4xl font-black tracking-tighter">Define your pages.</h2>
                               <p className="text-gray-400 mt-1">Select the core pages needed for your MVP.</p>
                           </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           <div>
                               <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-6 flex items-center gap-2">
                                   <AlertCircle size={14}/> Recommended for {tempSystem.layout.businessType}
                               </h3>
                               <div className="space-y-3">
                                   {tempSystem.layout.pages.map((page) => (
                                       <div 
                                        key={page.id}
                                        onClick={() => togglePage(page.id)}
                                        className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all duration-200 ${page.selected ? 'bg-white text-black border-white shadow-lg' : 'border-white/10 bg-transparent text-gray-400 hover:border-white/30 hover:bg-white/5'}`}
                                       >
                                           <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${page.selected ? 'border-black bg-black text-white' : 'border-gray-600'}`}>
                                               {page.selected && <Check size={12}/>}
                                           </div>
                                           <div>
                                               <div className="flex items-center gap-2">
                                                   <span className="font-bold">{page.name}</span>
                                                   {page.required && <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${page.selected ? 'bg-black text-white' : 'bg-white/10 text-gray-400'}`}>Core</span>}
                                               </div>
                                               <p className={`text-xs mt-1 leading-normal ${page.selected ? 'opacity-70 font-medium' : 'opacity-40'}`}>{page.reason}</p>
                                           </div>
                                       </div>
                                   ))}
                               </div>
                           </div>
                           
                           {/* Review Summary */}
                           <div className="bg-[#161b22] border border-blue-500/30 rounded-3xl p-8 h-fit shadow-2xl relative overflow-hidden">
                               <div className="absolute top-0 right-0 p-32 bg-blue-600 blur-[120px] opacity-10 rounded-full pointer-events-none"></div>
                               
                               <h3 className="text-2xl font-black mb-8 relative z-10">Blueprint Summary</h3>
                               <div className="space-y-8 relative z-10">
                                   <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                       <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Strategy</label>
                                            <div className="text-xl font-bold text-blue-400">{structureOptions.find(o => o.id === tempSystem.layout.activeFormula)?.title || 'Custom'}</div>
                                       </div>
                                       <div className="text-right">
                                            <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Goal</label>
                                            <div className="text-sm font-bold capitalize">{tempSystem.layout.conversionGoal}</div>
                                       </div>
                                   </div>

                                   <div>
                                       <label className="text-[10px] font-bold uppercase text-gray-500 block mb-3">Sitemap Structure</label>
                                       <div className="flex flex-wrap gap-2">
                                           {tempSystem.layout.pages.filter(p => p.selected).map(p => (
                                               <span key={p.id} className="text-xs bg-white/10 px-3 py-1.5 rounded-md font-medium border border-white/5">{p.name}</span>
                                           ))}
                                       </div>
                                   </div>
                               </div>
                               
                               <button 
                                onClick={() => onComplete(tempSystem)}
                                className="w-full mt-12 bg-white text-black hover:bg-blue-500 hover:text-white py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] hover:shadow-blue-500/20"
                               >
                                   <Layout size={20}/> GENERATE BLUEPRINT
                               </button>
                           </div>
                       </div>
                   </div>
              )}

          </div>
      </div>
    </div>
  );
};