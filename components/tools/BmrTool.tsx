"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function BmrTool() {
  const t = useTranslations("toolUI.bmr");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [actIdx, setActIdx] = useState(1);

  const ACTIVITY = [
    { label: t("activity1"), mult: 1.2 },
    { label: t("activity2"), mult: 1.375 },
    { label: t("activity3"), mult: 1.55 },
    { label: t("activity4"), mult: 1.725 },
    { label: t("activity5"), mult: 1.9 },
  ];

  // Mifflin-St Jeor
  const bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * ACTIVITY[actIdx].mult;

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setGender("male")} className={`btn flex-1 ${gender === "male" ? "btn-primary" : "btn-secondary"}`}>{t("male")}</button>
        <button onClick={() => setGender("female")} className={`btn flex-1 ${gender === "female" ? "btn-primary" : "btn-secondary"}`}>{t("female")}</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="label">{t("age")}</label><input type="number" value={age} onChange={(e) => setAge(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">{t("heightCm")}</label><input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">{t("weightKg")}</label><input type="number" value={weight} onChange={(e) => setWeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
      </div>
      <div>
        <label className="label">{t("activityLevel")}</label>
        <select value={actIdx} onChange={(e) => setActIdx(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
          {ACTIVITY.map((a, i) => <option key={i} value={i}>{a.label} (×{a.mult})</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("bmrLabel")}</div>
          <div className="text-xl font-bold mt-1">{Math.round(bmr)} kcal</div>
        </div>
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("tdeeLabel")}</div>
          <div className="text-xl font-bold mt-1">{Math.round(tdee)} kcal</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-muted">{t("cut")}</div><div className="font-bold">{Math.round(tdee - 500)} kcal</div></div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-muted">{t("maintain")}</div><div className="font-bold">{Math.round(tdee)} kcal</div></div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-muted">{t("bulk")}</div><div className="font-bold">{Math.round(tdee + 500)} kcal</div></div>
      </div>
    </div>
  );
}
