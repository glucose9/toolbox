"use client";

import { useState } from "react";

type Stop = { id: string; color: string; pos: number };
type Mode = "linear" | "radial";

function defaultStop(p: number, c: string): Stop {
  return { id: Math.random().toString(36).slice(2, 8), color: c, pos: p };
}

export default function CssGradientTool() {
  const [mode, setMode] = useState<Mode>("linear");
  const [angle, setAngle] = useState(90);
  const [shape, setShape] = useState<"circle" | "ellipse">("circle");
  const [stops, setStops] = useState<Stop[]>([defaultStop(0, "#ff6b6b"), defaultStop(100, "#4ecdc4")]);
  const [copied, setCopied] = useState(false);

  const sorted = [...stops].sort((a, b) => a.pos - b.pos);
  const stopStr = sorted.map((s) => `${s.color} ${s.pos}%`).join(", ");
  const css =
    mode === "linear"
      ? `linear-gradient(${angle}deg, ${stopStr})`
      : `radial-gradient(${shape}, ${stopStr})`;

  const update = (id: string, patch: Partial<Stop>) => setStops((p) => p.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const remove = (id: string) => setStops((p) => p.filter((s) => s.id !== id));
  const add = () => {
    const pos = stops.length > 0 ? Math.min(100, stops[stops.length - 1].pos + 25) : 50;
    setStops((p) => [...p, defaultStop(pos, "#cccccc")]);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(`background: ${css};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div style={{ background: css }} className="h-48 rounded border border-gray-200 dark:border-gray-700" />

      <div className="flex flex-wrap gap-2 text-sm items-center">
        <button onClick={() => setMode("linear")} className={`btn ${mode === "linear" ? "btn-primary" : "btn-secondary"}`}>Linear</button>
        <button onClick={() => setMode("radial")} className={`btn ${mode === "radial" ? "btn-primary" : "btn-secondary"}`}>Radial</button>
        {mode === "linear" && (
          <label className="flex items-center gap-1">
            각도 ({angle}°)
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-32" />
          </label>
        )}
        {mode === "radial" && (
          <select value={shape} onChange={(e) => setShape(e.target.value as "circle" | "ellipse")} className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="circle">원형</option>
            <option value="ellipse">타원형</option>
          </select>
        )}
      </div>

      <div className="space-y-2">
        {stops.map((s) => (
          <div key={s.id} className="flex items-center gap-2 text-sm">
            <input type="color" value={s.color} onChange={(e) => update(s.id, { color: e.target.value })} className="w-10 h-9 p-0 border border-gray-200 dark:border-gray-700 rounded" />
            <input type="text" value={s.color} onChange={(e) => update(s.id, { color: e.target.value })} className="w-24 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
            <input type="range" min="0" max="100" value={s.pos} onChange={(e) => update(s.id, { pos: +e.target.value })} className="flex-1" />
            <span className="text-xs w-10 text-right">{s.pos}%</span>
            {stops.length > 2 && <button onClick={() => remove(s.id)} className="text-red-600 hover:underline text-xs">삭제</button>}
          </div>
        ))}
        <button onClick={add} className="text-sm text-brand-600 hover:underline">+ 색상 추가</button>
      </div>

      <pre className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">background: {css};</pre>
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "CSS 복사"}</button>
    </div>
  );
}
