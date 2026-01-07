import React from 'react';
import { Building2, TrendingUp, ShieldCheck, Lock } from 'lucide-react';

interface Investment {
  id: string;
  name: string;
  sector: string;
  minEntry: number;
  targetRoi: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

const INVESTMENTS: Investment[] = [
  { id: 'IV1', name: 'Neural Link Infrastructure', sector: 'Biotech', minEntry: 25000, targetRoi: '1200%', risk: 'HIGH' },
  { id: 'IV2', name: 'Orbital Helium-3 Mining', sector: 'Energy', minEntry: 50000, targetRoi: '5000%', risk: 'HIGH' },
  { id: 'IV3', name: 'Sovereign Island REIT', sector: 'Real Estate', minEntry: 100000, targetRoi: '15% APY', risk: 'LOW' },
  { id: 'IV4', name: 'Quantum Encryption Grid', sector: 'Cybersec', minEntry: 10000, targetRoi: '850%', risk: 'MEDIUM' },
];

interface EquityVaultProps {
  setUnsettledAUD: React.Dispatch<React.SetStateAction<number>>;
  onInvest: (item: { id: string; name: string; value: number; roi: string }) => void;
}

const EquityVault: React.FC<EquityVaultProps> = ({ setUnsettledAUD, onInvest }) => {
  const handleInvest = (inv: Investment) => {
    if (confirm(`AUTHORIZE CAPITAL DEPLOYMENT: $${inv.minEntry.toLocaleString()}?\nTARGET: ${inv.name}`)) {
      setUnsettledAUD(prev => prev - inv.minEntry);
      onInvest({ id: inv.id, name: inv.name, value: inv.minEntry, roi: inv.targetRoi });
      alert(`CAPITAL DEPLOYED SUCCESSFULLY.\nASSET ACQUIRED: ${inv.name}\nCONTRACT HASH: 0x${Math.random().toString(16).substr(2, 8)}`);
    }
  };

  return (
    <div className="h-full w-full p-8 text-[var(--primary)] font-mono overflow-y-auto">
      <header className="mb-12 border-b border-[var(--primary)] pb-6">
        <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4">
          <Building2 size={40} />
          Private Equity Vault
        </h1>
        <p className="text-sm opacity-70 mt-2">INSTITUTIONAL GRADE ASSETS // ACCREDITED INVESTORS ONLY</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {INVESTMENTS.map((inv) => (
          <div key={inv.id} className="border border-[var(--primary)] bg-black/60 p-8 hover:bg-[var(--primary)]/5 transition-all group relative">
            <div className="absolute top-4 right-4 opacity-30">
              {inv.risk === 'LOW' ? <ShieldCheck size={24} /> : <TrendingUp size={24} />}
            </div>
            
            <div className="text-xs font-bold bg-[var(--primary)] text-black px-2 py-1 w-fit mb-4">{inv.sector}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{inv.name}</h3>
            
            <div className="grid grid-cols-2 gap-4 my-6 text-sm">
              <div>
                <div className="opacity-50">Min Entry</div>
                <div className="text-xl font-bold text-emerald-400">${inv.minEntry.toLocaleString()}</div>
              </div>
              <div>
                <div className="opacity-50">Target ROI</div>
                <div className="text-xl font-bold text-cyan-400">{inv.targetRoi}</div>
              </div>
            </div>

            <button 
              onClick={() => handleInvest(inv)}
              className="w-full py-3 border border-[var(--primary)] text-[var(--primary)] font-bold uppercase tracking-widest hover:bg-[var(--primary)] hover:text-black transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={14} /> Deploy Capital
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquityVault;