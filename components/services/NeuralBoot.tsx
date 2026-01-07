import React, { useState, useEffect, useRef } from 'react';
import { Crown, Activity } from 'lucide-react';

const NeuralBoot: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING_KERNEL_v10.0');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounting = useRef(true);

  useEffect(() => {
    mounting.current = true;
    
    const steps = [
      { p: 15, s: 'Manifesting_Nexus_Cores...' },
      { p: 35, s: 'Handshaking_Sector_Zurich...' },
      { p: 55, s: 'Decomposing_Lattice_Shards...' },
      { p: 75, s: 'AES-1024_Link_Stabilized...' },
      { p: 92, s: 'Synthesizing_Aether_Layer...' },
      { p: 100, s: 'ACCESS_GRANTED_BY_ARCHITECT' },
    ];

    let stepIndex = 0;

    const processNextStep = () => {
      if (!mounting.current) return;

      if (stepIndex < steps.length) {
        const currentStep = steps[stepIndex];
        setProgress(currentStep.p);
        setStatus(currentStep.s);
        stepIndex++;
        
        const baseDelay = stepIndex === 1 ? 400 : 700;
        const jitter = Math.random() * 300;
        
        timeoutRef.current = setTimeout(processNextStep, baseDelay + jitter);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (mounting.current) onComplete();
        }, 1000);
      }
    };

    timeoutRef.current = setTimeout(processNextStep, 300);

    return () => {
      mounting.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-12 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative mb-24 scale-110">
        <div className="absolute inset-[-80px] bg-amber-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="w-64 h-64 bg-black rounded-full flex items-center justify-center border-[10px] border-amber-500/20 relative z-10 shadow-[0_0_100px_rgba(234,179,8,0.2)]">
          <div className="absolute inset-2 border-[2px] border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-8 border-[1px] border-dashed border-amber-500/20 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
          
          <div className="relative z-20 flex flex-col items-center gap-3">
             <Crown className="text-amber-500 fill-current drop-shadow-[0_0_20px_rgba(234,179,8,0.6)]" size={70} />
             <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.8em] italic animate-pulse">Xavier v10.0</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl space-y-12 relative z-10 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-6 text-amber-500 font-black uppercase tracking-[0.6em] text-[11px] italic min-h-[1.5rem]">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
            {status}
          </div>
        </div>

        <div className="relative pt-4 px-12">
           <div className="h-1.5 w-full bg-white/[0.03] rounded-full border border-white/5 p-0.5 overflow-hidden shadow-inner">
             <div 
               className="h-full bg-amber-500 transition-all duration-700 ease-out shadow-[0_0_20px_rgba(234,179,8,0.5)]"
               style={{ width: `${progress}%` }}
             />
           </div>
           <div className="absolute top-[-30px] right-12 text-amber-500 font-black italic text-sm tabular-nums tracking-widest">
              {progress}%
           </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralBoot;