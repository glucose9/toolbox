"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Swatch = {
  hex: string;
  rgb: string;
  hsl: string;
};

function rgbToHex(r: number, g: number, b: number): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): string {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export default function ImageColorPickerTool() {
  const t = useTranslations("toolUI.image-color-picker");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [palette, setPalette] = useState<Swatch[]>([]);
  const [copiedHex, setCopiedHex] = useState<string>("");
  const [hover, setHover] = useState<{ x: number; y: number; hex: string; visible: boolean }>({
    x: 0,
    y: 0,
    hex: "#000000",
    visible: false,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!imgSrc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const img = new Image();
    imgRef.current = img;
    img.onload = () => {
      const maxW = 720;
      const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = imgSrc;
  }, [imgSrc]);

  const getPixel = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    const rect = canvas.getBoundingClientRect();
    // rect includes the 1px CSS border — measure against the content box only
    const bx = canvas.clientLeft;
    const by = canvas.clientTop;
    const cw = rect.width - bx * 2;
    const ch = rect.height - by * 2;
    if (cw <= 0 || ch <= 0) return null;
    const sx = canvas.width / cw;
    const sy = canvas.height / ch;
    const x = Math.floor((e.clientX - rect.left - bx) * sx);
    const y = Math.floor((e.clientY - rect.top - by) * sy);
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return null;
    const data = ctx.getImageData(x, y, 1, 1).data;
    return {
      r: data[0],
      g: data[1],
      b: data[2],
      cssX: e.clientX - rect.left,
      cssY: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const p = getPixel(e);
    if (!p) {
      setHover((h) => ({ ...h, visible: false }));
      return;
    }
    setHover({ x: p.cssX, y: p.cssY, hex: rgbToHex(p.r, p.g, p.b), visible: true });
  };

  const handleMouseLeave = () => setHover((h) => ({ ...h, visible: false }));

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const p = getPixel(e);
    if (!p) return;
    const swatch: Swatch = {
      hex: rgbToHex(p.r, p.g, p.b),
      rgb: `rgb(${p.r}, ${p.g}, ${p.b})`,
      hsl: rgbToHsl(p.r, p.g, p.b),
    };
    setPalette((prev) => [...prev, swatch]);
  };

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(""), 1500);
    } catch {
      // ignore
    }
  };

  const clearPalette = () => setPalette([]);

  return (
    <div className="card">
      <div className="space-y-4">
        <div>
          <label className="label">{t("uploadImage")}</label>
          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>

        {imgSrc && (
          <p className="text-sm text-muted">
            {t("hoverHint")} · {t("clickToCapture")}
          </p>
        )}

        <div className="relative inline-block">
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="max-w-full h-auto rounded border border-gray-200 dark:border-gray-700 cursor-crosshair"
          />
          {hover.visible && (
            <div
              className="pointer-events-none absolute flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow px-2 py-1 text-xs"
              style={{
                left: hover.x + 16,
                top: hover.y + 16,
                zIndex: 10,
              }}
            >
              <span
                className="inline-block w-5 h-5 rounded border border-gray-300"
                style={{ backgroundColor: hover.hex }}
              />
              <span className="font-mono">{hover.hex}</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label mb-0">{t("savedPalette")}</label>
            {palette.length > 0 && (
              <button onClick={clearPalette} className="btn btn-secondary text-xs">
                {t("clearPalette")}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {palette.map((s, i) => (
              <button
                key={i}
                onClick={() => copyHex(s.hex)}
                className="flex items-center gap-3 p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
                title={t("copy")}
              >
                <span
                  className="inline-block w-10 h-10 rounded border border-gray-300 shrink-0"
                  style={{ backgroundColor: s.hex }}
                />
                <div className="flex-1 min-w-0 text-xs font-mono">
                  <div className="font-semibold">
                    {s.hex} {copiedHex === s.hex && <span className="text-green-600 ml-1">{t("copied")}</span>}
                  </div>
                  <div className="text-muted truncate">{s.rgb}</div>
                  <div className="text-muted truncate">{s.hsl}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
