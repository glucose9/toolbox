import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tools, SITE_URL } from "@/lib/tools";
import { routing } from "@/i18n/routing";
import { CATEGORY_INTRO, type Cat } from "@/lib/category-content";
import type { Locale } from "@/lib/legal";

const CATS = Object.keys(CATEGORY_INTRO) as Cat[];

export function generateStaticParams() {
  const params: { locale: string; cat: string }[] = [];
  for (const locale of routing.locales) for (const cat of CATS) params.push({ locale, cat });
  return params;
}

function safeT(t: (k: string) => string, key: string, fallback: string): string {
  try {
    const v = t(key);
    return v === key ? fallback : v;
  } catch {
    return fallback;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; cat: string }> }): Promise<Metadata> {
  const { locale, cat } = await params;
  if (!CATS.includes(cat as Cat)) return {};
  const loc = (routing.locales.includes(locale as Locale) ? locale : "ko") as Locale;
  const c = CATEGORY_INTRO[cat as Cat][loc];
  const count = tools.filter((t) => t.category === cat).length;
  const url = `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/category/${cat}`;
  return {
    title: c.title,
    description: `${c.intro} (${count}+)`,
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${SITE_URL}/category/${cat}`,
        ko: `${SITE_URL}/category/${cat}`,
        en: `${SITE_URL}/en/category/${cat}`,
        ja: `${SITE_URL}/ja/category/${cat}`,
        zh: `${SITE_URL}/zh/category/${cat}`,
      },
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; cat: string }> }) {
  const { locale, cat } = await params;
  if (!CATS.includes(cat as Cat)) notFound();
  setRequestLocale(locale);
  const loc = (routing.locales.includes(locale as Locale) ? locale : "ko") as Locale;
  const t = await getTranslations();
  const c = CATEGORY_INTRO[cat as Cat][loc];
  const list = tools.filter((tl) => tl.category === cat);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: `${SITE_URL}${loc === "ko" ? "" : "/" + loc}` },
      { "@type": "ListItem", position: 2, name: c.title, item: `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/category/${cat}` },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list.map((tl, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: safeT(t, `tools.${tl.slug}`, tl.navTitle),
      url: `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/tools/${tl.slug}`,
    })),
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 dark:text-gray-100">{c.title}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold">{c.title}</h1>
        <p className="mt-3 text-muted leading-relaxed max-w-3xl">{c.intro}</p>
        <p className="mt-2 text-sm text-muted">{t("home.toolCount", { count: list.length })}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((tl) => (
          <Link key={tl.slug} href={`/tools/${tl.slug}`} className="card hover:border-brand-500 hover:shadow-sm transition-all group">
            <div className="flex items-start gap-3">
              <div className="text-3xl">{tl.icon}</div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold group-hover:text-brand-600">
                  {safeT(t, `tools.${tl.slug}`, tl.navTitle)}
                </h2>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {loc === "ko" ? tl.description : safeT(t, `toolMeta.${tl.slug}.description`, tl.description)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
