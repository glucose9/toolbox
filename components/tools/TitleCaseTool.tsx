"use client";

import { useState } from "react";

const SMALL_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "if", "in",
  "nor", "of", "off", "on", "or", "per", "so", "the", "to", "up",
  "via", "yet", "with", "from", "into", "onto", "over", "than",
]);

function apaTitleCase(s: string): string {
  // APA: capitalize first word, words 4+ letters, and proper nouns; lowercase short prepositions/conjunctions
  const words = s.split(/(\s+|[-:—])/);
  return words
    .map((w, i) => {
      if (/^\s+$/.test(w) || /^[-:—]$/.test(w)) return w;
      const lower = w.toLowerCase();
      const isFirst = i === 0 || /[-:—]/.test(words[i - 1] || "");
      if (isFirst) return cap(lower);
      if (w.length >= 4) return cap(lower);
      if (SMALL_WORDS.has(lower)) return lower;
      return cap(lower);
    })
    .join("");
}

function chicagoTitleCase(s: string): string {
  // Chicago: capitalize first/last word and all important words; lowercase articles, coord conj, prepositions
  const words = s.split(/(\s+)/);
  const wordOnly = words.filter((w) => !/^\s+$/.test(w));
  let wi = 0;
  return words
    .map((w) => {
      if (/^\s+$/.test(w)) return w;
      const lower = w.toLowerCase();
      const isFirst = wi === 0;
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
  const [input, setInput] = useState("the role of attention in working memory: a cognitive perspective");

  const variants = [
    { label: "APA 7th (제목·헤더용)", value: apaTitleCase(input) },
    { label: "Chicago / MLA", value: chicagoTitleCase(input) },
    { label: "MLA", value: mlaTitleCase(input) },
    { label: "Sentence case (문장형)", value: sentenceCase(input) },
    { label: "UPPER CASE", value: input.toUpperCase() },
    { label: "lower case", value: input.toLowerCase() },
  ];

  const copy = (t: string) => navigator.clipboard.writeText(t);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">영문 제목 입력</label>
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
              <button onClick={() => copy(v.value)} className="text-xs text-gray-500 hover:text-blue-600">📋 복사</button>
            </div>
            <div className="text-base font-serif">{v.value}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted leading-relaxed">
        APA는 4자 이상 단어와 첫 단어를 대문자로, Chicago/MLA는 모든 주요 단어를 대문자로 처리합니다. 짧은 전치사·접속사·관사(a, the, and, of, in 등)는 소문자 유지.
      </div>
    </div>
  );
}
