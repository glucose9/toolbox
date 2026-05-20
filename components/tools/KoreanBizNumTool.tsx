"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function validate(input: string): { valid: boolean; formatted: string; check?: number; expected?: number } {
  const d = input.replace(/\D/g, "");
  if (d.length !== 10) return { valid: false, formatted: "__NEED_10__" };
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
  const t = useTranslations("toolUI.korean-biz-num");
  const [input, setInput] = useState("123-45-67890");
  const result = useMemo(() => validate(input), [input]);
  const formatted = result.formatted === "__NEED_10__" ? t("need10digits") : result.formatted;
  return (
    <div className="card space-y-3">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="123-45-67890" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
      <div className={`p-4 rounded text-center ${result.valid ? "bg-green-50 dark:bg-green-900/20 border border-green-500" : "bg-red-50 dark:bg-red-900/20 border border-red-500"}`}>
        <div className="text-3xl">{result.valid ? "✓" : "✗"}</div>
        <div className="font-bold mt-1">{result.valid ? t("valid") : t("invalid")}</div>
        <div className="font-mono mt-1 text-sm">{formatted}</div>
        {!result.valid && result.expected !== undefined && (
          <div className="text-xs text-muted mt-1">{t("checkDigit")}: {result.check} ({t("expected")}: {result.expected})</div>
        )}
      </div>
      <div className="text-xs text-muted">{t("disclaimer")}</div>
    </div>
  );
}
