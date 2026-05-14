"use client";

import { useState } from "react";

type Mode = "era" | "avg" | "ops";

export default function BaseballStatsTool() {
  const [mode, setMode] = useState<Mode>("avg");
  // ERA: ER, IP
  const [er, setEr] = useState(15);
  const [ip, setIp] = useState(50);
  // AVG: H, AB
  const [h, setH] = useState(60);
  const [ab, setAb] = useState(200);
  // OPS: H, BB, HBP, AB, SF, TB
  const [bb, setBb] = useState(20);
  const [hbp, setHbp] = useState(2);
  const [sf, setSf] = useState(1);
  const [tb, setTb] = useState(95);

  const era = ip > 0 ? (er * 9) / ip : 0;
  const avg = ab > 0 ? h / ab : 0;
  const obp = ab + bb + hbp + sf > 0 ? (h + bb + hbp) / (ab + bb + hbp + sf) : 0;
  const slg = ab > 0 ? tb / ab : 0;
  const ops = obp + slg;

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("era")} className={`btn flex-1 ${mode === "era" ? "btn-primary" : "btn-secondary"}`}>ERA</button>
        <button onClick={() => setMode("avg")} className={`btn flex-1 ${mode === "avg" ? "btn-primary" : "btn-secondary"}`}>타율</button>
        <button onClick={() => setMode("ops")} className={`btn flex-1 ${mode === "ops" ? "btn-primary" : "btn-secondary"}`}>OPS</button>
      </div>
      {mode === "era" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">자책점 (ER)</label><input type="number" value={er} onChange={(e) => setEr(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
            <div><label className="label">투구이닝 (IP)</label><input type="number" step="0.1" value={ip} onChange={(e) => setIp(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
          </div>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
            <div className="text-xs text-muted">평균자책점 ERA</div>
            <div className="text-4xl font-bold mt-1">{era.toFixed(2)}</div>
          </div>
        </>
      )}
      {mode === "avg" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">안타 (H)</label><input type="number" value={h} onChange={(e) => setH(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
            <div><label className="label">타수 (AB)</label><input type="number" value={ab} onChange={(e) => setAb(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
          </div>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
            <div className="text-xs text-muted">타율 AVG</div>
            <div className="text-4xl font-bold mt-1">{avg.toFixed(3)}</div>
          </div>
        </>
      )}
      {mode === "ops" && (
        <>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <label>H<input type="number" value={h} onChange={(e) => setH(+e.target.value)} className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
            <label>AB<input type="number" value={ab} onChange={(e) => setAb(+e.target.value)} className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
            <label>TB<input type="number" value={tb} onChange={(e) => setTb(+e.target.value)} className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
            <label>BB<input type="number" value={bb} onChange={(e) => setBb(+e.target.value)} className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
            <label>HBP<input type="number" value={hbp} onChange={(e) => setHbp(+e.target.value)} className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
            <label>SF<input type="number" value={sf} onChange={(e) => setSf(+e.target.value)} className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">OBP</div><div className="font-bold">{obp.toFixed(3)}</div></div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">SLG</div><div className="font-bold">{slg.toFixed(3)}</div></div>
            <div className="p-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-500 rounded text-center"><div className="text-xs text-muted">OPS</div><div className="font-bold">{ops.toFixed(3)}</div></div>
          </div>
        </>
      )}
    </div>
  );
}
