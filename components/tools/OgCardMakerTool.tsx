"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Preset = { key: string; bg: string; fg: string; gradient?: [string, string] };

const PRESETS: Preset[] = [
  { key: "default", bg: "#1e293b", fg: "#ffffff", gradient: ["#1e293b", "#0f172a"] },
  { key: "blue", bg: "#2563eb", fg: "#ffffff", gradient: ["#3b82f6", "#1e40af"] },
  { key: "green", bg: "#16a34a", fg: "#ffffff", gradient: ["#22c55e", "#15803d"] },
  { key: "orange", bg: "#ea580c", fg: "#ffffff", gradient: ["#fb923c", "#c2410c"] },
  { key: "purple", bg: "#9333ea", fg: "#ffffff", gradient: ["#a855f7", "#6b21a8"] },
  { key: "pink", bg: "#db2777", fg: "#ffffff", gradient: ["#ec4899", "#9d174d"] },
  { key: "dark", bg: "#000000", fg: "#fbbf24", gradient: ["#000000", "#1f2937"] },
  { key: "light", bg: "#f3f4f6", fg: "#111827" },
];

export default function OgCardMakerTool() {
  const t = useTranslations("toolUI.og-card");
  const SIZES = [
    { key: "og", name: t("sizeOg"), w: 1200, h: 630 },
    { key: "igSquare", name: t("sizeIgSquare"), w: 1080, h: 1080 },
    { key: "igPortrait", name: t("sizeIgPortrait"), w: 1080, h: 1350 },
    { key: "story", name: t("sizeStory"), w: 1080, h: 1920 },
    { key: "yt", name: t("sizeYtThumb"), w: 1280, h: 720 },
  ];

  const [title, setTitle] = useState("Hello World");
  const [subtitle, setSubtitle] = useState("바로킷에서 만든 OG 카드");
  const [tag, setTag] = useState("BAROKIT");
  const [preset, setPreset] = useState(0);
  const [size, setSize] = useState(0);
  const [useGradient, setUseGradient] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const s = SIZES[size];
    c.width = s.w;
    c.height = s.h;
    const p = PRESETS[preset];
    const ctx = c.getContext("2d")!;

    if (useGradient && p.gradient) {
      const grad = ctx.createLinearGradient(0, 0, s.w, s.h);
      grad.addColorStop(0, p.gradient[0]);
      grad.addColorStop(1, p.gradient[1]);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = p.bg;
    }
    ctx.fillRect(0, 0, s.w, s.h);

    if (tag) {
      ctx.fillStyle = p.fg;
      ctx.globalAlpha = 0.7;
      ctx.font = `bold ${Math.round(s.w * 0.025)}px system-ui, "Pretendard", -apple-system, sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(tag, s.w * 0.08, s.h * 0.1);
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = p.fg;
    const titleSize = Math.round(s.w * 0.07);
    ctx.font = `bold ${titleSize}px system-ui, "Pretendard", -apple-system, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const titleX = s.w * 0.08;
    const titleY = s.h * 0.45;
    const maxWidth = s.w * 0.84;
    const lines = wrapText(ctx, title, maxWidth);
    const lineH = titleSize * 1.2;
    lines.forEach((line, i) => {
      ctx.fillText(line, titleX, titleY + i * lineH - ((lines.length - 1) * lineH) / 2);
    });

    if (subtitle) {
      ctx.fillStyle = p.fg;
      ctx.globalAlpha = 0.75;
      const subSize = Math.round(s.w * 0.028);
      ctx.font = `${subSize}px system-ui, "Pretendard", -apple-system, sans-serif`;
      ctx.textBaseline = "bottom";
      const subY = s.h * 0.88;
      const subLines = wrapText(ctx, subtitle, maxWidth);
      subLines.forEach((line, i) => {
        ctx.fillText(line, titleX, subY + (i - subLines.length + 1) * subSize * 1.3);
      });
      ctx.globalAlpha = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, subtitle, tag, preset, size, useGradient]);

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `og-card-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label className="sm:col-span-2">
          {t("titleLabel")}
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label className="sm:col-span-2">
          {t("subtitleLabel")}
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>
          {t("tagLabel")}
          <input value={tag} onChange={(e) => setTag(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>
          {t("sizeLabel")}
          <select value={size} onChange={(e) => setSize(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            {SIZES.map((s, i) => (
              <option key={i} value={i}>{s.name}</option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          {t("colorPreset")}
          <div className="flex flex-wrap gap-1 mt-1">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => setPreset(i)}
                className={`w-10 h-10 rounded border-2 ${preset === i ? "border-blue-500" : "border-transparent"}`}
                style={{
                  background: p.gradient ? `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` : p.bg,
                }}
                title={t(`preset.${p.key}`)}
              />
            ))}
          </div>
        </label>
        <label className="flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" checked={useGradient} onChange={(e) => setUseGradient(e.target.checked)} />
          {t("useGradient")}
        </label>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded overflow-hidden bg-checker">
        <canvas ref={canvasRef} className="max-w-full block mx-auto" />
      </div>

      <div className="flex gap-2">
        <button onClick={download} className="btn btn-primary">{t("downloadPng")}</button>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split(/\n/);
  for (const para of paragraphs) {
    if (!para) {
      lines.push("");
      continue;
    }
    const words = para.split(/(\s+)/);
    let current = "";
    for (const w of words) {
      const test = current + w;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current.trimEnd());
        current = w.trimStart();
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
  }
  return lines.length ? lines : [""];
}
