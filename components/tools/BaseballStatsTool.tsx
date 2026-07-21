"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Mode = "era" | "avg" | "ops";

export default function BaseballStatsTool() {
  const t = useTranslations("toolUI.baseball-stats");
  const [mode, setMode] = useState<Mode>("avg");
  // ERA: ER, IP (야구 기록지 표기 50.1 = 50이닝 1아웃 → 이닝/아웃 분리 입력)
  const [er, setEr] = useState(15);
  const [ipInnings, setIpInnings] = useState(50);
  const [ipOuts, setIpOuts] = useState(0);
  // AVG: H, AB
  const [h, setH] = useState(60);
  const [ab, setAb] = useState(200);
  // OPS: H, BB, HBP, AB, SF, TB
  const [bb, setBb] = useState(20);
  const [hbp, setHbp] = useState(2);
  const [sf, setSf] = useState(1);
  const [tb, setTb] = useState(95);

  // 아웃 1개 = 1/3이닝
  const ip = Math.max(0, Math.floor(ipInnings || 0)) + Math.min(2, Math.max(0, Math.floor(ipOuts || 0))) / 3;
  const era = ip > 0 ? (er * 9) / ip : 0;
  const ipDisplay = `${Math.max(0, Math.floor(ipInnings || 0))}.${Math.min(2, Math.max(0, Math.floor(ipOuts || 0)))}`;
  const avg = ab > 0 ? h / ab : 0;
  const obp = ab + bb + hbp + sf > 0 ? (h + bb + hbp) / (ab + bb + hbp + sf) : 0;
  const slg = ab > 0 ? tb / ab : 0;
  const ops = obp + slg;

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("era")} className={`btn flex-1 ${mode === "era" ? "btn-primary" : "btn-secondary"}`}>ERA</button>
        <button onClick={() => setMode("avg")} className={`btn flex-1 ${mode === "avg" ? "btn-primary" : "btn-secondary"}`}>{t("avgTab")}</button>
        <button onClick={() => setMode("ops")} className={`btn flex-1 ${mode === "ops" ? "btn-primary" : "btn-secondary"}`}>OPS</button>
      </div>
      {mode === "era" && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="label">{t("earnedRuns")}</label><input type="number" min={0} value={er} onChange={(e) => setEr(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
            <div><label className="label">{t("inningsPitched")}</label><input type="number" min={0} step="1" value={ipInnings} onChange={(e) => setIpInnings(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
            <div><label className="label">{t("outs")}</label>
              <select value={ipOuts} onChange={(e) => setIpOuts(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
          </div>
          <div className="text-xs text-muted leading-relaxed">{t("ipNote")}</div>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
            <div className="text-xs text-muted">{t("eraLabel")}</div>
            <div className="text-4xl font-bold mt-1">{era.toFixed(2)}</div>
            <div className="text-xs text-muted mt-1">{t("ipTotal", { value: `${ipDisplay} (${ip.toFixed(2)})` })}</div>
          </div>
        </>
      )}
      {mode === "avg" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">{t("hits")}</label><input type="number" value={h} onChange={(e) => setH(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
            <div><label className="label">{t("atBats")}</label><input type="number" value={ab} onChange={(e) => setAb(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
          </div>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
            <div className="text-xs text-muted">{t("avgLabel")}</div>
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
