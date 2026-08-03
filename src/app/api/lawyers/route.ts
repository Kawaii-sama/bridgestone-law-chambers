import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { Lawyer } from "@/lib/lawyer";

export async function GET(req: NextRequest) {
  const service = req.nextUrl.searchParams.get("service");
  const location = req.nextUrl.searchParams.get("location");

  const query: Record<string, unknown> = { status: "approved" };
  if (service) query.expertise = service;
  if (location) query.locations = location;

  try {
    const db = await getDb();
    const lawyers = await db
      .collection<Lawyer>("lawyers")
      .find(query, { projection: { email: 0 } })
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json({ lawyers });
  } catch {
    return NextResponse.json(
      { error: "Search is temporarily unavailable" },
      { status: 503 }
    );
  }
}
