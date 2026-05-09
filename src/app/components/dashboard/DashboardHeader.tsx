import React from 'react';
import { Search, Bell, Menu, Command } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardHeaderProps {
  title: string;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
}

export function DashboardHeader({ title, onMenuClick, onSearchClick }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#080808]/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <Menu size={18} className="text-gray-400" />
        </button>
        <div className="hidden lg:flex items-center gap-4">
           <h1 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em]">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div 
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl cursor-pointer group hover:border-white/20 transition-all"
        >
          <Search size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
          <span className="text-[11px] font-bold text-gray-600 group-hover:text-gray-400 transition-colors uppercase tracking-widest mr-8">Global Search</span>
          <div className="flex items-center gap-1 text-[10px] text-gray-700 font-bold">
            <Command size={10} /> Q
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-gray-500 hover:text-white transition-colors">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white text-xs shadow-lg shadow-orange-500/20">
              {user?.name?.[0] || 'U'}
            </div>
            <span className="text-[13px] font-bold text-white hidden sm:block">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
