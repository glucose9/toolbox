"use client";
import { useState } from "react";

const fmt = (n: number) => isFinite(n) ? Math.round(n).toLocaleString() : "—";

export default function RentCalcTool() {
  const [jeonse, setJeonse] = useState(300000000);
  const [deposit, setDeposit] = useState(20000000);
  const [monthlyRent, setMonthlyRent] = useState(700000);
  const [convertRate, setConvertRate] = useState(4.5); // % per year

  // 전세 → 월세: (전세금 - 보증금) × 전환율 / 12 / 100
  // 월세 → 전세: 보증금 + (월세 × 12 / 전환율 × 100)
  const jeonseToMonthly = ((jeonse - deposit) * convertRate) / 100 / 12;
  const monthlyToJeonse = deposit + (monthlyRent * 12 * 100) / convertRate;

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">전월세 전환율 ({convertRate}% / 년)</label>
        <input type="range" min="2" max="10" step="0.1" value={convertRate} onChange={(e) => setConvertRate(+e.target.value)} className="w-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="font-medium mb-2">전세 → 월세</div>
          <label className="label text-xs">전세금</label>
          <input type="number" value={jeonse} onChange={(e) => setJeonse(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <label className="label text-xs">보증금</label>
          <input type="number" value={deposit} onChange={(e) => setDeposit(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <div className="text-xs text-muted">예상 월세</div>
          <div className="text-xl font-bold">{fmt(jeonseToMonthly)}원</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="font-medium mb-2">월세 → 전세</div>
          <label className="label text-xs">월세</label>
          <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <label className="label text-xs">보증금</label>
          <input type="number" value={deposit} onChange={(e) => setDeposit(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <div className="text-xs text-muted">예상 전세금</div>
          <div className="text-xl font-bold">{fmt(monthlyToJeonse)}원</div>
        </div>
      </div>
    </div>
  );
}
