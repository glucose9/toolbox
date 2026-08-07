"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export default function TextStatsTool() {
  const t = useTranslations("toolUI.text-stats");
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const chars = text.length;
    const noSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.match(/[.!?。!?]+/g)?.length || 0;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
    const avgWordLen = words > 0 ? noSpace / words : 0;
    const avgSentenceLen = sentences > 0 ? words / sentences : 0;
    return { chars, noSpace, words, sentences, paragraphs, avgWordLen, avgSentenceLen };
  }, [text]);
  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("placeholder")} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">{t("characters")}</div><div className="text-xl font-bold">{stats.chars.toLocaleString()}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">{t("noSpace")}</div><div className="text-xl font-bold">{stats.noSpace.toLocaleString()}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">{t("words")}</div><div className="text-xl font-bold">{stats.words.toLocaleString()}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">{t("sentences")}</div><div className="text-xl font-bold">{stats.sentences}</div></div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <span>{t("paragraphs")} {stats.paragraphs}</span>
        <span>{t("avgWordLen")} {stats.avgWordLen.toFixed(1)}</span>
        <span>{t("avgSentenceLen")} {stats.avgSentenceLen.toFixed(1)}</span>
      </div>
    </div>
  );
}
