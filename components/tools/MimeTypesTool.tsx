"use client";
import { useMemo, useState } from "react";

const MIMES: { ext: string; mime: string }[] = [
  { ext: "html", mime: "text/html" }, { ext: "css", mime: "text/css" }, { ext: "js", mime: "application/javascript" },
  { ext: "json", mime: "application/json" }, { ext: "xml", mime: "application/xml" }, { ext: "txt", mime: "text/plain" },
  { ext: "csv", mime: "text/csv" }, { ext: "md", mime: "text/markdown" }, { ext: "pdf", mime: "application/pdf" },
  { ext: "zip", mime: "application/zip" }, { ext: "tar", mime: "application/x-tar" }, { ext: "gz", mime: "application/gzip" },
  { ext: "7z", mime: "application/x-7z-compressed" }, { ext: "rar", mime: "application/vnd.rar" },
  { ext: "jpg", mime: "image/jpeg" }, { ext: "jpeg", mime: "image/jpeg" }, { ext: "png", mime: "image/png" },
  { ext: "gif", mime: "image/gif" }, { ext: "webp", mime: "image/webp" }, { ext: "svg", mime: "image/svg+xml" },
  { ext: "ico", mime: "image/x-icon" }, { ext: "bmp", mime: "image/bmp" }, { ext: "heic", mime: "image/heic" },
  { ext: "mp4", mime: "video/mp4" }, { ext: "webm", mime: "video/webm" }, { ext: "mov", mime: "video/quicktime" },
  { ext: "avi", mime: "video/x-msvideo" }, { ext: "mkv", mime: "video/x-matroska" },
  { ext: "mp3", mime: "audio/mpeg" }, { ext: "wav", mime: "audio/wav" }, { ext: "flac", mime: "audio/flac" },
  { ext: "ogg", mime: "audio/ogg" }, { ext: "aac", mime: "audio/aac" }, { ext: "m4a", mime: "audio/mp4" },
  { ext: "doc", mime: "application/msword" }, { ext: "docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  { ext: "xls", mime: "application/vnd.ms-excel" }, { ext: "xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  { ext: "ppt", mime: "application/vnd.ms-powerpoint" }, { ext: "pptx", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
  { ext: "hwp", mime: "application/x-hwp" }, { ext: "hwpx", mime: "application/hwp+zip" },
  { ext: "ttf", mime: "font/ttf" }, { ext: "otf", mime: "font/otf" }, { ext: "woff", mime: "font/woff" }, { ext: "woff2", mime: "font/woff2" },
  { ext: "wasm", mime: "application/wasm" },
];

export default function MimeTypesTool() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return MIMES;
    return MIMES.filter((m) => m.ext.includes(query) || m.mime.includes(query));
  }, [q]);
  return (
    <div className="card space-y-3">
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="확장자 또는 MIME 검색" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
        {filtered.map((m) => (
          <div key={m.ext + m.mime} className="flex justify-between p-2 text-sm">
            <span className="font-mono">.{m.ext}</span>
            <span className="font-mono text-muted">{m.mime}</span>
            <button onClick={() => navigator.clipboard.writeText(m.mime)} className="text-xs text-brand-600 hover:underline">복사</button>
          </div>
        ))}
      </div>
    </div>
  );
}
