"use client";

import { useEffect, useRef, useState } from "react";

type State = {
  text: string;
  size: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  x: number; // 0-100 %
  y: number; // 0-100 %
  bold: boolean;
  font: string;
  align: "left" | "center" | "right";
};

const DEFAULT: State = {
  text: "여기에 글자",
  size: 64,
  color: "#ffffff",
  strokeColor: "#000000",
  strokeWidth: 4,
  x: 50,
  y: 50,
  bold: true,
  font: "system-ui",
  align: "center",
};

const FONTS = ["system-ui", "Pretendard", "Arial", "Times New Roman", "Courier New", "Impact", "Georgia"];

export default function ImageTextOverlayTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [state, setState] = useState<State>(DEFAULT);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = URL.createObjectURL(f);
  };

  useEffect(() => {
    if (!img) return;
    const c = canvasRef.current;
    if (!c) return;
    const maxW = 800;
    const ratio = Math.min(maxW / img.naturalWidth, 1);
    c.width = img.naturalWidth * ratio;
    c.height = img.naturalHeight * ratio;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0, c.width, c.height);
    drawText(ctx, c.width, c.height, state);
  }, [img, state]);

  const drawText = (ctx: CanvasRenderingContext2D, w: number, h: number, s: State) => {
    if (!s.text) return;
    ctx.font = `${s.bold ? "bold " : ""}${s.size}px ${s.font}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = s.align;
    const x = (w * s.x) / 100;
    const y = (h * s.y) / 100;
    if (s.strokeWidth > 0) {
      ctx.strokeStyle = s.strokeColor;
      ctx.lineWidth = s.strokeWidth;
      ctx.lineJoin = "round";
      ctx.strokeText(s.text, x, y);
    }
    ctx.fillStyle = s.color;
    ctx.fillText(s.text, x, y);
  };

  const onMouseDown = () => setDragging(true);
  const onMouseUp = () => setDragging(false);
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setState((s) => ({ ...s, x, y }));
  };

  const download = () => {
    if (!img || !file) return;
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    // Scale text proportionally
    const scale = img.naturalWidth / (canvasRef.current?.width || img.naturalWidth);
    drawText(ctx, c.width, c.height, {
      ...state,
      size: state.size * scale,
      strokeWidth: state.strokeWidth * scale,
    });
    const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
    c.toBlob(
      (blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, "") + "_text." + (mime === "image/png" ? "png" : "jpg");
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
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🔤</div>
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
        <button onClick={() => { setFile(null); setImg(null); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div className="bg-checker rounded inline-block">
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          className="max-w-full cursor-move"
        />
      </div>
      <div className="text-xs text-muted">미리보기 위에서 마우스로 드래그해 위치 조정</div>

      <div className="space-y-2">
        <input
          type="text"
          value={state.text}
          onChange={(e) => setState((s) => ({ ...s, text: e.target.value }))}
          placeholder="텍스트 입력"
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <label>
            크기 ({state.size}px)
            <input type="range" min="12" max="200" value={state.size} onChange={(e) => setState((s) => ({ ...s, size: +e.target.value }))} className="w-full" />
          </label>
          <label>
            외곽선 ({state.strokeWidth}px)
            <input type="range" min="0" max="20" value={state.strokeWidth} onChange={(e) => setState((s) => ({ ...s, strokeWidth: +e.target.value }))} className="w-full" />
          </label>
          <label>
            글자색
            <input type="color" value={state.color} onChange={(e) => setState((s) => ({ ...s, color: e.target.value }))} className="w-full h-7" />
          </label>
          <label>
            외곽선색
            <input type="color" value={state.strokeColor} onChange={(e) => setState((s) => ({ ...s, strokeColor: e.target.value }))} className="w-full h-7" />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <label>
            폰트
            <select value={state.font} onChange={(e) => setState((s) => ({ ...s, font: e.target.value }))} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mt-1">
              {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <label>
            정렬
            <select value={state.align} onChange={(e) => setState((s) => ({ ...s, align: e.target.value as State["align"] }))} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mt-1">
              <option value="left">왼쪽</option>
              <option value="center">중앙</option>
              <option value="right">오른쪽</option>
            </select>
          </label>
          <label className="flex items-end gap-1 pb-1">
            <input type="checkbox" checked={state.bold} onChange={(e) => setState((s) => ({ ...s, bold: e.target.checked }))} />
            굵게
          </label>
        </div>
      </div>

      <button onClick={download} className="btn btn-primary">📥 다운로드</button>
    </div>
  );
}
