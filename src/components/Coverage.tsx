import { coverageAreas } from "@/lib/data";

// The first four entries are Delhi-region courts; the rest are Rajasthan
// districts. Splitting them lets the long "Delhi District Courts (...)"
// entry get its own well-formatted card instead of squeezing into the
// uniform district grid where its length breaks the row alignment.
const delhiEntries = coverageAreas.slice(0, 4);
const rajasthanDistricts = coverageAreas.slice(4);

function parseEntry(entry: string) {
  const match = entry.match(/^(.+?)\s*\((.+)\)$/);
  if (!match) return { label: entry, detail: null as string[] | null };
  return { label: match[1].trim(), detail: match[2].split(",").map((d) => d.trim()) };
}

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

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {delhiEntries.map((entry) => {
          const { label, detail } = parseEntry(entry);
          return (
            <div key={entry} className="rounded-2xl border border-brand/30 bg-brand/5 p-5">
              <p className="font-serif text-base font-semibold text-stone-900">{label}</p>
              {detail && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {detail.map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-600 ring-1 ring-inset ring-stone-200"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-stone-200 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {rajasthanDistricts.map((district) => (
          <div key={district} className="flex items-center gap-2 text-sm text-stone-700">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {district}
          </div>
        ))}
      </div>
    </section>
  );
}