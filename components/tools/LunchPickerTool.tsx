"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const PRESETS: Record<string, string[]> = {
  한식: ["김치찌개", "된장찌개", "비빔밥", "불고기", "삼겹살", "갈비탕", "냉면", "칼국수", "순두부찌개", "제육볶음", "감자탕", "닭갈비"],
  중식: ["짜장면", "짬뽕", "탕수육", "마라탕", "마파두부", "양장피", "깐풍기"],
  일식: ["초밥", "라멘", "돈카츠", "우동", "규동", "오므라이스", "텐동"],
  양식: ["파스타", "피자", "스테이크", "햄버거", "샐러드", "리조또"],
  분식: ["떡볶이", "김밥", "라볶이", "쫄면", "어묵", "튀김"],
};

export default function LunchPickerTool() {
  const t = useTranslations("toolUI.lunch-picker");
  const tc = useTranslations("common");
  const [category, setCategory] = useState("한식");
  const [custom, setCustom] = useState("");
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);

  const hasCustom = custom.trim().length > 0;
  const pool = hasCustom ? custom.split(/[\n,]/).map((s) => s.trim()).filter(Boolean) : PRESETS[category];

  const pick = () => {
    if (pool.length === 0) return;
    setSpinning(true);
    let frames = 0;
    const id = setInterval(() => {
      const idx = crypto.getRandomValues(new Uint32Array(1))[0] % pool.length;
      setResult(pool[idx]);
      frames++;
      if (frames > 15) { clearInterval(id); setSpinning(false); }
    }, 60);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2">
        {Object.keys(PRESETS).map((c) => (
          <button key={c} onClick={() => { setCategory(c); setCustom(""); }} disabled={hasCustom} className={`btn ${category === c && !hasCustom ? "btn-primary" : "btn-secondary"} disabled:opacity-40 disabled:cursor-not-allowed`}>{c}</button>
        ))}
      </div>
      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <label className="label">{t("customLabel")}</label>
          <textarea value={custom} onChange={(e) => setCustom(e.target.value)} placeholder={t("customPlaceholder")} className="w-full h-24 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </details>
      <button onClick={pick} disabled={spinning || pool.length === 0} className="btn btn-primary w-full disabled:opacity-50">{spinning ? t("spinning") : t("pickButton")}</button>
      {result && (
        <div className={`bg-brand-50 dark:bg-brand-900/20 border-2 border-brand-500 rounded p-8 text-center ${spinning ? "animate-pulse" : ""}`}>
          <div className="text-xs text-muted">{t("todaysMenu")}</div>
          <div className="text-4xl font-bold mt-2">{result}</div>
        </div>
      )}
      <div className="text-xs text-muted">{t("hint", { n: pool.length })}</div>
    </div>
  );
}
