"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const COMMON = new Set([
  "password", "123456", "12345678", "qwerty", "abc123", "111111", "password1",
  "asdf", "asdfasdf", "iloveyou", "admin", "letmein", "1q2w3e4r", "qwer1234",
  "1234", "12345", "1234567", "123456789", "1234567890", "monkey", "dragon",
  "0000", "aaaa", "asdasd", "qweqwe",
]);

function entropy(pw: string): number {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  return pool > 0 ? Math.log2(pool) * pw.length : 0;
}

const ISSUE_KEYS = {
  tooShort: "tooShort",
  noUpper: "noUpper",
  noLower: "noLower",
  noDigit: "noDigit",
  noSymbol: "noSymbol",
  repeat: "repeat",
  sequence: "sequence",
  common: "common",
} as const;

function detectPatterns(pw: string): string[] {
  const issues: string[] = [];
  if (pw.length < 8) issues.push(ISSUE_KEYS.tooShort);
  if (!/[A-Z]/.test(pw)) issues.push(ISSUE_KEYS.noUpper);
  if (!/[a-z]/.test(pw)) issues.push(ISSUE_KEYS.noLower);
  if (!/[0-9]/.test(pw)) issues.push(ISSUE_KEYS.noDigit);
  if (!/[^a-zA-Z0-9]/.test(pw)) issues.push(ISSUE_KEYS.noSymbol);
  if (/(.)\1{2,}/.test(pw)) issues.push(ISSUE_KEYS.repeat);
  if (/(?:0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf|zxcv)/i.test(pw)) issues.push(ISSUE_KEYS.sequence);
  if (COMMON.has(pw.toLowerCase())) issues.push(ISSUE_KEYS.common);
  return issues;
}

function score(pw: string): number {
  if (!pw) return 0;
  const e = entropy(pw);
  const issues = detectPatterns(pw);
  let s = Math.min(100, (e / 80) * 100);
  s -= issues.length * 8;
  if (COMMON.has(pw.toLowerCase())) s = Math.min(s, 15);
  if (pw.length < 6) s = Math.min(s, 10);
  return Math.max(0, Math.round(s));
}

function labelKey(s: number): { key: string; color: string } {
  if (s < 30) return { key: "veryWeak", color: "bg-red-500" };
  if (s < 50) return { key: "weak", color: "bg-orange-500" };
  if (s < 70) return { key: "medium", color: "bg-yellow-500" };
  if (s < 85) return { key: "strong", color: "bg-lime-500" };
  return { key: "veryStrong", color: "bg-green-500" };
}

export default function PasswordStrengthTool() {
  const t = useTranslations("toolUI.password-strength");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const { s, e, issues, lab } = useMemo(() => {
    const ee = entropy(pw);
    const iss = detectPatterns(pw);
    const ss = score(pw);
    return { s: ss, e: ee, issues: iss, lab: labelKey(ss) };
  }, [pw]);

  const crackTime = (ee: number): string => {
    // 2^ee overflows to Infinity around ee >= 1024, so switch to log-space.
    if (ee >= 1000) {
      const log10Years = ee * Math.log10(2) - 10 - Math.log10(86400 * 365);
      const exp10 = Math.floor(log10Years);
      const mantissa = Math.pow(10, log10Years - exp10);
      return `${mantissa.toFixed(1)}e+${exp10}${t("unitYear")}`;
    }
    const seconds = Math.pow(2, ee) / 1e10;
    if (seconds < 1) return t("crackInstant");
    if (seconds < 60) return `${seconds.toFixed(1)}${t("unitSec")}`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)}${t("unitMin")}`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)}${t("unitHour")}`;
    if (seconds < 86400 * 365) return `${(seconds / 86400).toFixed(1)}${t("unitDay")}`;
    if (seconds < 86400 * 365 * 1000) return `${(seconds / (86400 * 365)).toFixed(1)}${t("unitYear")}`;
    return `${(seconds / (86400 * 365)).toExponential(1)}${t("unitYear")}`;
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("inputLabel")}</label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(ev) => setPw(ev.target.value)}
            placeholder={t("inputPlaceholder")}
            className="w-full px-3 py-2 pr-12 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
          />
          <button onClick={() => setShow((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-brand-600 hover:underline">
            {show ? t("hide") : t("show")}
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="font-semibold">{pw ? t(`label.${lab.key}`) : "—"}</span>
          <span className="text-muted">{s}/100</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
          <div className={`h-full ${pw ? lab.color : ""} transition-all`} style={{ width: `${s}%` }} />
        </div>
      </div>

      {pw && (
        <div className="text-sm space-y-1 bg-gray-50 dark:bg-gray-900 p-3 rounded">
          <div><span className="text-muted">{t("entropy")}</span> <span className="font-mono">{e.toFixed(1)} bits</span></div>
          <div><span className="text-muted">{t("crackTime")}</span> {crackTime(e)} <span className="text-xs text-muted">{t("crackNote")}</span></div>
          <div><span className="text-muted">{t("length")}</span> {pw.length}{t("unitChar")}</div>
        </div>
      )}

      {issues.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-1">{t("suggestions")}</div>
          <ul className="text-sm space-y-0.5">
            {issues.map((i) => (
              <li key={i} className="text-orange-600 dark:text-orange-400">• {t(`issue.${i}`)}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-xs text-muted">
        {t("recommendation")}
      </div>
    </div>
  );
}
