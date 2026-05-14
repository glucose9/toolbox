"use client";

import { useState } from "react";

// 2026년 한국 최저시급 (참고용; 실제 발표 후 업데이트 필요)
const KR_MIN_WAGE_2026 = 10310;

const fmt = (n: number) => (isFinite(n) && n > 0 ? Math.round(n).toLocaleString() : "");

export default function WageConverterTool() {
  const [hourlyHours, setHourlyHours] = useState(40);
  const [hourly, setHourly] = useState<number>(KR_MIN_WAGE_2026);

  const monthlyHours = (hourlyHours / 40) * 209; // 주 40h 기준 월 209h (주휴수당 포함)
  const monthly = hourly * monthlyHours;
  const daily = hourly * 8;
  const weekly = hourly * (hourlyHours + 8); // 주휴 1일
  const annual = monthly * 12;

  const setFrom = (val: number, kind: "h" | "d" | "w" | "m" | "y") => {
    if (kind === "h") setHourly(val);
    else if (kind === "d") setHourly(val / 8);
    else if (kind === "w") setHourly(val / (hourlyHours + 8));
    else if (kind === "m") setHourly(val / monthlyHours);
    else if (kind === "y") setHourly(val / (monthlyHours * 12));
  };

  const row = (label: string, value: number, kind: "h" | "d" | "w" | "m" | "y", note?: string) => (
    <div className="grid grid-cols-3 items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="text-sm font-medium">{label}</div>
      <input
        type="number"
        value={Math.round(value) || ""}
        onChange={(e) => setFrom(+e.target.value, kind)}
        className="col-span-1 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-right font-mono"
      />
      <div className="text-xs text-muted">{note || "원"}</div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
        <label>
          주 근로시간 ({hourlyHours}시간)
          <input type="range" min="15" max="68" value={hourlyHours} onChange={(e) => setHourlyHours(+e.target.value)} className="w-full mt-1" />
        </label>
        <div className="text-xs text-muted mt-1">주 {hourlyHours}h × 4.345 + 주휴 = 월 {Math.round(monthlyHours)}h</div>
      </div>

      <div>
        {row("시급", hourly, "h")}
        {row("일급", daily, "d", "원 (8시간)")}
        {row("주급", weekly, "w", `원 (${hourlyHours + 8}시간 포함)`)}
        {row("월급", monthly, "m", `원 (${Math.round(monthlyHours)}시간)`)}
        {row("연봉", annual, "y", "원")}
      </div>

      <div className="text-xs text-muted bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
        <strong>참고:</strong> 2026년 한국 최저시급은 {KR_MIN_WAGE_2026.toLocaleString()}원 입니다.{" "}
        시급 {hourly.toLocaleString()}원은 최저시급의 <strong>{Math.round((hourly / KR_MIN_WAGE_2026) * 100)}%</strong>.
        주 15h 이상 근무 시 주휴수당 포함, 세전 기준입니다.
      </div>
    </div>
  );
}
