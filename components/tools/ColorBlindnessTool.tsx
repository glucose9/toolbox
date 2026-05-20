"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type CbType = "protanopia" | "deuteranopia" | "tritanopia" | "protanomaly" | "deuteranomaly" | "achromatopsia";

// Color transform matrices (Brettel/Viénot-based approximations), row-major 3x3 applied to linear-ish sRGB.
const MATRICES: Record<CbType, number[]> = {
  protanopia:    [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia:  [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia:    [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
  protanomaly:   [0.817, 0.183, 0, 0.333, 0.667, 0, 0, 0.125, 0.875],
  deuteranomaly: [0.8, 0.2, 0, 0.258, 0.742, 0, 0, 0.142, 0.858],
  achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
};

const TYPES: CbType[] = ["protanopia", "deuteranopia", "tritanopia", "protanomaly", "deuteranomaly", "achromatopsia"];

export default function ColorBlindnessTool() {
  const t = useTranslations("toolUI.color-blindness-simulator");
  const [src, setSrc] = useState<string>("");
  const [type, setType] = useState<CbType>("deuteranopia");
  const inputRef = useRef<HTMLInputElement>(null);
  const origRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<HTMLCanvasElement>(null);

  const onFile = (f: File) => {
    const url = URL.createObjectURL(f);
    setSrc(url);
  };

  useEffect(() => {
    if (!src || !origRef.current || !simRef.current) return;
    const img = new Image();
    img.onload = () => {
      const maxW = 500;
      const scale = Math.min(1, maxW / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      for (const c of [origRef.current!, simRef.current!]) {
        c.width = w;
        c.height = h;
      }
      const octx = origRef.current!.getContext("2d")!;
      octx.drawImage(img, 0, 0, w, h);
      const sctx = simRef.current!.getContext("2d", { willReadFrequently: true })!;
      sctx.drawImage(img, 0, 0, w, h);
      const imgData = sctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      const m = MATRICES[type];
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        d[i] = Math.min(255, m[0] * r + m[1] * g + m[2] * b);
        d[i + 1] = Math.min(255, m[3] * r + m[4] * g + m[5] * b);
        d[i + 2] = Math.min(255, m[6] * r + m[7] * g + m[8] * b);
      }
      sctx.putImageData(imgData, 0, 0);
    };
    img.src = src;
  }, [src, type]);

  return (
    <div className="card space-y-4">
      <div
        onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-brand-500 transition-colors"
      >
        <div className="text-4xl mb-2">👁️</div>
        <div className="font-medium">{t("uploadImage")}</div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      </div>

      {src && (
        <>
          <div>
            <label className="label">{t("type")}</label>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((ty) => (
                <button
                  key={ty}
                  onClick={() => setType(ty)}
                  className={`px-3 py-1.5 rounded text-sm ${type === ty ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  {t(`types.${ty}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">{t("original")}</div>
              <canvas ref={origRef} className="max-w-full rounded border border-gray-200 dark:border-gray-700" />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">{t("simulated")}: {t(`types.${type}`)}</div>
              <canvas ref={simRef} className="max-w-full rounded border border-gray-200 dark:border-gray-700" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
