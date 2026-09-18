import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const userCount = await prisma.user.count();
    return NextResponse.json({ ok: true, database: "connected", userCount });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";
    console.error("Database health check failed:", error);
    return NextResponse.json({ ok: false, database: "unavailable", error: message.slice(0, 240) }, { status: 503 });
  }
}