import Link from "next/link";
import { getToolsByCategory, categoryLabels, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/tools";

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
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            무료로 쓰는 온라인 도구 모음
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            QR코드, 이미지 변환, 글자수 세기까지 — 가입도 워터마크도 없이.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center text-sm">
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full">✓ 가입 불필요</span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full">✓ 워터마크 없음</span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full">✓ 파일은 브라우저에서만 처리</span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full">✓ 평생 무료</span>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {Object.entries(byCategory).map(([cat, list]) => (
          <div key={cat}>
            <h2 className="text-2xl font-bold mb-4">{categoryLabels[cat]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="card hover:border-brand-500 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{tool.icon}</div>
                    <div>
                      <h3 className="font-semibold group-hover:text-brand-600">
                        {tool.navTitle}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
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
