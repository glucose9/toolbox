"use client";

import { useState } from "react";

const DRINKS: { name: string; caffeine: number }[] = [
  { name: "에스프레소 1샷 (30ml)", caffeine: 63 },
  { name: "아메리카노 (톨, 354ml)", caffeine: 150 },
  { name: "라떼 (그란데, 473ml)", caffeine: 150 },
  { name: "콜드브루 (톨, 354ml)", caffeine: 200 },
  { name: "드립커피 (240ml)", caffeine: 95 },
  { name: "녹차 (240ml)", caffeine: 28 },
  { name: "홍차 (240ml)", caffeine: 47 },
  { name: "콜라 (355ml)", caffeine: 34 },
  { name: "에너지 음료 (250ml)", caffeine: 80 },
  { name: "다크 초콜릿 (50g)", caffeine: 24 },
];

export default function CaffeineTool() {
  const [counts, setCounts] = useState<number[]>(Array(DRINKS.length).fill(0));

  const total = counts.reduce((s, c, i) => s + c * DRINKS[i].caffeine, 0);
  const pctOfLimit = (total / 400) * 100;
  const status = total <= 200 ? { text: "안전", color: "text-green-600" } : total <= 400 ? { text: "보통", color: "text-yellow-600" } : { text: "초과! 줄이세요", color: "text-red-600" };

  return (
    <div className="card space-y-3">
      <div className="space-y-1">
        {DRINKS.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span className="flex-1">{d.name} <span className="text-xs text-muted">({d.caffeine}mg)</span></span>
            <button onClick={() => setCounts((c) => c.map((x, j) => j === i ? Math.max(0, x - 1) : x))} className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-800">−</button>
            <span className="w-8 text-center">{counts[i]}</span>
            <button onClick={() => setCounts((c) => c.map((x, j) => j === i ? x + 1 : x))} className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-800">+</button>
          </div>
        ))}
      </div>
      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
        <div className="text-xs text-muted">오늘 카페인</div>
        <div className="text-3xl font-bold mt-1">{total} mg</div>
        <div className={`text-sm font-medium mt-1 ${status.color}`}>{status.text}</div>
        <div className="text-xs text-muted mt-2">성인 권장 한계 400mg · {pctOfLimit.toFixed(0)}% 도달</div>
      </div>
      <div className="text-xs text-muted">임산부 200mg/일, 청소년 100mg/일 권장. 출처: 식약처/FDA.</div>
    </div>
  );
}
