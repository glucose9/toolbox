"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function MemeGeneratorTool() {
  const t = useTranslations("toolUI.meme-generator");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [topText, setTopText] = useState<string>("TOP TEXT");
  const [bottomText, setBottomText] = useState<string>("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState<number>(48);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [outlineColor, setOutlineColor] = useState<string>("#000000");
  const [outlineWidth, setOutlineWidth] = useState<number>(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!imgSrc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    imgRef.current = img;
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      drawMeme();
    };
    img.src = imgSrc;
  }, [imgSrc]);

  useEffect(() => {
    drawMeme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topText, bottomText, fontSize, textColor, outlineColor, outlineWidth]);

  const drawMeme = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    ctx.font = `bold ${fontSize}px Impact, "Arial Black", sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = textColor;
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = outlineWidth;
    ctx.lineJoin = "round";
    ctx.miterLimit = 2;

    const maxWidth = canvas.width * 0.92;
    const drawText = (text: string, y: number, baseline: CanvasTextBaseline) => {
      ctx.textBaseline = baseline;
      const lines = wrapText(ctx, text.toUpperCase(), maxWidth);
      const lineHeight = fontSize * 1.1;
      lines.forEach((line, i) => {
        const ly = baseline === "top" ? y + i * lineHeight : y - (lines.length - 1 - i) * lineHeight;
        if (outlineWidth > 0) ctx.strokeText(line, canvas.width / 2, ly);
        ctx.fillText(line, canvas.width / 2, ly);
      });
    };

    if (topText) drawText(topText, fontSize * 0.3, "top");
    if (bottomText) drawText(bottomText, canvas.height - fontSize * 0.3, "bottom");
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = "";
    for (const w of words) {
      const test = current ? current + " " + w : w;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = w;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines.length > 0 ? lines : [text];
  };

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `meme-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="card">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
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
          <div>
            <label className="label">{t("topText")}</label>
            <input
              className="input"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
          </div>
          <div>
            <label className="label">{t("bottomText")}</label>
            <input
              className="input"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              {t("fontSize")}: {fontSize}px
            </label>
            <input
              type="range"
              min={12}
              max={120}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="flex items-center gap-2">
              <span>{t("textColor")}</span>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border border-gray-300"
              />
            </label>
            <label className="flex items-center gap-2">
              <span>{t("outlineColor")}</span>
              <input
                type="color"
                value={outlineColor}
                onChange={(e) => setOutlineColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="label">
              {t("outlineWidth")}: {outlineWidth}px
            </label>
            <input
              type="range"
              min={0}
              max={20}
              value={outlineWidth}
              onChange={(e) => setOutlineWidth(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[260px]">
          {imgSrc ? (
            <>
              <canvas ref={canvasRef} className="max-w-full h-auto rounded" />
              <button onClick={downloadPng} className="btn btn-primary mt-4">
                {t("downloadPng")}
              </button>
            </>
          ) : (
            <div className="text-sm text-muted">{t("previewArea")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
