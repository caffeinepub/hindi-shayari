import { Check, Copy, Heart, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Shayari } from "../backend";
import { CATEGORY_META } from "../data/offlineShayari";

interface ShayariCardProps {
  shayari: Shayari;
  liked: boolean;
  onLike: (id: bigint, liked: boolean) => void;
  index?: number;
}

export function ShayariCard({
  shayari,
  liked,
  onLike,
  index = 0,
}: ShayariCardProps) {
  const [copied, setCopied] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);

  const meta = CATEGORY_META[shayari.category];
  const likesDisplay = Number(shayari.likes) + (liked ? 1 : 0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${shayari.text}\n\n— ${shayari.author}\n\n#Kaviverse #HindiShayari`,
      );
      setCopied(true);
      toast.success("शायरी कॉपी हो गई!", { duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleShare = () => {
    const text = encodeURIComponent(
      `${shayari.text}\n\n— ${shayari.author}\n\nKaviverse पर और शायरी पढ़ें 🌟`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleLike = () => {
    setLikeAnim(true);
    onLike(shayari.id, liked);
    setTimeout(() => setLikeAnim(false), 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-card rounded-2xl p-5 flex flex-col gap-4 group transition-shadow duration-300 hover:shadow-card-hover"
      data-ocid={`shayari.item.${index + 1}`}
    >
      {/* Category badge */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${meta.color}`}
        >
          <span>{meta.emoji}</span>
          <span className="text-slate-200">{meta.label}</span>
        </span>
        <span className="text-slate-600 text-xs">#shayari</span>
      </div>

      {/* Shayari text */}
      <blockquote className="font-devanagari text-slate-200 leading-8 text-base flex-1 whitespace-pre-line">
        {shayari.text}
      </blockquote>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Author */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #C026D3)" }}
          >
            {shayari.author[0]}
          </div>
          <span className="text-slate-400 text-sm">{shayari.author}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Like */}
          <button
            type="button"
            onClick={handleLike}
            data-ocid="shayari.like.toggle"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              liked
                ? "text-pink-400 bg-pink-900/25"
                : "text-slate-400 hover:text-pink-400 hover:bg-pink-900/15"
            }`}
          >
            <motion.div
              animate={likeAnim ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-3.5 h-3.5 ${liked ? "fill-pink-400" : ""}`}
              />
            </motion.div>
            <span>{likesDisplay}</span>
          </button>

          {/* Copy */}
          <button
            type="button"
            onClick={handleCopy}
            data-ocid="shayari.copy.button"
            className="p-1.5 rounded-xl text-slate-400 hover:text-purple-300 hover:bg-purple-900/20 transition-all duration-200"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            data-ocid="shayari.share.button"
            className="p-1.5 rounded-xl text-slate-400 hover:text-green-400 hover:bg-green-900/20 transition-all duration-200"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
