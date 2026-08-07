"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";

type MediaItem = { name: string; url: string; blob: Blob };

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",
  svg: "image/svg+xml",
  tiff: "image/tiff",
  emf: "image/emf",
  wmf: "image/wmf",
};

function isImage(name: string): boolean {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return ext in MIME;
}

export default function PptxImagesTool() {
  const t = useTranslations("toolUI.pptx-images");
  const tc = useTranslations("common");
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFile = async (file: File) => {
    setError("");
    setLoading(true);
    setFileName(file.name);
    images.forEach((i) => URL.revokeObjectURL(i.url));
    setImages([]);
    try {
      const zip = await JSZip.loadAsync(file);
      const mediaPaths = Object.keys(zip.files).filter(
        (p) => /^ppt\/media\//.test(p) && isImage(p)
      );
      const items: MediaItem[] = [];
      for (const path of mediaPaths) {
        const ext = path.split(".").pop()?.toLowerCase() || "png";
        const blob = await zip.files[path].async("blob");
        const typed = new Blob([blob], { type: MIME[ext] || "application/octet-stream" });
        items.push({
          name: path.replace("ppt/media/", ""),
          url: URL.createObjectURL(typed),
          blob: typed,
        });
      }
      setImages(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const resetFile = () => {
    images.forEach((i) => URL.revokeObjectURL(i.url));
    setImages([]);
    setFileName("");
    setError("");
  };

  const downloadOne = (item: MediaItem) => {
    const a = document.createElement("a");
    a.href = item.url;
    a.download = item.name;
    a.click();
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    for (const item of images) {
      zip.file(item.name, item.blob);
    }
    const out = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(out);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.pptx$/i, "") + "-images.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card space-y-4">
      {images.length === 0 ? (
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🖼️</div>
          <div className="font-medium">{t("dropFile")}</div>
          {fileName && <div className="mt-1 text-sm text-muted truncate">{fileName}</div>}
          <input
            ref={inputRef}
            type="file"
            accept=".pptx"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-sm font-medium truncate min-w-0">{fileName}</div>
          <button onClick={resetFile} className="text-sm text-brand-600 hover:underline">
            {tc("other")}
          </button>
        </div>
      )}

      {loading && <div className="text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && fileName && images.length === 0 && !error && (
        <div className="text-sm text-muted">{t("noImages")}</div>
      )}

      {images.length > 0 && (
        <>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm text-muted">{t("found", { count: images.length })}</div>
            <button onClick={downloadAll} className="btn btn-primary">
              {t("downloadAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((item) => (
              <div
                key={item.name}
                className="border border-gray-200 dark:border-gray-700 rounded p-2 flex flex-col gap-2"
              >
                <div className="aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded overflow-hidden">
                  <img src={item.url} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="text-xs text-muted truncate" title={item.name}>
                  {item.name}
                </div>
                <button onClick={() => downloadOne(item)} className="btn btn-secondary text-xs py-1">
                  {t("download")}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
