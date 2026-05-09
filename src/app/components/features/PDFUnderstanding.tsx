import { motion } from "motion/react";
import { Upload, ArrowLeft, FileText } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface FeatureDetailProps {
  onBack: () => void;
}

export function PDFUnderstanding({ onBack }: FeatureDetailProps) {
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-600 to-red-500 mb-6"
            style={{ boxShadow: "0 10px 40px rgba(249, 115, 22, 0.4)" }}
          >
            <Upload className="w-10 h-10 text-white" />
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
            {t("pdfFeature.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("pdfFeature.subtitle")}
          </p>
        </motion.div>

        {/* Layered document animation */}
        <div className="max-w-3xl mx-auto mb-20 relative h-80 flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute p-8 rounded-2xl backdrop-blur-xl"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                width: "300px",
                height: "200px",
              }}
              initial={{ x: i * 30, y: i * 30, rotate: i * 3 }}
              animate={{
                x: [i * 30, i * 20, i * 30],
                y: [i * 30, i * 20, i * 30],
                rotate: [i * 3, i * -2, i * 3],
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FileText className="w-8 h-8 text-orange-400 mb-3" />
              <div className="space-y-2">
                <div className="h-2 bg-white/30 rounded w-full" />
                <div className="h-2 bg-white/30 rounded w-4/5" />
                <div className="h-2 bg-white/30 rounded w-3/5" />
              </div>
            </motion.div>
          ))}

          {/* Text extraction effect */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            {["తెలుగు", "వివరణ", "సులభం"].map((text, i) => (
              <motion.div
                key={i}
                className="text-orange-400 text-lg mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">{t("pdfFeature.smart")}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t("pdfFeature.smart.desc")}
            </p>
          </div>

          <div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">{t("pdfFeature.anyLang")}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t("pdfFeature.anyLang.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
