import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link as IntlLink } from "@/i18n/navigation";
import { getToolsByCategory, SITE_URL, tools, isNewTool, type ToolConfig } from "@/lib/tools";
import { FILE_CATEGORIES, INDEXED_KIT_SLUGS } from "@/lib/index-policy";
import { KITS, type KitLocale } from "@/lib/kits";
import TrustBadges from "@/components/TrustBadges";
import RecentTools from "@/components/RecentTools";
import HomeSearch from "@/components/HomeSearch";

// Display order of the file categories — the site's core (2026-09 focus).
const FILE_ORDER = ["document", "pdf", "image", "video"];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const byCategory = getToolsByCategory();

  // File categories lead, in a fixed order; everything else is collapsed
  // under "그 외 도구" so the page reads as a file-conversion site.
  const fileCats = FILE_ORDER.filter((c) => byCategory[c]).map((c) => [c, byCategory[c]] as const);
  const otherCats = Object.entries(byCategory).filter(([c]) => !FILE_CATEGORIES.has(c));
  const otherCount = otherCats.reduce((n, [, list]) => n + list.length, 0);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("site.name"),
    url: SITE_URL,
    description: t("site.tagline"),
  };

  const kloc = (["ko", "en", "ja", "zh"].includes(locale) ? locale : "ko") as KitLocale;
  const KIT_PRIO = ["pdf-conversion", "photo-cleanup", "youtube-creator", "job-application", "salary-tax", "dev-debug", "moving-realestate"];
  const kits = [...KITS].sort((a, b) => {
    const ai = KIT_PRIO.indexOf(a.slug);
    const bi = KIT_PRIO.indexOf(b.slug);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });

  const renderCategory = ([cat, list]: readonly [string, ToolConfig[]]) => (
    <div key={cat} id={cat}>
      <h2 className="text-2xl font-bold mb-4">
        <IntlLink href={`/category/${cat}`} className="hover:text-brand-600">
          {t(`categories.${cat}`)}
        </IntlLink>{" "}
        <span className="text-muted text-base font-normal">
          ({t("home.toolCount", { count: list.length })})
        </span>
      </h2>
      {/* 6 cards per category; the full list lives on /category/[cat]. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.slice(0, 6).map((tool) => (
          <IntlLink
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="card hover:border-brand-500 hover:shadow-sm transition-all group relative"
          >
            {isNewTool(tool) && (
              <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white">
                {t("home.newBadge")}
              </span>
            )}
            <div className="flex items-start gap-3">
              <div className="text-3xl">{tool.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-brand-600">
                  {t(`tools.${tool.slug}`, {}, { fallback: tool.navTitle } as never)}
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {locale === "ko"
                    ? tool.description
                    : t(`toolMeta.${tool.slug}.description`, {}, { fallback: tool.description } as never)}
                </p>
              </div>
            </div>
          </IntlLink>
        ))}
        {list.length > 6 && (
          <IntlLink
            href={`/category/${cat}`}
            className="card hover:border-brand-500 hover:shadow-sm transition-all flex items-center justify-center text-brand-600 font-medium"
          >
            {t("home.viewAll", { count: list.length })}
          </IntlLink>
        )}
      </div>
    </div>
  );

  const chip = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-300 text-sm transition-colors";

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <section className="bg-gradient-to-b from-brand-50 to-white dark:from-brand-700/20 dark:to-transparent">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{t("home.title")}</h1>
          <p className="mt-4 text-lg text-muted">{t("home.subtitle")}</p>
          <div className="mt-7">
            <HomeSearch />
          </div>
          <div className="mt-6">
            <TrustBadges variant="compact" />
          </div>
          {/* Jump chips: the four file categories, then one for the rest. */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {fileCats.map(([cat, list]) => (
              <a key={cat} href={`#${cat}`} className={chip}>
                {t(`categories.${cat}`)}
                <span className="text-xs text-muted">{list.length}</span>
              </a>
            ))}
            <a href="#others" className={chip}>
              {t("home.otherTools")}
              <span className="text-xs text-muted">{otherCount}</span>
            </a>
          </div>
        </div>
      </section>

      <RecentTools />

      {/* Kits — curated tool bundles; file kits first */}
      <section className="max-w-5xl mx-auto px-4 pt-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-bold">{t("home.kitsTitle")}</h2>
          <IntlLink href="/kits" className="text-sm text-brand-600 hover:underline">
            {t("home.kitsAll")}
          </IntlLink>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {kits.map((kit) => (
            <IntlLink
              key={kit.slug}
              href={`/kits/${kit.slug}`}
              className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full border bg-white dark:bg-gray-900 hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-300 text-sm font-medium transition-colors ${
                INDEXED_KIT_SLUGS.has(kit.slug) ? "border-brand-200 dark:border-brand-800" : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <span>{kit.icon}</span>
              <span>{kit.copy[kloc].title.split("—")[0].trim()}</span>
            </IntlLink>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {fileCats.map(renderCategory)}

        {/* Everything that is not a file tool — still here, still free, but
            out of the way (and out of the search index; see lib/index-policy). */}
        <details id="others" className="group">
          <summary className="cursor-pointer list-none select-none">
            <h2 className="text-2xl font-bold inline-flex items-center gap-2">
              <span className="transition-transform group-open:rotate-90">▸</span>
              {t("home.otherTools")}{" "}
              <span className="text-muted text-base font-normal">({t("home.toolCount", { count: otherCount })})</span>
            </h2>
            <p className="mt-1 text-sm text-muted">{t("home.otherToolsHint", { count: otherCount })}</p>
          </summary>
          <div className="mt-8 space-y-12">{otherCats.map(renderCategory)}</div>
        </details>
      </section>
    </div>
  );
}
