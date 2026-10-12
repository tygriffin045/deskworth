import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import { AffiliateButton } from "@/components/AffiliateButton";
import { TierBadge } from "@/components/TierBadge";
import { getThreePicks } from "@/data/top10";

const BADGE = {
  best: { label: "Best Overall", cls: "bg-[#c45c26] text-white" },
  premium: { label: "Premium Pick", cls: "bg-stone-900 text-amber-200" },
  value: { label: "Value Pick", cls: "bg-emerald-700 text-white" },
} as const;

/** Best Overall / Premium Pick / Value Pick, drawn from the page's Top 10. */
export function BadgePicks({ category }: { category: string }) {
  const picks = getThreePicks(category);
  if (!picks) return null;
  const rows: { kind: keyof typeof BADGE; p: Product }[] = [
    { kind: "best", p: picks.best },
    { kind: "premium", p: picks.premium },
    { kind: "value", p: picks.value },
  ];
  return (
    <section
      aria-labelledby="badge-picks"
      className="mt-8 rounded-2xl border border-amber-300/70 bg-amber-50/80 p-5 sm:p-6"
      data-badge-picks
    >
      <h2 id="badge-picks" className="font-serif text-2xl text-stone-900">
        Our three picks
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Chosen from the Top 10 below. Budget tiers: $ budget · $$ mid-range · $$$ premium.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {rows.map(({ kind, p }) => (
          <article
            key={kind}
            className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
            data-pick={kind}
          >
            <span
              className={`self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${BADGE[kind].cls}`}
            >
              {BADGE[kind].label}
            </span>
            {p.imageUrl && (
              <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-lg bg-stone-50">
                <Image
                  src={p.imageUrl}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, 30vw"
                  className="object-contain p-3"
                />
              </div>
            )}
            <h3 className="mt-3 font-semibold leading-snug text-stone-900">
              <Link href={`/products/${p.slug}`} className="hover:underline">
                {p.name}
              </Link>{" "}
              <TierBadge tier={p.tier} />
            </h3>
            <p className="mt-1 text-sm text-stone-600">{p.tagline}</p>
            <ul className="mt-2 flex-1 space-y-1 text-sm text-stone-700">
              <li><span className="font-semibold text-emerald-800">Pro:</span> {p.pros[0]}</li>
              <li><span className="font-semibold text-rose-800">Con:</span> {p.cons[0]}</li>
            </ul>
            <AffiliateButton
              productSlug={p.slug}
              productName={p.name}
              amazonAsin={p.amazonAsin}
              amazonQuery={p.amazonQuery}
              label="Check price on Amazon"
              className="mt-4 [&_a]:w-full"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
