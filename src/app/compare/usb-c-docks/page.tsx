import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { AffiliateButton } from "@/components/AffiliateButton";

export const metadata: Metadata = {
  title: "USB-C dock comparison",
  description:
    "Side-by-side comparison of Anker 7-in-1, Plugable Thunderbolt 4, and CalDigit TS4 docks.",
};

const slugs = [
  "anker-7in1-usb-c-hub",
  "plugable-thunderbolt-4-dock",
  "caldigit-ts4",
] as const;

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

export default function CompareUsbCDocksPage() {
  const docks = slugs.map((s) => getProduct(s)!);

  return (
    <div>
      <h1 className="font-serif text-4xl text-stone-900">
        USB-C dock comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        A travel hub, a dual-monitor Thunderbolt dock, and a flagship CalDigit
        TS4 — pick by port needs and host laptop capability.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <Link
          href="/compare"
          className="rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-stone-200"
        >
          Standing desks
        </Link>
        <Link
          href="/compare/monitor-arms"
          className="rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-stone-200"
        >
          Monitor arms
        </Link>
        <span className="rounded-full bg-stone-900 px-3 py-1 text-stone-50">
          USB-C docks
        </span>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-4 font-medium text-stone-500">Feature</th>
              {docks.map((d) => (
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
              {docks.map((d) => (
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
