"use client";

import { track } from "@vercel/analytics";
import { getAffiliateUrl } from "@/lib/affiliate";

export function AffiliateButton({
  productSlug,
  productName,
  amazonAsin,
  amazonQuery,
  className = "",
  label,

}: {
  productSlug: string;
  productName: string;
  amazonAsin?: string;
  amazonQuery?: string;
  className?: string;
  label?: string;

}) {
  const href = getAffiliateUrl({
    slug: productSlug,
    amazonAsin,
    amazonQuery,
  });

  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-[#c45c26] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a84c1f] sm:w-auto"
        onClick={() =>
          track("amazon_outbound_click", {
            product_slug: productSlug,
            asin: amazonAsin ?? "",
            product_name: productName,
          })
        }
      >
        {label ?? `Check price on Amazon — ${productName}`}
      </a>
    </div>
  );
}
