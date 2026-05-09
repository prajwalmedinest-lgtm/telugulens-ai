import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Paperclip, Trash2, Copy, RotateCcw, MessageSquare, Sparkles } from 'lucide-react';
import { FeatureShell } from './FeatureShell';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response logic (but keep it focused on functionality)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `మీరు అడిగిన '${input}' గురించి నేను సమాచారాన్ని సేకరిస్తున్నాను. ఇది డెమో వెర్షన్ కాబట్టి పూర్తి స్థాయి సమాధానం ప్రస్తుతానికి అందుబాటులో లేదు.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedQuestions = [
    "నమస్కారం! ఎలా ఉన్నారు?",
    "పీఎం కిసాన్ పథకం గురించి చెప్పండి.",
    "మీరు ఏ భాషలను అర్థం చేసుకోగలరు?",
    "తెలుగులో డాక్యుమెంట్లు చదవగలరా?"
  ];

  return (
    <FeatureShell
      title="Universal AI Chat"
      description="Communicate naturally with our Telugu-optimized language model. Ask questions, translate text, or get creative inspiration."
      icon={MessageSquare}
      actions={
        <button 
          onClick={() => setMessages([])}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black text-gray-500 hover:text-red-400 transition-all uppercase tracking-widest flex items-center gap-2"
        >
          <Trash2 size={14} /> Clear Chat
        </button>
      }
    >
      <div className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] flex flex-col h-[650px] overflow-hidden shadow-2xl relative">
        
        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-8 custom-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-10">
              <div className="w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center text-orange-500 relative">
                <Sparkles size={32} />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white">How can I help you today?</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">Ask a question in Telugu or English to start your conversation.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
                {suggestedQuestions.map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => setInput(q)}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-left font-medium"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] group relative ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div 
                      className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-orange-500 text-white rounded-tr-none shadow-lg shadow-orange-500/10' 
                          : 'bg-[#181818] text-gray-200 border border-white/5 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div className={`flex items-center gap-4 mt-2 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-600 hover:text-white transition-colors"><Copy size={12} /></button>
                          <button className="p-1.5 text-gray-600 hover:text-white transition-colors"><RotateCcw size={12} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#181818] border border-white/5 rounded-3xl rounded-tl-none px-6 py-4 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Improved Input Container */}
        <div className="p-8 lg:p-10 bg-[#080808] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-500/5 blur-xl rounded-[2rem] opacity-0 group-focus-within:opacity-100 transition-all"></div>
              <div className="relative bg-[#121212] border border-white/10 rounded-[2rem] p-2 flex items-end gap-2 focus-within:border-orange-500/30 focus-within:ring-1 focus-within:ring-orange-500/20 transition-all shadow-2xl">
                <button className="p-3.5 text-gray-600 hover:text-white transition-colors rounded-2xl hover:bg-white/5">
                  <Paperclip size={20} />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type a message in Telugu..."
                  className="flex-1 bg-transparent border-none text-white placeholder:text-gray-600 resize-none py-4 text-base focus:ring-0 min-h-[56px] max-h-[200px]"
                  rows={1}
                />
                <div className="flex items-center gap-2 p-1">
                  <button className="p-3.5 text-gray-600 hover:text-white transition-colors rounded-2xl hover:bg-white/5">
                    <Mic size={20} />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-6">
              Powered by TeluguLens-V2 Large Language Model
            </p>
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}
