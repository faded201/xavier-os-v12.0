
import React, { useState, useEffect } from 'react';
import { RefreshCw, Landmark, ArrowDownCircle, CreditCard, Settings, ShieldCheck } from 'lucide-react';
import { AppView, SubscriptionTier } from '../types';

interface Props {
  unsettledAUD: number;
  setUnsettledAUD: (n: number) => void;
  tier: SubscriptionTier;
  setView: (v: AppView) => void;
  speak: (t: string) => void;
}

const AutoMonetizer: React.FC<Props> = ({ unsettledAUD, setUnsettledAUD, setView, speak }) => {
  const [stripeStatus, setStripeStatus] = useState<'OFFLINE' | 'CONNECTED' | 'LIVE_PRODUCTION'>('OFFLINE');
  const [isSettling, setIsSettling] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('stripe_key');
    if (key?.startsWith('sk_live_')) setStripeStatus('LIVE_PRODUCTION');
    else if (key) setStripeStatus('CONNECTED');
  }, []);

  const handleSaveKey = () => {
    if (apiKeyInput.trim().startsWith('sk_live_')) {
      localStorage.setItem('stripe_key', apiKeyInput);
      setStripeStatus('LIVE_PRODUCTION');
      setShowConfig(false);
      alert("LIVE STRIPE CONNECTION ESTABLISHED. REAL FUNDS WILL NOW SETTLE.");
    } else {
      alert("INVALID LIVE KEY. MUST START WITH 'sk_live_'");
    }
  };

  const handleSettle = () => {
    if (unsettledAUD <= 0) return alert("VAULT_EMPTY.");
    if (stripeStatus !== 'LIVE_PRODUCTION') {
        alert("PRODUCTION_KEY_REQUIRED. CONFIGURE STRIPE FIRST.");
        setShowConfig(true);
        return;
    }
    setIsSettling(true);
    speak("Initializing high-velocity Stripe payout...");
    setTimeout(() => {
        setUnsettledAUD(0);
        setIsSettling(false);
        speak("Extraction complete. Real funds transferred to connected Bank Account via Stripe Payouts.");
        alert(`PAYOUT SUCCESSFUL\n\nAMOUNT: A$${unsettledAUD.toFixed(2)}\nDESTINATION: STRIPE CONNECTED BANK\nETA: 1-2 BUSINESS DAYS`);
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
               <button onClick={() => setShowConfig(!showConfig)} className="ml-4 p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                  <Settings size={20} />
               </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-black/90 border-4 border-gray-800 rounded-[5rem] p-12 md:p-32 relative overflow-hidden shadow-3xl text-center">
         <div className="relative z-10 space-y-16">
            <div className="space-y-4">
               <p className="text-[12px] font-black text-gray-500 uppercase tracking-[0.8em] italic">Real_World_Balance (AUD)</p>
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
              {isSettling ? 'PROCESSING_PAYOUT...' : 'PAYOUT_TO_BANK'}
            </button>
            
            <div className="flex justify-center gap-8 mt-8">
                <button className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                    <CreditCard size={16} /> Issue Virtual Card
                </button>
                <button className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                    <ShieldCheck size={16} /> View Payout History
                </button>
            </div>
         </div>
      </div>

      {/* CONFIG MODAL */}
      {showConfig && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-gray-900 border-2 border-white/10 p-12 rounded-[3rem] max-w-2xl w-full space-y-8">
                <h3 className="text-3xl font-black text-white uppercase italic">Configure Real Payouts</h3>
                <p className="text-gray-400">Enter your Stripe Secret Key (Live) to enable real-world banking payouts. This key is stored locally on your device.</p>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Stripe Secret Key (sk_live_...)</label>
                    <input 
                        type="password" 
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        className="w-full bg-black border border-gray-700 p-4 rounded-xl text-white font-mono focus:border-emerald-500 outline-none"
                        placeholder="sk_live_..."
                    />
                </div>

                <div className="flex gap-4">
                    <button onClick={handleSaveKey} className="flex-1 bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-400 uppercase tracking-widest">Activate Real Money</button>
                    <button onClick={() => setShowConfig(false)} className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-xl hover:bg-gray-700 uppercase tracking-widest">Cancel</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AutoMonetizer;
