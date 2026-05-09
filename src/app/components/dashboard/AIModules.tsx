import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Play, Pause, Square, Volume2, Save, Download, RotateCcw, Sparkles, Settings, Leaf, Sun, Wind, Droplets, TrendingUp, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FeatureShell } from './FeatureShell';

export function VoiceResponses() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setHasRecording(false);
      setTimeout(() => {
        setIsRecording(false);
        setHasRecording(true);
      }, 4000);
    } else {
      setIsRecording(false);
      setHasRecording(true);
    }
  };

  return (
    <FeatureShell
      title="Voice Intelligence"
      description="Experience the power of spoken Telugu. Our AI understands regional dialects and responds with a natural, human-like voice."
      icon={Mic}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-16 py-10">
        {/* Interaction Core */}
        <div className="relative group">
          <AnimatePresence>
            {isRecording && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 2, 1.5], opacity: [0, 0.2, 0.1] }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-orange-500 rounded-full blur-[60px]"
              />
            )}
          </AnimatePresence>
          
          <button
            onClick={toggleRecording}
            className={`relative z-10 w-48 h-48 rounded-[3rem] flex items-center justify-center transition-all duration-500 shadow-2xl ${
              isRecording 
                ? 'bg-red-500 shadow-red-500/40 rotate-12' 
                : 'bg-[#121212] border border-white/10 hover:border-orange-500/30 shadow-black'
            }`}
          >
            {isRecording ? (
              <Square size={40} className="text-white fill-current" />
            ) : (
              <Mic size={48} className={hasRecording ? "text-orange-500" : "text-white"} />
            )}
          </button>
        </div>

        <div className="text-center space-y-4">
          <h3 className="text-3xl font-black text-white">
            {isRecording ? "Processing spoken Telugu..." : hasRecording ? "Intelligence Captured" : "Tap to speak in Telugu"}
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto font-medium leading-relaxed">
            Our neural models are trained on diverse Telugu dialects for 99% recognition accuracy.
          </p>
        </div>

        {/* Results Area */}
        <AnimatePresence>
          {hasRecording && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-[#121212] border border-white/5 rounded-[3rem] p-10 lg:p-14 space-y-12 shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                  <span>AI Voice Response</span>
                  <span className="text-orange-500">Active Node</span>
                </div>
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                  </button>
                  <div className="flex-1 space-y-4">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isPlaying ? "100%" : "0%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="h-full bg-orange-500"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-500">
                      <span>0:00</span>
                      <span>0:04</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-[2rem] p-8 border border-white/5 space-y-4">
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={12} /> Transcription
                </p>
                <p className="text-white text-2xl font-bold leading-relaxed">
                  "ఖచ్చితంగా! మీ ప్రశ్నకి సమాధానం ఇది..."
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  <Download size={14} /> Download Audio
                </button>
                <button className="flex-1 py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95">
                  Save to Vault
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FeatureShell>
  );
}

export function DialectFriendly() {
  const dialects = [
    { id: 'tg', name: "Telangana", native: "తెలంగాణ", region: "Hyderabad & North", color: "orange" },
    { id: 'rs', name: "Rayalaseema", native: "రాయలసీమ", region: "Anantapur & South", color: "yellow" },
    { id: 'ad', name: "Coastal Andhra", native: "కోస్తా ఆంధ్ర", region: "Vizag & Guntur", color: "orange" },
    { id: 'ua', name: "Uttarandhra", native: "ఉత్తరాంధ్ర", region: "North Coastal", color: "yellow" }
  ];

  const [activeDialect, setActiveDialect] = useState('tg');

  return (
    <FeatureShell
      title="Dialect Intelligence"
      description="Language is personal. Our AI adapts its vocabulary and tone to match your specific region for a more natural conversation."
      icon={Volume2}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-7 space-y-8">
          <h3 className="text-2xl font-black text-white tracking-tight">Select Regional Focus</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dialects.map((dialect) => (
              <button 
                key={dialect.id}
                onClick={() => setActiveDialect(dialect.id)}
                className={`p-8 rounded-[2.5rem] border transition-all text-left group relative overflow-hidden ${
                  activeDialect === dialect.id 
                    ? 'bg-orange-500/10 border-orange-500/40 ring-1 ring-orange-500/40 shadow-2xl' 
                    : 'bg-[#121212] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-2xl font-black ${activeDialect === dialect.id ? 'text-orange-500' : 'text-white'}`}>
                      {dialect.native}
                    </h4>
                    {activeDialect === dialect.id && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{dialect.name}</p>
                    <p className="text-[11px] text-gray-600 font-medium">{dialect.region}</p>
                  </div>
                </div>
                {activeDialect === dialect.id && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#121212] border border-white/5 rounded-[3rem] p-12 text-center space-y-10 shadow-2xl h-full flex flex-col justify-center">
            <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto relative">
              <Sparkles size={40} className="text-orange-500" />
              <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-white">Why Dialect Mode?</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                Standard Telugu can sometimes feel formal. Dialect Mode makes the AI feel like a friend or family member.
              </p>
            </div>
            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center justify-between px-2">
                <div className="text-left">
                  <p className="text-white font-bold">Neural Adaptation</p>
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-1">Status: Active</p>
                </div>
                <div className="w-14 h-7 bg-orange-500 rounded-full p-1 cursor-pointer shadow-lg shadow-orange-500/20">
                  <div className="w-5 h-5 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}

export function AgriUpdates() {
  const updates = [
    { title: "Paddy Crop Care", titleTe: "వరి పంట సంరక్షణ", description: "Monsoon guidance for late sowing regions. Nutrient management for Kharif 2024.", icon: Droplets, color: "blue" },
    { title: "Market Rates", titleTe: "మార్కెట్ ధరలు", description: "Warangal Cotton Yard current prices: ₹6,800 - ₹7,450 per quintal.", icon: TrendingUp, color: "orange" },
    { title: "Climate Alert", titleTe: "వాతావరణం", description: "Heavy rains expected in East Godavari districts over next 48 hours.", icon: Wind, color: "red" }
  ];

  return (
    <FeatureShell
      title="Agricultural Intelligence"
      description="Empowering farmers with localized market data, crop health analysis, and weather warnings translated for maximum impact."
      icon={Leaf}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((update, idx) => (
            <div key={idx} className="bg-[#121212] border border-white/5 rounded-[3rem] p-10 space-y-8 group hover:border-orange-500/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                <update.icon size={28} />
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-black text-white">{update.title}</h4>
                <p className="text-lg font-bold text-orange-500">{update.titleTe}</p>
                <p className="text-sm text-gray-500 font-medium leading-relaxed pt-2">{update.description}</p>
              </div>
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-black text-white uppercase tracking-widest transition-all">
                View Full Brief
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#121212] to-[#080808] border border-white/10 rounded-[3.5rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
          <div className="flex-1 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={12} />
              AI Diagnosis Active
            </div>
            <div className="space-y-4">
              <h3 className="text-5xl font-black text-white tracking-tight leading-tight">
                Farmer's Companion AI <br />
                <span className="text-orange-500">రైతు నేస్తం</span>
              </h3>
              <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-xl">
                Upload a photo of your crops or soil report. We'll identify pests, diseases, or deficiencies and provide organic solutions in Telugu.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-10 py-5 bg-white text-black font-black rounded-2xl shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center gap-3">
                <Upload size={20} /> Analyze Health
              </button>
              <button className="px-10 py-5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-500 font-black rounded-2xl transition-all flex items-center gap-3">
                Live Prices <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-[450px] aspect-square rounded-[4rem] bg-[#0c0c0c] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-inner group">
             <div className="absolute inset-0 bg-orange-500/5 blur-3xl"></div>
             <Leaf size={180} className="text-orange-500 opacity-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-1000" />
             <div className="absolute bottom-12 left-12 right-12 p-8 bg-[#121212]/80 backdrop-blur-xl rounded-[2rem] border border-white/10 space-y-4 shadow-2xl">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-black text-[10px]">AI</div>
                 <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Expert Advice</p>
               </div>
               <p className="text-gray-300 text-sm font-medium leading-relaxed italic">
                 "Crop rotation with legumes can naturally restore soil nitrogen for your next cycle."
               </p>
             </div>
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}
