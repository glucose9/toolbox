"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function minify(css: string): string {
  // Strings and (...) groups keep their inner spacing untouched: the CSS spec
  // requires spaces around + and - inside calc(), and quoted content is literal.
  const sheltered: string[] = [];
  const shelter = (s: string) => {
    sheltered.push(s);
    return "__CSSMIN" + (sheltered.length - 1) + "__";
  };
  // Single pass so a comment marker inside a string is not stripped as a
  // comment and a quote inside a comment does not start a string.
  let out = "";
  for (let i = 0; i < css.length; ) {
    const c = css[i];
    if (c === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < css.length) {
        if (css[j] === "\\") { j += 2; continue; }
        if (css[j] === c) { j++; break; }
        j++;
      }
      out += shelter(css.slice(i, j));
      i = j;
      continue;
    }
    out += c;
    i++;
  }
  let prev = "";
  while (prev !== out) {
    prev = out;
    out = out.replace(/\([^()]*\)/g, (m) => shelter(m.replace(/\s+/g, " ")));
  }
  out = out
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>+~])\s*/g, "$1")
    // Trim only after ":" — a space before it can be a descendant combinator
    // (".card :hover") whose removal changes the selector's meaning.
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();
  for (let i = sheltered.length - 1; i >= 0; i--) {
    out = out.replace("__CSSMIN" + i + "__", () => sheltered[i]);
  }
  return out;
}

export default function CssMinifierTool() {
  const t = useTranslations("toolUI.css-minifier");
  const [input, setInput] = useState(`/* sample */\n.btn {\n  display: inline-block;\n  padding: 8px 12px;\n  border-radius: 4px;\n  background: #3b82f6;\n  color: white;\n}\n\n.btn:hover {\n  background: #2563eb;\n}`);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => minify(input), [input]);
  const saved = input.length - output.length;
  const pct = input.length > 0 ? Math.round((saved / input.length) * 100) : 0;

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">{input.length} → {output.length} ({pct}% {t("saved")})</span>
        <button onClick={copy} className="btn btn-primary">{copied ? t("copied") : t("copy")}</button>
      </div>
    </div>
  );
}
