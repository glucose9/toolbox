"use client";
import { useMemo, useState } from "react";

function validate(input: string): { valid: boolean; formatted: string; birth?: string; gender?: string; foreigner?: boolean } {
  const d = input.replace(/\D/g, "");
  if (d.length !== 13) return { valid: false, formatted: "13자리 필요" };
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(d[i], 10) * weights[i];
  const checkDigit = (11 - (sum % 11)) % 10;
  const valid = checkDigit === parseInt(d[12], 10);
  const g = parseInt(d[6], 10);
  const century = g === 1 || g === 2 || g === 5 || g === 6 ? 1900 : g === 3 || g === 4 || g === 7 || g === 8 ? 2000 : 1800;
  const year = century + parseInt(d.slice(0, 2), 10);
  const month = d.slice(2, 4);
  const day = d.slice(4, 6);
  const gender = g % 2 === 1 ? "남자" : "여자";
  const foreigner = g >= 5;
  return { valid, formatted: `${d.slice(0, 6)}-${d.slice(6)}`, birth: `${year}-${month}-${day}`, gender, foreigner };
}

export default function KoreanRrnTool() {
  const [input, setInput] = useState("");
  const result = useMemo(() => input ? validate(input) : null, [input]);
  return (
    <div className="card space-y-3">
      <input type="password" value={input} onChange={(e) => setInput(e.target.value)} placeholder="13자리 입력 (브라우저 안에서만 처리)" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
      {result && (
        <div className={`p-4 rounded ${result.valid ? "bg-green-50 dark:bg-green-900/20 border border-green-500" : "bg-red-50 dark:bg-red-900/20 border border-red-500"}`}>
          <div className="text-center text-2xl">{result.valid ? "✓ 유효" : "✗ 무효"}</div>
          {result.birth && (
            <table className="w-full text-sm mt-3">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr><td className="py-2 pr-3 text-muted">생년월일</td><td className="font-mono">{result.birth}</td></tr>
                <tr><td className="py-2 pr-3 text-muted">성별</td><td>{result.gender}</td></tr>
                <tr><td className="py-2 pr-3 text-muted">외국인 여부</td><td>{result.foreigner ? "외국인" : "내국인"}</td></tr>
              </tbody>
            </table>
          )}
        </div>
      )}
      <div className="text-xs text-muted bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">⚠️ 입력값은 브라우저 안에서만 처리되며 외부로 전송되지 않습니다.</div>
    </div>
  );
}
