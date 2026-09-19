import Link from "next/link";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { guides } from "@/data/guides";
import { ProductCard } from "@/components/ProductCard";
import { TrustStrip } from "@/components/TrustStrip";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-stone-200 bg-[#efe8dc] px-6 py-14 sm:px-12 sm:py-20">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#c45c26]/15 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-stone-400/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a84c1f]">
            Home office gear, edited
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            Honest picks for a better home office
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            DeskWorth reviews standing desks, chairs, monitors, arms, mats, stands,
            docks, and the small upgrades that make long days easier — with clear
            affiliate disclosure and no invented brand scores.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
            >
              Browse all products
            </Link>
            <Link
              href="/guides/how-to-choose-a-standing-desk"
              className="rounded-full border border-stone-400/80 bg-white/60 px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-white"
            >
              Standing desk guide
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-stone-900">
              Shop by category
            </h2>
            <p className="mt-1 text-stone-600">
              Start where your setup hurts most — chair, desk, screen, arm, or dock.
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
            <h2 className="font-serif text-3xl text-stone-900">Top picks</h2>
            <p className="mt-1 text-stone-600">
              Featured products we&apos;d put on our own desks first.
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
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <TrustStrip />

      <section>
        <h2 className="font-serif text-3xl text-stone-900">Buying guides</h2>
        <p className="mt-1 text-stone-600">
          Longer reads with internal links to the products we mention.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
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
