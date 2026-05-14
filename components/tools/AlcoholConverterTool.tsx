"use client";

import { useState } from "react";

const DRINKS: { name: string; abv: number; vol: number }[] = [
  { name: "소주 (1잔)", abv: 16.5, vol: 50 },
  { name: "맥주 (500ml)", abv: 4.5, vol: 500 },
  { name: "와인 (1잔)", abv: 12, vol: 150 },
  { name: "막걸리 (1잔)", abv: 6, vol: 250 },
  { name: "위스키 샷 (30ml)", abv: 40, vol: 30 },
  { name: "보드카 샷 (30ml)", abv: 40, vol: 30 },
];

export default function AlcoholConverterTool() {
  const [fromIdx, setFromIdx] = useState(0);
  const [count, setCount] = useState(3);

  const baseAlc = (DRINKS[fromIdx].abv / 100) * DRINKS[fromIdx].vol * count;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">기준 술</label>
          <select value={fromIdx} onChange={(e) => setFromIdx(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            {DRINKS.map((d, i) => <option key={d.name} value={i}>{d.name} ({d.abv}%)</option>)}
          </select>
        </div>
        <div>
          <label className="label">잔 수</label>
          <input type="number" min="1" max="50" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
      </div>
      <div className="text-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-3">
        <div className="text-xs text-muted">순수 알코올</div>
        <div className="text-2xl font-bold">{baseAlc.toFixed(1)} ml</div>
      </div>
      <div className="space-y-1 text-sm">
        <div className="font-medium mb-1">동등량</div>
        {DRINKS.map((d, i) => {
          if (i === fromIdx) return null;
          const eqCount = baseAlc / ((d.abv / 100) * d.vol);
          return (
            <div key={d.name} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
              <span>{d.name}</span>
              <span className="font-mono"><strong>{eqCount.toFixed(1)}</strong>잔</span>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-muted bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">⚠️ 음주운전은 절대 금지. 한 잔도 위험합니다.</div>
    </div>
  );
}
