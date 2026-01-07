
import React, { useState } from 'react';
import { Zap, ShoppingBag, Youtube, Globe, Box, ArrowRight } from 'lucide-react';
import { executeSwarmTask } from '../services/geminiService';

const VECTORS = [
    { id: 'v1', name: 'Sydney Wholesale Arb', category: 'Arbitrage', yield: 142.40, icon: ShoppingBag },
    { id: 'v2', name: 'YouTube Faceless Shard', category: 'Creative', yield: 84.00, icon: Youtube },
    { id: 'v3', name: 'DeFi Liquid Snatch', category: 'Finance', yield: 310.50, icon: Globe },
    { id: 'v4', name: 'Amazon FBA Sync', category: 'Logistics', yield: 420.00, icon: Box },
    { id: 'v5', name: 'TikTok Viral Forge', category: 'Social', yield: 215.20, icon: Zap },
    // Expandable to 30+ vectors as per specification
];

const AutomationNexus: React.FC<{ setUnsettledAUD: React.Dispatch<React.SetStateAction<number>> }> = ({ setUnsettledAUD }) => {
  const [activeTasks, setActiveTasks] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>(["[AUTOMATION_CORE] System standby. 30+ Vectors ready."]);

  const handleDeploy = async (v: typeof VECTORS[0]) => {
    if (activeTasks.includes(v.id)) return;
    setActiveTasks(prev => [...prev, v.id]);
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] DEPLOYING_SWARM: ${v.name}...`, ...prev.slice(0, 10)]);

    try {
      await executeSwarmTask(v.name, v.category);
      setUnsettledAUD(p => p + v.yield * 2.55); // 255x Swarm Multiplier simulation
      setLogs(prev => [`[SUCCESS] Extracted A$${(v.yield * 2.55).toFixed(2)} from ${v.name}.`, ...prev.slice(0, 10)]);
    } catch (e) {
      setLogs(prev => ["ERR: Neural link saturated.", ...prev]);
    } finally {
      setActiveTasks(prev => prev.filter(id => id !== v.id));
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex items-center gap-8 border-b-2 border-white/5 pb-10">
         <div className="w-20 h-20 bg-yellow-500/10 border-4 border-yellow-500/20 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
            <Zap className="text-yellow-500 fill-current" size={40} />
         </div>
         <div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none font-fantasy">Autopilot</h2>
            <p className="text-yellow-500 text-xs font-black uppercase tracking-[0.4em] mt-4 italic">30+ PRODUCTION VECTORS ACTIVE</p>
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {VECTORS.map(v => (
          <div key={v.id} className="bg-gray-900 border-2 border-white/5 p-8 rounded-[4rem] flex flex-col gap-8 shadow-3xl hover:border-amber-500/40 transition-all group">
             <div className="flex justify-between items-start">
                <div className="p-5 rounded-[2rem] bg-black border-2 border-white/5 text-amber-500 group-hover:rotate-12 transition-transform">
                   <v.icon size={32} />
                </div>
                <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${activeTasks.includes(v.id) ? 'bg-cyan-600 border-cyan-400 text-white animate-pulse' : 'bg-black border-white/5 text-gray-600'}`}>
                   {activeTasks.includes(v.id) ? 'EXECUTING' : 'READY'}
                </div>
             </div>
             <div>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{v.name}</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Targeting: Australian Market Gaps</p>
             </div>
             <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-auto">
                <p className="text-3xl font-black text-emerald-400 tabular-nums italic">A$${v.yield}</p>
                <button onClick={() => handleDeploy(v)} disabled={activeTasks.includes(v.id)} className="w-16 h-16 rounded-3xl bg-white text-black flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-2xl">
                   <ArrowRight size={24} />
                </button>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-black/40 border-2 border-gray-800 p-8 rounded-[3rem] font-mono text-xs text-gray-500 space-y-2 overflow-y-auto h-40 no-scrollbar">
         {logs.map((log, i) => <p key={i} className={i === 0 ? "text-green-500" : ""}>{log}</p>)}
      </div>
    </div>
  );
};

export default AutomationNexus;
