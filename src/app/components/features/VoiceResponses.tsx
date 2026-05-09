import { motion } from "motion/react";
import { Mic, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface FeatureDetailProps {
  onBack: () => void;
}

export function VoiceResponses({ onBack }: FeatureDetailProps) {
  const { t } = useLanguage();
  return (
    <section className="min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t("common.backToFeatures")}</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 mb-6"
            style={{ boxShadow: "0 10px 40px rgba(249, 115, 22, 0.4)" }}
          >
            <Mic className="w-10 h-10 text-white" />
          </div>
          <h2
            className="mb-4 bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              letterSpacing: "-0.02em",
            }}
          >
            {t("voice.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("voice.subtitle")}
          </p>
        </motion.div>

        {/* Waveform visualization */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative h-64 flex items-end justify-center gap-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-full bg-gradient-to-t from-orange-500 to-yellow-500"
                style={{
                  height: "20%",
                }}
                animate={{
                  height: ["20%", `${Math.random() * 80 + 20}%`, "20%"],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">{t("voice.natural")}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t("voice.natural.desc")}
            </p>
          </div>

          <div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">{t("voice.accessibility")}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t("voice.accessibility.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
