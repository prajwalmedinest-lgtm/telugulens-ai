import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { Overview } from '../components/dashboard/Overview';
import { AIChat } from '../components/dashboard/AIChat';
import { PDFUnderstanding } from '../components/dashboard/PDFUnderstanding';
import { GovtScheme } from '../components/dashboard/GovtScheme';
import { HospitalDocs } from '../components/dashboard/HospitalDocs';
import { Profile } from '../components/dashboard/Profile';
import { VoiceResponses, DialectFriendly } from '../components/dashboard/AIModules';
import { CommandSearch } from '../components/dashboard/CommandSearch';
import { 
  History, 
  Settings as SettingsIcon,
} from 'lucide-react';
import { useEffect } from 'react';

export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard Shortcut: Ctrl + Tab + Q
  useEffect(() => {
    const keysPressed: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed[e.key.toLowerCase()] = true;

      // Check for Ctrl + Tab + Q
      // Note: Browsers often block Ctrl+Tab, but we'll try. 
      // We also support Ctrl+Q as a reliable standard shortcut.
      const isCtrlTabQ = e.ctrlKey && keysPressed['tab'] && e.key.toLowerCase() === 'q';
      const isCtrlQ = e.ctrlKey && !keysPressed['tab'] && e.key.toLowerCase() === 'q';

      if (isCtrlTabQ || isCtrlQ) {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'overview': return 'General / Overview';
      case 'govt-scheme': return 'Capabilities / Govt Schemes';
      case 'voice-responses': return 'Capabilities / Voice Intelligence';
      case 'ai-chat': return 'Capabilities / Universal Chat';
      case 'pdf-understanding': return 'Capabilities / PDF Analysis';
      case 'dialect-friendly': return 'Capabilities / Dialect Mode';
      case 'hospital-docs': return 'Capabilities / Medical Helper';
      case 'history': return 'General / Workspace History';
      case 'profile': return 'Account / My Profile';
      case 'settings': return 'Account / Settings';
      default: return 'Workspace';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview onNavigate={setActiveSection} onSearchClick={() => setIsSearchOpen(true)} />;
      case 'ai-chat':
        return <AIChat />;
      case 'pdf-understanding':
        return <PDFUnderstanding />;
      case 'govt-scheme':
        return <GovtScheme />;
      case 'hospital-docs':
        return <HospitalDocs />;
      case 'voice-responses':
        return <VoiceResponses />;
      case 'dialect-friendly':
        return <DialectFriendly />;
      case 'profile':
        return <Profile />;
      case 'history':
        return (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700">
              <History size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-500">No History Found</h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">Your interactions and generated intelligence will appear here once you start using the tools.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700">
              <SettingsIcon size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-500">System Settings</h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">Configuration options for your AI workspace will be available in the next release.</p>
            </div>
          </div>
        );
      default:
        return <Overview onNavigate={setActiveSection} onSearchClick={() => setIsSearchOpen(true)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#080808] text-white overflow-x-hidden selection:bg-orange-500/30">
      {/* Command Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <CommandSearch 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
            onNavigate={setActiveSection} 
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed lg:relative z-[70] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <DashboardSidebar 
          activeSection={activeSection} 
          onNavigate={(id) => {
            setActiveSection(id);
            setIsSidebarOpen(false);
          }} 
          onLogout={handleLogout} 
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
        <DashboardHeader 
          title={getSectionTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)}
          onSearchClick={() => setIsSearchOpen(true)}
        />
        
        <div className="flex-1 p-8 lg:p-12 xl:p-16 max-w-[1440px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
