import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.35) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(192, 38, 211, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(5, 6, 10, 1) 0%, #0b0e1a 100%)",
          }}
        >
          {/* Rotating ring */}
          <div
            className="absolute w-64 h-64 rounded-full border border-purple-500/30 animate-spin-slow"
            style={{ boxShadow: "0 0 40px rgba(139, 92, 246, 0.2)" }}
          />
          <div
            className="absolute w-48 h-48 rounded-full border border-pink-500/20"
            style={{
              animation: "spin-slow 14s linear infinite reverse",
              boxShadow: "0 0 20px rgba(236, 72, 153, 0.15)",
            }}
          />

          {/* Orb */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
            className="w-24 h-24 rounded-full mb-8"
            style={{
              background: "radial-gradient(circle, #C026D3, #8B5CF6, #4DA3FF)",
              boxShadow:
                "0 0 60px rgba(168, 85, 247, 0.8), 0 0 120px rgba(192, 38, 211, 0.5), 0 0 200px rgba(77, 163, 255, 0.3)",
              animation: "orb-pulse 2s ease-in-out infinite",
            }}
          />

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <h1
              className="text-5xl font-black tracking-widest mb-3"
              style={{
                background:
                  "linear-gradient(135deg, #A855F7, #EC4899, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              KAVIVERSE
            </h1>
            <p className="text-slate-400 font-devanagari text-lg tracking-wide">
              शायरी की दुनिया में आपका स्वागत है
            </p>
          </motion.div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="flex gap-2 mt-10"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-purple-400"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
