import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative py-20 px-6 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Logo and tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center gap-2 justify-center mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                TeluguLens AI
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {t("footer.tagline")}
            </p>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-gray-600 text-sm">
            {t("footer.copyright")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
