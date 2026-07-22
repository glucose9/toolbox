"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

// 에탄올 밀도 0.789 g/mL — 국립과학수사연구원 「혈중알코올농도 계산 지침」(2024 v1.0) §5.3
const ETHANOL_DENSITY = 0.789;

// 용량은 국과수 지침 부록C 표2 「술잔의 기준 부피」의 '음주량'(실제 따르는 양) 기준.
// 소주잔 48mL, 맥주잔 168mL, 500cc 생맥주잔 425mL.
type Drink = { key: string; abv: number; vol: number };
const DRINKS: Drink[] = [
  { key: "soju", abv: 15.7, vol: 48 },
  { key: "sojuStrong", abv: 20.1, vol: 48 },
  { key: "beerGlass", abv: 4.5, vol: 168 },
  { key: "beerDraft", abv: 4.5, vol: 425 },
  { key: "beerCan", abv: 4.5, vol: 355 },
  { key: "makgeolli", abv: 6, vol: 200 },
  { key: "cheongju", abv: 14, vol: 90 },
  { key: "wine", abv: 12, vol: 150 },
  { key: "highball", abv: 7, vol: 350 },
  { key: "whiskey", abv: 40, vol: 30 },
  { key: "vodka", abv: 40, vol: 30 },
];

// 표준잔 정의(1잔당 순알코올 g). 한국은 보건복지부 7g, 그 외는 각국 공식 기준.
const STANDARD_DRINKS = [
  { key: "kr", grams: 7 },
  { key: "who", grams: 10 },
  { key: "uk", grams: 8 },
  { key: "us", grams: 14 },
];

// 1회 저위험 음주량(순알코올 g) — 한국건강증진개발원·WHO 공통 수준
const LOW_RISK = { male: 40, female: 20 };

export default function AlcoholConverterTool() {
  const t = useTranslations("toolUI.alcohol-converter");
  const [fromIdx, setFromIdx] = useState(0);
  const [count, setCount] = useState(3);
  const [custom, setCustom] = useState(false);
  const [customAbv, setCustomAbv] = useState(17);
  const [customVol, setCustomVol] = useState(50);
  const [sex, setSex] = useState<"male" | "female">("male");

  const base = custom
    ? { abv: customAbv, vol: customVol }
    : { abv: DRINKS[fromIdx].abv, vol: DRINKS[fromIdx].vol };

  const { alcoholMl, alcoholG, limitPct } = useMemo(() => {
    const n = Number.isFinite(count) && count > 0 ? count : 0;
    const abv = Number.isFinite(base.abv) && base.abv > 0 ? base.abv : 0;
    const vol = Number.isFinite(base.vol) && base.vol > 0 ? base.vol : 0;
    const ml = (abv / 100) * vol * n;
    const g = ml * ETHANOL_DENSITY;
    return { alcoholMl: ml, alcoholG: g, limitPct: (g / LOW_RISK[sex]) * 100 };
  }, [base.abv, base.vol, count, sex]);

  const barPct = Math.min(100, limitPct);
  const overLimit = limitPct > 100;

  return (
    <div className="card space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="label">{t("baseDrink")}</label>
          {custom ? (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={customAbv}
                  onChange={(e) => setCustomAbv(+e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
                <div className="text-xs text-muted mt-1">{t("customAbv")}</div>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={customVol}
                  onChange={(e) => setCustomVol(+e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
                <div className="text-xs text-muted mt-1">{t("customVol")}</div>
              </div>
            </div>
          ) : (
            <select
              value={fromIdx}
              onChange={(e) => setFromIdx(+e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            >
              {DRINKS.map((d, i) => (
                <option key={d.key} value={i}>
                  {t(`drink_${d.key}`)} · {d.abv}% · {d.vol}ml
                </option>
              ))}
            </select>
          )}
          <button
            onClick={() => setCustom((v) => !v)}
            className="mt-2 text-xs text-brand-600 hover:underline"
          >
            {custom ? t("usePreset") : t("useCustom")}
          </button>
        </div>
        <div>
          <label className="label">{t("glassCount")}</label>
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(+e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
          <div className="text-xs text-muted mt-1">
            {t("totalVolume", { ml: Math.round(base.vol * (count > 0 ? count : 0)) })}
          </div>
        </div>
      </div>

      <div className="text-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-3">
        <div className="text-xs text-muted">{t("pureAlcohol")}</div>
        <div className="text-2xl font-bold">{alcoholG.toFixed(1)} g</div>
        <div className="text-xs text-muted mt-1">{t("alcoholMl", { ml: alcoholMl.toFixed(1) })}</div>
      </div>

      <div>
        <div className="font-medium text-sm mb-2">{t("standardDrinks")}</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STANDARD_DRINKS.map((s) => (
            <div
              key={s.key}
              className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700"
            >
              <div className="text-xs text-muted">{t(`std_${s.key}`)}</div>
              <div className="font-bold">{(alcoholG / s.grams).toFixed(1)}</div>
              <div className="text-[11px] text-muted">{t("gramsPerDrink", { g: s.grams })}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">{t("lowRiskTitle")}</span>
          <div className="flex gap-1 text-xs">
            {(["male", "female"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSex(s)}
                className={`px-2 py-1 rounded border ${
                  sex === s
                    ? "border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                {t(`sex_${s}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${overLimit ? "bg-red-500" : "bg-green-500"}`}
            style={{ width: `${barPct}%` }}
          />
        </div>
        <div className={`mt-1 text-sm ${overLimit ? "text-red-600 font-medium" : "text-muted"}`}>
          {t("lowRiskCompare", { pct: Math.round(limitPct), limit: LOW_RISK[sex] })}
        </div>
        <div className="text-xs text-muted mt-1">{t("flushNote")}</div>
      </div>

      <div className="space-y-1 text-sm">
        <div className="font-medium mb-1">{t("equivalent")}</div>
        {DRINKS.map((d, i) => {
          if (!custom && i === fromIdx) return null;
          const per = (d.abv / 100) * d.vol;
          const eqCount = per > 0 ? alcoholMl / per : 0;
          return (
            <div
              key={d.key}
              className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded"
            >
              <span>
                {t(`drink_${d.key}`)}{" "}
                <span className="text-xs text-muted">
                  {d.abv}% · {d.vol}ml
                </span>
              </span>
              <span className="font-mono">
                {t.rich("glasses", {
                  count: eqCount.toFixed(1),
                  strong: (c) => <strong>{c}</strong>,
                })}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-muted bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
        {t("warning")}
      </div>
      <div className="text-[11px] text-muted leading-relaxed">{t("sourceNote")}</div>
    </div>
  );
}
