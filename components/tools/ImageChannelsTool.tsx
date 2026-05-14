"use client";
import { useEffect, useRef, useState } from "react";

export default function ImageChannelsTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const rRef = useRef<HTMLCanvasElement>(null);
  const gRef = useRef<HTMLCanvasElement>(null);
  const bRef = useRef<HTMLCanvasElement>(null);
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
    const draw = (ref: HTMLCanvasElement, channel: number) => {
      ref.width = img.naturalWidth;
      ref.height = img.naturalHeight;
      const ctx = ref.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, ref.width, ref.height);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = d.data[i + channel];
        d.data[i] = v; d.data[i + 1] = v; d.data[i + 2] = v;
      }
      ctx.putImageData(d, 0, 0);
    };
    if (rRef.current) draw(rRef.current, 0);
    if (gRef.current) draw(gRef.current, 1);
    if (bRef.current) draw(bRef.current, 2);
  }, [img]);

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">🎚️</div>
        <div className="font-medium mt-2">이미지 업로드</div>
        <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[{ ref: rRef, label: "빨강 R" }, { ref: gRef, label: "녹색 G" }, { ref: bRef, label: "파랑 B" }].map((x, i) => (
          <div key={i} className="text-center">
            <div className="text-xs text-muted mb-1">{x.label}</div>
            <canvas ref={x.ref} className="max-w-full border border-gray-200 dark:border-gray-700 rounded" />
          </div>
        ))}
      </div>
      <button onClick={() => { setFile(null); setImg(null); }} className="btn btn-secondary">다른 파일</button>
    </div>
  );
}
