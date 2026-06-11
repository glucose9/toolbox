"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function AudioMergeTool() {
  const t = useTranslations("toolUI.audio-merge");
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
      // Keep each file's original extension so ffmpeg picks the right demuxer,
      // then merge via the concat FILTER with re-encode to mp3. Unlike the
      // concat demuxer + "-c copy" (previous approach), this works when inputs
      // have different formats/codecs/bitrates (mp3 + wav + m4a etc.).
      const inputs: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const ext = (files[i].name.match(/\.(\w{1,5})$/)?.[1] || "mp3").toLowerCase();
        const name = `in${i}.${ext}`;
        await ff.writeFile(name, await fetchFile(files[i]));
        inputs.push("-i", name);
      }
      const n = files.length;
      const filter =
        files.map((_, i) => `[${i}:a]`).join("") + `concat=n=${n}:v=0:a=1[a]`;
      try { await ff.deleteFile("out.mp3"); } catch { /* not present */ }
      // exec resolves with the exit code (does NOT reject on ffmpeg failure).
      const code = await ff.exec([
        ...inputs,
        "-filter_complex", filter,
        "-map", "[a]",
        "-c:a", "libmp3lame",
        "-b:a", "192k",
        "out.mp3",
      ]);
      if (code !== 0) throw new Error("merge failed");
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
        <div className="text-sm mt-1">{t("addAudio")}</div>
        <input ref={inputRef} type="file" accept="audio/*" multiple onChange={(e) => e.target.files && setFiles((p) => [...p, ...Array.from(e.target.files!)])} className="hidden" />
      </div>
      {files.length > 0 && (
        <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
          {files.map((f, i) => <div key={i} className="flex items-center p-2 text-sm"><span className="flex-1 truncate">{i + 1}. {f.name}</span><button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-red-600">×</button></div>)}
        </div>
      )}
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={run} disabled={busy || files.length < 2} className="btn btn-primary disabled:opacity-50">{busy ? t("merging") : t("merge")}</button>
      {outUrl && (<><audio src={outUrl} controls className="w-full" /><button onClick={() => { const a = document.createElement("a"); a.href = outUrl; a.download = "merged.mp3"; a.click(); }} className="btn btn-secondary">{t("download")}</button></>)}
    </div>
  );
}
