"use client";

import { useState } from "react";

export default function PdfUnlockTool() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const unlock = async () => {
    if (!file) return;
    setBusy(true);
    setStatus(null);
    setResultUrl(null);
    try {
      const buf = await file.arrayBuffer();
      const { PDFDocument } = await import("pdf-lib");

      // pdf-lib doesn't accept passwords directly. We use ignoreEncryption
      // to strip owner-level restrictions (edit/print/copy) and re-save.
      // PDFs encrypted with a real user-open password generally won't be
      // readable this way — those require a different toolchain.
      const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });

      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("✓ 처리 완료. 편집/인쇄/복사 제한이 걸린 PDF였다면 제한이 해제됩니다. 다운로드 버튼으로 받으세요.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "알 수 없는 오류";
      if (msg.toLowerCase().includes("password") || msg.toLowerCase().includes("encrypt")) {
        setStatus("❌ 사용자 열기 암호가 설정된 PDF입니다. 이 도구는 본문 자체를 잠근 PDF는 해제할 수 없습니다. 한컴오피스·Adobe Acrobat 같은 정식 도구에서 본래 암호로 열어 저장하세요.");
      } else {
        setStatus(`❌ 처리 실패: ${msg}`);
      }
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = file.name.replace(/\.pdf$/i, "") + "-unlocked.pdf";
    a.click();
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">잠긴 PDF 파일</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => { setFile(e.target.files?.[0] || null); setStatus(null); setResultUrl(null); }}
          className="block w-full text-sm"
        />
        {file && <div className="text-xs text-muted mt-1">{file.name} · {(file.size / 1024).toFixed(0)} KB</div>}
      </div>

      <button onClick={unlock} disabled={!file || busy} className="btn btn-primary">
        {busy ? "처리 중..." : "🔓 잠금 해제 시도"}
      </button>

      {status && <div className="text-sm">{status}</div>}

      {resultUrl && (
        <button onClick={download} className="btn">📥 잠금 해제된 PDF 다운로드</button>
      )}

      <div className="text-xs text-muted leading-relaxed bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
        <strong>⚖️ 사용 안내</strong>
        <ul className="list-disc list-inside mt-1 space-y-0.5">
          <li>본인이 소유하거나 정당하게 접근 권한이 있는 PDF만 사용하세요. <strong>저작권·보안 정책 위반의 책임은 사용자에게 있습니다.</strong></li>
          <li>이 도구는 <strong>편집·인쇄·복사 권한만 제한된 PDF</strong>의 제한을 해제합니다. 본문 자체에 열기 암호가 걸린 PDF는 해제 불가.</li>
          <li>강력한 사용자 열기 암호(AES-256 등)는 본래 비밀번호로 한컴오피스·Adobe Acrobat에서 직접 열어 저장해야 합니다.</li>
          <li><strong>이 도구는 암호 무차별 대입(크래킹) 기능을 제공하지 않습니다.</strong></li>
          <li>모든 처리가 브라우저 안에서 일어나며 외부로 전송되지 않습니다.</li>
        </ul>
      </div>
    </div>
  );
}
