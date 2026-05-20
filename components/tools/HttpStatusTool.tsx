"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type Status = { code: number; name: string };

const STATUSES: Status[] = [
  // 1xx
  { code: 100, name: "Continue" },
  { code: 101, name: "Switching Protocols" },
  { code: 102, name: "Processing" },
  { code: 103, name: "Early Hints" },
  // 2xx
  { code: 200, name: "OK" },
  { code: 201, name: "Created" },
  { code: 202, name: "Accepted" },
  { code: 204, name: "No Content" },
  { code: 206, name: "Partial Content" },
  // 3xx
  { code: 301, name: "Moved Permanently" },
  { code: 302, name: "Found" },
  { code: 303, name: "See Other" },
  { code: 304, name: "Not Modified" },
  { code: 307, name: "Temporary Redirect" },
  { code: 308, name: "Permanent Redirect" },
  // 4xx
  { code: 400, name: "Bad Request" },
  { code: 401, name: "Unauthorized" },
  { code: 402, name: "Payment Required" },
  { code: 403, name: "Forbidden" },
  { code: 404, name: "Not Found" },
  { code: 405, name: "Method Not Allowed" },
  { code: 406, name: "Not Acceptable" },
  { code: 408, name: "Request Timeout" },
  { code: 409, name: "Conflict" },
  { code: 410, name: "Gone" },
  { code: 411, name: "Length Required" },
  { code: 412, name: "Precondition Failed" },
  { code: 413, name: "Payload Too Large" },
  { code: 414, name: "URI Too Long" },
  { code: 415, name: "Unsupported Media Type" },
  { code: 418, name: "I'm a teapot" },
  { code: 422, name: "Unprocessable Entity" },
  { code: 425, name: "Too Early" },
  { code: 426, name: "Upgrade Required" },
  { code: 428, name: "Precondition Required" },
  { code: 429, name: "Too Many Requests" },
  { code: 431, name: "Request Header Fields Too Large" },
  { code: 451, name: "Unavailable For Legal Reasons" },
  // 5xx
  { code: 500, name: "Internal Server Error" },
  { code: 501, name: "Not Implemented" },
  { code: 502, name: "Bad Gateway" },
  { code: 503, name: "Service Unavailable" },
  { code: 504, name: "Gateway Timeout" },
  { code: 505, name: "HTTP Version Not Supported" },
  { code: 507, name: "Insufficient Storage" },
  { code: 511, name: "Network Authentication Required" },
];

function categoryKey(code: number): string {
  if (code < 200) return "info";
  if (code < 300) return "success";
  if (code < 400) return "redirect";
  if (code < 500) return "clientError";
  return "serverError";
}

function colorOf(code: number): string {
  if (code < 200) return "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700";
  if (code < 300) return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700";
  if (code < 400) return "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700";
  if (code < 500) return "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700";
  return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700";
}

export default function HttpStatusTool() {
  const t = useTranslations("toolUI.http-status");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return STATUSES;
    return STATUSES.filter((s) => {
      const desc = t(`desc.${s.code}`).toLowerCase();
      const category = t(`category.${categoryKey(s.code)}`).toLowerCase();
      return (
        s.code.toString().includes(query) ||
        s.name.toLowerCase().includes(query) ||
        desc.includes(query) ||
        category.includes(query)
      );
    });
  }, [q, t]);

  return (
    <div className="card space-y-3">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
      />
      <div className="text-xs text-muted">{t("resultsCount", { count: filtered.length })}</div>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {filtered.map((s) => (
          <div key={s.code} className={`border rounded p-3 ${colorOf(s.code)}`}>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">{s.code}</span>
              <span className="font-semibold">{s.name}</span>
              <span className="text-xs text-muted ml-auto">{t(`category.${categoryKey(s.code)}`)}</span>
            </div>
            <div className="text-sm mt-1">{t(`desc.${s.code}`)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
