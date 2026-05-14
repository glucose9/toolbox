"use client";
import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function AudioVolumeTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [db, setDb] = useState(6);
  const [outUrl, setOutUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      if (!ffmpegRef.current) {
        const ff = new FFmpeg();
        const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        await ff.load({ coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"), wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm") });
        ffmpegRef.current = ff;
      }
      const ff = ffmpegRef.current;
      const ext = file.name.split(".").pop() || "mp3";
      await ff.writeFile(`in.${ext}`, await fetchFile(file));
      await ff.exec(["-i", `in.${ext}`, "-filter:a", `volume=${db}dB`, "out.mp3"]);
      const data = (await ff.readFile("out.mp3")) as Uint8Array;
      const ab = new ArrayBuffer(data.byteLength); new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: "audio/mpeg" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">🔉</div>
        <div className="font-medium mt-2">오디오 업로드</div>
        <input ref={inputRef} type="file" accept="audio/*" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div className="text-sm font-medium truncate">{file.name}</div>
      <label className="text-sm">볼륨 ({db > 0 ? "+" : ""}{db} dB)<input type="range" min="-30" max="30" value={db} onChange={(e) => setDb(+e.target.value)} className="w-full" /></label>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "처리 중..." : "🔉 적용"}</button>
      {outUrl && (<><audio src={outUrl} controls className="w-full" /><button onClick={() => { const a = document.createElement("a"); a.href = outUrl; a.download = "vol.mp3"; a.click(); }} className="btn btn-secondary">📥 다운로드</button></>)}
    </div>
  );
}
