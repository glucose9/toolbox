"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PdfUnlockTool() {
  const t = useTranslations("toolUI.pdf-unlock");
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

      // pdf-lib cannot decrypt PDFs: ignoreEncryption only skips the load-time
      // throw, and save() would serialize the still-encrypted streams into a
      // broken file. Detect encryption and fail honestly instead.
      const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });
      if (pdf.isEncrypted) {
        setStatus(t("statusEncrypted"));
        return;
      }

      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus(t("statusSuccess"));
    } catch (e) {
      const msg = e instanceof Error ? e.message : t("unknownError");
      if (msg.toLowerCase().includes("password") || msg.toLowerCase().includes("encrypt")) {
        setStatus(t("statusUserPassword"));
      } else {
        setStatus(t("statusFailed", { msg }));
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
        <label className="label">{t("lockedPdf")}</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => { setFile(e.target.files?.[0] || null); setStatus(null); setResultUrl(null); }}
          className="block w-full text-sm"
        />
        {file && <div className="text-xs text-muted mt-1">{file.name} · {(file.size / 1024).toFixed(0)} KB</div>}
      </div>

      <button onClick={unlock} disabled={!file || busy} className="btn btn-primary">
        {busy ? t("processing") : t("unlockButton")}
      </button>

      {status && <div className="text-sm">{status}</div>}

      {resultUrl && (
        <button onClick={download} className="btn">{t("downloadUnlocked")}</button>
      )}

      <div className="text-xs text-muted leading-relaxed bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
        <strong>{t("noticeTitle")}</strong>
        <ul className="list-disc list-inside mt-1 space-y-0.5">
          <li dangerouslySetInnerHTML={{ __html: t("notice1") }} />
          <li dangerouslySetInnerHTML={{ __html: t("notice2") }} />
          <li>{t("notice3")}</li>
          <li dangerouslySetInnerHTML={{ __html: t("notice4") }} />
          <li>{t("notice5")}</li>
        </ul>
      </div>
    </div>
  );
}
