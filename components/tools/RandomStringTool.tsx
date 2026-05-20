"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const PRESETS = {
  alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  alnum: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  hex: "0123456789abcdef",
  numeric: "0123456789",
  base64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  url: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
};

export default function RandomStringTool() {
  const t = useTranslations("toolUI.random-string");
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [charsetName, setCharsetName] = useState<keyof typeof PRESETS>("alnum");
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const charset = PRESETS[charsetName];
    const out: string[] = [];
    for (let i = 0; i < count; i++) {
      const bytes = new Uint32Array(length);
      crypto.getRandomValues(bytes);
      let s = "";
      for (let j = 0; j < length; j++) s += charset[bytes[j] % charset.length];
      out.push(s);
    }
    setResults(out);
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label>{t("length")}<input type="number" min="1" max="256" value={length} onChange={(e) => setLength(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>{t("count")}<input type="number" min="1" max="100" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
      </div>
      <select value={charsetName} onChange={(e) => setCharsetName(e.target.value as keyof typeof PRESETS)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm">
        <option value="alnum">{t("alnum")}</option>
        <option value="alpha">{t("alpha")}</option>
        <option value="numeric">{t("numeric")}</option>
        <option value="hex">{t("hex")}</option>
        <option value="base64">{t("base64")}</option>
        <option value="url">{t("url")}</option>
      </select>
      <button onClick={generate} className="btn btn-primary w-full">🎲 {t("generate")}</button>
      <textarea readOnly value={results.join("\n")} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={() => navigator.clipboard.writeText(results.join("\n"))} disabled={results.length === 0} className="btn btn-secondary disabled:opacity-50">{t("copyAll")}</button>
    </div>
  );
}
