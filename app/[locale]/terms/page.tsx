import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LEGAL, type Locale } from "@/lib/legal";
import { SITE_URL } from "@/lib/tools";
import LegalPage from "@/components/LegalPage";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (routing.locales.includes(locale as Locale) ? locale : "ko") as Locale;
  const doc = LEGAL.terms[loc];
  const url = `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/terms`;
  return {
    title: doc.title,
    description: doc.intro.slice(0, 150),
    alternates: {
      canonical: url,
      languages: { ko: `${SITE_URL}/terms`, en: `${SITE_URL}/en/terms`, ja: `${SITE_URL}/ja/terms`, zh: `${SITE_URL}/zh/terms` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage kind="terms" locale={locale} />;
}
