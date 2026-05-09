import { motion } from "motion/react";
import { Sparkles, Zap, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function About() {
  const { t } = useLanguage();
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
                  border: "1px solid rgba(249, 115, 22, 0.2)",
                }}
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-200">{t("about.badge")}</span>
              </motion.div>

              <h2
                className="mb-6 bg-clip-text text-transparent"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #fbbf24 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.1",
                }}
              >
                {t("about.title")}
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                {t("about.desc")}
              </p>
            </div>

            {/* Key points */}
            <div className="space-y-4">
              {[
                { icon: Sparkles, textKey: "about.point1" },
                { icon: Zap, textKey: "about.point2" },
                { icon: Globe, textKey: "about.point3" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300">{t(item.textKey)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Floating gradient orbs */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(249, 115, 22, 0.6) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -30, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 left-1/2 w-56 h-56 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)",
                  filter: "blur(45px)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  x: [0, 15, 0],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Central glass card */}
              <motion.div
                className="absolute inset-0 m-auto w-80 h-80 rounded-3xl backdrop-blur-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                }}
                animate={{
                  rotateY: [0, 10, 0, -10, 0],
                  rotateX: [0, -10, 0, 10, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-24 h-24 text-orange-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
