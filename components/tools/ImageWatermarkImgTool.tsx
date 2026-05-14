"use client";
import { useEffect, useRef, useState } from "react";

const POSITIONS = ["top-left","top-center","top-right","center-left","center","center-right","bottom-left","bottom-center","bottom-right"] as const;

export default function ImageWatermarkImgTool() {
  const baseRef = useRef<HTMLInputElement>(null);
  const wmRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [base, setBase] = useState<HTMLImageElement | null>(null);
  const [wm, setWm] = useState<HTMLImageElement | null>(null);
  const [position, setPosition] = useState<typeof POSITIONS[number]>("bottom-right");
  const [size, setSize] = useState(20);
  const [opacity, setOpacity] = useState(0.7);
  const [margin, setMargin] = useState(20);

  const load = (f: File, set: (i: HTMLImageElement) => void) => {
    if (!f.type.startsWith("image/")) return;
    const i = new Image();
    i.onload = () => set(i);
    i.src = URL.createObjectURL(f);
  };

  useEffect(() => {
    if (!base) return;
    const c = canvasRef.current!;
    c.width = base.naturalWidth; c.height = base.naturalHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(base, 0, 0);
    if (wm) {
      const w = (c.width * size) / 100;
      const h = (wm.naturalHeight / wm.naturalWidth) * w;
      const [vp, hp] = position.split("-");
      let x = margin, y = margin;
      if (hp === "center") x = (c.width - w) / 2;
      else if (hp === "right") x = c.width - w - margin;
      if (vp === "center") y = (c.height - h) / 2;
      else if (vp === "bottom") y = c.height - h - margin;
      ctx.globalAlpha = opacity;
      ctx.drawImage(wm, x, y, w, h);
      ctx.globalAlpha = 1;
    }
  }, [base, wm, position, size, opacity, margin]);

  const download = () => {
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = `watermarked-${Date.now()}.png`; a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => baseRef.current?.click()} className="btn btn-secondary">{base ? "배경 변경" : "배경 이미지"}</button>
        <button onClick={() => wmRef.current?.click()} className="btn btn-secondary">{wm ? "워터마크 변경" : "워터마크 이미지"}</button>
        <input ref={baseRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0], setBase)} className="hidden" />
        <input ref={wmRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0], setWm)} className="hidden" />
      </div>
      {base && (
        <>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label>위치<select value={position} onChange={(e) => setPosition(e.target.value as typeof POSITIONS[number])} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">{POSITIONS.map((p) => <option key={p}>{p}</option>)}</select></label>
            <label>여백 ({margin}px)<input type="range" min="0" max="100" value={margin} onChange={(e) => setMargin(+e.target.value)} className="w-full" /></label>
            <label>크기 ({size}%)<input type="range" min="5" max="50" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" /></label>
            <label>투명도 ({opacity.toFixed(2)})<input type="range" min="0.1" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="w-full" /></label>
          </div>
          <canvas ref={canvasRef} className="max-w-full mx-auto border border-gray-200 dark:border-gray-700 rounded" />
          <button onClick={download} className="btn btn-primary">📥 다운로드</button>
        </>
      )}
    </div>
  );
}
