"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { getFFmpeg, ffmpegFetchFile } from "@/lib/ffmpeg";
import { VideoDropzone, StatusBar, fmtBytes } from "./VideoBase";

export default function VideoCompressTool() {
  const t = useTranslations("toolUI.video-compress");
  const PRESETS = [
    { key: "high", label: t("presetHigh"), crf: 23 },
    { key: "medium", label: t("presetMedium"), crf: 28 },
    { key: "low", label: t("presetLow"), crf: 33 },
  ];

  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState("medium");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<{ url: string; size: number } | null>(null);

  const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setOutput(null);
    setProgress(0);
    let ffRef: Awaited<ReturnType<typeof getFFmpeg>> | null = null;
    const onP = ({ progress }: { progress: number }) => setProgress(progress * 100);
    try {
      const ff = await getFFmpeg((s) => setStatus(s));
      ffRef = ff;
      ff.on("progress", onP);
      const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
      const inputName = `input.${ext}`;
      const crf = PRESETS.find((p) => p.key === preset)?.crf ?? 28;
      setStatus(t("statusLoading"));
      await ff.writeFile(inputName, await ffmpegFetchFile(file));
      setStatus(t("statusCompressing", { crf }));
      const outName = `out_${Date.now()}.mp4`;
      await ff.exec([
        "-y",
        "-i", inputName,
        "-vcodec", "libx264",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-crf", String(crf),
        "-preset", "veryfast",
        "-acodec", "aac",
        "-b:a", "128k",
        outName,
      ]);
      const data = (await ff.readFile(outName)) as Uint8Array;
      try { await ff.deleteFile(outName); } catch {}
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      setOutput({ url: URL.createObjectURL(blob), size: blob.size });
      setStatus(t("statusDone"));
    } catch (e) {
      setStatus(t("statusFailed", { msg: (e as Error).message }));
    } finally {
      try { ffRef?.off("progress", onP); } catch {}
      setBusy(false);
    }
  };

  const download = () => {
    if (!output || !file) return;
    const a = document.createElement("a");
    a.href = output.url;
    a.download = file.name.replace(/\.[^.]+$/, "") + "-compressed.mp4";
    a.click();
  };

  return (
    <div className="card">
      {!file ? (
        <VideoDropzone onFile={setFile} />
      ) : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium mb-2">{t("originalSize", { size: fmtBytes(file.size) })}</div>
              <video src={fileUrl ?? undefined} controls className="w-full max-h-60 rounded border border-gray-200" />
              <button onClick={() => { setFile(null); setOutput(null); }} className="mt-2 text-sm text-brand-600 hover:underline">
                {t("chooseOther")}
              </button>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">{t("compressedSize")} {output && `(${fmtBytes(output.size)})`}</div>
              {output ? (
                <>
                  <video src={output.url} controls className="w-full max-h-60 rounded border border-gray-200" />
                  <div className={`mt-2 text-sm font-medium ${output.size < file.size ? "text-green-600" : "text-amber-600"}`}>
                    {output.size < file.size
                      ? t("savedPct", { pct: Math.round((1 - output.size / file.size) * 100) })
                      : t("increasedPct", { pct: Math.round((output.size / file.size - 1) * 100) })}
                  </div>
                  <button onClick={download} className="btn btn-primary mt-3">{t("downloadMp4")}</button>
                </>
              ) : (
                <div className="h-60 flex items-center justify-center bg-gray-50 rounded text-gray-400 text-sm">
                  {t("placeholder")}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="label">{t("compressionLevel")}</label>
            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPreset(p.key)}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    preset === p.key ? "border-brand-600 bg-brand-50 text-brand-700" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">
            {busy ? t("compressing") : t("startCompress")}
          </button>

          <StatusBar status={status} busy={busy} progress={progress} />
        </div>
      )}
    </div>
  );
}
