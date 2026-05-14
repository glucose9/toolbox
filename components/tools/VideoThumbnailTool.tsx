"use client";

import { useEffect, useRef, useState } from "react";

function fmtTime(s: number): string {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function fmtBytes(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function VideoThumbnailTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [shots, setShots] = useState<{ t: number; url: string; blob: Blob }[]>([]);
  const [format, setFormat] = useState<"png" | "jpeg">("png");

  useEffect(() => {
    return () => {
      if (srcUrl) URL.revokeObjectURL(srcUrl);
      shots.forEach((s) => URL.revokeObjectURL(s.url));
    };
  }, [srcUrl, shots]);

  const handleFile = (f: File) => {
    setFile(f);
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    setSrcUrl(URL.createObjectURL(f));
    shots.forEach((s) => URL.revokeObjectURL(s.url));
    setShots([]);
  };

  const onMeta = () => {
    const d = videoRef.current?.duration ?? 0;
    setDuration(d);
    setTime(0);
  };

  const capture = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = time;
    await new Promise((resolve) => {
      const handler = () => {
        v.removeEventListener("seeked", handler);
        resolve(null);
      };
      v.addEventListener("seeked", handler);
    });
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    const mime = format === "png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob>((resolve, reject) =>
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("캡처 실패"))), mime, 0.92)
    );
    setShots((s) => [...s, { t: time, url: URL.createObjectURL(blob), blob }]);
  };

  const download = (shot: { t: number; blob: Blob }) => {
    if (!file) return;
    const ext = format === "png" ? "png" : "jpg";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(shot.blob);
    a.download = file.name.replace(/\.[^.]+$/, "") + `_${Math.round(shot.t)}s.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
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
          <div className="text-5xl mb-3">🖼️</div>
          <div className="font-medium">동영상을 드래그하거나 클릭</div>
          <input ref={inputRef} type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm truncate font-medium">{file.name}</div>
        <button onClick={() => { setFile(null); setShots([]); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <video ref={videoRef} src={srcUrl} controls onLoadedMetadata={onMeta} onTimeUpdate={() => setTime(videoRef.current?.currentTime ?? 0)} className="w-full max-h-96 rounded border border-gray-200 dark:border-gray-700" />

      <div className="grid grid-cols-3 gap-3 text-sm items-end">
        <label className="col-span-2">
          시점 ({fmtTime(time)} / {fmtTime(duration)})
          <input type="range" min="0" max={duration} step="0.1" value={time} onChange={(e) => { const t = +e.target.value; setTime(t); if (videoRef.current) videoRef.current.currentTime = t; }} className="w-full" />
        </label>
        <div>
          <label className="label">포맷</label>
          <div className="flex gap-1">
            <button onClick={() => setFormat("png")} className={`btn ${format === "png" ? "btn-primary" : "btn-secondary"}`}>PNG</button>
            <button onClick={() => setFormat("jpeg")} className={`btn ${format === "jpeg" ? "btn-primary" : "btn-secondary"}`}>JPG</button>
          </div>
        </div>
      </div>

      <button onClick={capture} disabled={duration === 0} className="btn btn-primary disabled:opacity-50">📸 현재 시점 캡처</button>

      {shots.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">캡처 ({shots.length})</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {shots.map((s, i) => (
              <div key={i} className="space-y-1">
                <img src={s.url} alt="" className="w-full rounded border border-gray-200 dark:border-gray-700" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{fmtTime(s.t)} · {fmtBytes(s.blob.size)}</span>
                  <button onClick={() => download(s)} className="text-brand-600 hover:underline">다운로드</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
