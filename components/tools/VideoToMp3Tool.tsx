"use client";

import { useState } from "react";
import { getFFmpeg, ffmpegFetchFile } from "@/lib/ffmpeg";
import { VideoDropzone, StatusBar, fmtBytes } from "./VideoBase";

export default function VideoToMp3Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [bitrate, setBitrate] = useState(192);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<{ url: string; size: number } | null>(null);

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setOutput(null);
    setProgress(0);
    try {
      const ff = await getFFmpeg((s) => setStatus(s));
      ff.on("progress", ({ progress }) => setProgress(progress * 100));
      const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
      const inputName = `input.${ext}`;
      setStatus("파일 로드 중...");
      await ff.writeFile(inputName, await ffmpegFetchFile(file));
      setStatus("MP3 추출 중...");
      await ff.exec([
        "-i", inputName,
        "-vn",
        "-acodec", "libmp3lame",
        "-b:a", `${bitrate}k`,
        "out.mp3",
      ]);
      const data = (await ff.readFile("out.mp3")) as Uint8Array;
      const blob = new Blob([data as BlobPart], { type: "audio/mp3" });
      setOutput({ url: URL.createObjectURL(blob), size: blob.size });
      setStatus("완료");
    } catch (e) {
      setStatus("실패: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!output || !file) return;
    const a = document.createElement("a");
    a.href = output.url;
    a.download = file.name.replace(/\.[^.]+$/, "") + ".mp3";
    a.click();
  };

  return (
    <div className="card">
      {!file ? (
        <VideoDropzone onFile={setFile} hint="MP4 · MOV · WebM · MKV · AVI · MP3 · M4A" accept="video/*,audio/*" />
      ) : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium mb-2">원본 ({fmtBytes(file.size)})</div>
              <video src={URL.createObjectURL(file)} controls className="w-full max-h-60 rounded border border-gray-200" />
              <div className="mt-2 text-sm text-gray-600 truncate">{file.name}</div>
              <button onClick={() => { setFile(null); setOutput(null); }} className="mt-2 text-sm text-brand-600 hover:underline">
                다른 파일 선택
              </button>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">MP3 결과 {output && `(${fmtBytes(output.size)})`}</div>
              {output ? (
                <>
                  <audio src={output.url} controls className="w-full" />
                  <button onClick={download} className="btn btn-primary mt-3">MP3 다운로드</button>
                </>
              ) : (
                <div className="h-32 flex items-center justify-center bg-gray-50 rounded text-gray-400 text-sm">
                  변환 시작 후 표시됩니다
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="label">음질 (kbps): {bitrate}</label>
            <input type="range" min="64" max="320" step="32" value={bitrate} onChange={(e) => setBitrate(parseInt(e.target.value))} className="w-full" />
            <div className="text-xs text-gray-500 mt-1">128kbps = 일반, 192kbps = 좋음, 320kbps = 최고</div>
          </div>

          <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">
            {busy ? "추출 중..." : "MP3로 추출"}
          </button>

          <StatusBar status={status} busy={busy} progress={progress} />
        </div>
      )}
    </div>
  );
}
