"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

export default function BibSortTool() {
  const t = useTranslations("toolUI.bib-sort");
  const [input, setInput] = useState(`Smith, J. (2020). A study on cognition. Journal of Psychology, 12(3), 45-67.

Kim, S. (2019). 학습 동기 연구. 교육심리학 연구, 33(2), 11-25.

Anderson, P., & Lee, M. (2021). Memory and attention. Nature Cognition, 5, 100-115.

Smith, J. (2020). A study on cognition. Journal of Psychology, 12(3), 45-67.`);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [dedupe, setDedupe] = useState(true);

  const sorted = useMemo(() => {
    let lines = input
      .split(/\n\s*\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (dedupe) lines = Array.from(new Set(lines));
    lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    if (order === "desc") lines.reverse();
    return lines;
  }, [input, order, dedupe]);

  const output = sorted.join("\n\n");
  const copy = () => void copyText(output);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("inputLabel")}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <label className="flex items-center gap-1">
          <input type="radio" checked={order === "asc"} onChange={() => setOrder("asc")} /> {t("ascending")}
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" checked={order === "desc"} onChange={() => setOrder("desc")} /> {t("descending")}
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} /> {t("dedupe")}
        </label>
        <span className="text-xs text-muted self-center ml-auto">{t("entries", { count: sorted.length })}</span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label">{t("sortedResult")}</label>
          <button onClick={copy} className="text-xs text-gray-500 hover:text-blue-600">📋 {t("copy")}</button>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-950 text-sm space-y-2 max-h-96 overflow-y-auto">
          {sorted.map((line, i) => (
            <div key={i} style={{ paddingLeft: "2em", textIndent: "-2em" }}>
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("note")}
      </div>
    </div>
  );
}
