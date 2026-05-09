import { motion } from "motion/react";
import { Languages, LogIn, UserPlus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "about", label: t("nav.about") },
    { key: "features", label: t("nav.features") },
  ];

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isDashboard = location.pathname === "/dashboard";

  if (isDashboard) return null; // Dashboard has its own sidebar/header

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div
        className="max-w-7xl mx-auto rounded-3xl backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo + Brand Name as ONE CLICKABLE BUTTON */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <Logo className="w-10 h-10 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] transition-all" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-yellow-400 transition-all duration-300">
              Telugu Lens AI
            </span>
          </Link>

          {/* Desktop Nav Items */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={`/?section=${item.key}`}
                  className="px-5 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              <Languages className="w-4 h-4" />
              <span>{language === "en" ? "తెలుగు" : "EN"}</span>
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border border-white/10"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white hover:bg-white/5 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-105 active:scale-95 text-white px-6 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
