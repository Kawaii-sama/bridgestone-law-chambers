import { serviceCategories } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          Our Discipline
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-stone-900 sm:text-4xl">
          Practice Areas
        </h2>
        <p className="mt-4 text-stone-600">
          Comprehensive legal representation and advisory across criminal,
          civil, corporate, and personal law matters.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-stone-200 p-6 transition-colors hover:border-brand/40"
          >
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              {category.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {category.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
