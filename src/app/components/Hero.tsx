import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(249, 115, 22, 0.2) 50%, transparent 100%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, rgba(251, 191, 36, 0.2) 50%, transparent 100%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(239, 68, 68, 0.2) 50%, transparent 100%)",
            filter: "blur(90px)",
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
            border: "1px solid rgba(249, 115, 22, 0.2)",
          }}
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-orange-200">{t("hero.badge")}</span>
        </motion.div>

        {/* Main heading with Telugu text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: "800",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
          }}
        >
          {t("hero.title")}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-20 max-w-4xl mx-auto leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Floating UI mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div
            className="relative rounded-3xl p-8 backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Chat UI mockup */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-none p-4 border border-white/10">
                    <p className="text-gray-200">{t("hero.chat1")}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="bg-gradient-to-br from-orange-600/30 to-yellow-600/30 backdrop-blur-md rounded-2xl rounded-tr-none p-4 border border-orange-500/20 max-w-md">
                    <p className="text-gray-200">{t("hero.chat2")}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white">U</span>
                </div>
              </div>

              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-none p-4 border border-white/10">
                    <motion.div
                      className="flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Glow effect */}
          <div
            className="absolute -inset-4 -z-10 rounded-3xl opacity-50"
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 50%, rgba(251, 191, 36, 0.1) 100%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
