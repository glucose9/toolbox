"use client";

import { useMemo, useState } from "react";

function calcAges(birthStr: string, refStr: string) {
  const b = new Date(birthStr + "T00:00:00");
  const r = new Date(refStr + "T00:00:00");
  if (isNaN(b.getTime()) || isNaN(r.getTime())) return null;
  if (b > r) return null;

  // 만나이
  let man = r.getFullYear() - b.getFullYear();
  const hasBirthdayPassed = r.getMonth() > b.getMonth() || (r.getMonth() === b.getMonth() && r.getDate() >= b.getDate());
  if (!hasBirthdayPassed) man--;

  // 연나이 (현재 연도 - 출생 연도)
  const year = r.getFullYear() - b.getFullYear();

  // 세는나이 (태어나자마자 1살 + 새해마다 +1)
  const sen = r.getFullYear() - b.getFullYear() + 1;

  return { man, year, sen, hasBirthdayPassed };
}

export default function KoreanAgeTool() {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const [birth, setBirth] = useState("1995-01-15");
  const [ref, setRef] = useState(todayStr);

  const result = useMemo(() => calcAges(birth, ref), [birth, ref]);

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">생년월일</label>
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="label">기준 날짜</label>
          <input type="date" value={ref} onChange={(e) => setRef(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      {!result ? (
        <div className="text-sm text-red-600">날짜를 다시 확인해주세요.</div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-4 text-center">
            <div className="text-xs text-muted">만 나이 (법령 기준)</div>
            <div className="text-4xl font-bold mt-1">{result.man}</div>
            <div className="text-xs text-muted mt-1">{result.hasBirthdayPassed ? "올해 생일 지남" : "올해 생일 전"}</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
            <div className="text-xs text-muted">연 나이</div>
            <div className="text-4xl font-bold mt-1">{result.year}</div>
            <div className="text-xs text-muted mt-1">(현재 연도 − 출생 연도)</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
            <div className="text-xs text-muted">세는 나이</div>
            <div className="text-4xl font-bold mt-1">{result.sen}</div>
            <div className="text-xs text-muted mt-1">(전통 한국 셈법)</div>
          </div>
        </div>
      )}

      <div className="text-xs text-muted bg-gray-50 dark:bg-gray-900 p-3 rounded">
        2023년 6월 28일 시행된 <strong>만 나이 통일법</strong>에 따라, 한국의 모든 공식 문서·법령에서 나이는 <strong>만 나이</strong>로 셉니다.
      </div>
    </div>
  );
}
