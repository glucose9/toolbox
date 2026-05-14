"use client";

import { useEffect, useRef, useState } from "react";

type Sel = { x: number; y: number; w: number; h: number };

export default function ImagePixelateTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [pixelSize, setPixelSize] = useState(15);
  const [wholeImage, setWholeImage] = useState(false);
  const [sels, setSels] = useState<Sel[]>([]);
  const [drag, setDrag] = useState<{ startX: number; startY: number } | null>(null);
  const [scale, setScale] = useState(1);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setSels([]);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = URL.createObjectURL(f);
  };

  useEffect(() => {
    if (!img) return;
    const c = canvasRef.current;
    if (!c) return;
    const maxW = 800;
    const s = Math.min(maxW / img.naturalWidth, 1);
    setScale(s);
    c.width = img.naturalWidth * s;
    c.height = img.naturalHeight * s;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0, c.width, c.height);

    const pixelate = (x: number, y: number, w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const px = Math.max(2, Math.min(pixelSize, Math.min(w, h) / 2));
      const tmp = document.createElement("canvas");
      const tw = Math.max(1, Math.floor(w / px));
      const th = Math.max(1, Math.floor(h / px));
      tmp.width = tw;
      tmp.height = th;
      const tctx = tmp.getContext("2d")!;
      tctx.imageSmoothingEnabled = false;
      tctx.drawImage(c, x, y, w, h, 0, 0, tw, th);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tmp, 0, 0, tw, th, x, y, w, h);
    };

    if (wholeImage) {
      pixelate(0, 0, c.width, c.height);
    } else {
      for (const sel of sels) pixelate(sel.x, sel.y, sel.w, sel.h);
    }
  }, [img, pixelSize, wholeImage, sels]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (wholeImage) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const ratio = canvasRef.current!.width / rect.width;
    const x = (e.clientX - rect.left) * ratio;
    const y = (e.clientY - rect.top) * ratio;
    setDrag({ startX: x, startY: y });
  };
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drag) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const ratio = canvasRef.current!.width / rect.width;
    const x = (e.clientX - rect.left) * ratio;
    const y = (e.clientY - rect.top) * ratio;
    const sel = {
      x: Math.min(drag.startX, x),
      y: Math.min(drag.startY, y),
      w: Math.abs(x - drag.startX),
      h: Math.abs(y - drag.startY),
    };
    // preview drawing handled by useEffect; for live, replace last temp
    setSels((prev) => [...prev.filter((_, i) => i !== prev.length - 1 || !drag), sel]);
  };
  const onMouseUp = () => setDrag(null);

  const download = () => {
    if (!file) return;
    // re-render at original resolution
    if (!img) return;
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const px = Math.max(2, pixelSize / scale);
    const pixelate = (x: number, y: number, w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const tmp = document.createElement("canvas");
      const tw = Math.max(1, Math.floor(w / px));
      const th = Math.max(1, Math.floor(h / px));
      tmp.width = tw; tmp.height = th;
      const tctx = tmp.getContext("2d")!;
      tctx.imageSmoothingEnabled = false;
      tctx.drawImage(c, x, y, w, h, 0, 0, tw, th);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tmp, 0, 0, tw, th, x, y, w, h);
    };
    if (wholeImage) {
      pixelate(0, 0, c.width, c.height);
    } else {
      for (const sel of sels) {
        pixelate(sel.x / scale, sel.y / scale, sel.w / scale, sel.h / scale);
      }
    }
    const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
    c.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = file.name.replace(/\.[^.]+$/, "") + "_pixelated." + (mime === "image/png" ? "png" : "jpg");
      a.click();
      URL.revokeObjectURL(a.href);
    }, mime, 0.92);
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
          <div className="text-5xl mb-3">🔲</div>
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
        <button onClick={() => { setFile(null); setImg(null); setSels([]); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div className="bg-checker rounded p-2 inline-block">
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="max-w-full cursor-crosshair"
        />
      </div>
      <div className="text-xs text-muted">{wholeImage ? "전체 이미지에 모자이크 적용 중" : "이미지 위에서 마우스로 드래그해 영역을 선택하세요"}</div>

      <div className="grid grid-cols-3 gap-3 text-sm items-center">
        <label>픽셀 크기 ({pixelSize}px)<input type="range" min="5" max="60" value={pixelSize} onChange={(e) => setPixelSize(+e.target.value)} className="w-full" /></label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={wholeImage} onChange={(e) => setWholeImage(e.target.checked)} />
          전체 이미지
        </label>
        {!wholeImage && <button onClick={() => setSels([])} className="btn btn-secondary text-xs">영역 초기화</button>}
      </div>

      <button onClick={download} className="btn btn-primary">📥 다운로드</button>
    </div>
  );
}
