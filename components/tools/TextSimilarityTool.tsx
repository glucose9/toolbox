"use client";
import { useMemo, useState } from "react";

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n; if (n === 0) return m;
  const prev = new Array(n + 1).fill(0);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    let cur = i;
    for (let j = 1; j <= n; j++) {
      const c = Math.min(prev[j] + 1, cur + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev[j - 1] = cur; cur = c;
    }
    prev[n] = cur;
  }
  return prev[n];
}

export default function TextSimilarityTool() {
  const [a, setA] = useState("hello world");
  const [b, setB] = useState("hallo word");
  const { dist, sim } = useMemo(() => {
    const d = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length) || 1;
    return { dist: d, sim: ((1 - d / maxLen) * 100).toFixed(1) };
  }, [a, b]);
  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <textarea value={a} onChange={(e) => setA(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
        <textarea value={b} onChange={(e) => setB(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">편집 거리</div><div className="text-2xl font-bold">{dist}</div></div>
        <div className="p-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-500 rounded text-center"><div className="text-xs text-muted">유사도</div><div className="text-2xl font-bold">{sim}%</div></div>
      </div>
    </div>
  );
}
