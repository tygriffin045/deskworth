import { getAffiliateUrl } from "@/lib/affiliate";

export function AffiliateButton({
  productSlug,
  productName,
  amazonAsin,
  amazonQuery,
  className = "",
}: {
  productSlug: string;
  productName: string;
  amazonAsin?: string;
  amazonQuery?: string;
  className?: string;
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
      >
        Check price on Amazon — {productName}
      </a>
      <p className="mt-2 text-xs text-stone-500">
        Amazon Associate link · We may earn a commission at no extra cost to you
      </p>
    </div>
  );
}
