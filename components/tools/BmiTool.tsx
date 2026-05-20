"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function BmiTool() {
  const t = useTranslations("toolUI.bmi");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);

  function categorize(bmi: number): { label: string; color: string; range: string } {
    if (bmi < 18.5) return { label: t("underweight"), color: "text-blue-600", range: "< 18.5" };
    if (bmi < 23) return { label: t("normal"), color: "text-green-600", range: "18.5 ~ 22.9" };
    if (bmi < 25) return { label: t("overweight"), color: "text-yellow-600", range: "23 ~ 24.9" };
    if (bmi < 30) return { label: t("obese1"), color: "text-orange-600", range: "25 ~ 29.9" };
    return { label: t("severelyObese"), color: "text-red-600", range: "≥ 30" };
  }

  const m = height / 100;
  const bmi = weight / (m * m);
  const cat = isFinite(bmi) && bmi > 0 ? categorize(bmi) : null;

  const idealMin = 18.5 * m * m;
  const idealMax = 22.9 * m * m;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{t("heightCm")}</label>
          <input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        <div>
          <label className="label">{t("weightKg")}</label>
          <input type="number" value={weight} onChange={(e) => setWeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
      </div>

      {cat && (
        <>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
            <div className="text-xs text-muted">{t("bmiIndex")}</div>
            <div className="text-4xl font-bold mt-1">{bmi.toFixed(1)}</div>
            <div className={`text-lg font-medium mt-2 ${cat.color}`}>{cat.label}</div>
            <div className="text-xs text-muted mt-1">{cat.range}</div>
          </div>

          <div className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded">
            <strong>{t("idealRangeLabel", { height })}</strong> {idealMin.toFixed(1)} ~ {idealMax.toFixed(1)} kg
          </div>

          <div className="text-xs text-muted space-y-1">
            <div className="flex justify-between"><span>{t("underweight")}</span><span>&lt; 18.5</span></div>
            <div className="flex justify-between"><span>{t("normal")}</span><span>18.5 ~ 22.9</span></div>
            <div className="flex justify-between"><span>{t("overweight")}</span><span>23 ~ 24.9</span></div>
            <div className="flex justify-between"><span>{t("obese1Short")}</span><span>25 ~ 29.9</span></div>
            <div className="flex justify-between"><span>{t("severelyObese")}</span><span>≥ 30</span></div>
          </div>
          <div className="text-xs text-muted">{t("whoNote")}</div>
        </>
      )}
    </div>
  );
}
