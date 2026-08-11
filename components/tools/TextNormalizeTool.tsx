"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

const SPECIAL_SPACES = /[   -   　]/g;
const ZERO_WIDTH = /[​-‍﻿]/g;
const SMART_DOUBLE_QUOTES = /[“”„‟]/g;
const SMART_SINGLE_QUOTES = /[‘’‚‛]/g;
const FULLWIDTH_ASCII = /[！-～]/g;
const FULLWIDTH_PUNCT_DOT = /。/g;
const FULLWIDTH_PUNCT_COMMA = /[，、]/g;
const STRIP_PUNCT = /[.,!?;:'"·…—–\-()\[\]{}<>《》「」『』]/g;

const PICTOGRAPHIC = /\p{Extended_Pictographic}/u;
const EMOJI_MODIFIER = /[️\u{1F3FB}-\u{1F3FF}]/u;

// U+200D(ZWJ)는 이모지 결합자이므로 이모지 사이에서는 지우지 않는다(가족 이모지 분해 방지).
function isEmojiJoiner(str: string, off: number): boolean {
  const before = Array.from(str.slice(Math.max(0, off - 8), off));
  while (before.length && EMOJI_MODIFIER.test(before[before.length - 1])) before.pop();
  const prev = before[before.length - 1];
  const next = Array.from(str.slice(off + 1, off + 3))[0];
  return !!prev && !!next && PICTOGRAPHIC.test(prev) && PICTOGRAPHIC.test(next);
}

export default function TextNormalizeTool() {
  const t = useTranslations("toolUI.text-normalize");
  const tc = useTranslations("common");
  const [input, setInput] = useState(
    '“안녕하세요”라고  하셨다.\n\n\n다음 문장입니다 .\n그리고  ‘인용문’ 입니다。'
  );
  const [opts, setOpts] = useState({
    quotes: true,
    spaces: true,
    blankLines: true,
    punctSpacing: true,
    fullwidth: true,
    nbsp: true,
    nfc: true,
    lowercase: false,
    stripPunct: false,
  });
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    let s = input;
    if (opts.nfc) s = s.normalize("NFC");
    if (opts.nbsp)
      s = s
        .replace(SPECIAL_SPACES, " ")
        .replace(ZERO_WIDTH, (m: string, off: number, str: string) => (m === "‍" && isEmojiJoiner(str, off) ? m : ""));
    if (opts.quotes) {
      s = s.replace(SMART_DOUBLE_QUOTES, '"').replace(SMART_SINGLE_QUOTES, "'");
    }
    if (opts.fullwidth) {
      s = s.replace(FULLWIDTH_ASCII, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
      s = s.replace(FULLWIDTH_PUNCT_DOT, ".").replace(FULLWIDTH_PUNCT_COMMA, ",");
    }
    if (opts.punctSpacing) {
      // 줄바꿈은 삼키지 않도록 수평 공백만 정리한다.
      s = s.replace(/[ \t]+([.,!?;:])/g, "$1");
      // 숫자 사이 구분자(3.14 / 1,000), 도메인·약어(example.com), URL 스킴(https://)은
      // 문장부호가 아니므로 공백을 넣지 않는다.
      s = s.replace(/([.,!?;:])(?=\S)/g, (m, p: string, off: number, str: string) => {
        const prev = str[off - 1] ?? "";
        const next = str[off + 1] ?? "";
        if (/\d/.test(prev) && /\d/.test(next)) return m;
        if (p === "." && /[A-Za-z]/.test(prev) && /[a-z]/.test(next)) return m;
        if (p === ":" && str.slice(off + 1, off + 3) === "//") return m;
        return p + " ";
      });
    }
    if (opts.spaces) {
      s = s.replace(/[ \t]+/g, " ").replace(/^ +| +$/gm, "");
    }
    if (opts.blankLines) {
      s = s.replace(/\n{3,}/g, "\n\n");
    }
    if (opts.lowercase) s = s.toLowerCase();
    if (opts.stripPunct) s = s.replace(STRIP_PUNCT, "");
    return s;
  }, [input, opts]);

  const stats = useMemo(() => {
    const before = input.length;
    const after = result.length;
    return { before, after, diff: before - after };
  }, [input, result]);

  const optDefs: { key: keyof typeof opts; label: string }[] = [
    { key: "nfc", label: t("optNfc") },
    { key: "quotes", label: t("optQuotes") },
    { key: "fullwidth", label: t("optFullwidth") },
    { key: "nbsp", label: t("optNbsp") },
    { key: "spaces", label: t("optSpaces") },
    { key: "blankLines", label: t("optBlankLines") },
    { key: "punctSpacing", label: t("optPunctSpacing") },
  ];

  const advancedOptDefs: { key: keyof typeof opts; label: string }[] = [
    { key: "lowercase", label: t("optLowercase") },
    { key: "stripPunct", label: t("optStripPunct") },
  ];

  const copy = async () => { const ok = await copyText(result); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); } };

  const renderOpt = (o: { key: keyof typeof opts; label: string }) => (
    <label key={o.key} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={opts[o.key]}
        onChange={(e) => setOpts({ ...opts, [o.key]: e.target.checked })}
      />
      <span>{o.label}</span>
    </label>
  );

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("source")}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {optDefs.map(renderOpt)}
      </div>

      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {advancedOptDefs.map(renderOpt)}
          </div>
        </div>
      </details>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label">{t("resultLabel")}</label>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-muted">
              {t("stats", { before: stats.before, after: stats.after, diff: stats.diff >= 0 ? `-${stats.diff}` : `+${-stats.diff}` })}
            </span>
            <button onClick={copy} className="text-xs text-gray-500 hover:text-blue-600">
              {copied ? tc("copied") : tc("copy")}
            </button>
          </div>
        </div>
        <textarea
          value={result}
          readOnly
          rows={6}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-950 text-sm font-mono"
        />
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
