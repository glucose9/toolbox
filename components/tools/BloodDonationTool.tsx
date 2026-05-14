"use client";
import { useMemo, useState } from "react";

const TYPES = [
  { name: "전혈", days: 56 },
  { name: "혈장 (플라즈마)", days: 14 },
  { name: "혈소판", days: 14 },
  { name: "적혈구", days: 112 },
];

export default function BloodDonationTool() {
  const [last, setLast] = useState(new Date().toISOString().slice(0, 10));
  const [typeIdx, setTypeIdx] = useState(0);

  const result = useMemo(() => {
    const d = new Date(last + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    const next = new Date(d.getTime() + TYPES[typeIdx].days * 86400000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const remaining = Math.ceil((next.getTime() - today.getTime()) / 86400000);
    return { next, remaining };
  }, [last, typeIdx]);

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">마지막 헌혈일</label><input type="date" value={last} onChange={(e) => setLast(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">종류</label><select value={typeIdx} onChange={(e) => setTypeIdx(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">{TYPES.map((t, i) => <option key={i} value={i}>{t.name} ({t.days}일)</option>)}</select></div>
      </div>
      {result && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
          <div className="text-xs text-muted">다음 가능일</div>
          <div className="text-2xl font-bold mt-1">{result.next.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</div>
          <div className={`text-sm mt-2 ${result.remaining > 0 ? "text-orange-600" : "text-green-600"}`}>
            {result.remaining > 0 ? `D-${result.remaining}` : "지금 헌혈 가능!"}
          </div>
        </div>
      )}
      <div className="text-xs text-muted">한국 적십자사 기준 헌혈 간격입니다. 건강 상태에 따라 추가 제한이 있을 수 있습니다.</div>
    </div>
  );
}
