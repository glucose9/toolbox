import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link as IntlLink } from "@/i18n/navigation";
import { getToolsByCategory, SITE_URL, tools, isNewTool } from "@/lib/tools";
import { KITS, type KitLocale } from "@/lib/kits";
import TrustBadges from "@/components/TrustBadges";
import RecentTools from "@/components/RecentTools";
import HomeSearch from "@/components/HomeSearch";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const byCategory = getToolsByCategory();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("site.name"),
    url: SITE_URL,
    description: t("site.tagline"),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <section className="bg-gradient-to-b from-brand-50 to-white dark:from-brand-700/20 dark:to-transparent">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {t("home.title", { count: tools.length })}
          </h1>
          <p className="mt-4 text-lg text-muted">{t("home.subtitle")}</p>
          <div className="mt-7">
            <HomeSearch />
          </div>
          <div className="mt-6">
            <TrustBadges variant="compact" />
          </div>
        </div>
      </section>

      {/* Category jump chips — sticky under the header so users can hop between
          the 10 category sections instead of scrolling through 270+ cards. */}
      <nav className="sticky top-[104px] sm:top-14 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-2 flex gap-1.5 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {Object.entries(byCategory).map(([cat, list]) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-brand-100 dark:hover:bg-brand-900/40 hover:text-brand-700 dark:hover:text-brand-300 transition-colors shrink-0"
            >
              {t(`categories.${cat}`)} <span className="text-muted text-xs">{list.length}</span>
            </a>
          ))}
        </div>
      </nav>

      <RecentTools />

      {/* Kits — curated tool bundles for specific classes/exams/tasks */}
      <section className="max-w-5xl mx-auto px-4 pt-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-bold">{t("home.kitsTitle")}</h2>
          <IntlLink href="/kits" className="text-sm text-brand-600 hover:underline">
            {t("home.kitsAll")}
          </IntlLink>
        </div>
        {/* Single horizontally-scrollable row of slim pills — was a 2-row grid of
            chunky cards, which crowded the page. */}
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {KITS.map((kit) => {
            const kloc = (["ko", "en", "ja", "zh"].includes(locale) ? locale : "ko") as KitLocale;
            return (
              <IntlLink
                key={kit.slug}
                href={`/kits/${kit.slug}`}
                className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-300 text-sm font-medium transition-colors"
              >
                <span>{kit.icon}</span>
                <span>{kit.copy[kloc].title.split("—")[0].trim()}</span>
              </IntlLink>
            );
          })}
        </div>
      </section>

      {/* Tools by category — compact tiles (icon + name), capped at 12 per
          category with a "view all" link to the category page, which carries
          the full list with descriptions. The home page is a directory, not a
          catalog: 272 description cards made it unreadable. */}
      <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        {Object.entries(byCategory).map(([cat, list]) => {
          const shown = list.slice(0, 12);
          return (
            <div key={cat} id={cat} className="scroll-mt-40 sm:scroll-mt-28">
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-xl font-bold">
                  <IntlLink href={`/category/${cat}`} className="hover:text-brand-600">
                    {t(`categories.${cat}`)}
                  </IntlLink>{" "}
                  <span className="text-muted text-sm font-normal">{list.length}</span>
                </h2>
                {list.length > shown.length && (
                  <IntlLink href={`/category/${cat}`} className="text-sm text-brand-600 hover:underline shrink-0">
                    {t("home.viewAll", { count: list.length })}
                  </IntlLink>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {shown.map((tool) => (
                  <IntlLink
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-500 hover:shadow-sm transition-all group"
                  >
                    <span className="text-xl shrink-0">{tool.icon}</span>
                    <span className="text-sm font-medium truncate group-hover:text-brand-600">
                      {t(`tools.${tool.slug}`, {}, { fallback: tool.navTitle } as never)}
                    </span>
                    {isNewTool(tool) && (
                      <span className="ml-auto shrink-0 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white">
                        {t("home.newBadge")}
                      </span>
                    )}
                  </IntlLink>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
