"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getFFmpeg, ffmpegFetchFile } from "@/lib/ffmpeg";
import { VideoDropzone, StatusBar, fmtBytes } from "./VideoBase";

function fmtTime(s: number) {
  const mm = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  const ms = Math.floor((s % 1) * 100);
  return `${mm}:${ss.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}

export default function VideoTrimTool() {
  const t = useTranslations("toolUI.video-trim");
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<{ url: string; size: number; ext: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const handleFile = (f: File) => {
    setFile(f);
    setOutput(null);
    setStart(0);
    setEnd(0);
  };

  const onLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const d = e.currentTarget.duration;
    setDuration(d);
    setEnd(d);
  };

  const run = async () => {
    if (!file || end <= start) return;
    setBusy(true);
    setOutput(null);
    setProgress(0);
    try {
      const ff = await getFFmpeg((s) => setStatus(s));
      ff.on("progress", ({ progress }) => setProgress(progress * 100));
      const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
      const inputName = `input.${ext}`;
      setStatus(t("statusLoading"));
      await ff.writeFile(inputName, await ffmpegFetchFile(file));
      setStatus(t("statusTrimming", { start: fmtTime(start), end: fmtTime(end) }));
      let outName = `out_${Date.now()}.${ext === "webm" ? "webm" : "mp4"}`;
      const ret = await ff.exec([
        "-y",
        "-ss", String(start),
        "-to", String(end),
        "-i", inputName,
        "-c", "copy",
        outName,
      ]);
      if (ret !== 0) {
        // stream copy can fail when the source codec has no mp4 container tag (e.g. VP8)
        try { await ff.deleteFile(outName); } catch {}
        outName = `out_${Date.now()}_re.mp4`;
        setStatus(t("statusReencoding"));
        await ff.exec([
          "-y",
          "-ss", String(start),
          "-to", String(end),
          "-i", inputName,
          "-c:v", "libx264",
          "-preset", "veryfast",
          "-crf", "23",
          "-c:a", "aac",
          "-b:a", "128k",
          outName,
        ]);
      }
      const outExt = outName.endsWith(".webm") ? "webm" : "mp4";
      const data = (await ff.readFile(outName)) as Uint8Array;
      try { await ff.deleteFile(outName); } catch {}
      const blob = new Blob([data as BlobPart], { type: `video/${outExt}` });
      setOutput({ url: URL.createObjectURL(blob), size: blob.size, ext: outExt });
      setStatus(t("statusDone"));
    } catch (e) {
      setStatus(t("statusFailed") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!output || !file) return;
    const a = document.createElement("a");
    a.href = output.url;
    a.download = file.name.replace(/\.[^.]+$/, "") + "-trimmed." + output.ext;
    a.click();
  };

  const seekTo = (t: number) => {
    if (videoRef.current) videoRef.current.currentTime = t;
  };

  return (
    <div className="card">
      {!file ? (
        <VideoDropzone onFile={handleFile} />
      ) : (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">{t("original")} ({fmtBytes(file.size)})</div>
            <video
              ref={videoRef}
              src={fileUrl ?? undefined}
              controls
              onLoadedMetadata={onLoadedMetadata}
              className="w-full max-h-80 rounded border border-gray-200 bg-black"
            />
          </div>

          {duration > 0 && (
            <>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t("start")}: {fmtTime(start)}</span>
                  <button onClick={() => seekTo(start)} className="text-brand-600 hover:underline">{t("previewStart")}</button>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={start}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setStart(Math.min(v, end - 0.1));
                  }}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t("end")}: {fmtTime(end)}</span>
                  <button onClick={() => seekTo(end)} className="text-brand-600 hover:underline">{t("previewEnd")}</button>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={end}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setEnd(Math.max(v, start + 0.1));
                  }}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: t("trimLength", { trim: fmtTime(end - start), total: fmtTime(duration) }) }} />
              <div className="text-xs text-gray-500">{t("keyframeNotice")}</div>
            </>
          )}

          <div className="flex gap-2">
            <button onClick={run} disabled={busy || end <= start} className="btn btn-primary disabled:opacity-50">
              {busy ? t("processing") : t("trimButton")}
            </button>
            <button onClick={() => { setFile(null); setOutput(null); }} className="btn btn-secondary">
              {t("otherFile")}
            </button>
          </div>

          <StatusBar status={status} busy={busy} progress={progress} />

          {output && (
            <div>
              <div className="text-sm font-medium mb-2">{t("result")} ({fmtBytes(output.size)})</div>
              <video src={output.url} controls className="w-full max-h-60 rounded border border-gray-200" />
              <button onClick={download} className="btn btn-primary mt-3">{t("downloadExt", { ext: output.ext.toUpperCase() })}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
