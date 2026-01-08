
import React, { useState } from 'react';
import { Landmark, Star, Swords, Globe, CheckCircle2, Crown, User } from 'lucide-react';
import { SubscriptionTier, TIER_CONFIG } from '../types';

interface Props {
  tier: SubscriptionTier;
  startTrial: (tier: SubscriptionTier) => void;
  isOwner: boolean;
  setView: (v: any) => void;
}

const QuantumTreasury: React.FC<Props> = ({ tier, isOwner, startTrial }) => {
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const tiers = [
    { id: 'SOVEREIGN', name: 'Sovereign', icon: Globe },
    { id: 'OPERATIVE', name: 'Operative', icon: User, popular: true },
    { id: 'ARCHITECT', name: 'Architect', icon: Star },
    { id: 'MAGISTRATE', name: 'Magistrate', icon: Swords },
  ];

  const currentTierLevel = TIER_CONFIG[tier].level;

  return (
    <div className="py-8 space-y-16 animate-in fade-in duration-1000 pb-40 px-1">
      <header className="flex flex-col lg:flex-row justify-between items-start gap-12 w-full">
        <div className="space-y-6">
          <div className="flex items-center gap-10">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-black rounded-[3rem] flex items-center justify-center shadow-4xl border-4 border-white/10 group">
              <Landmark className="text-white group-hover:rotate-12 transition-transform" size={48} />
            </div>
            <div>
              <h2 className="text-4xl md:text-[9rem] font-black text-white tracking-tighter uppercase italic leading-none font-fantasy text-center md:text-left">Treasury</h2>
              <div className="flex items-center gap-6 mt-12 justify-center md:justify-start">
                 <div className="w-5 h-5 rounded-full bg-amber-500 animate-ping"></div>
                 <span className="text-base font-black uppercase tracking-[0.6em] text-amber-400 italic">SYSTEM_LEDGER // CURRENT_TIER: {tier}</span>
              </div>
              
              <div className="flex justify-center md:justify-start gap-4 mt-6">
                <button onClick={() => setBillingCycle('MONTHLY')} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${billingCycle === 'MONTHLY' ? 'bg-white text-black' : 'bg-gray-800 text-gray-500'}`}>Monthly</button>
                <button onClick={() => setBillingCycle('YEARLY')} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${billingCycle === 'YEARLY' ? 'bg-white text-black' : 'bg-gray-800 text-gray-500'}`}>Yearly (Save 20%)</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {tiers.map((t) => {
          const config = TIER_CONFIG[t.id as SubscriptionTier];
          const isCurrent = tier === t.id;
          const isLower = config.level < currentTierLevel;

          return (
            <div key={t.id} className={`bg-gray-900 border-4 ${isCurrent ? TIER_CONFIG[tier].color.replace('text-','border-') : 'border-gray-800'} p-10 rounded-[4rem] flex flex-col justify-between gap-12 transition-all hover:scale-105 shadow-4xl relative overflow-hidden ${isCurrent ? 'scale-105 z-10' : ''}`}>
               {t.popular && !isCurrent && (
                 <div className="absolute top-10 right-[-35px] rotate-45 bg-blue-500 text-white px-12 py-2 text-[9px] font-black uppercase tracking-widest shadow-2xl">
                   Recommended
                 </div>
               )}
               <div className="space-y-8 relative z-10">
                  <div className="flex justify-between items-center">
                      <t.icon size={48} className={config.color} />
                      {isCurrent && <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase italic">Active Tier</span>}
                  </div>
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none font-fantasy">{t.name}</h3>
                  <p className={`text-2xl font-black italic ${config.color}`}>{billingCycle === 'MONTHLY' ? config.price : config.priceYearly}</p>
                  <div className="space-y-4 pt-6 border-t border-white/5">
                     {config.features.map(f => (
                       <div key={f} className="flex items-center gap-3">
                          <CheckCircle2 size={14} className="text-emerald-500" />
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">{f}</span>
                       </div>
                     ))}
                  </div>
               </div>
               <button 
                  disabled={isCurrent || isLower}
                  onClick={() => startTrial(t.id as SubscriptionTier)}
                  className={`w-full py-6 rounded-3xl font-black uppercase italic transition-all active:scale-95 ${isCurrent || isLower ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-none' : 'bg-white text-black border-4 border-white hover:bg-blue-600 hover:text-white hover:border-blue-600'}`}
               >
                  {isCurrent ? 'LVL_SYNCHRONIZED' : isLower ? 'TIER_EXCEEDED' : 'INITIALIZE_UPGRADE'}
               </button>
            </div>
          )
        })}
      </div>

      <div className="bg-black border-4 border-purple-600/30 p-12 rounded-[5rem] shadow-4xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
             <div className="flex items-center gap-10">
                <div className="p-8 bg-purple-600/10 rounded-[2.5rem] border-2 border-purple-500/30 shadow-inner">
                   <Crown size={64} className="text-purple-500 animate-pulse" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none font-fantasy text-center md:text-left">Inversion Prime</h3>
                   <p className="text-sm md:text-xl text-gray-500 font-black uppercase tracking-widest italic text-center md:text-left">ROOT_ARCHITECT_SIGNATURE // FULL_ACCESS_UNLOCKED</p>
                </div>
             </div>
             {isOwner ? (
                <div className="text-center md:text-right space-y-4">
                    <p className="text-2xl font-black text-purple-400 italic">SIGNATURE VERIFIED</p>
                </div>
             ) : (
                <div className="text-center md:text-right space-y-4">
                    <p className="text-2xl font-black text-rose-500 italic">SIGNATURE REQUIRED</p>
                </div>
             )}
          </div>
      </div>
    </div>
  );
};

export default QuantumTreasury;
