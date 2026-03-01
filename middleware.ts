import { NextRequest, NextResponse } from "next/server";
import { requirePasscode } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const authError = requirePasscode(request);
  if (authError) {
    return authError;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
