"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { evaluate, parse } from "mathjs";

type FnEntry = { id: number; expr: string; color: string; visible: boolean; error?: string };

const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#ea580c", "#9333ea", "#0891b2", "#db2777", "#ca8a04"];

export default function GraphCalcTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fns, setFns] = useState<FnEntry[]>([
    { id: 1, expr: "x^2", color: COLORS[0], visible: true },
    { id: 2, expr: "sin(x) * 3", color: COLORS[1], visible: true },
  ]);
  const [view, setView] = useState({ xMin: -10, xMax: 10, yMin: -10, yMax: 10 });
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);

  // Compile expressions
  const compiled = fns.map((f) => {
    try {
      const node = parse(f.expr);
      const code = node.compile();
      return { ...f, eval: (x: number) => code.evaluate({ x }) as number, error: undefined };
    } catch (e) {
      return { ...f, eval: null, error: e instanceof Error ? e.message : "parse error" };
    }
  });

  // Auto-fit canvas
  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.clientWidth;
      setSize({ w, h: Math.min(w, 600) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const xToScreen = useCallback((x: number) => ((x - view.xMin) / (view.xMax - view.xMin)) * size.w, [view, size.w]);
  const yToScreen = useCallback((y: number) => size.h - ((y - view.yMin) / (view.yMax - view.yMin)) * size.h, [view, size.h]);
  const screenToX = useCallback((sx: number) => view.xMin + (sx / size.w) * (view.xMax - view.xMin), [view, size.w]);
  const screenToY = useCallback((sy: number) => view.yMin + ((size.h - sy) / size.h) * (view.yMax - view.yMin), [view, size.h]);

  // Draw
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = size.w;
    c.height = size.h;
    const ctx = c.getContext("2d")!;
    const isDark = document.documentElement.classList.contains("dark");
    ctx.fillStyle = isDark ? "#0f172a" : "#ffffff";
    ctx.fillRect(0, 0, size.w, size.h);

    // Grid
    const xRange = view.xMax - view.xMin;
    const yRange = view.yMax - view.yMin;
    const step = (r: number) => {
      const raw = r / 10;
      const mag = Math.pow(10, Math.floor(Math.log10(raw)));
      const norm = raw / mag;
      const nice = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
      return nice * mag;
    };
    const xStep = step(xRange);
    const yStep = step(yRange);

    ctx.strokeStyle = isDark ? "#1e293b" : "#f1f5f9";
    ctx.lineWidth = 1;
    for (let x = Math.ceil(view.xMin / xStep) * xStep; x <= view.xMax; x += xStep) {
      const sx = xToScreen(x);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, size.h);
      ctx.stroke();
    }
    for (let y = Math.ceil(view.yMin / yStep) * yStep; y <= view.yMax; y += yStep) {
      const sy = yToScreen(y);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(size.w, sy);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = isDark ? "#475569" : "#94a3b8";
    ctx.lineWidth = 1.5;
    const x0 = xToScreen(0);
    const y0 = yToScreen(0);
    if (x0 >= 0 && x0 <= size.w) {
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, size.h);
      ctx.stroke();
    }
    if (y0 >= 0 && y0 <= size.h) {
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(size.w, y0);
      ctx.stroke();
    }

    // Axis labels
    ctx.fillStyle = isDark ? "#94a3b8" : "#64748b";
    ctx.font = "11px system-ui";
    ctx.textBaseline = "top";
    for (let x = Math.ceil(view.xMin / xStep) * xStep; x <= view.xMax; x += xStep) {
      if (Math.abs(x) < xStep / 2) continue;
      const sx = xToScreen(x);
      const sy = Math.max(2, Math.min(size.h - 14, y0 + 3));
      ctx.fillText(formatNum(x), sx + 2, sy);
    }
    ctx.textBaseline = "middle";
    for (let y = Math.ceil(view.yMin / yStep) * yStep; y <= view.yMax; y += yStep) {
      if (Math.abs(y) < yStep / 2) continue;
      const sx = Math.max(2, Math.min(size.w - 30, x0 + 3));
      ctx.fillText(formatNum(y), sx, yToScreen(y));
    }

    // Plot functions
    for (const f of compiled) {
      if (!f.visible || !f.eval) continue;
      ctx.strokeStyle = f.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let prevDefined = false;
      const steps = size.w * 2;
      for (let i = 0; i <= steps; i++) {
        const sx = (i / steps) * size.w;
        const x = screenToX(sx);
        let y: number;
        try {
          y = f.eval(x);
        } catch {
          prevDefined = false;
          continue;
        }
        if (!isFinite(y)) {
          prevDefined = false;
          continue;
        }
        const sy = yToScreen(y);
        if (sy < -1000 || sy > size.h + 1000) {
          prevDefined = false;
          continue;
        }
        if (prevDefined) ctx.lineTo(sx, sy);
        else ctx.moveTo(sx, sy);
        prevDefined = true;
      }
      ctx.stroke();
    }

    // Cursor crosshair
    if (cursor) {
      ctx.strokeStyle = isDark ? "#cbd5e1" : "#475569";
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cursor.x, 0);
      ctx.lineTo(cursor.x, size.h);
      ctx.moveTo(0, cursor.y);
      ctx.lineTo(size.w, cursor.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [view, size, compiled, cursor, xToScreen, yToScreen, screenToX]);

  const cursorWorld = cursor ? { x: screenToX(cursor.x), y: screenToY(cursor.y) } : null;

  const onMouseDown = (e: React.MouseEvent) => setDrag({ x: e.clientX, y: e.clientY });
  const onMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (drag) {
      const dx = ((e.clientX - drag.x) / size.w) * (view.xMax - view.xMin);
      const dy = ((e.clientY - drag.y) / size.h) * (view.yMax - view.yMin);
      setView({ xMin: view.xMin - dx, xMax: view.xMax - dx, yMin: view.yMin + dy, yMax: view.yMax + dy });
      setDrag({ x: e.clientX, y: e.clientY });
    }
  };
  const onMouseUp = () => setDrag(null);
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.2 : 1 / 1.2;
    const rect = canvasRef.current!.getBoundingClientRect();
    const cx = screenToX(e.clientX - rect.left);
    const cy = screenToY(e.clientY - rect.top);
    setView({
      xMin: cx + (view.xMin - cx) * factor,
      xMax: cx + (view.xMax - cx) * factor,
      yMin: cy + (view.yMin - cy) * factor,
      yMax: cy + (view.yMax - cy) * factor,
    });
  };

  const resetView = () => setView({ xMin: -10, xMax: 10, yMin: -10, yMax: 10 });
  const zoomBtn = (factor: number) => {
    const cx = (view.xMin + view.xMax) / 2;
    const cy = (view.yMin + view.yMax) / 2;
    setView({
      xMin: cx + (view.xMin - cx) * factor,
      xMax: cx + (view.xMax - cx) * factor,
      yMin: cy + (view.yMin - cy) * factor,
      yMax: cy + (view.yMax - cy) * factor,
    });
  };

  const addFn = () => {
    const id = Date.now();
    const color = COLORS[fns.length % COLORS.length];
    setFns([...fns, { id, expr: "", color, visible: true }]);
  };
  const updateFn = (id: number, patch: Partial<FnEntry>) => {
    setFns(fns.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };
  const removeFn = (id: number) => setFns(fns.filter((f) => f.id !== id));

  return (
    <div className="card space-y-3">
      <div className="space-y-2">
        {compiled.map((f, i) => (
          <div key={f.id} className="flex items-center gap-2">
            <button
              onClick={() => updateFn(f.id, { visible: !f.visible })}
              className="w-6 h-6 rounded border-2 flex-shrink-0"
              style={{ backgroundColor: f.visible ? f.color : "transparent", borderColor: f.color }}
              title={f.visible ? "숨기기" : "보이기"}
            />
            <span className="text-sm font-mono text-muted shrink-0">y =</span>
            <input
              value={fns[i].expr}
              onChange={(e) => updateFn(f.id, { expr: e.target.value })}
              placeholder="예: x^2, sin(x), 2x+1"
              className={`flex-1 px-2 py-1 border rounded bg-white dark:bg-gray-900 text-sm font-mono ${f.error ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`}
            />
            <button onClick={() => removeFn(f.id)} className="text-red-500 hover:text-red-700 text-lg w-6">×</button>
          </div>
        ))}
        {compiled.some((f) => f.error) && (
          <div className="text-xs text-red-500">
            {compiled.filter((f) => f.error).map((f) => `y = ${f.expr}: ${f.error}`).join(" / ")}
          </div>
        )}
        <button onClick={addFn} className="btn text-sm">+ 함수 추가</button>
      </div>

      <div ref={wrapRef} className="relative">
        <canvas
          ref={canvasRef}
          className="border border-gray-200 dark:border-gray-700 rounded cursor-crosshair w-full touch-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { setCursor(null); setDrag(null); }}
          onWheel={onWheel}
        />
        {cursorWorld && (
          <div className="absolute top-2 right-2 bg-white/95 dark:bg-gray-900/95 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-xs font-mono shadow-sm">
            x = {cursorWorld.x.toFixed(3)}<br />y = {cursorWorld.y.toFixed(3)}
            {compiled.filter((f) => f.visible && f.eval).map((f) => {
              try {
                const y = f.eval!(cursorWorld.x);
                return <div key={f.id} style={{ color: f.color }}>f(x) = {isFinite(y) ? y.toFixed(3) : "—"}</div>;
              } catch {
                return null;
              }
            })}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={() => zoomBtn(1 / 1.5)} className="btn">🔍 확대</button>
        <button onClick={() => zoomBtn(1.5)} className="btn">🔍 축소</button>
        <button onClick={resetView} className="btn">↺ 기본 화면</button>
        <span className="ml-auto text-xs text-muted self-center">
          드래그: 이동 · 휠: 확대/축소
        </span>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 지원: <code>+ - * / ^</code>, <code>sin cos tan asin acos atan</code>, <code>log log10 exp sqrt abs</code>, <code>pi e</code>. 예: <code>sin(x)/x</code>, <code>e^(-x^2)</code>, <code>x^3 - 3x</code>.
        조각함수는 <code>x^2 * (x &gt; 0)</code> 처럼 곱하기로.
      </div>
    </div>
  );
}

function formatNum(n: number): string {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 10000 || abs < 0.01) return n.toExponential(1);
  return parseFloat(n.toFixed(3)).toString();
}
