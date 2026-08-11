"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

const SMALL_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "if", "in",
  "nor", "of", "off", "on", "or", "per", "so", "the", "to", "up",
  "via", "yet", "with", "from", "into", "onto", "over", "than",
]);

function apaTitleCase(s: string): string {
  // APA: capitalize first word, words 4+ letters, and proper nouns; lowercase short prepositions/conjunctions
  const words = s.trim().split(/(\s+|[-:—])/);
  return words
    .map((w, i) => {
      if (/^\s+$/.test(w) || /^[-:—]$/.test(w)) return w;
      const lower = w.toLowerCase();
      let prev = "";
      for (let j = i - 1; j >= 0; j--) {
        const p = words[j];
        if (p && !/^\s+$/.test(p)) { prev = p; break; }
      }
      const isFirst = i === 0 || prev === "" || /^[-:—]$/.test(prev);
      if (isFirst) return cap(lower);
      if (w.length >= 4) return cap(lower);
      if (SMALL_WORDS.has(lower)) return lower;
      return cap(lower);
    })
    .join("");
}

function chicagoTitleCase(s: string): string {
  // Chicago: capitalize first/last word and all important words; lowercase articles, coord conj, prepositions
  const words = s.trim().split(/(\s+)/);
  const wordOnly = words.filter((w) => !/^\s+$/.test(w));
  let wi = 0;
  return words
    .map((w) => {
      if (/^\s+$/.test(w)) return w;
      const lower = w.toLowerCase();
      const isFirst = wi === 0 || /[:—]$/.test(wordOnly[wi - 1] || "");
      const isLast = wi === wordOnly.length - 1;
      wi++;
      if (isFirst || isLast) return cap(lower);
      if (SMALL_WORDS.has(lower)) return lower;
      return cap(lower);
    })
    .join("");
}

function mlaTitleCase(s: string): string {
  // MLA: similar to Chicago — capitalize first/last and all principal words
  return chicagoTitleCase(s);
}

function sentenceCase(s: string): string {
  const lower = s.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?:]\s*\w)/g, (m) => m.toUpperCase());
}

function cap(w: string): string {
  if (!w) return w;
  // Preserve hyphenated word capitalization
  return w
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
}

export default function TitleCaseTool() {
  const t = useTranslations("toolUI.title-case");
  const tc = useTranslations("common");
  const [input, setInput] = useState("the role of attention in working memory: a cognitive perspective");
  const [copied, setCopied] = useState<string | null>(null);

  const variants = [
    { label: t("apa"), value: apaTitleCase(input) },
    { label: t("chicago"), value: chicagoTitleCase(input) },
    { label: "MLA", value: mlaTitleCase(input) },
    { label: t("sentence"), value: sentenceCase(input) },
    { label: "UPPER CASE", value: input.toUpperCase() },
    { label: "lower case", value: input.toLowerCase() },
  ];

  const copy = async (key: string, s: string) => { const ok = await copyText(s); if (ok) { setCopied(key); setTimeout(() => setCopied(null), 1500); } };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("inputLabel")}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base"
        />
      </div>

      <div className="space-y-2">
        {variants.map((v) => (
          <div key={v.label} className="border border-gray-200 dark:border-gray-700 rounded p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{v.label}</span>
              <button onClick={() => copy(v.label, v.value)} className="text-xs text-gray-500 hover:text-blue-600">{copied === v.label ? tc("copied") : tc("copy")}</button>
            </div>
            <div className="text-base font-serif">{v.value}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("note")}
      </div>
    </div>
  );
}
