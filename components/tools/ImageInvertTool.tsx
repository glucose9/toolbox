"use client";
import { useEffect, useRef, useState } from "react";

export default function ImageInvertTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
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
    for (let i = 0; i < d.data.length; i += 4) {
      d.data[i] = 255 - d.data[i];
      d.data[i + 1] = 255 - d.data[i + 1];
      d.data[i + 2] = 255 - d.data[i + 2];
    }
    ctx.putImageData(d, 0, 0);
  }, [img]);

  const download = () => {
    if (!file) return;
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = file.name.replace(/\.[^.]+$/, "") + "_invert.png"; a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">◐</div>
        <div className="font-medium mt-2">이미지 업로드</div>
        <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <canvas ref={canvasRef} className="max-w-full mx-auto border border-gray-200 dark:border-gray-700 rounded" />
      <div className="flex gap-2">
        <button onClick={download} className="btn btn-primary">📥 다운로드</button>
        <button onClick={() => { setFile(null); setImg(null); }} className="btn btn-secondary">다른 파일</button>
      </div>
    </div>
  );
}
