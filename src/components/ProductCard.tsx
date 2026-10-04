import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import { getCategory } from "@/data/categories";
import { AffiliateButton } from "@/components/AffiliateButton";

export function ProductCard({
  product,
  priority = false,
  showAffiliateCta = true,
}: {
  product: Product;
  priority?: boolean;
  showAffiliateCta?: boolean;
}) {
  const category = getCategory(product.category);
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div
          className={`relative aspect-[4/3] overflow-hidden bg-stone-100 bg-gradient-to-br ${product.imageGradient}`}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
              priority={priority}
            />
          ) : (
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,white,transparent_45%)]"
              role="img"
              aria-label={product.imageAlt}
            />
          )}
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
        </div>
      </Link>
      {showAffiliateCta && (
        <div className="border-t border-stone-100 px-4 pb-4 pt-3">
          <AffiliateButton
            productSlug={product.slug}
            productName={product.name}
            amazonAsin={product.amazonAsin}
            amazonQuery={product.amazonQuery}
            label="Check price on Amazon"
            className="[&_a]:w-full [&_a]:text-center [&_a]:text-sm [&_a]:py-2.5"
          />
        </div>
      )}
    </div>
  );
}
