import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({ title: z.string().min(1), author: z.string().min(1), description: z.string().min(1), coverUrl: z.string().url().optional().or(z.literal("")), pricePerDay: z.coerce.number().int().positive(), stock: z.coerce.number().int().nonnegative(), categoryId: z.string().min(1), featured: z.boolean() });
type Context = { params: Promise<{ id: string }> };
export async function GET(_: Request, context: Context) { if (!await requireAdmin()) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); return NextResponse.json(await prisma.book.findUnique({ where: { id: (await context.params).id }, include: { category: true } })); }
export async function PATCH(request: Request, context: Context) { if (!await requireAdmin()) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); const input = schema.safeParse(await request.json()); if (!input.success) return NextResponse.json({ message: "Dữ liệu không hợp lệ" }, { status: 400 }); const book = await prisma.book.update({ where: { id: (await context.params).id }, data: { ...input.data, available: input.data.stock, coverUrl: input.data.coverUrl || null } }); return NextResponse.json(book); }
export async function DELETE(_: Request, context: Context) { if (!await requireAdmin()) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); await prisma.book.delete({ where: { id: (await context.params).id } }); return NextResponse.json({ ok: true }); }
