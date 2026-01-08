import React from 'react';
import { Wallet, Shield } from 'lucide-react';
import { UserState } from '../types';

interface TopHeaderProps {
  user: UserState;
  onLogout: () => void;
  unsettledAUD: number;
}

const TopHeader: React.FC<TopHeaderProps> = ({ user, onLogout, unsettledAUD }) => {
  return (
    <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 text-xs font-mono bg-black/20 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Wallet size={14} />
            <span>A${unsettledAUD.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10"></div>
        <div className="flex items-center gap-2 text-gray-400">
            <Shield size={14} />
            <span className="uppercase tracking-wider">{user.tier}</span>
        </div>
      </div>
      <button onClick={onLogout} className="text-red-500 hover:text-white transition-colors font-bold tracking-widest opacity-50 hover:opacity-100">
        DISCONNECT
      </button>
    </div>
  );
};

export default TopHeader;