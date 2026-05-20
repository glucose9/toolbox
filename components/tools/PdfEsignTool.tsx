"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";

type Mode = "draw" | "upload";

interface Placement {
  page: number;
  // PDF coordinates (origin = bottom-left of page, points)
  x: number;
  y: number;
  w: number;
  h: number;
}

function readBytes(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(new Uint8Array(r.result as ArrayBuffer));
    r.onerror = () => reject(r.error);
    r.readAsArrayBuffer(file);
  });
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export default function PdfEsignTool() {
  const t = useTranslations("toolUI.pdf-esign");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [mode, setMode] = useState<Mode>("draw");
  const [signaturePng, setSignaturePng] = useState<string | null>(null); // data URL
  const [pageCount, setPageCount] = useState(0);
  const [pageIdx, setPageIdx] = useState(1);
  const [previewSize, setPreviewSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [pdfPageSize, setPdfPageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [sigSize, setSigSize] = useState(120); // displayed width in CSS px
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null); // draw signature
  const previewRef = useRef<HTMLCanvasElement>(null); // pdf page preview
  const overlayRef = useRef<HTMLDivElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);

  // signature drawing
  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  // ---- PDF preview rendering ----
  useEffect(() => {
    let cancelled = false;
    async function render() {
      if (!pdfBytes || !previewRef.current) return;
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const loadingTask = pdfjs.getDocument({ data: pdfBytes.slice() });
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        setPageCount(pdf.numPages);
        const cur = Math.min(Math.max(1, pageIdx), pdf.numPages);
        const page = await pdf.getPage(cur);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = previewRef.current;
        if (!canvas) return;
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;
        if (cancelled) return;
        setPreviewSize({ w: canvas.width, h: canvas.height });
        // Original PDF page size in points (scale 1)
        const orig = page.getViewport({ scale: 1 });
        setPdfPageSize({ w: orig.width, h: orig.height });
      } catch (e) {
        setError((e as Error).message);
      }
    }
    void render();
    return () => {
      cancelled = true;
    };
  }, [pdfBytes, pageIdx]);

  // ---- signature drawing handlers ----
  function setupCanvas() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
  }
  useEffect(() => {
    if (mode === "draw") setupCanvas();
  }, [mode]);

  function getCanvasPoint(e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null {
    const c = canvasRef.current;
    if (!c) return null;
    const rect = c.getBoundingClientRect();
    let cx: number, cy: number;
    if ("touches" in e) {
      const tt = e.touches[0] || e.changedTouches[0];
      cx = tt.clientX;
      cy = tt.clientY;
    } else {
      cx = e.clientX;
      cy = e.clientY;
    }
    return {
      x: ((cx - rect.left) / rect.width) * c.width,
      y: ((cy - rect.top) / rect.height) * c.height,
    };
  }
  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    drawingRef.current = true;
    lastPtRef.current = getCanvasPoint(e);
  }
  function moveDraw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawingRef.current) return;
    const p = getCanvasPoint(e);
    const last = lastPtRef.current;
    const c = canvasRef.current;
    if (!p || !last || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPtRef.current = p;
    e.preventDefault();
  }
  function endDraw() {
    drawingRef.current = false;
    lastPtRef.current = null;
    // capture PNG
    const c = canvasRef.current;
    if (c) {
      // Make background transparent by checking off-white -> alpha 0
      const ctx = c.getContext("2d");
      if (ctx) {
        const img = ctx.getImageData(0, 0, c.width, c.height);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) {
            d[i + 3] = 0;
          }
        }
        // Render to temp canvas so original keeps white bg for redraw
        const tmp = document.createElement("canvas");
        tmp.width = c.width;
        tmp.height = c.height;
        const tctx = tmp.getContext("2d");
        if (tctx) {
          tctx.putImageData(img, 0, 0);
          setSignaturePng(tmp.toDataURL("image/png"));
        }
      }
    }
  }
  function clearSignature() {
    setupCanvas();
    setSignaturePng(null);
  }

  // ---- upload signature ----
  function onUploadSignature(f: File) {
    const r = new FileReader();
    r.onload = () => setSignaturePng(r.result as string);
    r.readAsDataURL(f);
  }

  // ---- PDF upload ----
  async function onPdfUpload(f: File) {
    setError("");
    setPdfFile(f);
    setPlacements([]);
    setPageIdx(1);
    const bytes = await readBytes(f);
    setPdfBytes(bytes);
  }

  // ---- click on preview to place signature ----
  function onPreviewClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!signaturePng || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    // Map CSS to canvas pixels
    const scaleX = previewSize.w / rect.width;
    const scaleY = previewSize.h / rect.height;
    const pxX = cssX * scaleX;
    const pxY = cssY * scaleY;
    // canvas -> PDF coords. preview was rendered at scale 1.5 of original.
    const ratioX = pdfPageSize.w / previewSize.w;
    const ratioY = pdfPageSize.h / previewSize.h;
    const pdfX = pxX * ratioX;
    const pdfYTop = pxY * ratioY;
    // sigSize is in CSS px; convert to PDF points
    const wPdf = sigSize * (pdfPageSize.w / rect.width);
    // assume aspect ratio of signature
    const img = new Image();
    img.onload = () => {
      const aspect = img.naturalHeight / img.naturalWidth || 0.4;
      const hPdf = wPdf * aspect;
      // pdf-lib origin = bottom-left, so flip y
      const pdfY = pdfPageSize.h - pdfYTop - hPdf;
      // We want the placement centered on click; recompute x/y
      const cx = pdfX - wPdf / 2;
      const cy = pdfY + hPdf / 2 - hPdf / 2; // already bottom-left
      setPlacements((prev) => [
        ...prev,
        { page: pageIdx, x: cx, y: pdfY, w: wPdf, h: hPdf },
      ]);
    };
    img.src = signaturePng;
  }

  function removePlacement(i: number) {
    setPlacements((prev) => prev.filter((_, idx) => idx !== i));
  }

  // ---- apply & download ----
  async function applyAndDownload() {
    if (!pdfBytes || !signaturePng || placements.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const doc = await PDFDocument.load(pdfBytes);
      // signature image -> bytes
      const sigBytes = await (await fetch(signaturePng)).arrayBuffer();
      const png = await doc.embedPng(sigBytes);
      const pages = doc.getPages();
      for (const p of placements) {
        const page = pages[p.page - 1];
        if (!page) continue;
        page.drawImage(png, { x: p.x, y: p.y, width: p.w, height: p.h });
      }
      const out = await doc.save();
      const blob = new Blob([out as unknown as BlobPart], { type: "application/pdf" });
      const name = (pdfFile?.name || "document.pdf").replace(/\.pdf$/i, "") + "-signed.pdf";
      downloadBlob(blob, name);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  // overlay placements for current page (in CSS px)
  const overlayPlacements = placements
    .map((p, i) => ({ p, i }))
    .filter((it) => it.p.page === pageIdx);

  return (
    <div className="card space-y-4">
      {!pdfFile && (
        <div>
          <button
            onClick={() => pdfInputRef.current?.click()}
            className="btn btn-primary"
          >
            {t("uploadPdf")}
          </button>
          <input
            ref={pdfInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onPdfUpload(f);
            }}
          />
        </div>
      )}

      {pdfFile && (
        <>
          <div className="text-sm text-muted">
            {pdfFile.name}
            <button
              onClick={() => {
                setPdfFile(null);
                setPdfBytes(null);
                setPlacements([]);
                setPageCount(0);
              }}
              className="ml-2 text-xs underline"
            >
              ×
            </button>
          </div>

          <div>
            <label className="label">{t("signatureMode")}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("draw")}
                className={`px-3 py-1.5 text-sm rounded border ${
                  mode === "draw"
                    ? "border-brand-600 text-brand-600 bg-brand-50 dark:bg-brand-900/20"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {t("modeDraw")}
              </button>
              <button
                onClick={() => setMode("upload")}
                className={`px-3 py-1.5 text-sm rounded border ${
                  mode === "upload"
                    ? "border-brand-600 text-brand-600 bg-brand-50 dark:bg-brand-900/20"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {t("modeUpload")}
              </button>
            </div>
          </div>

          {mode === "draw" && (
            <div>
              <label className="label">{t("drawSignature")}</label>
              <canvas
                ref={canvasRef}
                width={500}
                height={160}
                className="border border-gray-300 dark:border-gray-600 rounded bg-white touch-none w-full max-w-md"
                onMouseDown={startDraw}
                onMouseMove={moveDraw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={moveDraw}
                onTouchEnd={endDraw}
              />
              <div className="mt-2">
                <button onClick={clearSignature} className="btn btn-secondary text-sm">
                  {t("clearSig")}
                </button>
              </div>
            </div>
          )}

          {mode === "upload" && (
            <div>
              <label className="label">{t("uploadSignature")}</label>
              <input
                ref={sigInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onUploadSignature(f);
                }}
                className="input"
              />
              {signaturePng && (
                <div className="mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={signaturePng}
                    alt="signature"
                    className="max-h-24 border border-gray-300 dark:border-gray-600 rounded bg-white p-1"
                  />
                </div>
              )}
            </div>
          )}

          <div>
            <label className="label">
              {t("signatureSize")}: {sigSize}px
            </label>
            <input
              type="range"
              min={40}
              max={400}
              value={sigSize}
              onChange={(e) => setSigSize(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>

          {pageCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm">{t("pageNav")}:</span>
              <button
                onClick={() => setPageIdx((p) => Math.max(1, p - 1))}
                disabled={pageIdx <= 1}
                className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-40"
              >
                ‹
              </button>
              <span className="text-sm">
                {pageIdx} / {pageCount}
              </span>
              <button
                onClick={() => setPageIdx((p) => Math.min(pageCount, p + 1))}
                disabled={pageIdx >= pageCount}
                className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-40"
              >
                ›
              </button>
            </div>
          )}

          <div className="text-xs text-muted">{t("placementHint")}</div>

          <div
            ref={overlayRef}
            className="relative inline-block border border-gray-300 dark:border-gray-600 max-w-full overflow-auto"
            onClick={onPreviewClick}
            style={{ cursor: signaturePng ? "crosshair" : "default" }}
          >
            <canvas ref={previewRef} className="block max-w-full h-auto" />
            {signaturePng &&
              overlayPlacements.map(({ p, i }) => {
                if (!previewRef.current) return null;
                const rect = previewRef.current.getBoundingClientRect();
                // Convert PDF coords back to displayed CSS coords
                const ratioX = rect.width / pdfPageSize.w;
                const ratioY = rect.height / pdfPageSize.h;
                const cssX = p.x * ratioX;
                const cssYTop = (pdfPageSize.h - p.y - p.h) * ratioY;
                const cssW = p.w * ratioX;
                const cssH = p.h * ratioY;
                return (
                  <div
                    key={i}
                    className="absolute border-2 border-brand-500/70 group"
                    style={{
                      left: cssX,
                      top: cssYTop,
                      width: cssW,
                      height: cssH,
                      pointerEvents: "auto",
                    }}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      removePlacement(i);
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={signaturePng}
                      alt=""
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                );
              })}
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
          )}

          <div className="flex gap-2">
            <button
              onClick={applyAndDownload}
              disabled={busy || !signaturePng || placements.length === 0}
              className="btn btn-primary"
            >
              {t("applySignature")}
            </button>
            <button
              onClick={applyAndDownload}
              disabled={busy || !signaturePng || placements.length === 0}
              className="btn btn-secondary"
            >
              {t("downloadSignedPdf")}
            </button>
          </div>

          <p className="text-xs text-muted">{t("disclaimer")}</p>
        </>
      )}
    </div>
  );
}
