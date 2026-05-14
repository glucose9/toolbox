"use client";

import { useRef, useState } from "react";

export default function ImageCompareTool() {
  const refA = useRef<HTMLInputElement>(null);
  const refB = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFile = (f: File, side: "a" | "b") => {
    const url = URL.createObjectURL(f);
    if (side === "a") setA(url); else setB(url);
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setPos(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  if (!a || !b) {
    return (
      <div className="card space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div onClick={() => refA.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
            <div className="text-3xl">📷</div>
            <div className="mt-2 text-sm font-medium">Before {a && "✓"}</div>
            <input ref={refA} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0], "a")} className="hidden" />
          </div>
          <div onClick={() => refB.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
            <div className="text-3xl">📷</div>
            <div className="mt-2 text-sm font-medium">After {b && "✓"}</div>
            <input ref={refB} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0], "b")} className="hidden" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div
        ref={containerRef}
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onMouseMove={onMove}
        onTouchStart={() => setDragging(true)}
        onTouchEnd={() => setDragging(false)}
        onTouchMove={onMove}
        className="relative w-full select-none overflow-hidden rounded border border-gray-200 dark:border-gray-700 cursor-ew-resize"
      >
        <img src={a} alt="" className="block w-full" draggable={false} />
        <img src={b} alt="" className="absolute inset-0 w-full block" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} draggable={false} />
        <div className="absolute top-0 bottom-0 w-1 bg-white shadow" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">↔</div>
        </div>
        <span className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-black/60 text-white rounded">Before</span>
        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs bg-black/60 text-white rounded">After</span>
      </div>
      <button onClick={() => { setA(""); setB(""); }} className="text-sm text-brand-600 hover:underline">다른 이미지</button>
    </div>
  );
}
