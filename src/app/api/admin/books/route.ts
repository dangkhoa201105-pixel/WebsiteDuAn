import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const bookSchema = z.object({ title: z.string().min(1), author: z.string().min(1), description: z.string().min(1), coverUrl: z.string().url().optional().or(z.literal("")), pricePerDay: z.coerce.number().int().positive(), stock: z.coerce.number().int().nonnegative(), categoryId: z.string().min(1), featured: z.boolean().default(false) });
const slugify = (text: string) => `${text.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

export async function GET() { if (!await requireAdmin()) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); return NextResponse.json(await prisma.book.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } })); }
export async function POST(request: Request) { if (!await requireAdmin()) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); const input = bookSchema.safeParse(await request.json()); if (!input.success) return NextResponse.json({ message: "Dữ liệu sách không hợp lệ", issues: input.error.flatten() }, { status: 400 }); const book = await prisma.book.create({ data: { ...input.data, available: input.data.stock, slug: slugify(input.data.title), coverUrl: input.data.coverUrl || null } }); return NextResponse.json(book, { status: 201 }); }
