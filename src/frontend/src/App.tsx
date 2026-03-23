import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Category, type Shayari } from "./backend";
import { Background } from "./components/Background";
import { CategoriesSection } from "./components/CategoriesSection";
import { FavoritesSection } from "./components/FavoritesSection";
import { Footer } from "./components/Footer";
import { GeneratedModal } from "./components/GeneratedModal";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ShayariGrid } from "./components/ShayariGrid";
import { SplashScreen } from "./components/SplashScreen";
import { TrendingSection } from "./components/TrendingSection";
import { offlineShayari } from "./data/offlineShayari";
import { useActor } from "./hooks/useActor";
import {
  useLikeShayari,
  useSearchShayari,
  useShayariByCategory,
  useTrending,
} from "./hooks/useQueries";

type NavView = "explore" | "trending" | "favorites" | "categories";

const LS_LIKED_KEY = "kaviverse_liked";

function loadLikedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_LIKED_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    /* ignore */
  }
  return new Set();
}

function saveLikedIds(ids: Set<string>) {
  localStorage.setItem(LS_LIKED_KEY, JSON.stringify([...ids]));
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [activeView, setActiveView] = useState<NavView>("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );
  const [likedIds, setLikedIds] = useState<Set<string>>(loadLikedIds);
  const [generatedShayari, setGeneratedShayari] = useState<Shayari | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const { actor } = useActor();
  const qc = useQueryClient();
  const likeMutation = useLikeShayari();

  // Data queries
  const trendingQuery = useTrending();
  const exploreQuery = useShayariByCategory(selectedCategory);
  const searchResultsQuery = useSearchShayari(searchQuery);

  // Sync liked IDs from backend on actor ready
  useEffect(() => {
    if (!actor) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = (actor as any)?._identity;
    if (!id) return; // anonymous, skip
  }, [actor]);

  const handleLike = useCallback(
    (id: bigint, currentlyLiked: boolean) => {
      const key = id.toString();
      setLikedIds((prev) => {
        const next = new Set(prev);
        if (currentlyLiked) {
          next.delete(key);
        } else {
          next.add(key);
          toast.success("पसंद किया! 💜", { duration: 1500 });
        }
        saveLikedIds(next);
        return next;
      });
      likeMutation.mutate({ id, liked: currentlyLiked });
    },
    [likeMutation],
  );

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const category =
        selectedCategory === "all"
          ? Object.values(Category)[Math.floor(Math.random() * 5)]
          : selectedCategory;

      let shayari: Shayari | null = null;
      if (actor) {
        try {
          shayari = await actor.getRandomShayari(category);
        } catch {
          /* fallback */
        }
      }
      if (!shayari) {
        const pool = offlineShayari.filter((s) => s.category === category);
        shayari = pool[Math.floor(Math.random() * pool.length)] ?? null;
      }
      if (shayari) {
        setGeneratedShayari(shayari);
      } else {
        toast.error("शायरी नहीं मिली");
      }
    } finally {
      setIsGenerating(false);
    }
  }, [actor, selectedCategory]);

  const handleCategorySelect = useCallback(
    (cat: Category) => {
      setSelectedCategory(cat);
      setActiveView("explore");
      qc.invalidateQueries({ queryKey: ["shayari", cat] });
    },
    [qc],
  );

  // Determine which shayari to show in explore
  const exploreShayari = searchQuery.trim()
    ? (searchResultsQuery.data ?? [])
    : (exploreQuery.data ?? [...offlineShayari]);

  const exploreLoading = searchQuery.trim()
    ? searchResultsQuery.isLoading
    : exploreQuery.isLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(14,11,32,0.9)",
            border: "1px solid rgba(168,85,247,0.3)",
            color: "#e2e8f0",
            backdropFilter: "blur(16px)",
          },
        }}
      />

      {/* Splash */}
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      {/* Main content fades in after splash */}
      <AnimatePresence>
        {splashDone && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col min-h-screen"
          >
            <Navbar
              activeView={activeView}
              onViewChange={setActiveView}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <main className="flex-1">
              {activeView === "explore" && (
                <>
                  <HeroSection
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                  />
                  <ShayariGrid
                    shayari={exploreShayari}
                    isLoading={exploreLoading}
                    likedIds={likedIds}
                    onLike={handleLike}
                    title={
                      searchQuery ? `Results for "${searchQuery}"` : undefined
                    }
                  />
                </>
              )}

              {activeView === "trending" && (
                <div className="pt-8">
                  <TrendingSection
                    shayari={
                      trendingQuery.data ??
                      offlineShayari
                        .sort((a, b) => Number(b.likes - a.likes))
                        .slice(0, 9)
                    }
                    isLoading={trendingQuery.isLoading}
                    likedIds={likedIds}
                    onLike={handleLike}
                  />
                </div>
              )}

              {activeView === "categories" && (
                <div className="pt-8">
                  <CategoriesSection onSelectCategory={handleCategorySelect} />
                </div>
              )}

              {activeView === "favorites" && (
                <div className="pt-8">
                  <FavoritesSection likedIds={likedIds} onLike={handleLike} />
                </div>
              )}
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated shayari modal */}
      <GeneratedModal
        shayari={generatedShayari}
        onClose={() => setGeneratedShayari(null)}
      />
    </div>
  );
}
