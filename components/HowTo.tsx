export default function HowTo({ steps }: { steps: string[] }) {
  if (!steps?.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">사용 방법</h2>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-semibold">
              {i + 1}
            </span>
            <span className="pt-0.5 text-gray-700">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
