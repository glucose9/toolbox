"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

type Mode = "component" | "uri";
type Op = "encode" | "decode";

export default function UrlEncoderTool() {
  const t = useTranslations("toolUI.url-encoder");
  const tc = useTranslations("common");
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("component");
  const [op, setOp] = useState<Op>("encode");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: "" };
    try {
      const fn =
        op === "encode"
          ? mode === "component"
            ? encodeURIComponent
            : encodeURI
          : mode === "component"
            ? decodeURIComponent
            : decodeURI;
      return { output: fn(input), error: "" };
    } catch (e) {
      return {
        output: "",
        error:
          (op === "encode" ? t("encodeFailed") : t("decodeFailed")) +
          ": " +
          (e as Error).message,
      };
    }
  }, [input, mode, op, t]);

  const copy = async () => {
    const ok = await copyText(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="card space-y-3">
      <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setOp("encode")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium ${op === "encode" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm" : "text-gray-600 dark:text-gray-400"}`}
        >
          {t("encode")}
        </button>
        <button
          onClick={() => setOp("decode")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium ${op === "decode" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm" : "text-gray-600 dark:text-gray-400"}`}
        >
          {t("decode")}
        </button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("placeholder")}
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <textarea
        readOnly
        value={output}
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={copy} disabled={!output} className="btn btn-secondary disabled:opacity-50">
        {copied ? t("copied") : t("copy")}
      </button>
      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <div className="flex items-center gap-3 text-sm">
            <label className="flex items-center gap-1">
              <input type="radio" checked={mode === "component"} onChange={() => setMode("component")} />
              encodeURIComponent
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" checked={mode === "uri"} onChange={() => setMode("uri")} />
              encodeURI
            </label>
          </div>
        </div>
      </details>
    </div>
  );
}
