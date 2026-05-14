"use client";

import { useEffect, useRef, useState } from "react";

type Size = "1080" | "1080x1350" | "1200x630";
const SIZES: Record<Size, [number, number]> = { "1080": [1080, 1080], "1080x1350": [1080, 1350], "1200x630": [1200, 630] };
const BGS = [
  ["#ff9966", "#ff5e62"], ["#36d1dc", "#5b86e5"], ["#11998e", "#38ef7d"],
  ["#fc466b", "#3f5efb"], ["#ffd200", "#f7971e"], ["#1a2980", "#26d0ce"],
  ["#2c3e50", "#4ca1af"], ["#000000", "#434343"], ["#ee9ca7", "#ffdde1"],
];

export default function TextCardTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("코드 한 줄이 세상을 바꾼다");
  const [author, setAuthor] = useState("— barokit.com");
  const [size, setSize] = useState<Size>("1080");
  const [bgIdx, setBgIdx] = useState(0);
  const [fontSize, setFontSize] = useState(80);

  useEffect(() => {
    const c = canvasRef.current!;
    const [w, h] = SIZES[size];
    c.width = w; c.height = h;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, BGS[bgIdx][0]); g.addColorStop(1, BGS[bgIdx][1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "white"; ctx.textAlign = "center";
    ctx.font = `bold ${fontSize}px system-ui, "Pretendard", sans-serif`;
    const lines = wrap(ctx, text, w - 200);
    const lineH = fontSize * 1.3;
    const totalH = lines.length * lineH;
    let y = (h - totalH) / 2 + fontSize;
    for (const line of lines) { ctx.fillText(line, w / 2, y); y += lineH; }
    if (author) {
      ctx.font = `${Math.round(fontSize * 0.4)}px system-ui, "Pretendard", sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText(author, w / 2, h - 80);
    }
  }, [text, author, size, bgIdx, fontSize]);

  const download = () => {
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = `card-${Date.now()}.png`; a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-20 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="저자/출처" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
      <div className="grid grid-cols-3 gap-2 text-sm items-end">
        <label>크기<select value={size} onChange={(e) => setSize(e.target.value as Size)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mt-1"><option value="1080">정사각 1080</option><option value="1080x1350">세로 1080×1350</option><option value="1200x630">가로 1200×630</option></select></label>
        <label>글자 크기 ({fontSize})<input type="range" min="40" max="160" value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full" /></label>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {BGS.map((bg, i) => (
          <button key={i} onClick={() => setBgIdx(i)} className={`w-8 h-8 rounded border-2 ${bgIdx === i ? "border-brand-600" : "border-transparent"}`} style={{ background: `linear-gradient(135deg, ${bg[0]}, ${bg[1]})` }} />
        ))}
      </div>
      <canvas ref={canvasRef} className="max-w-full border border-gray-200 dark:border-gray-700 rounded" style={{ maxHeight: 400 }} />
      <button onClick={download} className="btn btn-primary">📥 PNG 다운로드</button>
    </div>
  );
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/(\s+)/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur + w;
    if (ctx.measureText(test).width > maxWidth && cur) { lines.push(cur.trim()); cur = w; }
    else cur = test;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}
