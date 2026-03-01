import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth, signOut } from "@/lib/auth";

export default async function AppGroupLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  async function logoutAction() {
    "use server";
    await signOut({ redirect: false });
    redirect("/login?logged_out=1");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          Meal + GI Tracker
        </Link>
        <nav className="nav-links">
          <Link href="/meal">Meal</Link>
          <Link href="/gi">GI Event</Link>
          <Link href="/bm">BM</Link>
          <Link href="/search">Search</Link>
        </nav>
        <form action={logoutAction}>
          <button type="submit">Sign Out</button>
        </form>
      </header>
      {session?.user?.email ? (
        <p className="muted">Signed in as {session.user.email}</p>
      ) : null}
      {children}
    </main>
  );
}
