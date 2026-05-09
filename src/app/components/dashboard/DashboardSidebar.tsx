import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Mic, 
  MessageCircle, 
  Upload, 
  Globe, 
  Activity, 
  Leaf, 
  History, 
  User, 
  Settings, 
  LogOut,
  ChevronRight,
  PlusCircle,
  Command
} from 'lucide-react';
import { Logo } from '../Logo';

interface SidebarItemProps {
  id: string;
  label: string;
  icon: any;
  isActive: boolean;
  onClick: (id: string) => void;
}

function SidebarItem({ id, label, icon: Icon, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative ${
        isActive 
          ? 'bg-orange-500/5 text-orange-500 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)]' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className={`transition-colors ${isActive ? 'text-orange-500' : 'text-gray-500 group-hover:text-gray-300'}`}>
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      <span className={`text-[13px] font-semibold transition-all ${isActive ? 'translate-x-0.5' : ''}`}>{label}</span>
      {isActive && (
        <motion.div 
          layoutId="sidebarIndicator"
          className="absolute left-0 w-1 h-5 bg-orange-500 rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
}

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
}

export function DashboardSidebar({ activeSection, onNavigate, onLogout }: SidebarProps) {
  const sections = [
    {
      label: "General",
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'history', label: 'History', icon: History },
      ]
    },
    {
      label: "AI Capabilities",
      items: [
        { id: 'ai-chat', label: 'AI Chat', icon: MessageCircle },
        { id: 'pdf-understanding', label: 'PDF Analysis', icon: Upload },
        { id: 'govt-scheme', label: 'Govt Schemes', icon: FileText },
        { id: 'voice-responses', label: 'Voice Assistant', icon: Mic },
        { id: 'dialect-friendly', label: 'Dialect Mode', icon: Globe },
        { id: 'hospital-docs', label: 'Medical Helper', icon: Activity },
      ]
    },
    {
      label: "Account",
      items: [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 h-screen border-r border-white/5 flex flex-col bg-[#080808] sticky top-0 shrink-0">
      <div className="h-16 flex items-center px-6 gap-3 mb-6">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <Logo className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-base tracking-tight">TeluguLens AI</span>
      </div>

      <div className="px-4 mb-6">
        <button 
          onClick={() => onNavigate('ai-chat')}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-black rounded-xl font-bold text-[13px] hover:bg-gray-100 transition-all shadow-lg active:scale-[0.98]"
        >
          <PlusCircle size={16} />
          <span>New Request</span>
        </button>
      </div>

      <div className="flex-1 px-3 space-y-7 overflow-y-auto custom-scrollbar pb-8">
        {sections.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">
              {group.label}
            </h4>
            {group.items.map((item) => (
              <SidebarItem
                key={item.id}
                {...item}
                isActive={activeSection === item.id}
                onClick={onNavigate}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/5 space-y-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <kbd className="h-5 px-1.5 flex items-center justify-center bg-white/5 border border-white/10 rounded text-[10px] font-bold text-gray-500">
            <Command size={10} className="mr-0.5" /> Q
          </kbd>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Search</span>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-[13px] font-semibold group"
        >
          <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
