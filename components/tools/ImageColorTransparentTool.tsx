"use client";
import { useEffect, useRef, useState } from "react";

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.match(/^#?([0-9a-f]{6})$/i);
  if (!m) return [255, 255, 255];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

export default function ImageColorTransparentTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [color, setColor] = useState("#ffffff");
  const [tolerance, setTolerance] = useState(30);

  const handleFile = (f: File) => {
    setFile(f);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = URL.createObjectURL(f);
  };

  useEffect(() => {
    if (!img) return;
    const c = canvasRef.current!;
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height);
    const [tr, tg, tb] = hexToRgb(color);
    for (let i = 0; i < d.data.length; i += 4) {
      const dr = d.data[i] - tr, dg = d.data[i + 1] - tg, db = d.data[i + 2] - tb;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);
      if (dist <= tolerance) d.data[i + 3] = 0;
    }
    ctx.putImageData(d, 0, 0);
  }, [img, color, tolerance]);

  const download = () => {
    if (!file) return;
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = file.name.replace(/\.[^.]+$/, "") + "_transparent.png"; a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">🟦</div>
        <div className="font-medium mt-2">이미지 업로드</div>
        <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label>투명으로 만들 색<input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-9 mt-1" /></label>
        <label>허용 범위 ({tolerance})<input type="range" min="0" max="200" value={tolerance} onChange={(e) => setTolerance(+e.target.value)} className="w-full" /></label>
      </div>
      <div className="bg-checker rounded p-2"><canvas ref={canvasRef} className="max-w-full mx-auto" /></div>
      <button onClick={download} className="btn btn-primary">📥 PNG 다운로드</button>
    </div>
  );
}
