import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateNote } from "@/components/AffiliateNote";
import { CompareNav } from "@/components/CompareNav";
import { CompareWinner } from "@/components/CompareWinner";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, DEFAULT_OG_IMAGE_METADATA, DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cable management comparison (tray vs raceway)",
  description: "Side-by-side comparison of an under-desk metal tray, EVEO J-channel kit, and D-Line half-round cord cover for standing desks.",
  openGraph: {
    title: "Cable management comparison (tray vs raceway)",
    description: "Side-by-side comparison of an under-desk metal tray, EVEO J-channel kit, and D-Line half-round cord cover for standing desks.",
    url: "/compare/cable-management",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "Cable management comparison (tray vs raceway)",
    description: "Side-by-side comparison of an under-desk metal tray, EVEO J-channel kit, and D-Line half-round cord cover for standing desks.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/compare/cable-management" },
};

const slugs = ["under-desk-metal-cable-tray", "eveo-j-channel-cable-kit", "d-line-half-round-cord-cover"] as const;

const rows: { label: string; key: (slug: string) => string }[] = [
  { label: "Price band", key: (s) => getProduct(s)!.priceBand },
  { label: "Budget tier", key: (s) => getProduct(s)!.budget },
  {
    label: "Type",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Type")?.value || "—",
  },
  {
    label: "Install",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Install")?.value || "—",
  },
  {
    label: "Capacity / size",
    key: (s) => {
      const p = getProduct(s)!;
      return (
        p.specs.find((x) => x.label === "Capacity")?.value ||
        p.specs.find((x) => x.label === "Pieces")?.value ||
        p.specs.find((x) => x.label === "Size")?.value ||
        "—"
      );
    },
  },
  {
    label: "Best for",
    key: (s) => getProduct(s)!.whoItsFor.split(".")[0] + ".",
  },
];

export default function ComparePage() {
  const items = slugs.map((s) => getProduct(s)!);
  const winner = getProduct("under-desk-metal-cable-tray")!;
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cable management comparison",
    url: `${SITE_URL}/compare/cable-management`,
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
        Cable management comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Under-desk metal tray versus J-channel raceway versus a paintable D-Line
        wall cover — most desks need a tray for the power strip and a raceway for
        the signal runs.
      </p>
      <AffiliateNote />

      <CompareNav current={"/compare/cable-management"} />

      <CompareWinner product={winner} reason={"A metal under-desk tray is still the highest-leverage fix on a standing desk: park the surge strip once and stop yanking cords on every lift. Add EVEO J-channel along the rear lip and D-Line for any wall run guests can see."} />

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
