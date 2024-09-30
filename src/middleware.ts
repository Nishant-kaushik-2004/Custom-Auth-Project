import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Skip middleware for static files and API routes
  if (
    path.startsWith("/_next") ||
    path.startsWith("/static") ||
    path.startsWith("/api") ||
    /\.(js|css|json|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$/.test(path)
  ) {
    return NextResponse.next();
  }

  const publicPath =
    path === "/signup" || path === "/login" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (publicPath && path !== "/signup" && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
