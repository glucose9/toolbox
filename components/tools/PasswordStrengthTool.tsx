"use client";

import { useMemo, useState } from "react";

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

function detectPatterns(pw: string): string[] {
  const issues: string[] = [];
  if (pw.length < 8) issues.push("길이가 8자 미만");
  if (!/[A-Z]/.test(pw)) issues.push("대문자 없음");
  if (!/[a-z]/.test(pw)) issues.push("소문자 없음");
  if (!/[0-9]/.test(pw)) issues.push("숫자 없음");
  if (!/[^a-zA-Z0-9]/.test(pw)) issues.push("특수문자 없음");
  if (/(.)\1{2,}/.test(pw)) issues.push("같은 글자 3회 이상 반복");
  if (/(?:0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf|zxcv)/i.test(pw)) issues.push("연속/키보드 패턴");
  if (COMMON.has(pw.toLowerCase())) issues.push("매우 흔한 비밀번호");
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

function label(s: number): { text: string; color: string } {
  if (s < 30) return { text: "매우 약함", color: "bg-red-500" };
  if (s < 50) return { text: "약함", color: "bg-orange-500" };
  if (s < 70) return { text: "보통", color: "bg-yellow-500" };
  if (s < 85) return { text: "강함", color: "bg-lime-500" };
  return { text: "매우 강함", color: "bg-green-500" };
}

function crackTime(e: number): string {
  // assume 1e10 guesses/sec (offline GPU)
  const seconds = Math.pow(2, e) / 1e10;
  if (seconds < 1) return "즉시";
  if (seconds < 60) return `${seconds.toFixed(1)}초`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)}분`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)}시간`;
  if (seconds < 86400 * 365) return `${(seconds / 86400).toFixed(1)}일`;
  if (seconds < 86400 * 365 * 1000) return `${(seconds / (86400 * 365)).toFixed(1)}년`;
  return `${(seconds / (86400 * 365)).toExponential(1)}년`;
}

export default function PasswordStrengthTool() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const { s, e, issues, lab } = useMemo(() => {
    const e = entropy(pw);
    const issues = detectPatterns(pw);
    const s = score(pw);
    return { s, e, issues, lab: label(s) };
  }, [pw]);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">검사할 비밀번호 (브라우저 안에서만 처리됨)</label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="여기에 입력"
            className="w-full px-3 py-2 pr-12 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
          />
          <button onClick={() => setShow((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-brand-600 hover:underline">
            {show ? "숨기기" : "보기"}
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="font-semibold">{pw ? lab.text : "—"}</span>
          <span className="text-muted">{s}/100</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
          <div className={`h-full ${pw ? lab.color : ""} transition-all`} style={{ width: `${s}%` }} />
        </div>
      </div>

      {pw && (
        <div className="text-sm space-y-1 bg-gray-50 dark:bg-gray-900 p-3 rounded">
          <div><span className="text-muted">엔트로피:</span> <span className="font-mono">{e.toFixed(1)} bits</span></div>
          <div><span className="text-muted">예상 크래킹 시간:</span> {crackTime(e)} <span className="text-xs text-muted">(오프라인 GPU 1e10/s 기준)</span></div>
          <div><span className="text-muted">길이:</span> {pw.length}자</div>
        </div>
      )}

      {issues.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-1">개선 제안</div>
          <ul className="text-sm space-y-0.5">
            {issues.map((i) => (
              <li key={i} className="text-orange-600 dark:text-orange-400">• {i}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-xs text-muted">
        보통 권장: 12자 이상, 대소문자·숫자·특수문자 혼합, 사전 단어 / 키보드 패턴 회피.
      </div>
    </div>
  );
}
