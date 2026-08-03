"use client";

import { useState, type FormEvent } from "react";
import { serviceCategories, rajasthanDistricts } from "@/lib/data";

const locationOptions = [...rajasthanDistricts, "All India"];

export function LawyerRegistrationForm() {
  const [name, setName] = useState("");
  const [credentials, setCredentials] = useState("");
  const [firmRole, setFirmRole] = useState("Associate Advocate");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/lawyers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, credentials, firmRole, phone, email, bio, expertise, locations }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center">
        <h3 className="font-serif text-xl font-semibold text-stone-900">
          Thank you for registering
        </h3>
        <p className="mt-2 text-stone-600">
          Your profile has been submitted and is pending review. We&apos;ll
          be in touch once it&apos;s approved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-stone-700">
            Full Name *
          </label>
          <input
            id="name"
            required
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="firmRole" className="text-sm font-medium text-stone-700">
            Role
          </label>
          <input
            id="firmRole"
            maxLength={100}
            value={firmRole}
            onChange={(e) => setFirmRole(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="credentials" className="text-sm font-medium text-stone-700">
            Credentials
          </label>
          <input
            id="credentials"
            maxLength={200}
            placeholder="LL.B, LL.M, ..."
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-stone-700">
            Phone (10 digits) *
          </label>
          <input
            id="phone"
            type="tel"
            required
            pattern="[0-9]{10}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className="text-sm font-medium text-stone-700">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bio" className="text-sm font-medium text-stone-700">
            Short Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            maxLength={1000}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-stone-700">Practice Areas *</p>
        <div className="mt-2 max-h-64 space-y-4 overflow-y-auto rounded-lg border border-stone-300 p-4">
          {serviceCategories.map((category) => (
            <div key={category.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                {category.title}
              </p>
              <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {category.items.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={expertise.includes(item)}
                      onChange={() => toggle(expertise, setExpertise, item)}
                      className="h-4 w-4 rounded border-stone-300 text-brand focus:ring-brand"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {expertise.length === 0 && (
          <p className="mt-1 text-xs text-stone-500">Select at least one practice area.</p>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-stone-700">Locations Served *</p>
        <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-stone-300 p-4">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4">
            {locationOptions.map((loc) => (
              <label key={loc} className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={locations.includes(loc)}
                  onChange={() => toggle(locations, setLocations, loc)}
                  className="h-4 w-4 rounded border-stone-300 text-brand focus:ring-brand"
                />
                {loc}
              </label>
            ))}
          </div>
        </div>
        {locations.length === 0 && (
          <p className="mt-1 text-xs text-stone-500">Select at least one location.</p>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting" || expertise.length === 0 || locations.length === 0}
        className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Submitting…" : "Submit for Review"}
      </button>
    </form>
  );
}
