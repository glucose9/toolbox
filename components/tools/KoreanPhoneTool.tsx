"use client";
import { useMemo, useState } from "react";

function normalize(input: string): { national: string; international: string; raw: string } {
  const digits = input.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("82")) d = "0" + d.slice(2);
  let national = d;
  if (/^010\d{8}$/.test(d)) national = `010-${d.slice(3, 7)}-${d.slice(7)}`;
  else if (/^01[16-9]\d{7,8}$/.test(d)) national = `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
  else if (/^02\d{7,8}$/.test(d)) national = `02-${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  else if (/^0[3-6]\d{8,9}$/.test(d)) national = `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
  else if (/^0(70|50)\d{8}$/.test(d)) national = `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  const international = d.startsWith("0") ? `+82-${d.slice(1)}` : "";
  return { national, international, raw: d };
}

export default function KoreanPhoneTool() {
  const [input, setInput] = useState("01012345678");
  const result = useMemo(() => normalize(input), [input]);
  return (
    <div className="card space-y-3">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-lg" />
      <table className="w-full text-sm">
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr><td className="py-2 pr-3 text-muted">국내 표준</td><td className="font-mono">{result.national}</td><td className="text-right"><button onClick={() => navigator.clipboard.writeText(result.national)} className="text-xs text-brand-600 hover:underline">복사</button></td></tr>
          <tr><td className="py-2 pr-3 text-muted">국제 형식</td><td className="font-mono">{result.international || "—"}</td><td className="text-right">{result.international && <button onClick={() => navigator.clipboard.writeText(result.international)} className="text-xs text-brand-600 hover:underline">복사</button>}</td></tr>
          <tr><td className="py-2 pr-3 text-muted">숫자만</td><td className="font-mono">{result.raw}</td><td className="text-right"><button onClick={() => navigator.clipboard.writeText(result.raw)} className="text-xs text-brand-600 hover:underline">복사</button></td></tr>
        </tbody>
      </table>
    </div>
  );
}
