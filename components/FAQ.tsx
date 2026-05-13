import type { FAQItem } from "@/lib/tools";

export default function FAQ({ items }: { items: FAQItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">자주 묻는 질문</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} className="card open:shadow-sm">
            <summary className="font-medium cursor-pointer list-none flex justify-between">
              <span>{item.q}</span>
              <span className="text-gray-400">+</span>
            </summary>
            <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
