"use client";

import { useRef, useState } from "react";

type Row = { key: string; value: string };

function fmtVal(v: unknown): string {
  if (v == null) return "";
  if (v instanceof Date) return v.toLocaleString();
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

export default function ExifViewerTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [gps, setGps] = useState<{ lat: number; lon: number } | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    setError("");
    setRows([]);
    setGps(null);
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
    setBusy(true);
    try {
      const exifr = (await import("exifr")).default;
      const meta = await exifr.parse(f, true);
      if (!meta) {
        setError("EXIF 정보가 없습니다.");
        return;
      }
      const ignore = new Set(["MakerNote", "UserComment", "thumbnail"]);
      const r: Row[] = [];
      for (const [k, v] of Object.entries(meta)) {
        if (ignore.has(k)) continue;
        const val = fmtVal(v);
        if (val.length > 200) continue;
        r.push({ key: k, value: val });
      }
      setRows(r);
      if (typeof meta.latitude === "number" && typeof meta.longitude === "number") {
        setGps({ lat: meta.latitude, lon: meta.longitude });
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🔬</div>
          <div className="font-medium">이미지를 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">JPG·HEIC EXIF 지원</div>
          <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm truncate font-medium">{file.name}</div>
        <button onClick={() => { setFile(null); setRows([]); setGps(null); setError(""); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {preview && <img src={preview} alt="" className="max-w-full max-h-72 rounded border border-gray-200 dark:border-gray-700 mx-auto" />}
        <div>
          {busy ? (
            <div className="text-sm text-muted">읽는 중...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <>
              {gps && (
                <a
                  href={`https://www.google.com/maps?q=${gps.lat},${gps.lon}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block mb-2 p-2 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded text-sm hover:underline"
                >
                  📍 GPS: {gps.lat.toFixed(6)}, {gps.lon.toFixed(6)} — 지도에서 보기
                </a>
              )}
              <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {rows.map((r) => (
                      <tr key={r.key} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="px-2 py-1.5 font-medium align-top text-muted w-1/3">{r.key}</td>
                        <td className="px-2 py-1.5 font-mono break-all">{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-muted mt-2">{rows.length}개 항목</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
