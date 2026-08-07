import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tools, getTool, SITE_URL, NOINDEX_SLUGS } from "@/lib/tools";
import { getKitsForTool, type KitLocale } from "@/lib/kits";
import { routing } from "@/i18n/routing";
import ToolRenderer from "@/components/ToolRenderer";
import FAQ from "@/components/FAQ";
import HowTo from "@/components/HowTo";
import TrustBadges from "@/components/TrustBadges";
import FavoriteButton from "@/components/FavoriteButton";

const OG_LOCALE: Record<string, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const t of tools) params.push({ locale, slug: t.slug });
  }
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

type TRaw = { raw: (key: string) => unknown };
function safeArr<T>(t: TRaw, key: string, fallback: T[]): T[] {
  try {
    const v = t.raw(key);
    if (Array.isArray(v) && v.length > 0) return v as T[];
  } catch {
    /* ignore */
  }
  return fallback;
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
  const localizedDesc = safeT(t, `toolMeta.${slug}.metaDescription`, safeT(t, `toolMeta.${slug}.description`, tool.metaDescription));
  const url = `${SITE_URL}${locale === "ko" ? "" : "/" + locale}/tools/${tool.slug}`;
  // Zero-demand long-tail slugs stay usable but out of the index (data-driven
  // list — see NOINDEX_SLUGS). Non-ko locales are noindexed at the layout
  // level; repeat here because page-level robots would otherwise override.
  const indexable = locale === "ko" && !NOINDEX_SLUGS.has(tool.slug);
  return {
    title: localizedName,
    description: localizedDesc,
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: localizedName,
      description: localizedDesc,
      url,
      type: "website",
      siteName: t("site.name"),
      locale: OG_LOCALE[locale] || "ko_KR",
    },
  };
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
  const localizedH1 = safeT(t, `toolMeta.${slug}.h1`, tool.h1);
  const localizedDesc = safeT(t, `toolMeta.${slug}.description`, tool.description);
  const localizedHowTo = safeArr<string>(t as unknown as TRaw, `toolMeta.${slug}.howTo`, tool.howTo);
  const localizedFaq = safeArr<{ q: string; a: string }>(t as unknown as TRaw, `toolMeta.${slug}.faq`, tool.faq);
  const categoryLabel = t(`categories.${tool.category}`);
  const howToTitle = t("tool.howToTitle");
  const faqTitle = t("tool.faqTitle");
  const relatedTitle = t("tool.related");

  // Kits this tool belongs to — used both for related-tool ranking and the
  // "in kits" cross-link section below.
  const inKits = getKitsForTool(slug);
  const loc = asKitLocale(locale);

  // Related tools: kit co-members first (tools sharing a kit with this one,
  // deduped, in kit order), then same-category tools fill the rest, total 4.
  const coMemberSlugs: string[] = [];
  for (const kit of inKits) {
    for (const entry of kit.tools) {
      if (entry.slug !== tool.slug && !coMemberSlugs.includes(entry.slug)) {
        coMemberSlugs.push(entry.slug);
      }
    }
  }
  const coMembers = coMemberSlugs
    .map((s) => getTool(s))
    .filter((x): x is NonNullable<ReturnType<typeof getTool>> => !!x);
  const sameCategory = tools.filter(
    (x) => x.category === tool.category && x.slug !== tool.slug && !coMemberSlugs.includes(x.slug)
  );
  const related = [...coMembers, ...sameCategory].slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localizedFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: localizedH1,
    step: localizedHowTo.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s,
    })),
  };

  const localePrefix = locale === "ko" ? "" : `/${locale}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: `${SITE_URL}${localePrefix}` },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: `${SITE_URL}${localePrefix}/category/${tool.category}` },
      { "@type": "ListItem", position: 3, name: navTitle, item: `${SITE_URL}${localePrefix}/tools/${tool.slug}` },
    ],
  };

  const APP_CATEGORY: Record<string, string> = {
    qr: "UtilitiesApplication",
    barcode: "UtilitiesApplication",
    image: "MultimediaApplication",
    video: "MultimediaApplication",
    document: "BusinessApplication",
    pdf: "BusinessApplication",
    text: "UtilitiesApplication",
    dev: "DeveloperApplication",
    calc: "UtilitiesApplication",
    academic: "EducationalApplication",
  };
  const toolUrl = `${SITE_URL}${locale === "ko" ? "" : "/" + locale}/tools/${tool.slug}`;
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: localizedH1,
    url: toolUrl,
    applicationCategory: APP_CATEGORY[tool.category] || "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Runs entirely in the browser.",
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: localizedDesc,
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
        <span className="mx-2">›</span>
        <Link href={`/category/${tool.category}`} className="hover:text-brand-600">{categoryLabel}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 dark:text-gray-100">{navTitle}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>{tool.icon}</span>
          <span>{localizedH1}</span>
        </h1>
        <p className="mt-3 text-muted leading-relaxed">{localizedDesc}</p>
        <div className="mt-4">
          <TrustBadges variant="compact" />
        </div>
        <div className="mt-3">
          <FavoriteButton slug={tool.slug} />
        </div>
      </header>

      <ToolRenderer tool={tool} />

      <HowTo steps={localizedHowTo} title={howToTitle} />
      <FAQ items={localizedFaq} title={faqTitle} />

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">{relatedTitle}</h2>
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

      {inKits.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">{safeT(t, "tool.inKits", "이 도구가 포함된 키트")}</h2>
          <div className="flex flex-wrap gap-2">
            {inKits.map((k) => (
              <Link
                key={k.slug}
                href={`/kits/${k.slug}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-brand-100 dark:hover:bg-brand-900/40 hover:text-brand-700 dark:hover:text-brand-300 text-sm font-medium transition-colors"
              >
                <span>{k.icon}</span>
                <span>{k.copy[loc].title.split("—")[0].trim()}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
