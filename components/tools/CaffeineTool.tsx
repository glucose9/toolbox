"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const DRINK_KEYS = [
  { key: "espresso", caffeine: 63 },
  { key: "americano", caffeine: 150 },
  { key: "latte", caffeine: 150 },
  { key: "coldBrew", caffeine: 200 },
  { key: "drip", caffeine: 95 },
  { key: "greenTea", caffeine: 28 },
  { key: "blackTea", caffeine: 47 },
  { key: "cola", caffeine: 34 },
  { key: "energyDrink", caffeine: 80 },
  { key: "darkChocolate", caffeine: 24 },
];

export default function CaffeineTool() {
  const t = useTranslations("toolUI.caffeine");
  const [counts, setCounts] = useState<number[]>(Array(DRINK_KEYS.length).fill(0));

  const total = counts.reduce((s, c, i) => s + c * DRINK_KEYS[i].caffeine, 0);
  const pctOfLimit = (total / 400) * 100;
  const status = total <= 200 ? { text: t("statusSafe"), color: "text-green-600" } : total <= 400 ? { text: t("statusMedium"), color: "text-yellow-600" } : { text: t("statusOver"), color: "text-red-600" };

  return (
    <div className="card space-y-3">
      <div className="space-y-1">
        {DRINK_KEYS.map((d, i) => (
          <div key={d.key} className="flex items-center gap-2 text-sm">
            <span className="flex-1">{t(`drink_${d.key}`)} <span className="text-xs text-muted">({d.caffeine}mg)</span></span>
            <button onClick={() => setCounts((c) => c.map((x, j) => j === i ? Math.max(0, x - 1) : x))} className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-800">−</button>
            <span className="w-8 text-center">{counts[i]}</span>
            <button onClick={() => setCounts((c) => c.map((x, j) => j === i ? x + 1 : x))} className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-800">+</button>
          </div>
        ))}
      </div>
      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
        <div className="text-xs text-muted">{t("todayCaffeine")}</div>
        <div className="text-3xl font-bold mt-1">{total} mg</div>
        <div className={`text-sm font-medium mt-1 ${status.color}`}>{status.text}</div>
        <div className="text-xs text-muted mt-2">{t("limitInfo", { pct: pctOfLimit.toFixed(0) })}</div>
      </div>
      <div className="text-xs text-muted">{t("footer")}</div>
    </div>
  );
}
