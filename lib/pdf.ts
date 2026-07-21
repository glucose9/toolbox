"use client";

export async function readBytes(file: File): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  return new Uint8Array(buf);
}

export function isPdfFile(file: File): boolean {
  return file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export function fmtBytes(n: number) {
  return n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function parsePageRanges(input: string, max: number): number[] {
  const pages = new Set<number>();
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  for (const p of parts) {
    const m = p.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      if (a > b) throw new Error(`잘못된 범위: "${p}" (시작 페이지가 끝 페이지보다 큽니다)`);
      if (a < 1 || b > max) throw new Error(`범위를 벗어난 페이지: "${p}" (1-${max})`);
      for (let i = a; i <= b; i++) pages.add(i);
    } else if (/^\d+$/.test(p)) {
      const n = parseInt(p, 10);
      if (n < 1 || n > max) throw new Error(`범위를 벗어난 페이지: "${p}" (1-${max})`);
      pages.add(n);
    } else {
      throw new Error(`잘못된 범위 형식: "${p}"`);
    }
  }
  return [...pages].sort((a, b) => a - b);
}

export function parsePageGroups(input: string, max: number): number[][] {
  const groups: number[][] = [];
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  for (const p of parts) {
    const m = p.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      if (a > b) throw new Error(`잘못된 범위: "${p}" (시작 페이지가 끝 페이지보다 큽니다)`);
      if (a < 1 || b > max) throw new Error(`범위를 벗어난 페이지: "${p}" (1-${max})`);
      const range: number[] = [];
      for (let i = a; i <= b; i++) range.push(i);
      groups.push(range);
    } else if (/^\d+$/.test(p)) {
      const n = parseInt(p, 10);
      if (n < 1 || n > max) throw new Error(`범위를 벗어난 페이지: "${p}" (1-${max})`);
      groups.push([n]);
    } else {
      throw new Error(`잘못된 범위 형식: "${p}"`);
    }
  }
  return groups;
}
