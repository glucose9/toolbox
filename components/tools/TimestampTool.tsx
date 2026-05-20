"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function detectUnit(s: string): "s" | "ms" {
  return s.length >= 13 ? "ms" : "s";
}

export default function TimestampTool() {
  const t = useTranslations("toolUI.timestamp-converter");
  const [tsInput, setTsInput] = useState(() => Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState(() => new Date().toISOString().slice(0, 16));
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const parseTs = () => {
    const cleaned = tsInput.replace(/\D/g, "");
    if (!cleaned) return null;
    const unit = detectUnit(cleaned);
    const ms = unit === "s" ? parseInt(cleaned, 10) * 1000 : parseInt(cleaned, 10);
    return new Date(ms);
  };

  const date = parseTs();
  const valid = date && !isNaN(date.getTime());

  const parseDate = () => {
    const d = new Date(dateInput);
    return isNaN(d.getTime()) ? null : d;
  };
  const dateFromInput = parseDate();

  return (
    <div className="card space-y-5">
      <div className="rounded p-3 bg-gray-50 dark:bg-gray-900 text-sm">
        <div className="text-muted text-xs mb-1">{t("currentTime")}</div>
        <div className="font-mono">
          {Math.floor(now / 1000)} ({t("seconds")}) · {now} (ms)
        </div>
        <div className="font-mono text-xs text-muted mt-1">{new Date(now).toLocaleString()}</div>
      </div>

      <div>
        <label className="label">{t("timestampToDate")}</label>
        <input
          type="text"
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          placeholder="1747000000 또는 1747000000000"
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded font-mono text-sm bg-white dark:bg-gray-900"
        />
        {valid && date && (
          <div className="mt-2 space-y-1 text-sm">
            <div><span className="text-muted">{t("local")}:</span> {date.toLocaleString()}</div>
            <div><span className="text-muted">UTC:</span> {date.toUTCString()}</div>
            <div><span className="text-muted">ISO:</span> <span className="font-mono">{date.toISOString()}</span></div>
            <div className="text-xs text-muted">{t("detectedUnit")}: {detectUnit(tsInput.replace(/\D/g, "")) === "s" ? t("seconds") : t("milliseconds")}</div>
          </div>
        )}
      </div>

      <div>
        <label className="label">{t("dateToTimestamp")}</label>
        <input
          type="datetime-local"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900"
        />
        {dateFromInput && (
          <div className="mt-2 space-y-1 text-sm">
            <div><span className="text-muted">{t("seconds")}:</span> <span className="font-mono">{Math.floor(dateFromInput.getTime() / 1000)}</span></div>
            <div><span className="text-muted">{t("milliseconds")}:</span> <span className="font-mono">{dateFromInput.getTime()}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
