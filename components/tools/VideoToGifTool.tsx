"use client";

import { useState } from "react";
import { getFFmpeg, ffmpegFetchFile } from "@/lib/ffmpeg";
import { VideoDropzone, StatusBar, fmtBytes } from "./VideoBase";

export default function VideoToGifTool() {
  const [file, setFile] = useState<File | null>(null);
  const [fps, setFps] = useState(10);
  const [width, setWidth] = useState(320);
  const [maxSeconds, setMaxSeconds] = useState(10);
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
      setStatus("GIF 변환 중...");
      await ff.exec([
        "-i", inputName,
        "-t", String(maxSeconds),
        "-vf", `fps=${fps},scale=${width}:-1:flags=lanczos`,
        "-loop", "0",
        "out.gif",
      ]);
      const data = (await ff.readFile("out.gif")) as Uint8Array;
      const blob = new Blob([data as BlobPart], { type: "image/gif" });
      setOutput({ url: URL.createObjectURL(blob), size: blob.size });
      setStatus("완료");
    } catch (e) {
      setStatus("실패: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!output) return;
    const a = document.createElement("a");
    a.href = output.url;
    a.download = "converted.gif";
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
              <div className="text-sm font-medium mb-2">원본 ({fmtBytes(file.size)})</div>
              <video src={URL.createObjectURL(file)} controls className="w-full max-h-60 rounded border border-gray-200" />
              <button onClick={() => { setFile(null); setOutput(null); }} className="mt-2 text-sm text-brand-600 hover:underline">
                다른 파일 선택
              </button>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">결과 {output && `(${fmtBytes(output.size)})`}</div>
              {output ? (
                <>
                  <img src={output.url} className="w-full max-h-60 rounded border border-gray-200" alt="GIF" />
                  <button onClick={download} className="btn btn-primary mt-3">GIF 다운로드</button>
                </>
              ) : (
                <div className="h-60 flex items-center justify-center bg-gray-50 rounded text-gray-400 text-sm">
                  설정 후 변환 시작
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="label">프레임/초 (FPS): {fps}</label>
              <input type="range" min="5" max="30" value={fps} onChange={(e) => setFps(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="label">가로 (px): {width}</label>
              <input type="range" min="160" max="640" step="40" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="label">최대 길이 (초): {maxSeconds}</label>
              <input type="range" min="1" max="30" value={maxSeconds} onChange={(e) => setMaxSeconds(parseInt(e.target.value))} className="w-full" />
            </div>
          </div>

          <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">
            {busy ? "변환 중..." : "GIF로 변환"}
          </button>

          <StatusBar status={status} busy={busy} progress={progress} />
        </div>
      )}
    </div>
  );
}
