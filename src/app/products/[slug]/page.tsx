import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getRelatedProducts,
  products,
} from "@/data/products";
import { getCategory } from "@/data/categories";
import { guides } from "@/data/guides";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { StickyAffiliateBar } from "@/components/StickyAffiliateBar";
import {
  SITE_URL,
  CATEGORY_CROSS_LINKS,
  DEFAULT_OG_IMAGE,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  const title = `${product.name} review (2026)`;
  const description = `${product.summary} DeskWorth editorial take — ${product.priceBand}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/products/${slug}`,
      ...(product.imageUrl
        ? {
            images: [
              {
                url: product.imageUrl.startsWith("http")
                  ? product.imageUrl
                  : `${SITE_URL}${product.imageUrl}`,
                alt: product.imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.imageUrl
        ? [product.imageUrl.startsWith("http") ? product.imageUrl : `${SITE_URL}${product.imageUrl}`]
        : [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const productUrl = `${SITE_URL}/products/${product.slug}`;
  const imageAbs = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${SITE_URL}${product.imageUrl}`
    : undefined;

  // Honest Offer: priceBand as text; low/high from curated bands — no AggregateRating.
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: product.brand },
    ...(imageAbs ? { image: [imageAbs] } : {}),
    offers: {
      "@type": "AggregateOffer",
      url: productUrl,
      priceCurrency: "USD",
      lowPrice: String(product.priceMin),
      highPrice: String(product.priceMax),
      offerCount: 1,
      availability: "https://schema.org/InStock",
      description: product.priceBand,
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: `${SITE_URL}/products`,
      },
      ...(category
        ? [
            {
              "@type": "ListItem" as const,
              position: 2,
              name: category.name,
              item: `${SITE_URL}/categories/${category.slug}`,
            },
            {
              "@type": "ListItem" as const,
              position: 3,
              name: product.name,
              item: productUrl,
            },
          ]
        : [
            {
              "@type": "ListItem" as const,
              position: 2,
              name: product.name,
              item: productUrl,
            },
          ]),
    ],
  };

  const cross = CATEGORY_CROSS_LINKS[product.category];
  const mentionedInGuides = guides.filter((g) =>
    g.productSlugs.includes(product.slug),
  );

  return (
    <article className="pb-24 md:pb-0">
      <JsonLd data={[productLd, breadcrumbLd]} />
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
          className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 bg-gradient-to-br ${product.imageGradient}`}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
            />
          ) : (
            <div
              className="absolute inset-0 opacity-35 mix-blend-overlay bg-[radial-gradient(circle_at_25%_20%,white,transparent_50%)]"
              role="img"
              aria-label={product.imageAlt}
            />
          )}
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
            amazonAsin={product.amazonAsin}
            amazonQuery={product.amazonQuery}
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

      {(cross || mentionedInGuides.length > 0) && (
        <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
          <h2 className="font-serif text-2xl text-stone-900">Keep reading</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            {cross?.guides?.map((g) => (
              <li key={g.href}>
                Guide:{" "}
                <Link href={g.href} className="underline underline-offset-2">
                  {g.label}
                </Link>
              </li>
            ))}
            {cross?.compares?.map((c) => (
              <li key={c.href}>
                Compare:{" "}
                <Link href={c.href} className="underline underline-offset-2">
                  {c.label}
                </Link>
              </li>
            ))}
            {mentionedInGuides.map((g) => (
              <li key={g.slug}>
                Mentioned in:{" "}
                <Link
                  href={`/guides/${g.slug}`}
                  className="underline underline-offset-2"
                >
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="font-serif text-2xl text-stone-900">Ready to buy?</h2>
        <p className="mt-2 text-stone-600">
          Confirm the live Amazon listing, configuration, and return window
          before you commit — prices move.
        </p>
        <AffiliateButton
          productSlug={product.slug}
          productName={product.name}
          amazonAsin={product.amazonAsin}
          amazonQuery={product.amazonQuery}
          className="mt-4"
        />
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-serif text-2xl text-stone-900">
            Pairs well with
          </h2>
          <p className="mt-1 text-stone-600">
            Related picks from the same desk ecosystem — not random upsells.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} showAffiliateCta />
            ))}
          </div>
        </section>
      )}

      <StickyAffiliateBar
        productSlug={product.slug}
        productName={product.name}
        amazonAsin={product.amazonAsin}
        amazonQuery={product.amazonQuery}
        priceBand={product.priceBand}
      />
    </article>
  );
}
