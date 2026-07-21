"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";

const MIME: Record<string, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

const EXT: Record<string, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

type FileItem = {
  id: string;
  name: string;
  size: number;
  src: string;
  status: "pending" | "processing" | "done" | "error";
  outBlob?: Blob;
  outUrl?: string;
  error?: string;
};

function fmt(n: number) {
  return n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function convertOne(file: { src: string }, to: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      if (to === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("conversion failed"))),
        MIME[to],
        to === "png" ? undefined : quality
      );
    };
    img.onerror = () => reject(new Error("image load failed"));
    img.src = file.src;
  });
}

export default function ImageConvertTool({ config }: { config: Record<string, unknown> }) {
  const t = useTranslations("toolUI.image-convert");
  const to = (config.to as string) || "jpeg";
  const defaultQuality = (config.defaultQuality as number) || 0.92;

  const [quality, setQuality] = useState(defaultQuality);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList) => {
    const items: FileItem[] = Array.from(list).map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
      name: f.name,
      size: f.size,
      src: URL.createObjectURL(f),
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...items]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.src);
      if (f.outUrl) URL.revokeObjectURL(f.outUrl);
    });
    setFiles([]);
  };

  const processAll = async (force = false) => {
    setBusy(true);
    if (force) {
      files.forEach((f) => {
        if (f.outUrl) URL.revokeObjectURL(f.outUrl);
      });
      setFiles((prev) => prev.map((f) => ({ ...f, status: "pending", outBlob: undefined, outUrl: undefined })));
    }
    for (const file of files) {
      if (file.status === "done" && !force) continue;
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: "processing" } : f))
      );
      try {
        const blob = await convertOne(file, to, quality);
        const outUrl = URL.createObjectURL(blob);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "done", outBlob: blob, outUrl } : f
          )
        );
      } catch (e) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "error", error: (e as Error).message } : f
          )
        );
      }
    }
    setBusy(false);
  };

  const downloadOne = (f: FileItem) => {
    if (!f.outUrl) return;
    const baseName = f.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = f.outUrl;
    a.download = `${baseName}.${EXT[to]}`;
    a.click();
  };

  const downloadAllZip = async () => {
    const done = files.filter((f) => f.status === "done" && f.outBlob);
    if (done.length === 0) return;
    const zip = new JSZip();
    done.forEach((f) => {
      const baseName = f.name.replace(/\.[^.]+$/, "");
      zip.file(`${baseName}.${EXT[to]}`, f.outBlob!);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-${EXT[to]}-${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const doneCount = files.filter((f) => f.status === "done").length;
  const totalIn = files.reduce((s, f) => s + f.size, 0);
  const totalOut = files.reduce((s, f) => s + (f.outBlob?.size || 0), 0);

  return (
    <div className="card">
      {files.length === 0 ? (
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">📁</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">JPG · PNG · WebP · GIF · BMP</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm text-muted">
              {t("filesCount", { n: files.length, size: fmt(totalIn) })}
              {doneCount > 0 && ` ${t("doneSuffix", { n: doneCount, size: fmt(totalOut) })}`}
            </div>
            <button onClick={() => inputRef.current?.click()} className="text-sm text-brand-600 hover:underline">
              {t("addFiles")}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && addFiles(e.target.files)}
              className="hidden"
            />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
            {files.map((f) => (
              <div key={f.id} className="flex items-center gap-3 p-2.5">
                <img src={f.src} alt="" className="w-12 h-12 object-cover rounded border border-gray-200 dark:border-gray-700" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{f.name}</div>
                  <div className="text-xs text-muted">
                    {fmt(f.size)}
                    {f.outBlob && ` → ${fmt(f.outBlob.size)} (${t("savedPercent", { pct: Math.round((1 - f.outBlob.size / f.size) * 100) })})`}
                  </div>
                </div>
                <div className="text-xs whitespace-nowrap">
                  {f.status === "pending" && <span className="text-muted">{t("pending")}</span>}
                  {f.status === "processing" && <span className="text-brand-600">{t("converting")}</span>}
                  {f.status === "done" && (
                    <button onClick={() => downloadOne(f)} className="text-green-600 hover:underline">
                      {t("download")}
                    </button>
                  )}
                  {f.status === "error" && <span className="text-red-600">{t("failed")}</span>}
                </div>
                <button
                  onClick={() => removeFile(f.id)}
                  className="text-gray-400 hover:text-red-600 text-lg leading-none px-1"
                  aria-label={t("remove")}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {to !== "png" && (
            <div>
              <label className="label">{t("quality", { pct: Math.round(quality * 100) })}</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button onClick={() => processAll(doneCount === files.length)} disabled={busy} className="btn btn-primary disabled:opacity-50">
              {busy ? t("convertingShort") : doneCount === files.length ? t("convertAgain") : t("convertButton", { fmt: EXT[to].toUpperCase(), n: files.length })}
            </button>
            {doneCount > 1 && (
              <button onClick={downloadAllZip} className="btn btn-secondary">
                {t("downloadZip", { n: doneCount })}
              </button>
            )}
            <button onClick={clearAll} className="btn btn-secondary">
              {t("clearAll")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
