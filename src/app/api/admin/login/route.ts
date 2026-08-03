import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, signAdminToken, ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const password = typeof (body as Record<string, unknown>)?.password === "string"
    ? (body as Record<string, string>).password
    : "";

  let ok = false;
  try {
    ok = checkAdminPassword(password);
  } catch {
    return NextResponse.json({ error: "Admin login is not configured" }, { status: 503 });
  }

  if (!ok) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ message: "Logged in" });
  res.cookies.set(ADMIN_COOKIE, signAdminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
