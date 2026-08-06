import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocaleSuggestBanner from "@/components/LocaleSuggestBanner";
import { SITE_URL } from "@/lib/tools";
import { routing } from "@/i18n/routing";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const OG_LOCALE: Record<string, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${t("name")} — ${t("tagline")}`,
      template: `%s | ${t("name")}`,
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale] || "ko_KR",
      siteName: t("name"),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: t("name") }],
    },
    twitter: {
      card: "summary_large_image",
      images: [{ url: "/opengraph-image", alt: t("name") }],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}${locale === "ko" ? "" : "/" + locale}`,
      languages: {
        "x-default": SITE_URL,
        ko: SITE_URL,
        en: `${SITE_URL}/en`,
        ja: `${SITE_URL}/ja`,
        zh: `${SITE_URL}/zh`,
      },
    },
    verification: {
      google: "Pw2pA4IIXPiUyS1QAyG6TZ80fiX_AK4o7-QwcwwORXk",
      other: {
        "naver-site-verification": "935309ab74d516b01521acfccc0a2675e71cf090",
      },
    },
  };
}

const themeInit = `
try {
  const t = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (t === 'dark' || (!t && prefersDark)) document.documentElement.classList.add('dark');
} catch (e) {}
`;

// Perf: keep the heavy toolMeta fields out of every page's HTML/RSC payload.
// The full `toolMeta` namespace (per-tool howTo[]/faq[], ~360KB minified) is
// read only by Server Components (tool/category/home SSR via getTranslations).
// Its sole client consumer is the header/home search index (lib/search-client),
// which reads just `.h1` and `.description`. Passing the full messages to
// NextIntlClientProvider inlines all of toolMeta into the client payload of
// every page, so we hand the client a copy narrowed to h1+description. Server
// getTranslations continues to read the full request-config messages.
function withSlimToolMeta<T extends Record<string, unknown>>(messages: T): T {
  const toolMeta = messages.toolMeta;
  if (!toolMeta || typeof toolMeta !== "object") return messages;
  const slim: Record<string, Record<string, string>> = {};
  for (const [slug, meta] of Object.entries(toolMeta as Record<string, Record<string, unknown>>)) {
    const entry: Record<string, string> = {};
    if (typeof meta.h1 === "string") entry.h1 = meta.h1;
    if (typeof meta.description === "string") entry.description = meta.description;
    slim[slug] = entry;
  }
  return { ...messages, toolMeta: slim } as T;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const clientMessages = withSlimToolMeta(await getMessages());

  return (
    <html lang={locale}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow-lg dark:focus:bg-gray-800 dark:focus:text-gray-100"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider messages={clientMessages}>
          <LocaleSuggestBanner />
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
