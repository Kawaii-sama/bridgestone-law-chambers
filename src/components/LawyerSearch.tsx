"use client";

import { useState, type FormEvent } from "react";
import { allServices, allLocations, type Lawyer } from "@/lib/lawyer";

export function LawyerSearch() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<Lawyer[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);

    const params = new URLSearchParams();
    if (service) params.set("service", service);
    if (location) params.set("location", location);

    try {
      const res = await fetch(`/api/lawyers?${params.toString()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResults(data.lawyers);
    } catch {
      setError("Search is temporarily unavailable. Please call us directly instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <div>
          <label htmlFor="service" className="text-sm font-medium text-stone-700">
            Service Needed
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-brand"
          >
            <option value="">Any service</option>
            {allServices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="text-sm font-medium text-stone-700">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-brand"
          >
            <option value="">Any location</option>
            {allLocations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      {results && (
        <div className="mt-10">
          <p className="text-sm text-stone-500">
            {results.length} lawyer{results.length === 1 ? "" : "s"} found
          </p>

          {results.length === 0 ? (
            <p className="mt-4 text-stone-600">
              No matching lawyers yet for that combination. Try a broader
              search, or contact us directly and we&apos;ll help you find the
              right advocate.
            </p>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {results.map((lawyer) => (
                <div
                  key={lawyer._id}
                  className="rounded-2xl border border-stone-200 p-6"
                >
                  <h3 className="font-serif text-lg font-semibold text-stone-900">
                    {lawyer.name}
                  </h3>
                  <p className="text-sm text-stone-500">{lawyer.firmRole}</p>
                  {lawyer.credentials && (
                    <p className="mt-1 text-xs text-stone-500">{lawyer.credentials}</p>
                  )}
                  {lawyer.bio && (
                    <p className="mt-3 text-sm text-stone-600">{lawyer.bio}</p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {lawyer.expertise.slice(0, 4).map((e) => (
                      <span
                        key={e}
                        className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600"
                      >
                        {e}
                      </span>
                    ))}
                    {lawyer.expertise.length > 4 && (
                      <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-500">
                        +{lawyer.expertise.length - 4} more
                      </span>
                    )}
                  </div>
                  <a
                    href={`tel:+91${lawyer.phone}`}
                    className="mt-5 inline-block rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90"
                  >
                    Call {lawyer.phone}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
