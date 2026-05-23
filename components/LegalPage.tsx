import { LEGAL, type LegalKind, type Locale } from "@/lib/legal";

export default function LegalPage({ kind, locale }: { kind: LegalKind; locale: string }) {
  const loc = (["ko", "en", "ja", "zh"].includes(locale) ? locale : "ko") as Locale;
  const doc = LEGAL[kind][loc];
  const updatedLabel =
    loc === "ko" ? "최종 수정일" : loc === "ja" ? "最終更新日" : loc === "zh" ? "最后更新" : "Last updated";

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{doc.title}</h1>
      <p className="text-xs text-muted mb-6">
        {updatedLabel}: {doc.updated}
      </p>
      <p className="text-muted leading-relaxed mb-8">{doc.intro}</p>
      <div className="space-y-6">
        {doc.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-lg font-semibold mb-2">{s.h}</h2>
            {s.p.map((para, j) => (
              <p key={j} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
