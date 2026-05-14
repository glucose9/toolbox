"use client";

import { useMemo, useState } from "react";

const ANIMALS = ["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"];
const EMOJI = ["🐒","🐔","🐕","🐖","🐀","🐂","🐅","🐇","🐉","🐍","🐎","🐑"];
const HEAVEN = ["갑","을","병","정","무","기","경","신","임","계"];
const EARTH = ["자","축","인","묘","진","사","오","미","신","유","술","해"];

export default function ChineseZodiacTool() {
  const [year, setYear] = useState(2000);
  const result = useMemo(() => {
    const idx = year % 12;
    const animal = ANIMALS[idx];
    const emoji = EMOJI[idx];
    const heavenIdx = (year - 4) % 10;
    const earthIdx = (year - 4) % 12;
    const ganji = `${HEAVEN[heavenIdx]}${EARTH[earthIdx]}`;
    return { animal, emoji, ganji };
  }, [year]);

  return (
    <div className="card space-y-3">
      <label className="label">출생 연도</label>
      <input type="number" value={year} onChange={(e) => setYear(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base" />
      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-6 text-center">
        <div className="text-6xl">{result.emoji}</div>
        <div className="text-2xl font-bold mt-2">{result.animal}띠</div>
        <div className="text-sm text-muted mt-2">간지: <strong>{result.ganji}</strong>년</div>
      </div>
      <div className="text-xs text-muted">전통적으로 띠는 음력 입춘(2월 초) 기준입니다. 1~2월 초 출생은 전 해 띠일 수 있습니다.</div>
    </div>
  );
}
