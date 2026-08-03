"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Lawyer, LawyerStatus } from "@/lib/lawyer";

const tabs: LawyerStatus[] = ["pending", "approved", "rejected"];

export function AdminDashboard() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<LawyerStatus>("pending");
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadLawyers(status: LawyerStatus) {
    setLoading(true);
    const res = await fetch(`/api/admin/lawyers?status=${status}`);
    if (res.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setLawyers(data.lawyers ?? []);
    setAuthed(true);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial + tab-switch data fetch
    loadLawyers(tab);
  }, [tab]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error || "Login failed");
      return;
    }
    setPassword("");
    loadLawyers(tab);
  }

  async function updateStatus(id: string, status: LawyerStatus) {
    await fetch(`/api/admin/lawyers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadLawyers(tab);
  }

  if (authed === false) {
    return (
      <form onSubmit={handleLogin} className="max-w-sm space-y-4">
        <div>
          <label htmlFor="admin-password" className="text-sm font-medium text-stone-700">
            Admin Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        {loginError && <p className="text-sm text-red-600">{loginError}</p>}
        <button
          type="submit"
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90"
        >
          Log In
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex gap-2 border-b border-stone-200">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize ${
              tab === t
                ? "border-b-2 border-brand text-stone-900"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {loading && <p className="text-sm text-stone-500">Loading…</p>}
        {!loading && lawyers.length === 0 && (
          <p className="text-sm text-stone-500">No {tab} profiles.</p>
        )}
        {lawyers.map((lawyer) => (
          <div key={lawyer._id} className="rounded-xl border border-stone-200 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-semibold text-stone-900">
                  {lawyer.name}
                </h3>
                <p className="text-sm text-stone-500">
                  {lawyer.firmRole} · {lawyer.phone} · {lawyer.email}
                </p>
              </div>
              <div className="flex gap-2">
                {tab !== "approved" && (
                  <button
                    onClick={() => updateStatus(lawyer._id!, "approved")}
                    className="rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                  >
                    Approve
                  </button>
                )}
                {tab !== "rejected" && (
                  <button
                    onClick={() => updateStatus(lawyer._id!, "rejected")}
                    className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
            {lawyer.bio && <p className="mt-3 text-sm text-stone-600">{lawyer.bio}</p>}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lawyer.expertise.map((e) => (
                <span key={e} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600">
                  {e}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-stone-500">
              Locations: {lawyer.locations.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
