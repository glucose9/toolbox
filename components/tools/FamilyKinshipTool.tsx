"use client";
import { useState } from "react";

// Simplified family kinship calculator (one-direction relationships)
const RELATIONS: { from: string; to: string; chon: number; addr: string }[] = [
  { from: "본인", to: "아버지", chon: 1, addr: "1촌" },
  { from: "본인", to: "어머니", chon: 1, addr: "1촌" },
  { from: "본인", to: "형제/자매", chon: 2, addr: "2촌" },
  { from: "본인", to: "할아버지", chon: 2, addr: "친조부" },
  { from: "본인", to: "외할아버지", chon: 2, addr: "외조부" },
  { from: "본인", to: "큰아버지/작은아버지", chon: 3, addr: "백부·숙부" },
  { from: "본인", to: "고모", chon: 3, addr: "고모" },
  { from: "본인", to: "이모", chon: 3, addr: "이모" },
  { from: "본인", to: "외삼촌", chon: 3, addr: "외숙부" },
  { from: "본인", to: "조카", chon: 3, addr: "조카" },
  { from: "본인", to: "사촌", chon: 4, addr: "사촌" },
  { from: "본인", to: "당숙", chon: 5, addr: "오촌 아저씨" },
  { from: "본인", to: "재종형제 (육촌)", chon: 6, addr: "육촌" },
  { from: "본인", to: "배우자", chon: 0, addr: "무촌 (가족)" },
  { from: "본인", to: "장인/장모", chon: 1, addr: "처가" },
  { from: "본인", to: "시아버지/시어머니", chon: 1, addr: "시가" },
];

export default function FamilyKinshipTool() {
  const [q, setQ] = useState("");
  const filtered = q ? RELATIONS.filter((r) => r.to.includes(q) || r.addr.includes(q)) : RELATIONS;
  return (
    <div className="card space-y-3">
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="가족 호칭 검색 (예: 사촌, 고모)" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {filtered.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-3 text-sm">
            <div>
              <div className="font-medium">{r.to}</div>
              <div className="text-xs text-muted">{r.addr}</div>
            </div>
            <div className="text-sm font-bold">{r.chon}촌</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted">대표적인 한국식 친·외가 호칭과 촌수를 정리했습니다. 더 자세한 호칭은 가계도가 필요합니다.</div>
    </div>
  );
}
