"use client";

import { track } from "@vercel/analytics";
import { getAffiliateUrl } from "@/lib/affiliate";

/** Tasteful mobile-only sticky CTA — hidden on md+ so desktop stays clean. */
export function StickyAffiliateBar({
  productSlug,
  productName,
  amazonAsin,
  amazonQuery,
  priceBand,
}: {
  productSlug: string;
  productName: string;
  amazonAsin?: string;
  amazonQuery?: string;
  priceBand: string;
}) {
  const href = getAffiliateUrl({
    slug: productSlug,
    amazonAsin,
    amazonQuery,
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-[#f7f4ef]/95 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-stone-900">{productName}</p>
          <p className="text-xs text-stone-500">{priceBand}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="shrink-0 rounded-full bg-[#c45c26] px-4 py-2.5 text-sm font-semibold text-white"
          onClick={() =>
            track("amazon_outbound_click", {
              product_slug: productSlug,
              asin: amazonAsin ?? "",
              product_name: productName,
              placement: "sticky_mobile",
            })
          }
        >
          Check Amazon
        </a>
      </div>
    </div>
  );
}
