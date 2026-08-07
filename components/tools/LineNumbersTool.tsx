"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

export default function LineNumbersTool() {
  const t = useTranslations("toolUI.line-numbers");
  const [text, setText] = useState("첫 번째 줄\n두 번째 줄\n세 번째 줄");
  const [start, setStart] = useState(1);
  const [sep, setSep] = useState(". ");
  const [pad, setPad] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const lines = text.split("\n");
    const maxNum = start + lines.length - 1;
    const width = String(maxNum).length;
    return lines.map((l, i) => {
      const n = start + i;
      const num = pad ? String(n).padStart(width, " ") : String(n);
      return `${num}${sep}${l}`;
    }).join("\n");
  }, [text, start, sep, pad]);

  const copy = async () => { const ok = await copyText(output); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); } };

  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono" />
      <div className="grid grid-cols-3 gap-2 text-sm">
        <label>{t("startNumber")}<input type="number" value={start} onChange={(e) => setStart(parseInt(e.target.value) || 0)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mt-1" /></label>
        <label>{t("separator")}<input type="text" value={sep} onChange={(e) => setSep(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mt-1" /></label>
        <label className="flex items-end gap-1 pb-1"><input type="checkbox" checked={pad} onChange={(e) => setPad(e.target.checked)} /> {t("padDigits")}</label>
      </div>
      <textarea readOnly value={output} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono" />
      <button onClick={copy} className="btn btn-primary">{copied ? t("copied") : t("copy")}</button>
    </div>
  );
}
