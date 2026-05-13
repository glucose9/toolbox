import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, getTool, SITE_URL, categoryLabels } from "@/lib/tools";
import ToolRenderer from "@/components/ToolRenderer";
import FAQ from "@/components/FAQ";
import HowTo from "@/components/HowTo";
import TrustBadges from "@/components/TrustBadges";
import FavoriteButton from "@/components/FavoriteButton";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `${SITE_URL}/tools/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url,
      type: "website",
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
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
      { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabels[tool.category],
        item: `${SITE_URL}/#${tool.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.navTitle,
        item: `${SITE_URL}/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-brand-600">홈</Link>
        <span className="mx-2">›</span>
        <span>{categoryLabels[tool.category]}</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{tool.navTitle}</span>
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
          <h2 className="text-xl font-bold mb-4">관련 도구</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/tools/${r.slug}`}
                className="card hover:border-brand-500 text-center"
              >
                <div className="text-2xl">{r.icon}</div>
                <div className="mt-2 text-sm font-medium">{r.navTitle}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
