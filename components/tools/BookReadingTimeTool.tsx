"use client";

import { useState } from "react";

function fmt(min: number): string {
  if (min < 60) return `${Math.round(min)}분`;
  const h = Math.floor(min / 60), m = Math.round(min % 60);
  return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
}

export default function BookReadingTimeTool() {
  const [pages, setPages] = useState(300);
  const [minPerPage, setMinPerPage] = useState(2);
  const [dailyMin, setDailyMin] = useState(30);

  const totalMin = pages * minPerPage;
  const daysToFinish = Math.ceil(totalMin / dailyMin);
  const totalHours = totalMin / 60;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">총 페이지</label><input type="number" value={pages} onChange={(e) => setPages(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">페이지당 분 ({minPerPage}분)</label><input type="range" min="0.5" max="5" step="0.1" value={minPerPage} onChange={(e) => setMinPerPage(+e.target.value)} className="w-full" /></div>
      </div>
      <div>
        <label className="label">하루 독서 시간 ({dailyMin}분)</label>
        <input type="range" min="10" max="180" step="5" value={dailyMin} onChange={(e) => setDailyMin(+e.target.value)} className="w-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">총 독서 시간</div>
          <div className="text-xl font-bold mt-1">{fmt(totalMin)}</div>
          <div className="text-xs text-muted">≈ {totalHours.toFixed(1)} 시간</div>
        </div>
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">완독까지</div>
          <div className="text-xl font-bold mt-1">{daysToFinish}일</div>
          <div className="text-xs text-muted">하루 {dailyMin}분 기준</div>
        </div>
      </div>
      <div className="text-xs text-muted">평균 한국어 독서: 페이지당 2~3분 (소설 빠름, 전문서 느림).</div>
    </div>
  );
}
