import { motion } from "motion/react";
import { Sparkles, Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { key: "about", label: t("nav.about") },
    { key: "features", label: t("nav.features") },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div
        className="max-w-7xl mx-auto rounded-2xl backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderBottom: "1px solid rgba(249, 115, 22, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate("home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              TeluguLens AI
            </span>
          </motion.button>

          {/* Nav Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <motion.button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2 rounded-xl transition-all"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)"
                      : "transparent",
                  }}
                >
                  <span
                    className={`text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{
                        border: "1px solid rgba(249, 115, 22, 0.3)",
                        boxShadow: "0 0 20px rgba(249, 115, 22, 0.2)",
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2 rounded-xl text-white text-sm font-medium"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)",
            }}
          >
            <Languages className="w-4 h-4" />
            <span>{language === "en" ? "తెలుగు" : "English"}</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
