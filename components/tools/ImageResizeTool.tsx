"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

export default function ImageResizeTool() {
  const t = useTranslations("toolUI.image-resize");
  const [input, setInput] = useState<{ name: string; url: string; type: string; w: number; h: number } | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setInput({ name: file.name, url, type: file.type, w: img.naturalWidth, h: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setOutput(null);
    };
    img.src = url;
  };

  const updateWidth = (w: number) => {
    setWidth(w);
    if (keepRatio && input) {
      setHeight(Math.max(1, Math.round((w * input.h) / input.w)));
    }
  };
  const updateHeight = (h: number) => {
    setHeight(h);
    if (keepRatio && input) {
      setWidth(Math.max(1, Math.round((h * input.w) / input.h)));
    }
  };

  const resize = () => {
    if (!input) return;
    if (!(width >= 1) || !(height >= 1)) {
      setError(t("errInvalidSize"));
      return;
    }
    setError("");
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      const type = input.type || "image/png";
      canvas.toBlob((blob) => {
        if (blob) setOutput(URL.createObjectURL(blob));
      }, type, 0.92);
    };
    img.src = input.url;
  };

  const download = () => {
    if (!output || !input) return;
    const baseName = input.name.replace(/\.[^.]+$/, "");
    const ext = input.type.split("/")[1] || "png";
    const a = document.createElement("a");
    a.href = output;
    a.download = `${baseName}-${width}x${height}.${ext}`;
    a.click();
  };

  return (
    <div className="card">
      {!input ? (
        <div
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors"
        >
          <div className="text-5xl mb-3">📐</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium mb-2">
                {t("original")}: {input.w} × {input.h} px
              </div>
              <img src={input.url} className="max-w-full max-h-60 rounded border border-gray-200" alt={t("original")} />
            </div>
            <div>
              <div className="text-sm font-medium mb-2">{t("preview")}</div>
              {output ? (
                <img src={output} className="max-w-full max-h-60 rounded border border-gray-200" alt={t("result")} />
              ) : (
                <div className="h-60 flex items-center justify-center text-gray-400 text-sm">
                  {t("emptyPreview")}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">{t("widthPx")}</label>
              <input
                className="input"
                type="number"
                value={width}
                onChange={(e) => updateWidth(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="label">{t("heightPx")}</label>
              <input
                className="input"
                type="number"
                value={height}
                onChange={(e) => updateHeight(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} />
            {t("keepRatio")}
          </label>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex gap-2">
            <button onClick={resize} className="btn btn-primary">{t("apply")}</button>
            <button onClick={download} disabled={!output} className="btn btn-secondary disabled:opacity-50">
              {t("download")}
            </button>
            <button onClick={() => setInput(null)} className="btn btn-secondary">{t("otherFile")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
