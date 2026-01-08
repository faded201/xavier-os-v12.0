import React, { useState } from 'react';
import { Key, Copy, ShieldCheck } from 'lucide-react';

const ArchitectKeyGen: React.FC = () => {
  const [generatedKeys, setGeneratedKeys] = useState<{ code: string; created: string }[]>([]);

  const generateKey = () => {
    const randomSegment = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newKey = `XAVIER-UL-${randomSegment}`;
    setGeneratedKeys(prev => [{ code: newKey, created: new Date().toLocaleTimeString() }, ...prev]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`COPIED TO CLIPBOARD: ${text}`);
  };

  return (
    <div className="h-full w-full p-6 text-[var(--primary)] font-mono overflow-y-auto animate-in fade-in duration-500">
      <header className="mb-8 border-b border-[var(--primary)]/30 pb-6">
        <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4 text-white">
          <Key size={40} className="text-[var(--primary)]" />
          Key Forge
        </h1>
        <p className="text-sm opacity-70 mt-2 tracking-[0.2em]">UNLIMITED ACCESS GENERATOR // ROOT_ONLY</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
            <div className="bg-black/40 border-2 border-[var(--primary)] p-8 rounded-[3rem] text-center">
                <ShieldCheck size={64} className="mx-auto mb-6 text-[var(--primary)]" />
                <h2 className="text-2xl font-bold text-white mb-4">Generate Master Key</h2>
                <p className="text-sm opacity-60 mb-8">
                    Create a unique, one-time use access code that grants <span className="text-emerald-500 font-bold">ARCHITECT TIER (FULL ACCESS)</span> to the recipient.
                </p>
                <button 
                    onClick={generateKey}
                    className="px-8 py-4 bg-[var(--primary)] text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all active:scale-95 shadow-[0_0_30px_var(--primary)]"
                >
                    Forge New Key
                </button>
            </div>
        </div>

        <div className="bg-black/40 border border-[var(--primary)]/20 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Key size={18} /> Active Keys
            </h3>
            <div className="space-y-3">
                {generatedKeys.map((k, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-black/60 border border-white/5 rounded-xl group hover:border-[var(--primary)]/50 transition-all">
                        <div>
                            <div className="text-xl font-black text-white tracking-widest">{k.code}</div>
                            <div className="text-[10px] opacity-50">CREATED: {k.created}</div>
                        </div>
                        <button onClick={() => copyToClipboard(k.code)} className="p-2 hover:bg-[var(--primary)] hover:text-black rounded-full transition-colors">
                            <Copy size={18} />
                        </button>
                    </div>
                ))}
                {generatedKeys.length === 0 && <div className="text-center opacity-30 py-10">NO KEYS GENERATED</div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectKeyGen;