"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

const TAX_BRACKETS = [
  { up: 14_000_000, rate: 0.06, deduction: 0 },
  { up: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { up: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { up: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { up: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { up: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { up: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { up: Infinity, rate: 0.45, deduction: 65_940_000 },
];

function calcIncomeTax(taxBase: number): { tax: number; bracket: number; rate: number } {
  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    if (taxBase <= TAX_BRACKETS[i].up) {
      const b = TAX_BRACKETS[i];
      return { tax: Math.max(0, taxBase * b.rate - b.deduction), bracket: i, rate: b.rate };
    }
  }
  return { tax: 0, bracket: 0, rate: 0 };
}

export default function IncomeTaxTool() {
  const t = useTranslations("toolUI.income-tax");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [grossIncome, setGrossIncome] = useState(50_000_000);
  const [necessaryExpense, setNecessaryExpense] = useState(0);
  const [personalDeduction, setPersonalDeduction] = useState(1_500_000);
  const [dependents, setDependents] = useState(0);
  const [pensionContrib, setPensionContrib] = useState(0);
  const [otherDeduction, setOtherDeduction] = useState(0);

  const result = useMemo(() => {
    const income = grossIncome - necessaryExpense;
    const totalDeduction = personalDeduction + dependents * 1_500_000 + pensionContrib + otherDeduction;
    const taxBase = Math.max(0, income - totalDeduction);
    const { tax, bracket, rate } = calcIncomeTax(taxBase);
    const localTax = tax * 0.1;
    const total = tax + localTax;
    const effectiveRate = grossIncome > 0 ? (total / grossIncome) * 100 : 0;
    return { income, totalDeduction, taxBase, tax, localTax, total, bracket, rate, effectiveRate };
  }, [grossIncome, necessaryExpense, personalDeduction, dependents, pensionContrib, otherDeduction]);

  const fmt = (n: number) => Math.round(n).toLocaleString(locale);
  const krw = (amount: string) => t("krw", { amount });

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label>
          {t("grossIncome")}
          <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{krw(fmt(grossIncome))}</div>
        </label>
        <label>
          {t("dependents")}
          <input type="number" min={0} value={dependents} onChange={(e) => setDependents(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{t("dependentsNote")}</div>
        </label>
      </div>

      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <label>
              {t("expense")}
              <input type="number" value={necessaryExpense} onChange={(e) => setNecessaryExpense(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{t("expenseNote")}</div>
            </label>
            <label>
              {t("personalDeduction")}
              <input type="number" value={personalDeduction} onChange={(e) => setPersonalDeduction(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{t("personalDeductionNote")}</div>
            </label>
            <label>
              {t("pension")}
              <input type="number" value={pensionContrib} onChange={(e) => setPensionContrib(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{krw(fmt(pensionContrib))}</div>
            </label>
            <label>
              {t("otherDeduction")}
              <input type="number" value={otherDeduction} onChange={(e) => setOtherDeduction(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{t("otherDeductionNote")}</div>
            </label>
          </div>
        </div>
      </details>

      <div className="card-section space-y-1 text-sm">
        <div className="flex justify-between items-baseline">
          <span className="font-medium">{t("rowTotalTax")}</span>
          <span className="text-2xl font-bold text-red-600">{krw(fmt(result.total))}</span>
        </div>
        <div className="text-xs text-muted">{t("effectiveRate", { rate: result.effectiveRate.toFixed(2) })}</div>
        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
        <div className="flex justify-between">
          <span>{t("rowGross")}</span>
          <span>{krw(fmt(grossIncome))}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>{t("rowExpense")}</span>
          <span>{krw(fmt(necessaryExpense))}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>{t("rowIncome")}</span>
          <span>{krw(fmt(result.income))}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>{t("rowDeductions")}</span>
          <span>{krw(fmt(result.totalDeduction))}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>{t("rowTaxBase")}</span>
          <span>{krw(fmt(result.taxBase))}</span>
        </div>
        <div className="flex justify-between text-blue-600">
          <span>{t("rowRate")}</span>
          <span>{(result.rate * 100).toFixed(0)}%</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
        <div className="flex justify-between">
          <span>{t("rowComputedTax")}</span>
          <span>{krw(fmt(result.tax))}</span>
        </div>
        <div className="flex justify-between">
          <span>{t("rowLocalTax")}</span>
          <span>{krw(fmt(result.localTax))}</span>
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 {t("disclaimer")}
      </div>
    </div>
  );
}
