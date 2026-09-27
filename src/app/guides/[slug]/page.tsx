import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/data/guides";
import { getProduct } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE_METADATA,
  DEFAULT_OG_IMAGE,
} from "@/lib/site";

const GUIDE_COMPARES: Record<string, { href: string; label: string }[]> = {
  "how-to-choose-a-standing-desk": [
    { href: "/compare", label: "Standing desk comparison" },
    { href: "/compare/standing-mats", label: "Standing mat comparison" },
  ],
  "how-to-choose-a-monitor-arm": [
    { href: "/compare/monitor-arms", label: "Monitor arm comparison" },
  ],
  "best-standing-desk-mat": [
    { href: "/compare/standing-mats", label: "Standing mat comparison" },
  ],
  "sit-stand-converter-vs-standing-desk": [
    { href: "/compare/desk-converters", label: "Desk converter comparison" },
    { href: "/compare", label: "Standing desk comparison" },
  ],
  "ergonomic-home-office-starter-kit": [
    { href: "/compare", label: "Standing desk comparison" },
  ],
};


type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `/guides/${slug}`,
      images: [DEFAULT_OG_IMAGE_METADATA],
    },
    twitter: {
      title: guide.title,
      description: guide.description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const linkedProducts = guide.productSlugs
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const guideUrl = `${SITE_URL}/guides/${guide.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    mainEntityOfPage: guideUrl,
    author: { "@type": "Organization", name: SITE_NAME },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: guide.title,
        item: guideUrl,
      },
    ],
  };

  return (
    <article className="max-w-3xl">
      <JsonLd data={[articleLd, breadcrumbLd]} />
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

      {(GUIDE_COMPARES[guide.slug] || []).length > 0 && (
        <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
          <h2 className="font-serif text-2xl text-stone-900">
            Related comparisons
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {GUIDE_COMPARES[guide.slug].map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="underline underline-offset-2">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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
