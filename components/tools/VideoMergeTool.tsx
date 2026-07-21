"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function VideoMergeTool() {
  const t = useTranslations("toolUI.video-merge");
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [outUrl, setOutUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingFf, setLoadingFf] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

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

  // Read a clip's pixel dimensions via a detached <video>. Resolves null when the
  // browser cannot decode the container, so an unknown size never forces a path.
  const probeSize = (f: File) =>
    new Promise<{ w: number; h: number } | null>((resolve) => {
      const url = URL.createObjectURL(f);
      const v = document.createElement("video");
      let settled = false;
      let timer = 0;
      const finish = (r: { w: number; h: number } | null) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        v.onloadedmetadata = null;
        v.onerror = null;
        v.removeAttribute("src");
        v.load(); // release the pending fetch before the URL goes away
        URL.revokeObjectURL(url);
        resolve(r);
      };
      timer = window.setTimeout(() => finish(null), 10000);
      v.preload = "metadata";
      v.muted = true;
      v.onloadedmetadata = () => finish(v.videoWidth && v.videoHeight ? { w: v.videoWidth, h: v.videoHeight } : null);
      v.onerror = () => finish(null);
      v.src = url;
    });

  const merge = async () => {
    if (files.length < 2) return;
    setBusy(true); setError(""); setWarning("");
    const notes: string[] = [];
    try {
      const ff = await loadFf();
      const names: string[] = [];
      const list: string[] = [];
      for (let i = 0; i < files.length; i++) {
        // Keep original extension so ffmpeg picks the right demuxer.
        const ext = (files[i].name.match(/\.(\w{1,5})$/)?.[1] || "mp4").toLowerCase();
        const name = `in${i}.${ext}`;
        await ff.writeFile(name, await fetchFile(files[i]));
        names.push(name);
        list.push(`file '${name}'`);
      }
      // Fast path: stream-copy concat (only works when all inputs share the
      // same codec/resolution/timebase). If it fails or produces a dud file,
      // fall back to a full re-encode via the concat FILTER, normalizing every
      // input to 1280x720/30fps so mixed sources merge cleanly.
      await ff.writeFile("list.txt", new TextEncoder().encode(list.join("\n")));
      // Clear any stale outputs from a previous run on the reused instance.
      for (const f of ["out.mp4", "out2.mp4", "out3.mp4"]) {
        try { await ff.deleteFile(f); } catch { /* not present */ }
      }
      // concat + `-c copy` exits 0 even when inputs differ in resolution, writing
      // a file whose later segments are broken (mp4 keeps only the first avcC).
      // Detect that up front and skip the fast path entirely when sizes differ.
      const sizes = (await Promise.all(files.map(probeSize))).filter(
        (s): s is { w: number; h: number } => s !== null
      );
      const sizeMismatch = sizes.length > 1 && sizes.some((s) => s.w !== sizes[0].w || s.h !== sizes[0].h);
      let data: Uint8Array;
      try {
        if (sizeMismatch) throw new Error("resolution mismatch");
        // exec resolves with the exit code (does NOT reject on ffmpeg failure).
        const copyCode = await ff.exec(["-f", "concat", "-safe", "0", "-i", "list.txt", "-c", "copy", "out.mp4"]);
        if (copyCode !== 0) throw new Error("copy concat failed");
        data = (await ff.readFile("out.mp4")) as Uint8Array;
        if (data.byteLength < 1024) throw new Error("copy concat produced empty output");
      } catch {
        if (sizeMismatch) notes.push(t("resolutionNormalized"));
        const n = files.length;
        const inputs = names.flatMap((name) => ["-i", name]);
        const norm = (i: number) =>
          `[${i}:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v${i}]`;
        // Attempt 1: video+audio. Attempt 2 (some inputs have no audio): video only.
        const filterAV =
          names.map((_, i) => `${norm(i)};[${i}:a]aresample=44100[a${i}]`).join(";") +
          ";" + names.map((_, i) => `[v${i}][a${i}]`).join("") + `concat=n=${n}:v=1:a=1[v][a]`;
        const avCode = await ff.exec([...inputs, "-filter_complex", filterAV, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "veryfast", "-c:a", "aac", "out2.mp4"]);
        if (avCode === 0) {
          data = (await ff.readFile("out2.mp4")) as Uint8Array;
        } else {
          const filterV =
            names.map((_, i) => norm(i)).join(";") +
            ";" + names.map((_, i) => `[v${i}]`).join("") + `concat=n=${n}:v=1:a=0[v]`;
          const vCode = await ff.exec([...inputs, "-filter_complex", filterV, "-map", "[v]", "-c:v", "libx264", "-preset", "veryfast", "-an", "out3.mp4"]);
          if (vCode !== 0) throw new Error("merge failed");
          data = (await ff.readFile("out3.mp4")) as Uint8Array;
          notes.push(t("audioDropped"));
        }
      }
      const ab = new ArrayBuffer(data.byteLength); new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: "video/mp4" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      if (notes.length) setWarning(notes.join(" "));
    } catch (e) { setError((e as Error).message + " " + t("codecHint")); }
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
        <div className="text-sm mt-1">{t("addVideos")}</div>
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
      {loadingFf && <div className="text-sm text-muted">{t("loadingFfmpeg")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {warning && <div className="text-sm text-amber-600">{warning}</div>}
      <div className="flex gap-2">
        <button onClick={merge} disabled={busy || files.length < 2} className="btn btn-primary disabled:opacity-50">{busy ? t("merging") : t("merge")}</button>
        {outUrl && <button onClick={download} className="btn btn-secondary">{t("download")}</button>}
      </div>
      {outUrl && <video src={outUrl} controls className="w-full max-h-72 rounded" />}
    </div>
  );
}
