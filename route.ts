import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";

const schema = z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().min(9), password: z.string().min(8) });
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: "Thông tin đăng ký chưa hợp lệ" }, { status: 400 });
    const { name, email, phone, password } = parsed.data;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ message: "Email đã được sử dụng" }, { status: 409 });
    const user = await prisma.user.create({ data: { name, email, phone, passwordHash: await bcrypt.hash(password, 12) } });
    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, phone: user.phone } }, { status: 201 });
    response.cookies.set("booknest_token", await createToken({ userId: user.id, role: user.role }), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" });
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json({ message: "Không thể lưu tài khoản. Hãy kiểm tra PostgreSQL và DATABASE_URL." }, { status: 500 });
  }
}
