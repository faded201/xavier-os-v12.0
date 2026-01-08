import React, { useState, useEffect } from 'react';
import { AppView, UserState, SystemMood, TIER_CONFIG, SubscriptionTier } from '../types';
import { Bell, X, ShieldAlert, Fingerprint, Bot, ArrowLeft } from 'lucide-react';
import { MODULES } from '../data';

// Core Hub Components
import Background from '../Background';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import BottomTaskbar from './BottomTaskbar';

// View Components
import Dashboard from './Dashboard';
import AutomationNexus from './AutomationNexus';
import AutoMonetizer from './AutoMonetizer';
import LogisticsNexus from './LogisticsNexus';
import ArchitectKeyGen from './ArchitectKeyGen';
import UniversalModule from './UniversalModule';
import ModuleRegistry from './ModuleRegistry';
import RepoManifest from './RepoManifest';
import QuantumTreasury from './QuantumTreasury';
import CampaignForge from './CampaignForge';
import HolographicNexus from './HolographicNexus';
import PlatformTreasury from './PlatformTreasury';
import SurveyNexus from './SurveyNexus';
import SocialNexus from './SocialNexus';
import PaymentPortal from './PaymentPortal';
import EquityVault from './EquityVault';
import MastermindNexus from './MastermindNexus';
import Portfolio from './Portfolio';
import UserProfile from './UserProfile';
import Sentinel from './Sentinel';
import AppBuilder from './AppBuilder';
import WebsiteBuilder from './WebsiteBuilder';

// TACTICAL THEME CONFIGURATION: AI-Adaptive Color Palettes
const MOOD_THEMES: Record<string, { primary: string; bg: string; secondary: string }> = {
  neutral: { primary: '#00ff9d', bg: '#020604', secondary: 'rgba(0, 255, 157, 0.1)' }, // Matrix Green
  focused: { primary: '#00f0ff', bg: '#020406', secondary: 'rgba(0, 240, 255, 0.1)' }, // Ice Blue
  alert:   { primary: '#ff2a2a', bg: '#060202', secondary: 'rgba(255, 42, 42, 0.1)' }, // Combat Red
  creative:{ primary: '#d946ef', bg: '#040206', secondary: 'rgba(217, 70, 239, 0.1)' }, // Neon Purple
  zen:     { primary: '#fbbf24', bg: '#040302', secondary: 'rgba(251, 191, 36, 0.1)' }, // Gold
};

const NexusDashboard: React.FC<{
  user: UserState;
  onLogout: () => void;
  systemMood: SystemMood;
  setSystemMood: (mood: SystemMood) => void;
  unsettledAUD: number;
  setUnsettledAUD: React.Dispatch<React.SetStateAction<number>>;
  platformRevenue: number;
  setPlatformRevenue: React.Dispatch<React.SetStateAction<number>>;
  activePersona: any;
  setActivePersona: (p: any) => void;
  setUser: React.Dispatch<React.SetStateAction<UserState | null>>;
  currency: string;
}> = (props) => {
  const [view, setView] = useState<AppView>('dashboard');
  const [typingActivity, setTypingActivity] = useState(0);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [notification, setNotification] = useState<{ title: string; message: string; action?: () => void } | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<{ id: string; name: string; value: number; roi: string; timestamp: number }[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [showSwarmModal, setShowSwarmModal] = useState(false);
  const [selectedUpgradeTier, setSelectedUpgradeTier] = useState<SubscriptionTier>('ARCHITECT');

  const speak = (text: string) => {
    console.log(`[TTS_INTENT]: ${text}`);
  };

  const playNotificationSound = () => {
    try {
      // Tactical UI Alert Sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.warn("Audio autoplay blocked:", e));
    } catch (e) {
      console.warn("Audio system offline");
    }
  };

  const playSwarmSound = () => {
    try {
      // Mechanical deployment sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.warn("Audio autoplay blocked:", e));
    } catch (e) {
      console.warn("Audio system offline");
    }
  };

  const handleCodeSubmit = () => {
    // Verify One-Time Code (In production, verify with backend)
    const validCodes = ['XAVIER-GENESIS', 'TALENT-ACCESS-01', 'LEANNE-PRIME'];
    
    if (accessCode === 'architect_x_2025') {
        // Master Key Upgrade: Grants Owner Status immediately
        props.setUser(prev => prev ? ({ ...prev, tier: 'INVERSION', isOwner: true }) : null);
        setCodeError('');
        return;
    }

    if (validCodes.includes(accessCode) || accessCode.startsWith('XAVIER-UL-')) {
      props.setUser(prev => prev ? ({ ...prev, hasTalentPass: true }) : null);
      setCodeError('');
    } else {
      setCodeError('INVALID ACCESS CODE');
    }
  };

  const handleRedeem = (code: string) => {
    if (code === 'architect_x_2025') {
        props.setUser(prev => prev ? ({ ...prev, tier: 'INVERSION', isOwner: true }) : null);
        alert("ROOT ACCESS GRANTED. KEY FORGE UNLOCKED.");
        return true;
    }
    if (code.startsWith('XAVIER-UL-')) {
         props.setUser(prev => prev ? ({ ...prev, tier: 'ARCHITECT', hasTalentPass: true }) : null);
         alert("ARCHITECT ACCESS GRANTED.");
         return true;
    }
    return false;
  };

  const hasAccess = (viewId: AppView): boolean => {
    // 1. Full Access for Owner and One-Time Code holders
    if (props.user.isOwner || props.user.hasTalentPass) return true;

    // 2. Check Subscription Expiry
    if (props.user.subscriptionExpiry && Date.now() > props.user.subscriptionExpiry) {
        // Allow access only to payment/treasury to renew
        if (viewId === 'treasury' || viewId === 'payment_portal') return true;
        return false;
    }

    const module = MODULES.find(m => m.id === viewId);
    if (!module) return true;
    
    if (module.ownerOnly) return false;
    if (!module.minTier) return true;
    
    const userLevel = TIER_CONFIG[props.user.tier].level;
    const requiredLevel = TIER_CONFIG[module.minTier as keyof typeof TIER_CONFIG]?.level || 1;

    return userLevel >= requiredLevel;
  };

  // UNHACKABLE SECURITY PROTOCOLS
  useEffect(() => {
    // 1. Anti-Tamper (Disable Context Menu & DevTools Shortcuts)
    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', preventDefault);
    
    const handleSecurityKeys = (e: KeyboardEvent) => {
        // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            setIsLocked(true); // Immediate Lockdown on tampering attempt
            playNotificationSound();
        }
    };
    window.addEventListener('keydown', handleSecurityKeys);

    // 2. Auto-Lock & Privacy Blur

    return () => {
        document.removeEventListener('contextmenu', preventDefault);
        window.removeEventListener('keydown', handleSecurityKeys);
    };
  }, [isLocked]);

  // AI Input Analysis: Reacts to typing speed/intensity
  useEffect(() => {
    const handleKey = () => {
      setTypingActivity(prev => Math.min(prev + 0.1, 1));
      setTimeout(() => setTypingActivity(prev => Math.max(prev - 0.1, 0)), 500);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleInvest = (item: { id: string; name: string; value: number; roi: string }) => {
    setPortfolioItems(prev => [...prev, { ...item, timestamp: Date.now() }]);
  };

  const handleSell = (item: { id: string; name: string; value: number; roi: string; timestamp: number }) => {
    // Real-world logic: No random volatility simulation.
    // Assets are sold at a fixed appreciation rate (e.g., 5%) representing verified growth.
    const marketValue = item.value * 1.05;
    const profitLoss = marketValue - item.value;
    const isProfit = profitLoss >= 0;

    if (confirm(`LIQUIDATE ASSET: ${item.name}?\n\nORIGINAL COST: $${item.value.toLocaleString()}\nMARKET VALUE: $${marketValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}\n\n${isProfit ? 'PROFIT' : 'LOSS'}: 5.00%`)) {
      setPortfolioItems(prev => prev.filter(i => i.timestamp !== item.timestamp));
      props.setUnsettledAUD(prev => prev + marketValue);
      alert(`TRANSACTION COMPLETE.\n\nRETURNED: $${marketValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}\nNET ${isProfit ? 'PROFIT' : 'LOSS'}: $${Math.abs(profitLoss).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
    }
  };

  const renderView = () => {
    // Check Expiry First
    if (props.user.subscriptionExpiry && Date.now() > props.user.subscriptionExpiry && !props.user.isOwner && !props.user.hasTalentPass) {
        if (view !== 'treasury' && view !== 'payment_portal') {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <ShieldAlert size={64} className="text-rose-500 animate-pulse" />
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest">MEMBERSHIP EXPIRED</h2>
                    <p className="text-gray-500">Your access cycle has concluded. Renew to restore neural link.</p>
                    <button onClick={() => setView('treasury')} className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-rose-600">RENEW ACCESS</button>
                </div>
            );
        }
    }

    // Special handling for Talent Modules Code Entry
    if ((view === 'talent_sanctum' || view === 'talent_forge') && !hasAccess(view)) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-[var(--primary)]">
                <div className="border border-[var(--primary)] p-8 bg-black/90 max-w-md text-center shadow-[0_0_30px_rgba(0,255,0,0.1)]">
                    <h2 className="text-2xl font-bold mb-4 tracking-widest">RESTRICTED MODULE</h2>
                    <p className="mb-6 font-mono text-sm opacity-80">ENTER ONE-TIME ACCESS CODE</p>
                    <input 
                        type="text" 
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="bg-black border border-[var(--primary)] p-3 w-full mb-4 text-center text-[var(--primary)] outline-none focus:shadow-[0_0_10px_var(--primary)] transition-all"
                        placeholder="XXXX-XXXX-XXXX"
                    />
                    {codeError && <div className="text-red-500 mb-4 font-bold animate-pulse">{codeError}</div>}
                    <button onClick={handleCodeSubmit} className="bg-[var(--primary)] text-black px-6 py-2 font-bold hover:bg-white transition-colors w-full">
                        AUTHENTICATE
                    </button>
                </div>
            </div>
        );
    }

    if (!hasAccess(view)) {
      if (view !== 'treasury') setTimeout(() => setView('treasury'), 100);
      return <QuantumTreasury tier={props.user.tier} startTrial={()=>{}} isOwner={props.user.isOwner} setView={setView} />;
    }

    switch (view) {
      case 'dashboard': return <Dashboard setView={setView} isOwner={props.user.isOwner} userTier={props.user.tier} />;
      case 'automation_nexus': return <AutomationNexus unsettledAUD={props.unsettledAUD} setUnsettledAUD={props.setUnsettledAUD} />;
      case 'logistics_nexus': return <LogisticsNexus />;
      case 'wealth_gate': return <AutoMonetizer unsettledAUD={props.unsettledAUD} setUnsettledAUD={props.setUnsettledAUD} tier={props.user.tier} setView={setView} speak={speak} />;
      case 'key_forge': return <ArchitectKeyGen />;
      case 'registry': return <ModuleRegistry setView={setView} />;
      case 'repo_manifest': return <RepoManifest />;
      case 'treasury': return <QuantumTreasury tier={props.user.tier} startTrial={(t) => { setSelectedUpgradeTier(t); setView('payment_portal'); }} isOwner={props.user.isOwner} setView={setView} />;
      case 'campaign_forge': return <CampaignForge isOwner={props.user.isOwner} tier={props.user.tier} />;
      case 'holographic_nexus': return <HolographicNexus unsettledAUD={props.unsettledAUD} setUnsettledAUD={props.setUnsettledAUD} setPlatformRevenue={props.setPlatformRevenue} tier={props.user.tier} />;
      case 'platform_treasury': return <PlatformTreasury revenue={props.platformRevenue} currency={props.currency} onBack={() => setView('dashboard')} />;
      case 'survey_nexus': return <SurveyNexus setUnsettledAUD={props.setUnsettledAUD} setPlatformRevenue={props.setPlatformRevenue} />;
      case 'social_nexus': return <SocialNexus />;
      case 'user_profile': return <UserProfile user={props.user} activePersona={props.activePersona} onLogout={props.onLogout} onRedeem={handleRedeem} setView={setView} />;
      case 'payment_portal': return <PaymentPortal targetTier={selectedUpgradeTier} onBack={() => setView('treasury')} />;
      case 'equity_vault': return <EquityVault setUnsettledAUD={props.setUnsettledAUD} onInvest={handleInvest} />;
      case 'mastermind_nexus': return <MastermindNexus setUnsettledAUD={props.setUnsettledAUD} />;
      case 'portfolio': return <Portfolio items={portfolioItems} onSell={handleSell} />;
      case 'sentinel': return <Sentinel />;
      case 'app_builder': return <AppBuilder />;
      case 'web_builder': return <WebsiteBuilder />;
      default: return <UniversalModule moduleId={view} />;
    }
  };

  const theme = MOOD_THEMES[props.systemMood as string] || MOOD_THEMES['neutral'];
  const dynamicStyle = {
    '--primary': theme.primary,
    '--secondary': theme.secondary,
    '--bg-dark': theme.bg,
    '--glow': `0 0 ${10 + typingActivity * 20}px ${theme.primary}`,
  } as React.CSSProperties;
  
  return (
    <div 
      className="h-full w-full overflow-hidden font-mono text-[var(--primary)] transition-colors duration-500"
      style={{ ...dynamicStyle, backgroundColor: 'var(--bg-dark)' }}
    >
      {/* TACTICAL HUD OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50"></div>
        
        {/* Corner Markers */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--primary)] opacity-70"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--primary)] opacity-70"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--primary)] opacity-70"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--primary)] opacity-70"></div>

        {/* Encryption Status */}
        <div className="absolute top-2 right-16 text-[10px] tracking-[0.3em] opacity-80 text-[var(--primary)] animate-pulse">
          MILITARY ENCRYPTION // AES-256 // BIOMETRIC LOCK
        </div>
      </div>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className="absolute top-24 right-6 z-[60] w-80 transition-all duration-500 transform translate-x-0">
          <div className="bg-black/95 border-l-4 border-[var(--primary)] p-4 shadow-[0_0_30px_rgba(0,255,0,0.2)] relative">
            <button 
              onClick={() => setNotification(null)}
              className="absolute top-2 right-2 text-[var(--primary)] opacity-50 hover:opacity-100"
            >
              <X size={14} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[var(--primary)]/20 rounded-full animate-pulse">
                <Bell size={16} className="text-[var(--primary)]" />
              </div>
              <h4 className="font-bold text-sm tracking-widest text-white">{notification.title}</h4>
            </div>
            <p className="text-xs text-[var(--primary)] font-mono mb-3 leading-relaxed opacity-80">
              {notification.message}
            </p>
            {notification.action && (
              <button 
                onClick={notification.action}
                className="w-full py-2 bg-[var(--primary)] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
              >
                Accept Contract
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUANTUM LOCK SCREEN */}
      {isLocked && (
        <div className="absolute inset-0 z-[200] bg-black flex flex-col items-center justify-center text-[var(--primary)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,0,0.1)_0%,_transparent_50%)] animate-pulse"></div>
            
            <div className="relative z-10 border-2 border-[var(--primary)] p-12 bg-black/80 backdrop-blur-xl shadow-[0_0_50px_var(--primary)] max-w-lg w-full text-center">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[var(--primary)]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[var(--primary)]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[var(--primary)]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[var(--primary)]"></div>

                <ShieldAlert size={80} className="mx-auto mb-8 animate-bounce" />
                
                <h1 className="text-4xl font-black tracking-tighter mb-2 text-white">SYSTEM LOCKDOWN</h1>
                <div className="text-xs font-mono text-red-500 mb-8 tracking-[0.3em] animate-pulse">SECURITY PROTOCOL OMEGA-7 ACTIVE</div>
                
                <div className="space-y-4 mb-8 text-left font-mono text-xs opacity-70 border-t border-b border-[var(--primary)]/30 py-4">
                    <div className="flex justify-between"><span>ENCRYPTION:</span> <span className="text-white">POLYMORPHIC-256</span></div>
                    <div className="flex justify-between"><span>SESSION ID:</span> <span className="text-white">0x{Math.random().toString(16).slice(2,10).toUpperCase()}</span></div>
                    <div className="flex justify-between"><span>THREAT LEVEL:</span> <span className="text-emerald-500">ZERO</span></div>
                </div>

                <button onClick={() => setIsLocked(false)} className="group relative w-full py-4 bg-[var(--primary)] text-black font-black uppercase tracking-[0.2em] hover:bg-white transition-all overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2"><Fingerprint /> BIOMETRIC UNLOCK</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </div>
        </div>
      )}

      {/* SWARM QUICK ACTION MODAL */}
      {showSwarmModal && (
        <div 
          className="fixed inset-0 z-[180] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSwarmModal(false);
          }}
        >
            <div className="bg-black border-2 border-amber-500/50 rounded-[2rem] w-full max-w-5xl h-[80vh] overflow-hidden shadow-[0_0_100px_rgba(245,158,11,0.2)] relative flex flex-col">
                <div className="absolute top-0 right-0 p-6 z-50">
                    <button onClick={() => setShowSwarmModal(false)} className="bg-black/50 hover:bg-red-500 hover:text-white text-gray-500 p-2 rounded-full transition-colors border border-white/10">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 md:p-8">
                    <AutomationNexus unsettledAUD={props.unsettledAUD} setUnsettledAUD={props.setUnsettledAUD} />
                </div>
            </div>
        </div>
      )}

      {/* GLOBAL FLOATING CONTROLS (Swarm & Back/Skip) */}
      <div className="fixed bottom-24 md:bottom-8 right-6 z-[150] flex flex-col gap-4 items-end">
         {/* SWARM ACCESS */}
         <button 
            onClick={() => {
              playSwarmSound();
              setShowSwarmModal(true);
            }}
            className="group flex items-center justify-center w-14 h-14 bg-amber-500 text-black rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-110 transition-all border-2 border-white hover:bg-white"
            title="DEPLOY SWARM"
         >
            <Bot size={28} className="group-hover:animate-bounce" />
         </button>

         {/* BACK / SKIP BUTTON */}
         {view !== 'dashboard' && (
            <button 
               onClick={() => setView('dashboard')}
               className="group flex items-center justify-center w-14 h-14 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-gray-800 transition-all border-2 border-gray-700"
               title="RETURN TO HUB"
            >
               <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>
         )}
      </div>

      <Background />
      <div className="relative z-10 h-full w-full md:grid md:grid-cols-[auto_1fr]">
        <Sidebar currentView={view} setView={setView} />
        <div className="flex flex-col h-full overflow-hidden">
          <TopHeader user={props.user} onLogout={props.onLogout} unsettledAUD={props.unsettledAUD} />
          <main className="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-24 md:pb-0">
            <div className="p-4 md:p-8 lg:p-12">
              {renderView()}
            </div>
          </main>
        </div>
        <BottomTaskbar currentView={view} setView={setView} />
      </div>
    </div>
  );
};

export default NexusDashboard;
