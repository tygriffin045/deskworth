"use client";

import { track } from "@vercel/analytics";
import { getAffiliateUrl } from "@/lib/affiliate";

/** Sticky bottom CTA (all screen sizes) for the page's lead product. */
export function StickyAffiliateBar({
  productSlug,
  productName,
  amazonAsin,
  amazonQuery,
  label,
  placement = "sticky",
}: {
  productSlug: string;
  productName: string;
  amazonAsin?: string;
  amazonQuery?: string;
  label?: string;
  placement?: string;
}) {
  const href = getAffiliateUrl({
    slug: productSlug,
    amazonAsin,
    amazonQuery,
  });

  return (
    <>
    <div aria-hidden className="h-20" />
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[#9a3f12]/30 bg-white/95 p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md" data-sticky-cta>
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          {label && <p className="text-[11px] font-bold uppercase tracking-wider text-[#9a3f12]">{label}</p>}
          <p className="truncate text-sm font-medium text-stone-900">{productName}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label={`Check price on Amazon: ${productName}`}
          className="shrink-0 rounded-full bg-[#9a3f12] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#7c320e]"
          onClick={() =>
            track("amazon_outbound_click", {
              product_slug: productSlug,
              asin: amazonAsin ?? "",
              product_name: productName,
              placement,
            })
          }
        >
          Check price on Amazon
        </a>
      </div>
    </div>
      </>
  );
}
