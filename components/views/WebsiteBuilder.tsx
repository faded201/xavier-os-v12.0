import React, { useState } from 'react';
import { Globe, Layout, Zap, Eye } from 'lucide-react';

const WebsiteBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);

  const handleBuild = () => {
    if (!prompt) return;
    setIsBuilding(true);
    setTimeout(() => {
        setIsBuilding(false);
        alert('WEBSITE DEPLOYED TO EDGE NETWORK.');
    }, 3000);
  };

  return (
    <div className="h-full w-full p-6 text-[var(--primary)] font-mono overflow-y-auto animate-in fade-in duration-500">
      <header className="mb-8 border-b border-[var(--primary)]/30 pb-6">
        <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4 text-white">
          <Globe size={40} className="text-[var(--primary)]" />
          Web Matrix
        </h1>
        <p className="text-sm opacity-70 mt-2 tracking-[0.2em]">AUTONOMOUS SITE GENERATOR // REACT & TAILWIND</p>
      </header>

      <div className="bg-black/40 border border-[var(--primary)]/30 p-8 rounded-3xl max-w-4xl mx-auto">
         <div className="flex gap-4 mb-6">
            <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'High-converting landing page for crypto SaaS'"
                className="flex-1 bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[var(--primary)] transition-colors"
            />
            <button 
                onClick={handleBuild}
                disabled={isBuilding}
                className="px-8 bg-[var(--primary)] text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center gap-2"
            >
                {isBuilding ? <Zap className="animate-spin" /> : <Layout />}
                BUILD
            </button>
         </div>

         <div className="aspect-video bg-black border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
            {isBuilding ? (
                <div className="text-center space-y-4">
                    <div className="text-4xl font-black text-white animate-pulse">GENERATING...</div>
                    <div className="text-[var(--primary)] font-mono">Writing Code... Optimizing Assets... Deploying...</div>
                </div>
            ) : (
                <div className="text-center opacity-30">
                    <Eye size={48} className="mx-auto mb-2" />
                    <div>LIVE PREVIEW CANVAS</div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;