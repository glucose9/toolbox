"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";

type Tab = "split" | "join";
type Unit = "KB" | "MB";

interface Part {
  name: string;
  blob: Blob;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function partNumber(name: string): number {
  const m = name.match(/\.part(\d+)$/i);
  if (m) return parseInt(m[1], 10);
  const m2 = name.match(/\.(\d+)$/);
  if (m2) return parseInt(m2[1], 10);
  return 0;
}

function baseName(name: string): string {
  return name.replace(/\.part\d+$/i, "").replace(/\.\d+$/, "");
}

export default function FileSplitJoinTool() {
  const t = useTranslations("toolUI.file-split-join");
  const [tab, setTab] = useState<Tab>("split");

  // split state
  const [file, setFile] = useState<File | null>(null);
  const [chunkSize, setChunkSize] = useState(10);
  const [unit, setUnit] = useState<Unit>("MB");
  const [parts, setParts] = useState<Part[]>([]);
  const [busy, setBusy] = useState(false);
  const splitInputRef = useRef<HTMLInputElement>(null);

  // join state
  const [joinFiles, setJoinFiles] = useState<File[]>([]);
  const [joined, setJoined] = useState<{ name: string; blob: Blob } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const joinInputRef = useRef<HTMLInputElement>(null);

  function chunkBytes(): number {
    const factor = unit === "MB" ? 1024 * 1024 : 1024;
    return Math.max(1, Math.floor(chunkSize * factor));
  }

  async function doSplit() {
    if (!file) return;
    setBusy(true);
    setParts([]);
    const size = file.size;
    const cs = chunkBytes();
    const list: Part[] = [];
    let idx = 1;
    for (let offset = 0; offset < size; offset += cs) {
      const end = Math.min(offset + cs, size);
      const slice = file.slice(offset, end);
      list.push({
        name: `${file.name}.part${String(idx).padStart(3, "0")}`,
        blob: slice,
      });
      idx++;
    }
    setParts(list);
    setBusy(false);
  }

  async function downloadAllZip() {
    if (parts.length === 0) return;
    setBusy(true);
    const zip = new JSZip();
    for (const p of parts) {
      zip.file(p.name, p.blob);
    }
    const out = await zip.generateAsync({ type: "blob" });
    downloadBlob(out, `${file?.name || "parts"}.zip`);
    setBusy(false);
  }

  function handleJoinFiles(fs: FileList | File[]) {
    const arr = Array.from(fs);
    arr.sort((a, b) => partNumber(a.name) - partNumber(b.name));
    setJoinFiles(arr);
    setJoined(null);
  }

  async function doJoin() {
    if (joinFiles.length === 0) return;
    setBusy(true);
    const blob = new Blob(joinFiles, { type: "application/octet-stream" });
    const name = baseName(joinFiles[0].name) || "joined.bin";
    setJoined({ name, blob });
    setBusy(false);
  }

  function onJoinDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const fs = e.dataTransfer.files;
    if (fs && fs.length > 0) handleJoinFiles(fs);
  }

  return (
    <div className="card">
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          onClick={() => setTab("split")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            tab === "split"
              ? "border-brand-600 text-brand-600"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }`}
        >
          {t("tabSplit")}
        </button>
        <button
          onClick={() => setTab("join")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            tab === "join"
              ? "border-brand-600 text-brand-600"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }`}
        >
          {t("tabJoin")}
        </button>
      </div>

      {tab === "split" && (
        <div className="space-y-4">
          <div>
            <button
              onClick={() => splitInputRef.current?.click()}
              className="btn btn-secondary"
            >
              {t("selectFile")}
            </button>
            <input
              ref={splitInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                  setParts([]);
                }
              }}
            />
            {file && (
              <span className="ml-3 text-sm text-muted">
                {file.name} ({formatSize(file.size)})
              </span>
            )}
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="label">{t("chunkSize")}</label>
              <input
                type="number"
                min={1}
                className="input"
                value={chunkSize}
                onChange={(e) => setChunkSize(Math.max(1, parseInt(e.target.value || "1", 10)))}
              />
            </div>
            <div>
              <label className="label">{t("chunkSizeUnit")}</label>
              <select
                className="input"
                value={unit}
                onChange={(e) => setUnit(e.target.value as Unit)}
              >
                <option value="KB">KB</option>
                <option value="MB">MB</option>
              </select>
            </div>
            <button
              onClick={doSplit}
              disabled={!file || busy}
              className="btn btn-primary"
            >
              {t("splitNow")}
            </button>
          </div>

          {parts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {t("parts")} ({parts.length})
                </span>
                <button
                  onClick={downloadAllZip}
                  disabled={busy}
                  className="btn btn-secondary text-sm"
                >
                  {t("downloadAll")}
                </button>
              </div>
              <div className="max-h-72 overflow-auto border border-gray-200 dark:border-gray-700 rounded">
                {parts.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0 text-sm"
                  >
                    <span className="font-mono truncate flex-1 mr-2">{p.name}</span>
                    <span className="text-muted text-xs mr-3">{formatSize(p.blob.size)}</span>
                    <button
                      onClick={() => downloadBlob(p.blob, p.name)}
                      className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {t("download")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "join" && (
        <div className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onJoinDrop}
            onClick={() => joinInputRef.current?.click()}
            className={`rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
              dragOver
                ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-brand-400"
            }`}
          >
            <p className="text-sm text-muted">{t("selectParts")}</p>
            <input
              ref={joinInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleJoinFiles(e.target.files);
              }}
            />
          </div>

          {joinFiles.length > 0 && (
            <div className="max-h-60 overflow-auto border border-gray-200 dark:border-gray-700 rounded">
              {joinFiles.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0 text-sm"
                >
                  <span className="font-mono truncate flex-1 mr-2">{f.name}</span>
                  <span className="text-muted text-xs">{formatSize(f.size)}</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={doJoin}
            disabled={joinFiles.length === 0 || busy}
            className="btn btn-primary"
          >
            {t("joinNow")}
          </button>

          {joined && (
            <div className="border border-gray-200 dark:border-gray-700 rounded p-3 flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium">{t("joinedFile")}</div>
                <div className="text-muted text-xs font-mono">
                  {joined.name} ({formatSize(joined.blob.size)})
                </div>
              </div>
              <button
                onClick={() => downloadBlob(joined.blob, joined.name)}
                className="btn btn-secondary"
              >
                {t("download")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
