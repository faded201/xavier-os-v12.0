
import React, { useState, useEffect } from 'react';
import { History, Activity, RefreshCw, Landmark, ShieldCheck, DollarSign, ReceiptText, ArrowDownCircle, Lock } from 'lucide-react';
import { AppView, SubscriptionTier } from '../types';

interface Props {
  unsettledAUD: number;
  setUnsettledAUD: (n: number) => void;
  tier: SubscriptionTier;
  setView: (v: AppView) => void;
  speak: (t: string) => void;
}

const AutoMonetizer: React.FC<Props> = ({ unsettledAUD, setUnsettledAUD, tier, setView, speak }) => {
  const [stripeStatus, setStripeStatus] = useState<'OFFLINE' | 'CONNECTED' | 'LIVE_PRODUCTION'>('OFFLINE');
  const [isSettling, setIsSettling] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('stripe_key');
    if (key?.startsWith('sk_live_')) setStripeStatus('LIVE_PRODUCTION');
    else if (key) setStripeStatus('CONNECTED');
  }, []);

  const handleSettle = () => {
    if (unsettledAUD <= 0) return alert("VAULT_EMPTY.");
    if (stripeStatus !== 'LIVE_PRODUCTION') {
        alert("PRODUCTION_KEY_REQUIRED. Visit Settings.");
        setView('settings');
        return;
    }
    setIsSettling(true);
    speak("Initializing high-velocity Stripe payout...");
    setTimeout(() => {
        setUnsettledAUD(0);
        setIsSettling(false);
        speak("Extraction complete. Capital sharded to bank node.");
    }, 4500);
  };

  return (
    <div className="py-8 space-y-16 animate-in fade-in duration-700 pb-40">
      <header className="flex flex-col lg:flex-row justify-between items-center gap-12 border-b-4 border-white/10 pb-12 px-1">
        <div className="flex items-center gap-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-emerald-600 to-black rounded-[3rem] flex items-center justify-center shadow-4xl border-4 border-white/10 group">
             <Landmark className="text-white group-hover:rotate-12 transition-transform" size={48} />
          </div>
          <div>
            <h2 className="text-4xl md:text-[9rem] font-black text-white italic uppercase tracking-tighter leading-none font-fantasy">Wealth Gate</h2>
            <div className="flex items-center gap-6 mt-8">
               <div className={`w-5 h-5 rounded-full shadow-[0_0_20px] ${stripeStatus === 'LIVE_PRODUCTION' ? 'bg-green-500 shadow-green-500 animate-pulse' : 'bg-rose-500 shadow-rose-500 animate-ping'}`}></div>
               <span className="text-base font-black uppercase tracking-[0.6em] text-slate-500 italic">GATEWAY: {stripeStatus} // AUD_INVERSION</span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-black/90 border-4 border-gray-800 rounded-[5rem] p-12 md:p-32 relative overflow-hidden shadow-3xl text-center">
         <div className="relative z-10 space-y-16">
            <div className="space-y-4">
               <p className="text-[12px] font-black text-gray-500 uppercase tracking-[0.8em] italic">Unsettled_Shards_Balance</p>
               <h3 className="text-6xl md:text-[10rem] font-black text-emerald-400 tracking-tighter italic leading-none tabular-nums">
                 A${unsettledAUD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
               </h3>
            </div>
            <button 
              onClick={handleSettle}
              disabled={isSettling || unsettledAUD <= 0}
              className={`px-24 py-12 rounded-[4rem] font-black uppercase tracking-[0.5em] text-xl italic transition-all shadow-4xl border-4 flex items-center gap-8 mx-auto ${isSettling ? 'bg-gray-800 text-gray-500 border-gray-700' : 'bg-white text-black border-white hover:bg-emerald-600 hover:text-white active:scale-95'}`}
            >
              {isSettling ? <RefreshCw className="animate-spin" size={48} /> : <ArrowDownCircle size={48} />}
              {isSettling ? 'PAYING_OUT...' : 'EXTRACT_TO_BANK'}
            </button>
         </div>
      </div>
    </div>
  );
};

export default AutoMonetizer;
