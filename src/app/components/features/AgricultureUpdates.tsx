import { motion } from "motion/react";
import { Leaf, ArrowLeft, Sprout, Droplets } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface FeatureDetailProps {
  onBack: () => void;
}

export function AgricultureUpdates({ onBack }: FeatureDetailProps) {
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-green-500 mb-6"
            style={{ boxShadow: "0 10px 40px rgba(132, 204, 22, 0.4)" }}
          >
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h2
            className="mb-4 bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #84cc16 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              letterSpacing: "-0.02em",
            }}
          >
            {t("agri.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("agri.subtitle")}
          </p>
        </motion.div>

        {/* Agriculture info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            {
              icon: Sprout,
              titleKey: "agri.crop",
              descKey: "agri.crop.desc",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: Droplets,
              titleKey: "agri.irrigation",
              descKey: "agri.irrigation.desc",
              gradient: "from-blue-500 to-cyan-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl backdrop-blur-xl"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} p-3 mb-4 flex items-center justify-center`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t(item.titleKey)}</h3>
              <p className="text-gray-300 leading-relaxed">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Nature-inspired gradient background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative h-64 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(132, 204, 22, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{t("agri.modern")}</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t("agri.modern.desc")}
              </p>
            </div>
          </div>

          {/* Floating leaves */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Leaf className="w-8 h-8 text-green-500/30" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
