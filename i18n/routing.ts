import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en", "ja", "zh"],
  defaultLocale: "ko",
  localePrefix: "as-needed",
  // No Accept-Language/cookie auto-redirects. With detection on, an
  // English-preferring browser got /kits/x → 308 → /en/kits/x (and our
  // middleware made it PERMANENT, so browsers cached the language switch —
  // Korean users were stuck bouncing to English). It also sent
  // English-Accept-Language crawlers (Googlebot) off the Korean canonical
  // URLs. Unprefixed paths now always serve Korean; other languages are
  // reached explicitly via the /en /ja /zh prefixes (LanguageSwitcher).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
