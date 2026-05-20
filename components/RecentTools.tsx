"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getRecent, getFavorites } from "@/lib/tracking";
import { tools } from "@/lib/tools";

export default function RecentTools() {
  const t = useTranslations();
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

  const recentTools = recent.map((s) => tools.find((x) => x.slug === s)).filter(Boolean);
  const favTools = favorites.map((s) => tools.find((x) => x.slug === s)).filter(Boolean);

  if (recentTools.length === 0 && favTools.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 pt-8 space-y-6">
      {favTools.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>⭐</span> {t("recent.favorites")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {favTools.map(
              (tool) =>
                tool && (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                  >
                    <span>{tool.icon}</span>
                    <span>{t(`tools.${tool.slug}`, {}, { fallback: tool.navTitle } as never)}</span>
                  </Link>
                )
            )}
          </div>
        </div>
      )}

      {recentTools.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>🕐</span> {t("recent.title")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentTools.map(
              (tool) =>
                tool && (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span>{tool.icon}</span>
                    <span>{t(`tools.${tool.slug}`, {}, { fallback: tool.navTitle } as never)}</span>
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </section>
  );
}
