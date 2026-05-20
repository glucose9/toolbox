"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function encode(text: string, urlSafe: boolean) {
  try {
    const bytes = new TextEncoder().encode(text);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    let b64 = btoa(bin);
    if (urlSafe) b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return b64;
  } catch {
    return "";
  }
}

function decode(b64: string, urlSafe: boolean) {
  try {
    let s = b64;
    if (urlSafe) s = s.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    const bin = atob(s);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}

export default function Base64Tool() {
  const t = useTranslations("toolUI.base64");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [text, setText] = useState("");

  const result = mode === "encode" ? encode(text, urlSafe) : decode(text, urlSafe);

  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-4">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMode("encode")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium ${mode === "encode" ? "bg-white shadow-sm" : "text-gray-600"}`}
          >
            {t("encode")}
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium ${mode === "decode" ? "bg-white shadow-sm" : "text-gray-600"}`}
          >
            {t("decode")}
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} />
          URL-safe
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">{mode === "encode" ? t("sourceText") : "Base64"}</label>
          <textarea
            className="input min-h-[200px] font-mono text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={mode === "encode" ? t("placeholderEncode") : t("placeholderDecode")}
          />
        </div>
        <div>
          <label className="label flex items-center justify-between">
            <span>{mode === "encode" ? t("base64Result") : t("decodeResult")}</span>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              disabled={!result}
              className="text-xs text-brand-600 hover:underline disabled:opacity-30"
            >
              {t("copy")}
            </button>
          </label>
          <textarea
            className="input min-h-[200px] font-mono text-sm bg-gray-50"
            value={result}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
