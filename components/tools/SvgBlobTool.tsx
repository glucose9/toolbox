"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

// Mulberry32 seedable PRNG
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SIZE = 500;
const CENTER = SIZE / 2;
const BASE_R = 180;
// Outermost jittered vertex must stay inside the viewBox, with room for the
// bezier control points to bulge past it.
const MAX_R = CENTER - 30;

function buildBlobPath(points: number, randomness: number, seed: number): string {
  const rand = mulberry32(seed);
  const baseR = Math.min(BASE_R, MAX_R / (1 + randomness));
  const ring: { x: number; y: number }[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const jitter = 1 - randomness + rand() * randomness * 2;
    const r = baseR * jitter;
    ring.push({
      x: CENTER + Math.cos(angle) * r,
      y: CENTER + Math.sin(angle) * r,
    });
  }

  // Build smooth closed cubic-bezier path using catmull-rom -> bezier conversion
  const n = ring.length;
  if (n < 3) return "";
  const tension = 0.5;
  let d = `M ${ring[0].x.toFixed(2)} ${ring[0].y.toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = ring[(i - 1 + n) % n];
    const p1 = ring[i];
    const p2 = ring[(i + 1) % n];
    const p3 = ring[(i + 2) % n];
    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension * 2;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension * 2;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension * 2;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension * 2;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  d += " Z";
  return d;
}

export default function SvgBlobTool() {
  const t = useTranslations("toolUI.svg-blob");
  const [points, setPoints] = useState<number>(6);
  const [randomness, setRandomness] = useState<number>(0.2);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 100000));
  const [useGradient, setUseGradient] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#6366f1");
  const [color2, setColor2] = useState<string>("#ec4899");
  const [copied, setCopied] = useState<boolean>(false);

  const path = useMemo(() => buildBlobPath(points, randomness, seed), [points, randomness, seed]);

  const fillRef = useGradient ? "url(#blobGrad)" : color;

  const svgText = useMemo(() => {
    const gradDef = useGradient
      ? `<defs><linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs>`
      : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">${gradDef}<path d="${path}" fill="${fillRef}"/></svg>`;
  }, [path, useGradient, color, color2, fillRef]);

  const regenerate = () => setSeed(Math.floor(Math.random() * 100000));

  const copySvg = async () => {
    await navigator.clipboard.writeText(svgText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadPng = async () => {
    const blob = new Blob([svgText], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
      img.src = url;
    });
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = SIZE * scale;
    canvas.height = SIZE * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      URL.revokeObjectURL(url);
      return;
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    const pngUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = `blob-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="card">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className="label">
              {t("complexity")}: {points}
            </label>
            <input
              type="range"
              min={3}
              max={12}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="label">
              {t("randomness")}: {randomness.toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={0.5}
              step={0.01}
              value={randomness}
              onChange={(e) => setRandomness(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useGradient}
              onChange={(e) => setUseGradient(e.target.checked)}
            />
            <span>{t("colorGradient")}</span>
          </label>

          {!useGradient ? (
            <div className="flex items-center gap-2 text-sm">
              <span>{t("color")}</span>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-9 h-9 rounded cursor-pointer border border-gray-300"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="flex items-center gap-2">
                <span>{t("gradientStart")}</span>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-gray-300"
                />
              </label>
              <label className="flex items-center gap-2">
                <span>{t("gradientEnd")}</span>
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-gray-300"
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <button onClick={regenerate} className="btn btn-primary">
              {t("generate")}
            </button>
            <button onClick={copySvg} className="btn btn-secondary">
              {copied ? t("copied") : t("copySvg")}
            </button>
            <button onClick={downloadPng} className="btn btn-secondary">
              {t("downloadPng")}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[320px]">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="w-full max-w-[400px] h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {useGradient && (
              <defs>
                <linearGradient id="blobGradPreview" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor={color2} />
                </linearGradient>
              </defs>
            )}
            <path d={path} fill={useGradient ? "url(#blobGradPreview)" : color} />
          </svg>
        </div>
      </div>
    </div>
  );
}
