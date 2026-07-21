"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const PRESETS = [
  { label: "16:9", w: 16, h: 9 },
  { label: "9:16", w: 9, h: 16 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "3:2", w: 3, h: 2 },
  { label: "21:9", w: 21, h: 9 },
];

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export default function AspectRatioTool() {
  const t = useTranslations("toolUI.aspect-ratio-calculator");
  const [rw, setRw] = useState(16);
  const [rh, setRh] = useState(9);
  const [width, setWidth] = useState<string>("1920");
  const [height, setHeight] = useState<string>("1080");
  const [last, setLast] = useState<"w" | "h">("w");

  const applyRatio = (w: number, h: number) => {
    setRw(w);
    setRh(h);
    if (!w || !h) return;
    // recompute based on last edited
    if (last === "w" && width) {
      setHeight(Math.round((parseFloat(width) * h) / w).toString());
    } else if (height) {
      setWidth(Math.round((parseFloat(height) * w) / h).toString());
    }
  };

  const onWidth = (v: string) => {
    setWidth(v);
    setLast("w");
    if (v && rw) setHeight(Math.round((parseFloat(v) * rh) / rw).toString());
  };

  const onHeight = (v: string) => {
    setHeight(v);
    setLast("h");
    if (v && rh) setWidth(Math.round((parseFloat(v) * rw) / rh).toString());
  };

  // Reverse ratio from current dimensions
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const g = w && h ? gcd(w, h) : 1;
  const derivedRatio = w && h ? `${Math.round(w / g)}:${Math.round(h / g)}` : "—";

  return (
    <div className="card space-y-4">
      <div>
        <label className="label">{t("ratio")}</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyRatio(p.w, p.h)}
              className={`px-3 py-1.5 rounded text-sm ${rw === p.w && rh === p.h ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input type="number" value={rw} onChange={(e) => applyRatio(parseFloat(e.target.value) || 0, rh)} className="input w-20" />
          <span className="text-lg">:</span>
          <input type="number" value={rh} onChange={(e) => applyRatio(rw, parseFloat(e.target.value) || 0)} className="input w-20" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{t("width")}</label>
          <input type="number" value={width} onChange={(e) => onWidth(e.target.value)} className="input" />
        </div>
        <div>
          <label className="label">{t("height")}</label>
          <input type="number" value={height} onChange={(e) => onHeight(e.target.value)} className="input" />
        </div>
      </div>

      <div className="text-sm bg-gray-50 dark:bg-gray-900 rounded p-3 flex items-center justify-between">
        <span className="text-muted">{t("derivedRatio")}</span>
        <strong className="text-base">{derivedRatio}</strong>
      </div>
    </div>
  );
}
