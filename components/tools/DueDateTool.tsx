"use client";

import { useMemo, useState } from "react";

type Mode = "lmp" | "conception";
const DAY_MS = 86400000;

function fmt(d: Date): string {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", weekday: "long" });
}

function trimester(weeks: number): string {
  if (weeks < 13) return "1삼분기 (Trimester 1)";
  if (weeks < 27) return "2삼분기 (Trimester 2)";
  return "3삼분기 (Trimester 3)";
}

export default function DueDateTool() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  const [mode, setMode] = useState<Mode>("lmp");
  const [date, setDate] = useState(todayStr);

  const result = useMemo(() => {
    const d = new Date(date + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    let conceptionDate: Date, dueDate: Date;
    if (mode === "lmp") {
      conceptionDate = new Date(d.getTime() + 14 * DAY_MS);
      dueDate = new Date(d.getTime() + 280 * DAY_MS);
    } else {
      conceptionDate = d;
      dueDate = new Date(d.getTime() + 266 * DAY_MS);
    }
    const daysFromConception = Math.floor((today.getTime() - conceptionDate.getTime()) / DAY_MS);
    const totalDaysPreg = mode === "lmp" ? Math.floor((today.getTime() - d.getTime()) / DAY_MS) : daysFromConception + 14;
    const weeks = Math.floor(totalDaysPreg / 7);
    const days = totalDaysPreg % 7;
    const daysToDue = Math.ceil((dueDate.getTime() - today.getTime()) / DAY_MS);
    return { dueDate, conceptionDate, weeks, days, totalDaysPreg, daysToDue };
  }, [date, mode]);

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("lmp")} className={`btn ${mode === "lmp" ? "btn-primary" : "btn-secondary"}`}>마지막 생리일 (LMP)</button>
        <button onClick={() => setMode("conception")} className={`btn ${mode === "conception" ? "btn-primary" : "btn-secondary"}`}>수정일</button>
      </div>

      <div>
        <label className="label">{mode === "lmp" ? "마지막 생리 시작일" : "수정 추정일"}</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>

      {result && (
        <>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
            <div className="text-xs text-muted">예상 출산일</div>
            <div className="text-2xl font-bold mt-1">{fmt(result.dueDate)}</div>
            {result.daysToDue > 0 && <div className="text-sm text-muted mt-1">D-{result.daysToDue}</div>}
            {result.daysToDue <= 0 && <div className="text-sm text-muted mt-1">예정일 지남 ({Math.abs(result.daysToDue)}일)</div>}
          </div>

          {result.totalDaysPreg >= 0 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
                <div className="text-xs text-muted">현재 임신 주수</div>
                <div className="text-xl font-bold mt-1">{result.weeks}주 {result.days}일</div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
                <div className="text-xs text-muted">삼분기</div>
                <div className="text-xl font-bold mt-1">{trimester(result.weeks)}</div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted">
            수정 추정일: {fmt(result.conceptionDate)} · Naegele 공식 기반 추정치입니다. 정확한 정보는 산부인과 진료를 받으세요.
          </div>
        </>
      )}
    </div>
  );
}
