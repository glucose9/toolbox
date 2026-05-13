"use client";

import { useState } from "react";
import { getFFmpeg, ffmpegFetchFile } from "@/lib/ffmpeg";
import { VideoDropzone, StatusBar, fmtBytes } from "./VideoBase";

const PRESETS = [
  { key: "high", label: "고화질 (CRF 23)", crf: 23 },
  { key: "medium", label: "중간 (CRF 28) 추천", crf: 28 },
  { key: "low", label: "용량 우선 (CRF 33)", crf: 33 },
];

export default function VideoCompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState("medium");
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
      const crf = PRESETS.find((p) => p.key === preset)?.crf ?? 28;
      setStatus("파일 로드 중...");
      await ff.writeFile(inputName, await ffmpegFetchFile(file));
      setStatus(`압축 중 (CRF ${crf})... 동영상 길이에 따라 시간이 걸립니다`);
      await ff.exec([
        "-i", inputName,
        "-vcodec", "libx264",
        "-crf", String(crf),
        "-preset", "veryfast",
        "-acodec", "aac",
        "-b:a", "128k",
        "out.mp4",
      ]);
      const data = (await ff.readFile("out.mp4")) as Uint8Array;
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
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
              <div className="text-sm font-medium mb-2">원본 ({fmtBytes(file.size)})</div>
              <video src={URL.createObjectURL(file)} controls className="w-full max-h-60 rounded border border-gray-200" />
              <button onClick={() => { setFile(null); setOutput(null); }} className="mt-2 text-sm text-brand-600 hover:underline">
                다른 파일 선택
              </button>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">압축됨 {output && `(${fmtBytes(output.size)})`}</div>
              {output ? (
                <>
                  <video src={output.url} controls className="w-full max-h-60 rounded border border-gray-200" />
                  <div className="mt-2 text-sm font-medium text-green-600">
                    {Math.round((1 - output.size / file.size) * 100)}% 절감
                  </div>
                  <button onClick={download} className="btn btn-primary mt-3">MP4 다운로드</button>
                </>
              ) : (
                <div className="h-60 flex items-center justify-center bg-gray-50 rounded text-gray-400 text-sm">
                  품질 선택 후 압축 시작
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="label">압축 수준</label>
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
            {busy ? "압축 중..." : "압축 시작"}
          </button>

          <StatusBar status={status} busy={busy} progress={progress} />
        </div>
      )}
    </div>
  );
}
