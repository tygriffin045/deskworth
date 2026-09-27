import { AFFILIATE_DISCLOSURE_SHORT } from "@/lib/affiliate";

/** Single, subtle affiliate disclosure line shown once near the top of a page. */
export function AffiliateNote({ className = "mt-2" }: { className?: string }) {
  return (
    <p className={`text-xs text-stone-500 ${className}`}>
      {AFFILIATE_DISCLOSURE_SHORT}
    </p>
  );
}
