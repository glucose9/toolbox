"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

// Core must be the ESM build: the class worker runs as a module worker, where
// importScripts() throws and the fallback is `(await import(coreURL)).default`
// — the UMD core has no default export, so it fails with ERROR_IMPORT_FAILURE.
const CORE_BASE = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";

let cached: FFmpeg | null = null;
let loading: Promise<FFmpeg> | null = null;

export async function getFFmpeg(
  onProgress?: (msg: string) => void,
  onRatio?: (pct: number) => void
): Promise<FFmpeg> {
  if (cached) return cached;
  if (loading) return loading;
  loading = (async () => {
    const f = new FFmpeg();
    onProgress?.("ffmpeg 엔진 다운로드 중 (~25MB, 첫 실행만)...");
    // The wasm dominates the payload; feed its download into the same
    // status/progress channel the tools already render, so the first-run
    // 25MB wait shows a moving bar instead of freezing at 2%.
    const onWasmProgress = ({ total, received }: { total: number; received: number }) => {
      if (total > 0) {
        const pct = Math.round((received / total) * 100);
        onProgress?.(`ffmpeg 엔진 다운로드 중 ${pct}% (~25MB, 첫 실행만)`);
        onRatio?.(pct);
      }
    };
    await f.load({
      // Self-hosted single-file ESM worker (see scripts/bundle-ffmpeg-worker.mjs),
      // loaded as a blob. Every alternative fails: the UMD dist worker cannot
      // dynamic-import the core (webpack-compiled → "Cannot find module"), the
      // raw ESM dist worker has relative imports that break as a blob, and a
      // plain same-origin URL resolves against the bundle's file:// base /
      // errors opaquely as a worker script.
      classWorkerURL: await toBlobURL("/ffmpeg-worker.js", "text/javascript"),
      coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, "application/wasm", true, onWasmProgress),
    });
    cached = f;
    onProgress?.("ffmpeg 엔진 준비 완료");
    onRatio?.(0);
    return f;
  })().catch((e) => {
    loading = null;
    throw e;
  });
  return loading;
}

export async function ffmpegFetchFile(file: File | Blob): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  return new Uint8Array(buf);
}
