"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const fmt = (n: number) => isFinite(n) ? Math.round(n).toLocaleString() : "—";

type Mode = "toMonthly" | "toJeonse";

export default function RentCalcTool() {
  const t = useTranslations("toolUI.rent-calc");
  const [mode, setMode] = useState<Mode>("toMonthly");
  const [jeonse, setJeonse] = useState(300000000);
  const [deposit, setDeposit] = useState(20000000);
  const [monthlyRent, setMonthlyRent] = useState(700000);
  const [convertRate, setConvertRate] = useState(4.5); // % per year

  // Jeonse → Monthly: (jeonse - deposit) × rate / 12 / 100
  // Monthly → Jeonse: deposit + (monthly × 12 / rate × 100)
  const jeonseToMonthly = ((jeonse - deposit) * convertRate) / 100 / 12;
  const monthlyToJeonse = deposit + (monthlyRent * 12 * 100) / convertRate;

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("toMonthly")} className={`btn flex-1 ${mode === "toMonthly" ? "btn-primary" : "btn-secondary"}`}>{t("jeonseToMonthly")}</button>
        <button onClick={() => setMode("toJeonse")} className={`btn flex-1 ${mode === "toJeonse" ? "btn-primary" : "btn-secondary"}`}>{t("monthlyToJeonse")}</button>
      </div>
      <div>
        <label className="label">{t("deposit")}</label>
        <input type="number" value={deposit} onChange={(e) => setDeposit(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>
      <div>
        <label className="label">{t("rateLabel", { rate: convertRate })}</label>
        <input type="range" min="2" max="10" step="0.1" value={convertRate} onChange={(e) => setConvertRate(+e.target.value)} className="w-full" />
      </div>
      {mode === "toMonthly" ? (
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <label className="label text-xs">{t("jeonseAmount")}</label>
          <input type="number" value={jeonse} onChange={(e) => setJeonse(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <div className="text-xs text-muted">{t("expectedMonthly")}</div>
          <div className="text-xl font-bold">{t("krw", { value: fmt(jeonseToMonthly) })}</div>
        </div>
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <label className="label text-xs">{t("monthlyRent")}</label>
          <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <div className="text-xs text-muted">{t("expectedJeonse")}</div>
          <div className="text-xl font-bold">{t("krw", { value: fmt(monthlyToJeonse) })}</div>
        </div>
      )}
    </div>
  );
}
