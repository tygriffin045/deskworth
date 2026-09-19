import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/data/guides";
import { getProduct } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  return { title: guide.title, description: guide.description };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const linkedProducts = guide.productSlugs
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="max-w-3xl">
      <p className="text-xs text-stone-500">
        <Link href="/guides" className="hover:text-stone-800">
          Guides
        </Link>{" "}
        · {guide.readingTime} · {guide.publishedAt}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-stone-900">
        {guide.title}
      </h1>
      <p className="mt-4 text-lg text-stone-700">{guide.description}</p>

      <div className="mt-10 space-y-10">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-2xl text-stone-900">
              {section.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-stone-700">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-stone-900">
          Products mentioned
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {linkedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </article>
  );
}
