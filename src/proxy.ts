import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnLogin = req.nextUrl.pathname === "/admin/login";
  const isOnApi = req.nextUrl.pathname.startsWith("/api/admin");

  if (isOnLogin) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  if ((isOnAdmin || isOnApi) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if ((isOnAdmin || isOnApi) && isLoggedIn && userRole !== "admin") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
