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
  title: "Standing mat comparison (Topo vs GelPro vs Sky)",
  description: "Side-by-side comparison of Ergodriven Topo, NewLife by GelPro Eco-Pro, and Sky Solutions anti-fatigue mats for standing desks.",
  openGraph: {
    title: "Standing mat comparison (Topo vs GelPro vs Sky)",
    description: "Side-by-side comparison of Ergodriven Topo, NewLife by GelPro Eco-Pro, and Sky Solutions anti-fatigue mats for standing desks.",
    url: "/compare/standing-mats",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "Standing mat comparison (Topo vs GelPro vs Sky)",
    description: "Side-by-side comparison of Ergodriven Topo, NewLife by GelPro Eco-Pro, and Sky Solutions anti-fatigue mats for standing desks.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/compare/standing-mats" },
};

const slugs = ["ergodriven-topo-comfort-mat", "gelpro-newlife-eco-pro-mat", "sky-solutions-anti-fatigue-mat"] as const;

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
    label: "Style",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Style")?.value || "—",
  },
  {
    label: "Size / footprint",
    key: (s) => {
      const p = getProduct(s)!;
      return (
        p.specs.find((x) => x.label === "Size")?.value ||
        p.specs.find((x) => x.label === "Footprint")?.value ||
        "—"
      );
    },
  },
  {
    label: "Thickness",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Thickness")?.value || "—",
  },
  {
    label: "Best for",
    key: (s) => getProduct(s)!.whoItsFor.split(".")[0] + ".",
  },
];

export default function ComparePage() {
  const items = slugs.map((s) => getProduct(s)!);
  const winner = getProduct("ergodriven-topo-comfort-mat")!;
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Standing mat comparison",
    url: `${SITE_URL}/compare/standing-mats`,
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
        Standing mat comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Textured Topo terrain versus dense GelPro foam versus a budget Sky
        Solutions mat — pick by how long you stand and whether you want forced
        micro-movement. Read the{" "}
        <Link
          href="/guides/best-standing-desk-mat"
          className="underline underline-offset-2"
        >
          standing desk mat guide
        </Link>{" "}
        for the full checklist.
      </p>
      <AffiliateNote />

      <CompareNav current={"/compare/standing-mats"} />

      <CompareWinner product={winner} reason={"If you stand for real blocks and fidget naturally, Topo's terrain keeps you moving without a timer app. Choose GelPro Eco-Pro for dense flat foam in shoes, or Sky Solutions when you need a budget full-size mat while you learn the habit."} />

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
