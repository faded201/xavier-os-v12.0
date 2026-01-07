import React, { useState, useEffect, useRef } from 'react';
import { Fingerprint, Radio, Crown, ShieldAlert } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface LoginPortalProps {
  onAuthenticated: (tier?: SubscriptionTier) => void;
}

const LoginPortal: React.FC<LoginPortalProps> = ({ onAuthenticated }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [status, setStatus] = useState('AWAITING_BIOMETRIC_INPUT');
  const hasAuthRef = useRef(false);

  const startSecureScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setStatus('ANALYZING_BIOMETRIC_SIGNATURE...');
  };
  
  const handlePrimeOverride = () => {
    if (isScanning) return;
    setIsScanning(true);
    setStatus('ARCHITECT_PRIME_SIGNATURE_DETECTED...');
    setScanProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => {
        setScanProgress(p => p + (status.includes('PRIME') ? 2 : 1));
      }, 40);
    } else if (scanProgress >= 100 && !hasAuthRef.current) {
      hasAuthRef.current = true;
      const isPrime = status.includes('PRIME');
      setStatus(isPrime ? 'WELCOME_ARCHITECT' : 'SIGNATURE_VERIFIED');
      setTimeout(() => onAuthenticated(isPrime ? 'INVERSION' : 'SOVEREIGN'), 1500);
    }
    return () => clearInterval(interval);
  }, [isScanning, scanProgress, status, onAuthenticated]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black p-4 font-sans text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent_60%)]"></div>

      <div className="w-full max-w-lg flex flex-col items-center gap-10 animate-in fade-in-5 zoom-in-90 duration-1000">
        <div className="text-center">
           <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter font-fantasy">
             Sovereign OS
           </h1>
           <p className="text-sm font-black uppercase tracking-[0.4em] italic text-amber-500 mt-2">
             AEGIS v12.0
           </p>
        </div>

        <div 
          onClick={startSecureScan}
          className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center cursor-pointer group"
        >
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/10 animate-[spin_30s_linear_infinite]"></div>
          <div className="absolute inset-4 border border-dashed border-amber-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
          <div className={`absolute inset-0 rounded-full bg-amber-500/5 transition-opacity duration-500 ${isScanning ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>

          <div className="w-48 h-48 md:w-56 md:h-56 bg-black rounded-full border-4 border-amber-500/20 flex items-center justify-center shadow-[0_0_80px_rgba(0,0,0,0.9)] relative">
            <Fingerprint size={100} className={`transition-colors duration-500 ${isScanning ? 'text-amber-500' : 'text-gray-800 group-hover:text-amber-500/30'}`} />
          </div>

          <svg className="absolute inset-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)]" viewBox="0 0 100 100">
            <circle 
              className="text-amber-500 stroke-current transition-all duration-500"
              cx="50" cy="50" r="48" fill="transparent" strokeWidth="2"
              strokeDasharray="301.59"
              strokeDashoffset={301.59 * (1 - scanProgress / 100)}
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        
        <div className="w-full max-w-md flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4 text-xl font-black italic uppercase text-amber-500 tracking-widest h-8">
              {isScanning && <Radio className="animate-ping" size={20} />}
              <span>{status}</span>
            </div>
            <p className="text-xs text-gray-700 font-bold uppercase tracking-[0.3em]">
                {scanProgress < 100 ? "Place Biometric Signature to Authenticate" : "Handshake Complete"}
            </p>
        </div>
        <button onClick={handlePrimeOverride} className="absolute -bottom-10 right-0 p-4 bg-purple-600/10 border-2 border-purple-500/20 rounded-full cursor-pointer hover:bg-purple-500/20 group">
          <Crown className="text-purple-500 group-hover:text-white transition-colors" size={24} />
        </button>
      </div>
    </div>
  );
};

export default LoginPortal;
