import { motion } from "motion/react";
import { MessageCircle, ArrowLeft, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface FeatureDetailProps {
  onBack: () => void;
}

export function ConversationalChat({ onBack }: FeatureDetailProps) {
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 mb-6"
            style={{ boxShadow: "0 10px 40px rgba(249, 115, 22, 0.4)" }}
          >
            <MessageCircle className="w-10 h-10 text-white" />
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
            {t("chat.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("chat.subtitle")}
          </p>
        </motion.div>

        {/* Floating message bubbles */}
        <div className="max-w-3xl mx-auto mb-20 space-y-4">
          {[
            { text: "ఈ పథకం ఎవరికి వర్తిస్తుంది?", isUser: true, delay: 0 },
            { text: "ఈ పథకం 60 ఏళ్ల పైబడిన వారికి మరియు BPL కార్డు ఉన్న వారికి వర్తిస్తుంది.", isUser: false, delay: 0.3 },
            { text: "దరఖాస్తు చేయడానికి ఏమి కావాలి?", isUser: true, delay: 0.6 },
          ].map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: message.isUser ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: message.delay }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-4 rounded-2xl ${message.isUser ? 'rounded-tr-none' : 'rounded-tl-none'}`}
                style={{
                  background: message.isUser
                    ? "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                  border: `1px solid ${message.isUser ? 'rgba(249, 115, 22, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                }}
              >
                {!message.isUser && <Sparkles className="w-4 h-4 text-orange-400 mb-2" />}
                <p className="text-gray-200">{message.text}</p>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-start"
          >
            <div
              className="p-4 rounded-2xl rounded-tl-none"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-orange-400"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { titleKey: "chat.contextAware", descKey: "chat.contextAware.desc" },
            { titleKey: "chat.naturalLang", descKey: "chat.naturalLang.desc" },
            { titleKey: "chat.instant", descKey: "chat.instant.desc" },
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
