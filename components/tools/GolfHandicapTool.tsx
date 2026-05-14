"use client";
import { useMemo, useState } from "react";

export default function GolfHandicapTool() {
  const [scores, setScores] = useState("85\n88\n91\n82\n86\n89\n84\n90\n87\n83");
  const [coursePar, setCoursePar] = useState(72);
  const result = useMemo(() => {
    const nums = scores.split(/\s+/).map(Number).filter((n) => !isNaN(n) && n > 0);
    if (nums.length === 0) return null;
    const sorted = [...nums].sort((a, b) => a - b);
    const take = nums.length >= 20 ? 8 : nums.length >= 10 ? Math.floor(nums.length * 0.4) : Math.max(1, Math.floor(nums.length / 2));
    const best = sorted.slice(0, take);
    const avgDiff = best.reduce((s, n) => s + (n - coursePar), 0) / take * 0.96;
    return { count: nums.length, take, handicap: avgDiff.toFixed(1), avgScore: (sorted.reduce((s, n) => s + n, 0) / sorted.length).toFixed(1) };
  }, [scores, coursePar]);
  return (
    <div className="card space-y-3">
      <div>
        <label className="label">최근 라운드 스코어 (한 줄에 하나)</label>
        <textarea value={scores} onChange={(e) => setScores(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      </div>
      <div>
        <label className="label">코스 파 (보통 72)</label>
        <input type="number" value={coursePar} onChange={(e) => setCoursePar(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">라운드</div><div className="text-xl font-bold">{result.count}</div></div>
          <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">평균 스코어</div><div className="text-xl font-bold">{result.avgScore}</div></div>
          <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center"><div className="text-xs text-muted">핸디캡 (추정)</div><div className="text-xl font-bold">{result.handicap}</div></div>
        </div>
      )}
      <div className="text-xs text-muted">USGA 방식 단순화. 공식 핸디캡은 협회 등록이 필요합니다.</div>
    </div>
  );
}
