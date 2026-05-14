"use client";

import type { HwpDocument as HwpDocumentType } from "@rhwp/core";

type Rhwp = typeof import("@rhwp/core");

let modulePromise: Promise<Rhwp> | null = null;

async function loadModule(): Promise<Rhwp> {
  if (modulePromise) return modulePromise;
  modulePromise = (async () => {
    const mod = await import("@rhwp/core");
    await mod.default({ module_or_path: "/rhwp_bg.wasm" });
    const g = globalThis as unknown as {
      measureTextWidth?: (font: string, text: string) => number;
    };
    if (!g.measureTextWidth) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      g.measureTextWidth = (font, text) => {
        ctx.font = font;
        return ctx.measureText(text).width;
      };
    }
    return mod;
  })();
  return modulePromise;
}

export async function openHwp(bytes: Uint8Array): Promise<HwpDocumentType> {
  const { HwpDocument } = await loadModule();
  return new HwpDocument(bytes);
}

export async function readFileBytes(file: File): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  return new Uint8Array(buf);
}

export function isHwpFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return name.endsWith(".hwp") || name.endsWith(".hwpx");
}

export function extractAllText(doc: HwpDocumentType): string {
  const out: string[] = [];
  const sectionCount = doc.getSectionCount();
  for (let s = 0; s < sectionCount; s++) {
    const paraCount = doc.getParagraphCount(s);
    for (let p = 0; p < paraCount; p++) {
      const len = doc.getParagraphLength(s, p);
      if (len > 0) {
        const text = doc.getTextRange(s, p, 0, len);
        if (text) out.push(text);
      } else {
        out.push("");
      }
    }
    if (s < sectionCount - 1) out.push("");
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
