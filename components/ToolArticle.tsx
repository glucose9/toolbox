import type { ToolArticle } from "@/lib/tool-articles";

// Renders the per-tool long-form Korean article (lib/tool-articles.tsx).
// Server component — pure static content, styled to match HowTo/FAQ.
export default function ToolArticleView({ article }: { article: ToolArticle }) {
  return (
    <section className="mt-10">
      {article.sections.map((s, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-xl font-bold mb-3">{s.h2}</h2>
          {s.paragraphs?.map((p, j) => (
            <p key={j} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {p}
            </p>
          ))}
          {s.list && (
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700 dark:text-gray-300 mb-3">
              {s.list.map((li, j) => (
                <li key={j}>{li}</li>
              ))}
            </ul>
          )}
          {s.table && (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-[24rem] text-sm border-collapse">
                {s.table.caption && (
                  <caption className="text-left text-xs text-muted mb-1">{s.table.caption}</caption>
                )}
                <thead>
                  <tr>
                    {s.table.head.map((h, j) => (
                      <th
                        key={j}
                        className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-left font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((r, j) => (
                    <tr key={j}>
                      {r.map((c, k) => (
                        <td key={k} className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
      <p className="text-xs text-muted">최종 업데이트: {article.updated}</p>
    </section>
  );
}
