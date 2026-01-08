import React, { useState } from 'react';
import { User, Shield, Crown, Activity, LogOut, Key } from 'lucide-react';
import { UserState } from '../types';

interface UserProfileProps {
  user: UserState;
  activePersona: any;
  onLogout: () => void;
  onRedeem: (code: string) => boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout, onRedeem }) => {
  const [code, setCode] = useState('');

  const handleRedeem = () => {
    if (onRedeem(code)) {
        setCode('');
    } else {
        alert("INVALID ACCESS CODE");
    }
  };

  return (
    <div className="h-full w-full p-6 text-[var(--primary)] font-mono overflow-y-auto animate-in fade-in duration-500">
      <header className="mb-12 border-b border-[var(--primary)]/30 pb-6 flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4 text-white">
            <User size={40} className="text-[var(--primary)]" />
            Architect Profile
            </h1>
            <p className="text-sm opacity-70 mt-2 tracking-[0.2em]">IDENTITY_MATRIX // {user.isOwner ? 'ROOT_ACCESS' : 'OPERATIVE_ACCESS'}</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-red-500 hover:text-white border border-red-500/30 px-4 py-2 rounded-full transition-all">
            <LogOut size={16} /> DISCONNECT
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Identity Card */}
        <div className="bg-black/40 border-2 border-[var(--primary)]/50 p-8 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Crown size={120} />
            </div>
            <div className="relative z-10">
                <div className="w-24 h-24 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mb-6 border-2 border-[var(--primary)]">
                    <User size={48} className="text-[var(--primary)]" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Operative</h2>
                <div className="flex items-center gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-black ${user.isOwner ? 'bg-purple-500' : 'bg-blue-500'}`}>
                        {user.tier}
                    </span>
                    {user.isOwner && <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-black">OWNER</span>}
                </div>
                
                <div className="space-y-4 border-t border-white/10 pt-6">
                    <div className="flex justify-between">
                        <span className="opacity-50">Session ID</span>
                        <span className="font-mono text-white">0x{Math.random().toString(16).slice(2,10).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="opacity-50">Encryption</span>
                        <span className="text-emerald-500">AES-256-GCM</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="opacity-50">Subscription Status</span>
                        <span className="text-emerald-500">ACTIVE</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats / Persona */}
        <div className="space-y-6">
            <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Activity /> Neural Sync Status</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span>Uptime</span>
                            <span className="text-[var(--primary)]">99.9%</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--primary)] w-[99.9%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span>Bandwidth</span>
                            <span className="text-[var(--primary)]">4.2 TB/s</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--primary)] w-[75%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Shield /> Security Clearance</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/60 p-4 rounded-xl text-center border border-white/5">
                        <div className="text-2xl font-bold text-white">Lvl {user.isOwner ? '5' : '3'}</div>
                        <div className="text-[10px] opacity-50 uppercase">Access Level</div>
                    </div>
                    <div className="bg-black/60 p-4 rounded-xl text-center border border-white/5">
                        <div className="text-2xl font-bold text-emerald-500">VERIFIED</div>
                        <div className="text-[10px] opacity-50 uppercase">Biometrics</div>
                    </div>
                </div>
            </div>

            {/* Code Redemption */}
            <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Key /> Access Override</h3>
                <div className="flex gap-4">
                    <input 
                        type="text" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="ENTER_MASTER_KEY"
                        className="flex-1 bg-black border border-white/20 rounded-xl px-4 py-2 text-white outline-none focus:border-[var(--primary)] transition-colors"
                    />
                    <button onClick={handleRedeem} className="bg-[var(--primary)] text-black px-6 py-2 rounded-xl font-bold hover:bg-white transition-colors">
                        UNLOCK
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;