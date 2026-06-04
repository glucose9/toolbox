"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  math,
  setAngleMode,
  formatResult,
  toFraction,
  polyRoots,
  formatRoot,
  solveFx,
  rref,
  stats1Var,
  linReg,
  parseNumberList,
  type AngleMode,
  type Notation,
} from "@/lib/sciCalc";

type Tab = "calc" | "solver" | "matrix" | "stat";

export default function SciCalcTool() {
  const t = useTranslations("toolUI.sci-calc");
  const [tab, setTab] = useState<Tab>("calc");
  const [pinned, setPinned] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "calc", label: t("tabCalc") },
    { id: "solver", label: t("tabSolver") },
    { id: "matrix", label: t("tabMatrix") },
    { id: "stat", label: t("tabStat") },
  ];

  return (
    // When pinned, the whole card sticks just below the sticky site header
    // (h-14 desktop; taller on mobile with the search row) so it stays visible
    // while scrolling the how-to / FAQ below. z-30 keeps it under the header (z-40).
    <div
      className={`card space-y-3 ${
        pinned
          ? "sticky top-[104px] sm:top-16 z-30 bg-white dark:bg-gray-900 shadow-xl ring-1 ring-brand-300 dark:ring-brand-700"
          : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 dark:border-gray-700 pb-2">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`px-3 py-1.5 rounded text-sm font-medium ${
              tab === tb.id
                ? "bg-brand-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tb.label}
          </button>
        ))}
        <button
          onClick={() => setPinned((p) => !p)}
          title={t("pinHint")}
          className={`ml-auto px-2.5 py-1.5 rounded text-sm font-medium ${
            pinned
              ? "bg-brand-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          📌 {pinned ? t("pinned") : t("pin")}
        </button>
      </div>

      {tab === "calc" && <CalcTab />}
      {tab === "solver" && <SolverTab />}
      {tab === "matrix" && <MatrixTab />}
      {tab === "stat" && <StatTab />}
    </div>
  );
}

// ===========================================================================
// Tab 1 — Calculator
// ===========================================================================

function CalcTab() {
  const t = useTranslations("toolUI.sci-calc");
  const [input, setInput] = useState("sin(30)+cos(60)");
  const [mode, setMode] = useState<AngleMode>("deg");
  const [second, setSecond] = useState(false);
  const [vars, setVars] = useState<Record<string, number>>({});
  const [ans, setAns] = useState<number | null>(null);
  const [fracMode, setFracMode] = useState(false);
  const [notation, setNotation] = useState<Notation>("auto");
  const [fixDigits, setFixDigits] = useState(4);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);
  const [storeVar, setStoreVar] = useState("A");

  const evald = useMemo(() => {
    if (!input.trim()) return { display: "—", value: null as number | null, error: "" };
    try {
      setAngleMode(mode);
      const scope: Record<string, number> = { ...vars, Ans: ans ?? 0, ans: ans ?? 0 };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const v: any = math.evaluate(input, scope);
      if (typeof v === "number") {
        if (!isFinite(v)) return { display: formatResult(v, notation, fixDigits), value: v, error: "" };
        return { display: formatResult(v, notation, fixDigits), value: v, error: "" };
      }
      // Non-number result (complex, fraction, matrix, etc.) — format via mathjs.
      return { display: math.format(v, { precision: 12 }), value: null, error: "" };
    } catch {
      return { display: "", value: null, error: t("errCannot") };
    }
  }, [input, mode, vars, ans, notation, fixDigits, t]);

  // Always compute the fraction form (independent of ►Frac) so it's visible
  // whenever the answer is rational. ►Frac just promotes it to the big result.
  const frac = useMemo(
    () => (evald.value !== null ? toFraction(evald.value) : null),
    [evald.value]
  );

  const insert = (s: string) => setInput((i) => i + s);
  const backspace = () => setInput((i) => i.slice(0, -1));
  const clear = () => setInput("");
  const cycleMode = () =>
    setMode((m) => (m === "deg" ? "rad" : m === "rad" ? "grad" : "deg"));

  const commit = () => {
    if (evald.value !== null || (evald.display && !evald.error)) {
      setHistory((h) => [{ expr: input, result: evald.display }, ...h.slice(0, 11)]);
      if (evald.value !== null) setAns(evald.value);
    }
  };

  const storeAns = () => {
    if (evald.value !== null) {
      setVars((v) => ({ ...v, [storeVar]: evald.value! }));
      setAns(evald.value);
    }
  };

  // Keys may carry a secondary (2nd) function shown/used while 2nd is active.
  type Key = {
    label: string;
    ins?: string;
    act?: () => void;
    cls?: string;
    label2?: string;
    ins2?: string;
  };
  const rows: Key[][] = [
    [
      { label: "2nd", act: () => setSecond((s) => !s), cls: second ? "bg-amber-400 text-black" : "bg-amber-100 dark:bg-amber-900/30" },
      { label: mode.toUpperCase(), act: cycleMode, cls: "bg-sky-100 dark:bg-sky-900/30 text-xs" },
      { label: "▶Frac", act: () => setFracMode((f) => !f), cls: fracMode ? "bg-emerald-400 text-black" : "bg-emerald-100 dark:bg-emerald-900/30 text-xs" },
      { label: "⌫", act: backspace },
      { label: t("ac"), act: clear, cls: "bg-red-100 dark:bg-red-900/30" },
    ],
    [
      { label: "x²", ins: "^2", label2: "x⁻¹", ins2: "^(-1)" },
      { label: "x³", ins: "^3", label2: "∛(", ins2: "cbrt(" },
      { label: "^", ins: "^" },
      { label: "√(", ins: "sqrt(", label2: "ⁿ√", ins2: "nthRoot(" },
      { label: "∛(", ins: "cbrt(" },
    ],
    [
      { label: "sin", ins: "sin(", label2: "sin⁻¹", ins2: "asin(" },
      { label: "cos", ins: "cos(", label2: "cos⁻¹", ins2: "acos(" },
      { label: "tan", ins: "tan(", label2: "tan⁻¹", ins2: "atan(" },
      { label: "π", ins: "pi", label2: "τ", ins2: "tau" },
      { label: "e", ins: "e" },
    ],
    [
      { label: "log", ins: "log10(", label2: "log₂", ins2: "log2(" },
      { label: "10^", ins: "10^" },
      { label: "ln", ins: "log(" },
      { label: "e^", ins: "e^" },
      { label: "1/x", ins: "^(-1)" },
    ],
    [
      { label: "sinh", ins: "sinh(", label2: "sinh⁻¹", ins2: "asinh(" },
      { label: "cosh", ins: "cosh(", label2: "cosh⁻¹", ins2: "acosh(" },
      { label: "tanh", ins: "tanh(", label2: "tanh⁻¹", ins2: "atanh(" },
      { label: "nPr", ins: "npr(" },
      { label: "nCr", ins: "ncr(" },
    ],
    [
      { label: "abs", ins: "abs(" },
      { label: "mod", ins: "mod(" },
      { label: "gcd", ins: "gcd(", label2: "lcm", ins2: "lcm(" },
      { label: "!", ins: "!" },
      { label: ",", ins: "," },
    ],
    [
      { label: "7", ins: "7" }, { label: "8", ins: "8" }, { label: "9", ins: "9" },
      { label: "÷", ins: "/" }, { label: "(", ins: "(" },
    ],
    [
      { label: "4", ins: "4" }, { label: "5", ins: "5" }, { label: "6", ins: "6" },
      { label: "×", ins: "*" }, { label: ")", ins: ")" },
    ],
    [
      { label: "1", ins: "1" }, { label: "2", ins: "2" }, { label: "3", ins: "3" },
      { label: "−", ins: "-" }, { label: "Ans", ins: "Ans" },
    ],
    [
      { label: "0", ins: "0" }, { label: ".", ins: "." }, { label: "(-)", ins: "-" },
      { label: "+", ins: "+" },
      { label: "=", act: commit, cls: "bg-brand-500 text-white" },
    ],
  ];

  const definedVars = Object.entries(vars);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <div className="flex gap-1">
          {(["deg", "rad", "grad"] as AngleMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`btn ${mode === m ? "btn-primary" : "btn-secondary"} text-xs`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto text-xs">
          <span className="text-muted">{t("formatLabel")}</span>
          <select
            value={notation}
            onChange={(e) => setNotation(e.target.value as Notation)}
            className="px-1.5 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          >
            <option value="auto">{t("fmtAuto")}</option>
            <option value="sci">{t("fmtSci")}</option>
            <option value="eng">{t("fmtEng")}</option>
            <option value="fix">{t("fmtFix")}</option>
          </select>
          {notation === "fix" && (
            <input
              type="number"
              min={0}
              max={12}
              value={fixDigits}
              onChange={(e) => setFixDigits(Math.max(0, Math.min(12, Number(e.target.value))))}
              className="w-12 px-1 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            />
          )}
        </div>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
        }}
        spellCheck={false}
        className="w-full px-3 py-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-right text-xl font-mono"
      />

      <div className="text-right min-h-9">
        {evald.error ? (
          <span className="text-red-600 text-sm">{evald.error}</span>
        ) : fracMode && frac ? (
          // ►Frac on + representable: fraction is the primary (big) result.
          <>
            <div className="text-2xl font-bold break-all text-emerald-600 dark:text-emerald-400 font-mono">{frac}</div>
            <div className="text-sm text-muted break-all">= {evald.display}</div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold break-all">{evald.display || "—"}</div>
            {frac ? (
              <div className="text-base text-emerald-600 dark:text-emerald-400 font-mono">= {frac}</div>
            ) : fracMode && evald.value !== null ? (
              <div className="text-xs text-muted">{t("fracNA")}</div>
            ) : null}
          </>
        )}
      </div>

      {second && <div className="text-xs text-amber-600 dark:text-amber-400">{t("secondActive")}</div>}

      <div className="grid grid-cols-5 gap-1">
        {rows.flat().map((b, i) => {
          const use2 = second && !!b.ins2;
          const isToggle = b.label === "2nd";
          const press = () => {
            if (b.act) b.act();
            else insert(use2 ? b.ins2! : b.ins!);
            // 2nd is a one-shot modifier: clear it after any key except itself.
            if (second && !isToggle) setSecond(false);
          };
          return (
            <button
              key={i}
              onClick={press}
              className={`py-2.5 rounded text-sm font-medium ${
                b.cls || "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              } ${use2 ? "ring-2 ring-amber-400" : ""}`}
            >
              {use2 ? b.label2 : b.label}
            </button>
          );
        })}
      </div>

      {/* Variable storage */}
      <div className="flex flex-wrap items-center gap-2 text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
        <span className="text-muted text-xs">{t("variables")}</span>
        <select
          value={storeVar}
          onChange={(e) => setStoreVar(e.target.value)}
          className="px-1.5 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono"
        >
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={storeAns} disabled={evald.value === null} className="btn btn-secondary text-xs disabled:opacity-40">
          {t("storeBtn")}
        </button>
        {definedVars.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {definedVars.map(([k, v]) => (
              <button
                key={k}
                onClick={() => insert(k)}
                title={formatResult(v, "auto")}
                className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-mono"
              >
                {k}={formatResult(v, "auto")}
              </button>
            ))}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div>
          <div className="text-xs text-muted mb-1">{t("history")}</div>
          <div className="max-h-32 overflow-y-auto text-xs space-y-1">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => setInput(h.result)}
                className="block w-full text-left p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 font-mono break-all"
              >
                {h.expr} = <strong>{h.result}</strong>
              </button>
            ))}
          </div>
        </div>
      )}

      <GraphHint />
    </div>
  );
}

// ===========================================================================
// Tab 2 — Equation solver
// ===========================================================================

function SolverTab() {
  const t = useTranslations("toolUI.sci-calc");
  const [degree, setDegree] = useState(2);
  const [coeffs, setCoeffs] = useState<string[]>(["1", "-5", "6"]);
  const [polyRootsOut, setPolyRootsOut] = useState<string[] | null>(null);

  const [fx, setFx] = useState("cos(x)-x");
  const [a, setA] = useState("-5");
  const [b, setB] = useState("5");
  const [fxRoots, setFxRoots] = useState<{ roots: number[]; error?: string } | null>(null);

  const setDeg = (d: number) => {
    setDegree(d);
    setCoeffs((prev) => {
      const next = [...prev];
      while (next.length < d + 1) next.push("0");
      return next.slice(0, d + 1);
    });
    setPolyRootsOut(null);
  };

  const solvePoly = () => {
    const nums = coeffs.map((c) => Number(c));
    if (nums.some((x) => !isFinite(x))) {
      setPolyRootsOut([t("errCannot")]);
      return;
    }
    const roots = polyRoots(nums);
    setPolyRootsOut(roots.length ? roots.map(formatRoot) : null);
  };

  const solveNumeric = () => {
    const na = Number(a);
    const nb = Number(b);
    if (!isFinite(na) || !isFinite(nb)) {
      setFxRoots({ roots: [], error: t("errCannot") });
      return;
    }
    setFxRoots(solveFx(fx, na, nb, "rad"));
  };

  const superscript = (i: number): string => {
    const p = degree - i;
    if (p === 0) return "";
    if (p === 1) return "x";
    const map: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴" };
    return "x" + String(p).split("").map((d) => map[d] || d).join("");
  };

  return (
    <div className="space-y-5">
      {/* Polynomial */}
      <div className="space-y-2">
        <div className="font-medium text-sm">{t("solverPoly")}</div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted text-xs">{t("solverDegree")}</span>
          {[2, 3, 4].map((d) => (
            <button
              key={d}
              onClick={() => setDeg(d)}
              className={`btn ${degree === d ? "btn-primary" : "btn-secondary"} text-xs`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1 font-mono text-sm">
          {coeffs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span>+</span>}
              <input
                value={c}
                onChange={(e) => setCoeffs((prev) => prev.map((x, j) => (j === i ? e.target.value : x)))}
                className="w-14 px-1.5 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-center"
              />
              <span className="text-muted">{superscript(i)}</span>
            </span>
          ))}
          <span>= 0</span>
        </div>
        <button onClick={solvePoly} className="btn btn-primary text-sm">{t("solverFind")}</button>
        {polyRootsOut && (
          <div className="text-sm space-y-0.5">
            <div className="text-xs text-muted">{t("solverRoots")}</div>
            {polyRootsOut.map((r, i) => (
              <div key={i} className="font-mono">x{<sub>{i + 1}</sub>} = {r}</div>
            ))}
          </div>
        )}
      </div>

      {/* f(x) = 0 numeric */}
      <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="font-medium text-sm">{t("solverFx")}</div>
        <div className="flex flex-wrap items-center gap-2 text-sm font-mono">
          <span className="text-muted">f(x) =</span>
          <input
            value={fx}
            onChange={(e) => setFx(e.target.value)}
            className="flex-1 min-w-40 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted text-xs">{t("solverInterval")}</span>
          <input value={a} onChange={(e) => setA(e.target.value)} className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-center" />
          <span>~</span>
          <input value={b} onChange={(e) => setB(e.target.value)} className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-center" />
        </div>
        <button onClick={solveNumeric} className="btn btn-primary text-sm">{t("solverFind")}</button>
        {fxRoots && (
          <div className="text-sm">
            {fxRoots.error ? (
              <span className="text-red-600">{fxRoots.error}</span>
            ) : fxRoots.roots.length ? (
              <div className="space-y-0.5">
                <div className="text-xs text-muted">{t("solverRootsInInterval")}</div>
                {fxRoots.roots.map((r, i) => (
                  <div key={i} className="font-mono">x = {formatResult(r, "auto")}</div>
                ))}
              </div>
            ) : (
              <span className="text-muted">{t("solverNoRoots")}</span>
            )}
          </div>
        )}
      </div>

      <GraphHint />
    </div>
  );
}

// ===========================================================================
// Tab 3 — Matrix
// ===========================================================================

type Grid = string[][];

function makeGrid(rows: number, cols: number, prev?: Grid): Grid {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => prev?.[r]?.[c] ?? "0")
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function asGrid(x: any): number[][] {
  if (typeof x === "number") return [[x]];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arr: any = Array.isArray(x) ? x : x?.toArray ? x.toArray() : x;
  if (!Array.isArray(arr)) return [[Number(arr)]];
  if (!Array.isArray(arr[0])) return arr.map((v: number) => [v]);
  return arr;
}

function MatrixTab() {
  const t = useTranslations("toolUI.sci-calc");
  const [ra, setRa] = useState(2);
  const [ca, setCa] = useState(2);
  const [rb, setRb] = useState(2);
  const [cb, setCb] = useState(2);
  const [A, setA] = useState<Grid>([["1", "2"], ["3", "4"]]);
  const [B, setB] = useState<Grid>([["5", "6"], ["7", "8"]]);
  const [k, setK] = useState("2");
  const [result, setResult] = useState<number[][] | null>(null);
  const [scalarResult, setScalarResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const num = (g: Grid): number[][] => g.map((row) => row.map((v) => Number(v) || 0));

  const resize = (which: "A" | "B", rows: number, cols: number) => {
    if (which === "A") {
      setRa(rows); setCa(cols); setA((p) => makeGrid(rows, cols, p));
    } else {
      setRb(rows); setCb(cols); setB((p) => makeGrid(rows, cols, p));
    }
  };

  const run = (op: string) => {
    setError("");
    setResult(null);
    setScalarResult(null);
    try {
      const a = num(A);
      const b = num(B);
      let out: number[][] | null = null;
      let scalar: string | null = null;
      switch (op) {
        case "A+B": out = asGrid(math.add(a, b)); break;
        case "A-B": out = asGrid(math.subtract(a, b)); break;
        case "A*B": out = asGrid(math.multiply(a, b)); break;
        case "kA": out = asGrid(math.multiply(Number(k) || 0, a)); break;
        case "detA": scalar = formatResult(math.det(a), "auto"); break;
        case "detB": scalar = formatResult(math.det(b), "auto"); break;
        case "invA": out = asGrid(math.inv(a)); break;
        case "invB": out = asGrid(math.inv(b)); break;
        case "transA": out = asGrid(math.transpose(a)); break;
        case "transB": out = asGrid(math.transpose(b)); break;
        case "rrefA": out = rref(a); break;
        case "rrefB": out = rref(b); break;
        case "solve": {
          // Solve A x = b, where b is B's first column (must be n×1).
          if (b.length !== a.length || b[0].length !== 1) throw new Error("dim");
          out = asGrid(math.lusolve(a, b));
          break;
        }
      }
      if (out) setResult(out.map((row) => row.map((v) => (Math.abs(v) < 1e-12 ? 0 : v))));
      if (scalar !== null) setScalarResult(scalar);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setError(/singular|inv|det/i.test(msg) ? t("errSingular") : t("errDim"));
    }
  };

  const MatrixEditor = ({ which, grid, rows, cols }: { which: "A" | "B"; grid: Grid; rows: number; cols: number }) => (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium">{which === "A" ? t("matrixA") : t("matrixB")}</span>
        <select value={rows} onChange={(e) => resize(which, Number(e.target.value), cols)} className="px-1 py-0.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs">
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <span className="text-muted text-xs">×</span>
        <select value={cols} onChange={(e) => resize(which, rows, Number(e.target.value))} className="px-1 py-0.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs">
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 3rem))` }}>
        {grid.map((row, r) =>
          row.map((val, c) => (
            <input
              key={`${r}-${c}`}
              value={val}
              onChange={(e) => {
                const setter = which === "A" ? setA : setB;
                setter((p) => p.map((rr, ri) => rr.map((cc, ci) => (ri === r && ci === c ? e.target.value : cc))));
              }}
              className="w-full px-1 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-center text-sm font-mono"
            />
          ))
        )}
      </div>
    </div>
  );

  const ops: { op: string; label: string }[] = [
    { op: "A+B", label: "A+B" },
    { op: "A-B", label: "A−B" },
    { op: "A*B", label: "A×B" },
    { op: "kA", label: "k·A" },
    { op: "detA", label: "det(A)" },
    { op: "detB", label: "det(B)" },
    { op: "invA", label: "A⁻¹" },
    { op: "invB", label: "B⁻¹" },
    { op: "transA", label: "Aᵀ" },
    { op: "transB", label: "Bᵀ" },
    { op: "rrefA", label: "rref(A)" },
    { op: "rrefB", label: "rref(B)" },
    { op: "solve", label: t("solveAxb") },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-6">
        <MatrixEditor which="A" grid={A} rows={ra} cols={ca} />
        <MatrixEditor which="B" grid={B} rows={rb} cols={cb} />
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted text-xs">{t("scalarK")}</span>
        <input value={k} onChange={(e) => setK(e.target.value)} className="w-16 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-center" />
      </div>

      <div className="flex flex-wrap gap-1">
        {ops.map((o) => (
          <button key={o.op} onClick={() => run(o.op)} className="px-2.5 py-1.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-mono">
            {o.label}
          </button>
        ))}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {scalarResult !== null && (
        <div className="text-sm">
          <span className="text-xs text-muted">{t("opResult")}: </span>
          <span className="text-xl font-bold font-mono">{scalarResult}</span>
        </div>
      )}

      {result && (
        <div className="space-y-1">
          <div className="text-xs text-muted">{t("opResult")}</div>
          <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${result[0].length}, minmax(0, 4rem))` }}>
            {result.map((row, r) =>
              row.map((v, c) => (
                <div key={`${r}-${c}`} className="px-1 py-1 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-center text-sm font-mono">
                  {formatResult(v, "auto")}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Tab 4 — Statistics
// ===========================================================================

function StatTab() {
  const t = useTranslations("toolUI.sci-calc");
  const [oneVar, setOneVar] = useState("12, 15, 15, 18, 20, 21, 24");
  const [xList, setXList] = useState("1, 2, 3, 4, 5");
  const [yList, setYList] = useState("2.1, 3.9, 6.2, 7.8, 10.1");

  const stats = useMemo(() => stats1Var(parseNumberList(oneVar)), [oneVar]);
  const reg = useMemo(() => {
    const xs = parseNumberList(xList);
    const ys = parseNumberList(yList);
    if (xs.length !== ys.length || xs.length < 2) return { error: true as const };
    return { error: false as const, value: linReg(xs, ys) };
  }, [xList, yList]);

  const f = (v: number) => formatResult(v, "auto");

  const rows: { label: string; value: string }[] = stats
    ? [
        { label: "n", value: String(stats.n) },
        { label: t("statMean"), value: f(stats.mean) },
        { label: "Σx", value: f(stats.sum) },
        { label: "Σx²", value: f(stats.sum2) },
        { label: "Sx", value: f(stats.sampleStd) },
        { label: "σx", value: f(stats.popStd) },
        { label: t("statMin"), value: f(stats.min) },
        { label: "Q1", value: f(stats.q1) },
        { label: t("statMedian"), value: f(stats.median) },
        { label: "Q3", value: f(stats.q3) },
        { label: t("statMax"), value: f(stats.max) },
        { label: t("statRange"), value: f(stats.range) },
        { label: t("statMode"), value: stats.mode ? stats.mode.map(f).join(", ") : "—" },
      ]
    : [];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="font-medium text-sm">{t("statOneVar")}</div>
        <textarea
          value={oneVar}
          onChange={(e) => setOneVar(e.target.value)}
          rows={2}
          placeholder={t("statData")}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-sm"
        />
        {stats ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-sm">
            {rows.map((r) => (
              <div key={r.label} className="flex justify-between gap-2 px-2 py-1 rounded bg-gray-50 dark:bg-gray-800">
                <span className="text-muted text-xs">{r.label}</span>
                <span className="font-mono font-medium">{r.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted">{t("statNeedData")}</div>
        )}
      </div>

      <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="font-medium text-sm">{t("statTwoVar")}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted mb-1">{t("statXList")}</div>
            <textarea value={xList} onChange={(e) => setXList(e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-sm" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">{t("statYList")}</div>
            <textarea value={yList} onChange={(e) => setYList(e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-sm" />
          </div>
        </div>
        {reg.error ? (
          <div className="text-sm text-muted">{t("statNeedPairs")}</div>
        ) : reg.value ? (
          <div className="space-y-1 text-sm">
            <div className="font-mono text-base">
              y = {f(reg.value.slope)}x {reg.value.intercept >= 0 ? "+" : "−"} {f(Math.abs(reg.value.intercept))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { label: t("regSlope"), value: f(reg.value.slope) },
                { label: t("regIntercept"), value: f(reg.value.intercept) },
                { label: "r", value: f(reg.value.r) },
                { label: "r²", value: f(reg.value.r2) },
              ].map((r) => (
                <div key={r.label} className="flex justify-between gap-2 px-2 py-1 rounded bg-gray-50 dark:bg-gray-800">
                  <span className="text-muted text-xs">{r.label}</span>
                  <span className="font-mono font-medium">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted">{t("statNeedPairs")}</div>
        )}
      </div>

      <GraphHint />
    </div>
  );
}

// ===========================================================================

function GraphHint() {
  const t = useTranslations("toolUI.sci-calc");
  return (
    <div className="text-xs text-muted border-t border-gray-200 dark:border-gray-700 pt-2">
      📈 {t("graphHintPrefix")}{" "}
      <Link href="/tools/graph-calc" className="text-brand-600 hover:underline">
        {t("graphLink")}
      </Link>
      {t("graphHintSuffix")}
    </div>
  );
}
