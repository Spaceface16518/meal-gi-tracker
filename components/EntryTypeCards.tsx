import Link from "next/link";

const cards = [
  {
    href: "/meal",
    title: "Log Meal",
    body: "Take a photo, add notes, and save AI meal extraction."
  },
  {
    href: "/gi",
    title: "Log GI Event",
    body: "Record severity, symptoms, and short context notes."
  },
  {
    href: "/bm",
    title: "Log BM",
    body: "Capture Bristol scale, color, urgency, and notes."
  }
];

export function EntryTypeCards() {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Link key={card.href} href={card.href} className="choice-card">
          <h2>{card.title}</h2>
          <p>{card.body}</p>
        </Link>
      ))}
    </div>
  );
}
