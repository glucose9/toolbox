"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import KoreanLunarCalendar from "korean-lunar-calendar";

// 대체공휴일 규칙 (관공서의 공휴일에 관한 규정 §3): "weekend" = 토·일 겹침 시 대체,
// "sunday" = 일요일 겹침 시에만 대체 (설·추석 연휴)
type SubstRule = "weekend" | "sunday";

type FixedHoliday = { name: string; type: "fixed"; month: number; day: number; fromYear?: number; subst?: SubstRule };
type FloatingHoliday = {
  name: string;
  type: "floating";
  month: number;
  weekday: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  occurrence: number; // 1..5, or -1 for "last"
};
type LunarKoHoliday = { name: string; type: "lunar-ko"; lunarMonth: number; lunarDay: number; offsetDays?: number; subst?: SubstRule };
type LunarFixedHoliday = { name: string; type: "lunar-fixed"; dates: Record<number, string> };
type ApproxHoliday = { name: string; type: "approx"; dates: Record<number, string> };

type LocaleHoliday = FixedHoliday | FloatingHoliday | LunarKoHoliday | LunarFixedHoliday | ApproxHoliday;

// ---------- KO ----------
const KO_HOLIDAYS: LocaleHoliday[] = [
  { name: "신정", type: "fixed", month: 1, day: 1 },
  { name: "삼일절", type: "fixed", month: 3, day: 1, subst: "weekend" },
  // 노동절: 2026년부터 관공서 공휴일로 신규 지정
  { name: "노동절", type: "fixed", month: 5, day: 1, fromYear: 2026 },
  { name: "어린이날", type: "fixed", month: 5, day: 5, subst: "weekend" },
  { name: "현충일", type: "fixed", month: 6, day: 6 },
  // 제헌절: 2026년부터 공휴일 재지정
  { name: "제헌절", type: "fixed", month: 7, day: 17, fromYear: 2026 },
  { name: "광복절", type: "fixed", month: 8, day: 15, subst: "weekend" },
  { name: "개천절", type: "fixed", month: 10, day: 3, subst: "weekend" },
  { name: "한글날", type: "fixed", month: 10, day: 9, subst: "weekend" },
  { name: "크리스마스", type: "fixed", month: 12, day: 25, subst: "weekend" },
  // 설날 전날 = 설날(음 1/1) 하루 전. 음력 12월이 29일까지인 해에는 '음 12/30'이
  // 존재하지 않으므로 고정 음력일 대신 날짜 연산으로 구한다.
  { name: "설날 (전날)", type: "lunar-ko", lunarMonth: 1, lunarDay: 1, offsetDays: -1, subst: "sunday" },
  { name: "설날", type: "lunar-ko", lunarMonth: 1, lunarDay: 1, subst: "sunday" },
  { name: "설날 (다음날)", type: "lunar-ko", lunarMonth: 1, lunarDay: 2, subst: "sunday" },
  { name: "부처님오신날", type: "lunar-ko", lunarMonth: 4, lunarDay: 8, subst: "weekend" },
  { name: "추석 (전날)", type: "lunar-ko", lunarMonth: 8, lunarDay: 14, subst: "sunday" },
  { name: "추석", type: "lunar-ko", lunarMonth: 8, lunarDay: 15, subst: "sunday" },
  { name: "추석 (다음날)", type: "lunar-ko", lunarMonth: 8, lunarDay: 16, subst: "sunday" },
  // 공직선거법상 법정공휴일인 선거일 (확정 연도만 수록)
  { name: "지방선거", type: "approx", dates: { 2026: "2026-06-03" } },
];

// ---------- EN (US federal) ----------
const EN_HOLIDAYS: LocaleHoliday[] = [
  { name: "New Year's Day", type: "fixed", month: 1, day: 1 },
  { name: "Martin Luther King Jr. Day", type: "floating", month: 1, weekday: 1, occurrence: 3 },
  { name: "Presidents' Day", type: "floating", month: 2, weekday: 1, occurrence: 3 },
  { name: "Memorial Day", type: "floating", month: 5, weekday: 1, occurrence: -1 },
  { name: "Juneteenth", type: "fixed", month: 6, day: 19 },
  { name: "Independence Day", type: "fixed", month: 7, day: 4 },
  { name: "Labor Day", type: "floating", month: 9, weekday: 1, occurrence: 1 },
  { name: "Columbus Day", type: "floating", month: 10, weekday: 1, occurrence: 2 },
  { name: "Veterans Day", type: "fixed", month: 11, day: 11 },
  { name: "Thanksgiving Day", type: "floating", month: 11, weekday: 4, occurrence: 4 },
  { name: "Christmas Day", type: "fixed", month: 12, day: 25 },
];

// ---------- JA (Japan public holidays) ----------
// Spring/Autumn equinox dates pre-computed (2026-2030 approx)
const JA_EQUINOX_SPRING: Record<number, string> = {
  2026: "2026-03-20",
  2027: "2027-03-21",
  2028: "2028-03-20",
  2029: "2029-03-20",
  2030: "2030-03-20",
};
const JA_EQUINOX_AUTUMN: Record<number, string> = {
  2026: "2026-09-23",
  2027: "2027-09-23",
  2028: "2028-09-22",
  2029: "2029-09-23",
  2030: "2030-09-23",
};

const JA_HOLIDAYS: LocaleHoliday[] = [
  { name: "元日", type: "fixed", month: 1, day: 1 },
  { name: "成人の日", type: "floating", month: 1, weekday: 1, occurrence: 2 },
  { name: "建国記念の日", type: "fixed", month: 2, day: 11 },
  { name: "天皇誕生日", type: "fixed", month: 2, day: 23 },
  { name: "春分の日", type: "approx", dates: JA_EQUINOX_SPRING },
  { name: "昭和の日", type: "fixed", month: 4, day: 29 },
  { name: "憲法記念日", type: "fixed", month: 5, day: 3 },
  { name: "みどりの日", type: "fixed", month: 5, day: 4 },
  { name: "こどもの日", type: "fixed", month: 5, day: 5 },
  { name: "海の日", type: "floating", month: 7, weekday: 1, occurrence: 3 },
  { name: "山の日", type: "fixed", month: 8, day: 11 },
  { name: "敬老の日", type: "floating", month: 9, weekday: 1, occurrence: 3 },
  { name: "秋分の日", type: "approx", dates: JA_EQUINOX_AUTUMN },
  { name: "スポーツの日", type: "floating", month: 10, weekday: 1, occurrence: 2 },
  { name: "文化の日", type: "fixed", month: 11, day: 3 },
  { name: "勤労感謝の日", type: "fixed", month: 11, day: 23 },
];

// ---------- ZH (China public holidays) ----------
// Lunar/floating Chinese holidays pre-computed
const ZH_CHUNJIE: Record<number, string> = {
  2026: "2026-02-17",
  2027: "2027-02-06",
  2028: "2028-01-26",
  2029: "2029-02-13",
  2030: "2030-02-03",
};
const ZH_QINGMING: Record<number, string> = {
  2026: "2026-04-05",
  2027: "2027-04-05",
  2028: "2028-04-04",
  2029: "2029-04-04",
  2030: "2030-04-05",
};
const ZH_DUANWU: Record<number, string> = {
  2026: "2026-06-19",
  2027: "2027-06-09",
  2028: "2028-05-28",
  2029: "2029-06-16",
  2030: "2030-06-05",
};
const ZH_ZHONGQIU: Record<number, string> = {
  2026: "2026-09-25",
  2027: "2027-09-15",
  2028: "2028-10-03",
  2029: "2029-09-22",
  2030: "2030-09-12",
};

const ZH_HOLIDAYS: LocaleHoliday[] = [
  { name: "元旦", type: "fixed", month: 1, day: 1 },
  { name: "春节", type: "lunar-fixed", dates: ZH_CHUNJIE },
  { name: "清明节", type: "lunar-fixed", dates: ZH_QINGMING },
  { name: "劳动节", type: "fixed", month: 5, day: 1 },
  { name: "端午节", type: "lunar-fixed", dates: ZH_DUANWU },
  { name: "中秋节", type: "lunar-fixed", dates: ZH_ZHONGQIU },
  { name: "国庆节", type: "fixed", month: 10, day: 1 },
];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function fmt(year: number, month: number, day: number) {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function lunarToSolar(year: number, m: number, d: number, offsetDays = 0): string {
  try {
    const cal = new KoreanLunarCalendar();
    let yr = year;
    if (m === 12) yr = year - 1;
    if (cal.setLunarDate(yr, m, d, false)) {
      const s = cal.getSolarCalendar();
      const dt = new Date(s.year, s.month - 1, s.day + offsetDays);
      return fmt(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
    }
  } catch {}
  return "";
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, occurrence: number): string {
  if (occurrence === -1) {
    // last occurrence of weekday in the month
    const lastDay = new Date(year, month, 0).getDate();
    for (let d = lastDay; d >= 1; d--) {
      const dt = new Date(year, month - 1, d);
      if (dt.getDay() === weekday) return fmt(year, month, d);
    }
    return "";
  }
  // nth occurrence
  let count = 0;
  const lastDay = new Date(year, month, 0).getDate();
  for (let d = 1; d <= lastDay; d++) {
    const dt = new Date(year, month - 1, d);
    if (dt.getDay() === weekday) {
      count++;
      if (count === occurrence) return fmt(year, month, d);
    }
  }
  return "";
}

function resolveHoliday(h: LocaleHoliday, year: number): string {
  if (h.type === "fixed") return fmt(year, h.month, h.day);
  if (h.type === "floating") return nthWeekdayOfMonth(year, h.month, h.weekday, h.occurrence);
  if (h.type === "lunar-ko") return lunarToSolar(year, h.lunarMonth, h.lunarDay, h.offsetDays ?? 0);
  if (h.type === "lunar-fixed" || h.type === "approx") return h.dates[year] || "";
  return "";
}

function pickDataset(locale: string): LocaleHoliday[] {
  if (locale.startsWith("ko")) return KO_HOLIDAYS;
  if (locale.startsWith("ja")) return JA_HOLIDAYS;
  if (locale.startsWith("zh")) return ZH_HOLIDAYS;
  return EN_HOLIDAYS;
}

export default function KoreaHolidaysTool() {
  const t = useTranslations("toolUI.korea-holidays");
  const locale = useLocale();
  const [year, setYear] = useState(new Date().getFullYear());

  const WEEKDAYS = [t("sun"), t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat")];

  const dataset = useMemo(() => pickDataset(locale), [locale]);

  const holidays = useMemo(() => {
    const list: { name: string; date: string }[] = [];
    const substSources: { name: string; date: string; rule: SubstRule }[] = [];
    for (const h of dataset) {
      if (h.type === "fixed" && h.fromYear && year < h.fromYear) continue;
      const solar = resolveHoliday(h, year);
      if (!solar) continue;
      list.push({ name: h.name, date: solar });
      if ((h.type === "fixed" || h.type === "lunar-ko") && h.subst) {
        substSources.push({ name: h.name, date: solar, rule: h.subst });
      }
    }
    // 대체공휴일: 겹침 발생 시 그 날 이후 첫 번째 비공휴일 평일
    const taken = new Set(list.map((x) => x.date));
    for (const s of substSources) {
      const d = new Date(s.date + "T00:00:00");
      if (isNaN(d.getTime())) continue;
      const day = d.getDay();
      const hit = s.rule === "sunday" ? day === 0 : day === 0 || day === 6;
      if (!hit) continue;
      do {
        d.setDate(d.getDate() + 1);
      } while (d.getDay() === 0 || d.getDay() === 6 || taken.has(fmt(d.getFullYear(), d.getMonth() + 1, d.getDate())));
      const sub = fmt(d.getFullYear(), d.getMonth() + 1, d.getDate());
      taken.add(sub);
      list.push({ name: `${s.name} 대체공휴일`, date: sub });
    }
    list.sort((a, b) => a.date.localeCompare(b.date));
    return list;
  }, [dataset, year]);

  return (
    <div className="card space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm">{t("year")}</label>
        <input type="number" min="1900" max="2100" value={year} onChange={(e) => setYear(+e.target.value)} className="w-28 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
        {holidays.map((h, i) => {
          const d = new Date(h.date + "T00:00:00");
          const dayIdx = isNaN(d.getTime()) ? -1 : d.getDay();
          const wd = dayIdx >= 0 ? WEEKDAYS[dayIdx] : "";
          const isWeekend = dayIdx === 0 || dayIdx === 6;
          return (
            <div key={i} className={`flex items-center justify-between p-3 ${isWeekend ? "bg-red-50 dark:bg-red-900/20" : ""}`}>
              <span className="font-medium">{h.name}</span>
              <span className={`text-sm font-mono ${dayIdx === 0 ? "text-red-600" : dayIdx === 6 ? "text-blue-600" : ""}`}>{h.date} ({wd})</span>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
