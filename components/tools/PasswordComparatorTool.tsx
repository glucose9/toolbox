"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Keep this scoring identical to PasswordStrengthTool so both tools agree.
const COMMON = new Set([
  "password", "123456", "12345678", "qwerty", "abc123", "111111", "password1",
  "asdf", "asdfasdf", "iloveyou", "admin", "letmein", "1q2w3e4r", "qwer1234",
  "1234", "12345", "1234567", "123456789", "1234567890", "monkey", "dragon",
  "0000", "aaaa", "asdasd", "qweqwe",
]);

function score(pw: string): number {
  if (!pw) return 0;
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  const e = pool > 0 ? Math.log2(pool) * pw.length : 0;
  const isCommon = COMMON.has(pw.toLowerCase());
  let issues = 0;
  if (pw.length < 8) issues++;
  if (!/[A-Z]/.test(pw)) issues++;
  if (!/[a-z]/.test(pw)) issues++;
  if (!/[0-9]/.test(pw)) issues++;
  if (!/[^a-zA-Z0-9]/.test(pw)) issues++;
  if (/(.)\1{2,}/.test(pw)) issues++;
  if (/(?:0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf|zxcv)/i.test(pw)) issues++;
  if (isCommon) issues++;
  let s = Math.min(100, (e / 80) * 100);
  s -= issues * 8;
  if (isCommon) s = Math.min(s, 15);
  if (pw.length < 6) s = Math.min(s, 10);
  return Math.max(0, Math.round(s));
}

function color(s: number): string {
  if (s < 30) return "bg-red-500";
  if (s < 50) return "bg-orange-500";
  if (s < 70) return "bg-yellow-500";
  if (s < 85) return "bg-lime-500";
  return "bg-green-500";
}

export default function PasswordComparatorTool() {
  const t = useTranslations("toolUI.password-comparator");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const sa = score(a), sb = score(b);
  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {[{ v: a, set: setA, s: sa, n: "A" }, { v: b, set: setB, s: sb, n: "B" }].map((x) => (
          <div key={x.n} className="space-y-2">
            <label className="label">{t("password")} {x.n}</label>
            <input type="text" value={x.v} onChange={(e) => x.set(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden"><div className={`h-full ${color(x.s)}`} style={{ width: `${x.s}%` }} /></div>
            <div className="text-sm text-center">{x.s}/100</div>
          </div>
        ))}
      </div>
      {a && b && (
        <div className="text-center bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-3">
          <strong>{sa === sb ? t("equal") : sa > sb ? "A" : "B"}</strong>{sa !== sb ? t("safer") : t("sameStrength")}
        </div>
      )}
    </div>
  );
}
