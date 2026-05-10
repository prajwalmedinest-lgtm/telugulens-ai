import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Upload, AlertTriangle, Pill, Clock, ArrowRight, Download, FileText, CheckCircle2, X, Loader2 } from 'lucide-react';
import { FeatureShell } from './FeatureShell';
import { hospitalApi } from '../../../services/hospitalApi';

export function HospitalDocs() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<any | null>(null);

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const response = await hospitalApi.uploadDocument(file);
      setIsProcessing(false);
      setReport({
        patient: "Patient (Detected)",
        doctor: "Medical AI Analysis",
        date: new Date().toLocaleDateString(),
        diagnosis: response.medicalExplanation,
        diagnosisTe: response.teluguExplanation,
        medications: [
          { name: "Instructions found in report", timing: "See explanation", instruction: "రిపోర్ట్ చూడండి", color: "orange" }
        ],
        followUp: "As per report",
        warnings: [response.disclaimer]
      });
    } catch (error) {
      console.error('Hospital Docs Error:', error);
      setIsProcessing(false);
      alert('Failed to analyze document. Please try again.');
    }
  };

  return (
    <FeatureShell
      title="Medical Intelligence"
      description="Break down complex medical terminology, lab results, and prescriptions. Understand your health journey in clear, simple Telugu."
      icon={Activity}
    >
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {!report ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              <div className="space-y-8">
                <div className="bg-[#121212] border-2 border-dashed border-white/5 rounded-[3rem] p-16 text-center group hover:border-orange-500/20 transition-all cursor-pointer relative overflow-hidden">
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept="image/*,.pdf"
                  />
                  <div className="space-y-6">
                    <div className="w-20 h-20 rounded-[2rem] bg-orange-500/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Upload size={32} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white">Upload Medical Report</h4>
                      <p className="text-gray-500 font-medium mt-2">Support for prescriptions, lab results, and discharge summaries.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-8 space-y-4">
                  <div className="flex items-center gap-3 text-red-500">
                    <AlertTriangle size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Medical Disclaimer</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium italic">
                    "AI analysis is for informational use only. It is not a substitute for professional medical advice, diagnosis, or treatment."
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-8">
                {file && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#181818] border border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <FileText size={24} />
                      </div>
                      <div>
                        <p className="text-white font-bold truncate max-w-[200px]">{file.name}</p>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">File • Ready</p>
                      </div>
                    </div>
                    <button onClick={() => setFile(null)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                      <X size={18} />
                    </button>
                  </motion.div>
                )}
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight px-2">Analysis Intelligence</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-[#121212] border border-white/5">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Language</p>
                      <p className="text-white font-bold">Telugu (Localized)</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-[#121212] border border-white/5">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Accuracy</p>
                      <p className="text-white font-bold">Clinical Precision</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProcess}
                  disabled={!file || isProcessing}
                  className="w-full py-5 bg-orange-500 text-white font-black text-lg rounded-[2rem] shadow-2xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 flex items-center justify-center gap-3"
                >
                  {isProcessing ? <Loader2 size={24} className="animate-spin" /> : "Breakdown Document"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="report"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0c0c0c] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border-t border-white/10"
            >
              <div className="p-10 lg:p-14 space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/5">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Patient Intelligence Report</p>
                    <h4 className="text-4xl font-black text-white tracking-tight">{report.patient}</h4>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Consult Date</p>
                      <p className="text-white font-bold">{report.date}</p>
                    </div>
                    <div className="h-10 w-px bg-white/10"></div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Doctor</p>
                      <p className="text-white font-bold">{report.doctor}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-500" />
                      Condition Overview
                    </h4>
                    <div className="bg-[#121212] border border-white/5 p-8 rounded-[2rem] space-y-4">
                      <p className="text-white font-bold text-xl leading-relaxed">{report.diagnosis}</p>
                      <p className="text-orange-500 font-black text-2xl leading-relaxed">{report.diagnosisTe}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Pill size={14} className="text-blue-500" />
                      Medication Instructions (మందుల వాడకం)
                    </h4>
                    <div className="space-y-3">
                      {report.medications.map((med: any, i: number) => (
                        <div key={i} className="bg-[#181818] border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-orange-500/20 transition-all">
                          <div className="space-y-1">
                            <h5 className="text-white font-black text-lg">{med.name}</h5>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                              <Clock size={12} /> {med.timing}
                            </p>
                          </div>
                          <p className="text-orange-500 font-black text-xl">{med.instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-wrap gap-4">
                  <button className="flex-1 py-5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    <Download size={18} /> Export Results
                  </button>
                  <button 
                    onClick={() => setReport(null)}
                    className="flex-1 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all"
                  >
                    Process New File
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FeatureShell>
  );
}
