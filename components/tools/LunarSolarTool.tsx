"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import KoreanLunarCalendar from "korean-lunar-calendar";

type Dir = "solar-to-lunar" | "lunar-to-solar";

function fmt(d: { year: number; month: number; day: number }) {
  return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

export default function LunarSolarTool() {
  const t = useTranslations("toolUI.lunar-solar");
  const [dir, setDir] = useState<Dir>("solar-to-lunar");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5);
  const [day, setDay] = useState(14);
  const [intercalation, setIntercalation] = useState(false);

  const { result, error } = useMemo(() => {
    try {
      const cal = new KoreanLunarCalendar();
      if (dir === "solar-to-lunar") {
        if (!cal.setSolarDate(year, month, day)) return { result: null, error: t("errorSolar") };
        const lunar = cal.getLunarCalendar();
        const gapja = cal.getKoreanGapja();
        return { result: { date: lunar, gapja }, error: "" };
      } else {
        if (!cal.setLunarDate(year, month, day, intercalation)) return { result: null, error: t("errorLunar") };
        const solar = cal.getSolarCalendar();
        const gapja = cal.getKoreanGapja();
        return { result: { date: solar, gapja }, error: "" };
      }
    } catch (e) {
      return { result: null, error: (e as Error).message };
    }
  }, [dir, year, month, day, intercalation, t]);

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setDir("solar-to-lunar")} className={`btn ${dir === "solar-to-lunar" ? "btn-primary" : "btn-secondary"}`}>{t("solarToLunar")}</button>
        <button onClick={() => setDir("lunar-to-solar")} className={`btn ${dir === "lunar-to-solar" ? "btn-primary" : "btn-secondary"}`}>{t("lunarToSolar")}</button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="label">{t("year")}</label>
          <input type="number" min="1391" max="2050" value={year} onChange={(e) => setYear(+e.target.value)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="label">{t("month")}</label>
          <input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(+e.target.value)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="label">{t("day")}</label>
          <input type="number" min="1" max="31" value={day} onChange={(e) => setDay(+e.target.value)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      {dir === "lunar-to-solar" && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={intercalation} onChange={(e) => setIntercalation(e.target.checked)} />
          {t("intercalation")}
        </label>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      {result && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4">
          <div className="text-xs text-muted">{dir === "solar-to-lunar" ? t("lunarResult") : t("solarResult")}</div>
          <div className="text-2xl font-bold mt-1">
            {fmt(result.date)}
            {result.date.intercalation && <span className="text-base font-normal text-muted ml-2">{t("leapMonth")}</span>}
          </div>
          <div className="text-sm mt-2">
            <span className="text-muted">{t("gapja")}:</span> {result.gapja.year}{t("yearUnit")} {result.gapja.month}{t("monthUnit")} {result.gapja.day}{t("dayUnit")}
          </div>
        </div>
      )}

      <div className="text-xs text-muted">{t("footer")}</div>
    </div>
  );
}
