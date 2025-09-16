import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedPages = ["/orders", "/favorites", "/addresses", "/admin/:path*"];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const match = pathname.match(/^\/(en|vi)(\/.*|$)/);
  const locale = match?.[1];
  const pathWithoutLocale = match?.[2] || pathname;

  const isProtectedPage = protectedPages.some((p) =>
    p.endsWith("/:path*")
      ? pathWithoutLocale.startsWith(p.replace("/:path*", ""))
      : pathWithoutLocale === p
  );

  if (isProtectedPage) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const localePrefix = locale ? `/${locale}` : "";
      return NextResponse.redirect(new URL(`${localePrefix}/login`, req.url));
    }
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
