import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { AffiliateButton } from "@/components/AffiliateButton";
import { CompareNav } from "@/components/CompareNav";
import { CompareWinner } from "@/components/CompareWinner";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, DEFAULT_OG_IMAGE_METADATA, DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "USB-C dock comparison (Anker vs Plugable vs CalDigit)",
  description: "Side-by-side comparison of Anker 7-in-1, Plugable Thunderbolt 4, and CalDigit TS4 docks for travel vs dual-monitor desks.",
  openGraph: {
    title: "USB-C dock comparison (Anker vs Plugable vs CalDigit)",
    description: "Side-by-side comparison of Anker 7-in-1, Plugable Thunderbolt 4, and CalDigit TS4 docks for travel vs dual-monitor desks.",
    url: "/compare/usb-c-docks",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "USB-C dock comparison (Anker vs Plugable vs CalDigit)",
    description: "Side-by-side comparison of Anker 7-in-1, Plugable Thunderbolt 4, and CalDigit TS4 docks for travel vs dual-monitor desks.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/compare/usb-c-docks" },
};

const slugs = ["anker-7in1-usb-c-hub", "plugable-thunderbolt-4-dock", "caldigit-ts4"] as const;

const rows: { label: string; key: (slug: string) => string }[] = [
  { label: "Price band", key: (s) => getProduct(s)!.priceBand },
  { label: "Budget tier", key: (s) => getProduct(s)!.budget },
  {
    label: "Interface",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Interface")?.value ||
      getProduct(s)!.specs.find((x) => x.label === "Form")?.value ||
      "—",
  },
  {
    label: "Ports / video",
    key: (s) => {
      const p = getProduct(s)!;
      const ports = p.specs.find((x) => x.label === "Ports")?.value;
      const video =
        p.specs.find((x) => x.label === "Video")?.value ||
        p.specs.find((x) => x.label === "Displays")?.value;
      return [ports, video].filter(Boolean).join(" · ") || "—";
    },
  },
  {
    label: "Charging",
    key: (s) =>
      getProduct(s)!.specs.find((x) => x.label === "Charging")?.value || "—",
  },
  {
    label: "Best for",
    key: (s) => getProduct(s)!.whoItsFor.split(".")[0] + ".",
  },
];

export default function ComparePage() {
  const items = slugs.map((s) => getProduct(s)!);
  const winner = getProduct("plugable-thunderbolt-4-dock")!;
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "USB-C dock comparison",
    url: `${SITE_URL}/compare/usb-c-docks`,
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
        USB-C dock comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        A travel hub, a dual-monitor Thunderbolt dock, and a flagship CalDigit
        TS4 — pick by port needs and host laptop capability.
      </p>

      <CompareNav current={"/compare/usb-c-docks"} />

      <CompareWinner product={winner} reason={"For a fixed desk with dual 4K ambitions, Plugable's Thunderbolt 4 dock is the sweet spot before CalDigit money. Keep the Anker 7-in-1 for travel bags; reserve TS4 when you need the full port farm and brand ecosystem."} />

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
