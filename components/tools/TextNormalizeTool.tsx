"use client";

import { useState, useMemo } from "react";

const SPECIAL_SPACES = /[   -   　﻿​-‍]/g;
const SMART_DOUBLE_QUOTES = /[“”„‟]/g;
const SMART_SINGLE_QUOTES = /[‘’‚‛]/g;
const FULLWIDTH_ASCII = /[！-～]/g;
const FULLWIDTH_PUNCT_DOT = /。/g;
const FULLWIDTH_PUNCT_COMMA = /[，、]/g;
const STRIP_PUNCT = /[.,!?;:'"·…—–\-()\[\]{}<>《》「」『』]/g;

export default function TextNormalizeTool() {
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

  const result = useMemo(() => {
    let s = input;
    if (opts.nfc) s = s.normalize("NFC");
    if (opts.nbsp) s = s.replace(SPECIAL_SPACES, " ");
    if (opts.quotes) {
      s = s.replace(SMART_DOUBLE_QUOTES, '"').replace(SMART_SINGLE_QUOTES, "'");
    }
    if (opts.fullwidth) {
      s = s.replace(FULLWIDTH_ASCII, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
      s = s.replace(FULLWIDTH_PUNCT_DOT, ".").replace(FULLWIDTH_PUNCT_COMMA, ",");
    }
    if (opts.punctSpacing) {
      s = s.replace(/\s+([.,!?;:])/g, "$1");
      s = s.replace(/([.,!?;:])(?=\S)/g, "$1 ");
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
    { key: "nfc", label: "유니코드 정규화 (NFC)" },
    { key: "quotes", label: "따옴표 통일 (“” ‘’ → \" ')" },
    { key: "fullwidth", label: "전각 → 반각 (！＝ → !=)" },
    { key: "nbsp", label: "특수 공백 → 일반 공백" },
    { key: "spaces", label: "연속 공백 → 1개" },
    { key: "blankLines", label: "연속 빈 줄 → 1개" },
    { key: "punctSpacing", label: "문장부호 앞 공백 제거, 뒤 공백 추가" },
    { key: "lowercase", label: "모두 소문자" },
    { key: "stripPunct", label: "문장부호 완전 제거 (어휘 분석용)" },
  ];

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">원본 텍스트</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {optDefs.map((o) => (
          <label key={o.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={opts[o.key]}
              onChange={(e) => setOpts({ ...opts, [o.key]: e.target.checked })}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label">정규화 결과</label>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-muted">
              {stats.before} → {stats.after}자 ({stats.diff >= 0 ? `-${stats.diff}` : `+${-stats.diff}`})
            </span>
            <button onClick={() => navigator.clipboard.writeText(result)} className="text-xs text-gray-500 hover:text-blue-600">
              📋 복사
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
        💡 카피킬러·턴잇인 등 표절검사 도구는 따옴표 종류와 공백 차이도 별개로 인식할 수 있어 정규화 후 검사하면 정확도가 올라갑니다. NFC 정규화는 한글 조합형/완성형을 통일합니다.
      </div>
    </div>
  );
}
