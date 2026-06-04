// Pure math helpers for the scientific-calculator suite (graphing-calculator class).
// All evaluation goes through a single configured mathjs instance so that the
// angle mode (deg/rad/grad) can be honored by the trig functions.

import { create, all, type MathJsInstance } from "mathjs";

export const math: MathJsInstance = create(all, {});

// Mutable angle factor read by the overridden trig functions.
// rad -> 1, deg -> PI/180, grad -> PI/200.
export type AngleMode = "deg" | "rad" | "grad";
const angleState = { factor: 1 };

export function setAngleMode(mode: AngleMode): void {
  angleState.factor =
    mode === "deg" ? Math.PI / 180 : mode === "grad" ? Math.PI / 200 : 1;
}

// Override trig so the calculator respects the active angle mode. Hyperbolic
// functions, matrices and stats keep mathjs' native (radian) behavior.
math.import(
  {
    sin: (x: number) => Math.sin(x * angleState.factor),
    cos: (x: number) => Math.cos(x * angleState.factor),
    tan: (x: number) => Math.tan(x * angleState.factor),
    asin: (x: number) => Math.asin(x) / angleState.factor,
    acos: (x: number) => Math.acos(x) / angleState.factor,
    atan: (x: number) => Math.atan(x) / angleState.factor,
    // Convenience aliases commonly typed by users.
    ncr: (n: number, r: number) => (math.combinations as (a: number, b: number) => number)(n, r),
    npr: (n: number, r: number) => (math.permutations as (a: number, b: number) => number)(n, r),
  },
  { override: true }
);

// ---------------------------------------------------------------------------
// Number formatting
// ---------------------------------------------------------------------------

export type Notation = "auto" | "sci" | "eng" | "fix";

export function formatResult(
  value: number,
  notation: Notation = "auto",
  fixDigits = 4
): string {
  if (!isFinite(value)) return value > 0 ? "∞" : value < 0 ? "-∞" : "NaN";
  if (value === 0) return "0";
  try {
    if (notation === "sci") {
      return math.format(value, { notation: "exponential", precision: fixDigits + 1 });
    }
    if (notation === "eng") {
      return math.format(value, { notation: "engineering", precision: fixDigits + 1 });
    }
    if (notation === "fix") {
      return value.toFixed(fixDigits);
    }
    // auto: clean FP noise, fall back to exponential for extreme magnitudes.
    const abs = Math.abs(value);
    if (abs >= 1e12 || abs < 1e-9) {
      return math.format(value, { notation: "exponential", precision: 7 });
    }
    return math.format(value, { notation: "auto", precision: 12 });
  } catch {
    return String(value);
  }
}

// Return "a/b" (or "-a/b") when value is a clean rational; null otherwise.
export function toFraction(value: number): string | null {
  if (!isFinite(value)) return null;
  if (Number.isInteger(value)) return null; // nothing to gain
  try {
    // fraction.js (mathjs) stores n/d as bigint and s as the sign; normalize.
    const f = math.fraction(value) as unknown as {
      n: bigint | number;
      d: bigint | number;
      s: bigint | number;
    };
    const n = Number(f.n);
    const d = Number(f.d);
    const s = Number(f.s);
    if (!isFinite(d) || d <= 1 || d > 100000) return null;
    return `${s < 0 ? "-" : ""}${n}/${d}`;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Complex helpers (used by polyRoots)
// ---------------------------------------------------------------------------

type Cx = { re: number; im: number };
const cAdd = (a: Cx, b: Cx): Cx => ({ re: a.re + b.re, im: a.im + b.im });
const cSub = (a: Cx, b: Cx): Cx => ({ re: a.re - b.re, im: a.im - b.im });
const cMul = (a: Cx, b: Cx): Cx => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
const cDiv = (a: Cx, b: Cx): Cx => {
  const d = b.re * b.re + b.im * b.im;
  return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d };
};
const cAbs = (a: Cx): number => Math.hypot(a.re, a.im);

export type Root = { re: number; im: number };

// Find all roots of a polynomial. coeffs are highest-degree first:
// [aN, ..., a1, a0]. Uses closed forms for degree 1-2 and the
// Durand-Kerner (Weierstrass) iteration for higher degrees — robust for
// real and complex roots without relying on mathjs eigs.
export function polyRoots(coeffsIn: number[]): Root[] {
  // Trim leading zeros.
  let coeffs = [...coeffsIn];
  while (coeffs.length > 1 && Math.abs(coeffs[0]) < 1e-14) coeffs.shift();
  const n = coeffs.length - 1;
  if (n <= 0) return [];

  if (n === 1) {
    return [{ re: -coeffs[1] / coeffs[0], im: 0 }];
  }
  if (n === 2) {
    const [a, b, c] = coeffs;
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const s = Math.sqrt(disc);
      return [
        { re: (-b + s) / (2 * a), im: 0 },
        { re: (-b - s) / (2 * a), im: 0 },
      ];
    }
    const s = Math.sqrt(-disc);
    return [
      { re: -b / (2 * a), im: s / (2 * a) },
      { re: -b / (2 * a), im: -s / (2 * a) },
    ];
  }

  // Monic coefficients for Durand-Kerner.
  const monic = coeffs.map((c) => c / coeffs[0]);
  const evalAt = (z: Cx): Cx => {
    // Horner with complex arithmetic.
    let acc: Cx = { re: monic[0], im: 0 };
    for (let i = 1; i < monic.length; i++) {
      acc = cAdd(cMul(acc, z), { re: monic[i], im: 0 });
    }
    return acc;
  };

  // Initial guesses on a spiral.
  let roots: Cx[] = [];
  const seed: Cx = { re: 0.4, im: 0.9 };
  let p: Cx = { re: 1, im: 0 };
  for (let k = 0; k < n; k++) {
    p = cMul(p, seed);
    roots.push({ ...p });
  }

  for (let iter = 0; iter < 200; iter++) {
    let maxDelta = 0;
    const next: Cx[] = roots.map((ri, i) => {
      let denom: Cx = { re: 1, im: 0 };
      for (let j = 0; j < n; j++) {
        if (j === i) continue;
        denom = cMul(denom, cSub(ri, roots[j]));
      }
      const delta = cDiv(evalAt(ri), denom);
      maxDelta = Math.max(maxDelta, cAbs(delta));
      return cSub(ri, delta);
    });
    roots = next;
    if (maxDelta < 1e-12) break;
  }

  return roots
    .map((r) => ({ re: r.re, im: Math.abs(r.im) < 1e-9 ? 0 : r.im }))
    .map((r) => ({ re: Math.abs(r.re) < 1e-12 ? 0 : r.re, im: r.im }))
    .sort((a, b) => (a.im === 0 && b.im === 0 ? a.re - b.re : a.im - b.im));
}

export function formatRoot(r: Root): string {
  const re = formatResult(r.re, "auto");
  if (r.im === 0) return re;
  const im = formatResult(Math.abs(r.im), "auto");
  return `${re} ${r.im < 0 ? "−" : "+"} ${im}i`;
}

// ---------------------------------------------------------------------------
// f(x) = 0 numeric solver over [a, b]
// ---------------------------------------------------------------------------

export function solveFx(
  expr: string,
  a: number,
  b: number,
  mode: AngleMode = "rad"
): { roots: number[]; error?: string } {
  setAngleMode(mode);
  let f: (x: number) => number;
  try {
    const code = math.parse(expr).compile();
    f = (x: number): number => {
      const v = code.evaluate({ x });
      return typeof v === "number" ? v : NaN;
    };
  } catch (e) {
    return { roots: [], error: e instanceof Error ? e.message : "parse error" };
  }

  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const N = 2000;
  const dx = (hi - lo) / N;
  const roots: number[] = [];
  let prevX = lo;
  let prevY = f(lo);
  const pushRoot = (r: number) => {
    if (!isFinite(r)) return;
    if (roots.some((x) => Math.abs(x - r) < (hi - lo) * 1e-6 + 1e-9)) return;
    roots.push(r);
  };
  if (Math.abs(prevY) < 1e-12) pushRoot(prevX);

  for (let i = 1; i <= N; i++) {
    const x = lo + i * dx;
    const y = f(x);
    if (isFinite(prevY) && isFinite(y) && prevY * y < 0) {
      // bisection refine
      let l = prevX;
      let r = x;
      let fl = prevY;
      for (let k = 0; k < 80; k++) {
        const m = (l + r) / 2;
        const fm = f(m);
        if (Math.abs(fm) < 1e-13 || (r - l) / 2 < 1e-12) {
          l = r = m;
          break;
        }
        if (fl * fm < 0) r = m;
        else {
          l = m;
          fl = fm;
        }
      }
      pushRoot((l + r) / 2);
    } else if (isFinite(y) && Math.abs(y) < 1e-12) {
      pushRoot(x);
    }
    prevX = x;
    prevY = y;
  }
  return { roots: roots.sort((p, q) => p - q) };
}

// ---------------------------------------------------------------------------
// Matrix RREF (Gauss-Jordan) — mathjs has no rref()
// ---------------------------------------------------------------------------

export function rref(input: number[][]): number[][] {
  const m = input.map((row) => [...row]);
  const rows = m.length;
  if (rows === 0) return m;
  const cols = m[0].length;
  let lead = 0;
  for (let r = 0; r < rows; r++) {
    if (lead >= cols) break;
    let i = r;
    while (Math.abs(m[i][lead]) < 1e-12) {
      i++;
      if (i === rows) {
        i = r;
        lead++;
        if (lead === cols) return m;
      }
    }
    [m[i], m[r]] = [m[r], m[i]];
    const lv = m[r][lead];
    for (let j = 0; j < cols; j++) m[r][j] /= lv;
    for (let k = 0; k < rows; k++) {
      if (k === r) continue;
      const f = m[k][lead];
      for (let j = 0; j < cols; j++) m[k][j] -= f * m[r][j];
    }
    lead++;
  }
  // Clean negative zeros / FP noise.
  return m.map((row) => row.map((v) => (Math.abs(v) < 1e-12 ? 0 : v)));
}

// ---------------------------------------------------------------------------
// Statistics
// ---------------------------------------------------------------------------

export type Stats1 = {
  n: number;
  sum: number;
  sum2: number;
  mean: number;
  sampleStd: number; // Sx (n-1)
  popStd: number; // σx (n)
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  range: number;
  mode: number[] | null;
};

export function stats1Var(nums: number[]): Stats1 | null {
  const data = nums.filter((x) => isFinite(x));
  const n = data.length;
  if (n === 0) return null;
  const sum = data.reduce((a, b) => a + b, 0);
  const sum2 = data.reduce((a, b) => a + b * b, 0);
  const mean = sum / n;
  const sampleStd =
    n > 1 ? Math.sqrt(data.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1)) : 0;
  const popStd = Math.sqrt(data.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  const q = (p: number): number =>
    (math.quantileSeq as (a: number[], p: number) => number)(data, p);
  // Mode: most frequent value(s); null if every value is unique.
  const freq = new Map<number, number>();
  for (const x of data) freq.set(x, (freq.get(x) || 0) + 1);
  const maxFreq = Math.max(...freq.values());
  const mode =
    maxFreq <= 1 ? null : [...freq.entries()].filter(([, c]) => c === maxFreq).map(([v]) => v);

  const sorted = [...data].sort((a, b) => a - b);
  return {
    n,
    sum,
    sum2,
    mean,
    sampleStd,
    popStd,
    min: sorted[0],
    q1: q(0.25),
    median: q(0.5),
    q3: q(0.75),
    max: sorted[n - 1],
    range: sorted[n - 1] - sorted[0],
    mode,
  };
}

export type LinReg = {
  slope: number;
  intercept: number;
  r: number;
  r2: number;
  n: number;
};

export function linReg(xs: number[], ys: number[]): LinReg | null {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return null;
  let sx = 0,
    sy = 0,
    sxy = 0,
    sx2 = 0,
    sy2 = 0;
  for (let i = 0; i < n; i++) {
    sx += xs[i];
    sy += ys[i];
    sxy += xs[i] * ys[i];
    sx2 += xs[i] * xs[i];
    sy2 += ys[i] * ys[i];
  }
  const denom = n * sx2 - sx * sx;
  if (Math.abs(denom) < 1e-15) return null;
  const slope = (n * sxy - sx * sy) / denom;
  const intercept = (sy - slope * sx) / n;
  const rDen = Math.sqrt(denom * (n * sy2 - sy * sy));
  const r = Math.abs(rDen) < 1e-15 ? 0 : (n * sxy - sx * sy) / rDen;
  return { slope, intercept, r, r2: r * r, n };
}

// Parse a free-form list of numbers (comma / whitespace / newline separated).
export function parseNumberList(text: string): number[] {
  return text
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => Number(s))
    .filter((x) => isFinite(x));
}
