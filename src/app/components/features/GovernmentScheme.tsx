import { motion } from "motion/react";
import { FileText, Sparkles, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface FeatureDetailProps {
  onBack: () => void;
}

export function GovernmentScheme({ onBack }: FeatureDetailProps) {
  const { t } = useLanguage();
  return (
    <section className="min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t("common.backToFeatures")}</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 mb-6"
            style={{ boxShadow: "0 10px 40px rgba(239, 68, 68, 0.4)" }}
          >
            <FileText className="w-10 h-10 text-white" />
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
            {t("govt.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("govt.subtitle")}
          </p>
        </motion.div>

        {/* Visual demonstration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Floating document cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96"
          >
            {[
              { title: "ఆయుష్మాన్ భారత్", delay: 0 },
              { title: "PM-KISAN", delay: 0.2 },
              { title: "జగన్నాథ స్కీం", delay: 0.4 },
            ].map((doc, index) => (
              <motion.div
                key={index}
                className="absolute p-6 rounded-xl backdrop-blur-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  left: `${index * 20}px`,
                  top: `${index * 60}px`,
                  width: "280px",
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  delay: doc.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold text-white">{doc.title}</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/20 rounded w-full" />
                  <div className="h-2 bg-white/20 rounded w-4/5" />
                  <div className="h-2 bg-white/20 rounded w-3/5" />
                </div>
                {/* AI sparkle */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Explanation cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div
              className="p-6 rounded-2xl backdrop-blur-xl"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-3">{t("govt.whatItDoes")}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t("govt.whatItDoes.desc")}
              </p>
            </div>

            <div
              className="p-6 rounded-2xl backdrop-blur-xl"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-3">{t("govt.howItWorks")}</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>{t("govt.howItWorks.step1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>{t("govt.howItWorks.step2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>{t("govt.howItWorks.step3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>{t("govt.howItWorks.step4")}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Telugu typography accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center"
        >
          <div
            className="text-6xl font-bold opacity-10"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ప్రభుత్వ పథకాలు
          </div>
        </motion.div>
      </div>
    </section>
  );
}
