"use client";
import { useMemo, useState } from "react";

const ONES = ["", "one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const TENS = ["", "", "twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
const SCALES = ["", "thousand","million","billion","trillion"];

function under1000(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
  return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + under1000(n % 100) : "");
}

function toEnglish(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) return "negative " + toEnglish(-n);
  if (!Number.isInteger(n)) {
    const intPart = Math.floor(n);
    const fracStr = n.toString().split(".")[1];
    return toEnglish(intPart) + " point " + Array.from(fracStr).map((d) => ONES[+d] || "zero").join(" ");
  }
  let out = "";
  let scale = 0;
  while (n > 0) {
    const chunk = n % 1000;
    if (chunk > 0) out = under1000(chunk) + (SCALES[scale] ? " " + SCALES[scale] : "") + (out ? " " + out : "");
    n = Math.floor(n / 1000);
    scale++;
  }
  return out;
}

export default function NumberToEnglishTool() {
  const [input, setInput] = useState("12345");
  const result = useMemo(() => {
    const n = parseFloat(input.replace(/,/g, ""));
    if (!isFinite(n)) return "";
    return toEnglish(n);
  }, [input]);
  return (
    <div className="card space-y-3">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
      <div className="p-4 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded text-lg break-words">{result || "—"}</div>
      <button onClick={() => navigator.clipboard.writeText(result)} disabled={!result} className="btn btn-primary disabled:opacity-50">복사</button>
    </div>
  );
}
