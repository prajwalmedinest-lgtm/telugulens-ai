import { motion } from "motion/react";
import { FileText, Mic, MessageCircle, Upload, Globe, Leaf, Activity } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: FileText,
      titleKey: "features.govt",
      descKey: "features.govt.desc",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: Mic,
      titleKey: "features.voice",
      descKey: "features.voice.desc",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: MessageCircle,
      titleKey: "features.chat",
      descKey: "features.chat.desc",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Upload,
      titleKey: "features.pdf",
      descKey: "features.pdf.desc",
      gradient: "from-orange-600 to-red-500",
    },
    {
      icon: Globe,
      titleKey: "features.dialect",
      descKey: "features.dialect.desc",
      gradient: "from-red-500 to-yellow-500",
    },
    {
      icon: Activity,
      titleKey: "features.hospital",
      descKey: "features.hospital.desc",
      gradient: "from-yellow-500 to-red-500",
    },
  ];
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            {t("features.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div
                className="relative h-full p-8 rounded-2xl backdrop-blur-xl transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Glowing border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{
                    background: `linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(249, 115, 22, 0.2) 50%, rgba(251, 191, 36, 0.2) 100%)`,
                    filter: "blur(20px)",
                  }}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 flex items-center justify-center`}
                  style={{
                    boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)",
                  }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t(feature.descKey)}
                </p>

                {/* Sparkle effect */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full bg-yellow-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
