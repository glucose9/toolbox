"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Filters = {
  grayscale: number;
  sepia: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturate: number;
  hueRotate: number;
  invert: number;
};

const DEFAULTS: Filters = {
  grayscale: 0,
  sepia: 0,
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hueRotate: 0,
  invert: 0,
};

function toCss(f: Filters): string {
  return [
    `grayscale(${f.grayscale}%)`,
    `sepia(${f.sepia}%)`,
    `blur(${f.blur}px)`,
    `brightness(${f.brightness}%)`,
    `contrast(${f.contrast}%)`,
    `saturate(${f.saturate}%)`,
    `hue-rotate(${f.hueRotate}deg)`,
    `invert(${f.invert}%)`,
  ].join(" ");
}

export default function ImageFilterTool() {
  const t = useTranslations("toolUI.image-filter");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULTS);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError(t("errorOnlyImage"));
      return;
    }
    setError("");
    setFile(f);
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    setImgUrl(URL.createObjectURL(f));
    setFilters(DEFAULTS);
  };

  useEffect(() => {
    return () => {
      if (imgUrl) URL.revokeObjectURL(imgUrl);
    };
  }, [imgUrl]);

  const download = async () => {
    if (!file || !imgUrl) return;
    setBusy(true);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error(t("errorLoad")));
        i.src = imgUrl;
      });
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.filter = toCss(filters);
      ctx.drawImage(img, 0, 0);
      const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await new Promise<Blob>((resolve, reject) =>
        c.toBlob((b) => (b ? resolve(b) : reject(new Error(t("errorSave")))), mime, 0.92)
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.[^.]+$/, "") + "_filtered." + (mime === "image/png" ? "png" : "jpg");
      a.click();
      URL.revokeObjectURL(url);
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
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🎨</div>
          <div className="font-medium">{t("dropPrompt")}</div>
          <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm truncate font-medium">{file.name}</div>
        <div className="flex gap-2">
          <button onClick={() => setFilters(DEFAULTS)} className="text-sm text-brand-600 hover:underline">{t("reset")}</button>
          <button onClick={() => { setFile(null); setImgUrl(""); }} className="text-sm text-brand-600 hover:underline">{t("otherFile")}</button>
        </div>
      </div>

      <div className="bg-checker rounded p-3 flex items-center justify-center" style={{ minHeight: 250 }}>
        <img src={imgUrl} alt="" style={{ filter: toCss(filters), maxHeight: 400, maxWidth: "100%" }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {(
          [
            ["grayscale", t("grayscale"), 0, 100, "%"],
            ["sepia", t("sepia"), 0, 100, "%"],
            ["blur", t("blur"), 0, 20, "px"],
            ["brightness", t("brightness"), 0, 200, "%"],
            ["contrast", t("contrast"), 0, 200, "%"],
            ["saturate", t("saturate"), 0, 200, "%"],
            ["hueRotate", t("hueRotate"), 0, 360, "°"],
            ["invert", t("invert"), 0, 100, "%"],
          ] as [keyof Filters, string, number, number, string][]
        ).map(([key, label, min, max, unit]) => (
          <label key={key} className="text-xs">
            {label} ({filters[key]}{unit})
            <input
              type="range"
              min={min}
              max={max}
              value={filters[key]}
              onChange={(e) => setFilters((f) => ({ ...f, [key]: +e.target.value }))}
              className="w-full"
            />
          </label>
        ))}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button onClick={download} disabled={busy} className="btn btn-primary disabled:opacity-50">
        {busy ? t("processing") : t("downloadFiltered")}
      </button>
    </div>
  );
}
