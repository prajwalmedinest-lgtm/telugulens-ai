import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Play, Pause, Volume2, Sparkles, Leaf, Wind, Droplets, TrendingUp, ArrowUpRight, Upload, Loader2 } from 'lucide-react';
import { FeatureShell } from './FeatureShell';
import { ttsApi } from '../../../services/ttsApi';
import { sttApi } from '../../../services/sttApi';

export function VoiceResponses() {
  const [text, setText] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleGenerateSpeech = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    
    try {
      const blob = await ttsApi.generateSpeech(text);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setIsGenerating(false);
    } catch (error) {
      console.error('TTS Error:', error);
      setIsGenerating(false);
      alert('Failed to generate speech');
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    setRecordingError('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        mediaStream.getTracks().forEach(track => track.stop());
        try {
          const textValue = await sttApi.transcribeAudio(blob);
          setTranscript(textValue);
          setText(textValue);
        } catch (error) {
          console.error('Voice STT Error:', error);
          setRecordingError('Could not transcribe your speech. Try again.');
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Mic permission error:', error);
      setRecordingError('Microphone permission is required for voice input.');
    }
  };

  return (
    <FeatureShell
      title="Voice Intelligence"
      description="Experience the power of spoken Telugu. Our AI understands regional dialects and responds with a natural, human-like voice."
      icon={Mic}
    >
      <div className="max-w-4xl mx-auto space-y-12 py-10">
        <div className="bg-[#121212] border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button
              type="button"
              onClick={toggleRecording}
              className={`inline-flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${isRecording ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/10 bg-white/5 text-white hover:border-white/20'}`}
            >
              <Mic size={18} />
              {isRecording ? 'Stop Recording' : 'Record Telugu Speech'}
            </button>
            {isRecording && (
              <div className="flex items-end gap-1 h-8">
                {Array.from({ length: 10 }).map((_, index) => (
                  <motion.span
                    key={index}
                    className="w-1 rounded-full bg-orange-500"
                    animate={{ height: ['20%', '100%', '40%', '80%'] }}
                    transition={{ duration: 1, repeat: Infinity, delay: index * 0.08 }}
                    style={{ height: '20%' }}
                  />
                ))}
              </div>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type Telugu text here to hear it..."
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-white text-lg min-h-[150px] focus:border-orange-500/30 transition-all outline-none resize-none"
          />
          {transcript && (
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-gray-300">
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Transcript Preview</p>
              <p>{transcript}</p>
            </div>
          )}
          {recordingError && <p className="text-sm text-red-400">{recordingError}</p>}
          <button
            onClick={handleGenerateSpeech}
            disabled={!text.trim() || isGenerating}
            className="w-full py-5 bg-orange-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 flex items-center justify-center gap-3"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Volume2 />}
            {isGenerating ? "Generating Voice..." : "Generate Telugu Voice"}
          </button>
        </div>

        <AnimatePresence>
          {audioUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#181818] border border-white/5 rounded-[2rem] p-8 flex items-center gap-8 shadow-2xl"
            >
              <button
                onClick={togglePlay}
                className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
              <div className="flex-1 space-y-2">
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Ready to Play</p>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: isPlaying ? "100%" : "0%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </div>
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
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
