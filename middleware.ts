import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function is the middleware function that will be executed for each request
export function middleware(request: NextRequest) {
  // Get the path from the request URL
  const path = request.nextUrl.pathname;

  // Check if the path is "/login" or "/signup"
  const isPublic = path === "/login" || path === "/signup";

  // Get the token value from the "token" cookie, or an empty string if it doesn't exist
  const token = request.cookies.get("token")?.value || "";

  // If the path is a public path ("/login" or "/signup") and a token exists,
  // redirect the user to the home page ("/")
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the path is not a public path and no token exists,
  // redirect the user to the login page ("/login")
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// The `config` object specifies the paths that this middleware should be applied to
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
