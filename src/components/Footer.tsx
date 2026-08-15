import { Logo } from "./Logo";
import { firm } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <div>
            <p className="font-serif text-sm font-semibold text-stone-900">
              {firm.name}
            </p>
            <p className="text-xs text-stone-500">
              Registered as {firm.legalName} · Reg. No. {firm.regNo} · Cert. No. {firm.certNo}
            </p>
          </div>
        </div>

        <p className="text-xs text-stone-500">
          © {year} {firm.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
