import React, { useState, useEffect, useRef } from 'react';
import { Scan, Radio, CreditCard, ArrowLeft, Key } from 'lucide-react';
import { SubscriptionTier } from '../types';
import QuantumTreasury from './QuantumTreasury';

interface LoginPortalProps {
  onAuthenticated: (tier?: SubscriptionTier, hasTalentPass?: boolean) => void;
}

const LoginPortal: React.FC<LoginPortalProps> = ({ onAuthenticated }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [status, setStatus] = useState('AWAITING_FACE_ID');
  const [showMemberships, setShowMemberships] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const hasAuthRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startSecureScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setStatus('ANALYZING_FACIAL_TOPOGRAPHY...');
    
    // Simulate Camera Activation
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(() => console.log("Camera simulation mode active"));
    }
  };
  
  const handleCodeLogin = () => {
    if (accessCode === 'architect_x_2025') {
        onAuthenticated('INVERSION', true); // Master Key -> Owner (Forever)
    } else if (accessCode.startsWith('XAVIER-UL-')) {
        onAuthenticated('ARCHITECT', true); // Generated Key -> Full User Access (Forever)
    } else {
        setCodeError('INVALID_HASH_SIGNATURE');
        setTimeout(() => setCodeError(''), 2000);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => {
        setScanProgress(p => p + 1);
      }, 40);
    } else if (scanProgress >= 100 && !hasAuthRef.current) {
      hasAuthRef.current = true;
      setStatus('SIGNATURE_VERIFIED');
      setTimeout(() => onAuthenticated('SOVEREIGN', false), 1500); // Default to Free Tier (Needs Upgrade)
    }
    return () => clearInterval(interval);
  }, [isScanning, scanProgress, status, onAuthenticated]);

  if (showMemberships) {
    return (
      <div className="w-full h-full bg-black overflow-y-auto animate-in slide-in-from-bottom duration-500">
        <div className="fixed top-4 left-4 z-50">
          <button onClick={() => setShowMemberships(false)} className="flex items-center gap-2 text-white bg-black/50 p-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
            <ArrowLeft size={20} /> <span className="text-xs font-bold">BACK TO LOGIN</span>
          </button>
        </div>
        <div className="pt-20 pb-10">
          <QuantumTreasury 
            tier="OPERATIVE" 
            startTrial={(t) => { alert(`MEMBERSHIP SELECTED: ${t}\nRedirecting to Stripe Secure Gateway...`); setShowMemberships(false); }} 
            isOwner={false} 
            setView={() => {}} 
          />
        </div>
      </div>
    );
  }

  if (showCodeInput) {
      return (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 animate-in fade-in">
              <div className="max-w-md w-full bg-gray-900 border border-white/10 p-8 rounded-2xl text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
                  <h2 className="text-2xl font-black text-white mb-6 tracking-widest italic">ACCESS OVERRIDE</h2>
                  <input 
                    type="text" 
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="ENTER_LICENSE_KEY"
                    className="w-full bg-black border border-gray-700 p-4 rounded-xl text-center text-emerald-500 font-mono text-lg outline-none focus:border-emerald-500 mb-4 uppercase tracking-widest placeholder:text-gray-800"
                  />
                  {codeError && <p className="text-red-500 text-xs font-bold mb-4 animate-pulse">{codeError}</p>}
                  <div className="flex gap-4">
                      <button onClick={() => setShowCodeInput(false)} className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-500 hover:text-white font-bold text-xs tracking-widest">CANCEL</button>
                      <button onClick={handleCodeLogin} className="flex-1 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 text-xs tracking-widest">AUTHENTICATE</button>
                  </div>
              </div>
          </div>
      )
  }

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

          <div className="w-48 h-48 md:w-56 md:h-56 bg-black rounded-full border-4 border-amber-500/20 flex items-center justify-center shadow-[0_0_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
            {isScanning && (
              <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen" />
            )}
            <Scan size={100} className={`relative z-10 transition-colors duration-500 ${isScanning ? 'text-amber-500' : 'text-gray-800 group-hover:text-amber-500/30'}`} />
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
                {scanProgress < 100 ? "Align Face for Biometric Scan" : "Identity Verified"}
            </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button 
              onClick={() => setShowMemberships(true)}
              className="px-8 py-3 bg-gray-900 border border-gray-700 rounded-full flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all group"
            >
              <CreditCard size={16} className="group-hover:scale-110 transition-transform" /> Memberships
            </button>
            <button 
              onClick={() => setShowCodeInput(true)}
              className="px-8 py-3 bg-gray-900 border border-gray-700 rounded-full flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all group"
            >
              <Key size={16} className="group-hover:scale-110 transition-transform" /> Redeem Code
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
