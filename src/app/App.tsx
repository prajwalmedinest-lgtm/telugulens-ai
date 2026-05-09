import { useState, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { About } from "./components/About";
import { FeaturesPage } from "./components/FeaturesPage";
import { HowItWorksPage } from "./components/HowItWorksPage";
import { GovernmentScheme } from "./components/features/GovernmentScheme";
import { VoiceResponses } from "./components/features/VoiceResponses";
import { ConversationalChat } from "./components/features/ConversationalChat";
import { PDFUnderstanding } from "./components/features/PDFUnderstanding";
import { DialectFriendly } from "./components/features/DialectFriendly";
import { HospitalDocuments } from "./components/features/HospitalDocuments";
import { AgricultureUpdates } from "./components/features/AgricultureUpdates";
import { SaveHistory } from "./components/features/SaveHistory";

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Smooth scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection, activeFeature]);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setActiveFeature(null);
  };

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const handleBackToFeatures = () => {
    setActiveFeature(null);
  };

  // Render feature detail pages
  const renderFeatureDetail = () => {
    switch (activeFeature) {
      case "government-scheme":
        return <GovernmentScheme onBack={handleBackToFeatures} />;
      case "voice-responses":
        return <VoiceResponses onBack={handleBackToFeatures} />;
      case "conversational-chat":
        return <ConversationalChat onBack={handleBackToFeatures} />;
      case "pdf-understanding":
        return <PDFUnderstanding onBack={handleBackToFeatures} />;
      case "dialect-friendly":
        return <DialectFriendly onBack={handleBackToFeatures} />;
      case "hospital-documents":
        return <HospitalDocuments onBack={handleBackToFeatures} />;
      case "agriculture-updates":
        return <AgricultureUpdates onBack={handleBackToFeatures} />;
      case "save-history":
        return <SaveHistory onBack={handleBackToFeatures} />;
      default:
        return null;
    }
  };

  // Render main content based on active section
  const renderContent = () => {
    if (activeFeature) {
      return renderFeatureDetail();
    }

    switch (activeSection) {
      case "home":
        return (
          <>
            <Hero />
            <Features />
            <HowItWorks />
          </>
        );
      case "about":
        return <About />;
      case "features":
        return <FeaturesPage onFeatureClick={handleFeatureClick} />;
      case "how-it-works":
        return <HowItWorksPage />;
      default:
        return (
          <>
            <Hero />
            <Features />
            <HowItWorks />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] dark text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <div className="pt-24">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}