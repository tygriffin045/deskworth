import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { AffiliateNote } from "@/components/AffiliateNote";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  CATEGORY_CROSS_LINKS,
  DEFAULT_OG_IMAGE_METADATA,
  DEFAULT_OG_IMAGE,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };
  const title = `${category.name} — DeskWorth picks`;
  const description = `${category.description} Compare options and check current Amazon prices.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/categories/${slug}`,
      images: [DEFAULT_OG_IMAGE_METADATA],
    },
    twitter: { title, description, images: [DEFAULT_OG_IMAGE] },
    alternates: { canonical: `/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug);
  const cross = CATEGORY_CROSS_LINKS[slug];
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description: category.description,
    url: `${SITE_URL}/categories/${slug}`,
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
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        Category
      </p>
      <h1 className="mt-1 font-serif text-4xl text-stone-900">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-stone-600">{category.description}</p>
      <AffiliateNote />
      <p className="mt-4 text-sm text-stone-500">
        <Link href="/products" className="underline underline-offset-2">
          All products
        </Link>{" "}
        · {items.length} in this category
      </p>
      {(cross?.guides?.length || cross?.compares?.length) && (
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
          {cross?.guides?.map((g) => (
            <Link key={g.href} href={g.href} className="underline underline-offset-2">
              {g.label}
            </Link>
          ))}
          {cross?.compares?.map((c) => (
            <Link key={c.href} href={c.href} className="underline underline-offset-2">
              {c.label}
            </Link>
          ))}
        </p>
      )}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}
