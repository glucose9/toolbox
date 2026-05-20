"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Mode = "lumpsum" | "monthly";

const fmt = (n: number) => (isFinite(n) ? Math.round(n).toLocaleString() : "—");

export default function CompoundTool() {
  const t = useTranslations("toolUI.compound");
  const [mode, setMode] = useState<Mode>("lumpsum");
  const [principal, setPrincipal] = useState(10000000);
  const [monthly, setMonthly] = useState(500000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(5);
  const [compoundPerYear, setCompoundPerYear] = useState(12);

  let total = 0;
  let totalContrib = 0;
  if (mode === "lumpsum") {
    const n = compoundPerYear;
    const yrs = years;
    total = principal * Math.pow(1 + rate / 100 / n, n * yrs);
    totalContrib = principal;
  } else {
    const monthRate = rate / 100 / 12;
    const months = years * 12;
    // future value of annuity
    total = monthly * ((Math.pow(1 + monthRate, months) - 1) / monthRate) * (1 + monthRate);
    totalContrib = monthly * months;
  }
  const interest = total - totalContrib;

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("lumpsum")} className={`btn ${mode === "lumpsum" ? "btn-primary" : "btn-secondary"}`}>{t("lumpsum")}</button>
        <button onClick={() => setMode("monthly")} className={`btn ${mode === "monthly" ? "btn-primary" : "btn-secondary"}`}>{t("monthly")}</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mode === "lumpsum" ? (
          <div>
            <label className="label">{t("principalWon")}</label>
            <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          </div>
        ) : (
          <div>
            <label className="label">{t("monthlyDeposit")}</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          </div>
        )}
        <div>
          <label className="label">{t("annualRate")}</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        <div>
          <label className="label">{t("periodYears")}</label>
          <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        {mode === "lumpsum" && (
          <div>
            <label className="label">{t("compoundFrequency")}</label>
            <select value={compoundPerYear} onChange={(e) => setCompoundPerYear(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              <option value="1">{t("freqAnnual")}</option>
              <option value="2">{t("freqSemi")}</option>
              <option value="4">{t("freqQuarterly")}</option>
              <option value="12">{t("freqMonthly")}</option>
              <option value="365">{t("freqDaily")}</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("totalContrib")}</div>
          <div className="text-lg font-bold mt-1">{fmt(totalContrib)}</div>
        </div>
        <div className="border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("interestPreTax")}</div>
          <div className="text-lg font-bold mt-1 text-green-700 dark:text-green-300">+{fmt(interest)}</div>
        </div>
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("maturity")}</div>
          <div className="text-lg font-bold mt-1">{fmt(total)}</div>
        </div>
      </div>

      <div className="text-xs text-muted">
        {t("taxNote", { net: fmt(total - interest * 0.154) })}
      </div>
    </div>
  );
}
