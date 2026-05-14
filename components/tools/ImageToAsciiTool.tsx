"use client";

import { useEffect, useRef, useState } from "react";

const CHARSETS: Record<string, string> = {
  detailed: "@%#*+=-:. ",
  blocks: "█▓▒░ ",
  simple: "#+. ",
  numbers: "9876543210 ",
};

function imageToAscii(img: HTMLImageElement, width: number, charset: string, invert: boolean): string {
  const aspect = img.naturalHeight / img.naturalWidth;
  // Characters are taller than wide; compensate with ~0.5 factor
  const height = Math.max(1, Math.round(width * aspect * 0.5));
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;
  const chars = invert ? charset : charset.split("").reverse().join("");
  let out = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const idx = Math.floor((lum / 255) * (chars.length - 1));
      out += chars[idx];
    }
    out += "\n";
  }
  return out;
}

export default function ImageToAsciiTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [width, setWidth] = useState(100);
  const [charset, setCharset] = useState<keyof typeof CHARSETS>("detailed");
  const [invert, setInvert] = useState(false);
  const [ascii, setAscii] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = URL.createObjectURL(f);
  };

  useEffect(() => {
    if (!img) return;
    setAscii(imageToAscii(img, width, CHARSETS[charset], invert));
  }, [img, width, charset, invert]);

  const copy = async () => {
    await navigator.clipboard.writeText(ascii);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadTxt = () => {
    if (!file) return;
    const blob = new Blob([ascii], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name.replace(/\.[^.]+$/, "") + "_ascii.txt";
    a.click();
    URL.revokeObjectURL(a.href);
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
          <div className="text-5xl mb-3">👾</div>
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
        <button onClick={() => { setFile(null); setImg(null); setAscii(""); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <label>너비 ({width})<input type="range" min="40" max="240" value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full" /></label>
        <label>
          문자셋
          <select value={charset} onChange={(e) => setCharset(e.target.value as keyof typeof CHARSETS)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mt-1">
            <option value="detailed">자세히 (10단계)</option>
            <option value="blocks">블록</option>
            <option value="simple">간단</option>
            <option value="numbers">숫자</option>
          </select>
        </label>
        <label className="flex items-center gap-1 pt-5">
          <input type="checkbox" checked={invert} onChange={(e) => setInvert(e.target.checked)} />
          반전
        </label>
      </div>

      <pre className="w-full max-h-96 overflow-auto p-3 border border-gray-200 dark:border-gray-700 rounded bg-black text-white text-[8px] leading-[8px] font-mono whitespace-pre">
        {ascii}
      </pre>

      <div className="flex gap-2">
        <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "전체 복사"}</button>
        <button onClick={downloadTxt} className="btn btn-secondary">.txt 다운로드</button>
      </div>
    </div>
  );
}
