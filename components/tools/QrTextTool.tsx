"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QrTextTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [content, setContent] = useState("https://barokit.com");
  const [centerText, setCenterText] = useState("BAROKIT");
  const [size, setSize] = useState(400);
  const [textSize, setTextSize] = useState(28);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgPadding, setBgPadding] = useState(12);
  const [bold, setBold] = useState(true);
  const [shape, setShape] = useState<"rect" | "rounded" | "circle">("rounded");

  useEffect(() => {
    if (!content) return;
    const c = canvasRef.current!;
    c.width = size;
    c.height = size;
    QRCode.toCanvas(c, content, { width: size, errorCorrectionLevel: "H", margin: 2 }).then(() => {
      if (!centerText) return;
      const ctx = c.getContext("2d")!;
      ctx.font = `${bold ? "bold " : ""}${textSize}px system-ui, "Pretendard", sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      const metrics = ctx.measureText(centerText);
      const textW = metrics.width;
      const textH = textSize;
      const boxW = textW + bgPadding * 2;
      const boxH = textH + bgPadding * 2;
      const cx = size / 2;
      const cy = size / 2;
      ctx.fillStyle = bgColor;
      if (shape === "circle") {
        const r = Math.max(boxW, boxH) / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === "rounded") {
        const r = 12;
        const x = cx - boxW / 2;
        const y = cy - boxH / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + boxW, y, x + boxW, y + boxH, r);
        ctx.arcTo(x + boxW, y + boxH, x, y + boxH, r);
        ctx.arcTo(x, y + boxH, x, y, r);
        ctx.arcTo(x, y, x + boxW, y, r);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);
      }
      ctx.fillStyle = textColor;
      ctx.fillText(centerText, cx, cy);
    });
  }, [content, centerText, size, textSize, textColor, bgColor, bgPadding, bold, shape]);

  const download = () => {
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `qr-text-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">QR 내용 (URL · 텍스트)</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
        />
      </div>
      <div>
        <label className="label">가운데에 들어갈 텍스트</label>
        <input
          type="text"
          value={centerText}
          onChange={(e) => setCenterText(e.target.value)}
          placeholder="예: 카페명, 이름, 행사명"
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm items-end">
        <label>QR 크기 ({size}px)<input type="range" min="200" max="800" step="50" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" /></label>
        <label>글자 크기 ({textSize}px)<input type="range" min="12" max="80" value={textSize} onChange={(e) => setTextSize(+e.target.value)} className="w-full" /></label>
        <label>여백 ({bgPadding}px)<input type="range" min="2" max="40" value={bgPadding} onChange={(e) => setBgPadding(+e.target.value)} className="w-full" /></label>
        <label>글자 색<input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-8" /></label>
        <label>배경 색<input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-8" /></label>
        <div>
          <label className="block mb-1">배경 모양</label>
          <select value={shape} onChange={(e) => setShape(e.target.value as "rect" | "rounded" | "circle")} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="rect">사각형</option>
            <option value="rounded">둥근 사각형</option>
            <option value="circle">원형</option>
          </select>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={bold} onChange={(e) => setBold(e.target.checked)} /> 굵게
      </label>

      <div className="bg-checker rounded p-3 flex justify-center">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      <button onClick={download} className="btn btn-primary">📥 PNG 다운로드</button>

      <div className="text-xs text-muted leading-relaxed">
        오류 정정 레벨 H로 생성되어 중앙의 25%까지 가려져도 스캔이 가능합니다. 글자가 너무 크면 인식이 어려울 수 있으니 미리 다른 폰으로 스캔 테스트해보세요.
      </div>
    </div>
  );
}
