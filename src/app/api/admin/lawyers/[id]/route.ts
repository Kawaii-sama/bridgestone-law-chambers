import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/adminAuth";
import type { Lawyer, LawyerStatus } from "@/lib/lawyer";

const validStatuses: LawyerStatus[] = ["pending", "approved", "rejected"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const statusValue = (body as Record<string, unknown>)?.status;
  if (typeof statusValue !== "string" || !validStatuses.includes(statusValue as LawyerStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const status = statusValue as LawyerStatus;

  try {
    const db = await getDb();
    const result = await db
      .collection<Lawyer>("lawyers")
      .updateOne({ _id: new ObjectId(id) as unknown as string }, { $set: { status } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Updated" });
  } catch {
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db
      .collection<Lawyer>("lawyers")
      .deleteOne({ _id: new ObjectId(id) as unknown as string });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }
}
