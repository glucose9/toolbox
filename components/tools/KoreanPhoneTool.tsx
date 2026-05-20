"use client";
import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type Normalized = {
  national: string;
  international: string;
  raw: string;
  telLink: string;
  valid: boolean;
};

type LocaleConfig = {
  defaultExample: string;
  normalize: (input: string) => Normalized;
};

// ---------- KR ----------
function normalizeKR(input: string): Normalized {
  const digits = input.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("82")) d = "0" + d.slice(2);
  let national = d;
  let valid = false;
  if (/^010\d{8}$/.test(d)) {
    national = `010-${d.slice(3, 7)}-${d.slice(7)}`;
    valid = true;
  } else if (/^01[16-9]\d{7,8}$/.test(d)) {
    national = `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
    valid = true;
  } else if (/^02\d{7,8}$/.test(d)) {
    national = `02-${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    valid = true;
  } else if (/^0[3-6]\d{8,9}$/.test(d)) {
    national = `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
    valid = true;
  } else if (/^0(70|50)\d{8}$/.test(d)) {
    national = `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    valid = true;
  }
  const international = d.startsWith("0") ? `+82-${d.slice(1)}` : "";
  const telLink = valid && international ? `tel:${international.replace(/-/g, "")}` : "";
  return { national, international, raw: d, telLink, valid };
}

// ---------- US ----------
// Accepts: 10-digit (XXX XXX XXXX) or 11-digit starting with 1 (country code).
// Valid US area codes: NXX where N=2-9, X=0-9.
function normalizeUS(input: string): Normalized {
  let d = input.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  let national = d;
  let valid = false;
  if (/^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(d)) {
    national = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    valid = true;
  } else if (/^\d{10}$/.test(d)) {
    // Looks like a 10-digit number but fails area-code rules — still format it
    national = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  const international = d.length === 10 ? `+1 ${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}` : "";
  const telLink = international ? `tel:+1${d}` : "";
  return { national, international, raw: d, telLink, valid };
}

// ---------- JP ----------
// Accepts: 10 or 11 digits starting with 0. Mobile: 070/080/090 + 8 digits.
// Landline starts with 0 + area code (1-4 digits) + subscriber (4 digits).
// International: drop leading 0, prefix +81.
function normalizeJP(input: string): Normalized {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("81")) d = "0" + d.slice(2);
  let national = d;
  let valid = false;
  if (/^0[789]0\d{8}$/.test(d)) {
    // Mobile XXX-XXXX-XXXX
    national = `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    valid = true;
  } else if (/^050\d{8}$/.test(d)) {
    // IP phone 050-XXXX-XXXX
    national = `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    valid = true;
  } else if (/^0120\d{6}$/.test(d)) {
    // Toll-free 0120-XXX-XXX
    national = `0120-${d.slice(4, 7)}-${d.slice(7)}`;
    valid = true;
  } else if (/^0[1-9]\d{8,9}$/.test(d)) {
    // Landline 0XX-XXXX-XXXX or 0X-XXXX-XXXX (best-effort)
    if (d.length === 10) {
      national = `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6)}`;
    } else {
      national = `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    }
    valid = true;
  }
  const international = d.startsWith("0") ? `+81-${d.slice(1)}` : "";
  const telLink = valid && international ? `tel:+81${d.slice(1)}` : "";
  return { national, international, raw: d, telLink, valid };
}

// ---------- CN ----------
// Mobile: 11 digits, starts with 1 followed by 3-9. Format: XXX XXXX XXXX
// Landline: 0 + area code (2-3 digits) + subscriber (7-8 digits).
function normalizeCN(input: string): Normalized {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("86")) d = d.slice(2);
  let national = d;
  let valid = false;
  if (/^1[3-9]\d{9}$/.test(d)) {
    // Mobile
    national = `${d.slice(0, 3)} ${d.slice(3, 7)} ${d.slice(7)}`;
    valid = true;
  } else if (/^0(10|2[0-9])\d{8}$/.test(d)) {
    // Major-city landline 0XX-XXXXXXXX (Beijing 010, Shanghai 021, etc.)
    national = `${d.slice(0, 3)}-${d.slice(3)}`;
    valid = true;
  } else if (/^0[3-9]\d{2}\d{7,8}$/.test(d)) {
    // Other landline 0XXX-XXXXXXX
    national = `${d.slice(0, 4)}-${d.slice(4)}`;
    valid = true;
  }
  let international = "";
  let telLink = "";
  if (/^1[3-9]\d{9}$/.test(d)) {
    international = `+86 ${d.slice(0, 3)} ${d.slice(3, 7)} ${d.slice(7)}`;
    telLink = `tel:+86${d}`;
  } else if (d.startsWith("0")) {
    international = `+86-${d.slice(1)}`;
    telLink = valid ? `tel:+86${d.slice(1)}` : "";
  }
  return { national, international, raw: d, telLink, valid };
}

const LOCALE_CONFIG: Record<string, LocaleConfig> = {
  ko: { defaultExample: "01012345678", normalize: normalizeKR },
  en: { defaultExample: "2125551234", normalize: normalizeUS },
  ja: { defaultExample: "09012345678", normalize: normalizeJP },
  zh: { defaultExample: "13812345678", normalize: normalizeCN },
};

export default function KoreanPhoneTool() {
  const locale = useLocale();
  const t = useTranslations("toolUI.korean-phone");
  const config = LOCALE_CONFIG[locale] || LOCALE_CONFIG.ko;
  const [input, setInput] = useState(config.defaultExample);
  const result = useMemo(() => config.normalize(input), [input, config]);

  return (
    <div className="card space-y-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={config.defaultExample}
        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-lg"
      />
      <table className="w-full text-sm">
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td className="py-2 pr-3 text-muted">{t("national")}</td>
            <td className="font-mono">{result.national || "—"}</td>
            <td className="text-right">
              {result.national && (
                <button
                  onClick={() => navigator.clipboard.writeText(result.national)}
                  className="text-xs text-brand-600 hover:underline"
                >
                  {t("copy")}
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 pr-3 text-muted">{t("international")}</td>
            <td className="font-mono">{result.international || "—"}</td>
            <td className="text-right">
              {result.international && (
                <button
                  onClick={() => navigator.clipboard.writeText(result.international)}
                  className="text-xs text-brand-600 hover:underline"
                >
                  {t("copy")}
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 pr-3 text-muted">{t("digitsOnly")}</td>
            <td className="font-mono">{result.raw || "—"}</td>
            <td className="text-right">
              {result.raw && (
                <button
                  onClick={() => navigator.clipboard.writeText(result.raw)}
                  className="text-xs text-brand-600 hover:underline"
                >
                  {t("copy")}
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 pr-3 text-muted">{t("telLink")}</td>
            <td className="font-mono">
              {result.telLink ? (
                <a href={result.telLink} className="text-brand-600 hover:underline">
                  {result.telLink}
                </a>
              ) : (
                "—"
              )}
            </td>
            <td />
          </tr>
        </tbody>
      </table>
      <div
        className="text-xs text-muted bg-gray-50 dark:bg-gray-900 p-3 rounded"
        dangerouslySetInnerHTML={{ __html: t("note") }}
      />
    </div>
  );
}
