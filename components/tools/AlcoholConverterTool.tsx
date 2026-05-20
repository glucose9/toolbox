"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const DRINK_KEYS = [
  { key: "soju", abv: 16.5, vol: 50 },
  { key: "beer", abv: 4.5, vol: 500 },
  { key: "wine", abv: 12, vol: 150 },
  { key: "makgeolli", abv: 6, vol: 250 },
  { key: "whiskey", abv: 40, vol: 30 },
  { key: "vodka", abv: 40, vol: 30 },
];

export default function AlcoholConverterTool() {
  const t = useTranslations("toolUI.alcohol-converter");
  const [fromIdx, setFromIdx] = useState(0);
  const [count, setCount] = useState(3);

  const baseAlc = (DRINK_KEYS[fromIdx].abv / 100) * DRINK_KEYS[fromIdx].vol * count;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{t("baseDrink")}</label>
          <select value={fromIdx} onChange={(e) => setFromIdx(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            {DRINK_KEYS.map((d, i) => <option key={d.key} value={i}>{t(`drink_${d.key}`)} ({d.abv}%)</option>)}
          </select>
        </div>
        <div>
          <label className="label">{t("glassCount")}</label>
          <input type="number" min="1" max="50" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
      </div>
      <div className="text-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-3">
        <div className="text-xs text-muted">{t("pureAlcohol")}</div>
        <div className="text-2xl font-bold">{baseAlc.toFixed(1)} ml</div>
      </div>
      <div className="space-y-1 text-sm">
        <div className="font-medium mb-1">{t("equivalent")}</div>
        {DRINK_KEYS.map((d, i) => {
          if (i === fromIdx) return null;
          const eqCount = baseAlc / ((d.abv / 100) * d.vol);
          return (
            <div key={d.key} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
              <span>{t(`drink_${d.key}`)}</span>
              <span className="font-mono" dangerouslySetInnerHTML={{ __html: t("glasses", { count: eqCount.toFixed(1) }) }} />
            </div>
          );
        })}
      </div>
      <div className="text-xs text-muted bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">{t("warning")}</div>
    </div>
  );
}
