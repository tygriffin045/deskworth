import Link from "next/link";

const items = [
  {
    title: "Tradeoffs over trophies",
    body: "We call out dual-motor noise, clamp limits, and foam that compresses — not invented 10/10 scores.",
  },
  {
    title: "Clear affiliate disclosure",
    body: "If we earn a commission, we say so in plain language on every buy path.",
  },
  {
    title: "Amazon Associate links",
    body: "Buy buttons go to Amazon with our Associates tag. We may earn a commission at no extra cost to you.",
  },
];

export function TrustStrip() {
  return (
    <section className="rounded-2xl border border-amber-200/80 bg-amber-50/80 px-5 py-6 sm:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800/80">
            How DeskWorth works
          </p>
          <h2 className="mt-1 font-serif text-2xl text-stone-900">
            Editorial picks with honest affiliate links
          </h2>
        </div>
        <Link
          href="/affiliate-disclosure"
          className="text-sm font-medium text-amber-900 underline underline-offset-4"
        >
          Read our FTC disclosure →
        </Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.title}>
            <p className="font-medium text-stone-900">{item.title}</p>
            <p className="mt-1 text-sm text-stone-600">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
