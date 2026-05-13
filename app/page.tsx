import Link from "next/link";
import {
  getToolsByCategory,
  categoryLabels,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  tools,
  isNewTool,
} from "@/lib/tools";
import TrustBadges from "@/components/TrustBadges";
import RecentTools from "@/components/RecentTools";

export default function HomePage() {
  const byCategory = getToolsByCategory();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
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
            무료로 쓰는 온라인 도구 {tools.length}개
          </h1>
          <p className="mt-4 text-lg text-muted">
            QR코드, 이미지 변환, 동영상 처리, 글자수 세기 — 가입도 워터마크도 없이.
          </p>
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
              {categoryLabels[cat]} <span className="text-muted text-base font-normal">({list.length}개)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="card hover:border-brand-500 hover:shadow-sm transition-all group relative"
                >
                  {isNewTool(tool) && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white">
                      NEW
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{tool.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-brand-600">
                        {tool.navTitle}
                      </h3>
                      <p className="mt-1 text-sm text-muted line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
