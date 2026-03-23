import { Flame, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type { Shayari } from "../backend";
import { ShayariCard } from "./ShayariCard";

interface TrendingSectionProps {
  shayari: Shayari[];
  isLoading?: boolean;
  likedIds: Set<string>;
  onLike: (id: bigint, liked: boolean) => void;
}

export function TrendingSection({
  shayari,
  isLoading,
  likedIds,
  onLike,
}: TrendingSectionProps) {
  return (
    <section className="relative z-10 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(239, 68, 68, 0.3))",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-widest uppercase text-slate-100">
              Trending Shayari
            </h2>
            <p className="text-slate-500 text-xs">
              Most loved by the community
            </p>
          </div>
        </motion.div>

        {isLoading ? (
          <div
            className="flex items-center justify-center py-20"
            data-ocid="trending.loading_state"
          >
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shayari.slice(0, 9).map((s, i) => (
              <ShayariCard
                key={s.id.toString()}
                shayari={s}
                liked={likedIds.has(s.id.toString())}
                onLike={onLike}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
