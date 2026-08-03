import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LawyerSearch } from "@/components/LawyerSearch";

export const metadata: Metadata = {
  title: "Find a Lawyer | Bridgestone Law Chambers",
  description: "Search Bridgestone Law Chambers advocates by practice area and location.",
};

export default function FindALawyerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Find a Lawyer
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-3xl font-semibold text-stone-900 sm:text-4xl">
            Search by service and location
          </h1>
          <p className="mt-4 max-w-2xl text-stone-600">
            Tell us what you need help with and where you&apos;re based, and
            we&apos;ll show you matching advocates from Bridgestone Law
            Chambers.
          </p>

          <div className="mt-10">
            <LawyerSearch />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
