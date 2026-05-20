"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function SavingsCalcTool() {
  const t = useTranslations("toolUI.savings-calc");
  const locale = useLocale();
  const numLocale = locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : "en-US";

  const [type, setType] = useState<"installment" | "deposit">("installment");
  const [monthly, setMonthly] = useState(500_000);
  const [principal, setPrincipal] = useState(10_000_000);
  const [rate, setRate] = useState(3.5);
  const [months, setMonths] = useState(12);
  const [taxFree, setTaxFree] = useState(false);
  const [interestType, setInterestType] = useState<"simple" | "compound">("simple");

  const result = useMemo(() => {
    const taxRate = taxFree ? 0 : 0.154;
    const annualRate = rate / 100;
    if (type === "installment") {
      const totalPaid = monthly * months;
      let interest = 0;
      if (interestType === "simple") {
        for (let m = 1; m <= months; m++) {
          interest += monthly * annualRate * (months - m + 1) / 12;
        }
      } else {
        const r = annualRate / 12;
        let bal = 0;
        for (let m = 1; m <= months; m++) {
          bal = (bal + monthly) * (1 + r);
        }
        interest = bal - totalPaid;
      }
      const tax = interest * taxRate;
      return { totalPaid, interest, tax, netInterest: interest - tax, final: totalPaid + interest - tax };
    }
    const totalPaid = principal;
    let interest = 0;
    if (interestType === "simple") {
      interest = principal * annualRate * (months / 12);
    } else {
      const r = annualRate / 12;
      interest = principal * (Math.pow(1 + r, months) - 1);
    }
    const tax = interest * taxRate;
    return { totalPaid, interest, tax, netInterest: interest - tax, final: principal + interest - tax };
  }, [type, monthly, principal, rate, months, taxFree, interestType]);

  const fmt = (n: number) => Math.round(n).toLocaleString(numLocale);

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        {(["installment", "deposit"] as const).map((tp) => (
          <button
            key={tp}
            onClick={() => setType(tp)}
            className={`px-3 py-1.5 rounded text-sm ${type === tp ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {tp === "installment" ? t("typeInstallment") : t("typeDeposit")}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {type === "installment" ? (
          <label>{t("monthlyDeposit")}
            <input type="number" value={monthly} onChange={(e) => setMonthly(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            <div className="text-xs text-muted mt-1">{t("won", { v: fmt(monthly) })}</div>
          </label>
        ) : (
          <label>{t("principalDeposit")}
            <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            <div className="text-xs text-muted mt-1">{t("won", { v: fmt(principal) })}</div>
          </label>
        )}
        <label>{t("rate")}
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("months")}
          <input type="number" value={months} onChange={(e) => setMonths(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("interestType")}
          <select value={interestType} onChange={(e) => setInterestType(e.target.value as typeof interestType)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="simple">{t("simple")}</option>
            <option value="compound">{t("compound")}</option>
          </select>
        </label>
        <label className="sm:col-span-2 flex items-center gap-2">
          <input type="checkbox" checked={taxFree} onChange={(e) => setTaxFree(e.target.checked)} />
          {t("taxFree")}
        </label>
      </div>

      <div className="card-section grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <div className="text-xs text-muted">{t("totalPaid")}</div>
          <div className="text-base font-bold">{t("won", { v: fmt(result.totalPaid) })}</div>
        </div>
        <div>
          <div className="text-xs text-muted">{t("preTaxInterest")}</div>
          <div className="text-base font-bold text-blue-600">{t("won", { v: fmt(result.interest) })}</div>
        </div>
        <div>
          <div className="text-xs text-muted">{t("interestTax", { pct: taxFree ? 0 : 15.4 })}</div>
          <div className="text-base font-bold text-red-600">-{t("won", { v: fmt(result.tax) })}</div>
        </div>
        <div>
          <div className="text-xs text-muted">{t("netInterest")}</div>
          <div className="text-base font-bold">{t("won", { v: fmt(result.netInterest) })}</div>
        </div>
        <div className="col-span-2 sm:col-span-2">
          <div className="text-xs text-muted">{t("maturity")}</div>
          <div className="text-2xl font-bold text-green-600">{t("won", { v: fmt(result.final) })}</div>
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
