export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </section>
  );
}
