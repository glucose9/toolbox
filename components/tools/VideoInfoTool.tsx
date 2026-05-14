"use client";

import { useRef, useState } from "react";

function fmt(n: number) { return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`; }
function fmtDur(s: number) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}` : `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function VideoInfoTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<{ width: number; height: number; duration: number } | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = URL.createObjectURL(f);
    v.onloadedmetadata = () => setInfo({ width: v.videoWidth, height: v.videoHeight, duration: v.duration });
  };

  return (
    <div className="card space-y-3">
      {!file ? (
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
          <div className="text-5xl">ℹ️</div>
          <div className="font-medium mt-2">동영상 업로드</div>
          <input ref={inputRef} type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      ) : (
        <>
          <div className="text-sm font-medium truncate">{file.name}</div>
          {info && (
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr><td className="py-2 pr-3 text-muted">해상도</td><td className="font-mono">{info.width} × {info.height}px</td></tr>
                <tr><td className="py-2 pr-3 text-muted">화면비</td><td className="font-mono">{(info.width / info.height).toFixed(3)}:1</td></tr>
                <tr><td className="py-2 pr-3 text-muted">길이</td><td className="font-mono">{fmtDur(info.duration)} ({info.duration.toFixed(2)}초)</td></tr>
                <tr><td className="py-2 pr-3 text-muted">파일 크기</td><td className="font-mono">{fmt(file.size)}</td></tr>
                <tr><td className="py-2 pr-3 text-muted">평균 비트레이트</td><td className="font-mono">{Math.round((file.size * 8) / info.duration / 1000)} kbps</td></tr>
                <tr><td className="py-2 pr-3 text-muted">파일 타입</td><td className="font-mono">{file.type || "unknown"}</td></tr>
              </tbody>
            </table>
          )}
          <button onClick={() => { setFile(null); setInfo(null); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
        </>
      )}
    </div>
  );
}
