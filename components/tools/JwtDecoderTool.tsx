"use client";

import { useMemo, useState } from "react";

function b64urlDecode(s: string): string {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  try {
    const bin = atob(s);
    return decodeURIComponent(
      bin
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  } catch {
    return atob(s);
  }
}

function fmtTime(ts: unknown): string {
  if (typeof ts !== "number") return "";
  const d = new Date(ts * 1000);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

export default function JwtDecoderTool() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  const { header, payload, signature, error } = useMemo(() => {
    if (!token.trim()) return { header: null, payload: null, signature: "", error: "" };
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { header: null, payload: null, signature: "", error: "JWT는 세 부분(header.payload.signature)이어야 합니다." };
    try {
      const h = JSON.parse(b64urlDecode(parts[0]));
      const p = JSON.parse(b64urlDecode(parts[1]));
      return { header: h, payload: p, signature: parts[2], error: "" };
    } catch (e) {
      return { header: null, payload: null, signature: "", error: (e as Error).message };
    }
  }, [token]);

  const exp = payload?.exp as number | undefined;
  const isExpired = typeof exp === "number" && Date.now() / 1000 > exp;

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">JWT 토큰</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs resize-y font-mono break-all"
        />
      </div>

      {error && <div className="text-sm text-red-600">❌ {error}</div>}

      {header && payload && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="label">헤더</label>
              <pre className="p-3 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded text-xs overflow-x-auto">
                {JSON.stringify(header, null, 2)}
              </pre>
            </div>
            <div>
              <label className="label">페이로드</label>
              <pre className="p-3 border border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800 rounded text-xs overflow-x-auto">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </div>

          <div className="text-sm space-y-1 bg-gray-50 dark:bg-gray-900 p-3 rounded">
            {payload.iat && (
              <div><span className="text-muted">iat (발급):</span> {fmtTime(payload.iat)}</div>
            )}
            {payload.exp && (
              <div>
                <span className="text-muted">exp (만료):</span> {fmtTime(payload.exp)}{" "}
                {isExpired ? <span className="text-red-600 font-semibold">⚠ 만료됨</span> : <span className="text-green-600">✓ 유효</span>}
              </div>
            )}
            {payload.nbf && (
              <div><span className="text-muted">nbf (시작):</span> {fmtTime(payload.nbf)}</div>
            )}
          </div>

          <div className="text-xs text-muted">
            <strong>서명:</strong> <code className="break-all">{signature}</code> — 검증은 비밀 키 없이 불가능합니다.
          </div>
        </>
      )}
    </div>
  );
}
