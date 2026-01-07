import React from 'react';
import { CreditCard, ShieldCheck, Lock, Wallet, ArrowRight } from 'lucide-react';

const PaymentPortal: React.FC = () => {
  return (
    <div className="h-full w-full p-8 text-[var(--primary)] font-mono overflow-y-auto flex flex-col items-center">
      <div className="max-w-4xl w-full">
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
          <div className="border border-[var(--primary)] bg-black/60 p-8 hover:bg-[var(--primary)]/5 transition-all group cursor-pointer relative">
            <div className="absolute top-4 right-4 opacity-50">
              <CreditCard size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Credit / Debit</h3>
            <p className="text-sm opacity-60 mb-8">Instant processing via Visa, Mastercard, Amex.</p>
            
            <div className="space-y-4">
              <div className="bg-black border border-[var(--primary)]/30 p-3 text-sm opacity-50">
                **** **** **** 4242
              </div>
              <div className="flex gap-4">
                <div className="bg-black border border-[var(--primary)]/30 p-3 text-sm opacity-50 flex-1">
                  MM/YY
                </div>
                <div className="bg-black border border-[var(--primary)]/30 p-3 text-sm opacity-50 flex-1">
                  CVC
                </div>
              </div>
            </div>
            
            <button className="w-full mt-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[var(--primary)] transition-colors flex items-center justify-center gap-2">
              Proceed Securely <ArrowRight size={16} />
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

            <button className="w-full mt-auto py-3 bg-[var(--primary)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
              Connect Wallet <ArrowRight size={16} />
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