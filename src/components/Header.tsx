"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { firm } from "@/lib/data";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Coverage", href: "/#coverage" },
  { label: "Find a Lawyer", href: "/find-a-lawyer" },
  { label: "Join as a Lawyer", href: "/register" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-stone-900">
              {firm.name}
            </span>
            <span className="block text-xs tracking-wide text-stone-500">
              Advocate &amp; Legal Consultants
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium whitespace-nowrap text-stone-600 transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:+91${firm.phones[0]}`}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold whitespace-nowrap text-brand-foreground transition-opacity hover:opacity-90"
          >
            Call Now
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-stone-700 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-stone-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-stone-700"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:+91${firm.phones[0]}`}
              className="mt-1 rounded-full bg-brand px-4 py-2 text-center text-sm font-semibold text-brand-foreground"
            >
              Call Now
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
