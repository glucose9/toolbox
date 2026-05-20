"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

function calcAges(birthStr: string, refStr: string) {
  const b = new Date(birthStr + "T00:00:00");
  const r = new Date(refStr + "T00:00:00");
  if (isNaN(b.getTime()) || isNaN(r.getTime())) return null;
  if (b > r) return null;

  // International / Western age (만 나이)
  let man = r.getFullYear() - b.getFullYear();
  const hasBirthdayPassed =
    r.getMonth() > b.getMonth() ||
    (r.getMonth() === b.getMonth() && r.getDate() >= b.getDate());
  if (!hasBirthdayPassed) man--;

  // Year-based age (연 나이) — calendar year difference
  const year = r.getFullYear() - b.getFullYear();

  // Traditional Korean counting age (세는 나이)
  const sen = r.getFullYear() - b.getFullYear() + 1;

  // Japanese 数え年: born = 1, +1 every January 1.
  // It happens to equal Korean 세는 나이 for the simple computation, since both add
  // one at New Year. We compute it identically here.
  const kazoe = sen;

  // Chinese 虚岁: similar — born = 1, +1 each Lunar New Year. For convenience and
  // since we don't compute the lunar calendar here, we approximate using the
  // Gregorian-year difference + 1 (same as 세는 나이).
  const xusui = sen;

  return { man, year, sen, kazoe, xusui, hasBirthdayPassed };
}

type CardKey = "man" | "year" | "sen" | "kazoe" | "xusui";

const LOCALE_CARDS: Record<string, CardKey[]> = {
  // KR: unchanged — 만나이 + 연 나이 + 세는 나이
  ko: ["man", "year", "sen"],
  // EN: international (Western) age + Korean traditional (for context).
  en: ["man", "sen"],
  // JA: 満年齢 + 数え年 + Korean 세는 나이.
  ja: ["man", "kazoe", "sen"],
  // ZH: 周岁 + 虚岁 + Korean 세는 나이.
  zh: ["man", "xusui", "sen"],
};

export default function KoreanAgeTool() {
  const locale = useLocale();
  const t = useTranslations("toolUI.korean-age");
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const [birth, setBirth] = useState("1995-01-15");
  const [ref, setRef] = useState(todayStr);

  const result = useMemo(() => calcAges(birth, ref), [birth, ref]);

  const cards = LOCALE_CARDS[locale] || LOCALE_CARDS.ko;

  const renderCard = (key: CardKey, primary: boolean) => {
    if (!result) return null;
    let value = 0;
    let label = "";
    let sub = "";
    switch (key) {
      case "man":
        value = result.man;
        label = t("manAge");
        sub = result.hasBirthdayPassed ? t("birthdayPassed") : t("birthdayBefore");
        break;
      case "year":
        value = result.year;
        label = t("yearAge");
        sub = t("yearAgeFormula");
        break;
      case "sen":
        value = result.sen;
        label = t("countAge");
        sub = t("countAgeFormula");
        break;
      case "kazoe":
        value = result.kazoe;
        label = t("kazoeAge");
        sub = t("kazoeAgeFormula");
        break;
      case "xusui":
        value = result.xusui;
        label = t("xusuiAge");
        sub = t("xusuiAgeFormula");
        break;
    }
    const border = primary
      ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
      : "border-gray-200 dark:border-gray-700";
    return (
      <div key={key} className={`border ${border} rounded p-4 text-center`}>
        <div className="text-xs text-muted">{label}</div>
        <div className="text-4xl font-bold mt-1">{value}</div>
        <div className="text-xs text-muted mt-1">{sub}</div>
      </div>
    );
  };

  const gridCols = cards.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{t("birthDate")}</label>
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="label">{t("refDate")}</label>
          <input
            type="date"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
      </div>

      {!result ? (
        <div className="text-sm text-red-600">{t("errorDate")}</div>
      ) : (
        <div className={`grid ${gridCols} gap-3`}>
          {cards.map((key, i) => renderCard(key, i === 0))}
        </div>
      )}

      <div
        className="text-xs text-muted bg-gray-50 dark:bg-gray-900 p-3 rounded"
        dangerouslySetInnerHTML={{ __html: t("note") }}
      />
    </div>
  );
}
