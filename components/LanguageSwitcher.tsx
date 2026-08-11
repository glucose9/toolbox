"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState } from "react";

// No flag emoji: Windows Chrome/Edge render regional-indicator pairs as bare
// letters ("KR"), which made the header look broken on the primary platform.
// The labels are self-identifying; the trigger uses 🌐 (renders everywhere).
const LANGS: { code: "ko" | "en" | "ja" | "zh"; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = LANGS.find((l) => l.code === locale) || LANGS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("nav.language")}
        className="px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1"
      >
        <span aria-hidden="true">🌐</span>
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div role="menu" aria-label={t("nav.language")} className="absolute right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-40 min-w-32">
            {LANGS.map((l) => (
              <button
                key={l.code}
                role="menuitem"
                aria-current={l.code === locale ? "true" : undefined}
                onClick={() => {
                  router.replace(pathname, { locale: l.code });
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 ${l.code === locale ? "font-semibold bg-gray-50 dark:bg-gray-800/50" : ""}`}
              >
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
