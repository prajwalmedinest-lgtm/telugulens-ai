import { motion } from "motion/react";
import { Globe, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface FeatureDetailProps {
  onBack: () => void;
}

export function DialectFriendly({ onBack }: FeatureDetailProps) {
  const { t } = useLanguage();

  const dialects = [
    { name: "తెలంగాణ", color: "from-red-500 to-orange-500" },
    { name: "ఆంధ్ర", color: "from-orange-500 to-yellow-500" },
    { name: "రాయలసీమ", color: "from-yellow-500 to-red-500" },
  ];

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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-yellow-500 mb-6"
            style={{ boxShadow: "0 10px 40px rgba(249, 115, 22, 0.4)" }}
          >
            <Globe className="w-10 h-10 text-white" />
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
            {t("dialectFeature.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("dialectFeature.subtitle")}
          </p>
        </motion.div>

        {/* Regional dialect cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {dialects.map((dialect, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative"
            >
              <div
                className="p-8 rounded-2xl backdrop-blur-xl text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                  border: "1px solid rgba(249, 115, 22, 0.3)",
                }}
              >
                <div
                  className={`text-3xl font-bold mb-4 bg-gradient-to-r ${dialect.color} bg-clip-text text-transparent`}
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {dialect.name}
                </div>
                <p className="text-sm text-gray-400">Regional Telugu</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language transformation visual */}
        <div className="max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <div
              className="p-6 rounded-2xl backdrop-blur-xl mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <p className="text-gray-400 text-center">Standard Telugu</p>
              <p className="text-white text-center mt-2">ఈ పథకం అందరికీ అందుబాటులో ఉంటుంది</p>
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center text-orange-400 text-2xl"
            >
              ↓
            </motion.div>

            <div
              className="p-6 rounded-2xl backdrop-blur-xl mt-4"
              style={{
                background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}
            >
              <p className="text-gray-400 text-center">Your Dialect</p>
              <p className="text-white text-center mt-2">ఈ స్కీం అందరికీ ఉంటది</p>
            </div>
          </motion.div>
        </div>

        <div
          className="p-6 rounded-2xl backdrop-blur-xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
          }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">{t("dialectFeature.feelsLike")}</h3>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t("dialectFeature.feelsLike.desc")}
          </p>
        </div>
      </div>
    </section>
  );
}
