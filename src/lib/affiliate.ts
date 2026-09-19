/**
 * Central affiliate link helper.
 * Swap AFFILIATE_BASE_URL (or NEXT_PUBLIC_AFFILIATE_BASE_URL) for Amazon Associates
 * or another network later — keep product CTAs calling getAffiliateUrl(slug).
 */
const DEFAULT_BASE = "https://example.com/aff";

export function getAffiliateBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_AFFILIATE_BASE_URL ||
    process.env.AFFILIATE_BASE_URL ||
    DEFAULT_BASE
  );
}

export function getAffiliateUrl(productSlug: string): string {
  const base = getAffiliateBaseUrl().replace(/\/$/, "");
  return `${base}/${productSlug}`;
}

export const AFFILIATE_DISCLOSURE_SHORT =
  "As an affiliate, DeskWorth may earn a commission when you buy through our links — at no extra cost to you.";
