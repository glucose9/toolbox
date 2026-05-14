"use client";

import { useState } from "react";

type Mode = "lumpsum" | "monthly";

const fmt = (n: number) => (isFinite(n) ? Math.round(n).toLocaleString() : "—");

export default function CompoundTool() {
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
    const t = years;
    total = principal * Math.pow(1 + rate / 100 / n, n * t);
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
        <button onClick={() => setMode("lumpsum")} className={`btn ${mode === "lumpsum" ? "btn-primary" : "btn-secondary"}`}>일시예금</button>
        <button onClick={() => setMode("monthly")} className={`btn ${mode === "monthly" ? "btn-primary" : "btn-secondary"}`}>매월 적립 (적금)</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mode === "lumpsum" ? (
          <div>
            <label className="label">원금 (원)</label>
            <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          </div>
        ) : (
          <div>
            <label className="label">매월 적립액 (원)</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          </div>
        )}
        <div>
          <label className="label">연이율 (%)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        <div>
          <label className="label">기간 (년)</label>
          <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        {mode === "lumpsum" && (
          <div>
            <label className="label">복리 주기 (회/년)</label>
            <select value={compoundPerYear} onChange={(e) => setCompoundPerYear(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              <option value="1">연 1회 (단순 연복리)</option>
              <option value="2">반기 (2회)</option>
              <option value="4">분기 (4회)</option>
              <option value="12">월복리 (12회)</option>
              <option value="365">일복리 (365회)</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">총 납입</div>
          <div className="text-lg font-bold mt-1">{fmt(totalContrib)}</div>
        </div>
        <div className="border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">이자 (세전)</div>
          <div className="text-lg font-bold mt-1 text-green-700 dark:text-green-300">+{fmt(interest)}</div>
        </div>
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">만기 금액</div>
          <div className="text-lg font-bold mt-1">{fmt(total)}</div>
        </div>
      </div>

      <div className="text-xs text-muted">
        세전 금액입니다. 한국 이자소득세 15.4%(소득세 14% + 지방세 1.4%) 차감 시 실수령은 {fmt(total - interest * 0.154)} 원.
      </div>
    </div>
  );
}
