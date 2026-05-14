"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; file: File; img: HTMLImageElement; src: string };
type Layout = "horizontal" | "vertical" | "grid";

export default function ImageStackTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [layout, setLayout] = useState<Layout>("horizontal");
  const [gap, setGap] = useState(8);
  const [bg, setBg] = useState("#ffffff");
  const [cols, setCols] = useState(2);

  const addFiles = async (list: FileList) => {
    const next: Item[] = [];
    for (const f of Array.from(list)) {
      if (!f.type.startsWith("image/")) continue;
      const src = URL.createObjectURL(f);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error("이미지 로드 실패"));
        i.src = src;
      });
      next.push({ id: Math.random().toString(36).slice(2), file: f, img, src });
    }
    setItems((p) => [...p, ...next]);
  };

  const remove = (id: string) => {
    setItems((p) => {
      const found = p.find((x) => x.id === id);
      if (found) URL.revokeObjectURL(found.src);
      return p.filter((x) => x.id !== id);
    });
  };

  const move = (id: string, dir: -1 | 1) => {
    setItems((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx < 0) return p;
      const target = idx + dir;
      if (target < 0 || target >= p.length) return p;
      const next = [...p];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || items.length === 0) return;
    let w = 0, h = 0;
    if (layout === "horizontal") {
      const maxH = Math.max(...items.map((i) => i.img.naturalHeight));
      w = items.reduce((s, i) => s + Math.round(i.img.naturalWidth * (maxH / i.img.naturalHeight)), 0) + gap * (items.length - 1);
      h = maxH;
    } else if (layout === "vertical") {
      const maxW = Math.max(...items.map((i) => i.img.naturalWidth));
      h = items.reduce((s, i) => s + Math.round(i.img.naturalHeight * (maxW / i.img.naturalWidth)), 0) + gap * (items.length - 1);
      w = maxW;
    } else {
      const cellW = Math.max(...items.map((i) => i.img.naturalWidth));
      const cellH = Math.max(...items.map((i) => i.img.naturalHeight));
      const rows = Math.ceil(items.length / cols);
      w = cellW * cols + gap * (cols - 1);
      h = cellH * rows + gap * (rows - 1);
    }
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    if (layout === "horizontal") {
      const maxH = Math.max(...items.map((i) => i.img.naturalHeight));
      let x = 0;
      for (const it of items) {
        const scale = maxH / it.img.naturalHeight;
        const drawW = it.img.naturalWidth * scale;
        ctx.drawImage(it.img, x, 0, drawW, maxH);
        x += drawW + gap;
      }
    } else if (layout === "vertical") {
      const maxW = Math.max(...items.map((i) => i.img.naturalWidth));
      let y = 0;
      for (const it of items) {
        const scale = maxW / it.img.naturalWidth;
        const drawH = it.img.naturalHeight * scale;
        ctx.drawImage(it.img, 0, y, maxW, drawH);
        y += drawH + gap;
      }
    } else {
      const cellW = Math.max(...items.map((i) => i.img.naturalWidth));
      const cellH = Math.max(...items.map((i) => i.img.naturalHeight));
      items.forEach((it, i) => {
        const r = Math.floor(i / cols);
        const col = i % cols;
        const x = col * (cellW + gap);
        const y = r * (cellH + gap);
        const scale = Math.min(cellW / it.img.naturalWidth, cellH / it.img.naturalHeight);
        const drawW = it.img.naturalWidth * scale;
        const drawH = it.img.naturalHeight * scale;
        ctx.drawImage(it.img, x + (cellW - drawW) / 2, y + (cellH - drawH) / 2, drawW, drawH);
      });
    }
  }, [items, layout, gap, bg, cols]);

  const download = () => {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `stack-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  };

  if (items.length === 0) {
    return (
      <div className="card">
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🗂️</div>
          <div className="font-medium">이미지를 여러 장 드래그하거나 클릭</div>
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={(e) => e.target.files && addFiles(e.target.files)} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm text-muted">{items.length}장</div>
        <button onClick={() => inputRef.current?.click()} className="text-sm text-brand-600 hover:underline">+ 추가</button>
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={(e) => e.target.files && addFiles(e.target.files)} className="hidden" />
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {(["horizontal", "vertical", "grid"] as Layout[]).map((l) => (
          <button key={l} onClick={() => setLayout(l)} className={`btn ${layout === l ? "btn-primary" : "btn-secondary"}`}>
            {l === "horizontal" ? "가로" : l === "vertical" ? "세로" : "격자"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm items-end">
        <label>간격 ({gap}px)<input type="range" min="0" max="40" value={gap} onChange={(e) => setGap(+e.target.value)} className="w-full" /></label>
        <label>배경<input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-7" /></label>
        {layout === "grid" && (
          <label>열 ({cols})<input type="range" min="1" max="6" value={cols} onChange={(e) => setCols(+e.target.value)} className="w-full" /></label>
        )}
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700 max-h-48 overflow-y-auto">
        {items.map((it, i) => (
          <div key={it.id} className="flex items-center gap-2 p-1.5">
            <span className="text-xs text-muted w-6 text-center">{i + 1}</span>
            <img src={it.src} alt="" className="w-8 h-8 object-cover rounded" />
            <span className="text-xs truncate flex-1">{it.file.name}</span>
            <button onClick={() => move(it.id, -1)} disabled={i === 0} className="text-gray-500 disabled:opacity-30 px-1">▲</button>
            <button onClick={() => move(it.id, 1)} disabled={i === items.length - 1} className="text-gray-500 disabled:opacity-30 px-1">▼</button>
            <button onClick={() => remove(it.id)} className="text-red-600 px-1">×</button>
          </div>
        ))}
      </div>

      <div className="bg-checker rounded p-3 overflow-auto" style={{ maxHeight: 500 }}>
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      <button onClick={download} className="btn btn-primary">📥 PNG 다운로드</button>
    </div>
  );
}
