"use client";
import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const TYPES = [
  { key: "wholeBlood", days: 56 },
  { key: "plasma", days: 14 },
  { key: "platelet", days: 14 },
  { key: "redCell", days: 112 },
];

export default function BloodDonationTool() {
  const t = useTranslations("toolUI.blood-donation");
  const locale = useLocale();
  const [last, setLast] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
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
        <div><label className="label">{t("lastDonation")}</label><input type="date" value={last} onChange={(e) => setLast(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">{t("type")}</label><select value={typeIdx} onChange={(e) => setTypeIdx(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">{TYPES.map((ty, i) => <option key={i} value={i}>{t(ty.key as "wholeBlood" | "plasma" | "platelet" | "redCell")} ({t("daysShort", { count: ty.days })})</option>)}</select></div>
      </div>
      {result && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
          <div className="text-xs text-muted">{t("nextEligible")}</div>
          <div className="text-2xl font-bold mt-1">{result.next.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</div>
          <div className={`text-sm mt-2 ${result.remaining > 0 ? "text-orange-600" : "text-green-600"}`}>
            {result.remaining > 0 ? `D-${result.remaining}` : t("canDonateNow")}
          </div>
        </div>
      )}
      <div className="text-xs text-muted">{t("notice")}</div>
    </div>
  );
}
