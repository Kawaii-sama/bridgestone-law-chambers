import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LawyerRegistrationForm } from "@/components/LawyerRegistrationForm";
import { firm } from "@/lib/data";

export const metadata: Metadata = {
  title: `Join as a Lawyer | ${firm.name}`,
  description: `Register as an associate advocate with ${firm.name}.`,
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Join {firm.name}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-stone-900 sm:text-4xl">
            Register as an Advocate
          </h1>
          <p className="mt-4 text-stone-600">
            Submit your details below. Every registration is reviewed before
            it appears in our public directory.
          </p>

          <div className="mt-10">
            <LawyerRegistrationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
