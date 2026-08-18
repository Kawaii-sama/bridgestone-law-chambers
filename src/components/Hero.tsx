import { firm, serviceCategories } from "@/lib/data";

const totalServices = serviceCategories.reduce((n, c) => n + c.items.length, 0);

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-stone-900 text-stone-50">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border-[40px] border-stone-50" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full border-[30px] border-stone-50" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          {firm.tagline}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
          {firm.name}
        </h1>
        <p className="mt-2 max-w-3xl font-serif text-xl font-semibold text-brand sm:text-2xl">
          {firm.legalName}
        </p>
        <p className="mt-6 max-w-2xl text-lg text-stone-300">
          Led by {firm.advocate} ({firm.credentials}), we represent clients
          across {totalServices}+ areas of law — from criminal defence and
          property disputes to corporate compliance and civil litigation.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/find-a-lawyer"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            Find a Lawyer
          </a>
          <a
            href={`tel:+91${firm.phones[0]}`}
            className="rounded-full border border-stone-500 px-6 py-3 text-sm font-semibold text-stone-100 transition-colors hover:border-stone-300"
          >
            Call for Consultation
          </a>
          <a
            href="#services"
            className="rounded-full border border-stone-500 px-6 py-3 text-sm font-semibold text-stone-100 transition-colors hover:border-stone-300"
          >
            View Practice Areas
          </a>
        </div>

        <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-stone-700 pt-8">
          <div>
            <dt className="text-sm text-stone-400">Practice Areas</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">{totalServices}+</dd>
          </div>
          <div>
            <dt className="text-sm text-stone-400">Coverage</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">All India</dd>
          </div>
          <div>
            <dt className="text-sm text-stone-400">Registered Since</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">2018</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
