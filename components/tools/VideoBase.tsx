"use client";

import { useRef } from "react";

export function VideoDropzone({
  onFile,
  accept = "video/*",
  label = "동영상을 드래그하거나 클릭",
  hint = "MP4 · MOV · WebM · MKV · AVI",
}: {
  onFile: (file: File) => void;
  accept?: string;
  label?: string;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => ref.current?.click()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors"
    >
      <div className="text-5xl mb-3">🎬</div>
      <div className="font-medium">{label}</div>
      <div className="mt-1 text-sm text-gray-500">{hint}</div>
      <div className="mt-3 text-xs text-gray-400">
        ※ 첫 실행 시 ffmpeg.wasm(~25MB)이 한 번 다운로드됩니다. 이후엔 즉시 처리.
      </div>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}

export function StatusBar({ status, busy, progress }: { status: string; busy: boolean; progress: number }) {
  if (!status && !busy) return null;
  return (
    <div className="mt-4">
      <div className="text-sm text-gray-700">{status}</div>
      {busy && (
        <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 transition-all"
            style={{ width: `${Math.max(2, Math.min(100, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function fmtBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
