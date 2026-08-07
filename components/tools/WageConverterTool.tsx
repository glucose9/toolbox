"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// 2026 Korean minimum wage (confirmed: 10,320 KRW/h)
const KR_MIN_WAGE_2026 = 10320;

export default function WageConverterTool() {
  const t = useTranslations("toolUI.wage-converter");
  const [hourlyHours, setHourlyHours] = useState(40);
  const [hourly, setHourly] = useState<number>(KR_MIN_WAGE_2026);

  const holidayHours = Math.min(hourlyHours / 40, 1) * 8; // 주휴 = (주 소정근로/40)×8h, 상한 8h
  const paidWeeklyHours = hourlyHours + holidayHours;
  const monthlyHours = paidWeeklyHours * (209 / 48); // 209h/month at 40h/week incl. weekly holiday pay
  const monthly = hourly * monthlyHours;
  const daily = hourly * 8;
  const weekly = hourly * paidWeeklyHours;
  const annual = monthly * 12;

  const setFrom = (val: number, kind: "h" | "d" | "w" | "m" | "y") => {
    if (kind === "h") setHourly(val);
    else if (kind === "d") setHourly(val / 8);
    else if (kind === "w") setHourly(val / paidWeeklyHours);
    else if (kind === "m") setHourly(val / monthlyHours);
    else if (kind === "y") setHourly(val / (monthlyHours * 12));
  };

  const row = (
    label: string,
    value: number,
    kind: "h" | "d" | "w" | "m" | "y",
    note?: string,
    variant: "input" | "result" | "highlight" = "result",
  ) => {
    const rowClass =
      variant === "highlight"
        ? "grid grid-cols-3 items-center gap-2 py-2 px-2 -mx-2 my-1 rounded border border-brand-500/40 bg-brand-50 dark:bg-brand-600/10"
        : "grid grid-cols-3 items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700";
    const labelClass =
      variant === "highlight"
        ? "text-sm font-semibold text-brand-700 dark:text-brand-500"
        : "text-sm font-medium";
    const inputClass =
      variant === "input"
        ? "col-span-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-right font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        : variant === "highlight"
          ? "col-span-1 px-3 py-1.5 border border-transparent rounded bg-transparent text-right font-mono font-semibold text-brand-700 dark:text-brand-500 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900"
          : "col-span-1 px-3 py-1.5 border border-transparent rounded bg-transparent text-right font-mono focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-900";
    return (
      <div className={rowClass}>
        <div className={labelClass}>{label}</div>
        <input
          type="number"
          value={Math.round(value) || ""}
          onChange={(e) => setFrom(+e.target.value, kind)}
          className={inputClass}
        />
        <div className="text-xs text-muted">{note || t("krw")}</div>
      </div>
    );
  };

  return (
    <div className="card space-y-3">
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
        <label>
          {t("weeklyHours", { n: hourlyHours })}
          <input type="range" min="15" max="68" value={hourlyHours} onChange={(e) => setHourlyHours(+e.target.value)} className="w-full mt-1" />
        </label>
        <div className="text-xs text-muted mt-1">{t("monthlyHoursFormula", { weekly: hourlyHours, monthly: Math.round(monthlyHours) })}</div>
      </div>

      <div>
        {row(t("hourly"), hourly, "h", undefined, "input")}
        {row(t("daily"), daily, "d", t("krwDaily"))}
        {row(t("weekly"), weekly, "w", t("krwWeekly", { n: Math.round(paidWeeklyHours) }))}
        {row(t("monthly"), monthly, "m", t("krwMonthly", { n: Math.round(monthlyHours) }), "highlight")}
        {row(t("annual"), annual, "y", t("krw"))}
      </div>

      <div className="text-xs text-muted bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
        {t.rich("note", { minWage: KR_MIN_WAGE_2026.toLocaleString(), hourly: hourly.toLocaleString(), pct: Math.round((hourly / KR_MIN_WAGE_2026) * 100), strong: (c) => <strong>{c}</strong> })}
      </div>
    </div>
  );
}
