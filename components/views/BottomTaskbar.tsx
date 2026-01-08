import React from 'react';
import { LayoutGrid, Landmark, Globe, User, Zap } from 'lucide-react';
import { AppView } from '../types';

interface BottomTaskbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const BottomTaskbar: React.FC<BottomTaskbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Hub' },
    { id: 'wealth_gate', icon: Landmark, label: 'Bank' }, // Stripe / Bank Module
    { id: 'automation_nexus', icon: Zap, label: 'Auto' },
    { id: 'social_nexus', icon: Globe, label: 'Social' },
    { id: 'user_profile', icon: User, label: 'ID' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-black/90 backdrop-blur-xl border-t border-white/10 z-[100] flex items-center justify-around px-2 pb-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as AppView)}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all min-w-[60px] ${
            currentView === item.id ? 'text-amber-500' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <item.icon size={24} className={currentView === item.id ? 'animate-pulse' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomTaskbar;