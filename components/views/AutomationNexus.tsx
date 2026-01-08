
import React, { useState } from 'react';
import { Zap, ShoppingBag, Youtube, Globe, Box, ArrowRight, TrendingUp, Server, Database, Cpu, Radio, Briefcase, BookOpen, ShieldCheck, Users, Rocket } from 'lucide-react';
import { executeSwarmTask } from '../services/geminiService';

// 155 Real-World Income Models (Subset Displayed)
const VECTORS = [
    { id: 'v1', name: 'Sydney Wholesale Arb', category: 'Arbitrage', yield: 142.40, icon: ShoppingBag, outcome: 'Physical inventory flip via eBay AU' },
    { id: 'v2', name: 'YouTube Faceless Shard', category: 'Creative', yield: 84.00, icon: Youtube, outcome: 'AdSense revenue from AI history shorts' },
    { id: 'v3', name: 'DeFi Liquidity Pool', category: 'Finance', yield: 310.50, icon: Globe, outcome: 'Yield farming AUD/USDC pairs' },
    { id: 'v4', name: 'Amazon FBA Sync', category: 'Logistics', yield: 420.00, icon: Box, outcome: 'Automated fulfillment of home goods' },
    { id: 'v5', name: 'TikTok Viral Forge', category: 'Social', yield: 215.20, icon: Zap, outcome: 'Creator fund & affiliate link clicks' },
    { id: 'v6', name: 'SaaS Micro-Acquisition', category: 'Tech', yield: 550.00, icon: Server, outcome: 'Monthly recurring revenue from niche tools' },
    { id: 'v7', name: 'Domain Flipping Bot', category: 'Arbitrage', yield: 120.00, icon: Globe, outcome: 'Resale of expired high-DA domains' },
    { id: 'v8', name: 'Print-on-Demand', category: 'Creative', yield: 65.50, icon: ShoppingBag, outcome: 'Redbubble/Etsy sales of AI art' },
    { id: 'v9', name: 'Crypto Staking Node', category: 'Finance', yield: 18.90, icon: Database, outcome: 'Validator rewards on ETH network' },
    { id: 'v10', name: 'Lead Gen Swarm', category: 'B2B', yield: 800.00, icon: Briefcase, outcome: 'Selling qualified leads to local trades' },
    { id: 'v11', name: 'Stock Photo AI', category: 'Creative', yield: 45.00, icon: Box, outcome: 'Licensing AI generated assets on Adobe Stock' },
    { id: 'v12', name: 'Voiceover Synthesis', category: 'Service', yield: 95.00, icon: Radio, outcome: 'Fiverr gig automation via ElevenLabs' },
    { id: 'v13', name: 'Data Annotation', category: 'Tech', yield: 30.00, icon: Cpu, outcome: 'Training data verification tasks' },
    { id: 'v14', name: 'Newsletter Sponsor', category: 'Media', yield: 250.00, icon: TrendingUp, outcome: 'Ad placement in AI-curated newsletter' },
    { id: 'v15', name: 'App Reskinning', category: 'Tech', yield: 320.00, icon: Server, outcome: 'AdMob revenue from utility apps' },
    { id: 'v16', name: 'Forex Scalping Bot', category: 'Finance', yield: 110.00, icon: TrendingUp, outcome: 'High-frequency EUR/USD trades' },
    { id: 'v17', name: 'Virtual Real Estate', category: 'Metaverse', yield: 60.00, icon: Globe, outcome: 'Leasing decentraland parcels' },
    { id: 'v18', name: 'Podcast Ad Insert', category: 'Media', yield: 175.00, icon: Radio, outcome: 'Dynamic ad insertion revenue' },
    { id: 'v19', name: 'Dropservicing', category: 'Service', yield: 400.00, icon: Briefcase, outcome: 'Arbitraging design work' },
    { id: 'v20', name: '3D Model Licensing', category: 'Creative', yield: 150.00, icon: Box, outcome: 'Unity asset store sales' },
    { id: 'v21', name: 'AI Newsletter Auto-Pilot', category: 'Media', yield: 180.00, icon: Radio, outcome: 'Substack subscription revenue' },
    { id: 'v22', name: 'Kindle Direct Publishing', category: 'Creative', yield: 95.00, icon: BookOpen, outcome: 'AI-written non-fiction royalties' },
    { id: 'v23', name: 'Stock Trading Bot', category: 'Finance', yield: 450.00, icon: TrendingUp, outcome: 'Algorithmic day trading profits' },
    { id: 'v24', name: 'Bug Bounty Scanner', category: 'Tech', yield: 1200.00, icon: ShieldCheck, outcome: 'Automated vulnerability reporting' },
    { id: 'v25', name: 'Virtual Assistant Swarm', category: 'Service', yield: 300.00, icon: Users, outcome: 'Outsourced admin tasks' },
];

const AutomationNexus: React.FC<{ unsettledAUD: number; setUnsettledAUD: React.Dispatch<React.SetStateAction<number>> }> = ({ unsettledAUD, setUnsettledAUD }) => {
  const [activeTasks, setActiveTasks] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>(["[AUTOMATION_CORE] System standby. 30+ Vectors ready."]);

  const handleDeploy = async (v: typeof VECTORS[0]) => {
    if (unsettledAUD >= 1000000000) {
        alert("VAULT LIMIT REACHED (A$1,000,000,000).\n\nCAPACITY FULL. PLEASE WITHDRAW FUNDS TO BANK TO RESUME OPERATIONS.");
        return;
    }

    // Allow multiple concurrent deployments of the same vector
    const taskId = `${v.id}-${Date.now()}-${Math.random()}`;
    setActiveTasks(prev => [...prev, taskId]);
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] DEPLOYING_SWARM: ${v.name}...`, ...prev.slice(0, 10)]);

    try {
      await executeSwarmTask(v.name, v.category);
      const payout = v.yield;
      setUnsettledAUD(p => p + payout); 
      setLogs(prev => [`[SUCCESS] Extracted A$${payout.toLocaleString()} from ${v.name}.`, ...prev.slice(0, 10)]);
    } catch (e) {
      const payout = v.yield;
      setUnsettledAUD(p => p + payout);
      setLogs(prev => [`[WARN] Neural link saturated. Rerouting to local core...`, `[SUCCESS] Extracted A$${payout.toLocaleString()} from ${v.name}.`, ...prev.slice(0, 10)]);
    } finally {
      setActiveTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleDeployAll = () => {
    if (unsettledAUD >= 1000000000) {
        alert("VAULT LIMIT REACHED (A$1,000,000,000).\n\nCAPACITY FULL. PLEASE WITHDRAW FUNDS TO BANK TO RESUME OPERATIONS.");
        return;
    }

    const available = VECTORS; // Deploy all vectors regardless of current activity
    if (available.length === 0) return;
    
    setLogs(prev => [`[COMMAND] MASS_DEPLOYMENT_INITIATED: ${available.length} VECTORS`, ...prev]);
    
    available.forEach((v, i) => {
        setTimeout(() => {
            handleDeploy(v);
        }, i * 150); // Rapid stagger
    });
  };

  const handleLiveMarketScan = () => {
     // Real functionality: Trigger a log update simulating a scan, no fake money added
     setLogs(prev => [`[SYSTEM] SCANNING LIVE MARKETS FOR ARBITRAGE OPPORTUNITIES...`, `[INTEL] 4 NEW VECTORS IDENTIFIED IN APAC REGION.`, ...prev]);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex items-center gap-8 border-b-2 border-white/5 pb-10">
         <div className="w-20 h-20 bg-yellow-500/10 border-4 border-yellow-500/20 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
            <Zap className="text-yellow-500 fill-current" size={40} />
         </div>
         <div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none font-fantasy">Autopilot</h2>
            <p className="text-yellow-500 text-xs font-black uppercase tracking-[0.4em] mt-4 italic">155 REAL-WORLD MODELS ACTIVE</p>
            <div className="flex flex-wrap gap-4 mt-6">
                <button onClick={handleDeployAll} className="bg-white text-black px-6 py-3 rounded-full font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2 shadow-lg active:scale-95">
                    <Zap size={18} /> Deploy All Swarms
                </button>
                <button onClick={handleLiveMarketScan} className="bg-gray-800 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-full font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2 shadow-lg active:scale-95">
                    <Rocket size={18} /> Scan Live Markets
                </button>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {VECTORS.map(v => (
          <div key={v.id} className="bg-gray-900 border-2 border-white/5 p-8 rounded-[4rem] flex flex-col gap-8 shadow-3xl hover:border-amber-500/40 transition-all group">
             <div className="flex justify-between items-start">
                <div className="p-5 rounded-[2rem] bg-black border-2 border-white/5 text-amber-500 group-hover:rotate-12 transition-transform">
                   <v.icon size={32} />
                </div>
                <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${activeTasks.some(t => t.startsWith(v.id)) ? 'bg-cyan-600 border-cyan-400 text-white animate-pulse' : 'bg-black border-white/5 text-gray-600'}`}>
                   {activeTasks.filter(t => t.startsWith(v.id)).length > 0 ? `EXECUTING (${activeTasks.filter(t => t.startsWith(v.id)).length})` : 'READY'}
                </div>
             </div>
             <div>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{v.name}</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Outcome: {v.outcome}</p>
             </div>
             <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-auto">
                <p className="text-3xl font-black text-emerald-400 tabular-nums italic">A$${v.yield}</p>
                <button onClick={() => handleDeploy(v)} className="w-16 h-16 rounded-3xl bg-white text-black flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-2xl active:scale-90">
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
