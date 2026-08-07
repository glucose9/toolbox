"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { getFFmpeg } from "@/lib/ffmpeg";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function GifToMp4Tool() {
  const t = useTranslations("toolUI.gif-to-mp4");
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState("");
  const [outUrl, setOutUrl] = useState("");
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [loadingFf, setLoadingFf] = useState(false);
  const [error, setError] = useState("");

  const loadFf = async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    setLoadingFf(true);
    try {
      // Shared loader (lib/ffmpeg): passes classWorkerURL — without it the
      // bundled @ffmpeg/ffmpeg never spawns its worker and load() hangs forever.
      const ff = await getFFmpeg();
      ffmpegRef.current = ff;
      return ff;
    } finally {
      setLoadingFf(false);
    }
  };

  const handleFile = (f: File) => {
    if (!/\.gif$/i.test(f.name) && f.type !== "image/gif") {
      setError(t("errGifOnly"));
      return;
    }
    setError("");
    setFile(f);
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    setSrcUrl(URL.createObjectURL(f));
    setOutUrl("");
    setOutSize(0);
    // No options to configure — convert immediately. Pass f directly since
    // setFile hasn't committed yet; busy guard in convert prevents overlap.
    void convert(f);
  };

  const convert = async (f: File | null = file) => {
    if (!f || busy) return;
    setBusy(true);
    setError("");
    try {
      const ff = await loadFf();
      await ff.writeFile("in.gif", await fetchFile(f));
      const outName = `out_${Date.now()}.mp4`;
      await ff.exec([
        "-y",
        "-i", "in.gif",
        "-movflags", "faststart",
        "-pix_fmt", "yuv420p",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        outName,
      ]);
      const data = (await ff.readFile(outName)) as Uint8Array;
      try { await ff.deleteFile(outName); } catch {}
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
    a.download = file.name.replace(/\.gif$/i, "") + ".mp4";
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
          <div className="text-5xl mb-3">🎬</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">{t("ffmpegHint")}</div>
          <input ref={inputRef} type="file" accept=".gif,image/gif" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
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
          <div className="text-xs text-muted">{fmt(file.size)}{outSize > 0 && ` → ${fmt(outSize)} (MP4)`}</div>
        </div>
        <button onClick={() => { setFile(null); setOutUrl(""); }} className="text-sm text-brand-600 hover:underline">{t("otherFile")}</button>
      </div>

      {srcUrl && <img src={srcUrl} alt="" className="max-w-full max-h-72 mx-auto rounded border border-gray-200 dark:border-gray-700" />}

      {loadingFf && <div className="text-sm text-muted">{t("loadingFfmpeg")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex gap-2">
        <button onClick={() => convert()} disabled={busy} className="btn btn-primary disabled:opacity-50">
          {busy ? t("converting") : t("convertToMp4")}
        </button>
        {outUrl && <button onClick={download} className="btn btn-secondary">{t("download")}</button>}
      </div>

      {outUrl && (
        <video src={outUrl} controls autoPlay loop muted className="w-full max-h-72 rounded border border-gray-200 dark:border-gray-700" />
      )}
    </div>
  );
}
