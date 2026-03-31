import { useQuery } from "@tanstack/react-query";

const BASE = "https://jsonplaceholder.typicode.com";

// ── Plain API functions (no React, no hooks) ──────────────────
export const fetchPosts = async () => {
  const res = await fetch(`${BASE}/posts?_limit=10`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

// ── Query key constant — one place, used everywhere ───────────
// Centralising the key means mutations can import and
// invalidate it without copy-pasting the string.
export const POSTS_QUERY_KEY = ["posts"];

// ── React Query hook ──────────────────────────────────────────
export const usePostsQuery = () =>
  useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: fetchPosts,
    staleTime: 1000 * 30, // override global: fresh for 30s
    refetchInterval: 1000 * 20, // poll every 20 seconds
    refetchIntervalInBackground: false,
  });
