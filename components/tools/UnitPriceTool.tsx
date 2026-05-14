"use client";

import { useState } from "react";

const fmt = (n: number) => isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—";

export default function UnitPriceTool() {
  const [pA, setPA] = useState(5000);
  const [vA, setVA] = useState(500);
  const [pB, setPB] = useState(8000);
  const [vB, setVB] = useState(1000);
  const [unit, setUnit] = useState(100);
  const [unitLabel, setUnitLabel] = useState("ml");

  const unitA = (pA / vA) * unit;
  const unitB = (pB / vB) * unit;
  const winner = unitA < unitB ? "A" : unitA > unitB ? "B" : "Tie";
  const diff = Math.abs(unitA - unitB);

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className={`border rounded p-3 ${winner === "A" ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-200 dark:border-gray-700"}`}>
          <div className="font-medium mb-2">상품 A {winner === "A" && "🏆"}</div>
          <label className="label text-xs">가격</label>
          <input type="number" value={pA} onChange={(e) => setPA(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <label className="label text-xs">용량</label>
          <input type="number" value={vA} onChange={(e) => setVA(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        <div className={`border rounded p-3 ${winner === "B" ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-200 dark:border-gray-700"}`}>
          <div className="font-medium mb-2">상품 B {winner === "B" && "🏆"}</div>
          <label className="label text-xs">가격</label>
          <input type="number" value={pB} onChange={(e) => setPB(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <label className="label text-xs">용량</label>
          <input type="number" value={vB} onChange={(e) => setVB(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 items-end text-sm">
        <label>단위 기준<input type="number" value={unit} onChange={(e) => setUnit(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>단위 라벨<input type="text" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">A: {unit}{unitLabel}당</div><div className="text-lg font-bold">{fmt(unitA)}원</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">B: {unit}{unitLabel}당</div><div className="text-lg font-bold">{fmt(unitB)}원</div></div>
      </div>
      {winner !== "Tie" && (
        <div className="text-center text-sm">
          <strong>{winner === "A" ? "A" : "B"}</strong>가 {unit}{unitLabel}당 <strong>{fmt(diff)}원</strong> 더 쌉니다.
        </div>
      )}
    </div>
  );
}
