import React from 'react';
import { AppView } from '../types';

interface BottomTaskbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const BottomTaskbar: React.FC<BottomTaskbarProps> = () => {
  return <div className="md:hidden fixed bottom-0 w-full h-16 bg-black border-t border-white/10 text-xs text-gray-500 flex items-center justify-center">TASKBAR</div>;
};

export default BottomTaskbar;