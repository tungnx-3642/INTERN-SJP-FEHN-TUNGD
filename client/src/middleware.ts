import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth(async (req) => {
  const { nextUrl } = req

  if (!req.auth) {
    const response = NextResponse.redirect(new URL("/login", req.url))
    response.cookies.set("redirect", nextUrl.pathname, {
      httpOnly: false,
      path: "/",
    })
    return response
  }

  if (nextUrl.pathname.startsWith("/admin") && !req.auth.user.isAdmin) {
    const response = NextResponse.redirect(new URL("/login", req.url))
    response.cookies.set("redirect", nextUrl.pathname, {
      httpOnly: false,
      path: "/",
    })
    return response
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/orders", "/favorites", "/addresses", "/admin/:path*"],
}
