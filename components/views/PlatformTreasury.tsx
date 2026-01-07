import React from 'react';
import { ArrowLeft, TrendingUp, ShieldCheck } from 'lucide-react';

interface PlatformTreasuryProps {
  revenue: number;
  currency: string;
  onBack: () => void;
}

const PlatformTreasury: React.FC<PlatformTreasuryProps> = ({ revenue, currency, onBack }) => {
  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(revenue);

  return (
    <div className="h-full w-full p-8 text-[var(--primary)] font-mono overflow-y-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-8 px-4 py-2 border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors uppercase tracking-widest text-xs"
      >
        <ArrowLeft size={14} /> Return to Nexus
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Revenue Card */}
        <div className="border border-[var(--primary)] bg-black/80 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <TrendingUp size={100} />
          </div>
          <h2 className="text-sm uppercase tracking-[0.3em] opacity-70 mb-2">Total Platform Revenue</h2>
          <div className="text-5xl font-black text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {formattedRevenue}
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-900/20 px-3 py-1 w-fit border border-emerald-500/30">
            <ShieldCheck size={12} />
            <span>SECURE VAULT // AES-256</span>
          </div>
        </div>

        {/* Fee Breakdown Info */}
        <div className="border border-[var(--primary)] bg-black/80 p-8 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-6 uppercase tracking-widest border-b border-[var(--primary)] pb-2">Fee Structure</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="opacity-70">Swarm Intelligence Tax</span>
              <span className="font-bold text-amber-500">20.0%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Holo-Nexus Transaction Fee</span>
              <span className="font-bold text-cyan-500">3.6%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Virtual Shop Commission</span>
              <span className="font-bold text-purple-500">5.0%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transaction Log Placeholder */}
      <div className="mt-8 border border-[var(--primary)] bg-black/80 p-8">
        <h3 className="text-lg font-bold mb-6 uppercase tracking-widest">Recent Inflow Vectors</h3>
        <div className="font-mono text-xs opacity-50 text-center py-12">
          // AWAITING NEW BLOCKS...
        </div>
      </div>
    </div>
  );
};

export default PlatformTreasury;