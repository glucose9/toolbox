"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function LoanCalcTool() {
  const t = useTranslations("toolUI.loan-calc");
  const locale = useLocale();
  const numLocale = locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : "en-US";

  const [principal, setPrincipal] = useState(300_000_000);
  const [rate, setRate] = useState(4.5);
  const [months, setMonths] = useState(360);
  const [method, setMethod] = useState<"equal-payment" | "equal-principal" | "bullet">("equal-payment");

  const result = useMemo(() => {
    const n = Math.max(1, Math.floor(months) || 1); // 빈 입력(0)·음수 방지
    const r = rate / 100 / 12;
    if (method === "equal-payment") {
      const monthly = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      const interest = total - principal;
      const schedule: { m: number; pay: number; principal: number; interest: number; remain: number }[] = [];
      let remain = principal;
      for (let m = 1; m <= n; m++) {
        const intPart = remain * r;
        const prinPart = monthly - intPart;
        remain -= prinPart;
        schedule.push({ m, pay: monthly, principal: prinPart, interest: intPart, remain: Math.max(0, remain) });
      }
      return { monthly, total, interest, schedule, firstMonth: monthly, lastMonth: monthly };
    }
    if (method === "equal-principal") {
      const monthlyPrincipal = principal / n;
      let remain = principal;
      let total = 0;
      const schedule: { m: number; pay: number; principal: number; interest: number; remain: number }[] = [];
      for (let m = 1; m <= n; m++) {
        const interest = remain * r;
        const pay = monthlyPrincipal + interest;
        total += pay;
        remain -= monthlyPrincipal;
        schedule.push({ m, pay, principal: monthlyPrincipal, interest, remain: Math.max(0, remain) });
      }
      return { monthly: NaN, total, interest: total - principal, schedule, firstMonth: schedule[0].pay, lastMonth: schedule[schedule.length - 1].pay };
    }
    const monthlyInterest = principal * r;
    const totalInterest = monthlyInterest * n;
    return {
      monthly: monthlyInterest,
      total: principal + totalInterest,
      interest: totalInterest,
      schedule: [],
      firstMonth: monthlyInterest,
      lastMonth: monthlyInterest + principal,
    };
  }, [principal, rate, months, method]);

  const fmt = (n: number) => (isFinite(n) ? Math.round(n).toLocaleString(numLocale) : "—");

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label>{t("principal")}
          <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{t("principalHint", { won: fmt(principal), eok: (principal / 100_000_000).toFixed(2) })}</div>
        </label>
        <label>{t("rate")}
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("months")}
          <input type="number" value={months} onChange={(e) => setMonths(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{t("monthsHint", { years: (months / 12).toFixed(1) })}</div>
        </label>
        <label>{t("method")}
          <select value={method} onChange={(e) => setMethod(e.target.value as typeof method)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="equal-payment">{t("methodEqualPay")}</option>
            <option value="equal-principal">{t("methodEqualPrincipal")}</option>
            <option value="bullet">{t("methodBullet")}</option>
          </select>
        </label>
      </div>

      <div className="card-section grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div>
          <div className="text-xs text-muted">{method === "equal-principal" ? t("firstMonth") : t("monthlyPay")}</div>
          <div className="text-lg font-bold">{t("won", { v: fmt(result.firstMonth) })}</div>
        </div>
        {method === "equal-principal" && (
          <div>
            <div className="text-xs text-muted">{t("lastMonth")}</div>
            <div className="text-lg font-bold">{t("won", { v: fmt(result.lastMonth) })}</div>
          </div>
        )}
        <div>
          <div className="text-xs text-muted">{t("totalInterest")}</div>
          <div className="text-lg font-bold text-red-600">{t("won", { v: fmt(result.interest) })}</div>
        </div>
        <div>
          <div className="text-xs text-muted">{t("totalPay")}</div>
          <div className="text-lg font-bold">{t("won", { v: fmt(result.total) })}</div>
        </div>
      </div>

      {result.schedule.length > 0 && (
        <details>
          <summary className="text-sm cursor-pointer text-blue-600">{t("scheduleSummary", { months })}</summary>
          <div className="mt-2 overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-1">{t("th_round")}</th>
                  <th className="text-right p-1">{t("th_pay")}</th>
                  <th className="text-right p-1">{t("th_principal")}</th>
                  <th className="text-right p-1">{t("th_interest")}</th>
                  <th className="text-right p-1">{t("th_remain")}</th>
                </tr>
              </thead>
              <tbody>
                {[0, 11, result.schedule.length - 1].filter((i, j, arr) => arr.indexOf(i) === j && i < result.schedule.length).map((i) => {
                  const s = result.schedule[i];
                  return (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="p-1">{s.m}</td>
                      <td className="text-right p-1">{fmt(s.pay)}</td>
                      <td className="text-right p-1">{fmt(s.principal)}</td>
                      <td className="text-right p-1">{fmt(s.interest)}</td>
                      <td className="text-right p-1">{fmt(s.remain)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </details>
      )}

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
