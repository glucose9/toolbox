"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function calcAges(birthStr: string, refStr: string) {
  const b = new Date(birthStr + "T00:00:00");
  const r = new Date(refStr + "T00:00:00");
  if (isNaN(b.getTime()) || isNaN(r.getTime())) return null;
  if (b > r) return null;

  // International "man" age
  let man = r.getFullYear() - b.getFullYear();
  const hasBirthdayPassed = r.getMonth() > b.getMonth() || (r.getMonth() === b.getMonth() && r.getDate() >= b.getDate());
  if (!hasBirthdayPassed) man--;

  // Year age (calendar year diff)
  const year = r.getFullYear() - b.getFullYear();

  // Traditional Korean counting age
  const sen = r.getFullYear() - b.getFullYear() + 1;

  return { man, year, sen, hasBirthdayPassed };
}

export default function KoreanAgeTool() {
  const t = useTranslations("toolUI.korean-age");
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const [birth, setBirth] = useState("1995-01-15");
  const [ref, setRef] = useState(todayStr);

  const result = useMemo(() => calcAges(birth, ref), [birth, ref]);

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{t("birthDate")}</label>
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="label">{t("refDate")}</label>
          <input type="date" value={ref} onChange={(e) => setRef(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      {!result ? (
        <div className="text-sm text-red-600">{t("errorDate")}</div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-4 text-center">
            <div className="text-xs text-muted">{t("manAge")}</div>
            <div className="text-4xl font-bold mt-1">{result.man}</div>
            <div className="text-xs text-muted mt-1">{result.hasBirthdayPassed ? t("birthdayPassed") : t("birthdayBefore")}</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
            <div className="text-xs text-muted">{t("yearAge")}</div>
            <div className="text-4xl font-bold mt-1">{result.year}</div>
            <div className="text-xs text-muted mt-1">{t("yearAgeFormula")}</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
            <div className="text-xs text-muted">{t("countAge")}</div>
            <div className="text-4xl font-bold mt-1">{result.sen}</div>
            <div className="text-xs text-muted mt-1">{t("countAgeFormula")}</div>
          </div>
        </div>
      )}

      <div className="text-xs text-muted bg-gray-50 dark:bg-gray-900 p-3 rounded" dangerouslySetInnerHTML={{ __html: t("note") }} />
    </div>
  );
}
