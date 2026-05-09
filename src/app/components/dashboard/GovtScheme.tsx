import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Search, ExternalLink, Bookmark, CheckCircle2, ChevronRight, Info, Filter, ArrowUpRight } from 'lucide-react';
import { FeatureShell } from './FeatureShell';

export function GovtScheme() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<any | null>(null);
  
  const schemes = [
    {
      title: "PM-Kisan Samman Nidhi",
      titleTe: "పీఎం కిసాన్ సమ్మాన్ నిధి",
      description: "Direct income support of ₹6,000 per year to all landholding farmer families in three installments.",
      status: "Central Scheme",
      category: "Agriculture",
      benefits: "₹2,000 in three equal installments every four months.",
      eligibility: "Landholding farmer families with cultivable landholding. Exclusion criteria apply to high-income groups.",
      docs: ["Aadhar Card", "Land Records", "Bank Passbook"],
      updates: "15th Installment released on Nov 15, 2023."
    },
    {
      title: "Ayushman Bharat PM-JAY",
      titleTe: "ఆయుష్మాన్ భారత్",
      description: "World's largest health insurance scheme providing health cover up to ₹5 lakh per family per year.",
      status: "Central Scheme",
      category: "Healthcare",
      benefits: "Cashless treatment in empaneled hospitals across India for secondary and tertiary care.",
      eligibility: "Families listed in SECC 2011 database and those covered under RSBY.",
      docs: ["Aadhar Card", "Ration Card"],
      updates: "Network expanded to include 500+ private hospitals in Telugu states."
    },
    {
      title: "Rythu Bharosa - PM Kisan",
      titleTe: "రైతు భరోసా",
      description: "Integrated financial assistance scheme for farmers in Andhra Pradesh for agricultural inputs.",
      status: "State + Central",
      category: "Agriculture",
      benefits: "₹13,500 per year provided in three phases (Kharif, Rabi, and Sankranti).",
      eligibility: "Land-owning farmers and landless tenant farmers from SC/ST/BC/Minority communities.",
      docs: ["Webland Adangal", "Aadhar Card", "Tenant Certificate"],
      updates: "Phase 2 payments successfully credited to 50 lakh farmers."
    }
  ];

  const filteredSchemes = schemes.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.titleTe.includes(searchTerm)
  );

  return (
    <FeatureShell
      title="Intelligence Hub: Govt Schemes"
      description="Access clear, verified information on Central and State government welfare programs. Translate eligibility and application steps into your local dialect."
      icon={FileText}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation/Search Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search schemes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              />
            </div>
            
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Filter size={12} /> Filter by Category
              </span>
            </div>

            <div className="space-y-1">
              {filteredSchemes.map((scheme, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedScheme(scheme)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    selectedScheme?.title === scheme.title 
                      ? 'bg-orange-500/10 border-orange-500/30' 
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1 overflow-hidden">
                      <h4 className={`font-bold truncate ${selectedScheme?.title === scheme.title ? 'text-orange-500' : 'text-white'}`}>
                        {scheme.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-medium truncate">{scheme.titleTe}</p>
                    </div>
                    <ChevronRight size={14} className={selectedScheme?.title === scheme.title ? 'text-orange-500' : 'text-gray-700'} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#121212] to-[#080808] border border-white/5 rounded-3xl p-8 space-y-4">
            <h5 className="text-[11px] font-black text-white uppercase tracking-widest">About this tool</h5>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              We use verified government sources to provide simple summaries. Always check the official portal before applying.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedScheme ? (
              <motion.div
                key={selectedScheme.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[#121212] border border-white/5 rounded-[3rem] p-10 lg:p-14 space-y-10 relative overflow-hidden"
              >
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      {selectedScheme.status} • {selectedScheme.category}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-3 bg-white/5 rounded-xl hover:text-orange-500 transition-colors border border-white/5">
                        <Bookmark size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-5xl font-black text-white tracking-tight leading-tight">{selectedScheme.title}</h2>
                    <h3 className="text-3xl font-bold text-orange-500">{selectedScheme.titleTe}</h3>
                  </div>

                  <p className="text-xl text-gray-400 font-medium leading-relaxed border-l-4 border-orange-500 pl-8 py-2">
                    {selectedScheme.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-500" />
                        Key Benefits
                      </h4>
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-gray-300 font-medium text-lg leading-relaxed">
                        {selectedScheme.benefits}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Info size={14} className="text-blue-500" />
                        Who is Eligible?
                      </h4>
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-gray-300 font-medium text-lg leading-relaxed">
                        {selectedScheme.eligibility}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Documents Required (కావలసిన పత్రాలు)</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedScheme.docs.map((doc: string, i: number) => (
                        <span key={i} className="px-5 py-3 bg-[#181818] border border-white/5 rounded-2xl text-sm font-bold text-gray-400">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/5 flex flex-wrap gap-4">
                    <button className="flex-1 py-5 bg-orange-500 text-white font-black rounded-[1.5rem] shadow-2xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                      Official Portal <ExternalLink size={18} />
                    </button>
                    <button className="flex-1 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-[1.5rem] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                      Chat with AI <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[600px] bg-[#121212] border border-white/5 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-gray-700 mb-6">
                  <FileText size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-500">Select a scheme to view intelligence</h3>
                <p className="text-gray-600 max-w-sm mx-auto font-medium mt-2">Choose from Central or State government programs to see localized breakdowns.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FeatureShell>
  );
}
