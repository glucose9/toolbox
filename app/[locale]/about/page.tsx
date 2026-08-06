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
  const doc = LEGAL.about[loc];
  const url = `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/about`;
  return {
    title: doc.title,
    description: doc.intro.slice(0, 150),
    alternates: {
      canonical: url,
      languages: { "x-default": `${SITE_URL}/about`, ko: `${SITE_URL}/about`, en: `${SITE_URL}/en/about`, ja: `${SITE_URL}/ja/about`, zh: `${SITE_URL}/zh/about` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage kind="about" locale={locale} />;
}
