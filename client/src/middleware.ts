import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("redirect", request.nextUrl.pathname, {
      httpOnly: false,
      path: "/",
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders", "/favorites", "/addresses", "/admin/:path*"],
};
