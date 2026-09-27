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
  title: "Mic boom arm comparison (Elgato vs RODE vs InnoGear)",
  description: "Side-by-side comparison of Elgato Wave Mic Arm LP, RODE PSA1+, and InnoGear cable-management boom arms for desk setups.",
  openGraph: {
    title: "Mic boom arm comparison (Elgato vs RODE vs InnoGear)",
    description: "Side-by-side comparison of Elgato Wave Mic Arm LP, RODE PSA1+, and InnoGear cable-management boom arms for desk setups.",
    url: "/compare/boom-arms",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "Mic boom arm comparison (Elgato vs RODE vs InnoGear)",
    description: "Side-by-side comparison of Elgato Wave Mic Arm LP, RODE PSA1+, and InnoGear cable-management boom arms for desk setups.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/compare/boom-arms" },
};

const slugs = ["elgato-wave-mic-arm-lp", "rode-psa1-plus", "innogear-mic-boom-cable-mgmt"] as const;

const rows: { label: string; key: (slug: string) => string }[] = [
  { label: "Price band", key: (s) => getProduct(s)!.priceBand },
  { label: "Budget tier", key: (s) => getProduct(s)!.budget },
  {
    label: "Style",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Style")?.value || "—",
  },
  {
    label: "Cable",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Cable")?.value || "—",
  },
  {
    label: "Mount / clamp",
    key: (s) => {
      const p = getProduct(s)!;
      return (
        p.specs.find((x) => x.label === "Mount")?.value ||
        p.specs.find((x) => x.label === "Clamp")?.value ||
        "—"
      );
    },
  },
  {
    label: "Mic fit",
    key: (s) => {
      const p = getProduct(s)!;
      return (
        p.specs.find((x) => x.label === "Mic weight")?.value ||
        p.specs.find((x) => x.label === "Fits")?.value ||
        p.specs.find((x) => x.label === "Build")?.value ||
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
  const winner = getProduct("elgato-wave-mic-arm-lp")!;
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mic & webcam boom arm comparison",
    url: `${SITE_URL}/compare/boom-arms`,
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
        Mic & webcam boom arm comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Elgato low-profile versus RODE broadcast PSA1+ versus InnoGear value —
        pick by mic weight, camera framing, and how quiet the arm needs to be on
        calls.
      </p>
      <AffiliateNote />

      <CompareNav current={"/compare/boom-arms"} />

      <CompareWinner product={winner} reason={"For most desk calls and creator setups, Elgato's low-profile Wave Mic Arm stays out of webcam frame and feels desk-native. Choose RODE PSA1+ for heavier broadcast mics; InnoGear when cable routing and price matter most."} />

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
