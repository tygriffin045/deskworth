import type { BudgetTier } from "@/data/types";

const LABEL: Record<BudgetTier, string> = {
  $: "Budget tier",
  $$: "Mid-range tier",
  $$$: "Premium tier",
};

/** $/$$/$$$ budget tier — never a price. */
export function TierBadge({ tier, className = "" }: { tier: BudgetTier; className?: string }) {
  return (
    <span
      title={LABEL[tier]}
      aria-label={LABEL[tier]}
      className={`inline-flex items-center rounded-full border border-stone-300 bg-stone-50 px-2 py-0.5 text-xs font-bold tracking-wider text-stone-700 ${className}`}
      data-tier={tier}
    >
      {tier}
    </span>
  );
}
