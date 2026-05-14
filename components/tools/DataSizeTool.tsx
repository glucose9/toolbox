"use client";
import { useState } from "react";

const UNITS_SI = [{ n: "B", f: 1 }, { n: "KB", f: 1e3 }, { n: "MB", f: 1e6 }, { n: "GB", f: 1e9 }, { n: "TB", f: 1e12 }, { n: "PB", f: 1e15 }];
const UNITS_IEC = [{ n: "B", f: 1 }, { n: "KiB", f: 1024 }, { n: "MiB", f: 1024 ** 2 }, { n: "GiB", f: 1024 ** 3 }, { n: "TiB", f: 1024 ** 4 }, { n: "PiB", f: 1024 ** 5 }];

const fmt = (n: number) => isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—";

export default function DataSizeTool() {
  const [value, setValue] = useState(1);
  const [unit, setUnit] = useState("MB");
  const [mode, setMode] = useState<"si" | "iec">("si");
  const units = mode === "si" ? UNITS_SI : UNITS_IEC;
  const u = units.find((x) => x.n === unit) || units[0];
  const bytes = value * u.f;
  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => { setMode("si"); setUnit("MB"); }} className={`btn flex-1 ${mode === "si" ? "btn-primary" : "btn-secondary"}`}>SI (1000)</button>
        <button onClick={() => { setMode("iec"); setUnit("MiB"); }} className={`btn flex-1 ${mode === "iec" ? "btn-primary" : "btn-secondary"}`}>IEC (1024)</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input type="number" value={value} onChange={(e) => setValue(+e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        <select value={unit} onChange={(e) => setUnit(e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
          {units.map((u) => <option key={u.n}>{u.n}</option>)}
        </select>
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
        {units.map((x) => (
          <div key={x.n} className={`flex justify-between px-3 py-2 text-sm ${x.n === unit ? "bg-brand-50 dark:bg-brand-900/20" : ""}`}>
            <span className="text-muted">{x.n}</span>
            <span className="font-mono">{fmt(bytes / x.f)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
