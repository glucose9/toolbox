import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getTool, SITE_URL } from "@/lib/tools";
import { routing } from "@/i18n/routing";
import { KITS, getKit, type KitLocale } from "@/lib/kits";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) for (const k of KITS) params.push({ locale, slug: k.slug });
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

function asKitLocale(locale: string): KitLocale {
  return (["ko", "en", "ja", "zh"].includes(locale) ? locale : "ko") as KitLocale;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const kit = getKit(slug);
  if (!kit) return {};
  const loc = asKitLocale(locale);
  const c = kit.copy[loc];
  const url = `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/kits/${kit.slug}`;
  return {
    title: c.title,
    description: c.intro,
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${SITE_URL}/kits/${kit.slug}`,
        ko: `${SITE_URL}/kits/${kit.slug}`,
        en: `${SITE_URL}/en/kits/${kit.slug}`,
        ja: `${SITE_URL}/ja/kits/${kit.slug}`,
        zh: `${SITE_URL}/zh/kits/${kit.slug}`,
      },
    },
    openGraph: { title: c.title, description: c.tagline, url, type: "website" },
  };
}

export default async function KitPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const kit = getKit(slug);
  if (!kit) notFound();
  setRequestLocale(locale);
  const loc = asKitLocale(locale);
  const t = await getTranslations();
  const c = kit.copy[loc];

  // Resolve tool entries against the registry (skip any that drift out of sync).
  const entries = kit.tools
    .map((e) => ({ entry: e, tool: getTool(e.slug) }))
    .filter((x): x is { entry: (typeof kit.tools)[number]; tool: NonNullable<ReturnType<typeof getTool>> } => !!x.tool);

  const others = KITS.filter((k) => k.slug !== kit.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: `${SITE_URL}${loc === "ko" ? "" : "/" + loc}` },
      { "@type": "ListItem", position: 2, name: safeT(t, "kits.title", "Kits"), item: `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/kits` },
      { "@type": "ListItem", position: 3, name: c.title, item: `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/kits/${kit.slug}` },
    ],
  };
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.title,
    description: c.intro,
    url: `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/kits/${kit.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: entries.map(({ tool }, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: safeT(t, `tools.${tool.slug}`, tool.navTitle),
        url: `${SITE_URL}${loc === "ko" ? "" : "/" + loc}/tools/${tool.slug}`,
      })),
    },
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
        <span className="mx-2">›</span>
        <Link href="/kits" className="hover:text-brand-600">{safeT(t, "kits.title", "Kits")}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 dark:text-gray-100">{c.title}</span>
      </nav>

      <header className="mb-8">
        <div className="text-5xl mb-3">{kit.icon}</div>
        <h1 className="text-3xl font-bold">{c.title}</h1>
        <p className="mt-3 text-muted leading-relaxed max-w-3xl">{c.intro}</p>
        <p className="mt-2 text-sm text-muted">{t("home.toolCount", { count: entries.length })}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entries.map(({ entry, tool }) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card hover:border-brand-500 hover:shadow-sm transition-all group">
            <div className="flex items-start gap-3">
              <div className="text-3xl">{tool.icon}</div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold group-hover:text-brand-600">
                  {safeT(t, `tools.${tool.slug}`, tool.navTitle)}
                </h2>
                {/* Kit-specific role note — intentionally NOT the generic tool description,
                    so kit pages stay unique vs category/tool pages. */}
                <p className="mt-1 text-sm text-muted">{entry.note[loc]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">{safeT(t, "kits.more", "More kits")}</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((k) => (
              <Link
                key={k.slug}
                href={`/kits/${k.slug}`}
                className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-brand-100 dark:hover:bg-brand-900/40 hover:text-brand-700 dark:hover:text-brand-300 text-sm font-medium transition-colors"
              >
                {k.icon} {k.copy[loc].title.split("—")[0].trim()}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
