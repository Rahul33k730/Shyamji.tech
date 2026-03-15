import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  // 1. Handle Admin Route Protection
  if (pathname.startsWith("/admin")) {
    // Exclude /admin/login from the protection check to avoid redirect loops
    if (pathname === "/admin/login") {
      if (token) {
        try {
          const secret = new TextEncoder().encode(JWT_SECRET);
          await jwtVerify(token, secret);
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch (error) {
          // Token is invalid, let them stay on the login page
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }

    // Protect all other /admin routes
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed in proxy:", error);
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set("admin_token", "", { maxAge: 0 }); // Explicitly clear
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
