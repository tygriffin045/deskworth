import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { AffiliateButton } from "@/components/AffiliateButton";

export const metadata: Metadata = {
  title: "Standing desk comparison",
  description:
    "Side-by-side comparison of three DeskWorth standing desks across budget, mid-range, and premium.",
};

const slugs = [
  "cedarline-flex-lite",
  "northframe-rise-pro",
  "apex-lift-studio",
] as const;

const rows: { label: string; key: (slug: string) => string }[] = [
  { label: "Price band", key: (s) => getProduct(s)!.priceBand },
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
  const desks = slugs.map((s) => getProduct(s)!);

  return (
    <div>
      <h1 className="font-serif text-4xl text-stone-900">
        Standing desk comparison
      </h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Three fictional desks across budget, mid-range, and premium — so you can
        match stability and features to how you actually work. Read the{" "}
        <Link
          href="/guides/how-to-choose-a-standing-desk"
          className="underline underline-offset-2"
        >
          full buying guide
        </Link>{" "}
        for context.
      </p>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-4 font-medium text-stone-500">Feature</th>
              {desks.map((d) => (
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
              {desks.map((d) => (
                <td key={d.slug} className="px-4 py-4">
                  <AffiliateButton
                    productSlug={d.slug}
                    productName={d.name}
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
