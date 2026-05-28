"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { tools, categoryLabels, type ToolConfig } from "@/lib/tools";

// Korean 초성(initial consonant) for a Hangul syllable, returns "" for non-Hangul.
const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
function toCho(s: string): string {
  let out = "";
  for (const c of s) {
    const code = c.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      out += CHO[Math.floor((code - 0xac00) / 588)];
    } else if (CHO.includes(c)) {
      out += c;
    } else {
      out += c.toLowerCase();
    }
  }
  return out;
}

const HANGUL_CHO_ONLY = /^[ㄱ-ㅎ\s]+$/;

type IndexedTool = {
  tool: ToolConfig;
  title: string; // visible (translated) title
  hay: string; // lowercased combined searchable text
  cho: string; // 초성 of the visible title (for ㅂㅋ → 바코드)
  category: string;
};

function buildIndex(
  toolsList: ToolConfig[],
  tFn: (k: string, params?: Record<string, unknown>, options?: { fallback?: string }) => string
): IndexedTool[] {
  return toolsList.map((tool) => {
    const title = tFn(`tools.${tool.slug}`, {}, { fallback: tool.navTitle });
    const h1 = tFn(`toolMeta.${tool.slug}.h1`, {}, { fallback: tool.h1 });
    const desc = tFn(`toolMeta.${tool.slug}.description`, {}, { fallback: tool.description });
    const category = tFn(`categories.${tool.category}`, {}, { fallback: categoryLabels[tool.category] || tool.category });
    const hay = [title, h1, desc, tool.slug, category, tool.navTitle, tool.title, tool.description]
      .join(" ")
      .toLowerCase();
    return { tool, title, hay, cho: toCho(title), category };
  });
}

function scoreMatch(item: IndexedTool, tokens: string[], rawQ: string, isCho: boolean): number {
  // Returns -1 for no match, lower is better.
  let score = 0;
  for (const tok of tokens) {
    if (!tok) continue;
    if (isCho) {
      // initial-consonant search against the title's 초성
      if (!item.cho.includes(tok)) return -1;
    } else {
      if (!item.hay.includes(tok)) return -1;
    }
  }
  const t = item.title.toLowerCase();
  if (t === rawQ) score -= 100;
  else if (t.startsWith(rawQ)) score -= 50;
  else if (new RegExp(`\\b${rawQ.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(t)) score -= 20;
  else if (t.includes(rawQ)) score -= 10;
  return score;
}

export default function SearchBar() {
  const t = useTranslations();
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 6).map((i) => i.tool);
    const isCho = HANGUL_CHO_ONLY.test(query.trim());
    const tokens = q.split(/\s+/).filter(Boolean);
    const scored: { item: IndexedTool; score: number }[] = [];
    for (const item of index) {
      const s = scoreMatch(item, tokens, q, isCho);
      if (s !== -1) scored.push({ item, score: s });
    }
    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, 20).map((s) => s.item.tool);
  }, [query, index]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder={t("nav.search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        className="input text-sm py-1.5"
      />
      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 max-h-80 overflow-y-auto rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg z-50">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted text-center">{t("common.noResults")}</div>
          ) : (
            results.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
