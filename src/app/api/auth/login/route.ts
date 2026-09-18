import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: "Email hoặc mật khẩu không hợp lệ" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return NextResponse.json({ message: "Thông tin đăng nhập không chính xác" }, { status: 401 });
  const response = NextResponse.json({ user: { id: user.id, name: user.name, role: user.role } });
  response.cookies.set("booknest_token", await createToken({ userId: user.id, role: user.role }), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" });
  return response;
}
