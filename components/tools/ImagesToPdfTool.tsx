"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes } from "@/lib/pdf";

type Item = { id: string; file: File; src: string };
type PageSize = "auto" | "a4" | "letter";

const PAGE_DIMS: Record<Exclude<PageSize, "auto">, [number, number]> = {
  a4: [595, 842],
  letter: [612, 792],
};

export default function ImagesToPdfTool() {
  const t = useTranslations("toolUI.images-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("auto");
  const [margin, setMargin] = useState(20);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const addFiles = (list: FileList) => {
    const next: Item[] = [];
    for (const f of Array.from(list)) {
      if (f.type.startsWith("image/")) {
        next.push({
          id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
          file: f,
          src: URL.createObjectURL(f),
        });
      }
    }
    if (!next.length) setError(t("errorSelectImage"));
    else setError("");
    setItems((prev) => [...prev, ...next]);
  };

  const move = (id: string, dir: -1 | 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const remove = (id: string) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) URL.revokeObjectURL(found.src);
      return prev.filter((p) => p.id !== id);
    });
  };

  // Drawing an <img> to a canvas applies EXIF orientation, so this doubles as the
  // orientation-correcting path for JPEGs that pdf-lib would otherwise embed as-is.
  const reencode = (src: string, type: "image/png" | "image/jpeg"): Promise<Uint8Array> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const cx = c.getContext("2d")!;
        if (type === "image/jpeg") {
          cx.fillStyle = "#ffffff";
          cx.fillRect(0, 0, c.width, c.height);
        }
        cx.drawImage(img, 0, 0);
        c.toBlob(
          async (blob) => {
            if (!blob) return reject(new Error(t("errorPngConvert")));
            const ab = await blob.arrayBuffer();
            resolve(new Uint8Array(ab));
          },
          type,
          type === "image/jpeg" ? 0.92 : undefined
        );
      };
      img.onerror = () => reject(new Error(t("errorImageLoad")));
      img.src = src;
    });

  const jpegOrientation = async (f: File): Promise<number> => {
    try {
      const exifr = (await import("exifr")).default;
      return (await exifr.orientation(f)) ?? 1;
    } catch {
      return 1;
    }
  };

  const convert = async () => {
    if (items.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const doc = await PDFDocument.create();
      for (const it of items) {
        const ab = await it.file.arrayBuffer();
        const bytes = new Uint8Array(ab);
        const isPng = it.file.type === "image/png" || it.file.name.toLowerCase().endsWith(".png");
        let embedded;
        if (isPng) {
          embedded = await doc.embedPng(bytes);
        } else if (it.file.type === "image/jpeg" || /\.jpe?g$/i.test(it.file.name)) {
          // pdf-lib ignores EXIF Orientation, so re-encode only rotated/flipped
          // photos through the canvas (which applies it) and keep the rest lossless.
          const orientation = await jpegOrientation(it.file);
          embedded = await doc.embedJpg(orientation > 1 ? await reencode(it.src, "image/jpeg") : bytes);
        } else {
          const png = await reencode(it.src, "image/png");
          embedded = await doc.embedPng(png);
        }

        const w = embedded.width;
        const h = embedded.height;
        const targetDims = pageSize === "auto" ? [w, h] : PAGE_DIMS[pageSize];
        const page = doc.addPage(targetDims as [number, number]);
        // Clamp so an oversized margin can never make the usable area negative
        // (which would flip the image through a negative scale).
        const m = Math.min(margin, page.getWidth() * 0.45, page.getHeight() * 0.45);
        const usableW = page.getWidth() - m * 2;
        const usableH = page.getHeight() - m * 2;
        const scale = Math.min(usableW / w, usableH / h, 1);
        const drawW = w * scale;
        const drawH = h * scale;
        page.drawImage(embedded, {
          x: (page.getWidth() - drawW) / 2,
          y: (page.getHeight() - drawH) / 2,
          width: drawW,
          height: drawH,
        });
      }
      const out = await doc.save();
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), `images-${Date.now()}.pdf`);
    } catch (e) {
      setError(t("errorConvert") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="card">
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🖼️</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">JPG · PNG · WebP</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm text-muted">{t("count", { n: items.length })}</div>
        <button onClick={() => inputRef.current?.click()} className="text-sm text-brand-600 hover:underline">
          + {t("add")}
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

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-72 overflow-y-auto">
        {items.map((it, i) => (
          <div key={it.id} className="flex items-center gap-3 p-2.5">
            <div className="text-sm tabular-nums text-muted w-6 text-center">{i + 1}</div>
            <img src={it.src} alt="" className="w-10 h-10 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">{it.file.name}</div>
              <div className="text-xs text-muted">{fmtBytes(it.file.size)}</div>
            </div>
            <button onClick={() => move(it.id, -1)} disabled={i === 0} className="text-gray-500 hover:text-brand-600 disabled:opacity-30 px-1">▲</button>
            <button onClick={() => move(it.id, 1)} disabled={i === items.length - 1} className="text-gray-500 hover:text-brand-600 disabled:opacity-30 px-1">▼</button>
            <button onClick={() => remove(it.id)} className="text-gray-400 hover:text-red-600 text-lg leading-none px-1">×</button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{t("pageSize")}</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as PageSize)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900"
          >
            <option value="auto">{t("pageAuto")}</option>
            <option value="a4">A4 (595×842pt)</option>
            <option value="letter">Letter (612×792pt)</option>
          </select>
        </div>
        <div>
          <label className="label">{t("margin", { n: margin })}</label>
          <input type="range" min="0" max="80" value={margin} onChange={(e) => setMargin(parseInt(e.target.value))} className="w-full" />
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button onClick={convert} disabled={busy} className="btn btn-primary disabled:opacity-50">
        {busy ? t("converting") : t("convertButton", { n: items.length })}
      </button>
    </div>
  );
}
