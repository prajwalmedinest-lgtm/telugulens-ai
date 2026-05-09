import { useState, useEffect } from "react";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { About } from "../components/About";
import { FeaturesPage } from "../components/FeaturesPage";
import { HowItWorksPage } from "../components/HowItWorksPage";
import { GovernmentScheme } from "../components/features/GovernmentScheme";
import { VoiceResponses } from "../components/features/VoiceResponses";
import { ConversationalChat } from "../components/features/ConversationalChat";
import { PDFUnderstanding } from "../components/features/PDFUnderstanding";
import { DialectFriendly } from "../components/features/DialectFriendly";
import { HospitalDocuments } from "../components/features/HospitalDocuments";
import { AgricultureUpdates } from "../components/features/AgricultureUpdates";
import { SaveHistory } from "../components/features/SaveHistory";
import { useSearchParams } from "react-router-dom";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get("section") || "home";
  const activeFeature = searchParams.get("feature");

  // Smooth scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection, activeFeature]);

  const handleFeatureClick = (featureId: string) => {
    setSearchParams({ section: "features", feature: featureId });
  };

  const handleBackToFeatures = () => {
    setSearchParams({ section: "features" });
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
}
