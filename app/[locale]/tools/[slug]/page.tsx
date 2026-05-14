import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tools, getTool, SITE_URL } from "@/lib/tools";
import { routing } from "@/i18n/routing";
import ToolRenderer from "@/components/ToolRenderer";
import FAQ from "@/components/FAQ";
import HowTo from "@/components/HowTo";
import TrustBadges from "@/components/TrustBadges";
import FavoriteButton from "@/components/FavoriteButton";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const t of tools) params.push({ locale, slug: t.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const t = await getTranslations({ locale });
  const localizedName = safeT(t, `tools.${slug}`, tool.navTitle);
  const url = `${SITE_URL}${locale === "ko" ? "" : "/" + locale}/tools/${tool.slug}`;
  return {
    title: locale === "ko" ? tool.title : `${localizedName} | ${t("site.name")}`,
    description: tool.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        ko: `${SITE_URL}/tools/${tool.slug}`,
        en: `${SITE_URL}/en/tools/${tool.slug}`,
        ja: `${SITE_URL}/ja/tools/${tool.slug}`,
        zh: `${SITE_URL}/zh/tools/${tool.slug}`,
      },
    },
    openGraph: {
      title: localizedName,
      description: tool.metaDescription,
      url,
      type: "website",
    },
  };
}

function safeT(t: (k: string) => string, key: string, fallback: string): string {
  try {
    const v = t(key);
    return v === key ? fallback : v;
  } catch {
    return fallback;
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tool = getTool(slug);
  if (!tool) notFound();

  const t = await getTranslations();
  const navTitle = safeT(t, `tools.${slug}`, tool.navTitle);
  const categoryLabel = t(`categories.${tool.category}`);

  const related = tools
    .filter((x) => x.category === tool.category && x.slug !== tool.slug)
    .slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tool.h1,
    step: tool.howTo.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: SITE_URL },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: `${SITE_URL}/#${tool.category}` },
      { "@type": "ListItem", position: 3, name: navTitle, item: `${SITE_URL}/tools/${tool.slug}` },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
        <span className="mx-2">›</span>
        <span>{categoryLabel}</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{navTitle}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>{tool.icon}</span>
          <span>{tool.h1}</span>
        </h1>
        <p className="mt-3 text-muted leading-relaxed">{tool.description}</p>
        <div className="mt-4">
          <TrustBadges variant="compact" />
        </div>
        <div className="mt-3">
          <FavoriteButton slug={tool.slug} />
        </div>
      </header>

      <ToolRenderer tool={tool} />

      <HowTo steps={tool.howTo} />
      <FAQ items={tool.faq} />

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">{t("tool.related")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/tools/${r.slug}`}
                className="card hover:border-brand-500 text-center"
              >
                <div className="text-2xl">{r.icon}</div>
                <div className="mt-2 text-sm font-medium">{safeT(t, `tools.${r.slug}`, r.navTitle)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
