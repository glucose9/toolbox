"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

function extractVideoId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  // youtu.be/ID
  const short = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (short) return short[1];
  // youtube.com/watch?v=ID
  const watch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watch) return watch[1];
  // youtube.com/shorts/ID
  const shorts = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shorts) return shorts[1];
  // youtube.com/embed/ID
  const embed = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embed) return embed[1];
  // youtube.com/live/ID
  const live = trimmed.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/);
  if (live) return live[1];
  // Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

const SIZES = [
  { name: "Max (HD)", file: "maxresdefault.jpg", res: "1280×720" },
  { name: "Standard", file: "sddefault.jpg", res: "640×480" },
  { name: "High", file: "hqdefault.jpg", res: "480×360" },
  { name: "Medium", file: "mqdefault.jpg", res: "320×180" },
  { name: "Default", file: "default.jpg", res: "120×90" },
];

export default function YoutubeThumbnailTool() {
  const t = useTranslations("toolUI.youtube-thumbnail");
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const videoId = useMemo(() => extractVideoId(url), [url]);
  const [error, setError] = useState("");

  const download = async (size: { file: string; res: string }) => {
    if (!videoId) return;
    setError("");
    const thumbUrl = `https://i.ytimg.com/vi/${videoId}/${size.file}`;
    try {
      const res = await fetch(thumbUrl);
      if (!res.ok) {
        setError(t("errNotAvailable"));
        return;
      }
      const blob = await res.blob();
      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = `${videoId}-${size.file}`;
      a.click();
      URL.revokeObjectURL(dlUrl);
    } catch {
      // Network/CORS failure only: fall back to opening the image directly
      window.open(thumbUrl, "_blank");
    }
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("urlLabel")}</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t("placeholder")}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
        />
        {videoId ? (
          <div className="text-xs text-green-600 mt-1">{t("videoIdLabel")}: {videoId}</div>
        ) : url.trim() ? (
          <div className="text-xs text-red-600 mt-1">{t("invalidUrl")}</div>
        ) : null}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {videoId && (
        <div className="space-y-3">
          {SIZES.map((s) => {
            const thumbUrl = `https://i.ytimg.com/vi/${videoId}/${s.file}`;
            return (
              <div key={s.file} className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbUrl}
                  alt={s.name}
                  className="h-16 rounded"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-muted">{s.res}</div>
                </div>
                <button onClick={() => download(s)} className="btn btn-secondary text-sm">{t("download")}</button>
              </div>
            );
          })}
        </div>
      )}

      <div className="text-xs text-muted leading-relaxed">
        {t("note")}
      </div>
    </div>
  );
}
