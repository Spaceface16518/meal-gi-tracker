import type { ReactNode } from "react";

export function Surface({ children }: { children: ReactNode }) {
  return <section className="surface">{children}</section>;
}
