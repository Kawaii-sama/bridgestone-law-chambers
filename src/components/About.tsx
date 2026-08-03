import { Logo } from "./Logo";
import { firm } from "@/lib/data";

const credentialList = firm.credentials.split(",").map((c) => c.trim());

export function About() {
  return (
    <section id="about" className="bg-stone-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex justify-center lg:justify-start">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-stone-900 sm:h-48 sm:w-48">
            <Logo className="h-24 w-24 sm:h-28 sm:w-28" />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            About the Advocate
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-stone-900 sm:text-4xl">
            {firm.advocate}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {credentialList.map((c) => (
              <span
                key={c}
                className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-stone-600">
            {firm.advocate} founded {firm.name} in Sri Ganganagar, Rajasthan,
            to provide dependable, accessible legal representation across
            criminal, civil, corporate, and personal law matters. The
            chambers are registered under Registration No. {firm.regNo} and
            hold Certificate No. {firm.certNo} ({firm.certAuthority}),
            handling matters before magistrate and session courts, the High
            Court, and specialized tribunals across all districts of
            Rajasthan and India.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-stone-500">
                Chambers Address
              </p>
              <p className="mt-1 text-sm font-medium text-stone-800">
                {firm.address}
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-stone-500">
                Registration
              </p>
              <p className="mt-1 text-sm font-medium text-stone-800">
                No. {firm.regNo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
