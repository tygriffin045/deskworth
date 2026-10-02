import { getFeaturedProducts } from "@/data/products";
import { getAffiliateUrl } from "@/lib/affiliate";

function picture(product: { imageUrl?: string; amazonAsin?: string; name: string }) {
  if (product.imageUrl?.startsWith("/")) return product.imageUrl;
  if (product.amazonAsin) return `/products/${product.amazonAsin}.jpg`;
  return product.imageUrl || "";
}

export function TopRail() {
  const picks = getFeaturedProducts().slice(0, 10);
  if (!picks.length) return null;
  return (
    <section aria-label="Top 10 worth buying">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a84c1f]">
            Start here
          </p>
          <h2 className="mt-1 font-serif text-3xl text-stone-900">
            Top 10 worth buying
          </h2>
          <p className="mt-1 max-w-xl text-stone-600">
            The picks we would buy first. Each card goes straight to the current Amazon price. Verdicts are Worth It, not invented scores.
          </p>
        </div>
      </div>
      <div className="mt-5 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
        {picks.map((product, index) => {
          const src = picture(product);
          return (
            <a
              key={product.slug}
              href={getAffiliateUrl(product)}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="snap-start flex w-[250px] shrink-0 flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#d8cbb8] hover:shadow-md"
            >
              {src ? (
                <img src={src} alt={product.name} className="mb-3 h-36 w-full rounded-xl bg-[#f4f1ea] object-contain" />
              ) : null}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">#{index + 1}</span>
                <span className="rounded-full bg-[#f8f1de] px-2 py-0.5 text-[11px] font-bold text-[#8a6a22]">Worth It</span>
              </div>
              <p className="mt-3 font-serif text-lg leading-snug text-stone-900">{product.name}</p>
              <p className="mt-1 line-clamp-2 text-sm text-stone-600">{product.tagline}</p>
              <p className="mt-auto pt-3 text-sm font-semibold text-stone-800">{product.priceBand}</p>
              <span className="mt-2 text-sm font-semibold text-[#c45c26]">Check price on Amazon →</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
