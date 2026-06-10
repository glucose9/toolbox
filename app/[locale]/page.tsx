import Link from "next/link";
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
            <TrustBadges variant="full" />
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {KITS.map((kit) => {
            const kloc = (["ko", "en", "ja", "zh"].includes(locale) ? locale : "ko") as KitLocale;
            return (
              <IntlLink
                key={kit.slug}
                href={`/kits/${kit.slug}`}
                className="card hover:border-brand-500 hover:shadow-sm transition-all text-center py-4"
              >
                <div className="text-3xl mb-2">{kit.icon}</div>
                <div className="text-sm font-semibold leading-tight">
                  {kit.copy[kloc].title.split("—")[0].trim()}
                </div>
                <div className="mt-1 text-xs text-muted">
                  {t("home.toolCount", { count: kit.tools.length })}
                </div>
              </IntlLink>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {Object.entries(byCategory).map(([cat, list]) => (
          <div key={cat} id={cat} className="scroll-mt-40 sm:scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4">
              <IntlLink href={`/category/${cat}`} className="hover:text-brand-600">
                {t(`categories.${cat}`)}
              </IntlLink>{" "}
              <span className="text-muted text-base font-normal">
                ({t("home.toolCount", { count: list.length })})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((tool) => (
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
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
