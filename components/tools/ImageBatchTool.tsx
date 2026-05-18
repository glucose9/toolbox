"use client";

import { useState } from "react";
import JSZip from "jszip";

type Item = {
  id: number;
  file: File;
  url: string;
  status: "pending" | "processing" | "done" | "error";
  resultBlob?: Blob;
  resultUrl?: string;
  originalSize: number;
  newSize?: number;
  error?: string;
};

type Format = "" | "image/jpeg" | "image/png" | "image/webp";

export default function ImageBatchTool() {
  const [items, setItems] = useState<Item[]>([]);
  const [maxWidth, setMaxWidth] = useState(0); // 0 = no resize
  const [quality, setQuality] = useState(0.85);
  const [format, setFormat] = useState<Format>(""); // "" = keep original
  const [busy, setBusy] = useState(false);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: Item[] = Array.from(files).map((f) => ({
      id: Math.random() * 1e9 | 0,
      file: f,
      url: URL.createObjectURL(f),
      status: "pending",
      originalSize: f.size,
    }));
    setItems((cur) => [...cur, ...newItems]);
  };

  const processOne = async (item: Item): Promise<Item> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (maxWidth > 0 && width > maxWidth) {
          height = Math.round((maxWidth / width) * height);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({ ...item, status: "error", error: "Canvas 생성 실패" });
          return;
        }
        // White background for transparent → JPG
        const outType = format || (item.file.type.startsWith("image/") ? item.file.type : "image/jpeg");
        if (outType === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({ ...item, status: "error", error: "변환 실패" });
              return;
            }
            const url = URL.createObjectURL(blob);
            resolve({ ...item, status: "done", resultBlob: blob, resultUrl: url, newSize: blob.size });
          },
          outType,
          quality
        );
      };
      img.onerror = () => resolve({ ...item, status: "error", error: "이미지 로드 실패" });
      img.src = item.url;
    });
  };

  const processAll = async () => {
    setBusy(true);
    for (let i = 0; i < items.length; i++) {
      if (items[i].status === "done") continue;
      setItems((cur) => cur.map((it, idx) => (idx === i ? { ...it, status: "processing" } : it)));
      const result = await processOne(items[i]);
      setItems((cur) => cur.map((it, idx) => (idx === i ? result : it)));
    }
    setBusy(false);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    const done = items.filter((it) => it.status === "done" && it.resultBlob);
    for (const it of done) {
      const ext = format
        ? format.split("/")[1].replace("jpeg", "jpg")
        : (it.file.name.split(".").pop() || "jpg");
      const base = it.file.name.replace(/\.[^.]+$/, "");
      zip.file(`${base}.${ext}`, it.resultBlob!);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `batch-${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadOne = (it: Item) => {
    if (!it.resultUrl) return;
    const ext = format
      ? format.split("/")[1].replace("jpeg", "jpg")
      : (it.file.name.split(".").pop() || "jpg");
    const a = document.createElement("a");
    a.href = it.resultUrl;
    a.download = `${it.file.name.replace(/\.[^.]+$/, "")}.${ext}`;
    a.click();
  };

  const removeItem = (id: number) => {
    setItems((cur) => cur.filter((it) => it.id !== id));
  };

  const clear = () => {
    items.forEach((it) => {
      URL.revokeObjectURL(it.url);
      if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
    });
    setItems([]);
  };

  const fmt = (n: number) =>
    n < 1024 ? `${n}B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(0)}KB` : `${(n / (1024 * 1024)).toFixed(2)}MB`;

  const totalOriginal = items.reduce((s, it) => s + it.originalSize, 0);
  const totalNew = items.reduce((s, it) => s + (it.newSize || it.originalSize), 0);
  const doneCount = items.filter((it) => it.status === "done").length;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <label>
          최대 가로 (px, 0=원본 유지)
          <input
            type="number"
            min={0}
            value={maxWidth}
            onChange={(e) => setMaxWidth(+e.target.value)}
            className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
          <div className="text-xs text-muted mt-1">예: 1920(FHD), 1080(소셜), 800(웹)</div>
        </label>
        <label>
          화질 ({Math.round(quality * 100)}%)
          <input type="range" min="0.3" max="1" step="0.05" value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full" />
        </label>
        <label>
          출력 포맷
          <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="">원본 유지</option>
            <option value="image/jpeg">JPG로 통일</option>
            <option value="image/png">PNG로 통일</option>
            <option value="image/webp">WebP로 통일</option>
          </select>
        </label>
      </div>

      <div>
        <label className="block border-2 border-dashed border-gray-300 dark:border-gray-700 rounded p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
          <div className="text-4xl mb-2">📷</div>
          <div className="text-sm">여러 이미지 선택 또는 드래그</div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => onFiles(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {items.length > 0 && (
        <>
          <div className="card-section text-sm flex flex-wrap gap-4">
            <span>총 {items.length}장 · 완료 {doneCount}장</span>
            <span>원본 합계 {fmt(totalOriginal)}</span>
            {totalNew !== totalOriginal && (
              <span className="text-green-600">
                변환 후 {fmt(totalNew)}{" "}
                ({totalNew < totalOriginal ? `−${Math.round((1 - totalNew / totalOriginal) * 100)}%` : `+${Math.round((totalNew / totalOriginal - 1) * 100)}%`})
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
            {items.map((it) => (
              <div key={it.id} className="border border-gray-200 dark:border-gray-700 rounded p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.resultUrl || it.url} alt={it.file.name} className="w-full aspect-square object-cover rounded" />
                <div className="text-xs mt-1 truncate" title={it.file.name}>{it.file.name}</div>
                <div className="text-xs text-muted">
                  {fmt(it.originalSize)}
                  {it.newSize && ` → ${fmt(it.newSize)}`}
                </div>
                {it.status === "processing" && <div className="text-xs text-blue-600">처리 중...</div>}
                {it.status === "error" && <div className="text-xs text-red-600">⚠️ {it.error}</div>}
                <div className="flex gap-1 mt-1">
                  {it.status === "done" && (
                    <button onClick={() => downloadOne(it)} className="text-xs text-blue-600 hover:underline">📥</button>
                  )}
                  <button onClick={() => removeItem(it.id)} className="text-xs text-red-500 hover:underline ml-auto">×</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={processAll} disabled={busy} className="btn btn-primary">
              {busy ? "처리 중..." : "✨ 일괄 변환"}
            </button>
            {doneCount > 0 && (
              <button onClick={downloadAll} className="btn btn-secondary">📦 ZIP으로 모두 다운로드</button>
            )}
            <button onClick={clear} className="btn">🗑️ 모두 지우기</button>
          </div>
        </>
      )}

      <div className="text-xs text-muted leading-relaxed">
        💡 여러 이미지를 한 번에 압축·리사이즈·포맷 변환합니다. 블로그·쇼핑몰·앨범 백업 등 대량 처리에 적합. 모든 변환이 브라우저 안에서 일어나며 외부 전송 없음. 한 번에 100장 이내, 합쳐서 500MB 이하 권장.
      </div>
    </div>
  );
}
