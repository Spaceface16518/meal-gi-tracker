import Link from "next/link";
import type { ReactNode } from "react";

export default function AppGroupLayout({ children }: { children: ReactNode }) {
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
      </header>
      {children}
    </main>
  );
}
