import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { guides } from "@/data/guides";
import { ProductCard } from "@/components/ProductCard";
import { TopRail } from "@/components/TopRail";
import { AffiliateNote } from "@/components/AffiliateNote";
import {
  SITE_URL,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE_METADATA,
  DEFAULT_OG_IMAGE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "DeskWorth — Honest picks for a better home office",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "DeskWorth — Honest picks for a better home office",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "DeskWorth — Honest picks for a better home office",
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-stone-200 bg-[#efe8dc] px-6 py-14 sm:px-12 sm:py-20">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#c45c26]/15 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-stone-400/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a84c1f]">
            Desk setups, reviewed for years
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            Buy the right desk gear once — with tradeoffs spelled out
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            Standing desks, converters, chairs, monitors, boom arms, mats, cables,
            and desk power. Editorial shortlists with real tradeoffs and no
            invented scores.
          </p>
          <AffiliateNote className="mt-3" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
            >
              Browse all products
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-stone-400/80 bg-white/60 px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-white"
            >
              Side-by-side compares
            </Link>
            <Link
              href="/guides/sit-stand-converter-vs-standing-desk"
              className="rounded-full border border-stone-400/80 bg-white/60 px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-white"
            >
              Converter vs desk
            </Link>
          </div>
        </div>
      </section>

      <TopRail />

      <section>
        <h2 className="font-serif text-3xl text-stone-900">Vs reviews</h2>
        <p className="mt-1 text-stone-600">Two ways to solve the same desk problem. Buy the one that matches the job.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <a href="/compare/monitor-arms" className="rounded-2xl border border-stone-200 bg-white p-5 hover:border-stone-400">HUANUO dual arm vs Ergotron LX</a>
          <a href="/compare/usb-c-docks" className="rounded-2xl border border-stone-200 bg-white p-5 hover:border-stone-400">USB-C dock vs a cheaper hub</a>
          <a href="/compare/standing-mats" className="rounded-2xl border border-stone-200 bg-white p-5 hover:border-stone-400">Standing mat comparison</a>
          <a href="/compare/boom-arms" className="rounded-2xl border border-stone-200 bg-white p-5 hover:border-stone-400">Boom arm comparison</a>
        </div>
      </section>


      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-stone-900">
              Shop by category
            </h2>
            <p className="mt-1 text-stone-600">
              Start where your setup hurts most — chair, desk, converter, boom arm, mat, or power.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-400 hover:shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Category
              </p>
              <h3 className="mt-1 font-serif text-xl text-stone-900">
                {c.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-stone-900">More picks</h2>
            <p className="mt-1 text-stone-600">
              Six products we&apos;d put on our own desks first — with Amazon price checks.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-medium text-stone-700 underline underline-offset-4 sm:inline"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              priority={i < 2}
              showAffiliateCta
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-stone-900">Buying guides</h2>
            <p className="mt-1 text-stone-600">
              Longer reads with internal links to the products we mention.
            </p>
          </div>
          <Link
            href="/guides"
            className="hidden text-sm font-medium text-stone-700 underline underline-offset-4 sm:inline"
          >
            All guides
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[...guides]
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            .map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-stone-400"
            >
              <p className="text-xs text-stone-500">
                {g.readingTime} · {g.publishedAt}
              </p>
              <h3 className="mt-2 font-serif text-xl text-stone-900">
                {g.title}
              </h3>
              <p className="mt-2 text-sm text-stone-600">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
