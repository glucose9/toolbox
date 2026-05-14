"use client";

import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function VideoMuteTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
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
      await ff.exec(["-i", `in.${ext}`, "-c:v", "copy", "-an", "out.mp4"]);
      const data = (await ff.readFile("out.mp4")) as Uint8Array;
      const ab = new ArrayBuffer(data.byteLength); new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: "video/mp4" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <div className="card space-y-3">
      {!file ? (
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
          <div className="text-5xl">🔇</div>
          <div className="font-medium mt-2">동영상 업로드</div>
          <input ref={inputRef} type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} className="hidden" />
        </div>
      ) : (
        <>
          <div className="text-sm font-medium truncate">{file.name}</div>
          <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "처리 중..." : "🔇 무음으로 만들기"}</button>
          {error && <div className="text-sm text-red-600">{error}</div>}
          {outUrl && (
            <>
              <video src={outUrl} controls className="w-full max-h-72 rounded" />
              <button onClick={() => { const a = document.createElement("a"); a.href = outUrl; a.download = "muted.mp4"; a.click(); }} className="btn btn-secondary">📥 다운로드</button>
            </>
          )}
          <button onClick={() => { setFile(null); setOutUrl(""); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
        </>
      )}
    </div>
  );
}
