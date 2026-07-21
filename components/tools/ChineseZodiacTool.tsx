"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const ANIMAL_KEYS = ["monkey","rooster","dog","pig","rat","ox","tiger","rabbit","dragon","snake","horse","goat"];
const EMOJI = ["🐒","🐔","🐕","🐖","🐀","🐂","🐅","🐇","🐉","🐍","🐎","🐑"];
// Sexagenary cycle stems (天干) and branches (地支) per locale.
// Korean uses Hangul readings; CJK locales use the canonical Han characters.
const HEAVEN: Record<string, string[]> = {
  ko: ["갑","을","병","정","무","기","경","신","임","계"],
  cjk: ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
};
const EARTH: Record<string, string[]> = {
  ko: ["자","축","인","묘","진","사","오","미","신","유","술","해"],
  cjk: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
};

export default function ChineseZodiacTool() {
  const t = useTranslations("toolUI.chinese-zodiac");
  const locale = useLocale();
  const [year, setYear] = useState(2000);
  const result = useMemo(() => {
    if (!Number.isFinite(year) || year < 1 || year > 9999) return null;
    const idx = ((year % 12) + 12) % 12;
    const animal = t(`animals.${ANIMAL_KEYS[idx]}`);
    const emoji = EMOJI[idx];
    const heavenIdx = (((year - 4) % 10) + 10) % 10;
    const earthIdx = (((year - 4) % 12) + 12) % 12;
    const stems = locale === "ko" ? HEAVEN.ko : HEAVEN.cjk;
    const branches = locale === "ko" ? EARTH.ko : EARTH.cjk;
    const ganji = `${stems[heavenIdx]}${branches[earthIdx]}`;
    return { animal, emoji, ganji };
  }, [year, t, locale]);

  return (
    <div className="card space-y-3">
      <label className="label">{t("birthYear")}</label>
      <input type="number" value={year} onChange={(e) => setYear(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base" />
      {result ? (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-6 text-center">
          <div className="text-6xl">{result.emoji}</div>
          <div className="text-2xl font-bold mt-2">{t("yearOfAnimal", { animal: result.animal })}</div>
          <div className="text-sm text-muted mt-2">{t("ganji")}: <strong>{result.ganji}</strong>{t("yearSuffix")}</div>
        </div>
      ) : (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-6 text-center text-sm text-muted">
          {t("invalidYear")}
        </div>
      )}
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
