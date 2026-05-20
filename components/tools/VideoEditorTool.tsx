"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getFFmpeg, ffmpegFetchFile } from "@/lib/ffmpeg";
import { VideoDropzone, StatusBar, fmtBytes } from "./VideoBase";

type Resize = "" | "1920:-2" | "1280:-2" | "854:-2" | "640:-2" | "426:-2";

const RESIZE_KEYS: Resize[] = ["", "1920:-2", "1280:-2", "854:-2", "640:-2", "426:-2"];
const RESIZE_LABEL_KEY: Record<Resize, string> = {
  "": "keep",
  "1920:-2": "p1080",
  "1280:-2": "p720",
  "854:-2": "p480",
  "640:-2": "p360",
  "426:-2": "p240",
};

const ROTATE_KEYS = ["", "90", "180", "270", "hflip", "vflip"] as const;
const ROTATE_LABEL_KEY: Record<string, string> = {
  "": "none",
  "90": "r90",
  "180": "r180",
  "270": "r270",
  hflip: "hflip",
  vflip: "vflip",
};

const SPEED_OPTS = [
  { v: 0.25, key: "s0_25" },
  { v: 0.5, key: "s0_5" },
  { v: 1, key: "s1" },
  { v: 1.25, key: "s1_25" },
  { v: 1.5, key: "s1_5" },
  { v: 2, key: "s2" },
  { v: 3, key: "s3" },
];

const CRF_PRESETS = [
  { value: 18, key: "crf18" },
  { value: 23, key: "crf23" },
  { value: 28, key: "crf28" },
  { value: 33, key: "crf33" },
];

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  const ms = Math.floor((s - Math.floor(s)) * 1000);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

export default function VideoEditorTool() {
  const t = useTranslations("toolUI.video-editor");
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);

  const [trimEnabled, setTrimEnabled] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);

  const [rotate, setRotate] = useState("");
  const [speed, setSpeed] = useState(1);
  const [mute, setMute] = useState(false);
  const [resize, setResize] = useState<Resize>("");
  const [crf, setCrf] = useState(28);
  const [reencode, setReencode] = useState(false);

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<{ url: string; size: number } | null>(null);

  const needsReencode = trimEnabled || rotate || speed !== 1 || resize !== "" || reencode;

  const onPick = (f: File) => {
    setFile(f);
    setOutput(null);
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
      setStatus(t("loadingFile"));
      await ff.writeFile(inputName, await ffmpegFetchFile(file));

      const args: string[] = ["-i", inputName];

      if (trimEnabled && trimEnd > trimStart) {
        args.splice(0, 0, "-ss", String(trimStart));
        args.push("-to", String(trimEnd - trimStart));
      }

      const cmd: string[] = [];
      if (trimEnabled && trimEnd > trimStart) {
        cmd.push("-ss", String(trimStart));
      }
      cmd.push("-i", inputName);
      if (trimEnabled && trimEnd > trimStart) {
        cmd.push("-t", String(trimEnd - trimStart));
      }

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

      if (mute) {
        cmd.push("-an");
      } else if (speed !== 1) {
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

      if (needsReencode) {
        cmd.push("-c:v", "libx264", "-crf", String(crf), "-preset", "veryfast");
        if (!mute) cmd.push("-c:a", "aac", "-b:a", "128k");
      } else {
        cmd.push("-c", "copy");
      }

      cmd.push("out.mp4");

      setStatus(needsReencode ? t("processingReencode") : t("processingCopy"));
      await ff.exec(cmd);

      const data = (await ff.readFile("out.mp4")) as Uint8Array;
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      setOutput({ url: URL.createObjectURL(blob), size: blob.size });
      setStatus(`✓ ${t("done")}`);
      ff.off("progress", onP);
    } catch (e) {
      setStatus(`${t("failed")}: ${(e as Error).message}`);
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
          <strong>💡 {t("introTitle")}</strong>
          <ul className="list-disc list-inside mt-1 space-y-0.5">
            <li>{t.rich("intro1", { b: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich("intro2", { b: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich("intro3", { b: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich("intro4", { b: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich("intro5", { b: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich("intro6", { b: (chunks) => <strong>{chunks}</strong> })}</li>
          </ul>
          <p className="mt-2">{t("introFooter")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium mb-2">{t("original", { size: fmtBytes(file.size), time: fmtTime(duration) })}</div>
          <video src={URL.createObjectURL(file)} controls className="w-full max-h-60 rounded border border-gray-200 dark:border-gray-700" />
          <button onClick={() => { setFile(null); setOutput(null); }} className="mt-2 text-sm text-blue-600 hover:underline">
            {t("pickAnother")}
          </button>
        </div>
        <div>
          <div className="text-sm font-medium mb-2">
            {t("result")} {output && `(${fmtBytes(output.size)})`}
          </div>
          {output ? (
            <>
              <video src={output.url} controls className="w-full max-h-60 rounded border border-gray-200 dark:border-gray-700" />
              <div className="mt-2 text-sm font-medium text-green-600">
                {file.size > output.size
                  ? t("sizeReduce", { pct: Math.round((1 - output.size / file.size) * 100) })
                  : t("sizeIncrease", { pct: Math.round((output.size / file.size - 1) * 100) })}
              </div>
              <button onClick={download} className="btn btn-primary mt-3">📥 {t("downloadMp4")}</button>
            </>
          ) : (
            <div className="h-60 flex items-center justify-center bg-gray-50 dark:bg-gray-950 rounded text-gray-400 text-sm border border-gray-200 dark:border-gray-700">
              {t("emptyState")}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={trimEnabled} onChange={(e) => setTrimEnabled(e.target.checked)} />
            ✂️ {t("trim")}
          </label>
          {trimEnabled && (
            <div className="grid grid-cols-2 gap-3 pl-6 text-sm">
              <label>
                {t("trimStart", { time: fmtTime(trimStart) })}
                <input type="range" min={0} max={duration} step={0.1} value={trimStart} onChange={(e) => setTrimStart(Math.min(+e.target.value, trimEnd))} className="w-full" />
              </label>
              <label>
                {t("trimEnd", { time: fmtTime(trimEnd) })}
                <input type="range" min={0} max={duration} step={0.1} value={trimEnd} onChange={(e) => setTrimEnd(Math.max(+e.target.value, trimStart))} className="w-full" />
              </label>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <label>
            🔃 {t("rotate")}
            <select value={rotate} onChange={(e) => setRotate(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              {ROTATE_KEYS.map((k) => (
                <option key={k} value={k}>{t(`rotateOpt.${ROTATE_LABEL_KEY[k]}`)}</option>
              ))}
            </select>
          </label>
          <label>
            ⏩ {t("speed")}
            <select value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              {SPEED_OPTS.map((o) => (
                <option key={o.v} value={o.v}>{t(`speedOpt.${o.key}`)}</option>
              ))}
            </select>
          </label>
          <label>
            📐 {t("resize")}
            <select value={resize} onChange={(e) => setResize(e.target.value as Resize)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              {RESIZE_KEYS.map((k) => (
                <option key={k} value={k}>{t(`resizeOpt.${RESIZE_LABEL_KEY[k]}`)}</option>
              ))}
            </select>
          </label>
          <label>
            🗜️ {t("crf")}
            <select value={crf} onChange={(e) => setCrf(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
              {CRF_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>{t(`crfOpt.${p.key}`)}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={mute} onChange={(e) => setMute(e.target.checked)} />
            🔇 {t("mute")}
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={reencode} onChange={(e) => setReencode(e.target.checked)} />
            {t("forceReencode")}
          </label>
        </div>
      </div>

      <button onClick={run} disabled={busy} className="btn btn-primary w-full">
        {busy ? t("processing") : `✨ ${t("apply")}`}
      </button>

      <StatusBar status={status} busy={busy} progress={progress} />

      <div className="text-xs text-muted leading-relaxed">
        💡 {t("footer")}
      </div>
    </div>
  );
}
