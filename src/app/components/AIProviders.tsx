import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const providers = [
  {
    name: "OpenAI",
    description: "GPT-4 for advanced reasoning",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Gemini",
    description: "Google's multimodal AI",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Groq",
    description: "Ultra-fast inference",
    gradient: "from-orange-500 to-red-500",
  },
];

export function AIProviders() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
              border: "1px solid rgba(249, 115, 22, 0.2)",
            }}
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-200">Powered by Industry Leaders</span>
          </div>

          <h2
            className="mb-6 bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              letterSpacing: "-0.02em",
            }}
          >
            Multi-Model AI Architecture
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We leverage the best AI models for speed, accuracy, and scalability to deliver the most reliable Telugu translations and explanations.
          </p>
        </motion.div>

        {/* Provider cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.map((provider, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div
                className="relative p-8 rounded-2xl backdrop-blur-xl text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Provider name with gradient */}
                <div
                  className={`text-3xl font-black mb-3 bg-gradient-to-r ${provider.gradient} bg-clip-text text-transparent`}
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {provider.name}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm">
                  {provider.description}
                </p>

                {/* Glow effect on hover */}
                <div
                  className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 bg-gradient-to-r ${provider.gradient}`}
                  style={{
                    filter: "blur(20px)",
                  }}
                />

                {/* Top sparkle */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-500 mt-12 text-sm"
        >
          Intelligent routing ensures every query is handled by the optimal AI model
        </motion.p>
      </div>
    </section>
  );
}
