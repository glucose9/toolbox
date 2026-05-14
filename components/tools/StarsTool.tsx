"use client";
import { useState } from "react";

function stars(score: number, max: number): string {
  const ratio = (score / max) * 5;
  const full = Math.floor(ratio);
  const half = ratio - full >= 0.5;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(Math.max(0, 5 - full - (half ? 1 : 0)));
}

export default function StarsTool() {
  const [score, setScore] = useState(4.5);
  const [max, setMax] = useState(5);
  const display = stars(score, max);
  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">점수</label><input type="number" step="0.1" value={score} onChange={(e) => setScore(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">만점</label><input type="number" value={max} onChange={(e) => setMax(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
      </div>
      <div className="p-6 text-center bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded">
        <div className="text-5xl text-yellow-500">{display}</div>
        <div className="mt-2 text-sm">{score} / {max} ({((score/max)*100).toFixed(0)}%)</div>
      </div>
      <button onClick={() => navigator.clipboard.writeText(display)} className="btn btn-primary">복사</button>
    </div>
  );
}
