"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function SeverancePayTool() {
  const t = useTranslations("toolUI.severance-pay");
  const locale = useLocale();
  const [years, setYears] = useState(5);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [avgWage3M, setAvgWage3M] = useState(3_500_000);
  const [annualBonus, setAnnualBonus] = useState(0);
  const [annualLeavePay, setAnnualLeavePay] = useState(0);

  const result = useMemo(() => {
    const totalDays = years * 365 + months * 30 + days;
    if (totalDays < 365) {
      return { eligible: false, totalDays, dailyAvg: 0, severance: 0, bonusAdded: 0, leaveAdded: 0 };
    }
    const days3M = 90;
    const bonusAdded = (annualBonus * 3) / 12;
    const leaveAdded = (annualLeavePay * 3) / 12;
    const wage3M = avgWage3M * 3 + bonusAdded + leaveAdded;
    const dailyAvg = wage3M / days3M;
    const severance = dailyAvg * 30 * (totalDays / 365);
    return {
      eligible: true,
      totalDays,
      dailyAvg,
      severance,
      bonusAdded,
      leaveAdded,
    };
  }, [years, months, days, avgWage3M, annualBonus, annualLeavePay]);

  const fmt = (n: number) => Math.round(n).toLocaleString(locale);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("tenure")}</label>
        <div className="grid grid-cols-3 gap-2">
          <input type="number" min={0} value={years} onChange={(e) => setYears(+e.target.value)} placeholder={t("years")} className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <input type="number" min={0} max={11} value={months} onChange={(e) => setMonths(+e.target.value)} placeholder={t("months")} className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <input type="number" min={0} max={30} value={days} onChange={(e) => setDays(+e.target.value)} placeholder={t("days")} className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        <div className="text-xs text-muted mt-1">{t("totalDays", { days: result.totalDays })}</div>
      </div>

      <label className="block text-sm">
        {t("avgWageLabel")}
        <input
          type="number"
          value={avgWage3M}
          onChange={(e) => setAvgWage3M(+e.target.value)}
          className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
        />
        <div className="text-xs text-muted mt-1">{t("avgWageNote", { amount: fmt(avgWage3M) })}</div>
      </label>

      <details>
        <summary className="text-sm cursor-pointer text-blue-600">▾ {t("bonusToggle")}</summary>
        <div className="space-y-2 mt-2 text-sm">
          <label className="block">
            {t("annualBonusLabel")}
            <input
              type="number"
              value={annualBonus}
              onChange={(e) => setAnnualBonus(+e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            />
            <div className="text-xs text-muted">{t("annualBonusNote")}</div>
          </label>
          <label className="block">
            {t("annualLeaveLabel")}
            <input
              type="number"
              value={annualLeavePay}
              onChange={(e) => setAnnualLeavePay(+e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            />
            <div className="text-xs text-muted">{t("annualLeaveNote")}</div>
          </label>
        </div>
      </details>

      <div className="card-section space-y-1 text-sm">
        {!result.eligible ? (
          <div className="text-amber-600">
            ⚠️ {t("ineligible")}
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <span>{t("dailyAvg")}</span>
              <span>{t("krwAmount", { amount: fmt(result.dailyAvg) })}</span>
            </div>
            <div className="text-xs text-muted">{t("dailyAvgFormula", { bonus: fmt(result.bonusAdded), leave: fmt(result.leaveAdded) })}</div>
            <div className="flex justify-between mt-2">
              <span>{t("yearsFactor")}</span>
              <span>{(result.totalDays / 365).toFixed(2)}{t("yearSuffix")}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>{t("estimatedSeverance")}</span>
              <span className="text-blue-600">{t("krwAmount", { amount: fmt(result.severance) })}</span>
            </div>
            <div className="text-xs text-muted mt-2">{t("pretaxNote")}</div>
          </>
        )}
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 {t("disclaimer")}
      </div>
    </div>
  );
}
