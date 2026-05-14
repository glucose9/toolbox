"use client";

import { useMemo, useState } from "react";

const Z = [
  { name: "물병자리", emoji: "♒", start: [1, 20], end: [2, 18], traits: "독립적·창의적·인도주의" },
  { name: "물고기자리", emoji: "♓", start: [2, 19], end: [3, 20], traits: "감성적·직관적·예술적" },
  { name: "양자리", emoji: "♈", start: [3, 21], end: [4, 19], traits: "용기·열정·리더십" },
  { name: "황소자리", emoji: "♉", start: [4, 20], end: [5, 20], traits: "끈기·실용적·신뢰" },
  { name: "쌍둥이자리", emoji: "♊", start: [5, 21], end: [6, 21], traits: "재치·다재다능·호기심" },
  { name: "게자리", emoji: "♋", start: [6, 22], end: [7, 22], traits: "가족중심·감수성·보호본능" },
  { name: "사자자리", emoji: "♌", start: [7, 23], end: [8, 22], traits: "자신감·리더·관대" },
  { name: "처녀자리", emoji: "♍", start: [8, 23], end: [9, 22], traits: "분석적·완벽주의·헌신" },
  { name: "천칭자리", emoji: "♎", start: [9, 23], end: [10, 22], traits: "조화·외교적·예술감각" },
  { name: "전갈자리", emoji: "♏", start: [10, 23], end: [11, 21], traits: "강한 의지·신비·열정" },
  { name: "사수자리", emoji: "♐", start: [11, 22], end: [12, 21], traits: "낙천적·자유·모험" },
  { name: "염소자리", emoji: "♑", start: [12, 22], end: [1, 19], traits: "야망·책임감·인내" },
];

function find(month: number, day: number) {
  for (const z of Z) {
    if (z.start[0] === z.end[0]) {
      if (month === z.start[0] && day >= z.start[1] && day <= z.end[1]) return z;
    } else {
      if ((month === z.start[0] && day >= z.start[1]) || (month === z.end[0] && day <= z.end[1])) return z;
    }
  }
  return Z[11]; // 염소자리 (year wrap)
}

export default function ZodiacTool() {
  const today = new Date();
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
          <div className="text-2xl font-bold mt-2">{z.name}</div>
          <div className="text-sm text-muted mt-2">{`${z.start[0]}월 ${z.start[1]}일 ~ ${z.end[0]}월 ${z.end[1]}일`}</div>
          <div className="text-sm mt-3">{z.traits}</div>
        </div>
      )}
    </div>
  );
}
