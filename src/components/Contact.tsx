"use client";

import { useState, type FormEvent } from "react";
import { firm } from "@/lib/data";

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Consultation request from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${firm.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="bg-stone-900 py-20 text-stone-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Get in Touch
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            Request a Consultation
          </h2>
          <p className="mt-4 max-w-md text-stone-300">
            Reach out directly or send us a message and we&apos;ll get back
            to you.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-stone-400">Phone</dt>
              <dd className="mt-1 space-x-3">
                {firm.phones.map((p) => (
                  <a key={p} href={`tel:+91${p}`} className="font-medium text-stone-100 hover:text-brand">
                    {p}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-stone-400">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${firm.email}`} className="font-medium text-stone-100 hover:text-brand">
                  {firm.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-stone-400">Chambers Address</dt>
              <dd className="mt-1 font-medium text-stone-100">{firm.address}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-stone-800 p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-stone-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-600 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 outline-none focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm text-stone-300">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-600 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 outline-none focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-stone-300">
                How can we help?
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-600 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 outline-none focus:border-brand"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
