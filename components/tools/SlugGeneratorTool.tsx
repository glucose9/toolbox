"use client";

import { useMemo, useState } from "react";

// minimal Hangul → Roman for slugs (uses simple romanization)
const CHO_ROM = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
const JUNG_ROM = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
const JONG_ROM = ["","k","kk","k","n","n","n","t","l","k","m","l","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"];

function romanize(s: string): string {
  let out = "";
  for (const c of s) {
    const code = c.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const idx = code - 0xac00;
      out += CHO_ROM[Math.floor(idx / 588)] + JUNG_ROM[Math.floor((idx % 588) / 28)] + JONG_ROM[idx % 28];
    } else out += c;
  }
  return out;
}

export default function SlugGeneratorTool() {
  const [input, setInput] = useState("안녕! 첫 번째 글");
  const [doRomanize, setDoRomanize] = useState(true);
  const [lower, setLower] = useState(true);
  const [sep, setSep] = useState("-");
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    let s = doRomanize ? romanize(input) : input;
    if (lower) s = s.toLowerCase();
    s = s.replace(/[^\wÀ-￿\s-]/g, "").trim().replace(/[\s_]+/g, sep);
    return s.replace(new RegExp(`${sep}+`, "g"), sep);
  }, [input, doRomanize, lower, sep]);

  const copy = async () => { await navigator.clipboard.writeText(slug); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
      <div className="flex flex-wrap gap-3 text-sm">
        <label className="flex items-center gap-1"><input type="checkbox" checked={doRomanize} onChange={(e) => setDoRomanize(e.target.checked)} /> 한글 → 로마자</label>
        <label className="flex items-center gap-1"><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} /> 소문자</label>
        <label className="flex items-center gap-1">구분자 <select value={sep} onChange={(e) => setSep(e.target.value)} className="ml-1 px-2 py-0.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"><option value="-">-</option><option value="_">_</option></select></label>
      </div>
      <div className="p-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded font-mono text-lg break-all">{slug || "—"}</div>
      <button onClick={copy} disabled={!slug} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
