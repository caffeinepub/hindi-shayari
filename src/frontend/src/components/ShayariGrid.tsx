import { Loader2, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Shayari } from "../backend";
import { ShayariCard } from "./ShayariCard";

interface ShayariGridProps {
  shayari: Shayari[];
  isLoading?: boolean;
  likedIds: Set<string>;
  onLike: (id: bigint, liked: boolean) => void;
  title?: string;
  subtitle?: string;
}

const PAGE_SIZE = 9;

export function ShayariGrid({
  shayari,
  isLoading,
  likedIds,
  onLike,
  title,
  subtitle,
}: ShayariGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = shayari.slice(0, visibleCount);
  const hasMore = visibleCount < shayari.length;

  return (
    <section className="relative z-10 px-4 pb-8">
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl font-black tracking-widest uppercase text-slate-100 mb-2">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
        </div>
      )}

      {isLoading ? (
        <div
          className="flex items-center justify-center py-20"
          data-ocid="shayari.loading_state"
        >
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      ) : shayari.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-slate-500"
          data-ocid="shayari.empty_state"
        >
          <div className="text-5xl mb-4">🪷</div>
          <p className="text-lg font-devanagari">कोई शायरी नहीं मिली</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {visible.map((s, i) => (
              <ShayariCard
                key={s.id.toString()}
                shayari={s}
                liked={likedIds.has(s.id.toString())}
                onLike={onLike}
                index={i}
              />
            ))}
          </div>

          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-10"
            >
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                data-ocid="shayari.load_more.button"
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-purple-300 transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(139, 92, 246, 0.12)",
                  border: "1px solid rgba(139, 92, 246, 0.30)",
                  boxShadow: "0 0 16px rgba(139,92,246,0.15)",
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Load More Shayari
              </button>
            </motion.div>
          )}
        </>
      )}
    </section>
  );
}
