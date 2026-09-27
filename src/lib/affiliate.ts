/**
 * Amazon Associates affiliate helper.
 * Store ID / tag: deskworth20-20
 * Prefer real ASINs when available; otherwise Amazon search with the tag.
 */
export const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "deskworth20-20";

export type AffiliateTarget = {
  slug: string;
  amazonAsin?: string;
  amazonQuery?: string;
};

export function getAffiliateUrl(target: string | AffiliateTarget): string {
  const tag = AMAZON_ASSOCIATE_TAG;
  if (typeof target === "string") {
    const q = encodeURIComponent(target.replace(/-/g, " "));
    return `https://www.amazon.com/s?k=${q}&tag=${tag}`;
  }
  if (target.amazonAsin) {
    return `https://www.amazon.com/dp/${target.amazonAsin}?tag=${tag}`;
  }
  const q = encodeURIComponent(
    target.amazonQuery || target.slug.replace(/-/g, " "),
  );
  return `https://www.amazon.com/s?k=${q}&tag=${tag}`;
}

export const AFFILIATE_DISCLOSURE_SHORT =
  "We may earn a commission from qualifying purchases.";
