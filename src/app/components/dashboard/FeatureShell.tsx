import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface FeatureShellProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function FeatureShell({ title, description, icon: Icon, children, actions }: FeatureShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className="max-w-6xl mx-auto space-y-10 py-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/5">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
              <Icon size={24} className="text-orange-500" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">{title}</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl font-medium leading-relaxed">{description}</p>
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>

      <div className="min-h-[500px]">
        {children}
      </div>
    </motion.div>
  );
}
