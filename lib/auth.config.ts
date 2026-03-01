import type { NextAuthConfig } from "next-auth";

export const PUBLIC_PATHS = ["/login", "/register"];

const authConfig = {
  providers: [],
  pages: { signIn: "/login" }
} satisfies NextAuthConfig;

export default authConfig;
