import React from 'react';
import { PieChart, TrendingUp, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface PortfolioItem {
  id: string;
  name: string;
  value: number;
  roi: string;
  timestamp: number;
}

interface PortfolioProps {
  items: PortfolioItem[];
  onSell: (item: PortfolioItem) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ items, onSell }) => {
  const totalValue = items.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="h-full w-full p-8 text-[var(--primary)] font-mono overflow-y-auto">
      <header className="mb-12 border-b border-[var(--primary)] pb-6">
        <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-4">
          <PieChart size={40} />
          Asset Portfolio
        </h1>
        <p className="text-sm opacity-70 mt-2">ACTIVE POSITIONS // REAL-TIME VALUATION</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-[var(--primary)] bg-black/60 p-6">
          <div className="text-xs opacity-50 uppercase tracking-widest mb-2">Total Asset Value</div>
          <div className="text-3xl font-black text-white">${totalValue.toLocaleString()}</div>
        </div>
        <div className="border border-[var(--primary)] bg-black/60 p-6">
          <div className="text-xs opacity-50 uppercase tracking-widest mb-2">Active Positions</div>
          <div className="text-3xl font-black text-cyan-400">{items.length}</div>
        </div>
        <div className="border border-[var(--primary)] bg-black/60 p-6">
          <div className="text-xs opacity-50 uppercase tracking-widest mb-2">Proj. Yield (APY)</div>
          <div className="text-3xl font-black text-emerald-400">~18.4%</div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
        <TrendingUp size={20} /> Holdings
      </h3>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center opacity-50 py-12 border border-dashed border-[var(--primary)]">
            NO ASSETS DEPLOYED. VISIT EQUITY VAULT.
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center justify-between border border-[var(--primary)]/50 bg-black/40 p-6 hover:bg-[var(--primary)]/10 transition-all">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="bg-[var(--primary)]/20 p-3 rounded-full">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{item.name}</h4>
                  <div className="text-xs opacity-60 flex gap-2">
                    <span>ID: {item.id}</span>
                    <span>•</span>
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8 text-right">
                <div>
                  <div className="text-xs opacity-50 uppercase">Value</div>
                  <div className="font-bold text-xl">${item.value.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs opacity-50 uppercase">Target ROI</div>
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    {item.roi} <ArrowUpRight size={14} />
                  </div>
                </div>
                <button 
                  onClick={() => onSell(item)}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  LIQUIDATE
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Portfolio;