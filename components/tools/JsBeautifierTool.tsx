"use client";
import { useMemo, useState } from "react";

function beautify(code: string): string {
  let depth = 0;
  let out = "";
  let i = 0;
  let inStr: string | null = null;
  while (i < code.length) {
    const c = code[i];
    if (inStr) {
      out += c;
      if (c === "\\") { out += code[++i]; }
      else if (c === inStr) inStr = null;
      i++; continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; out += c; i++; continue; }
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
  return out.replace(/\n\s*\n/g, "\n").trim();
}

export default function JsBeautifierTool() {
  const [input, setInput] = useState("function add(a,b){return a+b;}const r=add(1,2);console.log(r);");
  const output = useMemo(() => beautify(input), [input]);
  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={output} className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn btn-primary">복사</button>
    </div>
  );
}
