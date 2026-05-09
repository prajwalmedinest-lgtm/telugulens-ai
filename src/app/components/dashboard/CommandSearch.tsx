import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, X, ArrowRight, Sparkles, Zap, MessageCircle, FileText, Activity, Globe, Mic } from 'lucide-react';

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function CommandSearch({ isOpen, onClose, onNavigate }: CommandSearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const tools = [
    { id: 'ai-chat', title: "Universal Chat", desc: "Start a new AI conversation", icon: MessageCircle, color: "orange" },
    { id: 'pdf-understanding', title: "PDF Analysis", desc: "Extract data from documents", icon: FileText, color: "blue" },
    { id: 'govt-scheme', title: "Govt Schemes", desc: "Search welfare programs", icon: Sparkles, color: "yellow" },
    { id: 'hospital-docs', title: "Medical Helper", desc: "Analyze prescriptions", icon: Activity, color: "red" },
    { id: 'voice-responses', title: "Voice Assistant", desc: "Spoken Telugu AI", icon: Mic, color: "orange" },
    { id: 'dialect-friendly', title: "Dialect Mode", desc: "Regional Telugu focus", icon: Globe, color: "yellow" },
  ];

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(query.toLowerCase()) || 
    tool.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl"
      />

      {/* Command Palette */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(249,115,22,0.3)] overflow-hidden"
      >
        {/* Search Input */}
        <div className="relative border-b border-white/5 p-6">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search for a tool..."
            className="w-full bg-transparent border-none text-2xl font-bold text-white placeholder:text-gray-700 pl-14 pr-12 focus:ring-0"
          />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/10">Esc</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
          {filteredTools.length > 0 ? (
            <div className="space-y-2">
              <div className="px-4 py-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={10} className="text-orange-500" /> Suggested Tools
                </span>
              </div>
              {filteredTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onNavigate(tool.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-${tool.color}-500/10 flex items-center justify-center text-${tool.color}-500 group-hover:scale-110 transition-transform`}>
                    <tool.icon size={24} />
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="text-base font-bold text-white group-hover:text-orange-500 transition-colors">{tool.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{tool.desc}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={18} className="text-orange-500" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <Search size={32} className="text-gray-700" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-500">No results for "{query}"</h3>
                <p className="text-sm text-gray-600">Try searching for 'Chat' or 'PDF'</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#0c0c0c] p-4 px-8 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <kbd className="h-5 px-1.5 flex items-center justify-center bg-white/5 border border-white/10 rounded text-[10px] font-bold text-gray-500">↑↓</kbd>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="h-5 px-1.5 flex items-center justify-center bg-white/5 border border-white/10 rounded text-[10px] font-bold text-gray-500">Enter</kbd>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Select</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-widest">
            <Command size={10} /> Powered by TeluguLens AI
          </div>
        </div>
      </motion.div>
    </div>
  );
}
