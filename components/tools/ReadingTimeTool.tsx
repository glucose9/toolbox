"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export default function ReadingTimeTool() {
  const t = useTranslations("toolUI.reading-time");
  const fmtTime = (seconds: number): string => {
    const total = Math.round(seconds);
    const m = Math.floor(total / 60);
    const s = total % 60;
    if (m === 0) return t("secOnly", { sec: s });
    return t("minSec", { min: m, sec: s });
  };
  const [text, setText] = useState("");
  const [speakingRate, setSpeakingRate] = useState(300); // chars/min (Korean)
  const [readingRate, setReadingRate] = useState(500);   // chars/min

  const { chars, charsNoSpace, words, speakingSec, readingSec } = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return {
      chars,
      charsNoSpace,
      words,
      speakingSec: (chars / speakingRate) * 60,
      readingSec: (chars / readingRate) * 60,
    };
  }, [text, speakingRate, readingRate]);

  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("placeholder")} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-2 text-center"><div className="text-xs text-muted">{t("characters")}</div><div className="text-xl font-bold">{chars.toLocaleString()}</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-2 text-center"><div className="text-xs text-muted">{t("noSpace")}</div><div className="text-xl font-bold">{charsNoSpace.toLocaleString()}</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-2 text-center"><div className="text-xs text-muted">{t("words")}</div><div className="text-xl font-bold">{words.toLocaleString()}</div></div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <label>{t("speakingRate", { value: speakingRate })}<input type="range" min="100" max="500" step="20" value={speakingRate} onChange={(e) => setSpeakingRate(+e.target.value)} className="w-full" /></label>
        </div>
        <div>
          <label>{t("readingRate", { value: readingRate })}<input type="range" min="200" max="900" step="20" value={readingRate} onChange={(e) => setReadingRate(+e.target.value)} className="w-full" /></label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-4 text-center">
          <div className="text-xs text-muted">{t("speakingTime")}</div>
          <div className="text-2xl font-bold mt-1">{fmtTime(speakingSec)}</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
          <div className="text-xs text-muted">{t("readingTime")}</div>
          <div className="text-2xl font-bold mt-1">{fmtTime(readingSec)}</div>
        </div>
      </div>
    </div>
  );
}
