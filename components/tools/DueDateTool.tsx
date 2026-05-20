"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type Mode = "lmp" | "conception";
const DAY_MS = 86400000;

function fmt(d: Date): string {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", weekday: "long" });
}

export default function DueDateTool() {
  const t = useTranslations("toolUI.due-date");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  const [mode, setMode] = useState<Mode>("lmp");
  const [date, setDate] = useState(todayStr);

  const trimester = (weeks: number): string => {
    if (weeks < 13) return t("trimester1");
    if (weeks < 27) return t("trimester2");
    return t("trimester3");
  };

  const result = useMemo(() => {
    const d = new Date(date + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    let conceptionDate: Date, dueDate: Date;
    if (mode === "lmp") {
      conceptionDate = new Date(d.getTime() + 14 * DAY_MS);
      dueDate = new Date(d.getTime() + 280 * DAY_MS);
    } else {
      conceptionDate = d;
      dueDate = new Date(d.getTime() + 266 * DAY_MS);
    }
    const daysFromConception = Math.floor((today.getTime() - conceptionDate.getTime()) / DAY_MS);
    const totalDaysPreg = mode === "lmp" ? Math.floor((today.getTime() - d.getTime()) / DAY_MS) : daysFromConception + 14;
    const weeks = Math.floor(totalDaysPreg / 7);
    const days = totalDaysPreg % 7;
    const daysToDue = Math.ceil((dueDate.getTime() - today.getTime()) / DAY_MS);
    return { dueDate, conceptionDate, weeks, days, totalDaysPreg, daysToDue };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, mode]);

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("lmp")} className={`btn ${mode === "lmp" ? "btn-primary" : "btn-secondary"}`}>{t("modeLmp")}</button>
        <button onClick={() => setMode("conception")} className={`btn ${mode === "conception" ? "btn-primary" : "btn-secondary"}`}>{t("modeConception")}</button>
      </div>

      <div>
        <label className="label">{mode === "lmp" ? t("lmpLabel") : t("conceptionLabel")}</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>

      {result && (
        <>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
            <div className="text-xs text-muted">{t("expectedDueDate")}</div>
            <div className="text-2xl font-bold mt-1">{fmt(result.dueDate)}</div>
            {result.daysToDue > 0 && <div className="text-sm text-muted mt-1">D-{result.daysToDue}</div>}
            {result.daysToDue <= 0 && <div className="text-sm text-muted mt-1">{t("pastDue", { n: Math.abs(result.daysToDue) })}</div>}
          </div>

          {result.totalDaysPreg >= 0 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
                <div className="text-xs text-muted">{t("currentWeeks")}</div>
                <div className="text-xl font-bold mt-1">{t("weeksDaysFmt", { w: result.weeks, d: result.days })}</div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
                <div className="text-xs text-muted">{t("trimesterLabel")}</div>
                <div className="text-xl font-bold mt-1">{trimester(result.weeks)}</div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted">
            {t("footer", { date: fmt(result.conceptionDate) })}
          </div>
        </>
      )}
    </div>
  );
}
