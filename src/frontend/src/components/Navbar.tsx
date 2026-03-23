import { Menu, Search, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type NavView = "explore" | "trending" | "favorites" | "categories";

interface NavbarProps {
  activeView: NavView;
  onViewChange: (v: NavView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Navbar({
  activeView,
  onViewChange,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks: { id: NavView; label: string }[] = [
    { id: "explore", label: "Explore" },
    { id: "categories", label: "Categories" },
    { id: "trending", label: "Trending" },
    { id: "favorites", label: "Favorites" },
  ];

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 py-3">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass w-full max-w-6xl rounded-2xl px-5 py-3"
        style={{
          boxShadow:
            "0 4px 32px rgba(139, 92, 246, 0.15), 0 1px 0 rgba(200, 170, 255, 0.08) inset",
        }}
      >
        <div className="flex items-center gap-4">
          {/* Brand */}
          <button
            type="button"
            onClick={() => onViewChange("explore")}
            data-ocid="nav.link"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #C026D3)",
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-lg font-black tracking-widest hidden sm:block"
              style={{
                background: "linear-gradient(135deg, #A855F7, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              KAVIVERSE
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => onViewChange(link.id)}
                data-ocid={`nav.${link.id}.link`}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeView === link.id
                    ? "text-purple-300"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {link.label}
                {activeView === link.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 md:flex-none md:w-52 relative">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                searchFocused
                  ? "bg-purple-950/60 border border-purple-500/60"
                  : "bg-white/5 border border-white/10"
              }`}
              style={
                searchFocused
                  ? { boxShadow: "0 0 16px rgba(139, 92, 246, 0.4)" }
                  : {}
              }
            >
              <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search shayari…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                data-ocid="nav.search_input"
                className="bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none w-full min-w-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="text-slate-500 hover:text-slate-300 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            data-ocid="nav.toggle"
            className="md:hidden text-slate-400 hover:text-slate-200 p-1"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-3 pb-1 border-t border-white/10 mt-3">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    onClick={() => {
                      onViewChange(link.id);
                      setMobileOpen(false);
                    }}
                    data-ocid={`mobile.${link.id}.link`}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeView === link.id
                        ? "bg-purple-900/40 text-purple-300"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
