import React from 'react';
import { Rocket, Globe, Zap, Users, Target, BarChart3 } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface CampaignForgeProps {
  isOwner: boolean;
  tier: SubscriptionTier;
}

const CAMPAIGNS = [
  { id: 'C1', name: 'Viral TikTok Swarm', icon: Zap, cost: 500, reach: '2.5M+', desc: 'Deploy 500 AI avatars to flood TikTok with brand content.' },
  { id: 'C2', name: 'SEO Domination Protocol', icon: Globe, cost: 1200, reach: 'Global', desc: 'Backlink injection into 50,000 high-authority domains.' },
  { id: 'C3', name: 'Influencer Neural Link', icon: Users, cost: 2500, reach: '10M+', desc: 'Auto-negotiate deals with top 1% micro-influencers.' },
  { id: 'C4', name: 'Precision Ad Retargeting', icon: Target, cost: 800, reach: 'High Intent', desc: 'Cross-platform pixel tracking and dynamic creative optimization.' },
];

const CampaignForge: React.FC<CampaignForgeProps> = ({ isOwner, tier }) => {
  const handleLaunch = (campaignName: string, cost: number) => {
    if (confirm(`LAUNCH CAMPAIGN: ${campaignName}?\nCOST: $${cost} (Deducted from Balance)`)) {
      alert(`CAMPAIGN INITIATED: ${campaignName}\n\nSTATUS: ACTIVE\nEST. ROI: 350%`);
    }
  };

  return (
    <div className="h-full w-full p-6 text-[var(--primary)] font-mono overflow-y-auto">
      <header className="mb-10 text-center">
        <div className="inline-block p-4 border-2 border-[var(--primary)] rounded-full mb-4 shadow-[0_0_20px_var(--primary)]">
          <Rocket size={48} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-2 text-white">Campaign Forge</h1>
        <p className="text-lg opacity-70">WORLD-CLASS MARKETING AUTOMATION ENGINE</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {CAMPAIGNS.map((camp) => (
          <div key={camp.id} className="bg-black/60 border border-[var(--primary)] p-8 hover:border-white transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <camp.icon size={100} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{camp.name}</h3>
            <p className="text-sm opacity-70 mb-6 h-12">{camp.desc}</p>
            
            <div className="flex items-center justify-between border-t border-[var(--primary)]/30 pt-6">
              <div>
                <div className="text-xs opacity-50 uppercase tracking-widest">Est. Reach</div>
                <div className="text-xl font-bold text-cyan-400">{camp.reach}</div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-50 uppercase tracking-widest">Cost</div>
                <div className="text-xl font-bold text-emerald-400">${camp.cost}</div>
              </div>
            </div>

            <button 
              onClick={() => handleLaunch(camp.name, camp.cost)}
              className="w-full mt-6 py-3 bg-[var(--primary)] text-black font-black uppercase tracking-widest hover:bg-white transition-colors"
            >
              Launch Campaign
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-[var(--primary)] bg-black/40 p-8 max-w-6xl mx-auto">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 />
          ACTIVE CAMPAIGN PERFORMANCE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-white mb-1">2.4M</div>
            <div className="text-xs opacity-50 uppercase tracking-widest">Total Impressions</div>
          </div>
          <div>
            <div className="text-4xl font-black text-emerald-400 mb-1">4.8%</div>
            <div className="text-xs opacity-50 uppercase tracking-widest">Conversion Rate</div>
          </div>
          <div>
            <div className="text-4xl font-black text-cyan-400 mb-1">$14.2k</div>
            <div className="text-xs opacity-50 uppercase tracking-widest">Revenue Generated</div>
          </div>
        </div>
        
        {/* Visual Graph Bar */}
        <div className="mt-8 flex items-end gap-1 h-24 opacity-50">
          {[40, 60, 45, 70, 55, 80, 65, 90, 75, 60, 85, 95, 80, 70, 60].map((h, i) => (
            <div key={i} className="flex-1 bg-[var(--primary)] hover:bg-white transition-colors" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignForge;