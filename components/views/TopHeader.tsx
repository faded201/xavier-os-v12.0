import React from 'react';
import { UserState } from '../types';

interface TopHeaderProps {
  user: UserState;
  onLogout: () => void;
  unsettledAUD: number;
}

const TopHeader: React.FC<TopHeaderProps> = () => {
  return <div className="h-16 border-b border-white/10 flex items-center px-6 text-xs text-gray-500">HEADER_STATUS</div>;
};

export default TopHeader;