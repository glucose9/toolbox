"use client";

import { useState } from "react";
import { getFFmpeg, ffmpegFetchFile } from "@/lib/ffmpeg";
import { VideoDropzone, StatusBar, fmtBytes } from "./VideoBase";

type Resize = "" | "1920:-2" | "1280:-2" | "854:-2" | "640:-2" | "426:-2";
const RESIZE_LABEL: Record<Resize, string> = {
  "": "원본 유지",
  "1920:-2": "4K → 1080p (가로 1920)",
  "1280:-2": "720p (가로 1280)",
  "854:-2": "480p (가로 854)",
  "640:-2": "360p (가로 640)",
  "426:-2": "240p (가로 426)",
};

const ROTATE_OPTS = [
  { value: "", label: "회전 없음" },
  { value: "90", label: "90° (시계방향)" },
  { value: "180", label: "180°" },
  { value: "270", label: "270° (시계반방)" },
  { value: "hflip", label: "좌우 반전" },
  { value: "vflip", label: "상하 반전" },
];

const SPEED_OPTS = [
  { v: 0.25, label: "0.25배 (느리게)" },
  { v: 0.5, label: "0.5배" },
  { v: 1, label: "1배 (원본)" },
  { v: 1.25, label: "1.25배" },
  { v: 1.5, label: "1.5배" },
  { v: 2, label: "2배" },
  { v: 3, label: "3배 (빠르게)" },
];

const CRF_PRESETS = [
  { value: 18, label: "최고 (CRF 18, 거의 무손실)" },
  { value: 23, label: "고화질 (CRF 23)" },
  { value: 28, label: "중간 (CRF 28) 추천" },
  { value: 33, label: "용량 우선 (CRF 33)" },
];

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  const ms = Math.floor((s - Math.floor(s)) * 1000);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

export default function VideoEditorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);

  // Edit options
  const [trimEnabled, setTrimEnabled] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);

  const [rotate, setRotate] = useState("");
  const [speed, setSpeed] = useState(1);
  const [mute, setMute] = useState(false);
  const [resize, setResize] = useState<Resize>("");
  const [crf, setCrf] = useState(28);
  const [reencode, setReencode] = useState(false);

  // Processing
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<{ url: string; size: number } | null>(null);

  const needsReencode = trimEnabled || rotate || speed !== 1 || resize !== "" || reencode;

  const onPick = (f: File) => {
    setFile(f);
    setOutput(null);
    // Try to read duration
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = URL.createObjectURL(f);
    v.onloadedmetadata = () => {
      setDuration(v.duration);
      setTrimEnd(v.duration);
      URL.revokeObjectURL(v.src);
    };
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setOutput(null);
    setProgress(0);
    try {
      const ff = await getFFmpeg((s) => setStatus(s));
      const onP = ({ progress }: { progress: number }) => setProgress(progress * 100);
      ff.on("progress", onP);

      const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
      const inputName = `in.${ext}`;
      setStatus("파일 로드 중...");
      await ff.writeFile(inputName, await ffmpegFetchFile(file));

      // Build ffmpeg command
      const args: string[] = ["-i", inputName];

      // Trim (use -ss before -i for fast, but for accuracy after -i)
      if (trimEnabled && trimEnd > trimStart) {
        args.splice(0, 0, "-ss", String(trimStart));
        args.push("-to", String(trimEnd - trimStart)); // actually -t after seek
        // Actually let's use -ss + -t separately - simplify by re-doing:
      }

      // Rebuild args clean:
      const cmd: string[] = [];
      if (trimEnabled && trimEnd > trimStart) {
        cmd.push("-ss", String(trimStart));
      }
      cmd.push("-i", inputName);
      if (trimEnabled && trimEnd > trimStart) {
        cmd.push("-t", String(trimEnd - trimStart));
      }

      // Build video filters
      const vfilters: string[] = [];
      if (rotate === "90") vfilters.push("transpose=1");
      else if (rotate === "180") vfilters.push("transpose=2,transpose=2");
      else if (rotate === "270") vfilters.push("transpose=2");
      else if (rotate === "hflip") vfilters.push("hflip");
      else if (rotate === "vflip") vfilters.push("vflip");
      if (resize) vfilters.push(`scale=${resize}`);
      if (speed !== 1) {
        vfilters.push(`setpts=${(1 / speed).toFixed(4)}*PTS`);
      }

      if (vfilters.length > 0) {
        cmd.push("-vf", vfilters.join(","));
      }

      // Audio filters / mute
      if (mute) {
        cmd.push("-an");
      } else if (speed !== 1) {
        // Audio tempo: chain atempo values 0.5~2 only, so split
        let s = speed;
        const tempos: string[] = [];
        while (s < 0.5) {
          tempos.push("atempo=0.5");
          s *= 2;
        }
        while (s > 2) {
          tempos.push("atempo=2.0");
          s /= 2;
        }
        tempos.push(`atempo=${s.toFixed(4)}`);
        cmd.push("-af", tempos.join(","));
      }

      // Quality
      if (needsReencode) {
        cmd.push("-c:v", "libx264", "-crf", String(crf), "-preset", "veryfast");
        if (!mute) cmd.push("-c:a", "aac", "-b:a", "128k");
      } else {
        // Pure copy (just rewrap)
        cmd.push("-c", "copy");
      }

      cmd.push("out.mp4");

      setStatus(`처리 중... ${needsReencode ? "(재인코딩이라 영상 길이의 1~2배 시간 소요)" : "(스트림 복사로 빠르게)"}`);
      await ff.exec(cmd);

      const data = (await ff.readFile("out.mp4")) as Uint8Array;
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      setOutput({ url: URL.createObjectURL(blob), size: blob.size });
      setStatus("✓ 완료");
      ff.off("progress", onP);
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
    a.download = file.name.replace(/\.[^.]+$/, "") + "-edited.mp4";
    a.click();
  };

  if (!file) {
    return (
      <div className="card">
        <VideoDropzone onFile={onPick} />
        <div className="mt-4 text-xs text-muted leading-relaxed">
          <strong>💡 이 도구로 가능한 작업</strong>
          <ul className="list-disc list-inside mt-1 space-y-0.5">
            <li><strong>자르기</strong> — 원하는 구간만 추출</li>
            <li><strong>회전·반전</strong> — 90·180·270도 + 좌우/상하 반전</li>
            <li><strong>속도 변경</strong> — 0.25배 ~ 3배 (오디오 자동 조정)</li>
            <li><strong>무음 처리</strong> — 오디오 트랙 제거</li>
            <li><strong>해상도 변경</strong> — 240p / 360p / 480p / 720p / 1080p</li>
            <li><strong>압축</strong> — CRF 18~33으로 화질·용량 균형</li>
          </ul>
          <p className="mt-2">여러 작업을 동시에 적용 가능. 단일 작업만 필요하면 카테고리의 개별 도구도 사용 가능.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium mb-2">원본 ({fmtBytes(file.size)} · {fmtTime(duration)})</div>
          <video src={URL.createObjectURL(file)} controls className="w-full max-h-60 rounded border border-gray-200 dark:border-gray-700" />
          <button onClick={() => { setFile(null); setOutput(null); }} className="mt-2 text-sm text-blue-600 hover:underline">
            다른 파일 선택
          </button>
        </div>
        <div>
          <div className="text-sm font-medium mb-2">편집 결과 {output && `(${fmtBytes(output.size)})`}</div>
          {output ? (
            <>
              <video src={output.url} controls className="w-full max-h-60 rounded border border-gray-200 dark:border-gray-700" />
              <div className="mt-2 text-sm font-medium text-green-600">
                {file.size > output.size
                  ? `${Math.round((1 - output.size / file.size) * 100)}% 용량 절감`
                  : `${Math.round((output.size / file.size - 1) * 100)}% 용량 증가`}
              </div>
              <button onClick={download} className="btn btn-primary mt-3">📥 MP4 다운로드</button>
            </>
          ) : (
            <div className="h-60 flex items-center justify-center bg-gray-50 dark:bg-gray-950 rounded text-gray-400 text-sm border border-gray-200 dark:border-gray-700">
              옵션을 설정하고 적용 버튼을 누르세요
            </div>
          )}
        </div>
      </div>

      {/* Edit options */}
      <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
        {/* Trim */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={trimEnabled} onChange={(e) => setTrimEnabled(e.target.checked)} />
            ✂️ 자르기 (특정 구간만 추출)
          </label>
          {trimEnabled && (
            <div className="grid grid-cols-2 gap-3 pl-6 text-sm">
              <label>
                시작 ({fmtTime(trimStart)})
                <input type="range" min={0} max={duration} step={0.1} value={trimStart} onChange={(e) => setTrimStart(Math.min(+e.target.value, trimEnd))} className="w-full" />
              </label>
              <label>
                끝 ({fmtTime(trimEnd)})
                <input type="range" min={0} max={duration} step={0.1} value={trimEnd} onChange={(e) => setTrimEnd(Math.max(+e.target.value, trimStart))} className="w-full" />
              </label>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <label>
            🔃 회전·반전
            <select value={rotate} onChange={(e) => setRotate(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              {ROTATE_OPTS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label>
            ⏩ 재생 속도
            <select value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              {SPEED_OPTS.map((o) => (
                <option key={o.v} value={o.v}>{o.label}</option>
              ))}
            </select>
          </label>
          <label>
            📐 해상도
            <select value={resize} onChange={(e) => setResize(e.target.value as Resize)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              {(Object.keys(RESIZE_LABEL) as Resize[]).map((k) => (
                <option key={k} value={k}>{RESIZE_LABEL[k]}</option>
              ))}
            </select>
          </label>
          <label>
            🗜️ 압축 품질 (재인코딩 시)
            <select value={crf} onChange={(e) => setCrf(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              {CRF_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={mute} onChange={(e) => setMute(e.target.checked)} />
            🔇 무음 처리 (오디오 제거)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={reencode} onChange={(e) => setReencode(e.target.checked)} />
            강제 재인코딩 (용량 줄이기)
          </label>
        </div>
      </div>

      <button onClick={run} disabled={busy} className="btn btn-primary w-full">
        {busy ? "처리 중..." : "✨ 편집 적용 & 변환"}
      </button>

      <StatusBar status={status} busy={busy} progress={progress} />

      <div className="text-xs text-muted leading-relaxed">
        💡 여러 편집을 한 번에 적용합니다. 재인코딩이 필요한 작업(자르기 정확도·회전·속도·해상도·강제 인코딩)이 하나라도 있으면 영상 길이의 1~2배 시간이 걸립니다. 변환·합치기·GIF 변환 등 특수 작업은 카테고리의 개별 도구를 사용하세요.
      </div>
    </div>
  );
}
