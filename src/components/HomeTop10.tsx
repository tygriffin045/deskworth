import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import { AffiliateButton } from "@/components/AffiliateButton";
import { TierBadge } from "@/components/TierBadge";

/** Compact home-page Top 10: category label, name, tier, one pro + one con, and the CTA. */
export function HomeTop10({ items, labels }: { items: Product[]; labels: { name: string; href: string }[] }) {
  return (
    <ol className="mt-6 grid gap-3 md:grid-cols-2" data-top10 data-home-top10>
      {items.map((p, i) => (
        <li key={p.slug} className="flex gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
          {p.imageUrl && (
            <Link href={`/products/${p.slug}`} className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-50">
              <Image src={p.imageUrl} alt={p.imageAlt} fill sizes="64px" className="object-contain p-1" priority={i < 2} />
            </Link>
          )}
          <div className="min-w-0 flex-1">
            <Link href={labels[i].href} className="text-[11px] font-semibold uppercase tracking-wider text-[#a84c1f] hover:underline">
              {labels[i].name}
            </Link>
            <h3 className="text-sm font-semibold leading-snug text-stone-900">
              <Link href={`/products/${p.slug}`} className="hover:underline underline-offset-2">{p.name}</Link>{" "}
              <TierBadge tier={p.tier} className="ml-1 align-middle" />
            </h3>
            <p className="mt-1 line-clamp-1 text-xs text-stone-600">
              <span className="font-semibold text-emerald-800">Pro:</span> {p.pros[0]}
            </p>
            <p className="line-clamp-1 text-xs text-stone-600">
              <span className="font-semibold text-rose-800">Con:</span> {p.cons[0]}
            </p>
            <AffiliateButton
              productSlug={p.slug}
              productName={p.name}
              amazonAsin={p.amazonAsin}
              amazonQuery={p.amazonQuery}
              className="mt-2 [&_a]:w-auto [&_a]:px-3 [&_a]:py-1.5 [&_a]:text-xs"
            />
          </div>
        </li>
      ))}
    </ol>
  );
}
