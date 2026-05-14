"use client";

import { useState } from "react";

const fmt = (n: number) => isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—";

export default function TipTool() {
  const [bill, setBill] = useState(50);
  const [tip, setTip] = useState(18);
  const [people, setPeople] = useState(2);

  const tipAmt = (bill * tip) / 100;
  const total = bill + tipAmt;
  const perPerson = total / people;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">총 금액 ($)</label><input type="number" step="0.01" value={bill} onChange={(e) => setBill(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">인원</label><input type="number" min="1" value={people} onChange={(e) => setPeople(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
      </div>
      <div>
        <label className="label">팁 비율 ({tip}%)</label>
        <input type="range" min="0" max="30" value={tip} onChange={(e) => setTip(+e.target.value)} className="w-full" />
        <div className="flex flex-wrap gap-1 mt-1 text-xs">
          {[10, 15, 18, 20, 25].map((t) => (
            <button key={t} onClick={() => setTip(t)} className={`px-2 py-1 rounded ${tip === t ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>{t}%</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">팁</div><div className="text-lg font-bold">${fmt(tipAmt)}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">총 합계</div><div className="text-lg font-bold">${fmt(total)}</div></div>
        <div className="p-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-500 rounded text-center"><div className="text-xs text-muted">1인당</div><div className="text-lg font-bold">${fmt(perPerson)}</div></div>
      </div>
    </div>
  );
}
