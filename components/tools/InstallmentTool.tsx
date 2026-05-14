"use client";
import { useState } from "react";

const fmt = (n: number) => isFinite(n) ? Math.round(n).toLocaleString() : "—";

export default function InstallmentTool() {
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
        <label className="label">원금 (원)</label>
        <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">기간 (개월)</label><input type="number" min="2" max="36" value={months} onChange={(e) => setMonths(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">연이율 (%)</label><input type="number" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center"><div className="text-xs text-muted">월 납입</div><div className="text-lg font-bold">{fmt(monthly)}원</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">총 이자</div><div className="text-lg font-bold">{fmt(totalInterest)}원</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">총 상환액</div><div className="text-lg font-bold">{fmt(principal + totalInterest)}원</div></div>
      </div>
      <div className="text-xs text-muted">{rate === 0 ? "무이자 할부 모드입니다." : "이자는 균등 분할상환 방식으로 계산됩니다."}</div>
    </div>
  );
}
