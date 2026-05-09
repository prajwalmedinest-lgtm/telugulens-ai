import { motion } from "motion/react";
import { Archive, ArrowLeft, Clock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface FeatureDetailProps {
  onBack: () => void;
}

export function SaveHistory({ onBack }: FeatureDetailProps) {
  const { t } = useLanguage();

  const historyItems = [
    { title: "ఆయుష్మాన్ భారత్ స్కీం", date: "2 days ago", type: "Government Scheme" },
    { title: "Hospital Prescription", date: "1 week ago", type: "Medical Document" },
    { title: "PM-KISAN Updates", date: "2 weeks ago", type: "Agriculture" },
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 mb-6"
            style={{ boxShadow: "0 10px 40px rgba(249, 115, 22, 0.4)" }}
          >
            <Archive className="w-10 h-10 text-white" />
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
            {t("saveFeature.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("saveFeature.subtitle")}
          </p>
        </motion.div>

        {/* Timeline visual */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{
                background: "linear-gradient(180deg, rgba(249, 115, 22, 0.5) 0%, rgba(249, 115, 22, 0.1) 100%)",
              }}
            />

            {/* History items */}
            <div className="space-y-8">
              {historyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-4 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.3,
                      repeat: Infinity,
                    }}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="p-6 rounded-2xl backdrop-blur-xl cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                      border: "1px solid rgba(249, 115, 22, 0.3)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{item.type}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">{t("saveFeature.organized")}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t("saveFeature.organized.desc")}
            </p>
          </div>

          <div
            className="p-6 rounded-2xl backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">{t("saveFeature.quick")}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t("saveFeature.quick.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
