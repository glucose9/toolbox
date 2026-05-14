"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QrLogoTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("https://barokit.com");
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [logoSize, setLogoSize] = useState(20);
  const [logoBg, setLogoBg] = useState("#ffffff");
  const [size, setSize] = useState(400);

  useEffect(() => {
    if (!text) return;
    const c = canvasRef.current!;
    c.width = size; c.height = size;
    QRCode.toCanvas(c, text, { width: size, errorCorrectionLevel: "H", margin: 2 }).then(() => {
      if (logo) {
        const ctx = c.getContext("2d")!;
        const ls = (size * logoSize) / 100;
        const x = (size - ls) / 2;
        const y = (size - ls) / 2;
        ctx.fillStyle = logoBg;
        ctx.fillRect(x - 8, y - 8, ls + 16, ls + 16);
        ctx.drawImage(logo, x, y, ls, ls);
      }
    });
  }, [text, logo, logoSize, logoBg, size]);

  const handleLogo = (f: File) => {
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => setLogo(i);
    i.src = url;
  };

  const download = () => {
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `qr-logo-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  return (
    <div className="card space-y-3">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="URL 또는 텍스트" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
      <div className="grid grid-cols-2 gap-3 text-sm items-end">
        <button onClick={() => inputRef.current?.click()} className="btn btn-secondary">{logo ? "로고 변경" : "로고 업로드"}</button>
        <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleLogo(e.target.files[0])} className="hidden" />
        {logo && <button onClick={() => setLogo(null)} className="btn btn-secondary text-xs">로고 제거</button>}
        <label>로고 크기 ({logoSize}%)<input type="range" min="10" max="30" value={logoSize} onChange={(e) => setLogoSize(+e.target.value)} className="w-full" /></label>
        <label>QR 크기 ({size}px)<input type="range" min="200" max="800" step="50" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" /></label>
        <label>로고 배경<input type="color" value={logoBg} onChange={(e) => setLogoBg(e.target.value)} className="w-full h-7" /></label>
      </div>
      <canvas ref={canvasRef} className="max-w-full mx-auto" />
      <button onClick={download} className="btn btn-primary">📥 PNG 다운로드</button>
    </div>
  );
}
