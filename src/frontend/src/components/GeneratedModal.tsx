import { Check, Copy, Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Shayari } from "../backend";
import { CATEGORY_META } from "../data/offlineShayari";

interface GeneratedModalProps {
  shayari: Shayari | null;
  onClose: () => void;
}

export function GeneratedModal({ shayari, onClose }: GeneratedModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!shayari) return;
    try {
      await navigator.clipboard.writeText(
        `${shayari.text}\n\n— ${shayari.author}\n\n#Kaviverse`,
      );
      setCopied(true);
      toast.success("कॉपी हो गई!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleShare = () => {
    if (!shayari) return;
    const text = encodeURIComponent(
      `${shayari.text}\n\n— ${shayari.author}\n\nKaviverse 🌟`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {shayari && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(4px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-3xl p-8 max-w-md w-full relative"
            style={{
              boxShadow:
                "0 0 60px rgba(139,92,246,0.4), 0 0 120px rgba(192,38,211,0.2)",
            }}
            data-ocid="generated.dialog"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              data-ocid="generated.close_button"
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
                ✨ Generated
              </span>
            </div>

            {/* Category */}
            <div className="mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${CATEGORY_META[shayari.category].color}`}
              >
                <span>{CATEGORY_META[shayari.category].emoji}</span>
                <span className="text-slate-200">
                  {CATEGORY_META[shayari.category].label}
                </span>
              </span>
            </div>

            {/* Text */}
            <blockquote className="font-devanagari text-slate-100 text-lg leading-9 whitespace-pre-line mb-6">
              {shayari.text}
            </blockquote>

            {/* Author */}
            <p className="text-slate-500 text-sm mb-8">— {shayari.author}</p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCopy}
                data-ocid="generated.copy.button"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-purple-300 transition-all hover:scale-105"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                data-ocid="generated.share.button"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-green-300 transition-all hover:scale-105"
                style={{
                  background: "rgba(34,197,94,0.10)",
                  border: "1px solid rgba(34,197,94,0.25)",
                }}
              >
                <Share2 className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
