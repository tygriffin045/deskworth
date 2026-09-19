import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        Category
      </p>
      <h1 className="mt-1 font-serif text-4xl text-stone-900">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-stone-600">{category.description}</p>
      <p className="mt-4 text-sm text-stone-500">
        <Link href="/products" className="underline underline-offset-2">
          All products
        </Link>{" "}
        · {items.length} in this category
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
