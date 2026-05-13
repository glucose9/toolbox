"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite, trackUse, getUsage } from "@/lib/tracking";

export default function FavoriteButton({ slug }: { slug: string }) {
  const [fav, setFav] = useState(false);
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    trackUse(slug);
    setFav(isFavorite(slug));
    setCount(getUsage(slug) as number);
  }, [slug]);

  if (!mounted) return null;

  const onToggle = () => {
    const next = toggleFavorite(slug);
    setFav(next);
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <button
        onClick={onToggle}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
          fav
            ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300"
            : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        {fav ? "⭐" : "☆"} {fav ? "즐겨찾기 해제" : "즐겨찾기"}
      </button>
      {count > 1 && (
        <span className="text-muted">이 도구 {count}번째 사용</span>
      )}
    </div>
  );
}
