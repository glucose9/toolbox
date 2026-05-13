"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

const CORE_BASE = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
const FFMPEG_BASE = "https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/umd";

let cached: FFmpeg | null = null;
let loading: Promise<FFmpeg> | null = null;

export async function getFFmpeg(onProgress?: (msg: string) => void): Promise<FFmpeg> {
  if (cached) return cached;
  if (loading) return loading;
  loading = (async () => {
    const f = new FFmpeg();
    onProgress?.("ffmpeg.wasm 다운로드 중 (~25MB, 첫 실행만)...");
    await f.load({
      classWorkerURL: await toBlobURL(`${FFMPEG_BASE}/814.ffmpeg.js`, "text/javascript"),
      coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, "application/wasm"),
    });
    cached = f;
    onProgress?.("ffmpeg.wasm 로드 완료");
    return f;
  })();
  return loading;
}

export async function ffmpegFetchFile(file: File | Blob): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  return new Uint8Array(buf);
}
