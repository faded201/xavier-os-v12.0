import React, { useState } from 'react';
import { ClipboardList, DollarSign, CheckCircle2, Loader2 } from 'lucide-react';

interface Survey {
  id: string;
  title: string;
  brand: string;
  payout: number;
  duration: string;
  category: string;
}

const HIGH_TICKET_SURVEYS: Survey[] = [
  { id: 'S1', title: 'Global EV Sentiment Analysis', brand: 'TESLA MOTORS', payout: 150.00, duration: '15 min', category: 'Automotive' },
  { id: 'S2', title: 'VR/AR User Experience Deep Dive', brand: 'APPLE INC.', payout: 250.00, duration: '25 min', category: 'Tech' },
  { id: 'S3', title: 'Luxury Fashion Brand Perception', brand: 'LVMH GROUP', payout: 180.00, duration: '20 min', category: 'Fashion' },
  { id: 'S4', title: 'FinTech Trust & Security Study', brand: 'JP MORGAN', payout: 300.00, duration: '30 min', category: 'Finance' },
  { id: 'S5', title: 'Next-Gen Gaming Console Feedback', brand: 'SONY INTERACTIVE', payout: 120.00, duration: '12 min', category: 'Gaming' },
];

interface SurveyNexusProps {
  setUnsettledAUD: React.Dispatch<React.SetStateAction<number>>;
  setPlatformRevenue: React.Dispatch<React.SetStateAction<number>>;
}

const SurveyNexus: React.FC<SurveyNexusProps> = ({ setUnsettledAUD, setPlatformRevenue }) => {
  const [processing, setProcessing] = useState<string | null>(null);

  const handleStartSurvey = (survey: Survey) => {
    if (confirm(`START HIGH-TICKET SURVEY: ${survey.title}?\nPAYOUT: $${survey.payout.toFixed(2)}`)) {
      setProcessing(survey.id);
      
      // Simulate survey duration (shortened for UX)
      setTimeout(() => {
        const userCut = survey.payout * 0.80;
        const platformCut = survey.payout * 0.20;

        setUnsettledAUD(prev => prev + userCut);
        setPlatformRevenue(prev => prev + platformCut);
        
        setProcessing(null);
        alert(`SURVEY COMPLETE!\n\nEARNINGS: $${userCut.toFixed(2)} (80%)\nPLATFORM FEE: $${platformCut.toFixed(2)} (20%)`);
      }, 2000);
    }
  };

  return (
    <div className="h-full w-full p-6 text-[var(--primary)] font-mono overflow-y-auto">
      <header className="mb-8 border-b border-[var(--primary)] pb-4">
        <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
          <ClipboardList size={32} />
          High-Ticket Survey Nexus
        </h1>
        <p className="text-sm opacity-70 mt-2">EXCLUSIVE MARKET RESEARCH OPPORTUNITIES // 80% PAYOUT RATE</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {HIGH_TICKET_SURVEYS.map((survey) => (
          <div 
            key={survey.id}
            className="border border-[var(--primary)] bg-black/40 p-6 flex flex-col md:flex-row items-center justify-between hover:bg-[var(--primary)]/5 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)] opacity-50"></div>
            
            <div className="flex-1 mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold bg-[var(--primary)] text-black px-2 py-0.5">{survey.brand}</span>
                <span className="text-xs opacity-50 border border-[var(--primary)] px-2 py-0.5">{survey.category}</span>
              </div>
              <h3 className="text-xl font-bold tracking-wide text-white group-hover:text-[var(--primary)] transition-colors">{survey.title}</h3>
              <div className="text-xs opacity-60 mt-1">EST. DURATION: {survey.duration}</div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs opacity-50">PAYOUT</div>
                <div className="text-2xl font-black text-emerald-400 flex items-center gap-1">
                  <DollarSign size={18} />
                  {survey.payout.toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => handleStartSurvey(survey)}
                disabled={processing === survey.id}
                className="px-6 py-3 bg-[var(--primary)] text-black font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] flex items-center justify-center gap-2"
              >
                {processing === survey.id ? <Loader2 className="animate-spin" /> : 'START TASK'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyNexus;