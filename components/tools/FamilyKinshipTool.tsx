"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Simplified family kinship calculator (one-direction relationships)
const RELATIONS: { to: string; chon: number; addr: string }[] = [
  { to: "아버지", chon: 1, addr: "1촌" },
  { to: "어머니", chon: 1, addr: "1촌" },
  { to: "형제/자매", chon: 2, addr: "2촌" },
  { to: "할아버지", chon: 2, addr: "친조부" },
  { to: "외할아버지", chon: 2, addr: "외조부" },
  { to: "큰아버지/작은아버지", chon: 3, addr: "백부·숙부" },
  { to: "고모", chon: 3, addr: "고모" },
  { to: "이모", chon: 3, addr: "이모" },
  { to: "외삼촌", chon: 3, addr: "외숙부" },
  { to: "조카", chon: 3, addr: "조카" },
  { to: "사촌", chon: 4, addr: "사촌" },
  { to: "당숙", chon: 5, addr: "오촌 아저씨" },
  { to: "재종형제 (육촌)", chon: 6, addr: "육촌" },
  { to: "배우자", chon: 0, addr: "무촌 (가족)" },
  { to: "장인/장모", chon: 1, addr: "처가" },
  { to: "시아버지/시어머니", chon: 1, addr: "시가" },
];

export default function FamilyKinshipTool() {
  const t = useTranslations("toolUI.family-kinship");
  const [q, setQ] = useState("");
  const filtered = q ? RELATIONS.filter((r) => r.to.includes(q) || r.addr.includes(q)) : RELATIONS;
  return (
    <div className="card space-y-3">
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPlaceholder")} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {filtered.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-3 text-sm">
            <div>
              <div className="font-medium">{r.to}</div>
              <div className="text-xs text-muted">{r.addr}</div>
            </div>
            <div className="text-sm font-bold">{t("chonFmt", { n: r.chon })}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
