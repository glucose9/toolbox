"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

function beautify(code: string): string {
  let depth = 0;
  let out = "";
  let i = 0;
  // String literals are held out of the emitted text so the final blank-line
  // cleanup cannot rewrite their contents.
  const literals: string[] = [];
  while (i < code.length) {
    const c = code[i];
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\") { j += 2; continue; }
        if (code[j] === c) { j++; break; }
        j++;
      }
      literals.push(code.slice(i, j));
      out += "\u0000" + (literals.length - 1) + "\u0000";
      i = j; continue;
    }
    if (c === "/" && code[i + 1] === "/") {
      let j = i;
      while (j < code.length && code[j] !== "\n") j++;
      out += code.slice(i, j);
      i = j; continue;
    }
    if (c === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const j = end === -1 ? code.length : end + 2;
      out += code.slice(i, j);
      i = j; continue;
    }
    if (c === "/") {
      // "/" right after an operator/punctuator/keyword starts a regex literal,
      // which must pass through verbatim (line breaks inside it are illegal).
      const trimmed = out.replace(/\s+$/, "");
      const p = trimmed.slice(-1);
      const p2 = trimmed.slice(-2);
      const afterKeyword = /(?:^|[^$\w])(?:return|typeof|case|in|of|new|delete|void|instanceof|do|else|yield|await)$/.test(trimmed);
      const regexPos = p === "" || afterKeyword || ("(,=:[!&|?{};+*%<>^~-".includes(p) && p2 !== "++" && p2 !== "--");
      if (regexPos) {
        let j = i + 1;
        let inClass = false;
        let closed = false;
        while (j < code.length) {
          const d = code[j];
          if (d === "\\") { j += 2; continue; }
          if (d === "\n") break;
          if (inClass) { if (d === "]") inClass = false; }
          else if (d === "[") inClass = true;
          else if (d === "/") { closed = true; break; }
          j++;
        }
        if (closed) {
          j++;
          while (j < code.length && /[a-z]/i.test(code[j])) j++;
          out += code.slice(i, j);
          i = j; continue;
        }
      }
    }
    if (c === "{" || c === "[" || c === "(") {
      out += c;
      if (c === "{" || c === "[") { depth++; out += "\n" + "  ".repeat(depth); }
    } else if (c === "}" || c === "]") {
      depth = Math.max(0, depth - 1);
      out += "\n" + "  ".repeat(depth) + c;
    } else if (c === ";") {
      out += c + "\n" + "  ".repeat(depth);
    } else if (c === ",") {
      out += c + "\n" + "  ".repeat(depth);
    } else if (c === ")") {
      out += c;
    } else {
      out += c;
    }
    i++;
  }
  return out
    .replace(/\n\s*\n/g, "\n")
    .trim()
    .replace(/\u0000(\d+)\u0000/g, (_m, n: string) => literals[Number(n)]);
}

export default function JsBeautifierTool() {
  const t = useTranslations("toolUI.js-beautifier");
  const [input, setInput] = useState("function add(a,b){return a+b;}const r=add(1,2);console.log(r);");
  const output = useMemo(() => beautify(input), [input]);
  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={output} className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={() => void copyText(output)} className="btn btn-primary">{t("copy")}</button>
    </div>
  );
}
