"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Kind = "length" | "weight" | "temperature" | "area" | "volume";

type UnitDef = { key: string; toBase: (v: number) => number; fromBase: (v: number) => number };

const UNITS: Record<Kind, Record<string, UnitDef>> = {
  length: {
    m: { key: "m", toBase: (v) => v, fromBase: (v) => v },
    cm: { key: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    mm: { key: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    km: { key: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    inch: { key: "inch", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { key: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    yd: { key: "yd", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    mile: { key: "mile", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  weight: {
    g: { key: "g", toBase: (v) => v, fromBase: (v) => v },
    kg: { key: "kg", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    mg: { key: "mg", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    ton: { key: "ton", toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
    lb: { key: "lb", toBase: (v) => v * 453.59237, fromBase: (v) => v / 453.59237 },
    oz: { key: "oz", toBase: (v) => v * 28.349523125, fromBase: (v) => v / 28.349523125 },
  },
  temperature: {
    c: { key: "c", toBase: (v) => v, fromBase: (v) => v },
    f: { key: "f", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
    k: { key: "k", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  area: {
    "m2": { key: "m2", toBase: (v) => v, fromBase: (v) => v },
    "cm2": { key: "cm2", toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
    "km2": { key: "km2", toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
    pyeong: { key: "pyeong", toBase: (v) => v * 3.305785, fromBase: (v) => v / 3.305785 },
    acre: { key: "acre", toBase: (v) => v * 4046.8564, fromBase: (v) => v / 4046.8564 },
    hectare: { key: "hectare", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    "ft2": { key: "ft2", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  },
  volume: {
    L: { key: "L", toBase: (v) => v, fromBase: (v) => v },
    mL: { key: "mL", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    "m3": { key: "m3", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    gallon: { key: "gallon", toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
    floz: { key: "floz", toBase: (v) => v * 0.0295735296875, fromBase: (v) => v / 0.0295735296875 },
    cup: { key: "cup", toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
  },
};

function fmt(n: number): string {
  if (!isFinite(n)) return "";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.0001 || abs > 1e9)) return n.toExponential(4);
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export default function UnitConverterTool() {
  const t = useTranslations("toolUI.unit-converter");
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
            {t(`kind.${k}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 items-end">
        <div className="col-span-2">
          <label className="label">{t("value")}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
          />
        </div>
        <div>
          <label className="label">{t("unit")}</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm">
            {Object.entries(units).map(([k, u]) => (
              <option key={k} value={k}>
                {t(`unitLabel.${kind}.${u.key}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
        {Object.entries(units).map(([k, u]) => (
          <div key={k} className={`flex items-center justify-between px-3 py-2 text-sm ${k === from ? "bg-brand-50 dark:bg-brand-900/20" : ""}`}>
            <span className="text-muted">{t(`unitLabel.${kind}.${u.key}`)}</span>
            <span className="font-mono font-medium">{baseValue === null ? "—" : fmt(u.fromBase(baseValue))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
