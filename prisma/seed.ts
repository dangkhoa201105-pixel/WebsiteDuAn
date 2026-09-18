import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const passwordHash = await bcrypt.hash("BookNest@123", 12);
  const user = await prisma.user.upsert({ where: { email: "admin@booknest.vn" }, update: { phone: "0900000000" }, create: { name: "BookNest Admin", email: "admin@booknest.vn", phone: "0900000000", passwordHash, role: "ADMIN" } });
  const customerPasswordHash = await bcrypt.hash("User@12345", 12);
  const customer = await prisma.user.upsert({ where: { email: "customer@booknest.vn" }, update: { phone: "0911111111" }, create: { name: "BookNest Customer", email: "customer@booknest.vn", phone: "0911111111", passwordHash: customerPasswordHash, role: "USER" } });
  const categories = await Promise.all(["Văn học", "Kinh doanh", "Kỹ năng", "Thiếu nhi"].map((name) => prisma.category.upsert({ where: { slug: name.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/\\s+/g, "-") }, update: {}, create: { name, slug: name.toLowerCase().replace(/\\s+/g, "-") } })));
  console.log(`Seeded ${user.email}, ${customer.email} and ${categories.length} categories`);
}
main().finally(() => prisma.$disconnect());
