import React, { useState, useEffect } from 'react';
import { Eye, User, Lock, MapPin, Terminal, Wifi } from 'lucide-react';

const MOCK_USERS = [
  { id: 'u1', name: 'Operative_77', location: 'Sydney, AU', status: 'ACTIVE', risk: 'LOW', ip: '192.168.1.42', tier: 'OPERATIVE' },
  { id: 'u2', name: 'Architect_01', location: 'Unknown', status: 'IDLE', risk: 'ZERO', ip: '10.0.0.1', tier: 'ARCHITECT' },
  { id: 'u3', name: 'Guest_Proxy', location: 'London, UK', status: 'ACTIVE', risk: 'MED', ip: '82.14.55.22', tier: 'SOVEREIGN' },
  { id: 'u4', name: 'Node_Alpha', location: 'Tokyo, JP', status: 'OFFLINE', risk: 'LOW', ip: '45.11.22.99', tier: 'OPERATIVE' },
];

const Sentinel: React.FC = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ['accessed_vault', 'deployed_swarm', 'query_db', 'signal_intercept', 'biometric_scan', 'login_attempt'];
      const activeUsers = users.filter(u => u.status === 'ACTIVE');
      if (activeUsers.length === 0) return;
      
      const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const log = `[${new Date().toLocaleTimeString()}] ${randomUser.name} > ${randomAction}`;
      setLogs(prev => [log, ...prev].slice(0, 50));
    }, 1500);
    return () => clearInterval(interval);
  }, [users]);

  const toggleLock = (id: string) => {
    setUsers(prev => prev.map(u => {
        if (u.id === id) {
            const newStatus = u.status === 'LOCKED' ? 'ACTIVE' : 'LOCKED';
            return { ...u, status: newStatus };
        }
        return u;
    }));
  };

  return (
    <div className="h-full w-full p-6 text-emerald-500 font-mono overflow-y-auto animate-in fade-in duration-500">
      <header className="mb-8 border-b border-emerald-500/30 pb-6 flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4 text-white">
              <Eye size={40} className="text-emerald-500" />
              Sentinel Overwatch
            </h1>
            <p className="text-sm opacity-70 mt-2 tracking-[0.2em]">USER_MONITORING // THREAT_DETECTION</p>
        </div>
        <div className="flex gap-4">
            <div className="bg-black/40 border border-emerald-500/30 px-4 py-2 rounded-lg text-right">
                <div className="text-2xl font-bold text-white">{users.filter(u => u.status === 'ACTIVE').length}</div>
                <div className="text-[10px] opacity-50 uppercase">Active Nodes</div>
            </div>
            <div className="bg-black/40 border border-emerald-500/30 px-4 py-2 rounded-lg text-right">
                <div className="text-2xl font-bold text-rose-500">{users.filter(u => u.risk === 'HIGH').length}</div>
                <div className="text-[10px] opacity-50 uppercase">Threats</div>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User List */}
        <div className="lg:col-span-2 space-y-4">
            {users.map(u => (
                <div key={u.id} className={`bg-black/40 border p-4 rounded-xl flex items-center justify-between transition-all ${u.status === 'LOCKED' ? 'border-rose-500/50 opacity-70' : 'border-emerald-500/20 hover:bg-emerald-500/5'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-500' : u.status === 'LOCKED' ? 'bg-rose-500/20 text-rose-500' : 'bg-gray-800 text-gray-500'}`}>
                            <User size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-white flex items-center gap-2">
                                {u.name}
                                <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-white/70">{u.tier}</span>
                            </div>
                            <div className="text-xs opacity-50 flex items-center gap-2 mt-1">
                                <MapPin size={10} /> {u.location} <span className="text-white/20">|</span> {u.ip}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`text-xs font-bold px-2 py-1 rounded border ${u.risk === 'LOW' || u.risk === 'ZERO' ? 'border-emerald-500/30 text-emerald-500' : 'border-amber-500/30 text-amber-500'}`}>
                            RISK: {u.risk}
                        </div>
                        <div className={`flex items-center gap-1 text-[10px] font-bold ${u.status === 'ACTIVE' ? 'text-emerald-500' : u.status === 'LOCKED' ? 'text-rose-500' : 'text-gray-500'}`}>
                            <Wifi size={12} /> {u.status}
                        </div>
                        <button 
                            onClick={() => toggleLock(u.id)}
                            className={`p-2 rounded-lg transition-colors border ${u.status === 'LOCKED' ? 'bg-rose-500 text-white border-rose-500' : 'hover:bg-rose-500 hover:text-white border-transparent hover:border-rose-500/50 text-gray-500'}`}
                            title={u.status === 'LOCKED' ? 'UNLOCK USER' : 'LOCK USER'}
                        >
                            <Lock size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Live Logs */}
        <div className="bg-black/60 border border-emerald-500/20 p-6 rounded-2xl h-[600px] flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Terminal size={18} /> LIVE_FEED</h3>
            <div className="flex-1 overflow-y-auto space-y-2 text-xs opacity-80 font-mono no-scrollbar">
                {logs.map((log, i) => (
                    <div key={i} className="border-b border-white/5 pb-1 mb-1 last:border-0 flex gap-2">
                        <span className="text-emerald-500/50 shrink-0">&gt;</span>
                        <span>{log}</span>
                    </div>
                ))}
                <div className="animate-pulse text-emerald-500">_</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sentinel;