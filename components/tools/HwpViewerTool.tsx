"use client";

import { useEffect, useRef, useState } from "react";
import type { HwpDocument } from "@rhwp/core";
import { openHwp, readFileBytes, isHwpFile } from "@/lib/hwp";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function HwpViewerTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HwpDocument | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [svg, setSvg] = useState("");
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      docRef.current?.free?.();
    };
  }, []);

  const handleFile = async (file: File) => {
    if (!isHwpFile(file)) {
      setError(".hwp 또는 .hwpx 파일만 지원합니다.");
      return;
    }
    setError("");
    setLoading(true);
    setFileName(file.name);
    setFileSize(file.size);
    try {
      const bytes = await readFileBytes(file);
      docRef.current?.free?.();
      const doc = await openHwp(bytes);
      docRef.current = doc;
      const total = doc.pageCount();
      setPageCount(total);
      setPage(0);
      setSvg(total > 0 ? doc.renderPageSvg(0) : "");
    } catch (e) {
      setError("파일을 여는 데 실패했습니다: " + (e as Error).message);
      docRef.current = null;
      setPageCount(0);
      setSvg("");
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (n: number) => {
    if (!docRef.current || n < 0 || n >= pageCount) return;
    setPage(n);
    setSvg(docRef.current.renderPageSvg(n));
  };

  const reset = () => {
    docRef.current?.free?.();
    docRef.current = null;
    setFileName("");
    setFileSize(0);
    setPageCount(0);
    setPage(0);
    setSvg("");
    setError("");
  };

  if (!fileName) {
    return (
      <div className="card">
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">📄</div>
          <div className="font-medium">.hwp / .hwpx 파일을 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">처음 한 번 WebAssembly 엔진(~5MB)이 로드됩니다</div>
          <input
            ref={inputRef}
            type="file"
            accept=".hwp,.hwpx"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{fileName}</div>
          <div className="text-xs text-muted">
            {fmt(fileSize)} · {pageCount}페이지
          </div>
        </div>
        <button onClick={reset} className="text-sm text-brand-600 hover:underline">
          다른 파일 열기
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted">파일을 분석하는 중...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-600">{error}</div>
      ) : (
        <>
          <div className="flex items-center justify-between flex-wrap gap-2 border-y border-gray-200 dark:border-gray-700 py-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="btn btn-secondary text-sm disabled:opacity-40"
              >
                ◀
              </button>
              <span className="text-sm tabular-nums px-2">
                {page + 1} / {pageCount}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= pageCount - 1}
                className="btn btn-secondary text-sm disabled:opacity-40"
              >
                ▶
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))} className="btn btn-secondary text-sm">
                −
              </button>
              <span className="text-sm tabular-nums px-2 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(3, z + 0.2))} className="btn btn-secondary text-sm">
                +
              </button>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 overflow-auto max-h-[75vh]">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                display: "inline-block",
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </>
      )}
    </div>
  );
}
