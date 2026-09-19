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
        DeskWorth participates in the Amazon Associates Program and other
        affiliate marketing programs. Here is what that means in plain language.
      </p>

      <h2 className="mt-10 font-serif text-2xl text-stone-900">
        We may earn a commission
      </h2>
      <p className="mt-3 text-stone-700">
        Some links on this site are affiliate links. If you click one and buy
        something, we may receive a commission from the retailer. You do not pay
        more because you used our link.
      </p>

      <h2 className="mt-10 font-serif text-2xl text-stone-900">
        Opinions are still ours
      </h2>
      <p className="mt-3 text-stone-700">
        Affiliate relationships do not buy rankings or force positive reviews.
        We describe tradeoffs — including cons — because trust matters more than
        a single conversion. We link to real Amazon product pages when available.
        Prices shown are approximate; Amazon&apos;s live checkout price always
        wins.
      </p>

      <h2 className="mt-10 font-serif text-2xl text-stone-900">
        Amazon Associates
      </h2>
      <p className="mt-3 text-stone-700">
        As an Amazon Associate, DeskWorth earns from qualifying purchases. Buy
        buttons on product pages take you to Amazon with our tracking ID so we
        can be credited if you purchase.
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
