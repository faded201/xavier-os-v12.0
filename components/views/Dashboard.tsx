import React from 'react';
import { 
  LayoutGrid, Landmark, Bot, Sparkles, ShoppingBag, Swords, 
  ShieldCheck, ArrowRight, Key, Search, Zap, Target, Layers, 
  TrendingUp, Globe, Activity, Star, Ghost, Warehouse, ReceiptText, Eye, Lock
} from 'lucide-react';
import { AppView, SubscriptionTier } from '../types';

interface DashboardProps { 
  setView: (v: AppView) => void, 
  isOwner: boolean, 
  userTier: SubscriptionTier 
}

const Dashboard: React.FC<DashboardProps> = ({ setView, isOwner, userTier }) => {
  const CATEGORIES = [
    { name: 'WEALTH', modules: [
      { id: 'automation_nexus', label: 'AUTOPILOT', icon: Zap, desc: '30+ AI extraction vectors.', color: 'text-yellow-500' },
      { id: 'logistics_nexus', label: 'DROP SHARD', icon: Warehouse, desc: 'Autonomous FBA sharding.', color: 'text-emerald-500' },
      { id: 'wealth_gate', label: 'STRIPE', icon: ReceiptText, desc: 'Capital extraction hub.', color: 'text-green-400' },
    ]},
    { name: 'SECURITY', modules: [
      { id: 'warroom', label: 'WAR ROOM', icon: Swords, desc: 'Tactical command hub.', color: 'text-rose-500' },
      { id: 'security', label: 'SANCTUM', icon: ShieldCheck, desc: 'Neural shielding protocols.', color: 'text-blue-500' },
      { id: 'sentinel', label: 'SENTINEL', icon: Eye, desc: 'Biometric monitoring.', color: 'text-emerald-400' },
    ]},
    { name: 'SOULS & LEGACY', modules: [
      { id: 'soul_sync', label: 'SOUL SYNC', icon: Ghost, desc: 'Legacy operative sharding.', color: 'text-indigo-400' },
      { id: 'talent_forge', label: 'TALENT', icon: Star, desc: '4K Persona generation.', color: 'text-amber-500', minTier: 'INVERSION' },
      { id: 'registry', label: '155_MODS', icon: Layers, desc: 'Restored module shards.', color: 'text-purple-500' },
    ]}
  ];

  return (
    <div className="flex flex-col gap-20 animate-in fade-in duration-1000 pb-40">
      <header className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-10">
           <div className="w-24 h-24 bg-amber-600/10 border-4 border-amber-500/20 rounded-[3rem] flex items-center justify-center shadow-4xl">
              <LayoutGrid className="text-amber-500" size={48} />
           </div>
           <div>
              <h2 className="text-4xl md:text-[9rem] font-black text-white italic uppercase tracking-tighter leading-none font-fantasy">Ecosystem</h2>
              <p className="text-amber-500 text-[14px] font-black uppercase tracking-[0.8em] mt-8 italic">RESTORED_MANIFEST: 155_SHARDS // AUTH: {isOwner ? 'ROOT_PRIME' : 'OPERATIVE'}</p>
           </div>
        </div>
      </header>
      
      {CATEGORIES.map(cat => (
        <div key={cat.name} className="space-y-10">
            <h3 className="text-4xl font-black text-gray-700 italic uppercase tracking-[0.4em] font-fantasy px-4">{cat.name}_SECTOR</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {cat.modules.map(module => (
                    <div 
                        key={module.id} 
                        onClick={() => setView(module.id as AppView)}
                        className="bg-gray-900 border-4 border-gray-800 p-10 rounded-[5rem] hover:border-amber-500/40 transition-all cursor-pointer group shadow-3xl relative overflow-hidden flex flex-col gap-8"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-1000"><module.icon size={250} /></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div className="w-20 h-20 rounded-[2.5rem] bg-black border-2 border-white/5 flex items-center justify-center mb-4 shadow-inner">
                                <module.icon size={42} className={module.color} />
                            </div>
                            {module.minTier === 'INVERSION' && !isOwner && <Lock className="text-rose-500" size={24} />}
                        </div>
                        <div className="relative z-10 space-y-3">
                            <h4 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-amber-400">{module.label}</h4>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed italic mt-2">{module.desc}</p>
                        </div>
                        <div className="mt-auto flex justify-end relative z-10">
                             <ArrowRight size={24} className="text-gray-800 group-hover:text-white group-hover:translate-x-3 transition-all" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;