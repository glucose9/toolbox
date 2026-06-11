import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en", "ja", "zh"],
  defaultLocale: "ko",
  localePrefix: "as-needed",
  // Auto-detection ON: first-time visitors land on their own language
  // (Accept-Language), and an explicit choice via the LanguageSwitcher sets
  // the NEXT_LOCALE cookie, which takes priority afterwards.
  //
  // SAFETY INVARIANT (do not remove): detection redirects MUST stay 307.
  // middleware.ts promotes only the stable /ko/foo → /foo canonicalization to
  // 308. We once promoted ALL redirects to 308 — browsers cached
  // "/kits/x → /en/kits/x" permanently and Korean users got stuck in English.
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
