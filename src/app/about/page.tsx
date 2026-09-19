import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "What DeskWorth is, how we pick products, and how affiliate commissions work.",
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-serif text-4xl text-stone-900">About DeskWorth</h1>
      <p className="mt-4 text-lg text-stone-700">
        DeskWorth is an editorial affiliate site for home office gear — standing
        desks, ergonomic chairs, monitors, keyboards, webcams, lighting, and the
        accessories that make long days more comfortable.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-stone-900">Our approach</h2>
      <p className="mt-3 text-stone-700">
        We write like people who actually work from home: prioritize stability
        and adjustability over buzzwords, call out tradeoffs, and avoid fake
        “verified scores.” Product pages use real Amazon listings with verified
        ASINs where available, plus honest editorial pros and cons.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-stone-900">
        How we make money
      </h2>
      <p className="mt-3 text-stone-700">
        When you click a product CTA, you may visit a retailer through an
        affiliate link. If you buy, we may earn a commission at no extra cost to
        you. That relationship never changes the price you pay. See our{" "}
        <Link
          href="/affiliate-disclosure"
          className="underline underline-offset-2"
        >
          affiliate disclosure
        </Link>{" "}
        for plain-language FTC details.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-stone-900">Contact</h2>
      <p className="mt-3 text-stone-700">
        This is a starter project for tygriffin045. Replace this section with
        your email or contact form when you launch.
      </p>
    </article>
  );
}
