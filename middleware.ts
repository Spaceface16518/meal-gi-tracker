import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig, { PUBLIC_PATHS } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isAuthApi = pathname.startsWith("/api/auth");
  const isAuthenticated = Boolean(req.auth);

  if (isAuthApi) {
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicPath) {
    if (pathname.startsWith("/api/")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
