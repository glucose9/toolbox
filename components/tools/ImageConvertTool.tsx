"use client";

import { useState, useRef } from "react";

const MIME: Record<string, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

const EXT: Record<string, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

export default function ImageConvertTool({
  config,
}: {
  config: Record<string, unknown>;
}) {
  const to = (config.to as string) || "jpeg";
  const defaultQuality = (config.defaultQuality as number) || 0.92;

  const [quality, setQuality] = useState(defaultQuality);
  const [input, setInput] = useState<{ name: string; size: number; url: string } | null>(null);
  const [output, setOutput] = useState<{ url: string; size: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setBusy(true);
    setOutput(null);
    const url = URL.createObjectURL(file);
    setInput({ name: file.name, size: file.size, url });

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      // For JPEG, fill white background since JPEG has no transparency
      if (to === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setBusy(false);
            return;
          }
          setOutput({ url: URL.createObjectURL(blob), size: blob.size });
          setBusy(false);
        },
        MIME[to],
        to === "png" ? undefined : quality
      );
    };
    img.onerror = () => setBusy(false);
    img.src = url;
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const reconvert = () => {
    if (input) {
      fetch(input.url)
        .then((r) => r.blob())
        .then((b) => handleFile(new File([b], input.name)));
    }
  };

  const download = () => {
    if (!output || !input) return;
    const baseName = input.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = output.url;
    a.download = `${baseName}.${EXT[to]}`;
    a.click();
  };

  const fmt = (n: number) =>
    n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div className="card">
      {!input ? (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors"
        >
          <div className="text-5xl mb-3">📁</div>
          <div className="font-medium">이미지를 드래그하거나 클릭해서 선택</div>
          <div className="mt-1 text-sm text-gray-500">JPG · PNG · WebP · GIF · BMP</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-medium mb-2">원본 ({fmt(input.size)})</div>
            <img src={input.url} className="max-w-full max-h-64 rounded border border-gray-200" alt="원본" />
            <div className="mt-3 text-sm text-gray-600 truncate">{input.name}</div>
            <button
              onClick={() => {
                setInput(null);
                setOutput(null);
              }}
              className="mt-3 text-sm text-brand-600 hover:underline"
            >
              다른 파일 선택
            </button>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">
              변환 결과 {output && `(${fmt(output.size)})`}
            </div>
            {busy ? (
              <div className="h-64 flex items-center justify-center text-gray-400">변환 중...</div>
            ) : output ? (
              <>
                <img src={output.url} className="max-w-full max-h-64 rounded border border-gray-200" alt="변환됨" />
                {output.size && input.size && (
                  <div className="mt-2 text-sm text-gray-600">
                    {output.size < input.size
                      ? `${Math.round((1 - output.size / input.size) * 100)}% 절감`
                      : `${Math.round((output.size / input.size - 1) * 100)}% 증가`}
                  </div>
                )}
                <button onClick={download} className="btn btn-primary mt-3">
                  다운로드 ({EXT[to].toUpperCase()})
                </button>
              </>
            ) : null}
          </div>

          {to !== "png" && (
            <div className="md:col-span-2">
              <label className="label">
                화질 ({Math.round(quality * 100)}%)
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                onMouseUp={reconvert}
                onTouchEnd={reconvert}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
