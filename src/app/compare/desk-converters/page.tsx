import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { AffiliateButton } from "@/components/AffiliateButton";
import { CompareNav } from "@/components/CompareNav";
import { CompareWinner } from "@/components/CompareWinner";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, DEFAULT_OG_IMAGE_METADATA, DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sit-stand desk converter comparison (VariDesk vs FlexiSpot vs VIVO)",
  description: "Side-by-side comparison of VariDesk Pro Plus 36, FlexiSpot 36, and VIVO 36 desk converters for fixed desks.",
  openGraph: {
    title: "Sit-stand desk converter comparison (VariDesk vs FlexiSpot vs VIVO)",
    description: "Side-by-side comparison of VariDesk Pro Plus 36, FlexiSpot 36, and VIVO 36 desk converters for fixed desks.",
    url: "/compare/desk-converters",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "Sit-stand desk converter comparison (VariDesk vs FlexiSpot vs VIVO)",
    description: "Side-by-side comparison of VariDesk Pro Plus 36, FlexiSpot 36, and VIVO 36 desk converters for fixed desks.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/compare/desk-converters" },
};

const slugs = ["varidesk-pro-plus-36", "flexispot-36-desk-converter", "vivo-36-desk-converter"] as const;

const rows: { label: string; key: (slug: string) => string }[] = [
  { label: "Price band", key: (s) => getProduct(s)!.priceBand },
  { label: "Budget tier", key: (s) => getProduct(s)!.budget },
  {
    label: "Width",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Width")?.value || "—",
  },
  {
    label: "Lift",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Lift")?.value || "—",
  },
  {
    label: "Tiers / tray",
    key: (s) => {
      const p = getProduct(s)!;
      return (
        p.specs.find((x) => x.label === "Tiers")?.value ||
        p.specs.find((x) => x.label === "Keyboard tray")?.value ||
        p.specs.find((x) => x.label === "Form")?.value ||
        "—"
      );
    },
  },
  {
    label: "Assembly",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Assembly")?.value ||
      "DIY / kit",
  },
  {
    label: "Best for",
    key: (s) => getProduct(s)!.whoItsFor.split(".")[0] + ".",
  },
];

export default function ComparePage() {
  const items = slugs.map((s) => getProduct(s)!);
  const winner = getProduct("flexispot-36-desk-converter")!;
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sit-stand desk converter comparison",
    url: `${SITE_URL}/compare/desk-converters`,
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
        Sit-stand desk converter comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        VariDesk Pro Plus versus FlexiSpot mid-range versus VIVO budget — for
        people keeping a fixed desk. Read the{" "}
        <Link
          href="/guides/sit-stand-converter-vs-standing-desk"
          className="underline underline-offset-2"
        >
          converter vs standing desk guide
        </Link>{" "}
        before you commit.
      </p>

      <CompareNav current={"/compare/desk-converters"} />

      <CompareWinner product={winner} reason={"For most fixed desks that need sit-stand without Vari pricing, the FlexiSpot 36-inch converter is the practical middle. Step up to VariDesk Pro Plus when you want assembled polish; take VIVO if you are testing the habit on a budget."} />

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
