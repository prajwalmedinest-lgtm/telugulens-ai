import { motion } from "motion/react";
import { Upload, Cpu, Languages, Volume2, Archive } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function HowItWorksPage() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      titleKey: "howPage.step1",
      descKey: "howPage.step1.desc",
      icon: Upload,
      color: "from-red-500 to-orange-500",
    },
    {
      number: "02",
      titleKey: "howPage.step2",
      descKey: "howPage.step2.desc",
      icon: Cpu,
      color: "from-orange-500 to-yellow-500",
    },
    {
      number: "03",
      titleKey: "howPage.step3",
      descKey: "howPage.step3.desc",
      icon: Languages,
      color: "from-yellow-500 to-orange-500",
    },
    {
      number: "04",
      titleKey: "howPage.step4",
      descKey: "howPage.step4.desc",
      icon: Volume2,
      color: "from-orange-600 to-red-500",
    },
    {
      number: "05",
      titleKey: "howPage.step5",
      descKey: "howPage.step5.desc",
      icon: Archive,
      color: "from-red-500 to-yellow-500",
    },
  ];
  return (
    <section className="min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
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
            {t("howPage.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("howPage.subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Step number and icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {/* Number background */}
                    <div
                      className="text-8xl font-black opacity-10 absolute -top-8 -left-4 bg-clip-text text-transparent"
                      style={{
                        background: `linear-gradient(135deg, #ef4444 0%, #fbbf24 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} p-6 flex items-center justify-center`}
                      style={{
                        boxShadow: "0 10px 40px rgba(249, 115, 22, 0.4)",
                      }}
                    >
                      <step.icon className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 p-8 rounded-2xl backdrop-blur-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="absolute left-12 top-24 bottom-0 w-0.5 h-16 ml-0 md:ml-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(249, 115, 22, 0.5) 0%, transparent 100%)",
                  }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
