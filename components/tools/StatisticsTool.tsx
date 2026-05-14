"use client";
import { useMemo, useState } from "react";

function parse(t: string): number[] {
  return t.split(/[,\s\n]+/).map(Number).filter((n) => !isNaN(n));
}

const fmt = (n: number) => isFinite(n) ? n.toFixed(4).replace(/\.?0+$/, "") : "—";

export default function StatisticsTool() {
  const [text, setText] = useState("12, 15, 22, 8, 19, 25, 13, 17, 21, 16");
  const stats = useMemo(() => {
    const nums = parse(text);
    const n = nums.length;
    if (n === 0) return null;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((s, x) => s + x, 0);
    const mean = sum / n;
    const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
    const counts = new Map<number, number>();
    for (const x of nums) counts.set(x, (counts.get(x) || 0) + 1);
    const maxCount = Math.max(...counts.values());
    const mode = [...counts.entries()].filter(([, c]) => c === maxCount).map(([k]) => k);
    const variance = nums.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
    const stdPop = Math.sqrt(variance);
    const stdSample = Math.sqrt(nums.reduce((s, x) => s + (x - mean) ** 2, 0) / Math.max(1, n - 1));
    const q1 = sorted[Math.floor(n * 0.25)];
    const q3 = sorted[Math.floor(n * 0.75)];
    return { n, sum, mean, median, mode, min: sorted[0], max: sorted[n - 1], range: sorted[n - 1] - sorted[0], variance, stdPop, stdSample, q1, q3, iqr: q3 - q1 };
  }, [text]);
  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="숫자들을 줄/쉼표/공백으로 구분해 입력" className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-sm resize-y" />
      {stats && (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="py-2 pr-3 text-muted">개수 (n)</td><td className="font-mono">{stats.n}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">합계</td><td className="font-mono">{fmt(stats.sum)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">평균</td><td className="font-mono">{fmt(stats.mean)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">중앙값</td><td className="font-mono">{fmt(stats.median)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">최빈값</td><td className="font-mono">{stats.mode.join(", ")}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">최소 / 최대</td><td className="font-mono">{fmt(stats.min)} / {fmt(stats.max)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">범위</td><td className="font-mono">{fmt(stats.range)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">분산</td><td className="font-mono">{fmt(stats.variance)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">표준편차 (모집단)</td><td className="font-mono">{fmt(stats.stdPop)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">표준편차 (표본)</td><td className="font-mono">{fmt(stats.stdSample)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">Q1 / Q3 / IQR</td><td className="font-mono">{fmt(stats.q1)} / {fmt(stats.q3)} / {fmt(stats.iqr)}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
