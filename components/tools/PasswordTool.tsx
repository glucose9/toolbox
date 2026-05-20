"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

function generate(length: number, options: { lower: boolean; upper: boolean; digits: boolean; symbols: boolean }) {
  let alphabet = "";
  if (options.lower) alphabet += LOWER;
  if (options.upper) alphabet += UPPER;
  if (options.digits) alphabet += DIGITS;
  if (options.symbols) alphabet += SYMBOLS;
  if (!alphabet) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < length; i++) out += alphabet[arr[i] % alphabet.length];
  return out;
}

export default function PasswordTool() {
  const t = useTranslations("toolUI.password-generator");
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(() => {
    setPassword(generate(length, { lower, upper, digits, symbols }));
    setCopied(false);
  }, [length, lower, upper, digits, symbols]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const strength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 3) return { label: t("weak"), color: "bg-red-500", w: "33%" };
    if (score <= 5) return { label: t("medium"), color: "bg-yellow-500", w: "66%" };
    return { label: t("strong"), color: "bg-green-500", w: "100%" };
  };

  const s = strength(password);

  return (
    <div className="card space-y-4">
      <div className="flex gap-2">
        <input
          className="input font-mono text-lg"
          readOnly
          value={password}
        />
        <button onClick={refresh} className="btn btn-secondary whitespace-nowrap">{t("regenerate")}</button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="btn btn-primary whitespace-nowrap"
        >
          {copied ? t("copied") : t("copy")}
        </button>
      </div>

      <div>
        <div className="flex justify-between text-sm">
          <span>{t("strength")}: {s.label}</span>
        </div>
        <div className="mt-1 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${s.color} transition-all`} style={{ width: s.w }} />
        </div>
      </div>

      <div>
        <label className="label">{t("length", { n: length })}</label>
        <input
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} />
          {t("lowercase")}
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} />
          {t("uppercase")}
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={digits} onChange={(e) => setDigits(e.target.checked)} />
          {t("digits")}
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
          {t("symbols")}
        </label>
      </div>
    </div>
  );
}
