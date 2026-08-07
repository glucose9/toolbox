"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { getFFmpeg } from "@/lib/ffmpeg";

export default function VideoMuteTool() {
  const t = useTranslations("toolUI.video-mute");
  const inputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [outUrl, setOutUrl] = useState("");
  const [outExt, setOutExt] = useState("mp4");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadFf = async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    const ff = await getFFmpeg();
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
      let outName = `out_${Date.now()}.${ext.toLowerCase() === "webm" ? "webm" : "mp4"}`;
      const ret = await ff.exec(["-y", "-i", `in.${ext}`, "-c:v", "copy", "-an", outName]);
      if (ret !== 0) {
        // stream copy fails when the source codec has no mp4 container tag (e.g. VP8)
        try { await ff.deleteFile(outName); } catch {}
        outName = `out_${Date.now()}_re.mp4`;
        await ff.exec(["-y", "-i", `in.${ext}`, "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-an", outName]);
      }
      const resultExt = outName.endsWith(".webm") ? "webm" : "mp4";
      const data = (await ff.readFile(outName)) as Uint8Array;
      try { await ff.deleteFile(outName); } catch {}
      const ab = new ArrayBuffer(data.byteLength); new Uint8Array(ab).set(data);
      const blob = new Blob([ab], { type: `video/${resultExt}` });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutExt(resultExt);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <div className="card space-y-3">
      {!file ? (
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
          <div className="text-5xl">🔇</div>
          <div className="font-medium mt-2">{t("uploadVideo")}</div>
          <input ref={inputRef} type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} className="hidden" />
        </div>
      ) : (
        <>
          <div className="text-sm font-medium truncate">{file.name}</div>
          <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? t("processing") : t("mute")}</button>
          {error && <div className="text-sm text-red-600">{error}</div>}
          {outUrl && (
            <>
              <video src={outUrl} controls className="w-full max-h-72 rounded" />
              <button onClick={() => { const a = document.createElement("a"); a.href = outUrl; a.download = `muted.${outExt}`; a.click(); }} className="btn btn-secondary">{t("download")}</button>
            </>
          )}
          <button onClick={() => { setFile(null); setOutUrl(""); }} className="text-sm text-brand-600 hover:underline">{t("otherFile")}</button>
        </>
      )}
    </div>
  );
}
