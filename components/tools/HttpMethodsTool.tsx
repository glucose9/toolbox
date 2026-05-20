"use client";

import { useTranslations } from "next-intl";

const METHOD_KEYS = [
  { name: "GET", idempotent: true, safe: true },
  { name: "POST", idempotent: false, safe: false },
  { name: "PUT", idempotent: true, safe: false },
  { name: "PATCH", idempotent: false, safe: false },
  { name: "DELETE", idempotent: true, safe: false },
  { name: "HEAD", idempotent: true, safe: true },
  { name: "OPTIONS", idempotent: true, safe: true },
  { name: "CONNECT", idempotent: false, safe: false },
  { name: "TRACE", idempotent: true, safe: true },
];

export default function HttpMethodsTool() {
  const t = useTranslations("toolUI.http-methods");
  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 gap-2">
        {METHOD_KEYS.map((m) => (
          <div key={m.name} className="border border-gray-200 dark:border-gray-700 rounded p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-bold text-lg">{m.name}</span>
              {m.safe && <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">safe</span>}
              {m.idempotent && <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">idempotent</span>}
            </div>
            <div className="text-sm mt-1">{t(`desc_${m.name}`)}</div>
            <div className="text-xs text-muted mt-1">{t("examplePrefix")}: {t(`use_${m.name}`)}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted">{t("legend")}</div>
    </div>
  );
}
