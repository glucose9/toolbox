"use client";
import { useEffect, useRef, useState } from "react";

export default function ImageFreeRotateTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [angle, setAngle] = useState(45);
  const [bg, setBg] = useState("#ffffff");
  const [transparent, setTransparent] = useState(false);

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
    const rad = (angle * Math.PI) / 180;
    const w = img.naturalWidth, h = img.naturalHeight;
    const newW = Math.abs(w * Math.cos(rad)) + Math.abs(h * Math.sin(rad));
    const newH = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
    c.width = Math.ceil(newW); c.height = Math.ceil(newH);
    const ctx = c.getContext("2d")!;
    if (!transparent) { ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height); }
    ctx.translate(newW / 2, newH / 2);
    ctx.rotate(rad);
    ctx.drawImage(img, -w / 2, -h / 2);
  }, [img, angle, bg, transparent]);

  const download = () => {
    if (!file) return;
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = file.name.replace(/\.[^.]+$/, "") + "_rot.png"; a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">↻</div>
        <div className="font-medium mt-2">이미지 업로드</div>
        <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <label className="text-sm">각도 ({angle}°)<input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full" /></label>
      <div className="flex items-center gap-3 text-sm">
        <label className="flex items-center gap-1"><input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} /> 투명 배경</label>
        {!transparent && <label>여백색<input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="ml-1 h-7 w-12" /></label>}
      </div>
      <div className="bg-checker rounded p-2"><canvas ref={canvasRef} className="max-w-full mx-auto" /></div>
      <button onClick={download} className="btn btn-primary">📥 다운로드</button>
    </div>
  );
}
