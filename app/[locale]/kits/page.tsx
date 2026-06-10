import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/tools";
import { routing } from "@/i18n/routing";
import { KITS, KITS_INDEX_COPY, type KitLocale } from "@/lib/kits";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function asKitLocale(locale: string): KitLocale {
  return (["ko", "en", "ja", "zh"].includes(locale) ? locale : "ko") as KitLocale;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = asKitLocale(locale);
  const c = KITS_INDEX_COPY[loc];
  const url = `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/kits`;
  return {
    title: c.title,
    description: c.intro,
    alternates: {
      canonical: url,
      languages: {
        ko: `${SITE_URL}/kits`,
        en: `${SITE_URL}/en/kits`,
        ja: `${SITE_URL}/ja/kits`,
        zh: `${SITE_URL}/zh/kits`,
      },
    },
  };
}

export default async function KitsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = asKitLocale(locale);
  const t = await getTranslations();
  const c = KITS_INDEX_COPY[loc];

  return (
    <article className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 dark:text-gray-100">{c.title}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold">{c.title}</h1>
        <p className="mt-3 text-muted leading-relaxed max-w-3xl">{c.intro}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {KITS.map((kit) => (
          <Link key={kit.slug} href={`/kits/${kit.slug}`} className="card hover:border-brand-500 hover:shadow-sm transition-all group">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{kit.icon}</div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-lg group-hover:text-brand-600">
                  {kit.copy[loc].title.split("—")[0].trim()}
                </h2>
                <p className="mt-1 text-sm text-muted">{kit.copy[loc].tagline}</p>
                <p className="mt-2 text-xs text-muted">{t("home.toolCount", { count: kit.tools.length })}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
