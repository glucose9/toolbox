"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import katex from "katex";
import "katex/dist/katex.min.css";

type Btn = { label: string; latex: string; cursor?: number; titleKey?: string };
type Group = { key: string; cols: number; btns: Btn[] };

const GROUPS: Group[] = [
  {
    key: "basic",
    cols: 6,
    btns: [
      { label: "7", latex: "7" }, { label: "8", latex: "8" }, { label: "9", latex: "9" },
      { label: "+", latex: " + " }, { label: "(", latex: "(" }, { label: ")", latex: ")" },
      { label: "4", latex: "4" }, { label: "5", latex: "5" }, { label: "6", latex: "6" },
      { label: "−", latex: " - " }, { label: "[", latex: "[" }, { label: "]", latex: "]" },
      { label: "1", latex: "1" }, { label: "2", latex: "2" }, { label: "3", latex: "3" },
      { label: "×", latex: " \\times " }, { label: "÷", latex: " \\div " }, { label: "=", latex: " = " },
      { label: "0", latex: "0" }, { label: ".", latex: "." }, { label: ",", latex: ", " },
      { label: "·", latex: " \\cdot " }, { label: "±", latex: " \\pm " }, { label: "∓", latex: " \\mp " },
    ],
  },
  {
    key: "powers",
    cols: 4,
    btns: [
      { label: "x²", latex: "^{2}" },
      { label: "x³", latex: "^{3}" },
      { label: "xⁿ", latex: "^{}", cursor: -1, titleKey: "power" },
      { label: "x_n", latex: "_{}", cursor: -1, titleKey: "subscript" },
      { label: "a/b", latex: "\\frac{}{}", cursor: -3, titleKey: "fraction" },
      { label: "√", latex: "\\sqrt{}", cursor: -1 },
      { label: "ⁿ√", latex: "\\sqrt[]{}", cursor: -3, titleKey: "nthRoot" },
      { label: "|x|", latex: "\\left| \\right|", cursor: -8, titleKey: "absolute" },
      { label: "e^x", latex: "e^{}", cursor: -1 },
      { label: "10^x", latex: "10^{}", cursor: -1 },
      { label: "log", latex: "\\log_{}{}", cursor: -3 },
      { label: "ln", latex: "\\ln" },
    ],
  },
  {
    key: "trig",
    cols: 4,
    btns: [
      { label: "sin", latex: "\\sin" },
      { label: "cos", latex: "\\cos" },
      { label: "tan", latex: "\\tan" },
      { label: "cot", latex: "\\cot" },
      { label: "sec", latex: "\\sec" },
      { label: "csc", latex: "\\csc" },
      { label: "sin⁻¹", latex: "\\sin^{-1}" },
      { label: "cos⁻¹", latex: "\\cos^{-1}" },
      { label: "tan⁻¹", latex: "\\tan^{-1}" },
      { label: "min", latex: "\\min" },
      { label: "max", latex: "\\max" },
      { label: "exp", latex: "\\exp" },
    ],
  },
  {
    key: "calculus",
    cols: 4,
    btns: [
      { label: "∫", latex: "\\int", titleKey: "integral" },
      { label: "∫ₐᵇ", latex: "\\int_{}^{}", cursor: -4, titleKey: "defIntegral" },
      { label: "∬", latex: "\\iint" },
      { label: "∭", latex: "\\iiint" },
      { label: "∮", latex: "\\oint" },
      { label: "Σ", latex: "\\sum_{}^{}", cursor: -4, titleKey: "sigma" },
      { label: "∏", latex: "\\prod_{}^{}", cursor: -4 },
      { label: "lim", latex: "\\lim_{x \\to }", cursor: -1 },
      { label: "∂", latex: "\\partial" },
      { label: "d/dx", latex: "\\frac{d}{dx}" },
      { label: "∇", latex: "\\nabla" },
      { label: "Δ", latex: "\\Delta" },
    ],
  },
  {
    key: "greek",
    cols: 6,
    btns: [
      { label: "α", latex: "\\alpha" }, { label: "β", latex: "\\beta" }, { label: "γ", latex: "\\gamma" },
      { label: "δ", latex: "\\delta" }, { label: "ε", latex: "\\epsilon" }, { label: "ζ", latex: "\\zeta" },
      { label: "η", latex: "\\eta" }, { label: "θ", latex: "\\theta" }, { label: "λ", latex: "\\lambda" },
      { label: "μ", latex: "\\mu" }, { label: "ν", latex: "\\nu" }, { label: "ξ", latex: "\\xi" },
      { label: "π", latex: "\\pi" }, { label: "ρ", latex: "\\rho" }, { label: "σ", latex: "\\sigma" },
      { label: "τ", latex: "\\tau" }, { label: "φ", latex: "\\phi" }, { label: "ω", latex: "\\omega" },
      { label: "Γ", latex: "\\Gamma" }, { label: "Δ", latex: "\\Delta" }, { label: "Θ", latex: "\\Theta" },
      { label: "Λ", latex: "\\Lambda" }, { label: "Σ", latex: "\\Sigma" }, { label: "Ω", latex: "\\Omega" },
    ],
  },
  {
    key: "relations",
    cols: 6,
    btns: [
      { label: "≤", latex: " \\le " }, { label: "≥", latex: " \\ge " }, { label: "≠", latex: " \\ne " },
      { label: "≈", latex: " \\approx " }, { label: "≡", latex: " \\equiv " }, { label: "∝", latex: " \\propto " },
      { label: "∞", latex: "\\infty" }, { label: "∈", latex: " \\in " }, { label: "∉", latex: " \\notin " },
      { label: "⊂", latex: " \\subset " }, { label: "⊆", latex: " \\subseteq " }, { label: "⊃", latex: " \\supset " },
      { label: "∪", latex: " \\cup " }, { label: "∩", latex: " \\cap " }, { label: "∅", latex: "\\emptyset" },
      { label: "∀", latex: "\\forall " }, { label: "∃", latex: "\\exists " }, { label: "¬", latex: "\\neg " },
      { label: "∧", latex: " \\land " }, { label: "∨", latex: " \\lor " }, { label: "→", latex: " \\to " },
      { label: "⇒", latex: " \\Rightarrow " }, { label: "⇔", latex: " \\Leftrightarrow " }, { label: "↦", latex: " \\mapsto " },
    ],
  },
  {
    key: "matrix",
    cols: 4,
    btns: [
      { label: "(a b)", latex: "\\begin{pmatrix} & \\\\ & \\end{pmatrix}", cursor: -20, titleKey: "matrixParen" },
      { label: "[a b]", latex: "\\begin{bmatrix} & \\\\ & \\end{bmatrix}", cursor: -20, titleKey: "matrixBracket" },
      { label: "|a b|", latex: "\\begin{vmatrix} & \\\\ & \\end{vmatrix}", cursor: -20, titleKey: "determinant" },
      { label: "{a/b", latex: "\\begin{cases} & \\\\ & \\end{cases}", cursor: -18, titleKey: "cases" },
      { label: "⟨ ⟩", latex: "\\langle \\rangle", cursor: -8 },
      { label: "⌊ ⌋", latex: "\\lfloor \\rfloor", cursor: -8, titleKey: "floor" },
      { label: "⌈ ⌉", latex: "\\lceil \\rceil", cursor: -7, titleKey: "ceil" },
      { label: "↑↓", latex: " \\uparrow ", titleKey: "arrow" },
    ],
  },
];

const TEMPLATES = [
  { key: "quadratic", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
  { key: "pythagoras", latex: "a^2 + b^2 = c^2" },
  { key: "euler", latex: "e^{i\\pi} + 1 = 0" },
  { key: "integral", latex: "\\int_{a}^{b} f(x)\\,dx" },
  { key: "taylor", latex: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n" },
  { key: "matrix", latex: "A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
];

export default function FormulaBuilderTool() {
  const tg = useTranslations("toolUI.formula-builder");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}");
  const [display, setDisplay] = useState<"display" | "inline">("display");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!previewRef.current) return;
    try {
      katex.render(value || "\\,", previewRef.current, {
        throwOnError: true,
        displayMode: display === "display",
        strict: "ignore",
      });
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "LaTeX error");
    }
  }, [value, display]);

  const insert = (btn: Btn) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const next = before + btn.latex + after;
    setValue(next);
    requestAnimationFrame(() => {
      ta.focus();
      const offset = btn.cursor ?? 0;
      const pos = start + btn.latex.length + offset;
      ta.setSelectionRange(pos, pos);
    });
  };

  const backspace = () => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    if (start === end && start > 0) {
      const before = value.slice(0, start);
      const m = before.match(/(\\[a-zA-Z]+\{?|\\.|.)$/);
      const delLen = m ? m[0].length : 1;
      setValue(value.slice(0, start - delLen) + value.slice(end));
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(start - delLen, start - delLen);
      });
    } else {
      setValue(value.slice(0, start) + value.slice(end));
      requestAnimationFrame(() => ta.focus());
    }
  };

  const clear = () => setValue("");
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const inlineLatex = `$${value}$`;
  const displayLatex = `$$${value}$$`;

  return (
    <div className="card space-y-3">
      <div ref={previewRef} className="card-section min-h-[80px] flex items-center justify-center overflow-x-auto text-lg" />
      {error && <div className="text-xs text-red-500">⚠️ {error}</div>}

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label">{tg("latexSource")}</label>
          <div className="flex gap-1 text-xs">
            <button onClick={() => setDisplay("display")} className={`px-2 py-0.5 rounded ${display === "display" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>Display</button>
            <button onClick={() => setDisplay("inline")} className={`px-2 py-0.5 rounded ${display === "inline" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>Inline</button>
          </div>
        </div>
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
        />
        <div className="flex flex-wrap gap-2 mt-2 text-xs">
          <button onClick={backspace} className="btn">⌫ {tg("delete")}</button>
          <button onClick={clear} className="btn">🗑️ {tg("clearAll")}</button>
          <button onClick={() => copy(value)} className="btn">📋 {tg("copyCode")}</button>
          <button onClick={() => copy(inlineLatex)} className="btn">📋 $…$</button>
          <button onClick={() => copy(displayLatex)} className="btn">📋 $$…$$</button>
        </div>
      </div>

      <details open>
        <summary className="text-sm cursor-pointer text-blue-600 font-semibold">📚 {tg("commonFormulas")}</summary>
        <div className="flex flex-wrap gap-2 mt-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.key}
              onClick={() => setValue(tpl.latex)}
              className="px-3 py-1.5 text-sm rounded bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              {tg(`template.${tpl.key}`)}
            </button>
          ))}
        </div>
      </details>

      {GROUPS.map((g) => (
        <div key={g.key}>
          <div className="text-xs font-semibold text-muted mb-1">{tg(`group.${g.key}`)}</div>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${g.cols}, minmax(0, 1fr))` }}
          >
            {g.btns.map((b, i) => (
              <button
                key={i}
                onClick={() => insert(b)}
                title={b.titleKey ? tg(`title.${b.titleKey}`) : b.latex}
                className="px-2 py-2 text-sm rounded bg-gray-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-gray-200 dark:border-gray-700 font-mono"
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="text-xs text-muted leading-relaxed">
        💡 {tg("hint")}
      </div>
    </div>
  );
}
