"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type Mode = "char-to-code" | "code-to-char";

export default function UnicodeLookupTool() {
  const t = useTranslations("toolUI.unicode-lookup");
  const [mode, setMode] = useState<Mode>("char-to-code");
  const [input, setInput] = useState(mode === "char-to-code" ? "안녕 😀" : "U+C548 U+B155 U+0020 U+1F600");

  const result = useMemo(() => {
    if (mode === "char-to-code") {
      return Array.from(input).map((c) => ({
        char: c,
        code: c.codePointAt(0)!,
        hex: c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0"),
      }));
    } else {
      const matches = input.match(/U\+?([0-9A-Fa-f]+)/g) || [];
      return matches.map((m) => {
        const hex = m.replace(/^U\+?/, "");
        const code = parseInt(hex, 16);
        const char = code <= 0x10ffff ? String.fromCodePoint(code) : "�";
        return { char, code, hex: hex.toUpperCase().padStart(4, "0") };
      });
    }
  }, [input, mode]);

  return (
    <div className="card space-y-3">
      <div className="flex gap-2 text-sm">
        <button onClick={() => { setMode("char-to-code"); setInput("안녕 😀"); }} className={`btn ${mode === "char-to-code" ? "btn-primary" : "btn-secondary"}`}>{t("charToCode")}</button>
        <button onClick={() => { setMode("code-to-char"); setInput("U+C548 U+B155 U+0020 U+1F600"); }} className={`btn ${mode === "code-to-char" ? "btn-primary" : "btn-secondary"}`}>{t("codeToChar")}</button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-24 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base resize-y" />
      <div className="max-h-72 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0"><tr><th className="px-3 py-2 text-left">{t("character")}</th><th className="px-3 py-2 text-left">{t("codePoint")}</th><th className="px-3 py-2 text-left">{t("decimal")}</th></tr></thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {result.map((r, i) => (
              <tr key={i}>
                <td className="px-3 py-1.5 text-xl">{r.char}</td>
                <td className="px-3 py-1.5 font-mono">U+{r.hex}</td>
                <td className="px-3 py-1.5 font-mono text-muted">{r.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
