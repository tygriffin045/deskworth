import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "FTC affiliate disclosure for DeskWorth — how commissions work in plain language.",
};

export default function AffiliateDisclosurePage() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-serif text-4xl text-stone-900">
        Affiliate disclosure
      </h1>
      <p className="mt-4 text-lg text-stone-700">
        DeskWorth participates in affiliate marketing programs. Here is what
        that means in plain language.
      </p>

      <h2 className="mt-10 font-serif text-2xl text-stone-900">
        We may earn a commission
      </h2>
      <p className="mt-3 text-stone-700">
        Some links on this site are affiliate links. If you click one and buy
        something, we may receive a commission from the retailer or partner
        network. You do not pay more because you used our link.
      </p>

      <h2 className="mt-10 font-serif text-2xl text-stone-900">
        Opinions are still ours
      </h2>
      <p className="mt-3 text-stone-700">
        Affiliate relationships do not buy rankings or force positive reviews.
        We describe tradeoffs — including cons — because trust matters more than
        a single conversion. Product names on this demo site are fictional
        placeholders.
      </p>

      <h2 className="mt-10 font-serif text-2xl text-stone-900">
        Placeholder links today
      </h2>
      <p className="mt-3 text-stone-700">
        Demo CTAs currently point to{" "}
        <code className="rounded bg-stone-200/80 px-1.5 py-0.5 text-sm">
          https://example.com/aff/PRODUCT_SLUG
        </code>
        . When you join Amazon Associates (or another network), set{" "}
        <code className="rounded bg-stone-200/80 px-1.5 py-0.5 text-sm">
          NEXT_PUBLIC_AFFILIATE_BASE_URL
        </code>{" "}
        or update the helper in{" "}
        <code className="rounded bg-stone-200/80 px-1.5 py-0.5 text-sm">
          src/lib/affiliate.ts
        </code>
        . See the README for steps.
      </p>

      <h2 className="mt-10 font-serif text-2xl text-stone-900">Questions</h2>
      <p className="mt-3 text-stone-700">
        Read more about DeskWorth on the{" "}
        <Link href="/about" className="underline underline-offset-2">
          About page
        </Link>
        . This disclosure is intended to comply with FTC endorsement guidelines
        requiring clear, conspicuous notice of material connections.
      </p>
    </article>
  );
}
