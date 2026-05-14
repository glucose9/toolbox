"use client";

import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

function fmtBytes(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

const SPEEDS = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4];

// Build atempo filter chain — each atempo accepts 0.5–2.0
function audioFilter(speed: number): string {
  const filters: string[] = [];
  let remaining = speed;
  while (remaining > 2) {
    filters.push("atempo=2.0");
    remaining /= 2;
  }
  while (remaining < 0.5) {
    filters.push("atempo=0.5");
    remaining /= 0.5;
  }
  filters.push(`atempo=${remaining.toFixed(4)}`);
  return filters.join(",");
}

export default function VideoSpeedTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState("");
  const [outUrl, setOutUrl] = useState("");
  const [outSize, setOutSize] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [busy, setBusy] = useState(false);
  const [loadingFf, setLoadingFf] = useState(false);
  const [error, setError] = useState("");

  const loadFf = async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    setLoadingFf(true);
    try {
      const ff = new FFmpeg();
      const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ff.load({
        coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
      });
      ffmpegRef.current = ff;
      return ff;
    } finally {
      setLoadingFf(false);
    }
  };

  const handleFile = (f: File) => {
    if (!f.type.startsWith("video/")) {
      setError("동영상 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    setSrcUrl(URL.createObjectURL(f));
    setOutUrl("");
    setOutSize(0);
  };

  const apply = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const ff = await loadFf();
      const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
      await ff.writeFile(`in.${ext}`, await fetchFile(file));
      const ptsFactor = (1 / speed).toFixed(4);
      const aFilter = audioFilter(speed);
      await ff.exec([
        "-i", `in.${ext}`,
        "-vf", `setpts=${ptsFactor}*PTS`,
        "-af", aFilter,
        "-preset", "veryfast",
        "out.mp4",
      ]);
      const data = (await ff.readFile("out.mp4")) as Uint8Array;
      const ab = new ArrayBuffer(data.byteLength);
      new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: "video/mp4" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!outUrl || !file) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = file.name.replace(/\.[^.]+$/, "") + `_${speed}x.mp4`;
    a.click();
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
          <div className="text-5xl mb-3">⏩</div>
          <div className="font-medium">동영상을 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">처음 한 번 ffmpeg.wasm(~25MB) 로드됨</div>
          <input ref={inputRef} type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          {outSize > 0 && <div className="text-xs text-muted">결과: {fmtBytes(outSize)}</div>}
        </div>
        <button onClick={() => { setFile(null); setOutUrl(""); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <video src={srcUrl} controls className="w-full max-h-72 rounded border border-gray-200 dark:border-gray-700" />

      <div>
        <label className="label">속도 배율</label>
        <div className="flex flex-wrap gap-2">
          {SPEEDS.map((s) => (
            <button key={s} onClick={() => setSpeed(s)} className={`btn ${speed === s ? "btn-primary" : "btn-secondary"}`}>
              {s}x
            </button>
          ))}
        </div>
      </div>

      {loadingFf && <div className="text-sm text-muted">ffmpeg.wasm 로딩 중...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex gap-2">
        <button onClick={apply} disabled={busy} className="btn btn-primary disabled:opacity-50">
          {busy ? "처리 중... (긴 영상은 몇 분)" : `⏩ ${speed}x로 변환`}
        </button>
        {outUrl && <button onClick={download} className="btn btn-secondary">📥 다운로드</button>}
      </div>

      {outUrl && <video src={outUrl} controls className="w-full max-h-72 rounded border border-gray-200 dark:border-gray-700" />}
    </div>
  );
}
