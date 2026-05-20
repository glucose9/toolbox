"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

export default function ImageCompressTool() {
  const t = useTranslations("toolUI.image-compress");
  const [quality, setQuality] = useState(0.75);
  const [input, setInput] = useState<{ name: string; size: number; url: string; type: string } | null>(null);
  const [output, setOutput] = useState<{ url: string; size: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const process = (file: File, q: number) => {
    setBusy(true);
    const url = URL.createObjectURL(file);
    const inputType = file.type || "image/jpeg";
    setInput({ name: file.name, size: file.size, url, type: inputType });

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      if (inputType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      // PNG doesn't accept quality; downgrade to WebP for compression
      const outType = inputType === "image/png" ? "image/webp" : inputType;
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setBusy(false);
            return;
          }
          setOutput({ url: URL.createObjectURL(blob), size: blob.size });
          setBusy(false);
        },
        outType,
        q
      );
    };
    img.src = url;
  };

  const handleFile = (file: File) => process(file, quality);

  const reprocess = () => {
    if (input) fetch(input.url).then((r) => r.blob()).then((b) => process(new File([b], input.name, { type: input.type }), quality));
  };

  const download = () => {
    if (!output || !input) return;
    const baseName = input.name.replace(/\.[^.]+$/, "");
    const ext = (input.type === "image/png" ? "webp" : input.type.split("/")[1]) || "jpg";
    const a = document.createElement("a");
    a.href = output.url;
    a.download = `${baseName}-compressed.${ext}`;
    a.click();
  };

  const fmt = (n: number) =>
    n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;

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
          <div className="text-5xl mb-3">🗜️</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-gray-500">JPG · PNG · WebP</div>
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
              <div className="text-sm font-medium mb-2">{t("original")}: {fmt(input.size)}</div>
              <img src={input.url} className="max-w-full max-h-60 rounded border border-gray-200" alt={t("original")} />
            </div>
            <div>
              <div className="text-sm font-medium mb-2">
                {t("compressed")} {output && `: ${fmt(output.size)}`}
              </div>
              {busy ? (
                <div className="h-60 flex items-center justify-center text-gray-400">{t("compressing")}</div>
              ) : output ? (
                <>
                  <img src={output.url} className="max-w-full max-h-60 rounded border border-gray-200" alt={t("compressed")} />
                  <div className="mt-2 text-sm font-medium text-green-600">
                    {t("reduced", { percent: Math.round((1 - output.size / input.size) * 100) })}
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div>
            <label className="label">{t("qualityLabel", { percent: Math.round(quality * 100) })}</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              onMouseUp={reprocess}
              onTouchEnd={reprocess}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={download} disabled={!output} className="btn btn-primary disabled:opacity-50">
              {t("download")}
            </button>
            <button
              onClick={() => {
                setInput(null);
                setOutput(null);
              }}
              className="btn btn-secondary"
            >
              {t("otherFile")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
