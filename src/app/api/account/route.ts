import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(9).max(20),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  coverUrl: z.string().url().optional().or(z.literal("")),
});

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Bạn chưa đăng nhập" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.userId }, include: { _count: { select: { rentals: true } } } });
  if (!user) return NextResponse.json({ message: "Không tìm thấy tài khoản" }, { status: 404 });
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, avatarUrl: user.avatarUrl, coverUrl: user.coverUrl, rentalCount: user._count.rentals });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Bạn chưa đăng nhập" }, { status: 401 });
  const input = profileSchema.safeParse(await request.json());
  if (!input.success) return NextResponse.json({ message: "Thông tin hồ sơ hoặc URL ảnh chưa hợp lệ" }, { status: 400 });
  const user = await prisma.user.update({ where: { id: session.userId }, data: { ...input.data, avatarUrl: input.data.avatarUrl || null, coverUrl: input.data.coverUrl || null } });
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, avatarUrl: user.avatarUrl, coverUrl: user.coverUrl });
}
