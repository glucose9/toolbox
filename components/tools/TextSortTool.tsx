"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

type SortMode = "asc" | "desc" | "len-asc" | "len-desc" | "random";

export default function TextSortTool() {
  const t = useTranslations("toolUI.text-sort");
  const tc = useTranslations("common");
  const [text, setText] = useState("");
  const [mode, setMode] = useState<SortMode>("asc");
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [dedupe, setDedupe] = useState(false);
  const [natural, setNatural] = useState(true);
  const [copied, setCopied] = useState(false);

  const sort = (lines: string[]) => {
    let arr = lines.slice();
    if (dedupe) {
      const seen = new Set<string>();
      arr = arr.filter((l) => {
        const key = caseInsensitive ? l.toLowerCase() : l;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    const collator = new Intl.Collator(undefined, {
      sensitivity: caseInsensitive ? "base" : "variant",
      numeric: natural,
    });
    switch (mode) {
      case "asc":
        arr.sort((a, b) => collator.compare(a, b));
        break;
      case "desc":
        arr.sort((a, b) => collator.compare(b, a));
        break;
      case "len-asc":
        arr.sort((a, b) => a.length - b.length);
        break;
      case "len-desc":
        arr.sort((a, b) => b.length - a.length);
        break;
      case "random":
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        break;
    }
    return arr;
  };

  const result = text ? sort(text.split(/\r?\n/)).join("\n") : "";

  const copy = async () => {
    if (!result) return;
    const ok = await copyText(result);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("inputPlaceholder")}
        className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="flex flex-wrap gap-2 text-sm">
        {(
          [
            ["asc", "A→Z"],
            ["desc", "Z→A"],
            ["len-asc", t("shortFirst")],
            ["len-desc", t("longFirst")],
            ["random", t("random")],
          ] as [SortMode, string][]
        ).map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded ${mode === m ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} />
              {t("caseInsensitive")}
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={natural} onChange={(e) => setNatural(e.target.checked)} />
              {t("naturalSort")}
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} />
              {t("dedupe")}
            </label>
          </div>
        </div>
      </details>
      <textarea
        readOnly
        value={result}
        className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <button onClick={copy} disabled={!result} className="btn btn-primary disabled:opacity-50">
        {copied ? `✓ ${t("copied")}` : t("copy")}
      </button>
    </div>
  );
}
