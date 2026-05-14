"use client";

import { useMemo, useState } from "react";

type Style = "ascii" | "single" | "double" | "rounded" | "thick";

const STYLES: Record<Style, { tl: string; tr: string; bl: string; br: string; h: string; v: string }> = {
  ascii: { tl: "+", tr: "+", bl: "+", br: "+", h: "-", v: "|" },
  single: { tl: "┌", tr: "┐", bl: "└", br: "┘", h: "─", v: "│" },
  double: { tl: "╔", tr: "╗", bl: "╚", br: "╝", h: "═", v: "║" },
  rounded: { tl: "╭", tr: "╮", bl: "╰", br: "╯", h: "─", v: "│" },
  thick: { tl: "┏", tr: "┓", bl: "┗", br: "┛", h: "━", v: "┃" },
};

function box(text: string, style: Style, padding: number): string {
  const s = STYLES[style];
  const lines = text.split("\n");
  const width = Math.max(...lines.map((l) => l.length));
  const top = s.tl + s.h.repeat(width + padding * 2) + s.tr;
  const bot = s.bl + s.h.repeat(width + padding * 2) + s.br;
  const pad = " ".repeat(padding);
  const middle = lines.map((l) => s.v + pad + l.padEnd(width, " ") + pad + s.v);
  return [top, ...middle, bot].join("\n");
}

export default function AsciiBoxTool() {
  const [text, setText] = useState("Hello\n안녕하세요\nWorld");
  const [style, setStyle] = useState<Style>("single");
  const [padding, setPadding] = useState(1);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => box(text, style, padding), [text, style, padding]);
  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono" />
      <div className="flex flex-wrap gap-2 text-sm items-center">
        {(Object.keys(STYLES) as Style[]).map((s) => (
          <button key={s} onClick={() => setStyle(s)} className={`btn ${style === s ? "btn-primary" : "btn-secondary"}`}>{s}</button>
        ))}
        <label>여백 ({padding})<input type="range" min="0" max="5" value={padding} onChange={(e) => setPadding(+e.target.value)} className="ml-2" /></label>
      </div>
      <pre className="p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono overflow-x-auto whitespace-pre">{output}</pre>
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
