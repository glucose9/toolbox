"use client";

import { useState } from "react";

type Layer = {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  alpha: number;
  inset: boolean;
};

function newLayer(): Layer {
  return {
    id: Math.random().toString(36).slice(2, 8),
    x: 0,
    y: 8,
    blur: 16,
    spread: 0,
    color: "#000000",
    alpha: 0.2,
    inset: false,
  };
}

function rgba(hex: string, a: number): string {
  const m = hex.match(/^#?([0-9a-f]{6})$/i);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 0xff}, ${(n >> 8) & 0xff}, ${n & 0xff}, ${a})`;
}

function toCss(layers: Layer[]): string {
  return layers
    .map((l) => `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${rgba(l.color, l.alpha)}`)
    .join(", ");
}

export default function CssShadowTool() {
  const [layers, setLayers] = useState<Layer[]>([newLayer()]);
  const [copied, setCopied] = useState(false);

  const update = (id: string, patch: Partial<Layer>) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const css = toCss(layers);
  const full = `box-shadow: ${css};`;

  const copy = async () => {
    await navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-center h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded">
        <div
          style={{ boxShadow: css }}
          className="w-32 h-32 bg-white dark:bg-gray-700 rounded-lg"
        />
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {layers.map((l, i) => (
          <div key={l.id} className="border border-gray-200 dark:border-gray-700 rounded p-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium">레이어 {i + 1}</div>
              <div className="flex gap-2">
                <label className="flex items-center gap-1 text-xs">
                  <input type="checkbox" checked={l.inset} onChange={(e) => update(l.id, { inset: e.target.checked })} />
                  inset
                </label>
                {layers.length > 1 && (
                  <button onClick={() => setLayers((p) => p.filter((x) => x.id !== l.id))} className="text-xs text-red-600 hover:underline">삭제</button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label>X ({l.x}px)<input type="range" min="-50" max="50" value={l.x} onChange={(e) => update(l.id, { x: +e.target.value })} className="w-full" /></label>
              <label>Y ({l.y}px)<input type="range" min="-50" max="50" value={l.y} onChange={(e) => update(l.id, { y: +e.target.value })} className="w-full" /></label>
              <label>블러 ({l.blur}px)<input type="range" min="0" max="100" value={l.blur} onChange={(e) => update(l.id, { blur: +e.target.value })} className="w-full" /></label>
              <label>확장 ({l.spread}px)<input type="range" min="-30" max="30" value={l.spread} onChange={(e) => update(l.id, { spread: +e.target.value })} className="w-full" /></label>
              <label>색상<input type="color" value={l.color} onChange={(e) => update(l.id, { color: e.target.value })} className="w-full h-8" /></label>
              <label>투명도 ({l.alpha.toFixed(2)})<input type="range" min="0" max="1" step="0.05" value={l.alpha} onChange={(e) => update(l.id, { alpha: +e.target.value })} className="w-full" /></label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setLayers((p) => [...p, newLayer()])} className="btn btn-secondary">+ 레이어 추가</button>
        <button onClick={copy} className="btn btn-primary">{copied ? "✓ CSS 복사됨" : "CSS 복사"}</button>
      </div>

      <pre className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
        {full}
      </pre>
    </div>
  );
}
