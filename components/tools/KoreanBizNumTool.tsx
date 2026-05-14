"use client";
import { useMemo, useState } from "react";

function validate(input: string): { valid: boolean; formatted: string; check?: number; expected?: number } {
  const d = input.replace(/\D/g, "");
  if (d.length !== 10) return { valid: false, formatted: "10자리 필요" };
  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(d[i], 10) * weights[i];
  sum += Math.floor((parseInt(d[8], 10) * 5) / 10);
  const checkDigit = (10 - (sum % 10)) % 10;
  const valid = checkDigit === parseInt(d[9], 10);
  const formatted = `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
  return { valid, formatted, check: parseInt(d[9], 10), expected: checkDigit };
}

export default function KoreanBizNumTool() {
  const [input, setInput] = useState("123-45-67890");
  const result = useMemo(() => validate(input), [input]);
  return (
    <div className="card space-y-3">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="123-45-67890" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
      <div className={`p-4 rounded text-center ${result.valid ? "bg-green-50 dark:bg-green-900/20 border border-green-500" : "bg-red-50 dark:bg-red-900/20 border border-red-500"}`}>
        <div className="text-3xl">{result.valid ? "✓" : "✗"}</div>
        <div className="font-bold mt-1">{result.valid ? "유효" : "무효"}</div>
        <div className="font-mono mt-1 text-sm">{result.formatted}</div>
        {!result.valid && result.expected !== undefined && (
          <div className="text-xs text-muted mt-1">체크 자리: {result.check} (정답: {result.expected})</div>
        )}
      </div>
      <div className="text-xs text-muted">국세청 체크섬 알고리즘 기준 형식 검증입니다. 실제 등록 여부는 국세청 사이트에서 확인하세요.</div>
    </div>
  );
}
