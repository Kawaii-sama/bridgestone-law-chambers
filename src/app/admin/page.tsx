import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | Bridgestone Law Chambers",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="font-serif text-3xl font-semibold text-stone-900">
            Lawyer Approvals
          </h1>
          <p className="mt-2 text-stone-600">
            Review and approve advocate registrations before they appear in
            the public directory.
          </p>
          <div className="mt-10">
            <AdminDashboard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
