import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { validateLawyerInput, type Lawyer } from "@/lib/lawyer";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = validateLawyerInput(body);
  if (!result.valid) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const lawyer: Omit<Lawyer, "_id"> = {
    ...result.value,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  try {
    const db = await getDb();
    await db.collection<Omit<Lawyer, "_id">>("lawyers").insertOne(lawyer);
    return NextResponse.json({ message: "Submitted for review" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Registration is temporarily unavailable" },
      { status: 503 }
    );
  }
}
