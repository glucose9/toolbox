"use client";

export async function readMdFile(file: File): Promise<string> {
  return await file.text();
}

export async function imageToMarkdown(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const alt = file.name.replace(/\.[^.]+$/, "");
      resolve(`![${alt}](${String(reader.result || "")})`);
    };
    reader.onerror = () => reject(reader.error || new Error("이미지 읽기 실패"));
    reader.readAsDataURL(file);
  });
}

export function insertAtCursor(ta: HTMLTextAreaElement, insertion: string): { value: string; cursor: number } {
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const before = ta.value.slice(0, start);
  const after = ta.value.slice(end);
  const value = before + insertion + after;
  return { value, cursor: start + insertion.length };
}

export function downloadText(content: string, filename: string, mime = "text/markdown;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
