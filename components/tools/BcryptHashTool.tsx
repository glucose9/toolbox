"use client";
import { useState } from "react";

export default function BcryptHashTool() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [rounds, setRounds] = useState(10);
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    if (!password) return;
    setBusy(true);
    try {
      const bcrypt = (await import("bcryptjs")).default;
      const salt = await bcrypt.genSalt(rounds);
      setHash(await bcrypt.hash(password, salt));
    } finally { setBusy(false); }
  };

  const verify = async () => {
    if (!password || !verifyHash) return;
    setBusy(true);
    try {
      const bcrypt = (await import("bcryptjs")).default;
      setVerifyResult(await bcrypt.compare(password, verifyHash));
    } finally { setBusy(false); }
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">비밀번호</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
      </div>
      <div className="grid grid-cols-2 gap-3 items-end">
        <label className="text-sm">cost factor ({rounds})<input type="range" min="4" max="14" value={rounds} onChange={(e) => setRounds(+e.target.value)} className="w-full" /></label>
        <button onClick={generate} disabled={busy} className="btn btn-primary disabled:opacity-50">해시 생성</button>
      </div>
      {hash && (
        <div><label className="label">해시</label><textarea readOnly value={hash} className="w-full h-20 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs font-mono resize-y" /></div>
      )}
      <hr className="border-gray-200 dark:border-gray-700" />
      <div>
        <label className="label">검증할 해시</label>
        <textarea value={verifyHash} onChange={(e) => setVerifyHash(e.target.value)} className="w-full h-20 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y" />
      </div>
      <button onClick={verify} disabled={busy} className="btn btn-secondary disabled:opacity-50">검증</button>
      {verifyResult !== null && (
        <div className={`p-3 rounded text-center ${verifyResult ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"}`}>
          {verifyResult ? "✓ 일치" : "❌ 불일치"}
        </div>
      )}
    </div>
  );
}
