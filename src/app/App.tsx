import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function NavbarVisibilityWrapper() {
  return (
    <Routes>
      <Route path="/dashboard" element={null} />
      <Route path="*" element={<Navbar />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] dark text-white overflow-x-hidden">
      <NavbarVisibilityWrapper />
      <main>
        <Routes>
          <Route path="/" element={<div className="pt-24"><Home /></div>} />
          <Route path="/login" element={<div className="pt-24"><Login /></div>} />
          <Route path="/signup" element={<div className="pt-24"><Signup /></div>} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* Footer is hidden on dashboard via custom logic or just shown everywhere */}
      <FooterVisibilityWrapper />
    </div>
  );
}

function FooterVisibilityWrapper() {
  // We can't use useLocation here because we need to be inside Router
  // But AppContent is inside Router
  return (
    <Routes>
      <Route path="/dashboard" element={null} />
      <Route path="*" element={<Footer />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}