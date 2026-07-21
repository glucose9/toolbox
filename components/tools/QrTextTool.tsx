"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import QRCode from "qrcode";

export default function QrTextTool() {
  const t = useTranslations("toolUI.qr-text");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [content, setContent] = useState("https://barokit.com");
  const [centerText, setCenterText] = useState("BAROKIT");
  const [size, setSize] = useState(400);
  const [textSize, setTextSize] = useState(28);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgPadding, setBgPadding] = useState(12);
  const [bold, setBold] = useState(true);
  const [shape, setShape] = useState<"rect" | "rounded" | "circle">("rounded");

  useEffect(() => {
    const c = canvasRef.current!;
    c.width = size;
    c.height = size;
    if (!content) return;
    QRCode.toCanvas(c, content, { width: size, errorCorrectionLevel: "H", margin: 2 }).then(() => {
      if (!centerText) return;
      const ctx = c.getContext("2d")!;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      // ECC H recovers ~30%: keep the covered area under 25% of the QR and the box
      // under 60% of the width so it cannot become a full-width band.
      const maxArea = size * size * 0.25;
      const maxW = size * 0.6;
      let fs = textSize;
      let pad = bgPadding;
      let boxW = 0;
      let boxH = 0;
      for (let i = 0; i < 6; i++) {
        ctx.font = `${bold ? "bold " : ""}${fs}px system-ui, "Pretendard", sans-serif`;
        boxW = ctx.measureText(centerText).width + pad * 2;
        boxH = fs + pad * 2;
        const covered = shape === "circle" ? Math.PI * (Math.max(boxW, boxH) / 2) ** 2 : boxW * boxH;
        const k = Math.min(covered > maxArea ? Math.sqrt(maxArea / covered) : 1, boxW > maxW ? maxW / boxW : 1);
        if (k >= 1 || fs <= 6) break;
        fs = Math.max(6, fs * k);
        pad = pad * k;
      }
      const cx = size / 2;
      const cy = size / 2;
      ctx.fillStyle = bgColor;
      if (shape === "circle") {
        const r = Math.max(boxW, boxH) / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === "rounded") {
        const r = Math.min(12, boxW / 2, boxH / 2);
        const x = cx - boxW / 2;
        const y = cy - boxH / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + boxW, y, x + boxW, y + boxH, r);
        ctx.arcTo(x + boxW, y + boxH, x, y + boxH, r);
        ctx.arcTo(x, y + boxH, x, y, r);
        ctx.arcTo(x, y, x + boxW, y, r);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);
      }
      ctx.fillStyle = textColor;
      ctx.fillText(centerText, cx, cy);
    });
  }, [content, centerText, size, textSize, textColor, bgColor, bgPadding, bold, shape]);

  const download = () => {
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `qr-text-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("qrContent")}</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
        />
      </div>
      <div>
        <label className="label">{t("centerText")}</label>
        <input
          type="text"
          value={centerText}
          onChange={(e) => setCenterText(e.target.value)}
          placeholder={t("centerTextPlaceholder")}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm items-end">
        <label>{t("qrSize", { size })}<input type="range" min="200" max="800" step="50" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" /></label>
        <label>{t("textSize", { textSize })}<input type="range" min="12" max="80" value={textSize} onChange={(e) => setTextSize(+e.target.value)} className="w-full" /></label>
        <label>{t("padding", { bgPadding })}<input type="range" min="2" max="40" value={bgPadding} onChange={(e) => setBgPadding(+e.target.value)} className="w-full" /></label>
        <label>{t("textColor")}<input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-8" /></label>
        <label>{t("bgColor")}<input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-8" /></label>
        <div>
          <label className="block mb-1">{t("bgShape")}</label>
          <select value={shape} onChange={(e) => setShape(e.target.value as "rect" | "rounded" | "circle")} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="rect">{t("shapeRect")}</option>
            <option value="rounded">{t("shapeRounded")}</option>
            <option value="circle">{t("shapeCircle")}</option>
          </select>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={bold} onChange={(e) => setBold(e.target.checked)} /> {t("bold")}
      </label>

      <div className="bg-checker rounded p-3 flex justify-center">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      <button onClick={download} disabled={!content} className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">{t("downloadPng")}</button>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
