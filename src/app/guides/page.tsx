import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";
import { DEFAULT_OG_IMAGE_METADATA, DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buying guides for home office desks & gear",
  description:
    "Practical DeskWorth guides for standing desks, converters, monitor arms, mats, and ergonomic setups — with links to products we mention.",
  openGraph: {
    title: "Buying guides for home office desks & gear",
    description:
      "Practical DeskWorth guides for standing desks, converters, monitor arms, mats, and ergonomic setups — with links to products we mention.",
    url: "/guides",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "Buying guides for home office desks & gear",
    description:
      "Practical DeskWorth guides for standing desks, converters, monitor arms, mats, and ergonomic setups.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl text-stone-900">Buying guides</h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Longer editorial pieces with links to the products we mention — written
        to help you buy in the right order, not chase every upgrade.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-stone-400"
          >
            <p className="text-xs text-stone-500">
              {g.readingTime} · {g.publishedAt}
            </p>
            <h2 className="mt-2 font-serif text-2xl text-stone-900">
              {g.title}
            </h2>
            <p className="mt-2 text-sm text-stone-600">{g.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
