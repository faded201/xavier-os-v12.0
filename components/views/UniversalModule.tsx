import React, { useState, useEffect } from 'react';
import { Activity, Terminal, ShieldCheck, Wifi, Server, Database, Lock } from 'lucide-react';
import { MODULES } from '../data';

interface UniversalModuleProps {
  moduleId: string;
}

const UniversalModule: React.FC<UniversalModuleProps> = ({ moduleId }) => {
  const moduleData = MODULES.find(m => m.id === moduleId);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState('INITIALIZING');

  useEffect(() => {
    setLogs([`[KERNEL] Mounting ${moduleId.toUpperCase()} shard...`]);
    setStatus('CONNECTING');

    const sequence = [
      { t: 500, msg: `[NET] Handshake established with ${moduleId}_node.` },
      { t: 1200, msg: `[AUTH] Security clearance verified.` },
      { t: 1800, msg: `[DATA] Syncing real-time streams...` },
      { t: 2400, msg: `[SYS] Module active and listening.` }
    ];

    sequence.forEach(({ t, msg }) => {
      setTimeout(() => {
        setLogs(prev => [msg, ...prev]);
      }, t);
    });

    setTimeout(() => setStatus('ONLINE'), 2500);
  }, [moduleId]);

  if (!moduleData) return <div>Module Not Found</div>;

  return (
    <div className="h-full w-full p-6 text-[var(--primary)] font-mono overflow-y-auto animate-in fade-in duration-500">
      <header className="mb-8 border-b border-[var(--primary)]/30 pb-6 flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4 text-white">
              <moduleData.icon size={40} className="text-[var(--primary)]" />
              {moduleData.label}
            </h1>
            <p className="text-sm opacity-70 mt-2 tracking-[0.2em] uppercase">{moduleData.desc}</p>
        </div>
        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 text-xs font-bold ${status === 'ONLINE' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-amber-500 text-amber-500 animate-pulse'}`}>
            <Wifi size={14} /> {status}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-black/40 border border-[var(--primary)]/20 p-6 rounded-2xl min-h-[400px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <Terminal size={16} /> <span className="text-xs font-bold">SYSTEM_LOG</span>
            </div>
            <div className="flex-1 font-mono text-xs space-y-2 opacity-80">
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                        <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                        <span>{log}</span>
                    </div>
                ))}
                {status === 'ONLINE' && <div className="animate-pulse">_</div>}
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-black/40 border border-[var(--primary)]/20 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Activity size={18} /> STATUS</h3>
                <div className="text-4xl font-black text-emerald-500">99.9%</div>
                <div className="text-xs opacity-50 uppercase mt-1">Uptime</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalModule;