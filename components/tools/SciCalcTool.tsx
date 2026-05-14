"use client";

import { useMemo, useState } from "react";

type Mode = "deg" | "rad";

function evaluate(input: string, mode: Mode): { value: number | null; error: string } {
  let expr = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/π/g, "Math.PI")
    .replace(/\be\b/g, "Math.E")
    .replace(/\^/g, "**");

  const trig = (name: string) =>
    new RegExp(`\\b${name}\\(`, "g");
  if (mode === "deg") {
    expr = expr
      .replace(trig("sin"), "Math.sin(Math.PI/180*")
      .replace(trig("cos"), "Math.cos(Math.PI/180*")
      .replace(trig("tan"), "Math.tan(Math.PI/180*")
      .replace(trig("asin"), "(180/Math.PI)*Math.asin(")
      .replace(trig("acos"), "(180/Math.PI)*Math.acos(")
      .replace(trig("atan"), "(180/Math.PI)*Math.atan(");
  } else {
    expr = expr
      .replace(trig("sin"), "Math.sin(")
      .replace(trig("cos"), "Math.cos(")
      .replace(trig("tan"), "Math.tan(")
      .replace(trig("asin"), "Math.asin(")
      .replace(trig("acos"), "Math.acos(")
      .replace(trig("atan"), "Math.atan(");
  }
  expr = expr
    .replace(/\blog10\(/g, "Math.log10(")
    .replace(/\blog\(/g, "Math.log10(")
    .replace(/\bln\(/g, "Math.log(")
    .replace(/\bsqrt\(/g, "Math.sqrt(")
    .replace(/\babs\(/g, "Math.abs(")
    .replace(/\bexp\(/g, "Math.exp(")
    .replace(/\bfloor\(/g, "Math.floor(")
    .replace(/\bceil\(/g, "Math.ceil(")
    .replace(/\bround\(/g, "Math.round(")
    .replace(/(\d+)!/g, (_, n) => `__fact(${n})`);

  if (!/^[\d+\-*/().,\s%a-zA-Z_*\\]+$/.test(expr)) return { value: null, error: "잘못된 문자가 있어요" };
  if (/[a-zA-Z_]/.test(expr.replace(/Math\.[A-Za-z]+|__fact/g, ""))) {
    return { value: null, error: "알 수 없는 함수/변수" };
  }
  try {
    const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
    const v = Function("Math", "__fact", `"use strict"; return (${expr})`)(Math, fact);
    if (typeof v !== "number" || !isFinite(v)) return { value: null, error: "계산 불가" };
    return { value: v, error: "" };
  } catch (e) {
    return { value: null, error: (e as Error).message };
  }
}

export default function SciCalcTool() {
  const [input, setInput] = useState("sin(30) + cos(60)");
  const [mode, setMode] = useState<Mode>("deg");
  const [history, setHistory] = useState<{ expr: string; result: number }[]>([]);

  const { value, error } = useMemo(() => evaluate(input, mode), [input, mode]);

  const insert = (s: string) => setInput((i) => i + s);
  const clear = () => setInput("");
  const eq = () => {
    if (value !== null) {
      setHistory((h) => [{ expr: input, result: value }, ...h.slice(0, 9)]);
    }
  };

  const buttons: { label: string; ins?: string; act?: () => void; cls?: string }[][] = [
    [
      { label: "sin", ins: "sin(" },
      { label: "cos", ins: "cos(" },
      { label: "tan", ins: "tan(" },
      { label: "π", ins: "π" },
      { label: "AC", act: clear, cls: "bg-red-100 dark:bg-red-900/30" },
    ],
    [
      { label: "log", ins: "log(" },
      { label: "ln", ins: "ln(" },
      { label: "√", ins: "sqrt(" },
      { label: "^", ins: "^" },
      { label: "(", ins: "(" },
    ],
    [
      { label: "7", ins: "7" }, { label: "8", ins: "8" }, { label: "9", ins: "9" },
      { label: "÷", ins: "÷" }, { label: ")", ins: ")" },
    ],
    [
      { label: "4", ins: "4" }, { label: "5", ins: "5" }, { label: "6", ins: "6" },
      { label: "×", ins: "×" }, { label: "%", ins: "%" },
    ],
    [
      { label: "1", ins: "1" }, { label: "2", ins: "2" }, { label: "3", ins: "3" },
      { label: "-", ins: "-" }, { label: "!", ins: "!" },
    ],
    [
      { label: "0", ins: "0" }, { label: ".", ins: "." }, { label: "+", ins: "+" },
      { label: "=", act: eq, cls: "bg-brand-500 text-white col-span-2" },
    ],
  ];

  return (
    <div className="card space-y-3">
      <div className="flex justify-between text-sm">
        <div className="flex gap-2">
          <button onClick={() => setMode("deg")} className={`btn ${mode === "deg" ? "btn-primary" : "btn-secondary"}`}>DEG</button>
          <button onClick={() => setMode("rad")} className={`btn ${mode === "rad" ? "btn-primary" : "btn-secondary"}`}>RAD</button>
        </div>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-3 py-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-right text-xl font-mono"
      />

      <div className="text-right text-2xl font-bold min-h-8">
        {error ? <span className="text-red-600 text-sm">{error}</span> : value !== null ? value.toString() : "—"}
      </div>

      <div className="grid grid-cols-5 gap-1">
        {buttons.flat().map((b, i) => (
          <button
            key={i}
            onClick={b.act || (() => insert(b.ins!))}
            className={`py-3 rounded text-sm font-medium ${b.cls || "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {history.length > 0 && (
        <div>
          <div className="text-xs text-muted mb-1">기록</div>
          <div className="max-h-32 overflow-y-auto text-xs space-y-1">
            {history.map((h, i) => (
              <button key={i} onClick={() => setInput(String(h.result))} className="block w-full text-left p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 font-mono">
                {h.expr} = <strong>{h.result}</strong>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
