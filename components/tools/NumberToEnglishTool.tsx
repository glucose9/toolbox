"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

const ONES = ["", "one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const TENS = ["", "", "twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
const SCALES = ["", "thousand","million","billion","trillion"];

function under1000(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
  return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + under1000(n % 100) : "");
}

// 범위를 넘으면 "" 를 반환한다(스케일 단어가 조용히 탈락하는 것을 막는다).
function toEnglish(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) {
    const positive = toEnglish(-n);
    return positive ? "negative " + positive : "";
  }
  if (!Number.isInteger(n)) {
    const intPart = Math.floor(n);
    const str = n.toString();
    const fracStr = ((str.includes("e") ? n.toFixed(20) : str).split(".")[1] || "").replace(/0+$/, "");
    const intWords = toEnglish(intPart);
    if (!intWords) return "";
    if (!fracStr) return intWords;
    return intWords + " point " + Array.from(fracStr).map((d) => ONES[+d] || "zero").join(" ");
  }
  let out = "";
  let scale = 0;
  while (n > 0) {
    if (scale >= SCALES.length) return "";
    const chunk = n % 1000;
    if (chunk > 0) out = under1000(chunk) + (SCALES[scale] ? " " + SCALES[scale] : "") + (out ? " " + out : "");
    n = Math.floor(n / 1000);
    scale++;
  }
  return out;
}

export default function NumberToEnglishTool() {
  const t = useTranslations("toolUI.number-to-english");
  const [input, setInput] = useState("12345");
  const { result, outOfRange } = useMemo(() => {
    const n = parseFloat(input.replace(/,/g, ""));
    if (!isFinite(n)) return { result: "", outOfRange: false };
    const r = toEnglish(n);
    return { result: r, outOfRange: !r };
  }, [input]);
  return (
    <div className="card space-y-3">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
      <div className="p-4 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded text-lg break-words">{result || "—"}</div>
      {outOfRange && <div className="text-sm text-red-600">{t("outOfRange")}</div>}
      <button onClick={() => void copyText(result)} disabled={!result} className="btn btn-primary disabled:opacity-50">{t("copy")}</button>
    </div>
  );
}
