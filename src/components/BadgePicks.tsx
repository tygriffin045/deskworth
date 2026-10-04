import Image from "next/image";
import { products } from "@/data/products";
import { getAffiliateUrl } from "@/lib/affiliate";
import { BADGE_PICKS, type BadgeKind } from "@/data/badges";

const BADGE: Record<BadgeKind, { label: string; cls: string }> = {
  premium: { label: "Premium Pick", cls: "bg-stone-900 text-amber-200" },
  bang: { label: "Bang for the Buck", cls: "bg-[#c45c26] text-white" },
  value: { label: "Value Pick", cls: "bg-emerald-700 text-white" },
};

/** Three badged picks drawn from the page's Top 10. Picks are chosen from live Amazon prices (see badges.json); prices are not shown. */
export function BadgePicks({ category }: { category: string }) {
  const rows = (BADGE_PICKS[category] ?? [])
    .map((b) => ({ ...b, p: products.find((x) => x.slug === b.slug) }))
    .filter((r) => r.p && r.p.amazonAsin && r.p.imageUrl);
  if (rows.length !== 3) return null;
  return (
    <section
      aria-labelledby="badge-picks"
      className="mt-8 rounded-2xl border border-amber-300/70 bg-amber-50/80 p-5 sm:p-6"
      data-badge-picks
    >
      <h2 id="badge-picks" className="font-serif text-2xl text-stone-900">
        Our three standout picks
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Chosen from the Top 10 below: one premium, one mid-priced, one budget.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {rows.map(({ badge, line, p }) => (
          <article
            key={badge}
            className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
          >
            <span
              className={`self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${BADGE[badge].cls}`}
            >
              {BADGE[badge].label}
            </span>
            <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-lg bg-stone-50">
              <Image
                src={p!.imageUrl!}
                alt={p!.name}
                fill
                sizes="(max-width: 640px) 90vw, 30vw"
                className="object-contain p-3"
              />
            </div>
            <h3 className="mt-3 font-semibold leading-snug text-stone-900">
              {p!.name}
            </h3>
            <p className="mt-1 flex-1 text-sm text-stone-600">{line}</p>
            <a
              href={getAffiliateUrl({ slug: p!.slug, amazonAsin: p!.amazonAsin })}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#c45c26] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a84c1f]"
            >
              Check price on Amazon
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
