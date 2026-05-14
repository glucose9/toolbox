"use client";

import { useMemo, useState } from "react";

type Mode = "add" | "sub" | "diff";

function parseTime(s: string): number | null {
  // HH:MM or HH:MM:SS
  const m = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const sec = m[3] ? parseInt(m[3], 10) : 0;
  if (h < 0 || min >= 60 || sec >= 60) return null;
  return h * 3600 + min * 60 + sec;
}

function fmtSec(total: number): string {
  const negative = total < 0;
  const t = Math.abs(total);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return `${negative ? "-" : ""}${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function TimeCalcTool() {
  const [mode, setMode] = useState<Mode>("add");
  const [t1, setT1] = useState("09:00:00");
  const [t2, setT2] = useState("02:30:00");

  const result = useMemo(() => {
    const a = parseTime(t1);
    const b = parseTime(t2);
    if (a === null || b === null) return { error: "HH:MM 또는 HH:MM:SS 형식" };
    let v = 0;
    if (mode === "add") v = a + b;
    else if (mode === "sub") v = a - b;
    else v = b - a;
    const days = Math.floor(v / 86400);
    return {
      total: v,
      formatted: fmtSec(v),
      dayWrap: days !== 0 ? `(${days >= 0 ? "+" : ""}${days}일)` : "",
      error: "",
    };
  }, [t1, t2, mode]);

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("add")} className={`btn ${mode === "add" ? "btn-primary" : "btn-secondary"}`}>덧셈</button>
        <button onClick={() => setMode("sub")} className={`btn ${mode === "sub" ? "btn-primary" : "btn-secondary"}`}>뺄셈</button>
        <button onClick={() => setMode("diff")} className={`btn ${mode === "diff" ? "btn-primary" : "btn-secondary"}`}>두 시각 차이</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{mode === "diff" ? "시각 A" : "기준 시각"}</label>
          <input type="text" value={t1} onChange={(e) => setT1(e.target.value)} placeholder="09:00:00" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
        </div>
        <div>
          <label className="label">{mode === "diff" ? "시각 B" : mode === "add" ? "더할 시간" : "뺄 시간"}</label>
          <input type="text" value={t2} onChange={(e) => setT2(e.target.value)} placeholder="02:30:00" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
        </div>
      </div>

      {result.error ? (
        <div className="text-sm text-red-600">{result.error}</div>
      ) : (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
          <div className="text-xs text-muted">결과</div>
          <div className="text-3xl font-bold mt-1 font-mono">{result.formatted}</div>
          {result.dayWrap && <div className="text-xs text-muted mt-1">{result.dayWrap}</div>}
        </div>
      )}
    </div>
  );
}
