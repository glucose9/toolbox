"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function stars(score: number, max: number): string {
  if (!Number.isFinite(score) || !Number.isFinite(max) || max <= 0) return "☆☆☆☆☆";
  const ratio = Math.max(0, Math.min(5, (score / max) * 5));
  // 반 칸 단위 반올림(nearest half): 4.9/5 → ★★★★★ (표시 관례)
  const halves = Math.min(10, Math.round(ratio * 2));
  const full = Math.floor(halves / 2);
  const half = halves % 2 === 1;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(Math.max(0, 5 - full - (half ? 1 : 0)));
}

export default function StarsTool() {
  const t = useTranslations("toolUI.stars");
  const [score, setScore] = useState(4.5);
  const [max, setMax] = useState(5);
  const display = stars(score, max);
  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">{t("score")}</label><input type="number" step="0.1" value={score} onChange={(e) => setScore(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">{t("max")}</label><input type="number" value={max} onChange={(e) => setMax(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
      </div>
      <div className="p-6 text-center bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded">
        <div className="text-5xl text-yellow-500">{display}</div>
        <div className="mt-2 text-sm">{score} / {max} ({((score/max)*100).toFixed(0)}%)</div>
      </div>
      <button onClick={() => navigator.clipboard.writeText(display)} className="btn btn-primary">{t("copy")}</button>
    </div>
  );
}
