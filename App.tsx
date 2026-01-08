
import React, { useState, useEffect, useRef } from 'react';
import { UserState, SystemMood, SubscriptionTier } from './components/types';
import LoginPortal from './components/views/LoginPortal';
import NeuralBoot from './components/services/NeuralBoot';
import NexusDashboard from './components/views/NexusDashboard';
import ErrorBoundary from './ErrorBoundary';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState | null>(() => {
    try {
      const saved = localStorage.getItem('xavier_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isBooting, setIsBooting] = useState(false);
  const [unsettledBalance, setUnsettledBalance] = useState(() => {
    const saved = localStorage.getItem('xavier_balance');
    return saved && !isNaN(parseFloat(saved)) ? parseFloat(saved) : 0;
  });
  const [platformRevenue, setPlatformRevenue] = useState(() => {
    const saved = localStorage.getItem('xavier_revenue');
    return saved ? parseFloat(saved) : 0;
  });
  const [userCurrency, setUserCurrency] = useState('AUD');
  const swarmInitiated = useRef(false);
  const [systemMood, setSystemMood] = useState<SystemMood>('stable');
  const [activePersona, setActivePersona] = useState<any>(null);

  // Effect to simulate linking to backend/AI data stream on load
  useEffect(() => {
    if (user) {
      localStorage.setItem('xavier_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('xavier_user_session');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('xavier_balance', unsettledBalance.toString());
  }, [unsettledBalance]);

  useEffect(() => {
    localStorage.setItem('xavier_revenue', platformRevenue.toString());
  }, [platformRevenue]);

  useEffect(() => {
    const syncWithBackend = async () => {
      // Detect user currency based on browser locale
      const locale = navigator.language || 'en-US';
      let detectedCurrency = 'USD';
      if (locale.includes('AU')) detectedCurrency = 'AUD';
      else if (locale.includes('GB')) detectedCurrency = 'GBP';
      else if (locale.includes('CA')) detectedCurrency = 'CAD';
      else if (locale.includes('JP')) detectedCurrency = 'JPY';
      else if (navigator.languages?.some(l => l.includes('EU'))) detectedCurrency = 'EUR';
      
      setUserCurrency(detectedCurrency);

      try {
        // Real-world task: Fetching live financial data from the AI backend
        const response = await fetch(`/api/financial/balance?currency=${detectedCurrency}`);
        if (!response.ok) throw new Error('AI Backend unreachable');
        const data = await response.json();
        setUnsettledBalance(data.balance);
      } catch (error) {
        console.warn("Backend offline, using cached/simulated data:", error);
        // Backend offline: Using local storage persistence
      }

      // Swarm 255 Protocol: 255x Clones for 30 Automated Tasks
      if (!swarmInitiated.current) {
        swarmInitiated.current = true;
        try {
          console.log("Initializing Swarm 255: Spawning 255 AI Clones across 155 Real-World Models...");
          
          // Define 30 separate real-world money makers
          const moneyMakers = [
            'E-Commerce Arbitrage', 'High-Frequency DeFi', 'Digital Asset Licensing', 'Affiliate Networks',
            'SaaS Micro-Acquisitions', 'Crypto Staking Yields', 'AI Content Syndication', 'Domain Flipping',
            'NFT Royalties', 'Print-on-Demand Automation', 'Social Media Management', 'Lead Generation Swarms',
            'Stock Market Algo-Trading', 'Forex Scalping', 'P2P Lending', 'Virtual Real Estate',
            'App Reskinning', 'Course Monetization', 'Newsletter Sponsorships', 'YouTube Automation',
            'Podcast Ad Insertion', 'Influencer Brand Deals', 'CPA Marketing', 'Dropservicing',
            '3D Model Licensing', 'Stock Photography AI', 'Voiceover Synthesis', 'Translation Services',
            'Data Annotation', 'Bug Bounty Hunting'
          ];

          const swarmRes = await fetch('/api/swarm/execute', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ 
               clones: 255, 
               tasks: moneyMakers, // 30 separate money makers
               currency: detectedCurrency
             })
          });
          if (!swarmRes.ok) throw new Error("Swarm Network Busy");
          const swarmData = await swarmRes.json();
          
          // Revenue Split: 80% to User, 20% to Platform
          if (swarmData && swarmData.earnings) {
            const userNet = swarmData.earnings * 0.80;
            const platformCut = swarmData.earnings * 0.20;
            setUnsettledBalance(prev => prev + userNet);
            setPlatformRevenue(prev => prev + platformCut);
          }
        } catch (e) {
          console.log("Swarm Backend offline. Waiting for manual deployment.");
          // No simulation fallback. Real-world functionality requires user action.
        }
      }
    };
       

    if (user) {
      syncWithBackend();
    }
  }, [user]);

  const handleAuthenticated = async (tier: SubscriptionTier = 'SOVEREIGN', hasTalentPass: boolean = false) => {
    // In a real app, we would verify the token with the backend here
    // Set subscription expiry to 30 days from now for non-owners/non-key-holders
    const expiry = (tier === 'INVERSION' || hasTalentPass)
      ? undefined // No expiry for owner or pass key holders (Forever Access)
      : Date.now() + (30 * 24 * 60 * 60 * 1000);

    setUser({ tier, isOwner: tier === 'INVERSION', hasTalentPass, subscriptionExpiry: expiry });
    setIsBooting(true);
  };

  if (!user) return <LoginPortal onAuthenticated={handleAuthenticated} />;
  if (isBooting) return <NeuralBoot onComplete={() => setIsBooting(false)} />;

  return (
    <ErrorBoundary onReset={() => window.location.reload()}>
      <NexusDashboard 
        user={user}
        onLogout={() => setUser(null)}
        unsettledAUD={unsettledBalance}
        setUnsettledAUD={setUnsettledBalance}
        platformRevenue={platformRevenue}
        setPlatformRevenue={setPlatformRevenue}
        setUser={setUser}
        currency={userCurrency}
        systemMood={systemMood}
        setSystemMood={setSystemMood}
        activePersona={activePersona}
        setActivePersona={setActivePersona}
      />
    </ErrorBoundary>
  );
};
export default App;
