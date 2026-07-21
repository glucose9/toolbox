"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

type Cue = { idx: number; start: number; end: number; text: string };

// Time in seconds → SRT timestamp 00:00:00,000
function secToSrt(s: number): string {
  if (s < 0) s = 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const ms = Math.floor((s - Math.floor(s)) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}
function secToVtt(s: number): string {
  return secToSrt(s).replace(",", ".");
}
function parseTime(t: string): number {
  const m = t.trim().match(/(?:(\d+):)?(\d+):(\d+)[,.](\d+)/);
  if (!m) return 0;
  return (+(m[1] ?? 0)) * 3600 + (+m[2]) * 60 + (+m[3]) + (+m[4].padEnd(3, "0").slice(0, 3)) / 1000;
}

function parseSrtOrVtt(text: string): Cue[] {
  const cues: Cue[] = [];
  const cleaned = text.replace(/^WEBVTT[^\n]*\n+/, "").trim();
  const blocks = cleaned.split(/\n\s*\n/);
  let idx = 1;
  for (const block of blocks) {
    const lines = block.trim().split(/\n/);
    if (lines.length < 2) continue;
    let timeIdx = 0;
    // First line might be an index number
    if (/^\d+$/.test(lines[0].trim())) timeIdx = 1;
    const timeLine = lines[timeIdx];
    const m = timeLine.match(/(.+)\s+-->\s+(.+)/);
    if (!m) continue;
    const start = parseTime(m[1]);
    const end = parseTime(m[2]);
    const text = lines.slice(timeIdx + 1).join("\n");
    cues.push({ idx: idx++, start, end, text });
  }
  return cues;
}

function cuesToSrt(cues: Cue[]): string {
  return cues.map((c) => `${c.idx}\n${secToSrt(c.start)} --> ${secToSrt(c.end)}\n${c.text}`).join("\n\n") + "\n";
}
function cuesToVtt(cues: Cue[]): string {
  return "WEBVTT\n\n" + cues.map((c) => `${secToVtt(c.start)} --> ${secToVtt(c.end)}\n${c.text}`).join("\n\n") + "\n";
}
function cuesToText(cues: Cue[]): string {
  return cues.map((c) => c.text).join("\n");
}

export default function SubtitleTool() {
  const t = useTranslations("toolUI.subtitle");
  const [input, setInput] = useState(`1
00:00:01,000 --> 00:00:04,500
안녕하세요, 바로킷입니다.

2
00:00:05,000 --> 00:00:08,000
이 도구로 자막을 편집할 수 있습니다.

3
00:00:09,000 --> 00:00:12,000
SRT와 VTT를 양방향 변환합니다.`);
  const [offset, setOffset] = useState(0); // seconds, can be negative
  const [outputFormat, setOutputFormat] = useState<"srt" | "vtt" | "txt">("srt");

  const cues = useMemo(() => {
    const parsed = parseSrtOrVtt(input);
    if (offset === 0) return parsed;
    return parsed.map((c) => ({ ...c, start: c.start + offset, end: c.end + offset }));
  }, [input, offset]);

  const output = useMemo(() => {
    if (outputFormat === "srt") return cuesToSrt(cues);
    if (outputFormat === "vtt") return cuesToVtt(cues);
    return cuesToText(cues);
  }, [cues, outputFormat]);

  const onFile = async (f: File) => {
    const text = await f.text();
    setInput(text);
  };

  const download = () => {
    const ext = outputFormat;
    const mime = outputFormat === "srt" ? "application/x-subrip" : outputFormat === "vtt" ? "text/vtt" : "text/plain";
    const blob = new Blob([output], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subtitle-${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="label !mb-0">{t("originalLabel")}</label>
            <input
              type="file"
              accept=".srt,.vtt,text/plain"
              onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
              className="text-xs"
            />
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono"
          />
          <div className="text-xs text-muted mt-1">{t("recognized", { n: cues.length })}</div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="label !mb-0">{t("resultLabel")}</label>
            <div className="flex gap-1 text-xs">
              {(["srt", "vtt", "txt"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setOutputFormat(f)}
                  className={`px-2 py-0.5 rounded ${outputFormat === f ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            rows={14}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-950 text-xs font-mono"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3 text-sm">
        <label>
          {t("offsetLabel")}
          <input
            type="number"
            step="0.1"
            value={offset}
            onChange={(e) => setOffset(+e.target.value)}
            className="w-32 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
          <div className="text-xs text-muted mt-1">{t("offsetHint")}</div>
        </label>
        <button onClick={() => navigator.clipboard.writeText(output)} className="btn">{t("copy")}</button>
        <button onClick={download} className="btn btn-primary">{t("saveAs", { ext: outputFormat })}</button>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("hint")}
      </div>
    </div>
  );
}
