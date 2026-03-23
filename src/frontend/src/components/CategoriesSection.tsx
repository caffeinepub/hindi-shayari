import { motion } from "motion/react";
import { Category } from "../backend";
import { CATEGORY_META } from "../data/offlineShayari";

interface CategoriesSectionProps {
  onSelectCategory: (c: Category) => void;
}

const CATEGORY_COUNTS: Record<string, number> = {
  [Category.love]: 6,
  [Category.sad]: 6,
  [Category.attitude]: 6,
  [Category.friendship]: 6,
  [Category.motivational]: 6,
};

export function CategoriesSection({
  onSelectCategory,
}: CategoriesSectionProps) {
  return (
    <section className="relative z-10 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-black tracking-widest uppercase text-slate-100 mb-2">
            Popular Categories
          </h2>
          <p className="text-slate-500 text-sm">अपने मिज़ाज की शायरी चुनें</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.values(Category).map((cat, i) => {
            const meta = CATEGORY_META[cat];
            return (
              <motion.button
                type="button"
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.03 }}
                onClick={() => onSelectCategory(cat)}
                data-ocid={`categories.${cat}.button`}
                className={`glass-card rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer bg-gradient-to-br ${meta.color} transition-all duration-200`}
              >
                <span className="text-4xl">{meta.emoji}</span>
                <span className="text-slate-200 font-semibold text-sm">
                  {meta.label}
                </span>
                <span className="text-slate-500 text-xs">
                  {CATEGORY_COUNTS[cat]}+ शायरियाँ
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
