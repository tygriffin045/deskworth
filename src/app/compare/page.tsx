import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateNote } from "@/components/AffiliateNote";
import { CompareNav } from "@/components/CompareNav";
import { CompareWinner } from "@/components/CompareWinner";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, DEFAULT_OG_IMAGE_METADATA, DEFAULT_OG_IMAGE } from "@/lib/site";
import type { ReactNode } from "react";
import { getAffiliateUrl } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Standing desk comparison (FlexiSpot vs UPLIFT)",
  description: "Side-by-side DeskWorth comparison of the FlexiSpot E6 55x28, FlexiSpot E6 MAX (48x24 bamboo), and UPLIFT V3 standing desks across budget, mid-range, and premium.",
  openGraph: {
    title: "Standing desk comparison (FlexiSpot vs UPLIFT)",
    description: "Side-by-side DeskWorth comparison of the FlexiSpot E6 55x28, FlexiSpot E6 MAX (48x24 bamboo), and UPLIFT V3 standing desks across budget, mid-range, and premium.",
    url: "/compare",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "Standing desk comparison (FlexiSpot vs UPLIFT)",
    description: "Side-by-side DeskWorth comparison of the FlexiSpot E6 55x28, FlexiSpot E6 MAX (48x24 bamboo), and UPLIFT V3 standing desks across budget, mid-range, and premium.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/compare" },
};

const slugs = ["flexispot-e6-dual-motor-55x28", "flexispot-pro-dual-motor", "uplift-v3"] as const;

const rows: { label: string; key: (slug: string) => ReactNode }[] = [
  {
    label: "Price",
    key: (s) => (
      <a
        href={getAffiliateUrl({ slug: s, amazonAsin: getProduct(s)!.amazonAsin })}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="font-semibold text-[#c45c26] underline underline-offset-2"
      >
        Check price on Amazon
      </a>
    ),
  },
  { label: "Budget tier", key: (s) => getProduct(s)!.budget },
  {
    label: "Height range",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Height range")?.value ||
      "—",
  },
  {
    label: "Motors",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Motors")?.value || "—",
  },
  {
    label: "Top size",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Top size")?.value || "—",
  },
  {
    label: "Max load",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Max load")?.value || "—",
  },
  {
    label: "Warranty",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Warranty")?.value || "—",
  },
  {
    label: "Best for",
    key: (s) => getProduct(s)!.whoItsFor.split(".")[0] + ".",
  },
];

export default function ComparePage() {
  const items = slugs.map((s) => getProduct(s)!);
  const winner = getProduct("flexispot-pro-dual-motor")!;
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Standing desk comparison",
    url: `${SITE_URL}/compare`,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/products/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <div>
      <JsonLd data={listLd} />
      <h1 className="font-serif text-4xl text-stone-900">
        Standing desk comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Three real standing desks across budget and mid-range FlexiSpot options and
        premium UPLIFT — so you can match stability and features to how you actually
        work. Read the{" "}
        <Link
          href="/guides/how-to-choose-a-standing-desk"
          className="underline underline-offset-2"
        >
          full buying guide
        </Link>{" "}
        for context.
      </p>
      <AffiliateNote />

      <CompareNav current={"/compare"} />

      <CompareWinner product={winner} reason={"Most remote workers want a reliable dual-motor desk without boutique pricing \u2014 the FlexiSpot E6 MAX (48x24 bamboo) is the one we send people to first. Save with the FlexiSpot E6 55x28 if you want a wider top for less and a lighter load, or step up to the premium UPLIFT V3 for heavy multi-monitor rigs, a 355 lb frame, and a 15-year warranty."} />

      <div className="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-4 font-medium text-stone-500">Feature</th>
              {items.map((d) => (
                <th key={d.slug} className="px-4 py-4">
                  <Link
                    href={`/products/${d.slug}`}
                    className="font-serif text-lg text-stone-900 hover:underline"
                  >
                    {d.name}
                  </Link>
                  <p className="mt-1 text-xs font-normal text-stone-500">
                    {d.brand}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-stone-100 align-top">
                <th className="px-4 py-3 font-medium text-stone-500">
                  {row.label}
                </th>
                {slugs.map((slug) => (
                  <td key={slug} className="px-4 py-3 text-stone-800">
                    {row.key(slug)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="align-top">
              <th className="px-4 py-4 font-medium text-stone-500">Shop</th>
              {items.map((d) => (
                <td key={d.slug} className="px-4 py-4">
                  <AffiliateButton
                    productSlug={d.slug}
                    productName={d.name}
                    amazonAsin={d.amazonAsin}
                    amazonQuery={d.amazonQuery}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
