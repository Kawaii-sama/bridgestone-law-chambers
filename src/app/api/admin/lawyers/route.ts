import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/adminAuth";
import type { Lawyer, LawyerStatus } from "@/lib/lawyer";

const validStatuses: LawyerStatus[] = ["pending", "approved", "rejected"];

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const statusParam = req.nextUrl.searchParams.get("status");
  const query: Record<string, unknown> = {};
  if (statusParam && validStatuses.includes(statusParam as LawyerStatus)) {
    query.status = statusParam;
  }

  try {
    const db = await getDb();
    const lawyers = await db
      .collection<Lawyer>("lawyers")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ lawyers });
  } catch {
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }
}
