"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const ANIMAL_KEYS = ["monkey","rooster","dog","pig","rat","ox","tiger","rabbit","dragon","snake","horse","goat"];
const EMOJI = ["🐒","🐔","🐕","🐖","🐀","🐂","🐅","🐇","🐉","🐍","🐎","🐑"];
const HEAVEN = ["갑","을","병","정","무","기","경","신","임","계"];
const EARTH = ["자","축","인","묘","진","사","오","미","신","유","술","해"];

export default function ChineseZodiacTool() {
  const t = useTranslations("toolUI.chinese-zodiac");
  const [year, setYear] = useState(2000);
  const result = useMemo(() => {
    const idx = year % 12;
    const animal = t(`animals.${ANIMAL_KEYS[idx]}`);
    const emoji = EMOJI[idx];
    const heavenIdx = (year - 4) % 10;
    const earthIdx = (year - 4) % 12;
    const ganji = `${HEAVEN[heavenIdx]}${EARTH[earthIdx]}`;
    return { animal, emoji, ganji };
  }, [year, t]);

  return (
    <div className="card space-y-3">
      <label className="label">{t("birthYear")}</label>
      <input type="number" value={year} onChange={(e) => setYear(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base" />
      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-6 text-center">
        <div className="text-6xl">{result.emoji}</div>
        <div className="text-2xl font-bold mt-2">{t("yearOfAnimal", { animal: result.animal })}</div>
        <div className="text-sm text-muted mt-2">{t("ganji")}: <strong>{result.ganji}</strong>{t("yearSuffix")}</div>
      </div>
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
