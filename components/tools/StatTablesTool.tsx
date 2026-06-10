"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

// Standard normal CDF via Abramowitz–Stegun erf approximation (|err| < 1.5e-7).
function erf(x: number): number {
  const s = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return s * y;
}
const phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));
// Inverse Φ via bisection (plenty fast/accurate for UI use).
function phiInv(p: number): number {
  let lo = -10, hi = 10;
  for (let i = 0; i < 200; i++) {
    const m = (lo + hi) / 2;
    if (phi(m) < p) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

// Student-t critical values computed numerically (verified against textbook
// tables: t(10,.05)=1.812, t(1,.025)=12.706, t(30,.005)=2.750).
function lgamma(x: number): number {
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = c[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
function tPdf(x: number, v: number): number {
  return (Math.exp(lgamma((v + 1) / 2) - lgamma(v / 2)) / Math.sqrt(v * Math.PI)) * Math.pow(1 + (x * x) / v, -(v + 1) / 2);
}
function tUpper(x: number, v: number): number {
  // P(T > x) = 0.5 − ∫₀ˣ pdf (Simpson)
  const N = 2000;
  const h = x / N;
  let s = 0;
  for (let i = 0; i <= N; i++) {
    const xx = i * h;
    const w = i === 0 || i === N ? 1 : i % 2 ? 4 : 2;
    s += w * tPdf(xx, v);
  }
  return 0.5 - (s * h) / 3;
}
function tCrit(v: number, alpha: number): number {
  let lo = 0, hi = 1000;
  for (let i = 0; i < 120; i++) {
    const m = (lo + hi) / 2;
    if (tUpper(m, v) > alpha) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

const T_DFS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 60, 120];
const T_ALPHAS = [0.1, 0.05, 0.025, 0.01, 0.005];

export default function StatTablesTool() {
  const t = useTranslations("toolUI.stat-tables");
  const [tab, setTab] = useState<"z" | "t">("z");
  const [zIn, setZIn] = useState("1.96");
  const [pIn, setPIn] = useState("0.975");

  const zVal = parseFloat(zIn);
  const pVal = parseFloat(pIn);
  const zToP = isFinite(zVal) ? phi(zVal) : null;
  const pToZ = isFinite(pVal) && pVal > 0 && pVal < 1 ? phiInv(pVal) : null;

  // z-table rows 0.0–3.4, cols .00–.09
  const zRows = useMemo(() => {
    const rows: { z: number; cells: number[] }[] = [];
    for (let r = 0; r <= 34; r++) {
      const base = r / 10;
      rows.push({ z: base, cells: Array.from({ length: 10 }, (_, c) => phi(base + c / 100)) });
    }
    return rows;
  }, []);

  // t critical-value table (computed once)
  const tRows = useMemo(
    () => T_DFS.map((df) => ({ df, cells: T_ALPHAS.map((a) => tCrit(df, a)) })),
    []
  );
  const tInf = useMemo(() => T_ALPHAS.map((a) => phiInv(1 - a)), []);

  return (
    <div className="card space-y-3">
      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 pb-2">
        <button onClick={() => setTab("z")} className={`px-3 py-1.5 rounded text-sm font-medium ${tab === "z" ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
          {t("tabZ")}
        </button>
        <button onClick={() => setTab("t")} className={`px-3 py-1.5 rounded text-sm font-medium ${tab === "t" ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
          {t("tabT")}
        </button>
      </div>

      {tab === "z" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded bg-gray-50 dark:bg-gray-800 space-y-1.5">
              <div className="text-xs text-muted">{t("zToP")}</div>
              <div className="flex items-center gap-2 font-mono">
                <span>z =</span>
                <input value={zIn} onChange={(e) => setZIn(e.target.value)} className="w-24 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-center" />
                <span>→ Φ(z) = <strong>{zToP !== null ? zToP.toFixed(5) : "—"}</strong></span>
              </div>
            </div>
            <div className="p-3 rounded bg-gray-50 dark:bg-gray-800 space-y-1.5">
              <div className="text-xs text-muted">{t("pToZ")}</div>
              <div className="flex items-center gap-2 font-mono">
                <span>p =</span>
                <input value={pIn} onChange={(e) => setPIn(e.target.value)} className="w-24 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-center" />
                <span>→ z = <strong>{pToZ !== null ? pToZ.toFixed(4) : "—"}</strong></span>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted">{t("zNote")}</div>
          <div className="overflow-x-auto">
            <table className="text-xs font-mono border-collapse">
              <thead>
                <tr>
                  <th className="px-2 py-1 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 sticky left-0">z</th>
                  {Array.from({ length: 10 }, (_, c) => (
                    <th key={c} className="px-2 py-1 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">.0{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {zRows.map((row) => (
                  <tr key={row.z}>
                    <td className="px-2 py-0.5 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 font-semibold sticky left-0">{row.z.toFixed(1)}</td>
                    {row.cells.map((v, c) => (
                      <td key={c} className="px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-right">{v.toFixed(4)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "t" && (
        <div className="space-y-3">
          <div className="text-xs text-muted">{t("tNote")}</div>
          <div className="overflow-x-auto">
            <table className="text-xs font-mono border-collapse">
              <thead>
                <tr>
                  <th className="px-2 py-1 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800" rowSpan={2}>df</th>
                  <th className="px-2 py-1 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-center" colSpan={5}>{t("oneTail")} α</th>
                </tr>
                <tr>
                  {T_ALPHAS.map((a) => (
                    <th key={a} className="px-3 py-1 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">{a}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tRows.map((row) => (
                  <tr key={row.df}>
                    <td className="px-2 py-0.5 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 font-semibold">{row.df}</td>
                    {row.cells.map((v, c) => (
                      <td key={c} className="px-3 py-0.5 border border-gray-200 dark:border-gray-700 text-right">{v.toFixed(3)}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-2 py-0.5 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 font-semibold">∞ (z)</td>
                  {tInf.map((v, c) => (
                    <td key={c} className="px-3 py-0.5 border border-gray-200 dark:border-gray-700 text-right">{v.toFixed(3)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-xs text-muted">{t("twoTailHint")}</div>
        </div>
      )}
    </div>
  );
}
