"use client";

import { useEffect, useRef, useState } from "react";

export default function ImageBorderTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [thickness, setThickness] = useState(20);
  const [color, setColor] = useState("#ffffff");
  const [radius, setRadius] = useState(0);
  const [shadow, setShadow] = useState(false);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = URL.createObjectURL(f);
  };

  useEffect(() => {
    if (!img) return;
    const c = canvasRef.current;
    if (!c) return;
    const pad = thickness;
    const sh = shadow ? 20 : 0;
    c.width = img.naturalWidth + pad * 2 + sh * 2;
    c.height = img.naturalHeight + pad * 2 + sh * 2;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    if (shadow) {
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = sh;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = sh / 2;
    }
    ctx.fillStyle = color;
    const x = sh;
    const y = sh;
    const w = c.width - sh * 2;
    const h = c.height - sh * 2;
    if (radius > 0) {
      const r = Math.min(radius, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(x, y, w, h);
    }
    ctx.restore();
    ctx.save();
    if (radius > 0) {
      const r = Math.max(0, Math.min(radius - pad / 2, (w - pad * 2) / 2, (h - pad * 2) / 2));
      ctx.beginPath();
      ctx.moveTo(x + pad + r, y + pad);
      ctx.arcTo(x + w - pad, y + pad, x + w - pad, y + h - pad, r);
      ctx.arcTo(x + w - pad, y + h - pad, x + pad, y + h - pad, r);
      ctx.arcTo(x + pad, y + h - pad, x + pad, y + pad, r);
      ctx.arcTo(x + pad, y + pad, x + w - pad, y + pad, r);
      ctx.closePath();
      ctx.clip();
    }
    ctx.drawImage(img, x + pad, y + pad);
    ctx.restore();
  }, [img, thickness, color, radius, shadow]);

  const download = () => {
    if (!file) return;
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = file.name.replace(/\.[^.]+$/, "") + "_border.png";
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
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
          <div className="text-5xl mb-3">🖼️</div>
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
        <button onClick={() => { setFile(null); setImg(null); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div className="bg-checker rounded p-3 overflow-auto text-center">
        <canvas ref={canvasRef} className="max-w-full inline-block" />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <label>두께 ({thickness}px)<input type="range" min="0" max="100" value={thickness} onChange={(e) => setThickness(+e.target.value)} className="w-full" /></label>
        <label>색상<input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-7" /></label>
        <label>둥근 모서리 ({radius}px)<input type="range" min="0" max="100" value={radius} onChange={(e) => setRadius(+e.target.value)} className="w-full" /></label>
        <label className="flex items-end gap-1 pb-1">
          <input type="checkbox" checked={shadow} onChange={(e) => setShadow(e.target.checked)} />
          그림자
        </label>
      </div>

      <button onClick={download} className="btn btn-primary">📥 PNG 다운로드</button>
    </div>
  );
}
