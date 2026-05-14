"use client";

import { useEffect, useRef, useState } from "react";

type Ratio = "free" | "1:1" | "4:3" | "16:9" | "3:4" | "9:16";

const RATIOS: Record<Ratio, number | null> = {
  free: null,
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "3:4": 3 / 4,
  "9:16": 9 / 16,
};

type Sel = { x: number; y: number; w: number; h: number };

export default function ImageCropTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [src, setSrc] = useState("");
  const [ratio, setRatio] = useState<Ratio>("free");
  const [sel, setSel] = useState<Sel | null>(null);
  const [drag, setDrag] = useState<{ startX: number; startY: number } | null>(null);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    setSel(null);
    const url = URL.createObjectURL(f);
    setSrc(url);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = url;
  };

  const containerSize = () => {
    const el = previewRef.current;
    if (!el || !img) return { w: 1, h: 1, scale: 1 };
    const rect = el.getBoundingClientRect();
    const scale = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight, 1);
    return { w: img.naturalWidth * scale, h: img.naturalHeight * scale, scale };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const cs = containerSize();
    const offsetX = (rect.width - cs.w) / 2;
    const offsetY = (rect.height - cs.h) / 2;
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;
    if (x < 0 || y < 0 || x > cs.w || y > cs.h) return;
    setDrag({ startX: x, startY: y });
    setSel({ x, y, w: 0, h: 0 });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const cs = containerSize();
    const offsetX = (rect.width - cs.w) / 2;
    const offsetY = (rect.height - cs.h) / 2;
    const x = Math.max(0, Math.min(cs.w, e.clientX - rect.left - offsetX));
    const y = Math.max(0, Math.min(cs.h, e.clientY - rect.top - offsetY));
    let w = x - drag.startX;
    let h = y - drag.startY;
    const r = RATIOS[ratio];
    if (r !== null) {
      const aw = Math.abs(w);
      const ah = Math.abs(h);
      if (aw / r > ah) h = (aw / r) * Math.sign(h || 1);
      else w = ah * r * Math.sign(w || 1);
    }
    const sx = w < 0 ? drag.startX + w : drag.startX;
    const sy = h < 0 ? drag.startY + h : drag.startY;
    setSel({ x: sx, y: sy, w: Math.abs(w), h: Math.abs(h) });
  };

  const onMouseUp = () => setDrag(null);

  useEffect(() => {
    if (sel && RATIOS[ratio] !== null) {
      const r = RATIOS[ratio]!;
      setSel((s) => (s ? { ...s, h: s.w / r } : s));
    }
  }, [ratio]);

  const crop = () => {
    if (!img || !sel || sel.w < 5 || sel.h < 5) {
      setError("자를 영역을 마우스로 드래그해서 선택하세요.");
      return;
    }
    setError("");
    const cs = containerSize();
    const sx = sel.x / cs.scale;
    const sy = sel.y / cs.scale;
    const sw = sel.w / cs.scale;
    const sh = sel.h / cs.scale;
    const c = document.createElement("canvas");
    c.width = Math.round(sw);
    c.height = Math.round(sh);
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    const mime = file?.type === "image/png" ? "image/png" : "image/jpeg";
    c.toBlob(
      (blob) => {
        if (!blob || !file) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, "") + "_crop." + (mime === "image/png" ? "png" : "jpg");
        a.click();
        URL.revokeObjectURL(a.href);
      },
      mime,
      0.92
    );
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
          <div className="text-5xl mb-3">✂️</div>
          <div className="font-medium">이미지를 드래그하거나 클릭</div>
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
        <button onClick={() => { setFile(null); setImg(null); setSel(null); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {(Object.keys(RATIOS) as Ratio[]).map((r) => (
          <button
            key={r}
            onClick={() => setRatio(r)}
            className={`px-3 py-1.5 rounded ${ratio === r ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            {r === "free" ? "자유" : r}
          </button>
        ))}
      </div>

      <div
        ref={previewRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="relative bg-gray-100 dark:bg-gray-900 rounded overflow-hidden select-none cursor-crosshair"
        style={{ height: 400 }}
      >
        {src && (
          <img src={src} alt="" className="absolute inset-0 m-auto max-w-full max-h-full object-contain pointer-events-none" draggable={false} />
        )}
        {sel && img && (() => {
          const cs = containerSize();
          const rect = previewRef.current?.getBoundingClientRect();
          if (!rect) return null;
          const offsetX = (rect.width - cs.w) / 2;
          const offsetY = (rect.height - cs.h) / 2;
          return (
            <div
              className="absolute border-2 border-brand-500 bg-brand-500/20 pointer-events-none"
              style={{ left: offsetX + sel.x, top: offsetY + sel.y, width: sel.w, height: sel.h }}
            />
          );
        })()}
      </div>

      <div className="text-xs text-muted">
        {sel && img
          ? `선택: ${Math.round(sel.w / containerSize().scale)} × ${Math.round(sel.h / containerSize().scale)} px`
          : "마우스로 자를 영역을 드래그하세요"}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={crop} disabled={!sel || sel.w < 5} className="btn btn-primary disabled:opacity-50">✂️ 자르기 + 다운로드</button>
    </div>
  );
}
