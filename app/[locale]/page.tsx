import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link as IntlLink } from "@/i18n/navigation";
import { getToolsByCategory, SITE_URL, tools, isNewTool } from "@/lib/tools";
import TrustBadges from "@/components/TrustBadges";
import RecentTools from "@/components/RecentTools";

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
          <div className="mt-6">
            <TrustBadges variant="full" />
          </div>
        </div>
      </section>

      <RecentTools />

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {Object.entries(byCategory).map(([cat, list]) => (
          <div key={cat} id={cat}>
            <h2 className="text-2xl font-bold mb-4">
              {t(`categories.${cat}`)}{" "}
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
                        {tool.description}
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
