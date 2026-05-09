import { motion } from "motion/react";
import { Upload, Cpu, MessageSquare } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      titleKey: "how.step1",
      descKey: "how.step1.desc",
      icon: Upload,
      itemKeys: ["how.step1.item1", "how.step1.item2", "how.step1.item3", "how.step1.item4"],
    },
    {
      number: "02",
      titleKey: "how.step2",
      descKey: "how.step2.desc",
      icon: Cpu,
      itemKeys: ["how.step2.item1", "how.step2.item2", "how.step2.item3", "how.step2.item4"],
    },
    {
      number: "03",
      titleKey: "how.step3",
      descKey: "how.step3.desc",
      icon: MessageSquare,
      itemKeys: ["how.step3.item1", "how.step3.item2", "how.step3.item3"],
    },
  ];
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/10 rounded-full filter blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-500/10 rounded-full filter blur-[100px]" />
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
            {t("how.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("how.subtitle")}
          </p>
        </motion.div>

        {/* Steps container */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
            <div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.3) 20%, rgba(249, 115, 22, 0.3) 80%, transparent 100%)",
              }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="relative h-full">
                  {/* Step card */}
                  <div
                    className="relative p-8 rounded-3xl backdrop-blur-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Step number */}
                    <div
                      className="text-7xl font-black mb-4 opacity-20 bg-clip-text text-transparent"
                      style={{
                        background: "linear-gradient(135deg, #ef4444 0%, #fbbf24 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 p-4 mb-6 flex items-center justify-center"
                      style={{
                        boxShadow: "0 10px 40px rgba(249, 115, 22, 0.4)",
                      }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {t(step.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {t(step.descKey)}
                    </p>

                    {/* Items list */}
                    <ul className="space-y-2">
                      {step.itemKeys.map((itemKey, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500" />
                          {t(itemKey)}
                        </li>
                      ))}
                    </ul>

                    {/* Glow effect */}
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                      style={{
                        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)",
                        filter: "blur(20px)",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
