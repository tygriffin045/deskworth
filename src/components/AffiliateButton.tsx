"use client";

import { track } from "@vercel/analytics";
import { getAffiliateUrl } from "@/lib/affiliate";

export function AffiliateButton({
  productSlug,
  productName,
  amazonAsin,
  amazonQuery,
  className = "",
  placement = "inline",
}: {
  productSlug: string;
  productName: string;
  amazonAsin?: string;
  amazonQuery?: string;
  className?: string;
  placement?: string;
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
        aria-label={`Check price on Amazon: ${productName}`}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#9a3f12] px-6 py-3.5 text-base font-bold text-white shadow-md ring-2 ring-[#9a3f12]/20 transition hover:bg-[#7c320e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c320e] sm:w-auto"
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
  );
}
