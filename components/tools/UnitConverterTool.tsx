"use client";

import { useState } from "react";

type Kind = "length" | "weight" | "temperature" | "area" | "volume";

type UnitDef = { label: string; toBase: (v: number) => number; fromBase: (v: number) => number };

const UNITS: Record<Kind, Record<string, UnitDef>> = {
  length: {
    m: { label: "미터 (m)", toBase: (v) => v, fromBase: (v) => v },
    cm: { label: "센티미터 (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    mm: { label: "밀리미터 (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    km: { label: "킬로미터 (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    inch: { label: "인치 (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { label: "피트 (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    yd: { label: "야드 (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    mile: { label: "마일 (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  weight: {
    g: { label: "그램 (g)", toBase: (v) => v, fromBase: (v) => v },
    kg: { label: "킬로그램 (kg)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    mg: { label: "밀리그램 (mg)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    ton: { label: "톤 (t)", toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
    lb: { label: "파운드 (lb)", toBase: (v) => v * 453.59237, fromBase: (v) => v / 453.59237 },
    oz: { label: "온스 (oz)", toBase: (v) => v * 28.349523125, fromBase: (v) => v / 28.349523125 },
  },
  temperature: {
    c: { label: "섭씨 (°C)", toBase: (v) => v, fromBase: (v) => v },
    f: { label: "화씨 (°F)", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
    k: { label: "켈빈 (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  area: {
    "m2": { label: "제곱미터 (m²)", toBase: (v) => v, fromBase: (v) => v },
    "cm2": { label: "제곱센티미터 (cm²)", toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
    "km2": { label: "제곱킬로미터 (km²)", toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
    pyeong: { label: "평", toBase: (v) => v * 3.305785, fromBase: (v) => v / 3.305785 },
    acre: { label: "에이커 (acre)", toBase: (v) => v * 4046.8564, fromBase: (v) => v / 4046.8564 },
    hectare: { label: "헥타르 (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    "ft2": { label: "제곱피트 (ft²)", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  },
  volume: {
    L: { label: "리터 (L)", toBase: (v) => v, fromBase: (v) => v },
    mL: { label: "밀리리터 (mL)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    "m3": { label: "세제곱미터 (m³)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    gallon: { label: "갤런 (US gal)", toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
    floz: { label: "액량 온스 (US fl oz)", toBase: (v) => v * 0.0295735296875, fromBase: (v) => v / 0.0295735296875 },
    cup: { label: "컵 (US)", toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
  },
};

const KIND_LABEL: Record<Kind, string> = {
  length: "길이",
  weight: "무게",
  temperature: "온도",
  area: "면적",
  volume: "부피",
};

function fmt(n: number): string {
  if (!isFinite(n)) return "";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.0001 || abs > 1e9)) return n.toExponential(4);
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export default function UnitConverterTool() {
  const [kind, setKind] = useState<Kind>("length");
  const [value, setValue] = useState<string>("1");
  const [from, setFrom] = useState<string>("m");

  const units = UNITS[kind];
  const v = parseFloat(value);
  const baseValue = isNaN(v) ? null : units[from].toBase(v);

  const switchKind = (k: Kind) => {
    setKind(k);
    const first = Object.keys(UNITS[k])[0];
    setFrom(first);
    setValue("1");
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(UNITS) as Kind[]).map((k) => (
          <button
            key={k}
            onClick={() => switchKind(k)}
            className={`btn ${kind === k ? "btn-primary" : "btn-secondary"}`}
          >
            {KIND_LABEL[k]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 items-end">
        <div className="col-span-2">
          <label className="label">값</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
          />
        </div>
        <div>
          <label className="label">단위</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm">
            {Object.entries(units).map(([k, u]) => (
              <option key={k} value={k}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
        {Object.entries(units).map(([k, u]) => (
          <div key={k} className={`flex items-center justify-between px-3 py-2 text-sm ${k === from ? "bg-brand-50 dark:bg-brand-900/20" : ""}`}>
            <span className="text-muted">{u.label}</span>
            <span className="font-mono font-medium">{baseValue === null ? "—" : fmt(u.fromBase(baseValue))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
