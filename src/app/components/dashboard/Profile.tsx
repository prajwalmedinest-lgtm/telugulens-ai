import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Bell, Smartphone, CreditCard, ChevronRight, Camera, Edit2, Key, Globe, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Profile() {
  const { user } = useAuth();

  const menuItems = [
    { 
      title: "General Settings",
      items: [
        { label: "Personal Info", icon: User, desc: "Name, email and basic account details" },
        { label: "Notifications", icon: Bell, desc: "Manage alerts and email preferences" },
        { label: "Display", icon: Eye, desc: "Theme and language settings" }
      ]
    },
    { 
      title: "Security & Privacy",
      items: [
        { label: "Login & Security", icon: Key, desc: "Password, 2FA and active sessions" },
        { label: "Connected Apps", icon: Globe, desc: "Manage third-party integrations" }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-12">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-yellow-500 p-0.5 shadow-2xl">
              <div className="w-full h-full bg-[#080808] rounded-[2.4rem] flex items-center justify-center text-4xl font-black text-white group-hover:scale-[0.98] transition-transform">
                {user?.name?.[0] || 'U'}
              </div>
            </div>
            <button className="absolute -bottom-2 -right-2 p-2.5 bg-white text-black rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
              <Camera size={18} />
            </button>
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tight">{user?.name}</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-500">{user?.email}</span>
              <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">Pro Member</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
            Manage Subscription
          </button>
          <button className="px-6 py-3 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <nav className="space-y-10">
            {menuItems.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-4">{group.title}</h3>
                <div className="space-y-1">
                  {group.items.map((item, i) => (
                    <button 
                      key={i}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                        i === 0 && idx === 0 ? 'bg-orange-500/5 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <item.icon size={20} className={i === 0 && idx === 0 ? 'text-orange-500' : 'group-hover:text-white'} />
                      <div className="text-left">
                        <p className="text-sm font-bold">{item.label}</p>
                      </div>
                      {i === 0 && idx === 0 && <ChevronRight size={16} className="ml-auto text-orange-500" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <div className="bg-[#121212] border border-white/5 rounded-[3rem] p-12 space-y-12 shadow-2xl">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white tracking-tight">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-1">First Name</label>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold">{user?.name?.split(' ')[0]}</div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-1">Last Name</label>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold">{user?.name?.split(' ')[1] || '-'}</div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-1">Email Address</label>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold flex items-center justify-between">
                    <span>{user?.email}</span>
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 space-y-8">
              <h3 className="text-2xl font-black text-white tracking-tight">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                  <div className="space-y-1">
                    <p className="text-white font-bold">Default AI Dialect</p>
                    <p className="text-xs text-gray-500 font-medium">Currently set to Telangana (Native)</p>
                  </div>
                  <button className="text-xs font-black text-orange-500 uppercase tracking-widest hover:text-orange-400">Change</button>
                </div>
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                  <div className="space-y-1">
                    <p className="text-white font-bold">Email Notifications</p>
                    <p className="text-xs text-gray-500 font-medium">Receive weekly intelligence reports</p>
                  </div>
                  <div className="w-12 h-6 bg-orange-500 rounded-full p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
