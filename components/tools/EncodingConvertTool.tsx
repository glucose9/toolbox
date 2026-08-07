"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

// NOTE: iso-2022-kr is intentionally absent — the WHATWG Encoding Standard maps
// it to the "replacement" decoder, so TextDecoder can't actually decode it.
const ENCODINGS = ["utf-8", "euc-kr", "shift_jis", "gb18030", "big5", "windows-1252", "iso-8859-1"];

// 브라우저는 iso-8859-1 을 windows-1252 로 디코드하므로 0x80~0x9F 바이트가 아래 문자로 나타난다.
// 문자 → 바이트 역변환에 charCodeAt & 0xff 를 쓰면 이 구간이 엉뚱한 바이트가 되므로 역매핑이 필요하다.
const CP1252_REVERSE: Record<string, number> = {
  "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84, "…": 0x85, "†": 0x86, "‡": 0x87,
  "ˆ": 0x88, "‰": 0x89, "Š": 0x8a, "‹": 0x8b, "Œ": 0x8c, "Ž": 0x8e, "‘": 0x91,
  "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97, "˜": 0x98,
  "™": 0x99, "š": 0x9a, "›": 0x9b, "œ": 0x9c, "ž": 0x9e, "Ÿ": 0x9f,
};

export default function EncodingConvertTool() {
  const t = useTranslations("toolUI.encoding-convert");
  const tc = useTranslations("common");
  const inputRef = useRef<HTMLInputElement>(null);
  const [encoding, setEncoding] = useState("euc-kr");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const decodeFile = async (f: File) => {
    setError("");
    try {
      const buf = await f.arrayBuffer();
      const decoder = new TextDecoder(encoding);
      setText(decoder.decode(buf));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const reencode = () => {
    // Take currently displayed text (assumed mis-decoded as UTF-8) and re-decode as selected encoding
    setError("");
    try {
      // Convert current text back to bytes (latin-1 / windows-1252 round-trip)
      const bytes = new Uint8Array(text.length);
      let n = 0;
      for (const ch of text) {
        const code = ch.codePointAt(0) ?? 0;
        const byte = code < 0x100 ? code : CP1252_REVERSE[ch];
        if (byte === undefined) {
          // U+FFFD 등 바이트로 되돌릴 수 없는 문자 — 원본 정보가 이미 소실된 상태
          setError(t("reinterpretLossy"));
          return;
        }
        bytes[n++] = byte;
      }
      const decoder = new TextDecoder(encoding);
      setText(decoder.decode(bytes.subarray(0, n)));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const copy = async () => { const ok = await copyText(text); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); } };

  return (
    <div className="card space-y-3">
      <label className="flex flex-wrap items-center gap-2 text-sm">{t("sourceEncoding")} <select value={encoding} onChange={(e) => setEncoding(e.target.value)} className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
        {ENCODINGS.map((e) => <option key={e} value={e}>{e}</option>)}
      </select></label>
      <div
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) decodeFile(f); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="text-5xl mb-3">📄</div>
        <div className="font-medium">{t("uploadFile")}</div>
        <div className="mt-1 text-sm text-muted">{tc("dragOrClick")}</div>
      </div>
      <input ref={inputRef} type="file" accept=".txt,.csv,.log,text/*" onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) decodeFile(f); }} className="hidden" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("placeholder")} className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={copy} disabled={!text} className="btn btn-primary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <button onClick={reencode} className="btn btn-secondary text-xs">{t("reinterpret")}</button>
        </div>
      </details>
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
