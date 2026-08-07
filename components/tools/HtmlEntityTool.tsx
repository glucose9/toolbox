"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

const NAMED: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  " ": "&nbsp;",
};
const REVERSED = Object.fromEntries(Object.entries(NAMED).map(([k, v]) => [v, k])) as Record<string, string>;

function encodeBasic(s: string): string {
  return s.replace(/[&<>"'  ]/g, (c) => NAMED[c] || c);
}

function encodeAll(s: string): string {
  let out = "";
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    if (cp < 128 && !NAMED[ch]) out += ch;
    else if (NAMED[ch]) out += NAMED[ch];
    else out += `&#${cp};`;
  }
  return out;
}

function decode(s: string): string {
  // Single pass: a multi-pass decode would re-decode text produced by an
  // earlier pass (e.g. "&amp;#39;" -> "&#39;" -> "'").
  return s.replace(/&(?:amp|lt|gt|quot|nbsp|#x[0-9a-fA-F]+|#\d+);/g, (m) => {
    if (m[1] === "#") {
      const body = m.slice(2, -1);
      const cp = body[0] === "x" || body[0] === "X" ? parseInt(body.slice(1), 16) : parseInt(body, 10);
      if (!Number.isFinite(cp) || cp > 0x10ffff) return m;
      return String.fromCodePoint(cp);
    }
    return REVERSED[m] || m;
  });
}

type Mode = "encode-basic" | "encode-all" | "decode";

export default function HtmlEntityTool() {
  const t = useTranslations("toolUI.html-entity");
  const [input, setInput] = useState('<p class="hi">안녕 & "world"</p>');
  const [mode, setMode] = useState<Mode>("encode-basic");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (mode === "encode-basic") return encodeBasic(input);
    if (mode === "encode-all") return encodeAll(input);
    return decode(input);
  }, [input, mode]);

  const copy = async () => {
    const ok = await copyText(output);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={() => setMode("encode-basic")} className={`btn ${mode === "encode-basic" ? "btn-primary" : "btn-secondary"}`}>{t("encodeBasic")}</button>
        <button onClick={() => setMode("encode-all")} className={`btn ${mode === "encode-all" ? "btn-primary" : "btn-secondary"}`}>{t("encodeAll")}</button>
        <button onClick={() => setMode("decode")} className={`btn ${mode === "decode" ? "btn-primary" : "btn-secondary"}`}>{t("decode")}</button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <textarea
        readOnly
        value={output}
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
    </div>
  );
}
