"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function BookReadingTimeTool() {
  const t = useTranslations("toolUI.book-reading-time");
  const [pages, setPages] = useState(300);
  const [minPerPage, setMinPerPage] = useState(2);
  const [dailyMin, setDailyMin] = useState(30);

  const fmt = (min: number): string => {
    if (min < 60) return t("minutes", { n: Math.round(min) });
    const h = Math.floor(min / 60), m = Math.round(min % 60);
    return m > 0 ? t("hoursMinutes", { h, m }) : t("hours", { h });
  };

  const totalMin = pages * minPerPage;
  const daysToFinish = Math.ceil(totalMin / dailyMin);
  const totalHours = totalMin / 60;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">{t("totalPages")}</label><input type="number" value={pages} onChange={(e) => setPages(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">{t("minPerPage", { n: minPerPage })}</label><input type="range" min="0.5" max="5" step="0.1" value={minPerPage} onChange={(e) => setMinPerPage(+e.target.value)} className="w-full" /></div>
      </div>
      <div>
        <label className="label">{t("dailyMin", { n: dailyMin })}</label>
        <input type="range" min="10" max="180" step="5" value={dailyMin} onChange={(e) => setDailyMin(+e.target.value)} className="w-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("totalTime")}</div>
          <div className="text-xl font-bold mt-1">{fmt(totalMin)}</div>
          <div className="text-xs text-muted">{t("approxHours", { h: totalHours.toFixed(1) })}</div>
        </div>
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("toFinish")}</div>
          <div className="text-xl font-bold mt-1">{t("days", { n: daysToFinish })}</div>
          <div className="text-xs text-muted">{t("dailyBasis", { n: dailyMin })}</div>
        </div>
      </div>
      <div className="text-xs text-muted">{t("hint")}</div>
    </div>
  );
}
