"use client";

import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function VideoMergeTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [outUrl, setOutUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingFf, setLoadingFf] = useState(false);
  const [error, setError] = useState("");

  const loadFf = async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    setLoadingFf(true);
    try {
      const ff = new FFmpeg();
      const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ff.load({ coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"), wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm") });
      ffmpegRef.current = ff;
      return ff;
    } finally { setLoadingFf(false); }
  };

  const add = (list: FileList) => {
    const vids = Array.from(list).filter((f) => f.type.startsWith("video/"));
    setFiles((p) => [...p, ...vids]);
  };

  const move = (i: number, dir: -1 | 1) => {
    const t = i + dir;
    if (t < 0 || t >= files.length) return;
    const next = [...files];
    [next[i], next[t]] = [next[t], next[i]];
    setFiles(next);
  };

  const merge = async () => {
    if (files.length < 2) return;
    setBusy(true); setError("");
    try {
      const ff = await loadFf();
      const list: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const name = `in${i}.mp4`;
        await ff.writeFile(name, await fetchFile(files[i]));
        list.push(`file '${name}'`);
      }
      await ff.writeFile("list.txt", new TextEncoder().encode(list.join("\n")));
      await ff.exec(["-f", "concat", "-safe", "0", "-i", "list.txt", "-c", "copy", "out.mp4"]);
      const data = (await ff.readFile("out.mp4")) as Uint8Array;
      const ab = new ArrayBuffer(data.byteLength); new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: "video/mp4" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError((e as Error).message + " (영상 코덱·해상도가 다르면 재인코딩이 필요할 수 있습니다)"); }
    finally { setBusy(false); }
  };

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl; a.download = `merged-${Date.now()}.mp4`; a.click();
  };

  return (
    <div className="card space-y-3">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-brand-500">
        <div className="text-3xl">🎞️</div>
        <div className="text-sm mt-1">동영상 추가 (여러 개)</div>
        <input ref={inputRef} type="file" accept="video/*" multiple onChange={(e) => e.target.files && add(e.target.files)} className="hidden" />
      </div>
      {files.length > 0 && (
        <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 p-2 text-sm">
              <span className="text-xs w-6 text-center text-muted">{i + 1}</span>
              <span className="flex-1 truncate">{f.name}</span>
              <button onClick={() => move(i, -1)} disabled={i === 0} className="px-1 disabled:opacity-30">▲</button>
              <button onClick={() => move(i, 1)} disabled={i === files.length - 1} className="px-1 disabled:opacity-30">▼</button>
              <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-red-600 px-1">×</button>
            </div>
          ))}
        </div>
      )}
      {loadingFf && <div className="text-sm text-muted">ffmpeg.wasm 로딩 중...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2">
        <button onClick={merge} disabled={busy || files.length < 2} className="btn btn-primary disabled:opacity-50">{busy ? "합치는 중..." : "🎞️ 합치기"}</button>
        {outUrl && <button onClick={download} className="btn btn-secondary">📥 다운로드</button>}
      </div>
      {outUrl && <video src={outUrl} controls className="w-full max-h-72 rounded" />}
    </div>
  );
}
