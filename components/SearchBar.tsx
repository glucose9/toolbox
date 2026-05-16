"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { tools, categoryLabels } from "@/lib/tools";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
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

  const q = query.trim().toLowerCase();
  const results = q
    ? tools.filter(
        (t) =>
          t.navTitle.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q) ||
          t.slug.toLowerCase().includes(q) ||
          (categoryLabels[t.category] || "").toLowerCase().includes(q)
      )
    : tools.slice(0, 6);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="도구 검색 (Ctrl+K)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        className="input text-sm py-1.5"
      />
      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 max-h-80 overflow-y-auto rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg z-50">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted text-center">검색 결과 없음</div>
          ) : (
            results.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{t.navTitle}</div>
                  <div className="text-xs text-muted truncate">{categoryLabels[t.category] || t.category}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
