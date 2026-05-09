import { motion } from "motion/react";
import { Activity, ArrowLeft, Heart } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface FeatureDetailProps {
  onBack: () => void;
}

export function HospitalDocuments({ onBack }: FeatureDetailProps) {
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-6"
            style={{ boxShadow: "0 10px 40px rgba(239, 68, 68, 0.4)" }}
          >
            <Activity className="w-10 h-10 text-white" />
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
            {t("hospital.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("hospital.subtitle")}
          </p>
        </motion.div>

        {/* Document to explanation flow */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Medical document */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="p-6 rounded-2xl backdrop-blur-xl"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-sm text-gray-400">Prescription</span>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Tab. Metformin 500mg</p>
                <p>1-0-1 After Meals</p>
                <p>BP monitoring required</p>
                <p>Follow-up: 2 weeks</p>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              className="hidden md:block text-center"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-4xl text-orange-400">→</div>
            </motion.div>

            {/* Telugu explanation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 rounded-2xl backdrop-blur-xl md:col-start-2"
              style={{
                background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}
            >
              <h4 className="text-white font-semibold mb-3">తెలుగు వివరణ</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                మీరు రోజూ మెట్‌ఫార్మిన్ మాత్రలు తీసుకోవాలి - ఉదయం ఒకటి, రాత్రి ఒకటి, భోజనం తర్వాత.
                రక్తపోటు తనిఖీ చేయాలి. రెండు వారాల తర్వాత డాక్టర్‌ని కలవాలి.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { titleKey: "hospital.medical", descKey: "hospital.medical.desc" },
            { titleKey: "hospital.dosage", descKey: "hospital.dosage.desc" },
            { titleKey: "hospital.safety", descKey: "hospital.safety.desc" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl backdrop-blur-xl text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{t(item.titleKey)}</h3>
              <p className="text-sm text-gray-400">{t(item.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
