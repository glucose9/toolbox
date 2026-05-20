"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CronExpressionParser } from "cron-parser";

export default function CronParserTool() {
  const t = useTranslations("toolUI.cron-parser");
  const PRESETS = [
    { label: t("presetEveryMinute"), expr: "* * * * *" },
    { label: t("presetHourly"), expr: "0 * * * *" },
    { label: t("presetDailyMidnight"), expr: "0 0 * * *" },
    { label: t("presetMonday9"), expr: "0 9 * * 1" },
    { label: t("presetMonthly1"), expr: "0 0 1 * *" },
    { label: t("presetWeekday9"), expr: "0 9 * * 1-5" },
    { label: t("preset15Min"), expr: "*/15 * * * *" },
  ];

  function describe(expr: string): string {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5 && parts.length !== 6) return t("formatError");
    const [...rest] = parts.length === 6 ? parts : ["0", ...parts];
    const [sec, min, hour, dom, mon, dow] = rest;
    const desc: string[] = [];
    desc.push(min === "*" ? t("everyMinute") : t("minute", { val: min }));
    desc.push(hour === "*" ? t("everyHour") : t("hour", { val: hour }));
    if (dom !== "*") desc.push(t("dayOfMonth", { val: dom }));
    if (mon !== "*") desc.push(t("month", { val: mon }));
    if (dow !== "*") desc.push(t("dayOfWeek", { val: dow }));
    if (parts.length === 6 && sec !== "0") desc.push(t("second", { val: sec }));
    return desc.join(", ");
  }

  const [expr, setExpr] = useState("0 9 * * 1-5");

  const { description, next, error } = useMemo(() => {
    try {
      const iter = CronExpressionParser.parse(expr);
      const list: string[] = [];
      for (let i = 0; i < 10; i++) {
        list.push(iter.next().toDate().toLocaleString());
      }
      return { description: describe(expr), next: list, error: "" };
    } catch (e) {
      return { description: "", next: [], error: (e as Error).message };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expr]);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("expressionLabel")}</label>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder={t("expressionPlaceholder")}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 text-xs">
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => setExpr(p.expr)} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            {p.label}
          </button>
        ))}
      </div>

      {error ? (
        <div className="text-sm text-red-600">❌ {error}</div>
      ) : (
        <>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-3 text-sm">
            <div className="text-xs text-muted">{t("meaning")}</div>
            <div className="font-medium">{description}</div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">{t("nextRuns")}</div>
            <ol className="text-sm font-mono space-y-0.5 bg-gray-50 dark:bg-gray-900 p-3 rounded">
              {next.map((tm, i) => (
                <li key={i}>
                  <span className="text-muted">{i + 1}.</span> {tm}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
