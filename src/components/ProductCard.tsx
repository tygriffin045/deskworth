import Link from "next/link";
import type { Product } from "@/data/types";
import { getCategory } from "@/data/categories";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${product.imageGradient}`}
        role="img"
        aria-label={product.imageAlt}
      >
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">
          {category?.shortLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-stone-500">
          {product.brand}
        </p>
        <h3 className="mt-1 font-serif text-lg text-stone-900 group-hover:underline group-hover:decoration-stone-300 group-hover:underline-offset-4">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-stone-600">
          {product.tagline}
        </p>
        <p className="mt-auto pt-3 text-sm font-medium text-stone-800">
          {product.priceBand}
        </p>
      </div>
    </Link>
  );
}
