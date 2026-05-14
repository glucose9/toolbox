"use client";

import { useState } from "react";

type Mode = "price-from-rate" | "rate-from-price" | "original-from-price";

const fmt = (n: number) => (isFinite(n) ? Math.round(n).toLocaleString() : "—");

export default function DiscountTool() {
  const [mode, setMode] = useState<Mode>("price-from-rate");
  const [orig, setOrig] = useState(50000);
  const [rate, setRate] = useState(30);
  const [discounted, setDiscounted] = useState(35000);

  let resultLabel = "";
  let resultValue = 0;
  if (mode === "price-from-rate") {
    resultLabel = "할인가";
    resultValue = orig * (1 - rate / 100);
  } else if (mode === "rate-from-price") {
    resultLabel = "할인율";
    resultValue = ((orig - discounted) / orig) * 100;
  } else {
    resultLabel = "정가";
    resultValue = discounted / (1 - rate / 100);
  }

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <button onClick={() => setMode("price-from-rate")} className={`btn ${mode === "price-from-rate" ? "btn-primary" : "btn-secondary"}`}>정가 + 할인율 → 할인가</button>
        <button onClick={() => setMode("rate-from-price")} className={`btn ${mode === "rate-from-price" ? "btn-primary" : "btn-secondary"}`}>정가 + 할인가 → 할인율</button>
        <button onClick={() => setMode("original-from-price")} className={`btn ${mode === "original-from-price" ? "btn-primary" : "btn-secondary"}`}>할인가 + 할인율 → 정가</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mode !== "original-from-price" && (
          <div><label className="label">정가 (원)</label><input type="number" value={orig} onChange={(e) => setOrig(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        )}
        {mode !== "rate-from-price" && (
          <div><label className="label">할인율 (%)</label><input type="number" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        )}
        {mode !== "price-from-rate" && (
          <div><label className="label">할인가 (원)</label><input type="number" value={discounted} onChange={(e) => setDiscounted(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        )}
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
        <div className="text-xs text-muted">{resultLabel}</div>
        <div className="text-3xl font-bold mt-1">
          {mode === "rate-from-price" ? `${resultValue.toFixed(2)}%` : `${fmt(resultValue)} 원`}
        </div>
        {mode === "price-from-rate" && (
          <div className="text-xs text-muted mt-1">절약: {fmt(orig - resultValue)} 원</div>
        )}
      </div>
    </div>
  );
}
