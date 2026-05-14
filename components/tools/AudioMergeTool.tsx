"use client";
import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function AudioMergeTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [files, setFiles] = useState<File[]>([]);
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
    if (files.length < 2) return;
    setBusy(true); setError("");
    try {
      const ff = await loadFf();
      const list: string[] = [];
      for (let i = 0; i < files.length; i++) {
        await ff.writeFile(`in${i}.mp3`, await fetchFile(files[i]));
        list.push(`file 'in${i}.mp3'`);
      }
      await ff.writeFile("list.txt", new TextEncoder().encode(list.join("\n")));
      await ff.exec(["-f", "concat", "-safe", "0", "-i", "list.txt", "-c", "copy", "out.mp3"]);
      const data = (await ff.readFile("out.mp3")) as Uint8Array;
      const ab = new ArrayBuffer(data.byteLength); new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: "audio/mpeg" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <div className="card space-y-3">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-brand-500">
        <div className="text-3xl">🎵</div>
        <div className="text-sm mt-1">오디오 추가 (여러 개)</div>
        <input ref={inputRef} type="file" accept="audio/*" multiple onChange={(e) => e.target.files && setFiles((p) => [...p, ...Array.from(e.target.files!)])} className="hidden" />
      </div>
      {files.length > 0 && (
        <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
          {files.map((f, i) => <div key={i} className="flex items-center p-2 text-sm"><span className="flex-1 truncate">{i + 1}. {f.name}</span><button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-red-600">×</button></div>)}
        </div>
      )}
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={run} disabled={busy || files.length < 2} className="btn btn-primary disabled:opacity-50">{busy ? "합치는 중..." : "🎵 합치기"}</button>
      {outUrl && (<><audio src={outUrl} controls className="w-full" /><button onClick={() => { const a = document.createElement("a"); a.href = outUrl; a.download = "merged.mp3"; a.click(); }} className="btn btn-secondary">📥 다운로드</button></>)}
    </div>
  );
}
