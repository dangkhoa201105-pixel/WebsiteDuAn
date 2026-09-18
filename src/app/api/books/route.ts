import { NextRequest, NextResponse } from "next/server";
import { books } from "@/lib/books";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const category = searchParams.get("category") ?? "Tất cả";
  const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? 12), 1), 50);

  const filtered = books.filter((book) => {
    const matchesQuery = !query || `${book.title} ${book.author}`.toLowerCase().includes(query);
    const matchesCategory = category === "Tất cả" || book.category === category;
    return matchesQuery && matchesCategory;
  });

  const start = (page - 1) * limit;
  return NextResponse.json({ data: filtered.slice(start, start + limit), meta: { page, limit, total: filtered.length } });
}
