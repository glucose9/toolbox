"use client";

import { useState } from "react";

const BASES = [
  { name: "10진수", base: 10 },
  { name: "2진수", base: 2 },
  { name: "8진수", base: 8 },
  { name: "16진수", base: 16 },
] as const;

function toBase(n: number, base: number): string {
  if (!isFinite(n)) return "";
  if (Number.isInteger(n)) return n.toString(base).toUpperCase();
  const intPart = Math.trunc(n);
  let frac = Math.abs(n - intPart);
  let out = intPart.toString(base).toUpperCase() + ".";
  for (let i = 0; i < 12 && frac > 0; i++) {
    frac *= base;
    const digit = Math.floor(frac);
    out += digit.toString(base).toUpperCase();
    frac -= digit;
  }
  return out;
}

function fromBase(s: string, base: number): number | null {
  s = s.trim();
  if (!s) return null;
  const sign = s.startsWith("-") ? -1 : 1;
  s = s.replace(/^[-+]/, "");
  const [intStr, fracStr = ""] = s.split(".");
  if (!intStr && !fracStr) return null;
  const intVal = intStr ? parseInt(intStr, base) : 0;
  if (Number.isNaN(intVal)) return null;
  let fracVal = 0;
  for (let i = 0; i < fracStr.length; i++) {
    const d = parseInt(fracStr[i], base);
    if (Number.isNaN(d)) return null;
    fracVal += d / Math.pow(base, i + 1);
  }
  return sign * (intVal + fracVal);
}

export default function BaseConverterTool() {
  const [values, setValues] = useState<Record<number, string>>({ 10: "255", 2: "11111111", 8: "377", 16: "FF" });
  const [error, setError] = useState<Record<number, string>>({});

  const update = (fromBaseN: number, raw: string) => {
    setValues((prev) => ({ ...prev, [fromBaseN]: raw }));
    setError({});
    if (!raw.trim()) {
      const cleared: Record<number, string> = { 2: "", 8: "", 10: "", 16: "" };
      setValues(cleared);
      return;
    }
    const num = fromBase(raw, fromBaseN);
    if (num === null) {
      setError({ [fromBaseN]: "잘못된 형식" });
      return;
    }
    const next: Record<number, string> = { ...values, [fromBaseN]: raw };
    for (const { base } of BASES) {
      if (base !== fromBaseN) next[base] = toBase(num, base);
    }
    setValues(next);
  };

  return (
    <div className="card space-y-3">
      <div className="space-y-2">
        {BASES.map(({ name, base }) => (
          <div key={base}>
            <label className="label">{name} (base {base})</label>
            <input
              type="text"
              value={values[base] ?? ""}
              onChange={(e) => update(base, e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
            />
            {error[base] && <div className="text-xs text-red-600 mt-1">{error[base]}</div>}
          </div>
        ))}
      </div>
      <div className="text-xs text-muted">힌트: 16진수는 A~F, 2진수는 0/1만 사용. 소수도 가능 (예: 10진 0.5 = 2진 0.1).</div>
    </div>
  );
}
