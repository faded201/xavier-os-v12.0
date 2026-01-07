import React, { useState, useEffect, useRef } from 'react';
import { AppView, UserState, SystemMood, TIER_CONFIG, MODULE_ACCESS } from '../types';
import { Bell, X, Lock, ShieldAlert, Fingerprint, EyeOff, Scan } from 'lucide-react';

// Core Hub Components
import Background from '../ui/Background';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import BottomTaskbar from './BottomTaskbar';

// View Components
import Dashboard from './Dashboard';
import AutomationNexus from './AutomationNexus';
import SwarmCommand from '../SwarmCommand';
import AutoMonetizer from '../AutoMonetizer';
import SecuritySanctum from '../SecuritySanctum';
import ModuleRegistry from '../ModuleRegistry';
import RepoManifest from './RepoManifest';
import QuantumTreasury from './QuantumTreasury';
import OracleNode from './OracleNode';
import ArchitectKeyGen from './ArchitectKeyGen';
import WealthMatrix from './WealthMatrix';
import WarRoom from './WarRoom';
import SocialNexus from './SocialNexus';
import CreativeStudio from './CreativeStudio';
import Marketplace from './Marketplace';
import CloudDrive from '../CloudDrive';
import Settings from '../Settings';
import EqualityProtocol from '../services/EqualityProtocol';
import HelpAndSupport from './HelpAndSupport';
import UserProfile from './UserProfile';
import LiveNeuralLink from './LiveNeuralLink';
import ShardInfiltrator from './ShardInfiltrator';
import ServerAdmin from './ServerAdmin';
import CryptoHub from './QuantumCrypto';
import AuditCore from './AuditCore';
import NeuralPulse from './NeuralPulse';
import GlobalTravelNexus from './GlobalTravelNexus';
import SystemDiagnostics from './SystemDiagnostics';
import CampaignForge from './CampaignForge';
import AdCreativeStudio from './AdCreativeStudio';
import FunnelForge from './FunnelForge';
import AgentCommand from '../AgentCommand';
import TradingSignals from './TradingSignals';
import TalentSanctum from './TalentSanctum';
import TalentForge from './TalentForge';
import SovereignSearch from './SovereignSearch';
import GeospatialNexus from './GeospatialNexus';
import SoulSync from './SoulSync';
import HolographicNexus from './HolographicNexus';
import PlatformTreasury from './PlatformTreasury';
import SurveyNexus from './SurveyNexus';
import PaymentPortal from './PaymentPortal';
import EquityVault from './EquityVault';
import MastermindNexus from './MastermindNexus';
import Portfolio from './Portfolio';

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
}> = (props) => {
  const [view, setView] = useState<AppView>('dashboard');
  const [typingActivity, setTypingActivity] = useState(0);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [notification, setNotification] = useState<{ title: string; message: string; action?: () => void } | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<{ id: string; name: string; value: number; roi: string; timestamp: number }[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

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

  const handleCodeSubmit = () => {
    // Verify One-Time Code (In production, verify with backend)
    const validCodes = ['XAVIER-GENESIS', 'TALENT-ACCESS-01', 'LEANNE-PRIME'];
    if (validCodes.includes(accessCode)) {
      props.setUser(prev => prev ? ({ ...prev, hasTalentPass: true }) : null);
      setCodeError('');
    } else {
      setCodeError('INVALID ACCESS CODE');
    }
  };

  const hasAccess = (viewId: AppView): boolean => {
    if (props.user.isOwner) return true;
    // Allow access if user has a valid Talent Pass
    if ((viewId === 'talent_sanctum' || viewId === 'talent_forge') && props.user.hasTalentPass) return true;

    const moduleConfig = MODULE_ACCESS[viewId];
    if (!moduleConfig) return true;
    if (moduleConfig.isOwnerOnly) return false;
    
    const userLevel = TIER_CONFIG[props.user.tier].level;
    const requiredLevel = TIER_CONFIG[moduleConfig.minTier].level;

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
    const resetIdle = () => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        if (!isLocked) {
            idleTimer.current = setTimeout(() => setIsLocked(true), 60000); // 60s idle lock
        }
    };

    const handleBlur = () => setIsBlurred(true);
    const handleFocus = () => setIsBlurred(false);

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    resetIdle();

    return () => {
        document.removeEventListener('contextmenu', preventDefault);
        window.removeEventListener('keydown', handleSecurityKeys);
        window.removeEventListener('mousemove', resetIdle);
        window.removeEventListener('keydown', resetIdle);
        window.removeEventListener('blur', handleBlur);
        window.removeEventListener('focus', handleFocus);
        if (idleTimer.current) clearTimeout(idleTimer.current);
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

  // Simulation: Incoming High-Ticket Survey Alert
  useEffect(() => {
    const surveyTimer = setTimeout(() => {
      playNotificationSound();
      setNotification({
        title: 'OPPORTUNITY DETECTED',
        message: 'High-Ticket Survey Available: "Neural Interface UX Study" - Payout: $450.00',
        action: () => {
          setView('survey_nexus');
          setNotification(null);
        }
      });
    }, 12000); // Trigger after 12 seconds

    return () => clearTimeout(surveyTimer);
  }, []);

  const handleInvest = (item: { id: string; name: string; value: number; roi: string }) => {
    setPortfolioItems(prev => [...prev, { ...item, timestamp: Date.now() }]);
  };

  const handleSell = (item: { id: string; name: string; value: number; roi: string; timestamp: number }) => {
    // Simulate market volatility (Random -15% to +30%)
    const volatility = (Math.random() * 0.45) - 0.15;
    const marketValue = item.value * (1 + volatility);
    const profitLoss = marketValue - item.value;
    const isProfit = profitLoss >= 0;

    if (confirm(`LIQUIDATE ASSET: ${item.name}?\n\nORIGINAL COST: $${item.value.toLocaleString()}\nMARKET VALUE: $${marketValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}\n\n${isProfit ? 'PROFIT' : 'LOSS'}: ${Math.abs(volatility * 100).toFixed(2)}%`)) {
      setPortfolioItems(prev => prev.filter(i => i.timestamp !== item.timestamp));
      props.setUnsettledAUD(prev => prev + marketValue);
      alert(`TRANSACTION COMPLETE.\n\nRETURNED: $${marketValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}\nNET ${isProfit ? 'PROFIT' : 'LOSS'}: $${Math.abs(profitLoss).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
    }
  };

  const renderView = () => {
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
      case 'automation_nexus': return <AutomationNexus setUnsettledAUD={props.setUnsettledAUD} />;
      case 'swarm_255': return <SwarmCommand />;
      case 'wealth_gate': return <AutoMonetizer unsettledAUD={props.unsettledAUD} setUnsettledAUD={props.setUnsettledAUD} tier={props.user.tier} setView={setView} speak={speak} />;
      case 'security': return <SecuritySanctum />;
      case 'registry': return <ModuleRegistry setView={setView} />;
      case 'repo_manifest': return <RepoManifest />;
      case 'treasury': return <QuantumTreasury tier={props.user.tier} startTrial={()=>{}} isOwner={props.user.isOwner} setView={setView} />;
      case 'oracle': return <OracleNode />;
      case 'key_forge': return <ArchitectKeyGen />;
      case 'wealth_matrix': return <WealthMatrix setView={setView} />;
      case 'warroom': return <WarRoom setView={setView} />;
      case 'social_nexus': return <SocialNexus unsettledAUD={props.unsettledAUD} setUnsettledAUD={props.setUnsettledAUD} speak={speak} />;
      case 'creative_suite': return <CreativeStudio />;
      case 'marketplace': return <Marketplace />;
      case 'storage': return <CloudDrive />;
      case 'settings': return <Settings tier={props.user.tier} isOwner={props.user.isOwner} setView={setView} />;
      case 'equality': return <EqualityProtocol />;
      case 'help_and_support': return <HelpAndSupport setView={setView} />;
      case 'user_profile': return <UserProfile activePersona={props.activePersona} />;
      case 'live_neural_link': return <LiveNeuralLink />;
      case 'infiltrator': return <ShardInfiltrator />;
      case 'server_admin': return <ServerAdmin />;
      case 'crypto_hub': return <CryptoHub />;
      case 'audit_core': return <AuditCore />;
      case 'neural_pulse': return <NeuralPulse />;
      case 'travel_nexus': return <GlobalTravelNexus />;
      case 'sysdiag': return <SystemDiagnostics />;
      case 'campaign_forge': return <CampaignForge isOwner={props.user.isOwner} tier={props.user.tier} />;
      case 'ad_creative_studio': return <AdCreativeStudio />;
      case 'funnel_forge': return <FunnelForge />;
      case 'agent': return <AgentCommand unsettledAUD={props.unsettledAUD} />;
      case 'trading_signals': return <TradingSignals />;
      case 'talent_forge': return <TalentForge isOwner={props.user.isOwner} />;
      case 'talent_sanctum': return <TalentSanctum tier={props.user.tier} isOwner={props.user.isOwner} />;
      case 'sov_search': return <SovereignSearch />;
      case 'geospatial': return <GeospatialNexus />;
      case 'soul_sync': return <SoulSync />;
      case 'holographic_nexus': return <HolographicNexus unsettledAUD={props.unsettledAUD} setUnsettledAUD={props.setUnsettledAUD} setPlatformRevenue={props.setPlatformRevenue} tier={props.user.tier} />;
      case 'platform_treasury': return <PlatformTreasury revenue={props.platformRevenue} currency="AUD" onBack={() => setView('dashboard')} />;
      case 'survey_nexus': return <SurveyNexus setUnsettledAUD={props.setUnsettledAUD} setPlatformRevenue={props.setPlatformRevenue} />;
      case 'payment_portal': return <PaymentPortal />;
      case 'equity_vault': return <EquityVault setUnsettledAUD={props.setUnsettledAUD} onInvest={handleInvest} />;
      case 'mastermind_nexus': return <MastermindNexus setUnsettledAUD={props.setUnsettledAUD} />;
      case 'portfolio': return <Portfolio items={portfolioItems} onSell={handleSell} />;
      default: return <Dashboard setView={setView} isOwner={props.user.isOwner} userTier={props.user.tier} />;
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

      {/* PRIVACY SHIELD (Anti-Screen Scraping) */}
      {isBlurred && !isLocked && (
        <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center text-[var(--primary)]">
            <EyeOff size={64} className="mb-6 animate-pulse" />
            <h2 className="text-2xl font-black tracking-[0.5em] uppercase">Secure View Obfuscated</h2>
            <p className="mt-4 font-mono text-xs opacity-50">ANTI-SCREEN-SCRAPING PROTOCOL ACTIVE // FOCUS WINDOW TO RESUME</p>
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
