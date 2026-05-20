"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const Z_KEYS = [
  { key: "aquarius", emoji: "♒", start: [1, 20], end: [2, 18] },
  { key: "pisces", emoji: "♓", start: [2, 19], end: [3, 20] },
  { key: "aries", emoji: "♈", start: [3, 21], end: [4, 19] },
  { key: "taurus", emoji: "♉", start: [4, 20], end: [5, 20] },
  { key: "gemini", emoji: "♊", start: [5, 21], end: [6, 21] },
  { key: "cancer", emoji: "♋", start: [6, 22], end: [7, 22] },
  { key: "leo", emoji: "♌", start: [7, 23], end: [8, 22] },
  { key: "virgo", emoji: "♍", start: [8, 23], end: [9, 22] },
  { key: "libra", emoji: "♎", start: [9, 23], end: [10, 22] },
  { key: "scorpio", emoji: "♏", start: [10, 23], end: [11, 21] },
  { key: "sagittarius", emoji: "♐", start: [11, 22], end: [12, 21] },
  { key: "capricorn", emoji: "♑", start: [12, 22], end: [1, 19] },
];

function find(month: number, day: number) {
  for (const z of Z_KEYS) {
    if (z.start[0] === z.end[0]) {
      if (month === z.start[0] && day >= z.start[1] && day <= z.end[1]) return z;
    } else {
      if ((month === z.start[0] && day >= z.start[1]) || (month === z.end[0] && day <= z.end[1])) return z;
    }
  }
  return Z_KEYS[11]; // capricorn (year wrap)
}

export default function ZodiacTool() {
  const t = useTranslations("toolUI.zodiac");
  const [date, setDate] = useState(`2000-01-15`);
  const z = useMemo(() => {
    const d = new Date(date + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    return find(d.getMonth() + 1, d.getDate());
  }, [date]);

  return (
    <div className="card space-y-3">
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      {z && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-6 text-center">
          <div className="text-6xl">{z.emoji}</div>
          <div className="text-2xl font-bold mt-2">{t(`name_${z.key}`)}</div>
          <div className="text-sm text-muted mt-2">{t("range", { sm: z.start[0], sd: z.start[1], em: z.end[0], ed: z.end[1] })}</div>
          <div className="text-sm mt-3">{t(`traits_${z.key}`)}</div>
        </div>
      )}
    </div>
  );
}
