"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecent, getFavorites } from "@/lib/tracking";
import { tools } from "@/lib/tools";

export default function RecentTools() {
  const [recent, setRecent] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => {
      setRecent(getRecent());
      setFavorites(getFavorites());
    };
    refresh();
    window.addEventListener("barokit-storage", refresh);
    return () => window.removeEventListener("barokit-storage", refresh);
  }, []);

  const recentTools = recent.map((s) => tools.find((t) => t.slug === s)).filter(Boolean);
  const favTools = favorites.map((s) => tools.find((t) => t.slug === s)).filter(Boolean);

  if (recentTools.length === 0 && favTools.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 pt-8 space-y-6">
      {favTools.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>⭐</span> 즐겨찾는 도구
          </h2>
          <div className="flex flex-wrap gap-2">
            {favTools.map(
              (t) =>
                t && (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                  >
                    <span>{t.icon}</span>
                    <span>{t.navTitle}</span>
                  </Link>
                )
            )}
          </div>
        </div>
      )}

      {recentTools.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>🕐</span> 최근 사용한 도구
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentTools.map(
              (t) =>
                t && (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span>{t.icon}</span>
                    <span>{t.navTitle}</span>
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </section>
  );
}
