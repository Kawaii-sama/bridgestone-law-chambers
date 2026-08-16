import { Logo } from "./Logo";
import { firm } from "@/lib/data";

const credentialList = firm.credentials.split(",").map((c) => c.trim());

export function About() {
  return (
    <section id="about" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Column 1: the founder ─────────────────────────── */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
              About the Founder
            </p>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-stone-900 sm:h-36 sm:w-36">
                <Logo className="h-24 w-24 sm:h-28 sm:w-28" />
              </div>

              <div>
                <h2 className="font-serif text-3xl font-semibold text-stone-900 sm:text-4xl">
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
              </div>
            </div>

            <p className="mt-6 text-stone-600">
              {firm.advocate} founded {firm.name} in Sri Ganganagar, Rajasthan,
              to provide dependable, accessible legal representation across
              criminal, civil, corporate, and personal law matters, handling
              matters before magistrate and session courts, the High Court,
              and specialized tribunals across all districts of Rajasthan and
              India.
            </p>

            <div className="mt-8 space-y-4">
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
                <p className="mt-1 text-xs text-stone-500">
                  Registered as {firm.legalName} · Cert. No. {firm.certNo} ({firm.certAuthority})
                </p>
              </div>
            </div>
          </div>

          {/* ── Column 2: coordinator advocates ───────────────── */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
              Our Coordinator Advocates
            </p>

            {/* Intentionally empty — content to be supplied. */}
            <div className="mt-6 min-h-[20rem] rounded-2xl border border-stone-200 bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
