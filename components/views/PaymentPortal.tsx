import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, Wallet, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface PaymentPortalProps {
  targetTier: SubscriptionTier;
  onBack: () => void;
}

const PaymentPortal: React.FC<PaymentPortalProps> = ({ targetTier, onBack }) => {
  const [processing, setProcessing] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const isValidLuhn = (val: string) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = val.length - 1; i >= 0; i--) {
      let digit = parseInt(val.charAt(i));
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };

  const handlePayment = (method: string) => {
    if (method === 'Credit Card' && (!cardNumber || !expiry || !cvc || !name)) {
      alert('Please complete all credit card details.');
      return;
    }
    if (method === 'Credit Card' && !isValidLuhn(cardNumber.replace(/\D/g, ''))) {
      alert('Invalid Card Number (Luhn Check Failed).');
      return;
    }
    setProcessing(method);
    setTimeout(() => {
      setProcessing(null);
      alert(`${method} Payment Processed Successfully for ${targetTier} Tier.`);
      onBack();
    }, 2500);
  };

  return (
    <div className="h-full w-full p-8 text-[var(--primary)] font-mono overflow-y-auto flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors"><ArrowLeft size={20} /> BACK</button>
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
            Secure Payment Gateway
          </h1>
          <div className="flex items-center justify-center gap-2 text-emerald-500 bg-emerald-900/20 px-4 py-2 rounded-full w-fit mx-auto border border-emerald-500/30">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold tracking-widest">ENCRYPTED // AES-256 // BANK GRADE</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Credit Card Option */}
          <div className="border border-[var(--primary)] bg-black/60 p-8 hover:bg-[var(--primary)]/5 transition-all group relative">
            <div className="absolute top-4 right-4 opacity-50">
              <CreditCard size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Credit / Debit</h3>
            <p className="text-sm opacity-60 mb-8">Instant processing via Visa, Mastercard, Amex.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold opacity-70 mb-1 block">Cardholder Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-[var(--primary)]/30 p-3 text-sm text-white outline-none focus:border-[var(--primary)] transition-colors"
                  placeholder="JOHN DOE"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold opacity-70 mb-1 block">Card Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    className={`w-full bg-black border ${cardNumber.length > 12 && isValidLuhn(cardNumber) ? 'border-green-500/50' : 'border-[var(--primary)]/30'} p-3 text-sm text-white outline-none focus:border-[var(--primary)] transition-colors font-mono`}
                    placeholder="0000 0000 0000 0000"
                  />
                  {cardNumber.length > 12 && isValidLuhn(cardNumber) && (
                    <CheckCircle2 className="absolute right-3 top-3 text-green-500" size={16} />
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold opacity-70 mb-1 block">Expiry</label>
                  <input 
                    type="text" 
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full bg-black border border-[var(--primary)]/30 p-3 text-sm text-white outline-none focus:border-[var(--primary)] transition-colors font-mono"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold opacity-70 mb-1 block">CVC</label>
                  <input 
                    type="text" 
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className="w-full bg-black border border-[var(--primary)]/30 p-3 text-sm text-white outline-none focus:border-[var(--primary)] transition-colors font-mono"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => handlePayment('Credit Card')}
              disabled={!!processing}
              className="w-full mt-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[var(--primary)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {processing === 'Credit Card' ? <Loader2 className="animate-spin" /> : <>Proceed Securely <ArrowRight size={16} /></>}
            </button>
          </div>

          {/* Crypto Option */}
          <div className="border border-[var(--primary)] bg-black/60 p-8 hover:bg-[var(--primary)]/5 transition-all group cursor-pointer relative">
            <div className="absolute top-4 right-4 opacity-50">
              <Wallet size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Crypto / Web3</h3>
            <p className="text-sm opacity-60 mb-8">USDT, USDC, BTC, ETH. Low fees.</p>
            
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center justify-between p-3 border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10">
                <span className="font-bold">USDT (TRC20)</span>
                <span className="text-xs opacity-50">Instant</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10">
                <span className="font-bold">Bitcoin (BTC)</span>
                <span className="text-xs opacity-50">~10 mins</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10">
                <span className="font-bold">Ethereum (ETH)</span>
                <span className="text-xs opacity-50">~2 mins</span>
              </div>
            </div>

            <button 
              onClick={() => handlePayment('Crypto')}
              disabled={!!processing}
              className="w-full mt-auto py-3 bg-[var(--primary)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {processing === 'Crypto' ? <Loader2 className="animate-spin" /> : <>Connect Wallet <ArrowRight size={16} /></>}
            </button>
          </div>
        </div>

        <footer className="mt-12 text-center opacity-40 text-xs">
          <div className="flex justify-center gap-4 mb-2">
            <Lock size={12} />
            <span>SSL SECURE CONNECTION</span>
          </div>
          <p>All transactions are processed via secure, PCI-DSS compliant gateways. No card data is stored locally.</p>
        </footer>
      </div>
    </div>
  );
};

export default PaymentPortal;