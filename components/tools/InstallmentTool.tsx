"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const fmt = (n: number) => isFinite(n) ? Math.round(n).toLocaleString() : "—";

export default function InstallmentTool() {
  const t = useTranslations("toolUI.installment");
  const [principal, setPrincipal] = useState(1000000);
  const [months, setMonths] = useState(6);
  const [rate, setRate] = useState(0);

  let monthly = 0, totalInterest = 0;
  if (rate === 0) {
    monthly = principal / months;
  } else {
    const r = rate / 100 / 12;
    monthly = (principal * r) / (1 - Math.pow(1 + r, -months));
    totalInterest = monthly * months - principal;
  }

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("principal")}</label>
        <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">{t("months")}</label><input type="number" min="2" max="36" value={months} onChange={(e) => setMonths(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">{t("annualRate")}</label><input type="number" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center"><div className="text-xs text-muted">{t("monthlyPayment")}</div><div className="text-lg font-bold">{fmt(monthly)}{t("currency")}</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">{t("totalInterest")}</div><div className="text-lg font-bold">{fmt(totalInterest)}{t("currency")}</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">{t("totalRepayment")}</div><div className="text-lg font-bold">{fmt(principal + totalInterest)}{t("currency")}</div></div>
      </div>
      <div className="text-xs text-muted">{rate === 0 ? t("interestFree") : t("equalInstallment")}</div>
    </div>
  );
}
