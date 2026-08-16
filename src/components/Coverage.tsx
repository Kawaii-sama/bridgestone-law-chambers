import { coverageAreas } from "@/lib/data";

export function Coverage() {
  return (
    <section id="coverage" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          Where We Practice
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-stone-900 sm:text-4xl">
          Coverage Area
        </h2>
        <p className="mt-4 text-stone-600">
          We represent clients before the Supreme Court, Delhi High Court,
          and Delhi District Courts, across Delhi NCR, and in all districts
          of Rajasthan, with matters also handled across India.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-stone-200 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {coverageAreas.map((area) => (
          <div key={area} className="flex items-center gap-2 text-sm text-stone-700">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {area}
          </div>
        ))}
      </div>
    </section>
  );
}