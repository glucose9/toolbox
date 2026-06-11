"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

// Non-intrusive language suggestion (the Google/Wikipedia pattern).
// With localeDetection disabled (see i18n/routing.ts — auto-redirects caused a
// cached-308 bug and bounced crawlers off Korean canonicals), this banner is
// how a visitor whose browser language differs from the page language finds
// their version: client-side only, no redirects, invisible to crawlers.

const SUPPORTED = ["ko", "en", "ja", "zh"] as const;
type Loc = (typeof SUPPORTED)[number];

// Copy is written in the TARGET language — it must be readable by the visitor
// we're suggesting it to, regardless of the page's current language.
const COPY: Record<Loc, { text: string; cta: string }> = {
  ko: { text: "이 페이지를 한국어로 볼 수 있습니다.", cta: "한국어로 보기" },
  en: { text: "This page is also available in English.", cta: "View in English" },
  ja: { text: "このページは日本語でもご覧いただけます。", cta: "日本語で見る" },
  zh: { text: "本页面也提供中文版本。", cta: "查看中文" },
};

const DISMISS_KEY = "barokit-locale-suggest-dismissed";

function detectBrowserLocale(): Loc | null {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of langs) {
    const base = l.toLowerCase().split("-")[0];
    if ((SUPPORTED as readonly string[]).includes(base)) return base as Loc;
  }
  return null;
}

export default function LocaleSuggestBanner() {
  const current = useLocale() as Loc;
  const pathname = usePathname(); // locale-stripped path
  const router = useRouter();
  const [suggest, setSuggest] = useState<Loc | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
      const detected = detectBrowserLocale();
      if (detected && detected !== current) setSuggest(detected);
      else setSuggest(null);
    } catch {
      /* storage unavailable */
    }
  }, [current]);

  if (!suggest) return null;
  const copy = COPY[suggest];

  const accept = () => {
    setSuggest(null);
    router.replace(pathname, { locale: suggest });
  };
  const dismiss = () => {
    setSuggest(null);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="bg-brand-50 dark:bg-brand-900/20 border-b border-brand-100 dark:border-brand-800">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3 text-sm">
        <span aria-hidden>🌐</span>
        <span className="flex-1 min-w-0 truncate">{copy.text}</span>
        <button onClick={accept} className="shrink-0 font-medium text-brand-700 dark:text-brand-300 hover:underline">
          {copy.cta}
        </button>
        <button onClick={dismiss} aria-label="dismiss" className="shrink-0 text-muted hover:text-gray-700 dark:hover:text-gray-300 px-1">
          ×
        </button>
      </div>
    </div>
  );
}
