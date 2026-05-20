"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageExifStripTool() {
  const t = useTranslations("toolUI.image-exif-strip");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const [outUrl, setOutUrl] = useState("");
  const [quality, setQuality] = useState(0.92);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const process = async (f: File, q: number) => {
    setBusy(true);
    setError("");
    try {
      const img = await loadImage(f, t("errImageLoad"));
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d")!.drawImage(img, 0, 0);
      const mime = f.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await new Promise<Blob>((resolve, reject) =>
        c.toBlob((b) => (b ? resolve(b) : reject(new Error(t("errReencode")))), mime, mime === "image/jpeg" ? q : undefined)
      );
      setOutBlob(blob);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError(t("errImageOnly"));
      return;
    }
    setFile(f);
    process(f, quality);
  };

  const download = () => {
    if (!outBlob || !file) return;
    const ext = (file.type === "image/png" ? "png" : "jpg");
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = file.name.replace(/\.[^.]+$/, "") + `_no-exif.${ext}`;
    a.click();
  };

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🕵️</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">{t("hint")}</div>
          <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
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
          <div className="text-xs text-muted">
            {fmt(file.size)}
            {outBlob && ` → ${fmt(outBlob.size)} (${t("exifRemoved")})`}
          </div>
        </div>
        <button onClick={() => { setFile(null); setOutBlob(null); setOutUrl(""); }} className="text-sm text-brand-600 hover:underline">{t("otherFile")}</button>
      </div>

      {file.type !== "image/png" && (
        <div>
          <label className="label">{t("jpgQuality")} ({Math.round(quality * 100)}%)</label>
          <input
            type="range"
            min="0.4"
            max="1"
            step="0.05"
            value={quality}
            onChange={(e) => {
              const q = parseFloat(e.target.value);
              setQuality(q);
              process(file, q);
            }}
            className="w-full"
          />
        </div>
      )}

      {outUrl && <img src={outUrl} alt="" className="max-w-full max-h-96 rounded border border-gray-200 dark:border-gray-700" />}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {busy && <div className="text-sm text-muted">{t("processing")}</div>}

      <button onClick={download} disabled={!outBlob} className="btn btn-primary disabled:opacity-50">📥 {t("download")}</button>
    </div>
  );
}

function loadImage(f: File, errMsg: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(errMsg));
    };
    img.src = url;
  });
}
