import { motion } from "motion/react";
import { FileText, Mic, MessageCircle, Upload, Globe, Activity, Leaf, Archive } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FeaturesPageProps {
  onFeatureClick: (featureId: string) => void;
}

export function FeaturesPage({ onFeatureClick }: FeaturesPageProps) {
  const { t } = useLanguage();

  const features = [
    {
      id: "government-scheme",
      icon: FileText,
      titleKey: "features.govt",
      descKey: "features.govt.desc",
      gradient: "from-red-500 to-orange-500",
    },
    {
      id: "voice-responses",
      icon: Mic,
      titleKey: "features.voice",
      descKey: "features.voice.desc",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      id: "conversational-chat",
      icon: MessageCircle,
      titleKey: "features.chat",
      descKey: "features.chat.desc",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      id: "pdf-understanding",
      icon: Upload,
      titleKey: "features.pdf",
      descKey: "features.pdf.desc",
      gradient: "from-orange-600 to-red-500",
    },
    {
      id: "dialect-friendly",
      icon: Globe,
      titleKey: "features.dialect",
      descKey: "features.dialect.desc",
      gradient: "from-red-500 to-yellow-500",
    },
    {
      id: "hospital-documents",
      icon: Activity,
      titleKey: "features.hospital",
      descKey: "features.hospital.desc",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "agriculture-updates",
      icon: Leaf,
      titleKey: "features.agriculture",
      descKey: "features.agriculture.desc",
      gradient: "from-yellow-500 to-green-500",
    },
    {
      id: "save-history",
      icon: Archive,
      titleKey: "features.save",
      descKey: "features.save.desc",
      gradient: "from-orange-500 to-yellow-500",
    },
  ];
  return (
    <section className="min-h-screen px-6 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className="mb-4 bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "800",
              letterSpacing: "-0.02em",
            }}
          >
            {t("featuresPage.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("featuresPage.subtitle")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={() => onFeatureClick(feature.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group text-left"
            >
              <div
                className="relative h-full p-6 rounded-2xl backdrop-blur-xl transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Glowing border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{
                    background: `linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(249, 115, 22, 0.3) 50%, rgba(251, 191, 36, 0.3) 100%)`,
                    filter: "blur(20px)",
                  }}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 flex items-center justify-center`}
                  style={{
                    boxShadow: "0 8px 24px rgba(249, 115, 22, 0.3)",
                  }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t(feature.descKey)}
                </p>

                {/* Click indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {t("featuresPage.learnMore")}
                </motion.div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
