import React, { useState } from 'react';
import { Smartphone, Code, Cpu, Layers } from 'lucide-react';

const AppBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBuild = () => {
    if (!prompt) return;
    setIsBuilding(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsBuilding(false);
          alert('APP GENERATION COMPLETE. SOURCE CODE COMPILED.');
          return 100;
        }
        return p + 1;
      });
    }, 50);
  };

  return (
    <div className="h-full w-full p-6 text-[var(--primary)] font-mono overflow-y-auto animate-in fade-in duration-500">
      <header className="mb-8 border-b border-[var(--primary)]/30 pb-6">
        <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4 text-white">
          <Smartphone size={40} className="text-[var(--primary)]" />
          AI App Forge
        </h1>
        <p className="text-sm opacity-70 mt-2 tracking-[0.2em]">EMERGENT SYSTEMS // IOS & ANDROID COMPILER</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black/40 border border-[var(--primary)]/30 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-4">Neural Blueprint</h3>
            <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app functionality, UI style, and target audience..."
                className="w-full h-40 bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[var(--primary)] transition-colors mb-6"
            />
            <button 
                onClick={handleBuild}
                disabled={isBuilding}
                className="w-full py-4 bg-[var(--primary)] text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
            >
                {isBuilding ? <Cpu className="animate-spin" /> : <Code />}
                {isBuilding ? `COMPILING... ${progress}%` : 'GENERATE APPLICATION'}
            </button>
        </div>

        <div className="bg-black/40 border border-[var(--primary)]/30 p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden">
            {isBuilding ? (
                <div className="space-y-4 relative z-10">
                    <Layers size={64} className="text-[var(--primary)] animate-bounce mx-auto" />
                    <div className="text-2xl font-black text-white">Constructing Architecture...</div>
                    <div className="text-xs font-mono opacity-50">Injecting React Native Shards...</div>
                </div>
            ) : (
                <div className="space-y-4 opacity-50">
                    <Smartphone size={64} className="mx-auto" />
                    <div className="text-xl font-bold">Preview Output</div>
                    <div className="text-xs">Waiting for compilation...</div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AppBuilder;