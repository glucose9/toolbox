"use client";

import { useMemo, useState } from "react";

const DIGITS = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const PLACES = ["", "십", "백", "천"];
const UNITS = ["", "만", "억", "조", "경"];

function numToKor(numStr: string, useFormal = false): string {
  if (!numStr || !/^-?\d+(\.\d+)?$/.test(numStr)) return "";
  const negative = numStr.startsWith("-");
  const [intPartRaw, fracPart] = numStr.replace(/^-/, "").split(".");
  const intPart = intPartRaw.replace(/^0+/, "") || "0";

  if (intPart === "0") return "영" + (fracPart ? " 점 " + fracToKor(fracPart) : "");

  // Group by 4 digits from right
  const groups: string[] = [];
  let s = intPart;
  while (s.length > 0) {
    groups.unshift(s.slice(-4));
    s = s.slice(0, -4);
  }

  let result = "";
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    const unitIdx = groups.length - 1 - i;
    const gStr = groupToKor(g, useFormal);
    if (gStr) result += gStr + (UNITS[unitIdx] || "") + " ";
  }

  result = result.trim();
  if (fracPart) result += " 점 " + fracToKor(fracPart);
  return (negative ? "마이너스 " : "") + result;
}

function groupToKor(g: string, useFormal: boolean): string {
  const padded = g.padStart(4, "0");
  let s = "";
  for (let i = 0; i < 4; i++) {
    const d = parseInt(padded[i], 10);
    if (d === 0) continue;
    const place = PLACES[3 - i];
    if (!useFormal && d === 1 && place && (3 - i) < 4) {
      // 일십 → 십, 일백 → 백, 일천 → 천 (일반 형식)
      s += place;
    } else {
      s += DIGITS[d] + place;
    }
  }
  return s;
}

function fracToKor(s: string): string {
  return Array.from(s).map((c) => DIGITS[parseInt(c, 10)] || c).join("");
}

export default function NumToKoreanTool() {
  const [input, setInput] = useState("12345");
  const [formal, setFormal] = useState(false);
  const [contract, setContract] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const cleaned = input.replace(/[,\s]/g, "");
    const k = numToKor(cleaned, formal);
    if (!k) return "";
    if (contract) return `일금 ${k} 원정`;
    return k;
  }, [input, formal, contract]);

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">숫자 (쉼표 사용 가능)</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 12,345 또는 12345.67"
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={formal} onChange={(e) => setFormal(e.target.checked)} />
          공식 표기 (일십, 일백, 일천)
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={contract} onChange={(e) => setContract(e.target.checked)} />
          계약서 형식 (일금 ~ 원정)
        </label>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4">
        <div className="text-xs text-muted">한글 표기</div>
        <div className="text-xl font-bold mt-1 break-all">{result || "—"}</div>
      </div>

      <button onClick={copy} disabled={!result} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
