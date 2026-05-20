"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";

const SIZES = [16, 32, 48, 64, 128, 256];

function buildIco(pngs: { size: number; bytes: Uint8Array }[]): Uint8Array {
  const headerSize = 6 + 16 * pngs.length;
  let totalSize = headerSize;
  for (const p of pngs) totalSize += p.bytes.length;
  const out = new Uint8Array(totalSize);
  const dv = new DataView(out.buffer);
  dv.setUint16(0, 0, true); // reserved
  dv.setUint16(2, 1, true); // type 1 = ICO
  dv.setUint16(4, pngs.length, true); // count
  let offset = headerSize;
  for (let i = 0; i < pngs.length; i++) {
    const { size, bytes } = pngs[i];
    const entry = 6 + i * 16;
    out[entry] = size === 256 ? 0 : size; // width
    out[entry + 1] = size === 256 ? 0 : size; // height
    out[entry + 2] = 0; // colors
    out[entry + 3] = 0; // reserved
    dv.setUint16(entry + 4, 1, true); // planes
    dv.setUint16(entry + 6, 32, true); // bits per pixel
    dv.setUint32(entry + 8, bytes.length, true); // size
    dv.setUint32(entry + 12, offset, true); // offset
    out.set(bytes, offset);
    offset += bytes.length;
  }
  return out;
}

export default function FaviconTool() {
  const t = useTranslations("toolUI.favicon-generator");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<{ size: number; url: string; blob: Blob }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const generate = async (f: File) => {
    setError("");
    setBusy(true);
    setFile(f);
    setPreviews([]);
    try {
      const img = await loadImage(f, t("errImageLoad"));
      const results: { size: number; url: string; blob: Blob }[] = [];
      for (const size of SIZES) {
        const c = document.createElement("canvas");
        c.width = size;
        c.height = size;
        const ctx = c.getContext("2d")!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        // letterbox onto square
        const ratio = Math.min(size / img.naturalWidth, size / img.naturalHeight);
        const w = img.naturalWidth * ratio;
        const h = img.naturalHeight * ratio;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
        const blob = await new Promise<Blob>((resolve, reject) =>
          c.toBlob((b) => (b ? resolve(b) : reject(new Error(t("errPngFailed")))), "image/png")
        );
        results.push({ size, url: URL.createObjectURL(blob), blob });
      }
      setPreviews(results);
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
    generate(f);
  };

  const downloadZip = async () => {
    if (previews.length === 0) return;
    const zip = new JSZip();
    for (const p of previews) {
      const ab = await p.blob.arrayBuffer();
      zip.file(`favicon-${p.size}.png`, ab);
    }
    const pngs = await Promise.all(
      previews.map(async (p) => ({ size: p.size, bytes: new Uint8Array(await p.blob.arrayBuffer()) }))
    );
    const ico = buildIco(pngs.filter((p) => p.size <= 256));
    zip.file("favicon.ico", ico);
    zip.file(
      "README.txt",
      t("readmeContent")
    );
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicons.zip";
    a.click();
    URL.revokeObjectURL(url);
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
          <div className="text-5xl mb-3">🌐</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">{t("hint")}</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm truncate font-medium">{file.name}</div>
        <button onClick={() => { setFile(null); setPreviews([]); }} className="text-sm text-brand-600 hover:underline">{t("otherFile")}</button>
      </div>

      {busy && <div className="text-sm text-muted">{t("generating")}</div>}

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {previews.map((p) => (
          <div key={p.size} className="text-center">
            <div className="bg-checker p-2 rounded border border-gray-200 dark:border-gray-700 inline-flex items-center justify-center" style={{ width: 84, height: 84 }}>
              <img src={p.url} alt="" style={{ width: Math.min(p.size, 80), height: Math.min(p.size, 80) }} />
            </div>
            <div className="text-xs text-muted mt-1">{p.size}×{p.size}</div>
          </div>
        ))}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button onClick={downloadZip} disabled={previews.length === 0} className="btn btn-primary disabled:opacity-50">
        📦 {t("downloadZip")}
      </button>
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
