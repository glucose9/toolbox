"use client";
import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const PRESETS = [
  { label: "4K (3840×2160)", w: 3840, h: 2160 },
  { label: "1080p (1920×1080)", w: 1920, h: 1080 },
  { label: "720p (1280×720)", w: 1280, h: 720 },
  { label: "480p (854×480)", w: 854, h: 480 },
  { label: "360p (640×360)", w: 640, h: 360 },
];

export default function VideoResizeTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [presetIdx, setPresetIdx] = useState(2);
  const [outUrl, setOutUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadFf = async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    const ff = new FFmpeg();
    const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    await ff.load({ coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"), wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm") });
    ffmpegRef.current = ff;
    return ff;
  };

  const run = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const ff = await loadFf();
      const ext = file.name.split(".").pop() || "mp4";
      await ff.writeFile(`in.${ext}`, await fetchFile(file));
      const p = PRESETS[presetIdx];
      await ff.exec(["-i", `in.${ext}`, "-vf", `scale=${p.w}:${p.h}:force_original_aspect_ratio=decrease,pad=${p.w}:${p.h}:(ow-iw)/2:(oh-ih)/2`, "-preset", "veryfast", "out.mp4"]);
      const data = (await ff.readFile("out.mp4")) as Uint8Array;
      const ab = new ArrayBuffer(data.byteLength); new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: "video/mp4" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">📐</div>
        <div className="font-medium mt-2">동영상 업로드</div>
        <input ref={inputRef} type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div className="text-sm font-medium truncate">{file.name}</div>
      <select value={presetIdx} onChange={(e) => setPresetIdx(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
        {PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
      </select>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "처리 중..." : "리사이즈"}</button>
      {outUrl && (
        <>
          <video src={outUrl} controls className="w-full max-h-72 rounded" />
          <button onClick={() => { const a = document.createElement("a"); a.href = outUrl; a.download = "resized.mp4"; a.click(); }} className="btn btn-secondary">📥 다운로드</button>
        </>
      )}
    </div>
  );
}
