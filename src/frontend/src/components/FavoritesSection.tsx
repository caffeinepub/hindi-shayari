import { Heart } from "lucide-react";
import { motion } from "motion/react";
import type { Shayari } from "../backend";
import { offlineShayari } from "../data/offlineShayari";
import { ShayariGrid } from "./ShayariGrid";

interface FavoritesSectionProps {
  likedIds: Set<string>;
  onLike: (id: bigint, liked: boolean) => void;
}

export function FavoritesSection({ likedIds, onLike }: FavoritesSectionProps) {
  const favorites: Shayari[] = offlineShayari.filter((s) =>
    likedIds.has(s.id.toString()),
  );

  return (
    <section className="relative z-10 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(236,72,153,0.2)",
              border: "1px solid rgba(236,72,153,0.35)",
            }}
          >
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-widest uppercase text-slate-100">
              My Favorites
            </h2>
            <p className="text-slate-500 text-xs">आपकी पसंदीदा शायरियाँ</p>
          </div>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            data-ocid="favorites.empty_state"
          >
            <div className="text-5xl mb-4">💔</div>
            <p className="text-slate-400 font-devanagari text-lg">
              अभी कोई पसंदीदा नहीं
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Like shayari to save them here
            </p>
          </motion.div>
        ) : (
          <ShayariGrid
            shayari={favorites}
            likedIds={likedIds}
            onLike={onLike}
          />
        )}
      </div>
    </section>
  );
}
