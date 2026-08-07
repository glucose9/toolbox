"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const STOPWORDS = new Set(["은","는","이","가","을","를","에","의","도","와","과","로","으로","에서","만","the","a","an","and","or","but","is","to","of","in","on","at"]);

function tokenize(text: string): Map<string, number> {
  const tokens = text.toLowerCase().replace(/[.,!?;:"'()[\]{}]/g, " ").split(/\s+/).filter((t) => t.length >= 2 && !STOPWORDS.has(t));
  const map = new Map<string, number>();
  for (const t of tokens) map.set(t, (map.get(t) || 0) + 1);
  return map;
}

export default function WordCloudTool() {
  const t = useTranslations("toolUI.word-cloud");
  const tc = useTranslations("common");
  const [text, setText] = useState("코드 코드 코드 디자인 디자인 사용자 사용자 사용자 사용자 사용자 도구 도구 도구 도구 사이트 사이트");
  const [maxWords, setMaxWords] = useState(50);
  const cloud = useMemo(() => {
    const map = tokenize(text);
    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, maxWords);
    if (sorted.length === 0) return [];
    const max = sorted[0][1];
    const min = sorted[sorted.length - 1][1];
    return sorted.map(([word, count]) => ({
      word, count, size: 14 + ((count - min) / Math.max(1, max - min)) * 50,
    }));
  }, [text, maxWords]);
  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <div className="border border-gray-200 dark:border-gray-700 rounded p-6 bg-white dark:bg-gray-900 flex flex-wrap gap-3 items-center justify-center min-h-48">
        {cloud.map((w, i) => (
          <span key={i} style={{ fontSize: `${w.size}px`, color: `hsl(${(i * 47) % 360}, 60%, 50%)` }} title={t("occurrences", { count: w.count })}>{w.word}</span>
        ))}
      </div>
      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <label className="text-sm">{t("maxWords")} ({maxWords})<input type="range" min="10" max="200" value={maxWords} onChange={(e) => setMaxWords(+e.target.value)} className="w-full" /></label>
        </div>
      </details>
    </div>
  );
}
