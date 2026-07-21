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

const T_DFS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 60, 120];
const T_ALPHAS = [0.1, 0.05, 0.025, 0.01, 0.005];

// Student-t one-tail critical values for T_DFS × T_ALPHAS, precomputed offline
// (incomplete-beta CDF, cross-checked against Simpson integration to <1e-10 and
// textbook tables: t(10,.05)=1.812, t(1,.025)=12.706, t(30,.005)=2.750).
// Precomputed because deriving these numerically at runtime froze the main
// thread for seconds on mount.
const T_CRIT: number[][] = [
  [3.0777, 6.3138, 12.7062, 31.8205, 63.6567],
  [1.8856, 2.92, 4.3027, 6.9646, 9.9248],
  [1.6377, 2.3534, 3.1824, 4.5407, 5.8409],
  [1.5332, 2.1318, 2.7764, 3.7469, 4.6041],
  [1.4759, 2.015, 2.5706, 3.3649, 4.0321],
  [1.4398, 1.9432, 2.4469, 3.1427, 3.7074],
  [1.4149, 1.8946, 2.3646, 2.998, 3.4995],
  [1.3968, 1.8595, 2.306, 2.8965, 3.3554],
  [1.383, 1.8331, 2.2622, 2.8214, 3.2498],
  [1.3722, 1.8125, 2.2281, 2.7638, 3.1693],
  [1.3634, 1.7959, 2.201, 2.7181, 3.1058],
  [1.3562, 1.7823, 2.1788, 2.681, 3.0545],
  [1.3502, 1.7709, 2.1604, 2.6503, 3.0123],
  [1.345, 1.7613, 2.1448, 2.6245, 2.9768],
  [1.3406, 1.7531, 2.1314, 2.6025, 2.9467],
  [1.3368, 1.7459, 2.1199, 2.5835, 2.9208],
  [1.3334, 1.7396, 2.1098, 2.5669, 2.8982],
  [1.3304, 1.7341, 2.1009, 2.5524, 2.8784],
  [1.3277, 1.7291, 2.093, 2.5395, 2.8609],
  [1.3253, 1.7247, 2.086, 2.528, 2.8453],
  [1.3232, 1.7207, 2.0796, 2.5176, 2.8314],
  [1.3212, 1.7171, 2.0739, 2.5083, 2.8188],
  [1.3195, 1.7139, 2.0687, 2.4999, 2.8073],
  [1.3178, 1.7109, 2.0639, 2.4922, 2.7969],
  [1.3163, 1.7081, 2.0595, 2.4851, 2.7874],
  [1.315, 1.7056, 2.0555, 2.4786, 2.7787],
  [1.3137, 1.7033, 2.0518, 2.4727, 2.7707],
  [1.3125, 1.7011, 2.0484, 2.4671, 2.7633],
  [1.3114, 1.6991, 2.0452, 2.462, 2.7564],
  [1.3104, 1.6973, 2.0423, 2.4573, 2.75],
  [1.3031, 1.6839, 2.0211, 2.4233, 2.7045],
  [1.2958, 1.6706, 2.0003, 2.3901, 2.6603],
  [1.2886, 1.6577, 1.9799, 2.3578, 2.6174],
];

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

  // t critical-value table (precomputed constants)
  const tRows = useMemo(
    () => T_DFS.map((df, i) => ({ df, cells: T_CRIT[i] })),
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
