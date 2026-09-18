import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
export async function GET() { if (!await requireAdmin()) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); return NextResponse.json(await prisma.category.findMany({ orderBy: { name: "asc" } })); }
