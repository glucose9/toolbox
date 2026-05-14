"use client";

import { useEffect, useRef, useState } from "react";

type RGB = [number, number, number];

function extractPalette(data: Uint8ClampedArray, k: number): RGB[] {
  // Sample pixels (every 5th to speed up)
  const samples: RGB[] = [];
  for (let i = 0; i < data.length; i += 4 * 5) {
    const a = data[i + 3];
    if (a < 128) continue;
    samples.push([data[i], data[i + 1], data[i + 2]]);
  }
  if (samples.length === 0) return [];
  return medianCut(samples, k);
}

function medianCut(pixels: RGB[], k: number): RGB[] {
  let buckets: RGB[][] = [pixels];
  while (buckets.length < k) {
    let best = -1;
    let bestRange = 0;
    let bestChannel = 0;
    for (let i = 0; i < buckets.length; i++) {
      const b = buckets[i];
      if (b.length < 2) continue;
      for (let ch = 0; ch < 3; ch++) {
        let min = 255, max = 0;
        for (const p of b) {
          if (p[ch] < min) min = p[ch];
          if (p[ch] > max) max = p[ch];
        }
        const range = max - min;
        if (range > bestRange) {
          bestRange = range;
          best = i;
          bestChannel = ch;
        }
      }
    }
    if (best === -1) break;
    const b = buckets[best];
    b.sort((a, c) => a[bestChannel] - c[bestChannel]);
    const mid = Math.floor(b.length / 2);
    buckets[best] = b.slice(0, mid);
    buckets.push(b.slice(mid));
  }
  return buckets.map((b) => {
    let r = 0, g = 0, bl = 0;
    for (const p of b) {
      r += p[0];
      g += p[1];
      bl += p[2];
    }
    return [Math.round(r / b.length), Math.round(g / b.length), Math.round(bl / b.length)];
  });
}

function rgbToHex([r, g, b]: RGB): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

export default function ColorExtractTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [palette, setPalette] = useState<RGB[]>([]);
  const [count, setCount] = useState(8);
  const [copied, setCopied] = useState("");

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };

  useEffect(() => {
    if (!preview) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      const maxSize = 200;
      const scale = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight, 1);
      c.width = img.naturalWidth * scale;
      c.height = img.naturalHeight * scale;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      setPalette(extractPalette(data, count));
    };
    img.src = preview;
  }, [preview, count]);

  const copy = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(""), 1500);
  };

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🎨</div>
          <div className="font-medium">이미지를 드래그하거나 클릭</div>
          <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm truncate font-medium">{file.name}</div>
        <button onClick={() => { setFile(null); setPalette([]); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <img src={preview} alt="" className="max-w-full max-h-64 rounded border border-gray-200 dark:border-gray-700 mx-auto" />

      <div className="text-sm">
        <label>색상 개수 ({count})<input type="range" min="3" max="16" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full" /></label>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {palette.map((rgb, i) => {
          const hex = rgbToHex(rgb);
          return (
            <button
              key={`${hex}-${i}`}
              onClick={() => copy(hex)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="w-full aspect-square rounded border border-gray-200 dark:border-gray-700 group-hover:scale-110 transition-transform" style={{ background: hex }} />
              <span className="text-xs font-mono">{copied === hex ? "✓" : hex}</span>
            </button>
          );
        })}
      </div>
      <div className="text-xs text-muted text-center">클릭해서 HEX 코드 복사</div>
    </div>
  );
}
