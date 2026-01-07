import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  return <div className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl h-full p-4 text-xs text-gray-500">SIDEBAR_NAV</div>;
};

export default Sidebar;