import React from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  ArrowRight,
  Sparkles,
  Command,
  LayoutGrid
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface OverviewProps {
  onNavigate: (id: string) => void;
  onSearchClick: () => void;
}

export function Overview({ onNavigate, onSearchClick }: OverviewProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const toolCategories = [
    {
      title: "Essential AI Tools",
      items: [
        { id: 'ai-chat', title: "Conversational AI", desc: "Natural Telugu chat with context", icon: "💬" },
        { id: 'pdf-understanding', title: "PDF Analysis", desc: "Upload and extract document data", icon: "📄" },
        { id: 'govt-scheme', title: "Govt Schemes", desc: "Eligibility and application help", icon: "🏛️" },
      ]
    },
    {
      title: "Specialized Assistants",
      items: [
        { id: 'hospital-docs', title: "Medical Helper", desc: "Prescription and report breakdown", icon: "🏥" },
        { id: 'dialect-friendly', title: "Dialect Mode", desc: "Personalized regional Telugu AI", icon: "🗣️" },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-8">
      {/* Hero Welcome */}
      <section className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-widest w-fit"
        >
          <Sparkles size={12} />
          <span>Active Session</span>
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            నమస్కారం, <span className="text-orange-500">{user?.name}</span>.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
            Welcome to your Telugu Lens AI workspace. Select a specialized module below or start a universal chat to begin.
          </p>
        </div>
      </section>

      {/* Primary Action Bar */}
      <section 
        onClick={onSearchClick}
        className="bg-[#121212] border border-white/5 rounded-3xl p-2 flex items-center gap-2 shadow-2xl cursor-pointer group hover:border-orange-500/20 transition-all"
      >
        <div className="flex-1 flex items-center gap-4 px-6">
          <Search size={20} className="text-gray-600 group-hover:text-orange-500 transition-colors" />
          <div className="w-full bg-transparent border-none text-gray-500 py-4 text-lg font-medium">
            Ask anything or search for a tool...
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 text-gray-600 border-x border-white/5">
          <Command size={14} />
          <span className="text-xs font-bold uppercase tracking-widest">Q</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('ai-chat');
          }}
          className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-orange-500/20"
        >
          Ask AI
        </button>
      </section>

      {/* Tool Categories */}
      <div className="space-y-12">
        {toolCategories.map((category, idx) => (
          <section key={idx} className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <LayoutGrid size={18} className="text-gray-500" />
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">
                {category.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -4, borderColor: 'rgba(249,115,22,0.3)', backgroundColor: '#181818' }}
                  onClick={() => onNavigate(item.id)}
                  className="p-8 rounded-[2rem] bg-[#121212] border border-white/5 text-left transition-all group"
                >
                  <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Launch Tool <ArrowRight size={12} />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
