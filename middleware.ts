import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("booknest_token")?.value;
  const isProtected = request.nextUrl.pathname.startsWith("/account") || request.nextUrl.pathname.startsWith("/admin");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/login?next=${request.nextUrl.pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/account/:path*", "/admin/:path*"] };
