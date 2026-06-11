"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

// NOTE: iso-2022-kr is intentionally absent — the WHATWG Encoding Standard maps
// it to the "replacement" decoder, so TextDecoder can't actually decode it.
const ENCODINGS = ["utf-8", "euc-kr", "shift_jis", "gb18030", "big5", "windows-1252", "iso-8859-1"];

export default function EncodingConvertTool() {
  const t = useTranslations("toolUI.encoding-convert");
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
      // Convert current text back to bytes via Latin-1 (each char = 1 byte preserved)
      const bytes = new Uint8Array(text.length);
      for (let i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i) & 0xff;
      const decoder = new TextDecoder(encoding);
      setText(decoder.decode(bytes));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label>{t("sourceEncoding")} <select value={encoding} onChange={(e) => setEncoding(e.target.value)} className="ml-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
          {ENCODINGS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select></label>
        <button onClick={() => inputRef.current?.click()} className="btn btn-primary text-xs">{t("uploadFile")}</button>
        <input ref={inputRef} type="file" accept=".txt,.csv,.log,text/*" onChange={(e) => e.target.files?.[0] && decodeFile(e.target.files[0])} className="hidden" />
        <button onClick={reencode} className="btn btn-secondary text-xs">{t("reinterpret")}</button>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("placeholder")} className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={copy} disabled={!text} className="btn btn-primary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
