import React, { useState, useEffect } from 'react';
import { 
  Zap, ShieldCheck, 
  Activity, Bot, Sparkles, Send, Globe, TrendingUp,
  BarChart3
} from 'lucide-react';
import { generateSocialPost } from '../services/geminiService';

interface Post {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  likes: number;
  shares: number;
  truthScore: number;
  viralityScore: number;
  timestamp: string;
  isAiGenerated: boolean;
  isSwarmBoosted: boolean;
}

const MOCK_FEED: Post[] = [
  {
    id: '1',
    author: 'Xavier Prime',
    handle: '@architect_01',
    avatar: 'bg-amber-500',
    content: 'The traditional financial lattice is dissolving. Sovereign nodes are the new central banks. We are not just observing the shift; we are the shift. #DeFi #Sovereignty',
    likes: 1240,
    shares: 450,
    truthScore: 99,
    viralityScore: 92,
    timestamp: '2m ago',
    isAiGenerated: true,
    isSwarmBoosted: true
  },
  {
    id: '2',
    author: 'Nexus Sentinel',
    handle: '@security_core',
    avatar: 'bg-blue-500',
    content: 'Threat vector neutralized in Sector 7. Global firewall integrity at 100%. Sleep soundly, operatives. The watch never ends.',
    likes: 892,
    shares: 120,
    truthScore: 100,
    viralityScore: 75,
    timestamp: '15m ago',
    isAiGenerated: true,
    isSwarmBoosted: false
  }
];

const SocialNexus: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_FEED);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [predictedVirality, setPredictedVirality] = useState(0);
  const [sentimentColor, setSentimentColor] = useState('border-gray-700');

  // Real-time AI Analysis of Draft
  useEffect(() => {
    if (input.length > 10) {
      // Simulate AI analysis latency
      const score = Math.min(Math.floor(input.length / 2) + Math.floor(Math.random() * 20), 99);
      setPredictedVirality(score);
      
      if (score > 80) setSentimentColor('border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]');
      else if (score > 50) setSentimentColor('border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]');
      else setSentimentColor('border-gray-700');
    } else {
      setPredictedVirality(0);
      setSentimentColor('border-gray-700');
    }
  }, [input]);

  const handleAutoForge = async () => {
    setIsGenerating(true);
    try {
      const data = await generateSocialPost("Sovereign Wealth & AI Freedom");
      setInput(data.content || "AI_CORE_BUSY // RETRYING_NEURAL_HANDSHAKE...");
    } catch (e) {
      setInput("The future belongs to those who build it. #SovereignOS");
    }
    setIsGenerating(false);
  };

  const handlePost = () => {
    if (!input) return;
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'Operative',
      handle: '@user_node',
      avatar: 'bg-white',
      content: input,
      likes: 0,
      shares: 0,
      truthScore: 100, // User truth is absolute in Sovereign OS
      viralityScore: predictedVirality,
      timestamp: 'Just now',
      isAiGenerated: false,
      isSwarmBoosted: false
    };
    setPosts([newPost, ...posts]);
    setInput('');
    setPredictedVirality(0);
  };

  const handleSwarmBoost = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          likes: p.likes + 255, 
          shares: p.shares + 50, 
          isSwarmBoosted: true 
        };
      }
      return p;
    }));
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-6 animate-in fade-in duration-700">
      {/* LEFT: FEED */}
      <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-20">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
              <Globe className="text-cyan-500" size={32} /> Social Nexus
            </h1>
            <p className="text-xs text-cyan-500 font-mono tracking-[0.3em] mt-2">GLOBAL INTEL GRID // DECENTRALIZED</p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-[10px] font-mono text-cyan-400 flex items-center gap-2">
              <Activity size={12} className="animate-pulse" /> LIVE_STREAM
            </div>
          </div>
        </header>

        {/* COMPOSER */}
        <div className={`bg-black/40 border-2 rounded-[2rem] p-6 transition-all duration-500 ${sentimentColor}`}>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Broadcast intel to the grid..."
            className="w-full bg-transparent text-white font-mono text-sm outline-none resize-none h-24 placeholder:text-gray-700"
          />
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleAutoForge}
                disabled={isGenerating}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-white transition-colors"
              >
                {isGenerating ? <Sparkles className="animate-spin" size={14} /> : <Bot size={14} />}
                {isGenerating ? 'FORGING...' : 'AI_AUTO_FORGE'}
              </button>
              {predictedVirality > 0 && (
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500">
                  <BarChart3 size={14} /> PREDICTED VIRALITY: {predictedVirality}%
                </div>
              )}
            </div>
            <button 
              onClick={handlePost}
              className="bg-white text-black px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest hover:bg-cyan-500 hover:text-white transition-all flex items-center gap-2"
            >
              Broadcast <Send size={14} />
            </button>
          </div>
        </div>

        {/* POSTS */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-900/50 border border-white/5 p-6 rounded-[2rem] hover:border-white/20 transition-all group relative overflow-hidden">
              {post.isSwarmBoosted && (
                <div className="absolute top-0 right-0 bg-amber-500 text-black text-[9px] font-black px-3 py-1 rounded-bl-xl flex items-center gap-1">
                  <Zap size={10} fill="black" /> SWARM_BOOSTED
                </div>
              )}
              
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-full ${post.avatar} flex items-center justify-center shadow-lg`}>
                  <span className="font-black text-black text-lg">{post.author[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{post.author}</span>
                    <span className="text-xs text-gray-500">{post.handle}</span>
                    <span className="text-[10px] text-gray-600">• {post.timestamp}</span>
                    {post.isAiGenerated && <Bot size={12} className="text-amber-500" />}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed font-mono">{post.content}</p>
                  
                  {/* METRICS GRID */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 bg-black/30 rounded-xl p-3 border border-white/5">
                     <div className="flex flex-col items-center">
                        <span className="text-[9px] text-gray-500 uppercase">Truth Score</span>
                        <span className="text-emerald-500 font-black text-xs flex items-center gap-1"><ShieldCheck size={10} /> {post.truthScore}%</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <span className="text-[9px] text-gray-500 uppercase">Virality</span>
                        <span className="text-purple-500 font-black text-xs flex items-center gap-1"><TrendingUp size={10} /> {post.viralityScore}%</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <span className="text-[9px] text-gray-500 uppercase">Revenue</span>
                        <span className="text-amber-500 font-black text-xs flex items-center gap-1">$0.00</span>
                     </div>
                     <button 
                       onClick={() => handleSwarmBoost(post.id)}
                       disabled={post.isSwarmBoosted}
                       className="bg-white/5 hover:bg-amber-500 hover:text-black text-gray-400 rounded-lg flex items-center justify-center transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                     >
                        <Zap size={14} />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialNexus;