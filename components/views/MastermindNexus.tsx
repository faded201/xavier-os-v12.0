import React from 'react';
import { Users, Crown, MessageCircle, Globe } from 'lucide-react';

interface Circle {
  id: string;
  name: string;
  members: number;
  fee: number;
  focus: string;
}

const CIRCLES: Circle[] = [
  { id: 'M1', name: 'The 1% Club', members: 450, fee: 5000, focus: 'Global Macro Economics' },
  { id: 'M2', name: 'Whale Signal Alpha', members: 120, fee: 2500, focus: 'High-Cap Crypto Moves' },
  { id: 'M3', name: 'SaaS Exit Founders', members: 85, fee: 1500, focus: 'Tech M&A Strategies' },
];

interface MastermindNexusProps {
  setUnsettledAUD: React.Dispatch<React.SetStateAction<number>>;
}

const MastermindNexus: React.FC<MastermindNexusProps> = ({ setUnsettledAUD }) => {
  const handleJoin = (circle: Circle) => {
    if (confirm(`JOIN EXCLUSIVE CIRCLE: ${circle.name}?\nINITIATION FEE: $${circle.fee.toLocaleString()}`)) {
      setUnsettledAUD(prev => prev - circle.fee);
      alert(`ACCESS GRANTED.\nWELCOME TO ${circle.name}.`);
    }
  };

  return (
    <div className="h-full w-full p-8 text-[var(--primary)] font-mono overflow-y-auto">
      <header className="mb-12 text-center">
        <div className="inline-block p-4 border-2 border-[var(--primary)] rounded-full mb-4">
          <Crown size={48} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-2 text-white">Mastermind Nexus</h1>
        <p className="text-lg opacity-70">ELITE NETWORKING // HIGH-LEVEL INTEL SHARING</p>
      </header>

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {CIRCLES.map((circle) => (
          <div key={circle.id} className="flex flex-col md:flex-row items-center justify-between border border-[var(--primary)] bg-black/60 p-8 hover:border-white transition-all">
            <div className="flex items-center gap-6 mb-6 md:mb-0">
              <div className="bg-[var(--primary)]/10 p-4 rounded-full">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{circle.name}</h3>
                <div className="flex items-center gap-4 text-sm opacity-70 mt-1">
                  <span className="flex items-center gap-1"><Globe size={12} /> {circle.members} Members</span>
                  <span className="flex items-center gap-1"><MessageCircle size={12} /> {circle.focus}</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-xs opacity-50 uppercase tracking-widest mb-1">Initiation Fee</div>
              <div className="text-3xl font-black text-emerald-400 mb-4">${circle.fee.toLocaleString()}</div>
              <button 
                onClick={() => handleJoin(circle)}
                className="px-8 py-2 bg-[var(--primary)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Request Access
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MastermindNexus;