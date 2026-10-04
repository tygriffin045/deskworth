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
  title: "Monitor arm comparison (HUANUO vs Ergotron)",
  description: "Side-by-side comparison of HUANUO dual, Amazon Basics dual, and Ergotron LX monitor arms \u2014 VESA, load, and motion tradeoffs.",
  openGraph: {
    title: "Monitor arm comparison (HUANUO vs Ergotron)",
    description: "Side-by-side comparison of HUANUO dual, Amazon Basics dual, and Ergotron LX monitor arms \u2014 VESA, load, and motion tradeoffs.",
    url: "/compare/monitor-arms",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "Monitor arm comparison (HUANUO vs Ergotron)",
    description: "Side-by-side comparison of HUANUO dual, Amazon Basics dual, and Ergotron LX monitor arms \u2014 VESA, load, and motion tradeoffs.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/compare/monitor-arms" },
};

const slugs = ["huanuo-dual-monitor-arm", "amazon-basics-dual-monitor-arm", "ergotron-lx-monitor-arm"] as const;

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
    label: "Screen size",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Screen size")?.value || "—",
  },
  {
    label: "Load",
    key: (s) => {
      const p = getProduct(s)!;
      return (
        p.specs.find((x) => x.label === "Load per arm")?.value ||
        p.specs.find((x) => x.label === "Load")?.value ||
        "—"
      );
    },
  },
  {
    label: "VESA",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "VESA")?.value || "—",
  },
  {
    label: "Mount",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Mount")?.value ||
      getProduct(s)!.specs.find((x) => x.label === "Lift")?.value ||
      "—",
  },
  {
    label: "Best for",
    key: (s) => getProduct(s)!.whoItsFor.split(".")[0] + ".",
  },
];

export default function ComparePage() {
  const items = slugs.map((s) => getProduct(s)!);
  const winner = getProduct("huanuo-dual-monitor-arm")!;
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Monitor arm comparison",
    url: `${SITE_URL}/compare/monitor-arms`,
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
        Monitor arm comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Dual budget mounts versus a premium Ergotron LX single arm — so you can
        match VESA, weight, and motion to your desk. Read the{" "}
        <Link
          href="/guides/how-to-choose-a-monitor-arm"
          className="underline underline-offset-2"
        >
          monitor arm buying guide
        </Link>{" "}
        for the full checklist.
      </p>
      <AffiliateNote />

      <CompareNav current={"/compare/monitor-arms"} />

      <CompareWinner product={winner} reason={"Most dual-monitor desks get more value from a gas-spring dual mount than two premium singles. HUANUO is our default dual pick; choose Amazon Basics when price is the constraint, or Ergotron LX when one primary display will be adjusted all day."} />

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
