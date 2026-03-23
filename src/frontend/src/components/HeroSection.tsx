import { RefreshCw, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Category } from "../backend";
import { CATEGORY_META } from "../data/offlineShayari";

interface HeroSectionProps {
  selectedCategory: Category | "all";
  onCategoryChange: (c: Category | "all") => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

export function HeroSection({
  selectedCategory,
  onCategoryChange,
  onGenerate,
  isGenerating,
}: HeroSectionProps) {
  return (
    <section className="relative z-10 text-center px-4 pt-12 pb-16">
      {/* Overline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase text-purple-300"
        style={{
          background: "rgba(139, 92, 246, 0.12)",
          border: "1px solid rgba(139, 92, 246, 0.30)",
        }}
      >
        <Sparkles className="w-3 h-3" />
        AI-Powered Hindi Poetry
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-white mb-4 max-w-4xl mx-auto"
      >
        Discover &amp; Share{" "}
        <span
          style={{
            background:
              "linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #22D3EE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Beautiful
        </span>
        <br />
        Hindi Shayari.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-devanagari"
      >
        दिल की बात को शब्दों में पिरोएं — रोज़ नई शायरी, हर मिज़ाज के लिए
      </motion.p>

      {/* Category chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
      >
        <CategoryChip
          label="All"
          emoji="✨"
          active={selectedCategory === "all"}
          onClick={() => onCategoryChange("all")}
          ocid="hero.all.tab"
        />
        {Object.values(Category).map((cat) => (
          <CategoryChip
            key={cat}
            label={CATEGORY_META[cat].label}
            emoji={CATEGORY_META[cat].emoji}
            active={selectedCategory === cat}
            onClick={() => onCategoryChange(cat)}
            ocid={`hero.${cat}.tab`}
          />
        ))}
      </motion.div>

      {/* Generate button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.5, ease: "backOut" }}
      >
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          data-ocid="hero.generate.primary_button"
          className="btn-generate inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          Generate Shayari
        </button>
      </motion.div>
    </section>
  );
}

function CategoryChip({
  label,
  emoji,
  active,
  onClick,
  ocid,
}: {
  label: string;
  emoji: string;
  active: boolean;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
        active
          ? "text-white scale-105"
          : "text-slate-400 hover:text-slate-200 hover:bg-white/8"
      }`}
      style={
        active
          ? {
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.5), rgba(192,38,211,0.4))",
              border: "1px solid rgba(168,85,247,0.6)",
              boxShadow: "0 0 16px rgba(139,92,246,0.4)",
            }
          : {
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
            }
      }
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
