"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

export default function NumberFormatTool() {
  const t = useTranslations("toolUI.number-format");
  const [input, setInput] = useState("1234567890");
  const num = useMemo(() => {
    try { return BigInt(input.replace(/[,_\s]/g, "")); } catch { return null; }
  }, [input]);
  const formats = useMemo(() => {
    if (num === null) return null;
    const s = num.toString();
    const comma = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const under = s.replace(/\B(?=(\d{3})+(?!\d))/g, "_");
    const space = s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // Korean style
    let kor = s;
    const sign = s.startsWith("-") ? "-" : "";
    const digits = sign ? s.slice(1) : s;
    if (digits.length > 4) {
      const groups: string[] = [];
      let rest = digits;
      while (rest.length > 0) {
        groups.unshift(rest.slice(-4));
        rest = rest.slice(0, -4);
      }
      const units = ["", t("unitMan"), t("unitEok"), t("unitJo"), t("unitGyeong")];
      kor = sign + groups.map((g, i) => g + (units[groups.length - 1 - i] || "")).join(" ");
    }
    return { comma, under, space, kor };
  }, [num, t]);
  return (
    <div className="card space-y-3">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
      {formats ? (
        <div className="space-y-2 text-sm">
          {(["comma","under","space","kor"] as const).map((k) => (
            <div key={k} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
              <span className="text-xs text-muted w-20">{k === "comma" ? "1,000" : k === "under" ? "1_000" : k === "space" ? "1 000" : `1${t("unitMan")}`}</span>
              <span className="flex-1 font-mono break-all">{formats[k]}</span>
              <button onClick={() => void copyText(formats[k])} className="text-xs text-brand-600 hover:underline">{t("copy")}</button>
            </div>
          ))}
        </div>
      ) : <div className="text-sm text-red-600">{t("invalidNumber")}</div>}
    </div>
  );
}
