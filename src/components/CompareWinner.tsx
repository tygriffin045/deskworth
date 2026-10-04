import Link from "next/link";
import type { Product } from "@/data/types";
import { AffiliateButton } from "@/components/AffiliateButton";

/** Honest editorial pick callout — not a fake #1 badge. */
export function CompareWinner({
  product,
  reason,
}: {
  product: Product;
  reason: string;
}) {
  return (
    <aside className="mt-8 rounded-2xl border border-[#c45c26]/35 bg-[#c45c26]/8 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#a84c1f]">
        Our pick for most people
      </p>
      <h2 className="mt-1 font-serif text-2xl text-stone-900">
        <Link
          href={`/products/${product.slug}`}
          className="hover:underline underline-offset-4"
        >
          {product.name}
        </Link>
      </h2>
      <p className="mt-2 text-stone-700">{reason}</p>
      <AffiliateButton
        productSlug={product.slug}
        productName={product.name}
        amazonAsin={product.amazonAsin}
        amazonQuery={product.amazonQuery}
        className="mt-4"
        label={`Check price on Amazon — ${product.name}`}
      />
    </aside>
  );
}
