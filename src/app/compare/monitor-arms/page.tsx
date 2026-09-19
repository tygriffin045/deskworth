import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { AffiliateButton } from "@/components/AffiliateButton";

export const metadata: Metadata = {
  title: "Monitor arm comparison",
  description:
    "Side-by-side comparison of HUANUO dual, Amazon Basics dual, and Ergotron LX monitor arms.",
};

const slugs = [
  "huanuo-dual-monitor-arm",
  "amazon-basics-dual-monitor-arm",
  "ergotron-lx-monitor-arm",
] as const;

const rows: { label: string; key: (slug: string) => string }[] = [
  { label: "Price band", key: (s) => getProduct(s)!.priceBand },
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

export default function CompareMonitorArmsPage() {
  const arms = slugs.map((s) => getProduct(s)!);

  return (
    <div>
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

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <Link
          href="/compare"
          className="rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-stone-200"
        >
          Standing desks
        </Link>
        <span className="rounded-full bg-stone-900 px-3 py-1 text-stone-50">
          Monitor arms
        </span>
        <Link
          href="/compare/usb-c-docks"
          className="rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-stone-200"
        >
          USB-C docks
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-4 font-medium text-stone-500">Feature</th>
              {arms.map((d) => (
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
              {arms.map((d) => (
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
