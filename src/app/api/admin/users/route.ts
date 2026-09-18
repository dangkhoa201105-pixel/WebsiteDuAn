import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.toLowerCase() ?? "";
  const role = url.searchParams.get("role");
  const users = await prisma.user.findMany({ where: { ...(role === "USER" || role === "ADMIN" ? { role } : {}), ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }, { phone: { contains: q } }] } : {}) }, include: { _count: { select: { rentals: true } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(users.map((user) => ({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, _count: user._count, createdAt: user.createdAt })));
}

const updateSchema = z.object({ id: z.string(), role: z.enum(["USER", "ADMIN"]) });
export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const input = updateSchema.safeParse(await request.json());
  if (!input.success) return NextResponse.json({ message: "Dữ liệu không hợp lệ" }, { status: 400 });
  if (input.data.id === session.userId) return NextResponse.json({ message: "Không thể đổi quyền chính mình" }, { status: 400 });
  const user = await prisma.user.update({ where: { id: input.data.id }, data: { role: input.data.role } });
  return NextResponse.json({ id: user.id, role: user.role });
}

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id || id === session.userId) return NextResponse.json({ message: "Không thể xóa tài khoản này" }, { status: 400 });
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
