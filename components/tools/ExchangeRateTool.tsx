"use client";
import { useState } from "react";

const fmt = (n: number) => isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—";

export default function ExchangeRateTool() {
  const [rate, setRate] = useState(1380); // 1 USD = ? KRW
  const [usd, setUsd] = useState(100);
  const [krw, setKrw] = useState(138000);
  const [active, setActive] = useState<"usd" | "krw">("usd");

  const updateUsd = (v: number) => { setUsd(v); setKrw(v * rate); };
  const updateKrw = (v: number) => { setKrw(v); setUsd(v / rate); };
  const updateRate = (v: number) => { setRate(v); if (active === "usd") setKrw(usd * v); else setUsd(krw / v); };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">환율: 1 USD = ? KRW</label>
        <input type="number" step="0.01" value={rate} onChange={(e) => updateRate(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
        <div className="text-xs text-muted mt-1">네이버·구글에서 실시간 환율을 확인하고 입력하세요.</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">USD</label><input type="number" value={usd} onChange={(e) => { setActive("usd"); updateUsd(+e.target.value); }} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" /></div>
        <div><label className="label">KRW</label><input type="number" value={Math.round(krw)} onChange={(e) => { setActive("krw"); updateKrw(+e.target.value); }} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" /></div>
      </div>
      <div className="text-sm bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-3">
        ${fmt(usd)} = ₩{fmt(krw)}
      </div>
    </div>
  );
}
