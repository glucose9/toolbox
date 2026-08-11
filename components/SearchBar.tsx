"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { tools, categoryLabels } from "@/lib/tools";
import { buildIndex, searchTools } from "@/lib/search-client";

// compact: mobile header instance — hides the (Ctrl+K) hint, which is
// meaningless on a touch keyboard.
export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Index recomputes when locale changes (different translated titles).
  const index = useMemo(
    () => buildIndex(tools, t as unknown as (k: string, p?: Record<string, unknown>, o?: { fallback?: string }) => string),
    [t, locale]
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = wrapperRef.current?.querySelector("input");
        input?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => searchTools(index, query, 20, 6), [query, index]);

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

  const listboxId = "searchbar-results";
  const placeholder = compact ? t("nav.search").replace(/\s*\(ctrl\+k\)/i, "") : t("nav.search");

  return (
    <div ref={wrapperRef} role="search" className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? `${listboxId}-${active}` : undefined}
        enterKeyHint="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="input text-sm py-1.5"
      />
      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          className="absolute top-full mt-1 left-0 right-0 max-h-80 overflow-y-auto rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg z-50"
        >
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted text-center">{t("common.noResults")}</div>
          ) : (
            results.map((tool, i) => (
              <Link
                key={tool.slug}
                id={`${listboxId}-${i}`}
                href={`/tools/${tool.slug}`}
                role="option"
                aria-selected={i === active}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  setActive(-1);
                }}
                className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  i === active ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                <span className="text-xl">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{t(`tools.${tool.slug}`, {}, { fallback: tool.navTitle } as never)}</div>
                  <div className="text-xs text-muted truncate">{t(`categories.${tool.category}`, {}, { fallback: categoryLabels[tool.category] || tool.category } as never)}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
