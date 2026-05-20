"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function getByteLength(s: string) {
  return new Blob([s]).size;
}

export default function CounterTool() {
  const t = useTranslations("toolUI.character-counter");
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\r?\n/).length : 0;
    const bytes = getByteLength(text);
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
    return { withSpaces, withoutSpaces, words, lines, bytes, paragraphs };
  }, [text]);

  const cards = [
    { label: t("withSpaces"), value: stats.withSpaces },
    { label: t("withoutSpaces"), value: stats.withoutSpaces },
    { label: t("words"), value: stats.words },
    { label: t("lines"), value: stats.lines },
    { label: t("paragraphs"), value: stats.paragraphs },
    { label: t("bytes"), value: stats.bytes },
  ];

  return (
    <div className="card">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">{t("inputLabel")}</label>
          <textarea
            className="input min-h-[300px] font-mono text-sm"
            placeholder={t("placeholder")}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <button onClick={() => setText("")} className="btn btn-secondary text-sm">
              {t("clear")}
            </button>
            <button
              onClick={() => navigator.clipboard.readText().then(setText).catch(() => {})}
              className="btn btn-secondary text-sm"
            >
              {t("paste")}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {cards.map((c) => (
            <div key={c.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{c.label}</span>
              <span className="text-2xl font-bold tabular-nums">{c.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
