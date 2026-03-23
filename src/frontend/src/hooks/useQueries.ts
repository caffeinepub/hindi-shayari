import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, type Shayari } from "../backend";
import { offlineShayari } from "../data/offlineShayari";
import { useActor } from "./useActor";

// ——— Trending ———
export function useTrending(page = 0n, pageSize = 9n) {
  const { actor, isFetching } = useActor();
  return useQuery<Shayari[]>({
    queryKey: ["trending", page.toString(), pageSize.toString()],
    queryFn: async () => {
      if (!actor)
        return offlineShayari
          .sort((a, b) => Number(b.likes - a.likes))
          .slice(0, 9);
      try {
        const result = await actor.getTrending(page, pageSize);
        return result.length > 0
          ? result
          : offlineShayari
              .sort((a, b) => Number(b.likes - a.likes))
              .slice(0, 9);
      } catch {
        return offlineShayari
          .sort((a, b) => Number(b.likes - a.likes))
          .slice(0, 9);
      }
    },
    enabled: !isFetching,
  });
}

// ——— By Category ———
export function useShayariByCategory(
  category: Category | "all",
  page = 0n,
  pageSize = 9n,
) {
  const { actor, isFetching } = useActor();
  return useQuery<Shayari[]>({
    queryKey: ["shayari", category, page.toString(), pageSize.toString()],
    queryFn: async () => {
      if (category === "all") {
        if (!actor) return [...offlineShayari];
        try {
          const [love, sad, attitude, friendship, motivational] =
            await Promise.all([
              actor.getShayariByCategory(Category.love, 0n, 6n),
              actor.getShayariByCategory(Category.sad, 0n, 6n),
              actor.getShayariByCategory(Category.attitude, 0n, 6n),
              actor.getShayariByCategory(Category.friendship, 0n, 6n),
              actor.getShayariByCategory(Category.motivational, 0n, 6n),
            ]);
          const combined = [
            ...love,
            ...sad,
            ...attitude,
            ...friendship,
            ...motivational,
          ];
          return combined.length > 0 ? combined : [...offlineShayari];
        } catch {
          return [...offlineShayari];
        }
      }
      if (!actor) return offlineShayari.filter((s) => s.category === category);
      try {
        const result = await actor.getShayariByCategory(
          category,
          page,
          pageSize,
        );
        return result.length > 0
          ? result
          : offlineShayari.filter((s) => s.category === category);
      } catch {
        return offlineShayari.filter((s) => s.category === category);
      }
    },
    enabled: !isFetching,
  });
}

// ——— Random ———
export function useRandomShayari(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery<Shayari | null>({
    queryKey: ["random", category, Date.now()],
    queryFn: async () => {
      if (!actor) {
        const pool = offlineShayari.filter((s) => s.category === category);
        return pool[Math.floor(Math.random() * pool.length)] ?? null;
      }
      try {
        return await actor.getRandomShayari(category);
      } catch {
        const pool = offlineShayari.filter((s) => s.category === category);
        return pool[Math.floor(Math.random() * pool.length)] ?? null;
      }
    },
    enabled: !isFetching,
    staleTime: 0,
  });
}

// ——— Search ———
export function useSearchShayari(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Shayari[]>({
    queryKey: ["search", keyword],
    queryFn: async () => {
      if (!keyword.trim()) return [];
      if (!actor) {
        const kw = keyword.toLowerCase();
        return offlineShayari.filter(
          (s) =>
            s.text.toLowerCase().includes(kw) ||
            s.author.toLowerCase().includes(kw),
        );
      }
      try {
        const result = await actor.searchShayari(keyword);
        if (result.length > 0) return result;
        const kw = keyword.toLowerCase();
        return offlineShayari.filter(
          (s) =>
            s.text.toLowerCase().includes(kw) ||
            s.author.toLowerCase().includes(kw),
        );
      } catch {
        const kw = keyword.toLowerCase();
        return offlineShayari.filter(
          (s) =>
            s.text.toLowerCase().includes(kw) ||
            s.author.toLowerCase().includes(kw),
        );
      }
    },
    enabled: keyword.trim().length > 0 && !isFetching,
  });
}

// ——— Like / Unlike ———
export function useLikeShayari() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, liked }: { id: bigint; liked: boolean }) => {
      if (!actor) return;
      if (liked) {
        await actor.unlikeShayari(id);
      } else {
        await actor.likeShayari(id);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["trending"] });
      qc.invalidateQueries({ queryKey: ["shayari"] });
    },
  });
}
