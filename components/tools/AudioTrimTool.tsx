"use client";

import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

function fmtTime(s: number): string {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function fmtBytes(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function AudioTrimTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [outUrl, setOutUrl] = useState("");
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [loadingFfmpeg, setLoadingFfmpeg] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return () => {
      if (srcUrl) URL.revokeObjectURL(srcUrl);
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
  }, [srcUrl, outUrl]);

  const loadFfmpeg = async () => {
    if (ready) return ffmpegRef.current!;
    setLoadingFfmpeg(true);
    try {
      const ff = new FFmpeg();
      const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ff.load({
        coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
      });
      ffmpegRef.current = ff;
      setReady(true);
      return ff;
    } finally {
      setLoadingFfmpeg(false);
    }
  };

  const handleFile = (f: File) => {
    setError("");
    setFile(f);
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    const url = URL.createObjectURL(f);
    setSrcUrl(url);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl("");
    setOutSize(0);
  };

  const onMeta = () => {
    const d = audioRef.current?.duration ?? 0;
    setDuration(d);
    setStart(0);
    setEnd(d);
  };

  const trim = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const ff = await loadFfmpeg();
      const ext = file.name.split(".").pop()?.toLowerCase() || "mp3";
      const inName = `in.${ext}`;
      const outExt = ext === "wav" || ext === "flac" ? ext : "mp3";
      const outName = `out.${outExt}`;
      await ff.writeFile(inName, await fetchFile(file));
      const dur = (end - start).toFixed(2);
      const ss = start.toFixed(2);
      const args = ["-ss", ss, "-t", dur, "-i", inName];
      if (outExt === "mp3") args.push("-codec:a", "libmp3lame", "-q:a", "2");
      else args.push("-c", "copy");
      args.push(outName);
      await ff.exec(args);
      const data = (await ff.readFile(outName)) as Uint8Array;
      const ab = new ArrayBuffer(data.byteLength);
      new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: outExt === "wav" ? "audio/wav" : outExt === "flac" ? "audio/flac" : "audio/mpeg" });
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
    const ext = file.name.split(".").pop()?.toLowerCase();
    const outExt = ext === "wav" || ext === "flac" ? ext : "mp3";
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = file.name.replace(/\.[^.]+$/, "") + `_trim.${outExt}`;
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
          <div className="text-5xl mb-3">🎚️</div>
          <div className="font-medium">오디오 파일을 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">처음 한 번 ffmpeg.wasm 엔진(~25MB) 로드됨</div>
          <input ref={inputRef} type="file" accept="audio/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">{fmtBytes(file.size)}{duration > 0 && ` · ${fmtTime(duration)}`}</div>
        </div>
        <button onClick={() => { setFile(null); setSrcUrl(""); setOutUrl(""); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <audio ref={audioRef} src={srcUrl} controls onLoadedMetadata={onMeta} className="w-full" />

      {duration > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <label>
              시작 ({fmtTime(start)})
              <input type="range" min="0" max={duration} step="0.1" value={start} onChange={(e) => setStart(Math.min(+e.target.value, end - 0.1))} className="w-full" />
            </label>
            <label>
              끝 ({fmtTime(end)})
              <input type="range" min="0" max={duration} step="0.1" value={end} onChange={(e) => setEnd(Math.max(+e.target.value, start + 0.1))} className="w-full" />
            </label>
          </div>
          <div className="text-sm">길이: <strong>{fmtTime(end - start)}</strong></div>
        </div>
      )}

      {loadingFfmpeg && <div className="text-sm text-muted">ffmpeg.wasm 로딩 중 (~25MB)...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex gap-2">
        <button onClick={trim} disabled={busy || duration === 0 || end - start <= 0} className="btn btn-primary disabled:opacity-50">
          {busy ? "처리 중..." : "✂️ 자르기"}
        </button>
        {outUrl && <button onClick={download} className="btn btn-secondary">📥 다운로드 ({fmtBytes(outSize)})</button>}
      </div>

      {outUrl && (
        <div>
          <label className="label">결과 미리듣기</label>
          <audio src={outUrl} controls className="w-full" />
        </div>
      )}
    </div>
  );
}
