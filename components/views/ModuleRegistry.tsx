import React, { useState } from 'react';
import { Layers, Search, ArrowRight, Lock } from 'lucide-react';
import { MODULES } from '../data';
import { AppView } from '../types';

interface ModuleRegistryProps {
  setView: (view: AppView) => void;
}

// All modules are now online via UniversalModule adapter
const IMPLEMENTED_MODULES = MODULES.map(m => m.id);

const ModuleRegistry: React.FC<ModuleRegistryProps> = ({ setView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('ALL');

  const filteredModules = MODULES.filter(m => {
    const matchesSearch = m.label.toLowerCase().includes(searchTerm.toLowerCase()) || m.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'ALL' || (m.minTier || 'SOVEREIGN') === filterTier;
    return matchesSearch && matchesTier;
  });

  const onlineCount = MODULES.filter(m => IMPLEMENTED_MODULES.includes(m.id)).length;

  return (
    <div className="h-full w-full p-6 text-[var(--primary)] font-mono overflow-y-auto animate-in fade-in duration-500">
      <header className="mb-8 border-b border-[var(--primary)]/30 pb-6">
        <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4 text-white">
          <Layers size={40} className="text-[var(--primary)]" />
          Module Registry
        </h1>
        <p className="text-sm opacity-70 mt-2 tracking-[0.2em]">SYSTEM_MANIFEST // {onlineCount}/{MODULES.length}_SHARDS_ONLINE</p>
        
        <div className="mt-6 relative max-w-md">
            <input 
                type="text" 
                placeholder="SEARCH_MODULES..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-[var(--primary)]/50 p-3 pl-10 rounded-xl text-white outline-none focus:border-[var(--primary)] transition-colors"
            />
            <Search className="absolute top-3.5 left-3 text-[var(--primary)] opacity-50" size={18} />
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
            {['ALL', 'SOVEREIGN', 'OPERATIVE', 'ARCHITECT', 'MAGISTRATE', 'INVERSION'].map(tier => (
                <button
                    key={tier}
                    onClick={() => setFilterTier(tier)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase border rounded-full transition-all whitespace-nowrap ${
                        filterTier === tier ? 'bg-[var(--primary)] text-black border-[var(--primary)]' : 'border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/10'
                    }`}
                >
                    {tier}
                </button>
            ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map(module => {
            const isOnline = IMPLEMENTED_MODULES.includes(module.id);
            return (
            <div 
                key={module.id}
                onClick={() => setView(module.id as AppView)}
                className={`bg-black/40 border p-6 rounded-2xl transition-all cursor-pointer group relative overflow-hidden ${isOnline ? 'border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/50' : 'border-red-900/20 opacity-60 hover:opacity-100 hover:border-red-500/30'}`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg ${isOnline ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'bg-red-900/10 text-red-500'}`}>
                        <module.icon size={24} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className={`text-[9px] font-bold px-2 py-0.5 rounded border ${isOnline ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10' : 'text-red-500 border-red-500/30 bg-red-500/10'}`}>
                            {isOnline ? 'ONLINE' : 'OFFLINE'}
                        </div>
                        {module.minTier && (
                            <div className="flex items-center gap-1 text-[9px] font-bold uppercase border border-[var(--primary)]/30 px-2 py-0.5 rounded text-[var(--primary)]/70">
                                <Lock size={8} /> {module.minTier}
                            </div>
                        )}
                    </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">{module.label}</h3>
                <p className="text-xs opacity-60 leading-relaxed h-10 overflow-hidden">{module.desc}</p>
                
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={16} className="text-[var(--primary)]" />
                </div>
            </div>
            );
        })}
      </div>
    </div>
  );
};

export default ModuleRegistry;