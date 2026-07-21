"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

// 2026 기준 4대보험 요율 (사용자 부담)
const NATIONAL_PENSION = 0.0475; // 연금개혁: 총 9.5%의 근로자 절반
const HEALTH = 0.03595; // 총 7.19%의 근로자 절반
const LONG_TERM = HEALTH * 0.1314; // 장기요양 = 건강보험료의 13.14%
const EMPLOYMENT = 0.009;
// 국민연금 기준소득월액 상·하한 (2026.7~2027.6 고시 — 매년 7월 갱신 필요)
const PENSION_BASE_MAX = 6_590_000;
const PENSION_BASE_MIN = 410_000;

function incomeTax(monthly: number, dependents: number, children: number): number {
  const taxable = Math.max(0, monthly - 1_500_000);
  let rate = 0.06;
  if (taxable > 4_000_000) rate = 0.24;
  else if (taxable > 2_500_000) rate = 0.15;
  else if (taxable > 1_500_000) rate = 0.09;

  let tax = taxable * rate;
  tax -= dependents * 12_500;
  tax -= children * 25_000;
  return Math.max(0, tax);
}

export default function NetSalaryTool() {
  const t = useTranslations("toolUI.net-salary");
  const locale = useLocale();
  const [annual, setAnnual] = useState(48_000_000);
  const [dependents, setDependents] = useState(1);
  const [children, setChildren] = useState(0);
  const [nontaxable, setNontaxable] = useState(200_000);

  const result = useMemo(() => {
    const monthly = annual / 12;
    const taxableMonthly = Math.max(0, monthly - nontaxable);
    const pension = Math.min(Math.max(taxableMonthly, PENSION_BASE_MIN), PENSION_BASE_MAX) * NATIONAL_PENSION;
    const health = taxableMonthly * HEALTH;
    const longTerm = taxableMonthly * LONG_TERM;
    const employment = taxableMonthly * EMPLOYMENT;
    const tax = incomeTax(taxableMonthly, dependents, children);
    const localTax = tax * 0.1;
    const totalDeduction = pension + health + longTerm + employment + tax + localTax;
    const net = monthly - totalDeduction;
    return { monthly, pension, health, longTerm, employment, tax, localTax, totalDeduction, net };
  }, [annual, dependents, children, nontaxable]);

  const fmt = (n: number) => Math.round(n).toLocaleString(locale);

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label className="sm:col-span-2">{t("annual")}
          <input type="number" value={annual} onChange={(e) => setAnnual(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{t("annualNote", { annual: fmt(annual), monthly: fmt(annual / 12) })}</div>
        </label>
        <label>{t("dependents")}
          <input type="number" min="1" value={dependents} onChange={(e) => setDependents(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("children")}
          <input type="number" min="0" value={children} onChange={(e) => setChildren(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label className="sm:col-span-2">{t("nontaxable")}
          <input type="number" value={nontaxable} onChange={(e) => setNontaxable(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{t("nontaxableNote", { amount: fmt(nontaxable) })}</div>
        </label>
      </div>

      <div className="card-section space-y-1 text-sm">
        <div className="font-semibold mb-1">{t("deductionTitle")}</div>
        <Row label={t("pension")} value={result.pension} locale={locale} suffix={t("krwSuffix")} />
        <Row label={t("health")} value={result.health} locale={locale} suffix={t("krwSuffix")} />
        <Row label={t("longTerm")} value={result.longTerm} locale={locale} suffix={t("krwSuffix")} />
        <Row label={t("employment")} value={result.employment} locale={locale} suffix={t("krwSuffix")} />
        <Row label={t("incomeTax")} value={result.tax} locale={locale} suffix={t("krwSuffix")} />
        <Row label={t("localTax")} value={result.localTax} locale={locale} suffix={t("krwSuffix")} />
        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
        <Row label={t("totalDeduction")} value={result.totalDeduction} locale={locale} suffix={t("krwSuffix")} className="font-semibold text-red-600" />
      </div>

      <div className="card-section">
        <div className="text-xs text-muted">{t("netMonthly")}</div>
        <div className="text-3xl font-bold text-green-600">{fmt(result.net)}{t("krwSuffix")}</div>
        <div className="text-xs text-muted mt-1">{t("annualEquiv", { amount: fmt(result.net * 12) })}</div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 {t("disclaimer")}
      </div>
    </div>
  );
}

function Row({ label, value, className = "", locale, suffix }: { label: string; value: number; className?: string; locale: string; suffix: string }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span>{label}</span>
      <span>-{Math.round(value).toLocaleString(locale)}{suffix}</span>
    </div>
  );
}
