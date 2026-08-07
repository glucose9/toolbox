"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

function caesar(text: string, shift: number, rot47 = false): string {
  const s = ((shift % 26) + 26) % 26;
  if (rot47) {
    return Array.from(text)
      .map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 33 && code <= 126) {
          return String.fromCharCode(33 + ((code - 33 + 47) % 94));
        }
        return c;
      })
      .join("");
  }
  return Array.from(text)
    .map((c) => {
      if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 + s) % 26) + 65);
      if (/[a-z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 97 + s) % 26) + 97);
      return c;
    })
    .join("");
}

export default function CaesarCipherTool() {
  const t = useTranslations("toolUI.caesar-cipher");
  const [input, setInput] = useState("Hello World");
  const [shift, setShift] = useState(13);
  const [rot47, setRot47] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => caesar(input, shift, rot47), [input, shift, rot47]);

  const copy = async () => {
    const ok = await copyText(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="card space-y-3">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={rot47} onChange={(e) => setRot47(e.target.checked)} />
          {t("rot47")}
        </label>
        {!rot47 && (
          <label className="flex-1 min-w-40">
            {t("rotation")} ({shift})
            <input type="range" min="-25" max="25" value={shift} onChange={(e) => setShift(+e.target.value)} className="w-full" />
          </label>
        )}
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {!rot47 && (
          <>
            <button onClick={() => setShift(13)} className="btn btn-secondary">ROT13</button>
            <button onClick={() => setShift(3)} className="btn btn-secondary">{t("rot3")}</button>
            <button onClick={() => setShift(-shift)} className="btn btn-secondary">{t("flipSign")}</button>
          </>
        )}
      </div>
      <textarea
        readOnly
        value={output}
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
    </div>
  );
}
