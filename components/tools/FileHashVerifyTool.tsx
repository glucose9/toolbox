"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import SparkMD5 from "spark-md5";
import { copyText } from "@/lib/clipboard";

type Algo = "md5" | "sha1" | "sha256" | "sha512";

const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function toHex(buf: ArrayBuffer): string {
  const arr = new Uint8Array(buf);
  let out = "";
  for (let i = 0; i < arr.length; i++) {
    out += arr[i].toString(16).padStart(2, "0");
  }
  return out;
}

function readChunk(file: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export default function FileHashVerifyTool() {
  const t = useTranslations("toolUI.file-hash-verify");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [computing, setComputing] = useState(false);
  const [hashes, setHashes] = useState<Record<Algo, string>>({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });
  const [expected, setExpected] = useState("");
  const [copied, setCopied] = useState<Algo | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function computeAll(f: File) {
    setComputing(true);
    setProgress(0);
    setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });

    const total = f.size;
    const md5 = new SparkMD5.ArrayBuffer();
    // Collect chunks once; reuse for SubtleCrypto algos sequentially.
    // SubtleCrypto doesn't have streaming, so we read chunks, update MD5 incrementally,
    // and concatenate buffers for the final crypto.subtle.digest call per algorithm.
    // For huge files we still want chunked reads to avoid one giant ArrayBuffer in memory
    // for FileReader; we'll concat into a single buffer for digest (necessary).
    const buffers: Uint8Array[] = [];
    let read = 0;
    for (let offset = 0; offset < total; offset += CHUNK_SIZE) {
      const slice = f.slice(offset, Math.min(offset + CHUNK_SIZE, total));
      const buf = await readChunk(slice);
      md5.append(buf);
      buffers.push(new Uint8Array(buf));
      read += buf.byteLength;
      setProgress(Math.round((read / total) * 50)); // first half = MD5/read
    }
    const md5Hex = md5.end();

    // Concat for subtle digest
    let totalLen = 0;
    for (const b of buffers) totalLen += b.byteLength;
    const all = new Uint8Array(totalLen);
    {
      let pos = 0;
      for (const b of buffers) {
        all.set(b, pos);
        pos += b.byteLength;
      }
    }

    const algos: { algo: Algo; subtle: string }[] = [
      { algo: "sha1", subtle: "SHA-1" },
      { algo: "sha256", subtle: "SHA-256" },
      { algo: "sha512", subtle: "SHA-512" },
    ];

    const result: Record<Algo, string> = { md5: md5Hex, sha1: "", sha256: "", sha512: "" };
    for (let i = 0; i < algos.length; i++) {
      const { algo, subtle } = algos[i];
      const digest = await crypto.subtle.digest(subtle, all);
      result[algo] = toHex(digest);
      setProgress(50 + Math.round(((i + 1) / algos.length) * 50));
    }

    setHashes(result);
    setProgress(100);
    setComputing(false);
  }

  function handleFile(f: File) {
    setFile(f);
    setProgress(0);
    setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
    void computeAll(f);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  function copyHash(algo: Algo) {
    const v = hashes[algo];
    if (!v) return;
    void copyText(v).then((ok) => {
      if (!ok) return;
      setCopied(algo);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  const exp = expected.trim().toLowerCase();
  function matchOf(algo: Algo): boolean | null {
    if (!exp || !hashes[algo]) return null;
    return hashes[algo].toLowerCase() === exp;
  }

  const rows: { algo: Algo; label: string }[] = [
    { algo: "md5", label: t("md5") },
    { algo: "sha1", label: t("sha1") },
    { algo: "sha256", label: t("sha256") },
    { algo: "sha512", label: t("sha512") },
  ];

  return (
    <div className="card">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-brand-400"
        }`}
      >
        <p className="text-sm text-muted">{t("dropFile")}</p>
        {file && (
          <p className="mt-2 text-sm font-medium">
            {file.name} <span className="text-muted">({t("fileSize")}: {formatSize(file.size)})</span>
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      {(computing || progress > 0) && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>{computing ? t("computing") : ""}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
            <div
              className="h-full bg-brand-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <label className="label">{t("expectedHash")}</label>
        <textarea
          className="input font-mono text-xs"
          rows={2}
          value={expected}
          onChange={(e) => setExpected(e.target.value)}
          placeholder={t("expectedHint")}
        />
      </div>

      <div className="mt-4 space-y-2">
        {rows.map(({ algo, label }) => {
          const m = matchOf(algo);
          return (
            <div key={algo} className="border border-gray-200 dark:border-gray-700 rounded p-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-semibold">{label}</span>
                <div className="flex items-center gap-2">
                  {m === true && (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      ✓ {t("match")}
                    </span>
                  )}
                  {m === false && (
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                      ✗ {t("noMatch")}
                    </span>
                  )}
                  <button
                    onClick={() => copyHash(algo)}
                    disabled={!hashes[algo]}
                    className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40"
                  >
                    {copied === algo ? t("copied") : t("copyHash")}
                  </button>
                </div>
              </div>
              <div className="font-mono text-xs break-all text-muted min-h-[1.25rem]">
                {hashes[algo] || (computing ? "…" : "")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
