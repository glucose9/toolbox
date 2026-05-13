"use client";

import { useState } from "react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace(/^#/, "").match(/^([0-9a-f]{6}|[0-9a-f]{3})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const h = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex gap-2">
        <input className="input font-mono" readOnly value={value} />
        <button
          onClick={() => {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="btn btn-secondary text-sm whitespace-nowrap"
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
    </div>
  );
}

export default function ColorTool() {
  const [hex, setHex] = useState("#3b82f6");
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  return (
    <div className="card">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="label">색상 선택</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : "#000000"}
                onChange={(e) => setHex(e.target.value)}
                className="w-14 h-10 rounded cursor-pointer"
              />
              <input
                className="input font-mono"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="#3b82f6"
              />
            </div>
          </div>

          {rgb && hsl ? (
            <>
              <CopyField label="HEX" value={rgbToHex(rgb.r, rgb.g, rgb.b)} />
              <CopyField label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
              <CopyField label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
            </>
          ) : (
            <div className="text-sm text-red-600">올바른 HEX 색상 코드를 입력하세요 (예: #3b82f6)</div>
          )}
        </div>

        <div className="flex flex-col">
          <div
            className="flex-1 min-h-[200px] rounded-lg border border-gray-200"
            style={{ background: rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : "transparent" }}
          />
          {rgb && (
            <div className="mt-3 text-sm text-gray-600 text-center font-mono">
              {rgbToHex(rgb.r, rgb.g, rgb.b).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
