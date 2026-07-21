"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.match(/^#?([0-9a-f]{6})$/i);
  if (!m) return [0, 0, 0];
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 0xff) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

export default function PdfWatermarkTool() {
  const t = useTranslations("toolUI.pdf-watermark");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [text, setText] = useState("CONFIDENTIAL");
  const [size, setSize] = useState(60);
  const [opacity, setOpacity] = useState(0.2);
  const [angle, setAngle] = useState(-30);
  const [color, setColor] = useState("#888888");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) {
      setError(t("errPdfOnly"));
      return;
    }
    setError("");
    setFile(f);
    const bytes = await readBytes(f);
    const src = await PDFDocument.load(bytes);
    setPageCount(src.getPageCount());
  };

  const apply = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const bytes = await readBytes(file);
      const doc = await PDFDocument.load(bytes);
      const [r, g, b] = hexToRgb(color);
      // Standard-14 fonts only encode WinAnsi, so Korean/CJK text would throw.
      // Rasterize such text on a canvas and embed it as a PNG instead (same
      // canvas→embedPng pattern the e-sign tool uses).
      const needsRaster = Array.from(text).some((c) => (c.codePointAt(0) ?? 0) > 0xff);
      // pdf-lib rotates around the draw anchor, not the content's centre, so the
      // anchor is offset by the rotated half-diagonal to keep the watermark centred.
      const theta = (angle * Math.PI) / 180;
      const cosT = Math.cos(theta), sinT = Math.sin(theta);
      if (needsRaster) {
        const SCALE = 4; // canvas px per PDF pt, for crisp glyphs
        const cv = document.createElement("canvas");
        const cx = cv.getContext("2d");
        if (!cx) throw new Error("canvas context unavailable");
        const fontCss = `700 ${size * SCALE}px 'Pretendard', 'Noto Sans KR', 'Malgun Gothic', system-ui, sans-serif`;
        cx.font = fontCss;
        const m = cx.measureText(text);
        const ascent = m.actualBoundingBoxAscent || size * SCALE * 0.8;
        const descent = m.actualBoundingBoxDescent || size * SCALE * 0.25;
        cv.width = Math.max(1, Math.ceil(m.width));
        cv.height = Math.max(1, Math.ceil(ascent + descent));
        cx.font = fontCss; // resizing the canvas resets context state
        cx.fillStyle = color;
        cx.fillText(text, 0, ascent);
        const img = await doc.embedPng(cv.toDataURL("image/png"));
        const imgW = cv.width / SCALE;
        const imgH = cv.height / SCALE;
        for (const page of doc.getPages()) {
          const { width, height } = page.getSize();
          page.drawImage(img, {
            x: width / 2 - (imgW / 2) * cosT + (imgH / 2) * sinT,
            y: height / 2 - (imgW / 2) * sinT - (imgH / 2) * cosT,
            width: imgW,
            height: imgH,
            opacity,
            rotate: degrees(angle),
          });
        }
      } else {
        const font = await doc.embedFont(StandardFonts.HelveticaBold);
        for (const page of doc.getPages()) {
          const { width, height } = page.getSize();
          const textWidth = font.widthOfTextAtSize(text, size);
          page.drawText(text, {
            x: width / 2 - (textWidth / 2) * cosT + (size / 2) * sinT,
            y: height / 2 - (textWidth / 2) * sinT - (size / 2) * cosT,
            size,
            font,
            color: rgb(r, g, b),
            opacity,
            rotate: degrees(angle),
          });
        }
      }
      const out = await doc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), `${baseName}_watermark.pdf`);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">💧</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">{fmtBytes(file.size)} · {t("pages", { count: pageCount })}</div>
        </div>
        <button onClick={() => { setFile(null); setPageCount(0); }} className="text-sm text-brand-600 hover:underline">{t("otherFile")}</button>
      </div>

      <div>
        <label className="label">{t("watermarkText")}</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <label>{t("size")} ({size}pt)<input type="range" min="20" max="150" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" /></label>
        <label>{t("opacity")} ({opacity.toFixed(2)})<input type="range" min="0.05" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="w-full" /></label>
        <label>{t("angle")} ({angle}°)<input type="range" min="-90" max="90" value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full" /></label>
        <label>{t("color")}<input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-8" /></label>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 text-center" style={{ height: 160, position: "relative", overflow: "hidden" }}>
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) rotate(${angle}deg)`, fontSize: size / 4, fontWeight: 700, color, opacity }}>
          {text || " "}
        </span>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={apply} disabled={busy} className="btn btn-primary disabled:opacity-50">
        {busy ? t("applying") : `💧 ${t("applyAndDownload")}`}
      </button>
    </div>
  );
}
