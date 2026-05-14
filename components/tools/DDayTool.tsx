"use client";

import { useState } from "react";

type Mode = "dday" | "diff" | "after";

const DAY_MS = 86400000;

function dateOnly(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function fmt(d: Date): string {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", weekday: "long" });
}

export default function DDayTool() {
  const [mode, setMode] = useState<Mode>("dday");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  const [target, setTarget] = useState(todayStr);
  const [from, setFrom] = useState(todayStr);
  const [to, setTo] = useState(todayStr);
  const [base, setBase] = useState(todayStr);
  const [n, setN] = useState(100);

  const result = (() => {
    if (mode === "dday") {
      const t = dateOnly(target);
      if (!t) return null;
      const diff = Math.round((t.getTime() - today.getTime()) / DAY_MS);
      const label = diff === 0 ? "D-DAY" : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
      return (
        <div>
          <div className="text-3xl font-bold">{label}</div>
          <div className="text-sm text-muted mt-1">{fmt(t)}</div>
          <div className="text-sm mt-1">
            {diff > 0 ? `${diff}일 남음` : diff < 0 ? `${Math.abs(diff)}일 지남` : "오늘입니다"}
          </div>
        </div>
      );
    }
    if (mode === "diff") {
      const a = dateOnly(from);
      const b = dateOnly(to);
      if (!a || !b) return null;
      const days = Math.round((b.getTime() - a.getTime()) / DAY_MS);
      const absDays = Math.abs(days);
      const weeks = Math.floor(absDays / 7);
      const restDays = absDays % 7;
      return (
        <div>
          <div className="text-3xl font-bold">{absDays.toLocaleString()}일</div>
          <div className="text-sm text-muted mt-1">
            ≈ {weeks}주 {restDays}일 ({(absDays / 365.25).toFixed(2)}년)
          </div>
          <div className="text-sm mt-1">
            {fmt(a)} → {fmt(b)} {days < 0 ? "(역방향)" : ""}
          </div>
        </div>
      );
    }
    const b = dateOnly(base);
    if (!b) return null;
    const out = new Date(b.getTime() + n * DAY_MS);
    return (
      <div>
        <div className="text-3xl font-bold">{out.toISOString().slice(0, 10)}</div>
        <div className="text-sm text-muted mt-1">{fmt(out)}</div>
        <div className="text-sm mt-1">{fmt(b)}에서 {n >= 0 ? `${n}일 후` : `${Math.abs(n)}일 전`}</div>
      </div>
    );
  })();

  return (
    <div className="card space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setMode("dday")} className={`btn ${mode === "dday" ? "btn-primary" : "btn-secondary"}`}>D-day</button>
        <button onClick={() => setMode("diff")} className={`btn ${mode === "diff" ? "btn-primary" : "btn-secondary"}`}>두 날짜 차이</button>
        <button onClick={() => setMode("after")} className={`btn ${mode === "after" ? "btn-primary" : "btn-secondary"}`}>N일 후/전</button>
      </div>

      {mode === "dday" && (
        <div>
          <label className="label">목표 날짜</label>
          <input type="date" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      )}
      {mode === "diff" && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label">시작</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
          <div>
            <label className="label">종료</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
        </div>
      )}
      {mode === "after" && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label">기준 날짜</label>
            <input type="date" value={base} onChange={(e) => setBase(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
          <div>
            <label className="label">일수 (음수: 이전)</label>
            <input type="number" value={n} onChange={(e) => setN(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
        </div>
      )}

      <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded border border-brand-200 dark:border-brand-800">
        {result}
      </div>
    </div>
  );
}
