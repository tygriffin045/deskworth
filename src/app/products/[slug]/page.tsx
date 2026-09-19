import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getRelatedProducts,
  products,
} from "@/data/products";
import { getCategory } from "@/data/categories";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ProductCard } from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <article>
      <nav className="text-sm text-stone-500">
        <Link href="/products" className="hover:text-stone-800">
          Products
        </Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-stone-800"
            >
              {category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-stone-700">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br ${product.imageGradient}`}
          role="img"
          aria-label={product.imageAlt}
        >
          <div className="absolute inset-0 opacity-35 mix-blend-overlay bg-[radial-gradient(circle_at_25%_20%,white,transparent_50%)]" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-stone-500">
            {product.brand} · {category?.name}
          </p>
          <h1 className="mt-2 font-serif text-4xl text-stone-900">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-stone-700">{product.tagline}</p>
          <p className="mt-4 text-stone-600">{product.summary}</p>
          <p className="mt-4 text-xl font-semibold text-stone-900">
            {product.priceBand}
          </p>
          <AffiliateButton
            productSlug={product.slug}
            productName={product.name}
            className="mt-6"
          />
        </div>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
          <h2 className="font-serif text-2xl text-stone-900">Pros</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
            {product.pros.map((pro) => (
              <li key={pro}>{pro}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6">
          <h2 className="font-serif text-2xl text-stone-900">Cons</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
            {product.cons.map((con) => (
              <li key={con}>{con}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="font-serif text-2xl text-stone-900">Who it&apos;s for</h2>
        <p className="mt-3 text-stone-700">{product.whoItsFor}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-stone-900">Specs</h2>
        <dl className="mt-4 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between gap-4 px-5 py-3 text-sm"
            >
              <dt className="text-stone-500">{spec.label}</dt>
              <dd className="font-medium text-stone-900">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-serif text-2xl text-stone-900">
            Related products
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
