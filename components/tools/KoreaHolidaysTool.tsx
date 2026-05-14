"use client";

import { useMemo, useState } from "react";
import KoreanLunarCalendar from "korean-lunar-calendar";

type Holiday = { name: string; date: string; type: "fixed" | "lunar"; lunarMonth?: number; lunarDay?: number };

const FIXED: Holiday[] = [
  { name: "신정", date: "01-01", type: "fixed" },
  { name: "삼일절", date: "03-01", type: "fixed" },
  { name: "어린이날", date: "05-05", type: "fixed" },
  { name: "현충일", date: "06-06", type: "fixed" },
  { name: "광복절", date: "08-15", type: "fixed" },
  { name: "개천절", date: "10-03", type: "fixed" },
  { name: "한글날", date: "10-09", type: "fixed" },
  { name: "크리스마스", date: "12-25", type: "fixed" },
];

const LUNAR: Holiday[] = [
  { name: "설날 (전날)", date: "", type: "lunar", lunarMonth: 12, lunarDay: 30 },
  { name: "설날", date: "", type: "lunar", lunarMonth: 1, lunarDay: 1 },
  { name: "설날 (다음날)", date: "", type: "lunar", lunarMonth: 1, lunarDay: 2 },
  { name: "부처님오신날", date: "", type: "lunar", lunarMonth: 4, lunarDay: 8 },
  { name: "추석 (전날)", date: "", type: "lunar", lunarMonth: 8, lunarDay: 14 },
  { name: "추석", date: "", type: "lunar", lunarMonth: 8, lunarDay: 15 },
  { name: "추석 (다음날)", date: "", type: "lunar", lunarMonth: 8, lunarDay: 16 },
];

function lunarToSolar(year: number, m: number, d: number): string {
  try {
    const cal = new KoreanLunarCalendar();
    let yr = year;
    if (m === 12) yr = year - 1;
    if (cal.setLunarDate(yr, m, d, false)) {
      const s = cal.getSolarCalendar();
      return `${s.year}-${String(s.month).padStart(2, "0")}-${String(s.day).padStart(2, "0")}`;
    }
  } catch {}
  return "";
}

const KO_WEEKDAY = ["일","월","화","수","목","금","토"];

export default function KoreaHolidaysTool() {
  const [year, setYear] = useState(new Date().getFullYear());

  const holidays = useMemo(() => {
    const list: { name: string; date: string }[] = [];
    for (const h of FIXED) list.push({ name: h.name, date: `${year}-${h.date}` });
    for (const h of LUNAR) {
      const solar = lunarToSolar(year, h.lunarMonth!, h.lunarDay!);
      if (solar) list.push({ name: h.name, date: solar });
    }
    list.sort((a, b) => a.date.localeCompare(b.date));
    return list;
  }, [year]);

  return (
    <div className="card space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm">연도</label>
        <input type="number" min="1900" max="2100" value={year} onChange={(e) => setYear(+e.target.value)} className="w-28 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
        {holidays.map((h, i) => {
          const d = new Date(h.date + "T00:00:00");
          const wd = isNaN(d.getTime()) ? "" : KO_WEEKDAY[d.getDay()];
          const isWeekend = wd === "토" || wd === "일";
          return (
            <div key={i} className={`flex items-center justify-between p-3 ${isWeekend ? "bg-red-50 dark:bg-red-900/20" : ""}`}>
              <span className="font-medium">{h.name}</span>
              <span className={`text-sm font-mono ${wd === "일" ? "text-red-600" : wd === "토" ? "text-blue-600" : ""}`}>{h.date} ({wd})</span>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-muted">대체공휴일·임시공휴일은 정부 발표에 따라 별도 반영됩니다.</div>
    </div>
  );
}
