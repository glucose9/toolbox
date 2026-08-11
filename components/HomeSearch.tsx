"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { tools, categoryLabels } from "@/lib/tools";
import { buildIndex, searchTools } from "@/lib/search-client";

// Large hero search on the home page. Same engine as the header SearchBar
// (초성, multi-token, ranked) but visually prominent — the main way to find
// one tool among 270+.
export default function HomeSearch() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const index = useMemo(
    () => buildIndex(tools, t as unknown as (k: string, p?: Record<string, unknown>, o?: { fallback?: string }) => string),
    [t, locale]
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const results = useMemo(() => searchTools(index, query, 12, 0), [query, index]);
  const showPanel = open && query.trim().length > 0;

  const go = (slug: string) => {
    setOpen(false);
    setQuery("");
    setActive(-1);
    router.push(`/tools/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (results.length > 0) {
        e.preventDefault();
        go(results[Math.max(0, active)].slug);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    }
  };

  return (
    <div ref={wrapperRef} className="relative max-w-xl mx-auto text-left">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted select-none">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          enterKeyHint="search"
          placeholder={t("home.searchPlaceholder", { count: tools.length })}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
      </div>
      {showPanel && (
        <div className="absolute top-full mt-2 left-0 right-0 max-h-96 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl z-30">
          {results.length === 0 ? (
            <div className="p-5 text-sm text-muted text-center">{t("common.noResults")}</div>
          ) : (
            results.map((tool, i) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  setActive(-1);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  i === active ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                <span className="text-2xl">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">
                    {t(`tools.${tool.slug}`, {}, { fallback: tool.navTitle } as never)}
                  </div>
                  <div className="text-xs text-muted truncate">
                    {t(`categories.${tool.category}`, {}, { fallback: categoryLabels[tool.category] || tool.category } as never)}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
