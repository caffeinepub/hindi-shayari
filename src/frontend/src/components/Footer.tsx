import { Sparkles } from "lucide-react";
import { SiInstagram } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="relative z-10 mt-auto">
      <div
        className="border-t"
        style={{ borderColor: "rgba(168, 85, 247, 0.15)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #C026D3)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span
                  className="font-black tracking-widest text-sm"
                  style={{
                    background: "linear-gradient(135deg, #A855F7, #EC4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  KAVIVERSE
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed font-devanagari">
                दिल की भावनाओं को शब्दों में पिरोने का सफर।
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-slate-300 font-semibold text-sm mb-3">
                Categories
              </h4>
              <ul className="space-y-2">
                {[
                  "Love ❤️",
                  "Sad 💔",
                  "Attitude 😎",
                  "Friendship 🤝",
                  "Motivational 🔥",
                ].map((c) => (
                  <li key={c}>
                    <span className="text-slate-500 text-sm hover:text-slate-300 cursor-pointer transition-colors">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-slate-300 font-semibold text-sm mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/_berojgarr_engineer_45__?igsh=cDN5MjZlazU0eWxs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-pink-400 transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                  title="Instagram"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span>
              © {year}. Built with ❤️ using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-300 transition-colors"
              >
                caffeine.ai
              </a>
            </span>
            <span className="font-devanagari text-slate-600">
              शायरी · कविता · ग़ज़ल
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
